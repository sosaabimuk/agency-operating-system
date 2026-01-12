"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Milestone } from "@/lib/data"

interface MilestoneTimelineProps {
  milestones: Milestone[]
}

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  return (
    <div className="relative py-4">
      {/* Line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

      {/* Progress Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: `${(milestones.filter((m) => m.status === "completed").length / milestones.length) * 100}%`,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-1/2 left-0 h-0.5 bg-accent -translate-y-1/2"
      />

      {/* Milestones */}
      <div className="relative flex justify-between">
        {milestones.map((milestone, i) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            {/* Dot */}
            <div
              className={cn(
                "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                milestone.status === "completed" && "bg-accent border-accent",
                milestone.status === "active" && "bg-background border-accent animate-pulse",
                milestone.status === "pending" && "bg-background-secondary border-border",
              )}
            >
              {milestone.status === "completed" ? (
                <Check className="h-4 w-4 text-accent-foreground" />
              ) : milestone.status === "active" ? (
                <div className="w-2 h-2 rounded-full bg-accent" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-foreground-muted" />
              )}
            </div>

            {/* Label */}
            <div className="mt-3 text-center">
              <p
                className={cn(
                  "text-sm font-medium",
                  milestone.status === "completed" && "text-foreground",
                  milestone.status === "active" && "text-accent",
                  milestone.status === "pending" && "text-foreground-muted",
                )}
              >
                {milestone.name}
              </p>
              <p className="text-[10px] text-foreground-muted mt-0.5">
                {new Date(milestone.date).toLocaleDateString("de-DE", { day: "numeric", month: "short" })}
              </p>
              {milestone.status === "completed" && <p className="text-[10px] text-success mt-0.5">Done</p>}
              {milestone.status === "active" && <p className="text-[10px] text-accent mt-0.5">Active</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
