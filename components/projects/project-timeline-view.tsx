"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { projects } from "@/lib/data"

const statusColors = {
  backlog: "bg-foreground-muted/50",
  "in-progress": "bg-accent",
  review: "bg-info",
  completed: "bg-success",
}

export function ProjectTimelineView() {
  const [zoom, setZoom] = useState<"week" | "month" | "quarter">("month")
  const [offset, setOffset] = useState(0)

  const today = new Date()
  const startDate = new Date(today.getFullYear(), today.getMonth() + offset, 1)
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth() + offset + (zoom === "week" ? 0.25 : zoom === "month" ? 1 : 3),
    0,
  )

  const days = []
  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    days.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + (zoom === "week" ? 1 : zoom === "month" ? 1 : 7))
  }

  const getProjectPosition = (dueDate: string) => {
    const due = new Date(dueDate)
    const start = startDate.getTime()
    const end = endDate.getTime()
    const dueTime = due.getTime()

    if (dueTime < start || dueTime > end) return null

    return ((dueTime - start) / (end - start)) * 100
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-background-secondary/30">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOffset(offset - 1)}
            className="p-1.5 rounded-md hover:bg-background-tertiary text-foreground-muted hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-foreground min-w-[120px] text-center">
            {startDate.toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
          </span>
          <button
            onClick={() => setOffset(offset + 1)}
            className="p-1.5 rounded-md hover:bg-background-tertiary text-foreground-muted hover:text-foreground transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-1 bg-background-tertiary rounded-lg p-1">
          {(["week", "month", "quarter"] as const).map((z) => (
            <button
              key={z}
              onClick={() => setZoom(z)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                zoom === z ? "bg-background text-foreground" : "text-foreground-muted hover:text-foreground",
              )}
            >
              {z === "week" ? "Woche" : z === "month" ? "Monat" : "Quartal"}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="relative p-4">
        {/* Day Headers */}
        <div className="flex mb-4 border-b border-border pb-2">
          <div className="w-48 shrink-0" />
          <div className="flex-1 flex">
            {days.map((day, i) => (
              <div key={i} className="flex-1 text-center text-[10px] uppercase tracking-wider text-foreground-muted">
                {day.toLocaleDateString("de-DE", { day: "numeric" })}
              </div>
            ))}
          </div>
        </div>

        {/* Today Marker */}
        {today >= startDate && today <= endDate && (
          <div
            className="absolute top-0 bottom-0 w-px bg-accent z-10"
            style={{
              left: `calc(192px + ${((today.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) * (100 - 15)}%)`,
            }}
          >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-accent text-[10px] font-medium text-accent-foreground whitespace-nowrap">
              Heute
            </div>
          </div>
        )}

        {/* Projects */}
        <div className="space-y-3">
          {projects.map((project, i) => {
            const position = getProjectPosition(project.dueDate)

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4"
              >
                <div className="w-48 shrink-0 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-background-tertiary flex items-center justify-center text-[10px] font-medium text-foreground-secondary">
                    {project.clientAvatar}
                  </div>
                  <span className="text-sm font-medium text-foreground truncate">{project.name}</span>
                </div>
                <div className="flex-1 relative h-8">
                  <div className="absolute inset-0 bg-background-tertiary/30 rounded-md" />
                  {position !== null && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${position}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className={cn(
                        "absolute left-0 top-0 bottom-0 rounded-md flex items-center justify-end pr-2",
                        statusColors[project.status],
                      )}
                    >
                      <span className="text-[10px] font-medium text-background truncate">{project.progress}%</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
