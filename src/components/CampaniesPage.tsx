"use client"

import { useState } from "react"

type Application = { id: string; roleTitle: string; status: string }
type Company = {
    id: string
    name: string
    website: string | null
    industry: string | null
    applications: Application[]
}

const STATUS_COLOR: Record<string, string> = {
    applied: "bg-blue-100   text-blue-700",
    interview: "bg-yellow-100 text-yellow-700",
    offer: "bg-purple-100 text-purple-700",
    accepted: "bg-green-100  text-green-700",
    rejected: "bg-red-100    text-red-700",
}

const INPUT_CLASS = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 focus:bg-white"
const LABEL_CLASS = "block text-sm font-medium text-gray-700 mb-1.5"

export default function CompaniesPage({ initialCompanies }: { initialCompanies: Company[] }) {
    const [companies, setCompanies] = useState(initialCompanies)
    const [showModal, setShowModal] = useState(false)
    const [editing, setEditing] = useState<Company | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState("")
    const [form, setForm] = useState({ name: "", website: "", industry: "" })

    function set(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    function openAddModal() {
        setEditing(null)
        setForm({ name: "", website: "", industry: "" })
        setError(null)
        setShowModal(true)
    }

    function openEditModal(company: Company) {
        setEditing(company)
        setForm({ name: company.name, website: company.website ?? "", industry: company.industry ?? "" })
        setError(null)
        setShowModal(true)
    }

    async function handleSubmit() {
        if (!form.name.trim()) { setError("Company name is required."); return }
        setSubmitting(true)
        setError(null)

        const url = editing ? `/api/companies/${editing.id}` : "/api/companies"
        const method = editing ? "PATCH" : "POST"

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: form.name.trim(),
                website: form.website.trim() || null,
                industry: form.industry.trim() || null,
            }),
        })

        if (res.ok) {
            const company = await res.json()
            if (editing) {
                setCompanies((prev) => prev.map((c) => (c.id === company.id ? { ...c, ...company } : c)))
            } else {
                setCompanies((prev) => [...prev, { ...company, applications: [] }])
            }
            setShowModal(false)
        } else {
            const data = await res.json()
            setError(data.error ?? "Something went wrong.")
        }
        setSubmitting(false)
    }

    async function handleDelete(id: string, name: string) {
        if (!confirm(`Delete ${name}? This will also remove it from any linked applications.`)) return
        setCompanies((prev) => prev.filter((c) => c.id !== id))
        await fetch(`/api/companies/${id}`, { method: "DELETE" })
    }

    const filtered = companies.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

                {/* ── Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Companies</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {companies.length} {companies.length === 1 ? "company" : "companies"} you've applied to
                        </p>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors w-full sm:w-auto shadow-sm"
                    >
                        <span className="text-base leading-none">+</span>
                        Add Company
                    </button>
                </div>

                {/* ── Search ── */}
                <div className="relative mb-6">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search companies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm"
                    />
                </div>

                {/* ── Empty state ── */}
                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <p className="text-gray-700 font-medium text-sm mb-1">
                            {companies.length === 0 ? "No companies yet" : "No results found"}
                        </p>
                        <p className="text-gray-400 text-xs max-w-xs">
                            {companies.length === 0
                                ? "Add your first application to see companies listed here."
                                : `No companies match "${search}". Try a different search.`}
                        </p>
                        {companies.length === 0 && (
                            <button
                                onClick={openAddModal}
                                className="mt-5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                + Add your first company
                            </button>
                        )}
                    </div>
                )}

                {/* ── Company grid ── */}
                {filtered.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((company) => (
                            <div
                                key={company.id}
                                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col"
                            >
                                {/* Card header */}
                                <div className="flex items-start justify-between mb-3 gap-2">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <div className="w-7 h-7 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs font-bold text-blue-600 uppercase">
                                                    {company.name.charAt(0)}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                                {company.name}
                                            </h3>
                                        </div>
                                        {company.industry && (
                                            <p className="text-xs text-gray-400 mt-1 ml-9">{company.industry}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-0.5 flex-shrink-0">
                                        <button
                                            onClick={() => openEditModal(company)}
                                            className="text-xs text-gray-400 hover:text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded-md transition-colors font-medium"
                                            aria-label={`Edit ${company.name}`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(company.id, company.name)}
                                            className="text-xs text-gray-400 hover:text-red-600 hover:bg-red-50 px-2 py-1.5 rounded-md transition-colors font-medium"
                                            aria-label={`Delete ${company.name}`}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                {/* Website */}
                                {company.website && (
                                    <a
                                    href = { company.website }
                    target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 hover:underline mb-3 truncate transition-colors"
                    >
                                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                <span className="truncate">{company.website.replace(/^https?:\/\//, "")}</span>
                            </a>
                        )}

                        {/* Divider */}
                        <div className="border-t border-gray-100 pt-3 mt-auto">
                            {company.applications.length === 0 ? (
                                <p className="text-xs text-gray-400 italic">No applications tracked</p>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">
                                        {company.applications.length} {company.applications.length === 1 ? "application" : "applications"}
                                    </p>
                                    {company.applications.map((app) => (
                                        <div key={app.id} className="flex items-center justify-between gap-2">
                                            <span className="text-xs sm:text-sm text-gray-700 truncate">{app.roleTitle}</span>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize flex-shrink-0 ${STATUS_COLOR[app.status] ?? "bg-gray-100 text-gray-600"}`}>
                                                {app.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )}
        </div>

      {/* ── Modal ── */ }
    {
        showModal && (
            <div
                className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-50 px-0 sm:px-4"
                onClick={() => setShowModal(false)}
            >
                <div
                    className="bg-white w-full sm:max-w-md sm:rounded-xl rounded-t-2xl shadow-2xl p-6 pb-8 sm:pb-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal handle (mobile) */}
                    <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5 sm:hidden" />

                    <h2 className="text-lg font-semibold text-gray-900 mb-5">
                        {editing ? "Edit Company" : "Add Company"}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className={LABEL_CLASS}>
                                Company Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Google"

                                className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`}
                                value={form.name}
                                onChange={(e) => set("name", e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className={`text-sm font-medium text-gray-700 ${LABEL_CLASS}`}>Website</label>
                            <input
                                type="url"
                                placeholder="https://..."
                                className={`text-sm text-gray-700 placeholder:text-gray-400 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${INPUT_CLASS}`}
                                value={form.website}
                                onChange={(e) => set("website", e.target.value)}
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

                    {error && (
                        <div className="flex items-start gap-2 mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-9.25a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0v-3zm.75 6a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={() => setShowModal(false)}
                            className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting || !form.name.trim()}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                        >
                            {submitting ? "Saving..." : editing ? "Save Changes" : "Add Company"}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    </div >
    )
}