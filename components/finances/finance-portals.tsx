"use client"

import { motion } from "framer-motion"
import { FileText, RefreshCw, Send, ArrowUpRight, AlertCircle } from "lucide-react"
import Link from "next/link"
import { invoices, retainers, proposals, getOutstandingAmount, getTotalMRR } from "@/lib/data"

export function FinancePortals() {
  const openInvoices = invoices.filter((i) => i.status === "pending" || i.status === "overdue")
  const overdueInvoices = invoices.filter((i) => i.status === "overdue")
  const activeRetainers = retainers.filter((r) => r.status === "active")
  const openProposals = proposals.filter((p) => p.status === "sent" || p.status === "viewed")

  const portals = [
    {
      id: "invoices",
      href: "/finances/invoices",
      icon: FileText,
      label: "Rechnungen",
      metric: openInvoices.length,
      metricLabel: "offen",
      sublabel: `€${getOutstandingAmount().toLocaleString("de-DE")} ausstehend`,
      hasAlert: overdueInvoices.length > 0,
      alertLabel: `${overdueInvoices.length} überfällig`,
    },
    {
      id: "retainers",
      href: "/finances/retainers",
      icon: RefreshCw,
      label: "Retainer",
      metric: activeRetainers.length,
      metricLabel: "aktiv",
      sublabel: `€${getTotalMRR().toLocaleString("de-DE")} MRR`,
    },
    {
      id: "proposals",
      href: "/finances/proposals",
      icon: Send,
      label: "Proposals",
      metric: openProposals.length,
      metricLabel: "offen",
      sublabel: `€${openProposals.reduce((s, p) => s + p.value, 0).toLocaleString("de-DE")} Pipeline`,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {portals.map((portal, index) => (
        <motion.div
          key={portal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        >
          <Link href={portal.href}>
            <div className="portal-block group">
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-foreground-muted group-hover:text-foreground transition-colors">
                    <portal.icon className="h-5 w-5" />
                  </div>
                  {portal.hasAlert && (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium">
                      <AlertCircle className="h-3 w-3" />
                      {portal.alertLabel}
                    </div>
                  )}
                </div>

                {/* Content */}
                <p className="text-sm text-foreground-muted mb-1">{portal.label}</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-foreground">{portal.metric}</span>
                  <span className="text-sm text-foreground-muted">{portal.metricLabel}</span>
                </div>
                <p className="text-sm text-foreground-faint">{portal.sublabel}</p>

                {/* Arrow */}
                <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-foreground-faint opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
