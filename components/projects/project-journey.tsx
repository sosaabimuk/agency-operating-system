"use client"

import { motion } from "framer-motion"
import { Circle, Clock, ArrowRight } from "lucide-react"
import type { Project } from "@/lib/data"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ProjectJourneyProps {
  projects: Project[]
}

const statusConfig = {
  backlog: { label: "Backlog", color: "text-foreground-muted", bg: "bg-foreground-muted/20" },
  "in-progress": { label: "In Arbeit", color: "text-accent", bg: "bg-accent/20" },
  review: { label: "Review", color: "text-blue-400", bg: "bg-blue-400/20" },
  completed: { label: "Fertig", color: "text-green-400", bg: "bg-green-400/20" },
}

export function ProjectJourney({ projects }: ProjectJourneyProps) {
  // Group by status for the journey view
  const inProgress = projects.filter((p) => p.status === "in-progress")
  const review = projects.filter((p) => p.status === "review")
  const backlog = projects.filter((p) => p.status === "backlog")

  return (
    <div className="space-y-8">
      {/* NOW - Active projects */}
      <div>
        <h3 className="section-title mb-4 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          NOW
        </h3>
        <div className="space-y-3">
          {inProgress.map((project, index) => (
            <ProjectJourneyCard key={project.id} project={project} index={index} />
          ))}
          {inProgress.length === 0 && <p className="text-foreground-muted text-sm py-4">Keine aktiven Projekte</p>}
        </div>
      </div>

      {/* NEXT - Review */}
      <div>
        <h3 className="section-title mb-4 flex items-center gap-2">
          <Clock className="h-3 w-3 text-blue-400" />
          NEXT
        </h3>
        <div className="space-y-3">
          {review.map((project, index) => (
            <ProjectJourneyCard key={project.id} project={project} index={index} variant="muted" />
          ))}
          {review.length === 0 && <p className="text-foreground-faint text-sm py-4">Nichts in Review</p>}
        </div>
      </div>

      {/* LATER - Backlog */}
      <div>
        <h3 className="section-title mb-4 flex items-center gap-2">
          <Circle className="h-3 w-3 text-foreground-faint" />
          LATER
        </h3>
        <div className="space-y-3 opacity-60">
          {backlog.slice(0, 3).map((project, index) => (
            <ProjectJourneyCard key={project.id} project={project} index={index} variant="faint" />
          ))}
          {backlog.length > 3 && <p className="text-foreground-faint text-sm">+{backlog.length - 3} weitere</p>}
        </div>
      </div>
    </div>
  )
}

interface ProjectJourneyCardProps {
  project: Project
  index: number
  variant?: "default" | "muted" | "faint"
}

function ProjectJourneyCard({ project, index, variant = "default" }: ProjectJourneyCardProps) {
  const config = statusConfig[project.status]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/projects/${project.id}`}>
        <div
          className={cn(
            "group glass-card p-4 hover-lift cursor-pointer",
            variant === "default" && "border-l-2 border-l-accent",
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="font-medium text-foreground truncate group-hover:text-accent transition-colors">
                  {project.name}
                </h4>
                {project.priority === "high" || project.priority === "urgent" ? (
                  <span className="px-2 py-0.5 rounded text-xs bg-accent/20 text-accent">{project.priority}</span>
                ) : null}
              </div>
              <p className="text-sm text-foreground-muted">{project.clientName}</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Progress */}
              <div className="text-right">
                <p className="text-lg font-semibold text-foreground tabular-nums">{project.progress}%</p>
                <div className="h-1 w-16 rounded-full bg-white/10 overflow-hidden mt-1">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${project.progress}%` }} />
                </div>
              </div>

              <ArrowRight className="h-4 w-4 text-foreground-faint opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
