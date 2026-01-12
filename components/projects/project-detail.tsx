"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ChevronDown,
  MessageSquare,
  FileText,
  Clock,
  Activity,
  ExternalLink,
  Calendar,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MilestoneTimeline } from "./milestone-timeline"
import { TaskList } from "./task-list"
import type { Project } from "@/lib/data"

interface ProjectDetailProps {
  project: Project
}

const tabs = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "tasks", label: "Tasks", icon: Clock },
  { id: "files", label: "Files", icon: FileText },
  { id: "notes", label: "Notes", icon: MessageSquare },
]

const statusConfig = {
  backlog: { label: "Backlog", color: "bg-foreground-muted/20 text-foreground-muted border-foreground-muted/30" },
  "in-progress": { label: "In Progress", color: "bg-accent/20 text-accent border-accent/30" },
  review: { label: "Review", color: "bg-info/20 text-info border-info/30" },
  completed: { label: "Completed", color: "bg-success/20 text-success border-success/30" },
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [status, setStatus] = useState(project.status)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div
                className={cn(
                  "w-3 h-3 rounded-full",
                  project.priority === "urgent" && "bg-error",
                  project.priority === "high" && "bg-warning",
                  project.priority === "medium" && "bg-info",
                  project.priority === "low" && "bg-foreground-muted",
                )}
              />
              <h1 className="text-3xl font-semibold text-foreground tracking-tight">{project.name}</h1>
            </div>
            <p className="text-foreground-secondary">für {project.clientName}</p>
          </div>

          <div className="relative">
            <button
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
                statusConfig[status].color,
              )}
            >
              {statusConfig[status].label}
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-secondary border border-border">
            <Calendar className="h-4 w-4 text-foreground-muted" />
            <span className="text-sm text-foreground-secondary">
              Due: {new Date(project.dueDate).toLocaleDateString("de-DE", { day: "numeric", month: "short" })}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-secondary border border-border">
            <DollarSign className="h-4 w-4 text-foreground-muted" />
            <span className="text-sm text-foreground-secondary">€{project.value.toLocaleString()}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Invoice
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-foreground-muted">Progress</span>
            <span className="text-sm font-medium text-foreground tabular-nums">{project.progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-background-tertiary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={cn("h-full rounded-full", project.progress === 100 ? "bg-success" : "bg-accent")}
            />
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab.id
                ? "border-accent text-foreground"
                : "border-transparent text-foreground-muted hover:text-foreground",
            )}
          >
            <tab.icon className="h-4 w-4" />
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
        {activeTab === "overview" && (
          <div className="grid grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              {/* Description */}
              <div className="p-6 rounded-xl border border-border bg-background-secondary/30">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-3">
                  Description
                </h3>
                <p className="text-foreground leading-relaxed">{project.description || "No description provided."}</p>
              </div>

              {/* Milestones */}
              {project.milestones.length > 0 && (
                <div className="p-6 rounded-xl border border-border bg-background-secondary/30">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-6">
                    Milestones
                  </h3>
                  <MilestoneTimeline milestones={project.milestones} />
                </div>
              )}

              {/* Recent Activity */}
              <div className="p-6 rounded-xl border border-border bg-background-secondary/30">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-success mt-2" />
                    <div>
                      <p className="text-sm text-foreground">Task 'Shopify verbinden' completed</p>
                      <p className="text-xs text-foreground-muted">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-info mt-2" />
                    <div>
                      <p className="text-sm text-foreground">Note added by Aurell</p>
                      <p className="text-xs text-foreground-muted">yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-foreground-muted mt-2" />
                    <div>
                      <p className="text-sm text-foreground">File 'API_Keys.pdf' uploaded</p>
                      <p className="text-xs text-foreground-muted">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Project Info */}
              <div className="p-4 rounded-xl border border-border bg-background-secondary/30">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">
                  Project Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-muted">Created</span>
                    <span className="text-sm text-foreground">10. Jan 2025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-muted">Client</span>
                    <Link href={`/clients/${project.clientId}`} className="text-sm text-accent hover:underline">
                      {project.clientName}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-muted">Type</span>
                    <span className="text-sm text-foreground">Kickstart</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-muted">Value</span>
                    <span className="text-sm text-foreground">€{project.value}</span>
                  </div>
                </div>
              </div>

              {/* Team */}
              <div className="p-4 rounded-xl border border-border bg-background-secondary/30">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">Team</h3>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground">
                    AT
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Aurell</p>
                    <p className="text-xs text-foreground-muted">Owner</p>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="p-4 rounded-xl border border-border bg-background-secondary/30">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground-muted mb-4">Links</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-background-tertiary text-sm text-foreground-secondary hover:text-foreground transition-colors">
                    Proposal
                    <ExternalLink className="h-3 w-3" />
                  </button>
                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-background-tertiary text-sm text-foreground-secondary hover:text-foreground transition-colors">
                    n8n Workflow
                    <ExternalLink className="h-3 w-3" />
                  </button>
                  <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-background-tertiary text-sm text-foreground-secondary hover:text-foreground transition-colors">
                    Client Shopify
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tasks" && <TaskList tasks={project.tasks} />}

        {activeTab === "files" && (
          <div className="p-12 rounded-xl border border-dashed border-border text-center">
            <FileText className="h-12 w-12 mx-auto text-foreground-muted mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Drop files here</h3>
            <p className="text-sm text-foreground-muted">or click to upload</p>
          </div>
        )}

        {activeTab === "notes" && (
          <div className="p-6 rounded-xl border border-border bg-background-secondary/30">
            <p className="text-foreground-muted text-sm">Start typing to add notes...</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
