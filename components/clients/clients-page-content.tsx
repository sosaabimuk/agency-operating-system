"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Plus, LayoutGrid, List } from "lucide-react"
import { ClientCard } from "@/components/clients/client-card"
import { ClientList } from "@/components/clients/client-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { clients, type Client } from "@/lib/data"
import { cn } from "@/lib/utils"

type ViewMode = "grid" | "list"
type StatusFilter = "all" | Client["status"]

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All Clients" },
  { value: "lead", label: "Leads" },
  { value: "proposal", label: "Proposals" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "completed", label: "Completed" },
]

export function ClientsPageContent() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClients = clients.filter((client) => {
    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Clients</h1>
          <p className="mt-1 text-foreground-secondary">Manage deine Kunden und deren Projekte</p>
        </div>

        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 w-fit">
          <Plus className="h-4 w-4" />
          Neuer Client
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
          <Input
            placeholder="Suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background-secondary border-border focus:border-accent"
          />
        </div>

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 bg-background-secondary border-border hover:bg-background-tertiary"
            >
              <Filter className="h-4 w-4" />
              {statusFilters.find((f) => f.value === statusFilter)?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background-secondary border-border">
            {statusFilters.map((filter) => (
              <DropdownMenuItem
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={cn(
                  "cursor-pointer hover:bg-background-tertiary",
                  statusFilter === filter.value && "text-accent",
                )}
              >
                {filter.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* View Toggle */}
        <div className="flex rounded-lg border border-border bg-background-secondary p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "flex items-center justify-center h-8 w-8 rounded-md transition-colors",
              viewMode === "grid"
                ? "bg-background-tertiary text-foreground"
                : "text-foreground-muted hover:text-foreground",
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "flex items-center justify-center h-8 w-8 rounded-md transition-colors",
              viewMode === "list"
                ? "bg-background-tertiary text-foreground"
                : "text-foreground-muted hover:text-foreground",
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Client Count */}
      <p className="text-sm text-foreground-muted mb-4">
        {filteredClients.length} {filteredClients.length === 1 ? "Client" : "Clients"}
      </p>

      {/* Clients Display */}
      {viewMode === "grid" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {filteredClients.map((client, index) => (
            <ClientCard key={client.id} client={client} index={index} />
          ))}
        </motion.div>
      ) : (
        <ClientList clients={filteredClients} />
      )}

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="h-16 w-16 rounded-full bg-background-tertiary flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-foreground-muted" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Keine Clients gefunden</h3>
          <p className="text-foreground-muted max-w-sm">
            Versuche deine Suche anzupassen oder einen neuen Client hinzuzufügen.
          </p>
        </motion.div>
      )}
    </>
  )
}
