"use client"

import { motion } from "framer-motion"
import { MoreHorizontal, Eye, Pencil, Archive, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Client } from "@/lib/data"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ClientCardProps {
  client: Client
  index: number
}

const statusConfig = {
  lead: {
    label: "Lead",
    dot: "bg-info shadow-[0_0_6px_rgba(59,130,246,0.5)]",
    badge: "bg-info/10 text-info border-info/20",
    glow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.08)]",
    border: "group-hover:border-info/30",
  },
  proposal: {
    label: "Proposal",
    dot: "bg-warning shadow-[0_0_6px_rgba(245,158,11,0.5)]",
    badge: "bg-warning/10 text-warning border-warning/20",
    glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]",
    border: "group-hover:border-warning/30",
  },
  active: {
    label: "Active",
    dot: "bg-success shadow-[0_0_6px_rgba(16,185,129,0.5)]",
    badge: "bg-success/10 text-success border-success/20",
    glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]",
    border: "group-hover:border-success/30",
  },
  paused: {
    label: "Paused",
    dot: "bg-foreground-muted",
    badge: "bg-surface-3 text-foreground-muted border-border",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]",
    border: "group-hover:border-border-prominent",
  },
  completed: {
    label: "Completed",
    dot: "bg-foreground-muted/50",
    badge: "bg-surface-3 text-foreground-muted border-border",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]",
    border: "group-hover:border-border-prominent",
  },
}

export function ClientCard({ client, index }: ClientCardProps) {
  const config = statusConfig[client.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
    >
      <div className={cn("premium-card premium-card-hover p-5", config.glow, config.border)}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-11 w-11 border-2 border-surface-3 ring-1 ring-border">
                <AvatarFallback className="bg-gradient-to-br from-surface-3 to-surface-2 text-foreground font-semibold text-sm">
                  {client.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {/* Status Dot */}
              <div
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface-1",
                  config.dot,
                )}
              />
            </div>

            {/* Status Badge */}
            <div className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold border", config.badge)}>
              {config.label}
            </div>
          </div>

          {/* Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 hover:bg-surface-3 transition-all">
                <MoreHorizontal className="h-4 w-4 text-foreground-muted" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 p-1.5 bg-surface-2 border-border rounded-xl">
              <DropdownMenuItem asChild className="cursor-pointer px-3 py-2 rounded-lg hover:bg-surface-3">
                <Link href={`/clients/${client.id}`}>
                  <Eye className="h-4 w-4 mr-2.5" />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer px-3 py-2 rounded-lg hover:bg-surface-3">
                <Pencil className="h-4 w-4 mr-2.5" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer px-3 py-2 rounded-lg hover:bg-surface-3 text-foreground-muted">
                <Archive className="h-4 w-4 mr-2.5" />
                Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Name & Company */}
        <Link href={`/clients/${client.id}`} className="block group/link">
          <h3 className="text-base font-semibold text-foreground group-hover/link:text-accent transition-colors flex items-center gap-2">
            {client.name}
            <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity text-foreground-muted" />
          </h3>
          <p className="text-sm text-foreground-muted mt-0.5">{client.company}</p>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {client.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-surface-3 border border-border text-foreground-muted text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {client.tags.length > 3 && (
            <span className="px-2 py-0.5 rounded-md bg-surface-3 border border-border text-foreground-faint text-xs font-medium">
              +{client.tags.length - 3}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-gradient-to-r from-transparent via-border-prominent to-transparent" />

        {/* Metrics */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <span className="text-foreground font-semibold tabular-nums">€{client.mrr.toLocaleString("de-DE")}</span>
            <span className="text-foreground-faint">/mo</span>
          </div>
          <div className="flex items-center gap-3 text-foreground-muted">
            <span>
              {client.projects} {client.projects === 1 ? "Project" : "Projects"}
            </span>
            {client.startDate !== "-" && (
              <>
                <span className="text-foreground-faint">·</span>
                <span className="text-foreground-faint">Since {client.startDate}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
