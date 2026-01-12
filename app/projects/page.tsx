"use client"

import { motion } from "framer-motion"
import { CockpitWrapper } from "@/components/layout/cockpit-wrapper"
import { ProjectJourney } from "@/components/projects/project-journey"
import { projects } from "@/lib/data"
import { Plus, LayoutGrid, List } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function ProjectsPage() {
  const [view, setView] = useState<"journey" | "grid">("journey")

  const activeProjects = projects.filter((p) => p.status !== "completed")
  const completedCount = projects.filter((p) => p.status === "completed").length
  const totalValue = activeProjects.reduce((sum, p) => sum + p.value, 0)

  return (
    <CockpitWrapper>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-start justify-between mb-12"
      >
        <div>
          <p className="page-label mb-2">Projects</p>
          <h1 className="hero-name">{activeProjects.length} Projekte</h1>
          <p className="text-foreground-secondary mt-2">
            €{totalValue.toLocaleString("de-DE")} Gesamtwert · {completedCount} abgeschlossen
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5">
            <button
              onClick={() => setView("journey")}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                view === "journey" ? "bg-white/10 text-foreground" : "text-foreground-muted hover:text-foreground",
              )}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("grid")}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                view === "grid" ? "bg-white/10 text-foreground" : "text-foreground-muted hover:text-foreground",
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-colors"
            style={{
              boxShadow: "0 0 20px rgba(255, 79, 0, 0.3)",
            }}
          >
            <Plus className="h-4 w-4" />
            Neues Projekt
          </motion.button>
        </div>
      </motion.div>

      {/* Project Journey */}
      <div className="max-w-3xl">
        <ProjectJourney projects={projects} />
      </div>
    </CockpitWrapper>
  )
}
