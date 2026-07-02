import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect, notFound } from "next/navigation"
import ApplicationDetail from "@/components/ApplicationDetail"

export default async function ApplicationDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const session = await auth()
    if (!session?.user?.email) redirect("/login")

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    })
    if (!user) redirect("/login")

    const app = await prisma.application.findUnique({
        where: { id },
        include: { company: true, interviews: true },
    })

    if (!app || app.userId !== user.id) notFound()

    return <ApplicationDetail app={JSON.parse(JSON.stringify(app))} />
}