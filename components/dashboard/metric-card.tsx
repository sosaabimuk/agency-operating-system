"use client"

import { motion } from "framer-motion"
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
  trend?: {
    value: string
    positive: boolean
  }
  delay?: number
  accentColor?: "orange" | "green" | "blue" | "default"
}

const accentStyles = {
  orange: {
    icon: "text-accent",
    iconBg: "bg-accent/10",
    glow: "group-hover:shadow-[0_0_40px_rgba(255,79,0,0.15)]",
    border: "group-hover:border-accent/30",
  },
  green: {
    icon: "text-success",
    iconBg: "bg-success/10",
    glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    border: "group-hover:border-success/30",
  },
  blue: {
    icon: "text-info",
    iconBg: "bg-info/10",
    glow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
    border: "group-hover:border-info/30",
  },
  default: {
    icon: "text-foreground-secondary",
    iconBg: "bg-surface-3",
    glow: "group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]",
    border: "group-hover:border-border-prominent",
  },
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  delay = 0,
  accentColor = "orange",
}: MetricCardProps) {
  const styles = accentStyles[accentColor]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
    >
      {/* Card */}
      <div className={cn("premium-card premium-card-hover p-6", styles.glow, styles.border)}>
        {/* Top Row */}
        <div className="flex items-start justify-between mb-6">
          {/* Icon Container */}
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300",
              styles.iconBg,
              "group-hover:scale-105",
            )}
          >
            <Icon className={cn("h-5 w-5 transition-all duration-300", styles.icon)} />
          </div>

          {/* Trend Badge */}
          {trend && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.2 }}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all duration-300",
                trend.positive
                  ? "bg-success/10 text-success border-success/20 group-hover:bg-success/15"
                  : "bg-error/10 text-error border-error/20 group-hover:bg-error/15",
              )}
            >
              {trend.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{trend.value}</span>
            </motion.div>
          )}
        </div>

        {/* Label */}
        <p className="label-uppercase mb-2">{title}</p>

        {/* Value */}
        <p className="text-3xl font-semibold tracking-tight text-foreground tabular-nums mb-1">{value}</p>

        {/* Subtitle */}
        <p className="text-sm text-foreground-muted">{subtitle}</p>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-border-prominent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}
