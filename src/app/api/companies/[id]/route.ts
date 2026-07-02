import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { name, website, industry } = await req.json()
    if (!name?.trim()) return NextResponse.json({ error: "Company name is required." }, { status: 400 })

    const company = await prisma.company.update({
        where: { id },
        data: { name: name.trim(), website: website ?? null, industry: industry ?? null },
    })

    return NextResponse.json(company)
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await prisma.company.delete({ where: { id } })

    return NextResponse.json({ success: true })
}