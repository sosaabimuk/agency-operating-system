"use client"

import { motion } from "framer-motion"
import { Users, FolderKanban, Receipt, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const actions = [
  {
    label: "New Client",
    description: "Add a new client to your workspace",
    href: "/clients/new",
    icon: Users,
    color: "accent",
  },
  {
    label: "New Project",
    description: "Start a new project",
    href: "/projects/new",
    icon: FolderKanban,
    color: "info",
  },
  {
    label: "Create Invoice",
    description: "Bill your clients",
    href: "/finances/new-invoice",
    icon: Receipt,
    color: "success",
  },
]

const colorStyles = {
  accent: {
    icon: "text-accent",
    iconBg: "bg-accent/10 border-accent/20 group-hover:bg-accent/15",
    glow: "group-hover:shadow-[0_0_20px_rgba(255,79,0,0.15)]",
  },
  info: {
    icon: "text-info",
    iconBg: "bg-info/10 border-info/20 group-hover:bg-info/15",
    glow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
  },
  success: {
    icon: "text-success",
    iconBg: "bg-success/10 border-success/20 group-hover:bg-success/15",
    glow: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  },
}

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="premium-card p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
          <Sparkles className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground tracking-tight">Quick Actions</h2>
          <p className="text-sm text-foreground-muted">Common tasks at your fingertips</p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        {actions.map((action, index) => {
          const styles = colorStyles[action.color as keyof typeof colorStyles]

          return (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.08 }}
            >
              <Link href={action.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group",
                    "bg-surface-2 border border-border",
                    "hover:border-border-prominent",
                    styles.glow,
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300",
                      styles.iconBg,
                    )}
                  >
                    <action.icon className={cn("h-5 w-5 transition-colors", styles.icon)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {action.label}
                    </p>
                    <p className="text-xs text-foreground-muted truncate">{action.description}</p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="h-4 w-4 text-foreground-faint group-hover:text-foreground-muted group-hover:translate-x-1 transition-all" />
                </motion.div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
