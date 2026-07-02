"use client"

import { useState }  from "react"
import { useRouter } from "next/navigation"

const COLUMNS = [
  { id: "applied",   label: "Applied",   color: "bg-blue-100   border-blue-300   text-blue-700",   dot: "bg-blue-400",   card: "hover:border-blue-300"   },
  { id: "interview", label: "Interview", color: "bg-yellow-100 border-yellow-300 text-yellow-700", dot: "bg-yellow-400", card: "hover:border-yellow-300" },
  { id: "offer",     label: "Offer",     color: "bg-purple-100 border-purple-300 text-purple-700", dot: "bg-purple-400", card: "hover:border-purple-300" },
  { id: "accepted",  label: "Accepted",  color: "bg-green-100  border-green-300  text-green-700",  dot: "bg-green-400",  card: "hover:border-green-300"  },
  { id: "rejected",  label: "Rejected",  color: "bg-red-100    border-red-300    text-red-700",    dot: "bg-red-400",    card: "hover:border-red-300"    },
]

type Application = {
  id:        string
  roleTitle: string
  status:    string
  jobUrl:    string | null
  notes:     string | null
  deadline:  string | null
  company:   { name: string } | null
}

export default function KanbanBoard({ initialApplications }: { initialApplications: Application[] }) {
  const router = useRouter()
  const [applications, setApplications] = useState(initialApplications)
  const [draggingId,   setDraggingId]   = useState<string | null>(null)
  const [overColumn,   setOverColumn]   = useState<string | null>(null)
  const [activeTab,    setActiveTab]    = useState("applied")

  const getColumnApps = (status: string) =>
    applications.filter((a) => a.status === status)

  function handleDragStart(id: string) { setDraggingId(id) }
  function handleDragEnd()             { setDraggingId(null); setOverColumn(null) }

  function handleDragOver(e: React.DragEvent, colId: string) {
    e.preventDefault()
    setOverColumn(colId)
  }

  async function handleDrop(e: React.DragEvent, newStatus: string) {
    e.preventDefault()
    setOverColumn(null)
    if (!draggingId) return
    const app = applications.find((a) => a.id === draggingId)
    if (!app || app.status === newStatus) { setDraggingId(null); return }
    setApplications((prev) => prev.map((a) => a.id === draggingId ? { ...a, status: newStatus } : a))
    setDraggingId(null)
    await fetch(`/api/applications/${draggingId}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
  }

  async function deleteApplication(e: React.MouseEvent, id: string) {
    e.stopPropagation()
    if (!confirm("Delete this application?")) return
    setApplications((prev) => prev.filter((a) => a.id !== id))
    await fetch(`/api/applications/${id}`, { method: "DELETE" })
  }

  const isDeadlineSoon = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000)
    return days <= 3 && days >= 0
  }

  const isDeadlinePast = (deadline: string) => new Date(deadline) < new Date()

  return (
    <div>
      {/* ── Mobile tab bar ── */}
      <div className="flex lg:hidden overflow-x-auto gap-2 mb-4 pb-1 scrollbar-hide">
        {COLUMNS.map((col) => (
          <button
            key={col.id}
            onClick={() => setActiveTab(col.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              activeTab === col.id
                ? col.color + " shadow-sm"
                : "bg-white border-gray-200 text-gray-500"
            }`}
          >
            {col.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeTab === col.id ? "bg-white bg-opacity-60" : "bg-gray-100 text-gray-500"
            }`}>
              {getColumnApps(col.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── Mobile single-column view ── */}
      <div className="lg:hidden">
        {COLUMNS.filter((col) => col.id === activeTab).map((col) => (
          <div key={col.id}>
            {getColumnApps(col.id).length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-400 text-sm">No applications here yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {getColumnApps(col.id).map((app) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    col={col}
                    draggingId={draggingId}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onClick={() => router.push(`/dashboard/applications/${app.id}`)}
                    onDelete={deleteApplication}
                    isDeadlineSoon={isDeadlineSoon}
                    isDeadlinePast={isDeadlinePast}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Desktop Kanban ── */}
      <div className="hidden lg:flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            className="flex-shrink-0 w-72"
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDrop={(e) => handleDrop(e, col.id)}
            onDragLeave={() => setOverColumn(null)}
          >
            {/* Column header */}
            <div className={`flex items-center justify-between px-3 py-2.5 rounded-t-xl border-2 ${col.color}`}>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                <span className="font-semibold text-sm">{col.label}</span>
              </div>
              <span className="text-xs font-bold bg-white bg-opacity-70 px-2 py-0.5 rounded-full">
                {getColumnApps(col.id).length}
              </span>
            </div>

            {/* Column body */}
            <div
              className={`min-h-40 p-2 rounded-b-xl border-2 border-t-0 transition-colors duration-150 ${
                overColumn === col.id ? "bg-gray-100 scale-[1.01]" : "bg-gray-50"
              } ${col.color.split(" ")[1]}`}
            >
              {getColumnApps(col.id).length === 0 && (
                <div className="flex items-center justify-center h-20 border-2 border-dashed border-gray-200 rounded-lg mt-1">
                  <p className="text-xs text-gray-300 font-medium">Drop here</p>
                </div>
              )}
              {getColumnApps(col.id).map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  col={col}
                  draggingId={draggingId}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onClick={() => router.push(`/dashboard/applications/${app.id}`)}
                  onDelete={deleteApplication}
                  isDeadlineSoon={isDeadlineSoon}
                  isDeadlinePast={isDeadlinePast}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AppCard({ app, col, draggingId, onDragStart, onDragEnd, onClick, onDelete, isDeadlineSoon, isDeadlinePast }: {
  app:             Application
  col:             typeof COLUMNS[number]
  draggingId:      string | null
  onDragStart:     (id: string) => void
  onDragEnd:       () => void
  onClick:         () => void
  onDelete:        (e: React.MouseEvent, id: string) => void
  isDeadlineSoon:  (d: string) => boolean
  isDeadlinePast:  (d: string) => boolean
}) {
  const soon = app.deadline && isDeadlineSoon(app.deadline)
  const past = app.deadline && isDeadlinePast(app.deadline)

  return (
    <div
      draggable
      onDragStart={() => onDragStart(app.id)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={`bg-white rounded-xl p-3.5 mb-2 border transition-all duration-150 cursor-pointer group
        ${draggingId === app.id ? "opacity-40 rotate-1 shadow-xl scale-95" : "shadow-sm hover:shadow-md"}
        ${col.card} ${past ? "border-l-4 border-l-red-400" : soon ? "border-l-4 border-l-orange-400" : "border-gray-200"}
      `}
    >
      {/* Company */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
          <span className="text-gray-500 font-bold text-xs uppercase leading-none">
            {(app.company?.name ?? "?").charAt(0)}
          </span>
        </div>
        <p className="text-xs text-gray-400 font-medium truncate">
          {app.company?.name ?? "No company"}
        </p>
      </div>

      {/* Role */}
      <p className="font-semibold text-gray-800 text-sm leading-tight mb-2.5 line-clamp-2">
        {app.roleTitle}
      </p>

      {/* Deadline */}
      {app.deadline && (
        <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full mb-2.5 ${
          past ? "bg-red-50 text-red-600" : soon ? "bg-orange-50 text-orange-600" : "bg-gray-50 text-gray-500"
        }`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {past ? "Expired · " : soon ? "Soon · " : ""}
          {new Date(app.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </div>
      )}

      {/* Footer actions */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        {app.jobUrl ? (
          <a
            href={app.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Job
          </a>
        ) : <span />}
        <button
          onClick={(e) => onDelete(e, app.id)}
          className="text-xs text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
        >
          Delete
        </button>
      </div>
    </div>
  )
}