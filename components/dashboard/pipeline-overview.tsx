"use client"

import { motion } from "framer-motion"
import { clients } from "@/lib/data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const pipelineStages = [
  { key: "lead", label: "Lead", color: "info", count: 0 },
  { key: "proposal", label: "Proposal", color: "warning", count: 0 },
  { key: "active", label: "Active", color: "success", count: 0 },
  { key: "completed", label: "Completed", color: "muted", count: 0 },
] as const

const stageStyles = {
  lead: {
    dot: "bg-info shadow-[0_0_8px_rgba(59,130,246,0.5)]",
    border: "hover:border-info/30",
    glow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]",
    badge: "bg-info/10 text-info border-info/20",
  },
  proposal: {
    dot: "bg-warning shadow-[0_0_8px_rgba(245,158,11,0.5)]",
    border: "hover:border-warning/30",
    glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]",
    badge: "bg-warning/10 text-warning border-warning/20",
  },
  active: {
    dot: "bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    border: "hover:border-success/30",
    glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]",
    badge: "bg-success/10 text-success border-success/20",
  },
  completed: {
    dot: "bg-foreground-muted",
    border: "hover:border-border-prominent",
    glow: "hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]",
    badge: "bg-foreground-muted/10 text-foreground-muted border-foreground-muted/20",
  },
}

export function PipelineOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="premium-card p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground tracking-tight">Client Pipeline</h2>
          <p className="text-sm text-foreground-muted mt-0.5">Track your sales funnel</p>
        </div>
        <Link
          href="/clients"
          className="flex items-center gap-1.5 text-sm text-foreground-secondary hover:text-accent transition-colors group"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Pipeline Grid */}
      <div className="grid grid-cols-4 gap-3">
        {pipelineStages.map((stage, index) => {
          const stageClients = clients.filter((c) => c.status === stage.key)
          const styles = stageStyles[stage.key]

          return (
            <motion.div
              key={stage.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
              className={cn(
                "relative rounded-xl p-4 transition-all duration-300 cursor-pointer group",
                "bg-surface-2 border border-border",
                styles.border,
                styles.glow,
              )}
            >
              {/* Stage Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className={cn("h-2 w-2 rounded-full", styles.dot)} />
                <span className="text-sm font-medium text-foreground">{stage.label}</span>
              </div>

              {/* Count */}
              <p className="text-3xl font-semibold text-foreground tabular-nums mb-4">{stageClients.length}</p>

              {/* Avatars */}
              <div className="flex -space-x-2">
                {stageClients.slice(0, 4).map((client, i) => (
                  <motion.div
                    key={client.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.08 + i * 0.05 }}
                  >
                    <Avatar className="h-7 w-7 border-2 border-surface-2 ring-1 ring-border">
                      <AvatarFallback className="bg-surface-3 text-foreground-secondary text-[10px] font-medium">
                        {client.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                ))}
                {stageClients.length > 4 && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-surface-2 bg-surface-3 text-[10px] text-foreground-muted font-medium ring-1 ring-border">
                    +{stageClients.length - 4}
                  </div>
                )}
              </div>

              {/* Connector Arrow (except last) */}
              {index < pipelineStages.length - 1 && (
                <div className="absolute -right-[7px] top-1/2 -translate-y-1/2 z-10 hidden md:block">
                  <div className="h-3 w-3 rotate-45 border-t border-r border-border bg-surface-2" />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
