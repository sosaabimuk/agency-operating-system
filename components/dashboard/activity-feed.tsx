"use client"

import { motion } from "framer-motion"
import { activities } from "@/lib/data"
import { cn } from "@/lib/utils"
import { CheckCircle2, DollarSign, FileText, Users, Clock } from "lucide-react"

const typeConfig = {
  success: {
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
    icon: CheckCircle2,
    glow: "shadow-[0_0_8px_rgba(16,185,129,0.3)]",
  },
  info: {
    color: "text-info",
    bg: "bg-info/10",
    border: "border-info/20",
    icon: FileText,
    glow: "shadow-[0_0_8px_rgba(59,130,246,0.3)]",
  },
  warning: {
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
    icon: DollarSign,
    glow: "shadow-[0_0_8px_rgba(245,158,11,0.3)]",
  },
  neutral: {
    color: "text-foreground-muted",
    bg: "bg-surface-3",
    border: "border-border",
    icon: Users,
    glow: "",
  },
}

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="premium-card p-6 h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground tracking-tight">Recent Activity</h2>
          <p className="text-sm text-foreground-muted mt-0.5">Latest updates from your workspace</p>
        </div>
        <button className="text-sm text-foreground-secondary hover:text-accent transition-colors">View all</button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-border-prominent via-border to-transparent" />

        <div className="space-y-1">
          {activities.slice(0, 5).map((activity, index) => {
            const config = typeConfig[activity.type]
            const Icon = config.icon

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.08 }}
                className="relative flex gap-4 py-3 group"
              >
                {/* Timeline Node */}
                <div className="relative z-10">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-300",
                      config.bg,
                      config.border,
                      "group-hover:scale-105",
                      config.glow && "group-hover:" + config.glow,
                    )}
                  >
                    <Icon className={cn("h-4 w-4", config.color)} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-sm text-foreground leading-relaxed">{activity.message}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Clock className="h-3 w-3 text-foreground-faint" />
                    <p className="text-xs text-foreground-muted">{activity.timestamp}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
