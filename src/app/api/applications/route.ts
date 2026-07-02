import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

// GET /api/applications — fetch all applications for logged in user
export async function GET() {
    const session = await auth()

    // If not logged in, reject the request
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const applications = await prisma.application.findMany({
        where: { userId: session.user.id },
        include: {
            company: true,       // include company name
            interviews: true,    // include interview rounds
        },
        orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(applications)
}

// POST /api/applications — create a new application
export async function POST(req: Request) {
    const session = await auth()

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    // Step 1 — if company name given, find or create it first
    let companyId: string | null = null

    if (body.companyName) {
        const company = await prisma.company.upsert({
            where: { name: body.companyName },
            update: {},
            create: {
                name: body.companyName,
                industry: body.industry ?? null,
            },
        })
        companyId = company.id
    }

    // Step 2 — create the application using plain IDs only
    const application = await prisma.application.create({
        data: {
            userId: session.user.id,
            companyId: companyId,
            roleTitle: body.roleTitle,
            status: body.status ?? "applied",
            jobUrl: body.jobUrl ?? null,
            notes: body.notes ?? null,
            deadline: body.deadline ? new Date(body.deadline) : null,
        },
        include: { company: true },
    })

    return NextResponse.json(application, { status: 201 })
}