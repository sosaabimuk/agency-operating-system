"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Download, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FinanceMetrics } from "./finance-metrics"
import { RevenueChart } from "./revenue-chart"
import { InvoiceTable } from "./invoice-table"
import { InvoiceDetail } from "./invoice-detail"
import { RetainerCard } from "./retainer-card"
import { ProposalCard } from "./proposal-card"
import { retainers, proposals, type Invoice } from "@/lib/data"

type Tab = "all" | "invoices" | "retainers" | "proposals"

export function FinancesPageContent() {
  const [activeTab, setActiveTab] = useState<Tab>("invoices")
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const tabs: { id: Tab; label: string }[] = [
    { id: "invoices", label: "Invoices" },
    { id: "retainers", label: "Retainers" },
    { id: "proposals", label: "Proposals" },
  ]

  if (selectedInvoice) {
    return <InvoiceDetail invoice={selectedInvoice} onBack={() => setSelectedInvoice(null)} />
  }

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-foreground tracking-tight mb-1">Finances</h1>
            <p className="text-foreground-secondary">Revenue, Invoices und Zahlungen</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              This Month
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Neue Rechnung
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="mb-8">
        <FinanceMetrics />
      </div>

      {/* Chart */}
      <div className="mb-8">
        <RevenueChart />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab.id
                ? "border-accent text-foreground"
                : "border-transparent text-foreground-muted hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === "invoices" && <InvoiceTable onInvoiceClick={setSelectedInvoice} />}

        {activeTab === "retainers" && (
          <div>
            {/* Retainer Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl border border-border bg-background-secondary/30">
                <p className="text-xs text-foreground-muted uppercase tracking-wider mb-1">Total MRR</p>
                <p className="text-2xl font-semibold text-foreground tabular-nums">
                  €
                  {retainers
                    .filter((r) => r.status === "active")
                    .reduce((sum, r) => sum + r.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background-secondary/30">
                <p className="text-xs text-foreground-muted uppercase tracking-wider mb-1">Active</p>
                <p className="text-2xl font-semibold text-foreground tabular-nums">
                  {retainers.filter((r) => r.status === "active").length} Retainer
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-background-secondary/30">
                <p className="text-xs text-foreground-muted uppercase tracking-wider mb-1">At Risk</p>
                <p className="text-2xl font-semibold text-foreground tabular-nums">0 Retainer</p>
              </div>
            </div>

            {/* Retainer Cards */}
            <div className="grid grid-cols-2 gap-4">
              {retainers.map((retainer) => (
                <RetainerCard key={retainer.id} retainer={retainer} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "proposals" && (
          <div className="grid grid-cols-2 gap-4">
            {proposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
