import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import KanbanBoard from "@/components/KanbanBoard"

export default async function DashboardPage() {
    const session = await auth()
    if (!session?.user?.id) redirect("/auth")

    const applications = await prisma.application.findMany({
        where: { userId: session.user.id },
        include: { company: true, interviews: true },
        orderBy: { createdAt: "desc" },
    })

    const stats = {
        total: applications.length,
        applied: applications.filter((a) => a.status === "applied").length,
        interview: applications.filter((a) => a.status === "interview").length,
        offer: applications.filter((a) => a.status === "offer").length,
        accepted: applications.filter((a) => a.status === "accepted").length,
        rejected: applications.filter((a) => a.status === "rejected").length,
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                            My Applications
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Welcome back, <span className="font-medium text-gray-700">{session.user.name?.split(" ")[0]}</span>
                        </p>
                    </div>
                    <Link
                        href="/dashboard/add"
                        className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm w-full sm:w-auto"
                    >
                        <span className="text-base leading-none">+</span>
                        Add Application
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 sm:mb-8">
                    {[
                        { label: "Total", value: stats.total, bg: "bg-white", text: "text-gray-800", border: "border-gray-200" },
                        { label: "Applied", value: stats.applied, bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
                        { label: "Interview", value: stats.interview, bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
                        { label: "Offer", value: stats.offer, bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
                        { label: "Accepted", value: stats.accepted, bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
                        { label: "Rejected", value: stats.rejected, bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
                    ].map((s) => (
                        <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl p-3 sm:p-4 shadow-sm`}>
                            <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                            <p className={`text-2xl sm:text-3xl font-bold mt-1 ${s.text}`}>{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Board */}
                {applications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
                        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-700 font-semibold mb-1">No applications yet</p>
                        <p className="text-gray-400 text-sm mb-5">Start tracking your internship journey</p>
                        <Link
                            href="/dashboard/add"
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
                        >
                            Add Your First Application
                        </Link>
                    </div>
                ) : (
                    <KanbanBoard initialApplications={applications as any} />
                )}

            </div>
        </div>
    )
}