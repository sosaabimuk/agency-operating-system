"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LayoutGrid, List, GanttChart, Plus, Filter, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { KanbanBoard } from "./kanban-board"
import { ProjectListView } from "./project-list-view"
import { ProjectTimelineView } from "./project-timeline-view"

type ViewMode = "kanban" | "list" | "timeline"

export function ProjectsPageContent() {
  const [view, setView] = useState<ViewMode>("kanban")
  const [search, setSearch] = useState("")

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-foreground tracking-tight mb-1">Projects</h1>
            <p className="text-foreground-secondary">Alle Kundenprojekte im Überblick</p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-background-secondary border border-border">
              <button
                onClick={() => setView("kanban")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  view === "kanban" ? "bg-background text-foreground" : "text-foreground-muted hover:text-foreground",
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  view === "list" ? "bg-background text-foreground" : "text-foreground-muted hover:text-foreground",
                )}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("timeline")}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  view === "timeline" ? "bg-background text-foreground" : "text-foreground-muted hover:text-foreground",
                )}
              >
                <GanttChart className="h-4 w-4" />
              </button>
            </div>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>

            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Neues Projekt
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-background-secondary border-border"
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        key={view}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {view === "kanban" && <KanbanBoard />}
        {view === "list" && <ProjectListView />}
        {view === "timeline" && <ProjectTimelineView />}
      </motion.div>
    </div>
  )
}
