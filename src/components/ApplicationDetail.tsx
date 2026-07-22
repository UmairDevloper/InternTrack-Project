"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const STATUSES = [
    { id: "applied", label: "Applied" },
    { id: "interview", label: "Interview" },
    { id: "offer", label: "Offer" },
    { id: "accepted", label: "Accepted" },
    { id: "rejected", label: "Rejected" },
]

const STATUS_COLOR: Record<string, string> = {
    applied: "bg-blue-100   text-blue-700",
    interview: "bg-yellow-100 text-yellow-700",
    offer: "bg-purple-100 text-purple-700",
    accepted: "bg-green-100  text-green-700",
    rejected: "bg-red-100    text-red-700",
}

const INPUT_CLASS = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
const LABEL_CLASS = "block text-sm font-medium text-gray-700 mb-1"

type Interview = {
    id: string
    round: number
    interviewType: string | null
    scheduledAt: string | null
    outcome: string | null
    notes: string | null
}

type App = {
    id: string
    roleTitle: string
    status: string
    jobUrl: string | null
    notes: string | null
    deadline: string | null
    appliedDate: string
    company: { name: string; website: string | null; industry: string | null } | null
    interviews: Interview[]
}

export default function ApplicationDetail({ app }: { app: App }) {
    const router = useRouter()
    const [editing, setEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [form, setForm] = useState({
        roleTitle: app.roleTitle,
        status: app.status,
        jobUrl: app.jobUrl ?? "",
        deadline: app.deadline ? app.deadline.slice(0, 10) : "",
        notes: app.notes ?? "",
        companyName: app.company?.name ?? "",
        companyWebsite: app.company?.website ?? "",
        industry: app.company?.industry ?? "",
    })

    function set(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    async function handleSave() {
        if (!form.roleTitle.trim()) { setError("Role title is required."); return }
        setSaving(true)
        setError(null)

        const res = await fetch(`/api/applications/${app.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                roleTitle: form.roleTitle.trim(),
                status: form.status,
                jobUrl: form.jobUrl.trim() || null,
                deadline: form.deadline || null,
                notes: form.notes.trim() || null,
                companyName: form.companyName.trim() || null,
                companyWebsite: form.companyWebsite.trim() || null,
                industry: form.industry.trim() || null,
            }),
        })

        if (res.ok) {
            setEditing(false)
            router.refresh()
        } else {
            const data = await res.json()
            setError(data.error ?? "Failed to save.")
        }
        setSaving(false)
    }

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this application? This cannot be undone.")) return
        setDeleting(true)
        await fetch(`/api/applications/${app.id}`, { method: "DELETE" })
        router.push("/dashboard")
    }

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">

            {/* Back */}
            <Link
                href="/dashboard"
                className="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-flex items-center gap-1"
            >
                ← Back to Dashboard
            </Link>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-4 space-y-6">

                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-gray-400 font-medium">
                            {app.company?.name ?? "No company"}
                        </p>
                        <h1 className="text-2xl font-bold text-gray-900 mt-1">
                            {app.roleTitle}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${STATUS_COLOR[app.status] ?? "bg-gray-100 text-gray-600"}`}>
                            {app.status}
                        </span>
                        {!editing && (
                            <button
                                onClick={() => setEditing(true)}
                                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                            >
                                Edit
                            </button>
                        )}
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded-full transition-colors disabled:opacity-50"
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* ── VIEW MODE ── */}
                {!editing && (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Applied Date</p>
                                <p className="text-sm text-gray-800">
                                    {new Date(app.appliedDate).toLocaleDateString()}
                                </p>
                            </div>
                            {app.deadline && (
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Deadline</p>
                                    <p className="text-sm text-orange-500 font-medium">
                                        {new Date(app.deadline).toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                            {app.jobUrl && (
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Job Posting</p>
                                    <a href={app.jobUrl} target="_blank" rel="noopener noreferrer"
                                        className="text-sm text-blue-500 hover:underline">
                                        View Job ↗
                                    </a>
                                </div>
                            )}
                            {app.company?.website && (
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Company Website</p>
                                    <a href={app.company.website} target="_blank" rel="noopener noreferrer"
                                        className="text-sm text-blue-500 hover:underline">
                                        {app.company.website} ↗
                                    </a>
                                </div>
                            )}
                            {app.company?.industry && (
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Industry</p>
                                    <p className="text-sm text-gray-800">{app.company.industry}</p>
                                </div>
                            )}
                        </div>

                        {app.notes && (
                            <>
                                <hr className="border-gray-100" />
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Notes</p>
                                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{app.notes}</p>
                                </div>
                            </>
                        )}

                        {app.interviews.length > 0 && (
                            <>
                                <hr className="border-gray-100" />
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">Interviews</p>
                                    <div className="space-y-3">
                                        {app.interviews.map((iv) => (
                                            <div key={iv.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm font-medium text-gray-800">
                                                        Round {iv.round} {iv.interviewType ? `— ${iv.interviewType}` : ""}
                                                    </span>
                                                    {iv.outcome && (
                                                        <span className="text-xs text-gray-500 capitalize">{iv.outcome}</span>
                                                    )}
                                                </div>
                                                {iv.scheduledAt && (
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(iv.scheduledAt).toLocaleString()}
                                                    </p>
                                                )}
                                                {iv.notes && (
                                                    <p className="text-xs text-gray-600 mt-1">{iv.notes}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}

                {/* ── EDIT MODE ── */}
                {editing && (
                    <div className="space-y-4">

                        <div>
                            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Company</h2>
                            <div className="space-y-3">
                                <div>
                                    <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Company Name</label>
                                    <input type="text" className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`} value={form.companyName}
                                        onChange={(e) => set("companyName", e.target.value)} />
                                </div>
                                <div>
                                    <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Company Website</label>
                                    <input type="url" className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`} value={form.companyWebsite}
                                        onChange={(e) => set("companyWebsite", e.target.value)} />
                                </div>
                                <div>
                                    <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Industry</label>
                                    <input type="text" className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`} value={form.industry}
                                        onChange={(e) => set("industry", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        <div>
                            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Application</h2>
                            <div className="space-y-3">
                                <div>
                                    <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Role Title <span className="text-red-400">*</span></label>
                                    <input type="text" className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`} value={form.roleTitle}
                                        onChange={(e) => set("roleTitle", e.target.value)} />
                                </div>
                                <div>
                                    <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Status</label>
                                    <select className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`} value={form.status}
                                        onChange={(e) => set("status", e.target.value)}>
                                        {STATUSES.map((s) => (
                                            <option key={s.id} value={s.id}>{s.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Job URL</label>
                                    <input type="url" className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`} value={form.jobUrl}
                                        onChange={(e) => set("jobUrl", e.target.value)} />
                                </div>
                                <div>
                                    <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Deadline</label>
                                    <input type="date" className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`} value={form.deadline}
                                        onChange={(e) => set("deadline", e.target.value)} />
                                </div>
                                <div>
                                    <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Notes</label>
                                    <textarea rows={4} className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`} value={form.notes}
                                        onChange={(e) => set("notes", e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => { setEditing(false); setError(null) }}
                                className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !form.roleTitle.trim()}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}