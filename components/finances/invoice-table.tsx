"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MoreHorizontal, Eye, Send, Check, Edit, Copy, Trash2, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { invoices, type Invoice } from "@/lib/data"

const statusConfig = {
  draft: { label: "Draft", color: "bg-foreground-muted/20 text-foreground-muted border-foreground-muted/30" },
  sent: { label: "Sent", color: "bg-info/20 text-info border-info/30" },
  pending: { label: "Pending", color: "bg-warning/20 text-warning border-warning/30" },
  paid: { label: "Paid", color: "bg-success/20 text-success border-success/30" },
  overdue: { label: "Overdue", color: "bg-error/20 text-error border-error/30 animate-pulse" },
}

interface InvoiceTableProps {
  onInvoiceClick?: (invoice: Invoice) => void
}

export function InvoiceTable({ onInvoiceClick }: InvoiceTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === invoices.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(invoices.map((i) => i.id))
    }
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="flex items-center gap-3 p-3 bg-accent/10 border-b border-border"
        >
          <span className="text-sm text-foreground">{selectedIds.length} selected</span>
          <Button variant="outline" size="sm">
            <Check className="h-3 w-3 mr-1" />
            Mark as Paid
          </Button>
          <Button variant="outline" size="sm">
            <Send className="h-3 w-3 mr-1" />
            Send Reminders
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-3 w-3 mr-1" />
            Export
          </Button>
        </motion.div>
      )}

      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-background-secondary/50">
            <th className="px-4 py-3 text-left w-10">
              <input
                type="checkbox"
                checked={selectedIds.length === invoices.length}
                onChange={toggleSelectAll}
                className="h-4 w-4 rounded border-border bg-background accent-accent"
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">
              Invoice
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">
              Client
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">
              Amount
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-foreground-muted">
              Due Date
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-foreground-muted">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, i) => (
            <motion.tr
              key={invoice.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onInvoiceClick?.(invoice)}
              className="border-b border-border hover:bg-background-secondary/50 cursor-pointer transition-colors"
            >
              <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(invoice.id)}
                  onChange={() => toggleSelect(invoice.id)}
                  className="h-4 w-4 rounded border-border bg-background accent-accent"
                />
              </td>
              <td className="px-4 py-3">
                <span className="font-medium text-foreground">{invoice.invoiceNumber}</span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-background-tertiary flex items-center justify-center text-[10px] font-medium text-foreground-secondary">
                    {invoice.clientName.slice(0, 2)}
                  </div>
                  <span className="text-sm text-foreground-secondary">{invoice.clientName}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="font-medium text-foreground tabular-nums">
                  €{invoice.total.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={cn("px-2 py-1 rounded-md text-xs font-medium border", statusConfig[invoice.status].color)}
                >
                  {statusConfig[invoice.status].label}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={cn("text-sm", invoice.status === "overdue" ? "text-error" : "text-foreground-secondary")}
                >
                  {new Date(invoice.dueDate).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                  })}
                </span>
              </td>
              <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Send className="h-4 w-4 mr-2" />
                      Send Reminder
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Check className="h-4 w-4 mr-2" />
                      Mark as Paid
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-error">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
