"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Eye, Send, Copy, Check, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Invoice } from "@/lib/data"

interface InvoiceDetailProps {
  invoice: Invoice
  onBack: () => void
}

const statusConfig = {
  draft: { label: "Draft", color: "bg-foreground-muted/20 text-foreground-muted border-foreground-muted/30" },
  sent: { label: "Sent", color: "bg-info/20 text-info border-info/30" },
  pending: { label: "Pending", color: "bg-warning/20 text-warning border-warning/30" },
  paid: { label: "Paid", color: "bg-success/20 text-success border-success/30" },
  overdue: { label: "Overdue", color: "bg-error/20 text-error border-error/30" },
}

export function InvoiceDetail({ invoice, onBack }: InvoiceDetailProps) {
  const timeline = [
    { label: "Created", date: invoice.createdAt, completed: true },
    { label: `Sent to ${invoice.clientName.toLowerCase()}@...`, date: invoice.sentAt, completed: !!invoice.sentAt },
    { label: "Viewed by recipient", date: null, completed: invoice.status !== "draft" && invoice.status !== "sent" },
    { label: "Payment received", date: invoice.paidDate, completed: invoice.status === "paid" },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Invoices
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-1">Invoice {invoice.invoiceNumber}</h1>
          <p className="text-foreground-secondary">Client: {invoice.clientName}</p>
        </div>
        <span className={cn("px-3 py-1.5 rounded-lg text-sm font-medium border", statusConfig[invoice.status].color)}>
          {statusConfig[invoice.status].label}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-border bg-background-secondary/30">
          <p className="text-xs text-foreground-muted uppercase tracking-wider mb-1">Amount</p>
          <p className="text-xl font-semibold text-foreground tabular-nums">
            €{invoice.total.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-background-secondary/30">
          <p className="text-xs text-foreground-muted uppercase tracking-wider mb-1">Created</p>
          <p className="text-sm text-foreground">
            {new Date(invoice.createdAt).toLocaleDateString("de-DE", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-background-secondary/30">
          <p className="text-xs text-foreground-muted uppercase tracking-wider mb-1">Due Date</p>
          <p className={cn("text-sm", invoice.status === "overdue" ? "text-error" : "text-foreground")}>
            {new Date(invoice.dueDate).toLocaleDateString("de-DE", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-6 rounded-xl border border-border bg-background-secondary/30 mb-8">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-6">Timeline</h3>
        <div className="space-y-4">
          {timeline.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                {item.completed ? (
                  <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                    <Check className="h-3 w-3 text-success-foreground" />
                  </div>
                ) : (
                  <Circle className="h-6 w-6 text-foreground-muted" />
                )}
                {i < timeline.length - 1 && (
                  <div className={cn("w-0.5 h-8 mt-1", item.completed ? "bg-success" : "bg-border")} />
                )}
              </div>
              <div className="pt-0.5">
                <p className={cn("text-sm", item.completed ? "text-foreground" : "text-foreground-muted")}>
                  {item.label}
                </p>
                {item.date && (
                  <p className="text-xs text-foreground-muted">
                    {new Date(item.date).toLocaleDateString("de-DE", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
                {!item.date && !item.completed && <p className="text-xs text-foreground-muted">Pending</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 bg-transparent">
          <Eye className="h-4 w-4 mr-2" />
          View PDF
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          <Send className="h-4 w-4 mr-2" />
          Send Reminder
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          <Copy className="h-4 w-4 mr-2" />
          Copy Payment Link
        </Button>
        {invoice.status !== "paid" && (
          <Button className="flex-1 bg-success hover:bg-success/90 text-success-foreground">
            <Check className="h-4 w-4 mr-2" />
            Mark as Paid
          </Button>
        )}
      </div>
    </motion.div>
  )
}
