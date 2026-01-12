"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { projects, type Project } from "@/lib/data"

const statusConfig = {
  backlog: { label: "Backlog", color: "bg-foreground-muted/20 text-foreground-muted" },
  "in-progress": { label: "In Progress", color: "bg-accent/20 text-accent" },
  review: { label: "Review", color: "bg-info/20 text-info" },
  completed: { label: "Completed", color: "bg-success/20 text-success" },
}

const priorityConfig = {
  low: { label: "Low", color: "text-foreground-muted" },
  medium: { label: "Medium", color: "text-info" },
  high: { label: "High", color: "text-warning" },
  urgent: { label: "Urgent", color: "text-error" },
}

export function ProjectListView() {
  const router = useRouter()
  const [sortField, setSortField] = useState<keyof Project>("dueDate")
  const [sortAsc, setSortAsc] = useState(true)

  const sortedProjects = [...projects].sort((a, b) => {
    const aVal = a[sortField]
    const bVal = b[sortField]
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    }
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortAsc ? aVal - bVal : bVal - aVal
    }
    return 0
  })

  const handleSort = (field: keyof Project) => {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(true)
    }
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-background-secondary/50">
            <th className="px-4 py-3 text-left">
              <button
                onClick={() => handleSort("name")}
                className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground-muted hover:text-foreground transition-colors"
              >
                Project <ArrowUpDown className="h-3 w-3" />
              </button>
            </th>
            <th className="px-4 py-3 text-left">
              <span className="text-xs font-medium uppercase tracking-wider text-foreground-muted">Client</span>
            </th>
            <th className="px-4 py-3 text-left">
              <button
                onClick={() => handleSort("status")}
                className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground-muted hover:text-foreground transition-colors"
              >
                Status <ArrowUpDown className="h-3 w-3" />
              </button>
            </th>
            <th className="px-4 py-3 text-left">
              <button
                onClick={() => handleSort("priority")}
                className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground-muted hover:text-foreground transition-colors"
              >
                Priority <ArrowUpDown className="h-3 w-3" />
              </button>
            </th>
            <th className="px-4 py-3 text-left">
              <button
                onClick={() => handleSort("progress")}
                className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground-muted hover:text-foreground transition-colors"
              >
                Progress <ArrowUpDown className="h-3 w-3" />
              </button>
            </th>
            <th className="px-4 py-3 text-left">
              <button
                onClick={() => handleSort("dueDate")}
                className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground-muted hover:text-foreground transition-colors"
              >
                Due Date <ArrowUpDown className="h-3 w-3" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProjects.map((project, i) => (
            <motion.tr
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => router.push(`/projects/${project.id}`)}
              className="border-b border-border hover:bg-background-secondary/50 cursor-pointer transition-colors"
            >
              <td className="px-4 py-3">
                <span className="font-medium text-foreground">{project.name}</span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-background-tertiary flex items-center justify-center text-[10px] font-medium text-foreground-secondary">
                    {project.clientAvatar || project.clientName.slice(0, 2)}
                  </div>
                  <span className="text-sm text-foreground-secondary">{project.clientName}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={cn("px-2 py-1 rounded-md text-xs font-medium", statusConfig[project.status].color)}>
                  {statusConfig[project.status].label}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={cn("text-sm font-medium", priorityConfig[project.priority].color)}>
                  {priorityConfig[project.priority].label}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-background-tertiary overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", project.progress === 100 ? "bg-success" : "bg-accent")}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-foreground-muted tabular-nums">{project.progress}%</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="text-sm text-foreground-secondary">
                  {new Date(project.dueDate).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
