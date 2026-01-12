"use client"

import { motion } from "framer-motion"
import type { Client } from "@/lib/data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ClientListProps {
  clients: Client[]
}

const statusStyles = {
  lead: "border-info text-info bg-info/10",
  proposal: "border-warning text-warning bg-warning/10",
  active: "border-success text-success bg-success/10",
  paused: "border-foreground-muted text-foreground-muted bg-foreground-muted/10",
  completed: "border-success/50 text-success/70 bg-success/5",
}

const statusLabels = {
  lead: "Lead",
  proposal: "Proposal",
  active: "Active",
  paused: "Paused",
  completed: "Completed",
}

export function ClientList({ clients }: ClientListProps) {
  return (
    <div className="glass rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3 border-b border-border bg-background-tertiary">
        <div className="text-xs font-medium uppercase tracking-wide text-foreground-muted">Client</div>
        <div className="text-xs font-medium uppercase tracking-wide text-foreground-muted">Status</div>
        <div className="text-xs font-medium uppercase tracking-wide text-foreground-muted">MRR</div>
        <div className="text-xs font-medium uppercase tracking-wide text-foreground-muted">Projects</div>
        <div className="text-xs font-medium uppercase tracking-wide text-foreground-muted">Last Contact</div>
      </div>

      {/* Rows */}
      {clients.map((client, index) => (
        <motion.div
          key={client.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: index * 0.03 }}
        >
          <Link
            href={`/clients/${client.id}`}
            className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-background-tertiary transition-colors group"
          >
            {/* Client */}
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-background-secondary text-foreground text-xs font-medium">
                  {client.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors truncate">
                  {client.name}
                </p>
                <p className="text-xs text-foreground-muted truncate">{client.company}</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center">
              <Badge variant="outline" className={cn("text-xs font-medium", statusStyles[client.status])}>
                {statusLabels[client.status]}
              </Badge>
            </div>

            {/* MRR */}
            <div className="flex items-center">
              <span className="text-sm font-medium text-foreground tabular-nums">
                €{client.mrr.toLocaleString("de-DE")}
              </span>
            </div>

            {/* Projects */}
            <div className="flex items-center">
              <span className="text-sm text-foreground-secondary">{client.projects}</span>
            </div>

            {/* Last Contact */}
            <div className="flex items-center">
              <span className="text-sm text-foreground-muted">{client.lastContact}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
