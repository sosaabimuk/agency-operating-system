"use client"

import { motion } from "framer-motion"
import { Check, Circle, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Retainer } from "@/lib/data"

interface RetainerCardProps {
  retainer: Retainer
}

export function RetainerCard({ retainer }: RetainerCardProps) {
  const daysUntilBilling = Math.ceil(
    (new Date(retainer.nextBillingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  )
  const billingProgress = ((30 - daysUntilBilling) / 30) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="p-5 rounded-xl border border-border bg-background-secondary/30 hover:bg-background-secondary/50 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-background-tertiary flex items-center justify-center text-sm font-medium text-foreground-secondary">
            {retainer.clientName.slice(0, 2)}
          </div>
          <div>
            <h4 className="font-medium text-foreground">{retainer.clientName}</h4>
            <span
              className={cn(
                "text-xs px-1.5 py-0.5 rounded",
                retainer.status === "active" && "bg-success/20 text-success",
                retainer.status === "paused" && "bg-warning/20 text-warning",
                retainer.status === "cancelled" && "bg-error/20 text-error",
              )}
            >
              {retainer.status}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Amount & Progress */}
      <div className="p-4 rounded-lg bg-background-tertiary/50 mb-4">
        <p className="text-2xl font-semibold text-foreground tabular-nums mb-1">€{retainer.amount} / Monat</p>
        <div className="mb-2">
          <div className="h-1.5 rounded-full bg-background overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${billingProgress}%` }}
              className="h-full rounded-full bg-accent"
            />
          </div>
        </div>
        <p className="text-xs text-foreground-muted">
          Nächste Rechnung:{" "}
          {new Date(retainer.nextBillingDate).toLocaleDateString("de-DE", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground-muted">Laufzeit</span>
          <span className="text-foreground">
            Monat {retainer.currentMonth} von {retainer.minimumTermMonths}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground-muted">Start</span>
          <span className="text-foreground">
            {new Date(retainer.startDate).toLocaleDateString("de-DE", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Payment History */}
      <div className="border-t border-border pt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3">Zahlungshistorie</p>
        <div className="space-y-2">
          {retainer.paymentHistory.slice(0, 3).map((payment, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {payment.status === "paid" ? (
                  <Check className="h-3 w-3 text-success" />
                ) : (
                  <Circle className="h-3 w-3 text-foreground-muted" />
                )}
                <span className="text-foreground-secondary">{payment.month}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-foreground tabular-nums">€{payment.amount}</span>
                <span
                  className={cn(
                    "text-xs",
                    payment.status === "paid" && "text-success",
                    payment.status === "pending" && "text-warning",
                    payment.status === "upcoming" && "text-foreground-muted",
                  )}
                >
                  {payment.status === "paid" ? "Paid" : payment.status === "pending" ? "Pending" : "Upcoming"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
          Rechnung erstellen
        </Button>
        <Button variant="outline" size="sm">
          Pausieren
        </Button>
      </div>
    </motion.div>
  )
}
