"use client"

import { motion } from "framer-motion"
import { Calendar, MessageSquare, Paperclip, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/data"

interface ProjectCardProps {
  project: Project
  isDragging?: boolean
  onClick?: () => void
}

const priorityColors = {
  urgent: "bg-error",
  high: "bg-warning",
  medium: "bg-info",
  low: "bg-foreground-muted",
}

export function ProjectCard({ project, isDragging, onClick }: ProjectCardProps) {
  const isOverdue = new Date(project.dueDate) < new Date()
  const isThisWeek = new Date(project.dueDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}
      onClick={onClick}
      className={cn(
        "group relative p-4 rounded-xl bg-background-secondary/80 backdrop-blur-xl border border-border cursor-pointer transition-all",
        isDragging && "shadow-2xl scale-105 z-50",
      )}
    >
      {/* Drag Handle */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity">
        <GripVertical className="h-4 w-4 text-foreground-muted" />
      </div>

      {/* Priority Indicator */}
      <div className={cn("absolute left-0 top-4 w-1 h-6 rounded-r-full", priorityColors[project.priority])} />

      {/* Title */}
      <div className="pl-2">
        <h4 className="font-medium text-foreground text-sm leading-tight mb-2">{project.name}</h4>

        {/* Client */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-5 rounded-full bg-background-tertiary flex items-center justify-center text-[10px] font-medium text-foreground-secondary">
            {project.clientAvatar || project.clientName.slice(0, 2)}
          </div>
          <span className="text-xs text-foreground-secondary">{project.clientName}</span>
        </div>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-background-tertiary text-foreground-secondary"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-background-tertiary text-foreground-muted">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="h-1.5 flex-1 rounded-full bg-background-tertiary overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={cn("h-full rounded-full", project.progress === 100 ? "bg-success" : "bg-accent")}
              />
            </div>
            <span className="ml-2 text-[10px] font-medium text-foreground-muted tabular-nums">{project.progress}%</span>
          </div>
        </div>

        {/* Metadata Row */}
        <div className="flex items-center gap-3 text-[10px] text-foreground-muted">
          <div
            className={cn(
              "flex items-center gap-1",
              isOverdue && "text-error",
              !isOverdue && isThisWeek && "text-warning",
            )}
          >
            <Calendar className="h-3 w-3" />
            {new Date(project.dueDate).toLocaleDateString("de-DE", { day: "numeric", month: "short" })}
          </div>
          {project.commentsCount > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {project.commentsCount}
            </div>
          )}
          {project.attachmentsCount > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              {project.attachmentsCount}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
