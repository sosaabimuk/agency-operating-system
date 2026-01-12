"use client"

import { motion } from "framer-motion"
import { projects } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Calendar, CheckCircle2 } from "lucide-react"

function getDaysUntil(dateString: string): number {
  const date = new Date(dateString)
  const today = new Date()
  const diffTime = date.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
  })
}

export function DeadlineList() {
  const upcomingProjects = projects
    .filter((p) => p.status !== "completed")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="premium-card p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground tracking-tight">Upcoming Deadlines</h2>
          <p className="text-sm text-foreground-muted mt-0.5">Next 4 due dates</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-3 border border-border">
          <Calendar className="h-5 w-5 text-foreground-muted" />
        </div>
      </div>

      {upcomingProjects.length > 0 ? (
        <div className="space-y-3">
          {upcomingProjects.map((project, index) => {
            const daysUntil = getDaysUntil(project.dueDate)
            const isUrgent = daysUntil <= 3
            const isWarning = daysUntil > 3 && daysUntil <= 7

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.08 }}
                className={cn(
                  "group relative p-4 rounded-xl transition-all duration-300 cursor-pointer",
                  "bg-surface-2 border border-border",
                  "hover:border-border-prominent hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]",
                  isUrgent && "border-error/30 hover:border-error/50",
                  isWarning && "border-warning/20 hover:border-warning/40",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">
                        {project.name}
                      </p>
                    </div>
                    <p className="text-xs text-foreground-muted mb-3">{project.clientName}</p>

                    {/* Progress Bar */}
                    <div className="relative h-1.5 bg-surface-inset rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                        className={cn(
                          "absolute inset-y-0 left-0 rounded-full",
                          project.progress >= 80 ? "bg-success" : project.progress >= 50 ? "bg-info" : "bg-accent",
                        )}
                      />
                    </div>
                    <p className="text-[10px] text-foreground-faint mt-1.5">{project.progress}% complete</p>
                  </div>

                  {/* Due Date Badge */}
                  <div
                    className={cn(
                      "shrink-0 flex flex-col items-center justify-center px-3 py-2 rounded-lg border",
                      isUrgent
                        ? "bg-error/10 border-error/30 text-error"
                        : isWarning
                          ? "bg-warning/10 border-warning/30 text-warning"
                          : "bg-surface-3 border-border text-foreground-secondary",
                    )}
                  >
                    <span className="text-lg font-semibold tabular-nums leading-none">
                      {formatDate(project.dueDate).split(" ")[0]}
                    </span>
                    <span className="text-[10px] uppercase tracking-wide mt-0.5">
                      {formatDate(project.dueDate).split(" ")[1]}
                    </span>
                  </div>
                </div>

                {/* Urgent Indicator */}
                {isUrgent && (
                  <div className="absolute -left-px top-1/2 -translate-y-1/2 w-[3px] h-8 bg-error rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                )}
              </motion.div>
            )
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-10 text-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 border border-success/20 mb-3">
            <CheckCircle2 className="h-6 w-6 text-success" />
          </div>
          <p className="text-sm font-medium text-foreground">All caught up!</p>
          <p className="text-xs text-foreground-muted mt-1">No upcoming deadlines this week</p>
        </motion.div>
      )}
    </motion.div>
  )
}
