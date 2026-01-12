"use client"

import { motion } from "framer-motion"
import { TrendingUp, RefreshCw, AlertCircle, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { getTotalMRR, getOutstandingAmount, getRevenueMTD, invoices } from "@/lib/data"

export function FinanceMetrics() {
  const mrr = getTotalMRR()
  const outstanding = getOutstandingAmount()
  const revenueMTD = getRevenueMTD()
  const avgProjectValue =
    invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.total, 0) /
    invoices.filter((i) => i.status === "paid").length

  const metrics = [
    {
      label: "Revenue MTD",
      value: `€${revenueMTD.toLocaleString("de-DE", { minimumFractionDigits: 0 })}`,
      change: "+23% vs LM",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      label: "MRR",
      value: `€${mrr.toLocaleString("de-DE")}`,
      change: "+€850 neu",
      changeType: "positive" as const,
      icon: RefreshCw,
    },
    {
      label: "Outstanding",
      value: `€${outstanding.toLocaleString("de-DE", { minimumFractionDigits: 0 })}`,
      change: `${invoices.filter((i) => i.status === "pending" || i.status === "overdue").length} Rechnungen`,
      changeType: outstanding > 500 ? ("warning" as const) : ("neutral" as const),
      icon: AlertCircle,
    },
    {
      label: "Avg Project",
      value: `€${avgProjectValue.toLocaleString("de-DE", { minimumFractionDigits: 0 })}`,
      change: `aus ${invoices.filter((i) => i.status === "paid").length} Proj.`,
      changeType: "neutral" as const,
      icon: BarChart3,
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-5 rounded-xl border border-border bg-background-secondary/30 hover:bg-background-secondary/50 transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">{metric.label}</span>
            <metric.icon
              className={cn(
                "h-4 w-4",
                metric.changeType === "warning" && "text-warning",
                metric.changeType === "positive" && "text-success",
                metric.changeType === "neutral" && "text-foreground-muted",
              )}
            />
          </div>
          <p className="text-3xl font-semibold text-foreground tracking-tight tabular-nums mb-2">{metric.value}</p>
          <p
            className={cn(
              "text-xs",
              metric.changeType === "positive" && "text-success",
              metric.changeType === "warning" && "text-warning",
              metric.changeType === "neutral" && "text-foreground-muted",
            )}
          >
            {metric.change}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
