import CompaniesPage from "@/components/CampaniesPage"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"



export default async function Companies() {
    const session = await auth()
    if (!session?.user?.email) redirect("/login")

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    })
    if (!user) redirect("/login")

    const companies = await prisma.company.findMany({
        include: {
            applications: {
                where: { userId: user.id },
                select: { id: true, roleTitle: true, status: true },
            },
        },
        orderBy: { name: "asc" },
    })

    // Only show companies the user actually has applications with
    const userCompanies = companies.filter((c) => c.applications.length > 0)

    return <CompaniesPage initialCompanies={JSON.parse(JSON.stringify(userCompanies))} />
}