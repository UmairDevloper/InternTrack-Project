import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const existing = await prisma.application.findUnique({ where: { id } })
    if (!existing || existing.userId !== user.id)
        return NextResponse.json({ error: "Not found" }, { status: 404 })

    const { roleTitle, status, jobUrl, deadline, notes, companyName, companyWebsite, industry } =
        await req.json()

    let companyId: string | null = existing.companyId ?? null

    if (companyName) {
        const company = await prisma.company.upsert({
            where: { name: companyName },
            update: { website: companyWebsite ?? null, industry: industry ?? null },
            create: { name: companyName, website: companyWebsite ?? null, industry: industry ?? null },
        })
        companyId = company.id
    } else {
        companyId = null
    }

    const updated = await prisma.application.update({
        where: { id},
        data: {
            roleTitle: roleTitle ?? existing.roleTitle,
            status: status ?? existing.status,
            jobUrl: jobUrl ?? null,
            deadline: deadline ? new Date(deadline) : null,
            notes: notes ?? null,
            companyId,
        },
        include: { company: true },
    })

    return NextResponse.json(updated)
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    const existing = await prisma.application.findUnique({ where: { id } })
    if (!existing || existing.userId !== user.id)
        return NextResponse.json({ error: "Not found" }, { status: 404 })

    await prisma.application.delete({ where: { id } })

    return NextResponse.json({ success: true })
}