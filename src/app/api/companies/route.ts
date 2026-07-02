import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { name, website, industry } = await req.json()
    if (!name?.trim()) return NextResponse.json({ error: "Company name is required." }, { status: 400 })

    const existing = await prisma.company.findUnique({ where: { name: name.trim() } })
    if (existing) return NextResponse.json({ error: "A company with this name already exists." }, { status: 409 })

    const company = await prisma.company.create({
        data: { name: name.trim(), website: website ?? null, industry: industry ?? null },
    })

    return NextResponse.json(company, { status: 201 })
}