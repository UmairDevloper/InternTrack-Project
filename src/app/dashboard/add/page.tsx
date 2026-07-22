"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const STATUSES = [
    { id: "applied", label: "Applied" },
    { id: "interview", label: "Interview" },
    { id: "offer", label: "Offer" },
    { id: "accepted", label: "Accepted" },
    { id: "rejected", label: "Rejected" },
]

const INPUT_CLASS = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
const LABEL_CLASS = "block text-sm font-medium text-gray-700 mb-1"

export default function AddApplicationPage() {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [form, setForm] = useState({
        // Company fields
        companyName: "",
        companyWebsite: "",
        industry: "",
        // Application fields
        roleTitle: "",
        status: "applied",
        jobUrl: "",
        deadline: "",
        notes: "",
    })

    function set(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    async function handleSubmit() {
        if (!form.roleTitle.trim()) {
            setError("Role title is required.")
            return
        }

        setSubmitting(true)
        setError(null)

        const res = await fetch("/api/applications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                companyName: form.companyName.trim() || null,
                companyWebsite: form.companyWebsite.trim() || null,
                industry: form.industry.trim() || null,
                roleTitle: form.roleTitle.trim(),
                status: form.status,
                jobUrl: form.jobUrl.trim() || null,
                deadline: form.deadline || null,
                notes: form.notes.trim() || null,
            }),
        })

        if (res.ok) {
            router.push("/dashboard")
        } else {
            const data = await res.json()
            setError(data.error ?? "Something went wrong.")
        }

        setSubmitting(false)
    }

    return (
        <div className="max-w-xl mx-auto py-10 px-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Add Application</h1>
                <p className="text-sm text-gray-500 mt-1">Track a new job or internship application.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">

                {/* ── Company ── */}
                <div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Company</h2>
                    <div className="space-y-4">
                        <div>
                            <label className={LABEL_CLASS}>Company Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Google"
                                className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`}
                                value={form.companyName}
                                onChange={(e) => set("companyName", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Company Website</label>
                            <input
                                type="url"
                                placeholder="https://google.com"
                                className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`}
                                value={form.companyWebsite}
                                onChange={(e) => set("companyWebsite", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Industry</label>
                            <input
                                type="text"
                                placeholder="e.g. Technology"
                                className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`}
                                value={form.industry}
                                onChange={(e) => set("industry", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* ── Application ── */}
                <div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Application</h2>
                    <div className="space-y-4">
                        <div>
                            <label className={LABEL_CLASS}>
                                Role Title <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Software Engineer Intern"
                                className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`}
                                value={form.roleTitle}
                                onChange={(e) => set("roleTitle", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Status</label>
                            <select
                                className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`}
                                value={form.status}
                                onChange={(e) => set("status", e.target.value)}
                            >
                                {STATUSES.map((s) => (
                                    <option key={s.id} value={s.id}>{s.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Job URL</label>
                            <input
                                type="url"
                                placeholder="https://..."
                                className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`}
                                value={form.jobUrl}
                                onChange={(e) => set("jobUrl", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Deadline</label>
                            <input
                                type="date"
                                className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`}
                                value={form.deadline}
                                onChange={(e) => set("deadline", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Notes</label>
                            <textarea
                                rows={4}
                                placeholder="Anything you want to remember..."
                                className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`}
                                value={form.notes}
                                onChange={(e) => set("notes", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* ── Error ── */}
                {error && (
                    <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                        {error}
                    </p>
                )}

                {/* ── Actions ── */}
                <div className="flex gap-3 pt-2">
                    <button
                        onClick={() => router.back()}
                        className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting || !form.roleTitle.trim()}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                        {submitting ? "Saving..." : "Add Application"}
                    </button>
                </div>

            </div>
        </div>
    )
}