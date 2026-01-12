"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProjectCard } from "./project-card"
import type { Project } from "@/lib/data"

interface KanbanColumnProps {
  title: string
  status: Project["status"]
  projects: Project[]
  color: string
  onProjectClick?: (project: Project) => void
  onDrop?: (projectId: string, newStatus: Project["status"]) => void
}

export function KanbanColumn({ title, status, projects, color, onProjectClick, onDrop }: KanbanColumnProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const projectId = e.dataTransfer.getData("projectId")
    if (projectId && onDrop) {
      onDrop(projectId, status)
    }
  }

  return (
    <motion.div
      layout
      className={cn(
        "flex flex-col min-w-[300px] w-[300px] rounded-xl bg-background/50 backdrop-blur-sm border transition-colors",
        dragOver ? "border-accent bg-accent-glow" : "border-border",
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-2 group">
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-foreground-muted group-hover:text-foreground transition-colors" />
          ) : (
            <ChevronDown className="h-4 w-4 text-foreground-muted group-hover:text-foreground transition-colors" />
          )}
          <span className={cn("text-sm font-semibold uppercase tracking-wider", color)}>{title}</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-md bg-background-tertiary text-[10px] font-medium text-foreground-muted">
            {projects.length}
          </span>
        </button>
        <button className="p-1 rounded-md hover:bg-background-tertiary text-foreground-muted hover:text-foreground transition-colors">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Projects */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[calc(100vh-280px)]"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("projectId", project.id)
                }}
              >
                <ProjectCard project={project} onClick={() => onProjectClick?.(project)} />
              </div>
            ))}
            {projects.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-xs text-foreground-muted">Keine Projekte</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
