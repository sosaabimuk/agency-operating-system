"use client"

import { motion } from "framer-motion"
import { Eye, Copy, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Proposal } from "@/lib/data"

interface ProposalCardProps {
  proposal: Proposal
}

const statusConfig = {
  draft: { label: "Draft", color: "bg-foreground-muted/20 text-foreground-muted" },
  sent: { label: "Sent", color: "bg-info/20 text-info" },
  viewed: { label: "Viewed", color: "bg-warning/20 text-warning" },
  accepted: { label: "Accepted", color: "bg-success/20 text-success" },
  declined: { label: "Declined", color: "bg-error/20 text-error" },
  expired: { label: "Expired", color: "bg-foreground-muted/20 text-foreground-muted line-through" },
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="p-5 rounded-xl border border-border bg-background-secondary/30 hover:bg-background-secondary/50 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium text-foreground mb-1">Proposal für {proposal.clientName}</h4>
          <p className="text-sm text-foreground-secondary">"{proposal.title}"</p>
        </div>
        <span className={cn("px-2 py-1 rounded-md text-xs font-medium", statusConfig[proposal.status].color)}>
          {statusConfig[proposal.status].label}
        </span>
      </div>

      {/* Value */}
      <div className="p-3 rounded-lg bg-background-tertiary/50 mb-4">
        <p className="text-xl font-semibold text-foreground tabular-nums">
          €{proposal.value.toLocaleString()}
          {proposal.recurringValue && (
            <span className="text-sm font-normal text-foreground-muted"> + €{proposal.recurringValue}/mo</span>
          )}
        </p>
      </div>

      {/* Dates */}
      <div className="space-y-1 text-sm mb-4">
        {proposal.sentDate && (
          <div className="flex items-center justify-between">
            <span className="text-foreground-muted">Sent</span>
            <span className="text-foreground-secondary">
              {new Date(proposal.sentDate).toLocaleDateString("de-DE", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        )}
        {proposal.acceptedDate && (
          <div className="flex items-center justify-between">
            <span className="text-foreground-muted">Accepted</span>
            <span className="text-success">
              {new Date(proposal.acceptedDate).toLocaleDateString("de-DE", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
          <Eye className="h-3 w-3 mr-1" />
          View
        </Button>
        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
          <Copy className="h-3 w-3 mr-1" />
          Duplicate
        </Button>
        {proposal.status === "accepted" && (
          <Button variant="outline" size="sm">
            <FileText className="h-3 w-3 mr-1" />
            Invoice
          </Button>
        )}
      </div>
    </motion.div>
  )
}
