"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronDown, ChevronRight, Calendar, User, Flag, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProjectTask } from "@/lib/data"

interface TaskListProps {
  tasks: ProjectTask[]
  onTaskToggle?: (taskId: string) => void
}

export function TaskList({ tasks, onTaskToggle }: TaskListProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["SETUP", "DEVELOPMENT", "TESTING", "GO-LIVE"])
  const [localTasks, setLocalTasks] = useState(tasks)

  const groups = [...new Set(localTasks.map((t) => t.group))]

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => (prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]))
  }

  const handleTaskToggle = (taskId: string) => {
    setLocalTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)))
    onTaskToggle?.(taskId)
  }

  const getGroupProgress = (group: string) => {
    const groupTasks = localTasks.filter((t) => t.group === group)
    const completed = groupTasks.filter((t) => t.completed).length
    return { completed, total: groupTasks.length }
  }

  return (
    <div className="space-y-4">
      {groups.map((group) => {
        const progress = getGroupProgress(group)
        const isExpanded = expandedGroups.includes(group)
        const groupTasks = localTasks.filter((t) => t.group === group)

        return (
          <div key={group} className="rounded-xl border border-border overflow-hidden">
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group)}
              className="w-full flex items-center justify-between p-4 bg-background-secondary/50 hover:bg-background-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-foreground-muted" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-foreground-muted" />
                )}
                <span className="text-sm font-semibold uppercase tracking-wider text-foreground">{group}</span>
                <span className="text-xs text-foreground-muted">
                  ({progress.completed}/{progress.total} done)
                </span>
              </div>
              <div className="w-24 h-1.5 rounded-full bg-background-tertiary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(progress.completed / progress.total) * 100}%` }}
                  className={cn(
                    "h-full rounded-full",
                    progress.completed === progress.total ? "bg-success" : "bg-accent",
                  )}
                />
              </div>
            </button>

            {/* Tasks */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="divide-y divide-border">
                    {groupTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={cn(
                          "flex items-center gap-4 p-4 transition-colors group",
                          task.completed ? "bg-background/50" : "hover:bg-background-secondary/30",
                        )}
                      >
                        {/* Checkbox */}
                        <button
                          onClick={() => handleTaskToggle(task.id)}
                          className={cn(
                            "flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all",
                            task.completed ? "bg-success border-success" : "border-border hover:border-accent",
                          )}
                        >
                          <AnimatePresence>
                            {task.completed && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                <Check className="h-3 w-3 text-success-foreground" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>

                        {/* Task Title */}
                        <span
                          className={cn(
                            "flex-1 text-sm transition-all",
                            task.completed ? "text-foreground-muted line-through" : "text-foreground",
                          )}
                        >
                          {task.title}
                        </span>

                        {/* Metadata */}
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          {task.dueDate && (
                            <div className="flex items-center gap-1 text-[10px] text-foreground-muted">
                              <Calendar className="h-3 w-3" />
                              {new Date(task.dueDate).toLocaleDateString("de-DE", { day: "numeric", month: "short" })}
                            </div>
                          )}
                          {task.assignee && (
                            <div className="flex items-center gap-1 text-[10px] text-foreground-muted">
                              <User className="h-3 w-3" />
                              {task.assignee}
                            </div>
                          )}
                          {task.priority && (
                            <Flag
                              className={cn(
                                "h-3 w-3",
                                task.priority === "high" && "text-warning",
                                task.priority === "medium" && "text-info",
                                task.priority === "low" && "text-foreground-muted",
                              )}
                            />
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {/* Add Task */}
                    <button className="w-full flex items-center gap-2 p-4 text-foreground-muted hover:text-foreground hover:bg-background-secondary/30 transition-colors">
                      <Plus className="h-4 w-4" />
                      <span className="text-sm">Add Task</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
