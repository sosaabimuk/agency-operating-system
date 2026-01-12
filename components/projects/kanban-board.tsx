"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { KanbanColumn } from "./kanban-column"
import { projects as initialProjects, type Project } from "@/lib/data"

const columns: { title: string; status: Project["status"]; color: string }[] = [
  { title: "Backlog", status: "backlog", color: "text-foreground-muted" },
  { title: "In Progress", status: "in-progress", color: "text-accent" },
  { title: "Review", status: "review", color: "text-info" },
  { title: "Completed", status: "completed", color: "text-success" },
]

export function KanbanBoard() {
  const router = useRouter()
  const [projects, setProjects] = useState(initialProjects)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleDrop = (projectId: string, newStatus: Project["status"]) => {
    setProjects((prev) => {
      const project = prev.find((p) => p.id === projectId)
      if (!project || project.status === newStatus) return prev

      // Show confetti if moved to completed
      if (newStatus === "completed" && project.status !== "completed") {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 2000)
      }

      return prev.map((p) =>
        p.id === projectId ? { ...p, status: newStatus, progress: newStatus === "completed" ? 100 : p.progress } : p,
      )
    })
  }

  const handleProjectClick = (project: Project) => {
    router.push(`/projects/${project.id}`)
  }

  return (
    <div className="relative">
      {/* Subtle Confetti Animation */}
      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: 0,
                x: 0,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                y: [0, -100 - Math.random() * 200],
                x: (Math.random() - 0.5) * 400,
                opacity: [1, 0],
                scale: [1, 0.5],
                rotate: Math.random() * 360,
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute w-2 h-2 rounded-sm"
              style={{
                backgroundColor: ["#ff4f00", "#22c55e", "#3b82f6", "#eab308"][Math.floor(Math.random() * 4)],
              }}
            />
          ))}
        </motion.div>
      )}

      <div className="flex gap-4 overflow-x-auto pb-4 px-1">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            title={column.title}
            status={column.status}
            color={column.color}
            projects={projects.filter((p) => p.status === column.status)}
            onProjectClick={handleProjectClick}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  )
}
