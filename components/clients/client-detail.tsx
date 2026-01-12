"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MessageSquare,
  Receipt,
  FolderPlus,
  Calendar,
  CreditCard,
  FileText,
  CheckCircle2,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CredentialVault } from "./credential-vault"
import type { Client, Project, Credential } from "@/lib/data"
import { cn } from "@/lib/utils"

interface ClientDetailProps {
  client: Client
  projects: Project[]
  credentials: Credential[]
}

const statusStyles = {
  lead: "border-info text-info bg-info/10",
  proposal: "border-warning text-warning bg-warning/10",
  active: "border-success text-success bg-success/10 shadow-[0_0_10px_rgba(34,197,94,0.2)]",
  paused: "border-foreground-muted text-foreground-muted bg-foreground-muted/10",
  completed: "border-success/50 text-success/70 bg-success/5",
}

const statusLabels = {
  lead: "Lead",
  proposal: "Proposal",
  active: "Active",
  paused: "Paused",
  completed: "Completed",
}

const projectStatusColors = {
  planning: "bg-info",
  "in-progress": "bg-accent",
  review: "bg-warning",
  completed: "bg-success",
}

export function ClientDetail({ client, projects, credentials }: ClientDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-8">
      {/* Client Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6 border border-border"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-border">
              <AvatarFallback className="bg-background-tertiary text-foreground text-xl font-semibold">
                {client.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">{client.name}</h1>
                <Badge variant="outline" className={cn("text-xs font-medium", statusStyles[client.status])}>
                  {statusLabels[client.status]}
                </Badge>
              </div>
              <p className="text-foreground-secondary">{client.company}</p>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <a
                  href={`mailto:${client.email}`}
                  className="flex items-center gap-1.5 text-foreground-muted hover:text-accent transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {client.email}
                </a>
                <a
                  href={`tel:${client.phone}`}
                  className="flex items-center gap-1.5 text-foreground-muted hover:text-accent transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {client.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="gap-2 bg-background-secondary border-border hover:bg-background-tertiary"
            >
              <MessageSquare className="h-4 w-4" />
              Nachricht
            </Button>
            <Button
              variant="outline"
              className="gap-2 bg-background-secondary border-border hover:bg-background-tertiary"
            >
              <Receipt className="h-4 w-4" />
              Rechnung
            </Button>
            <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              <FolderPlus className="h-4 w-4" />
              Projekt hinzufügen
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-background-secondary border border-border p-1 h-auto">
          {["Overview", "Projects", "Documents", "Zugänge", "Notizen", "Activity"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase()}
              className="data-[state=active]:bg-background-tertiary data-[state=active]:text-foreground text-foreground-muted px-4 py-2"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Projects & Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-xl p-6 border border-border"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">Aktuelle Projekte</h2>
                {projects.length > 0 ? (
                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="p-4 rounded-lg bg-background-tertiary border border-border"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className={cn("h-2 w-2 rounded-full", projectStatusColors[project.status])} />
                            <h3 className="font-medium text-foreground">{project.name}</h3>
                          </div>
                          <span className="text-sm text-foreground-muted">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-1.5" />
                        <div className="flex items-center justify-between mt-3 text-sm">
                          <span className="text-foreground-muted capitalize">{project.status.replace("-", " ")}</span>
                          <span className="text-foreground-secondary">€{project.value.toLocaleString("de-DE")}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-foreground-muted text-center py-8">Keine aktiven Projekte</p>
                )}
              </motion.div>

              {/* Communication Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-xl p-6 border border-border"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">Kommunikation</h2>
                <div className="relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                  <div className="space-y-4">
                    {[
                      { message: "Proposal besprochen", time: "Heute, 14:30", type: "call" },
                      { message: "Follow-up Email gesendet", time: "Gestern, 10:15", type: "email" },
                      { message: "Kick-off Meeting", time: "12. Jan, 09:00", type: "meeting" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex gap-4 pl-6 relative"
                      >
                        <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background-secondary bg-accent" />
                        <div>
                          <p className="text-sm text-foreground">{item.message}</p>
                          <p className="text-xs text-foreground-muted mt-0.5">{item.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Financial & Contract */}
            <div className="space-y-6">
              {/* Financial Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="glass rounded-xl p-6 border border-border"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">Finanzen</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-foreground-muted">Lifetime Value</span>
                    <span className="font-semibold text-foreground tabular-nums">
                      €{client.lifetimeValue.toLocaleString("de-DE")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-foreground-muted">Current MRR</span>
                    <span className="font-semibold text-foreground tabular-nums">
                      €{client.mrr.toLocaleString("de-DE")}
                    </span>
                  </div>
                  {client.nextInvoice && (
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-foreground-muted">Nächste Rechnung</span>
                      <span className="text-foreground-secondary">{client.nextInvoice}</span>
                    </div>
                  )}
                  {client.paymentStatus && (
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-foreground-muted">Payment Status</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          client.paymentStatus === "paid" && "border-success text-success bg-success/10",
                          client.paymentStatus === "pending" && "border-warning text-warning bg-warning/10",
                          client.paymentStatus === "overdue" && "border-error text-error bg-error/10",
                        )}
                      >
                        {client.paymentStatus === "paid" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {client.paymentStatus.charAt(0).toUpperCase() + client.paymentStatus.slice(1)}
                      </Badge>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Contract Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-xl p-6 border border-border"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">Vertrag</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-foreground-muted mt-0.5" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">Start</p>
                      <p className="text-sm text-foreground">{client.startDate}</p>
                    </div>
                  </div>
                  {client.contractModel && (
                    <div className="flex items-start gap-3">
                      <CreditCard className="h-4 w-4 text-foreground-muted mt-0.5" />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">Modell</p>
                        <p className="text-sm text-foreground">{client.contractModel}</p>
                      </div>
                    </div>
                  )}
                  {client.contractTerms && (
                    <div className="flex items-start gap-3">
                      <FileText className="h-4 w-4 text-foreground-muted mt-0.5" />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">Laufzeit</p>
                        <p className="text-sm text-foreground">{client.contractTerms}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6 border border-border"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Alle Projekte</h2>
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 rounded-lg bg-background-tertiary border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={cn("h-2 w-2 rounded-full", projectStatusColors[project.status])} />
                        <h3 className="font-medium text-foreground">{project.name}</h3>
                      </div>
                      <span className="text-sm text-foreground-muted">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5" />
                    <div className="flex items-center justify-between mt-3 text-sm">
                      <span className="text-foreground-muted capitalize">{project.status.replace("-", " ")}</span>
                      <span className="text-foreground-secondary">€{project.value.toLocaleString("de-DE")}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-foreground-muted text-center py-8">Keine Projekte vorhanden</p>
            )}
          </motion.div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6 border border-border"
          >
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-background-tertiary flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-foreground-muted" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Keine Dokumente</h3>
              <p className="text-foreground-muted max-w-sm">
                Lade Verträge, Proposals und andere Dokumente für diesen Client hoch.
              </p>
            </div>
          </motion.div>
        </TabsContent>

        {/* Zugänge Tab */}
        <TabsContent value="zugänge" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <CredentialVault credentials={credentials} />
          </motion.div>
        </TabsContent>

        {/* Notizen Tab */}
        <TabsContent value="notizen" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6 border border-border"
          >
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-background-tertiary flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-foreground-muted" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Keine Notizen</h3>
              <p className="text-foreground-muted max-w-sm">
                Füge Notizen und interne Kommentare zu diesem Client hinzu.
              </p>
            </div>
          </motion.div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6 border border-border"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Aktivitätsverlauf</h2>
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
              <div className="space-y-4">
                {[
                  { message: "Proposal angenommen", time: "Heute, 14:30", type: "success" },
                  { message: "Rechnung #004 gesendet", time: "Gestern, 10:15", type: "info" },
                  { message: "Projekt E-Commerce Relaunch gestartet", time: "10. Jan, 09:00", type: "info" },
                  { message: "Client erstellt", time: "5. Jan, 11:00", type: "neutral" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="flex gap-4 pl-6 relative"
                  >
                    <div
                      className={cn(
                        "absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background-secondary",
                        item.type === "success" && "bg-success",
                        item.type === "info" && "bg-info",
                        item.type === "neutral" && "bg-foreground-muted",
                      )}
                    />
                    <div>
                      <p className="text-sm text-foreground">{item.message}</p>
                      <p className="text-xs text-foreground-muted mt-0.5">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
