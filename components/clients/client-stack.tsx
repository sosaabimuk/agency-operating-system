"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, ChevronDown, ExternalLink, Phone, Mail, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Client } from "@/lib/data"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ClientStackProps {
  clients: Client[]
}

const statusGlow = {
  active: "rgba(16, 185, 129, 0.25)",
  lead: "rgba(59, 130, 246, 0.25)",
  proposal: "rgba(245, 158, 11, 0.25)",
  paused: "rgba(100, 100, 100, 0.15)",
  completed: "rgba(100, 100, 100, 0.1)",
}

export function ClientStack({ clients }: ClientStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const visibleClients = clients.slice(currentIndex, currentIndex + 3)
  const canGoUp = currentIndex > 0
  const canGoDown = currentIndex < clients.length - 1

  const handleNext = () => {
    if (canGoDown) setCurrentIndex((i) => i + 1)
  }

  const handlePrev = () => {
    if (canGoUp) setCurrentIndex((i) => i - 1)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "j") handleNext()
    if (e.key === "ArrowUp" || e.key === "k") handlePrev()
  }

  const currentClient = clients[currentIndex]

  return (
    <div className="relative" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Navigation Hints */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-foreground-muted text-sm">
          {currentIndex + 1} von {clients.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={!canGoUp}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
              canGoUp
                ? "bg-white/5 hover:bg-white/10 text-foreground-secondary"
                : "text-foreground-faint cursor-not-allowed",
            )}
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            disabled={!canGoDown}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
              canGoDown
                ? "bg-white/5 hover:bg-white/10 text-foreground-secondary"
                : "text-foreground-faint cursor-not-allowed",
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stack Container */}
      <div className="relative h-[420px]">
        <AnimatePresence mode="popLayout">
          {visibleClients.map((client, stackIndex) => {
            const isTop = stackIndex === 0
            const offset = stackIndex * 12
            const scale = 1 - stackIndex * 0.04
            const blur = stackIndex * 2
            const opacity = 1 - stackIndex * 0.3

            return (
              <motion.div
                key={client.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{
                  opacity,
                  y: offset,
                  scale,
                  filter: `blur(${blur}px)`,
                  zIndex: 30 - stackIndex * 10,
                }}
                exit={{ opacity: 0, y: -50, scale: 1.05 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-x-0 top-0"
                style={{ transformOrigin: "center top" }}
              >
                <div
                  className={cn("glass-card p-8", isTop && "cursor-pointer")}
                  style={
                    isTop
                      ? {
                          boxShadow: `0 0 60px ${statusGlow[client.status]}, 0 25px 50px -12px rgba(0,0,0,0.5)`,
                        }
                      : undefined
                  }
                >
                  {isTop ? (
                    <>
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        {/* Avatar with Glow */}
                        <div className="relative" style={{ color: statusGlow[client.status] }}>
                          <div className="avatar-glow">
                            <Avatar className="h-16 w-16 border-2 border-white/10">
                              <AvatarFallback className="bg-gradient-to-br from-white/10 to-white/5 text-foreground text-xl font-semibold">
                                {client.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>

                        <button className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/5 transition-colors">
                          <MoreHorizontal className="h-5 w-5 text-foreground-muted" />
                        </button>
                      </div>

                      {/* Name - RIESIG */}
                      <Link href={`/clients/${client.id}`} className="block group">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors flex items-center gap-3">
                          {client.name}
                          <ExternalLink className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h2>
                      </Link>
                      <p className="text-lg text-foreground-muted mt-1">{client.company}</p>

                      {/* Divider */}
                      <div className="divider-subtle my-6" />

                      {/* Current Focus */}
                      <div className="mb-6">
                        <p className="section-title mb-2">AKTUELLER FOKUS</p>
                        <div className="flex items-center justify-between">
                          <p className="text-foreground font-medium">Brand Refresh Phase 2</p>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full w-3/4 rounded-full bg-accent" />
                            </div>
                            <span className="text-sm text-foreground-secondary">75%</span>
                          </div>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="micro-text mb-1">MRR</p>
                          <p className="text-xl font-semibold text-foreground tabular-nums">
                            €{client.mrr.toLocaleString("de-DE")}
                          </p>
                        </div>
                        <div>
                          <p className="micro-text mb-1">PROJEKTE</p>
                          <p className="text-xl font-semibold text-foreground">{client.projects}</p>
                        </div>
                        <div>
                          <p className="micro-text mb-1">SEIT</p>
                          <p className="text-xl font-semibold text-foreground">{client.startDate}</p>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-glass">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-sm font-medium">
                          <Phone className="h-4 w-4" />
                          Anrufen
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 text-foreground-secondary hover:bg-white/10 transition-colors text-sm font-medium">
                          <Mail className="h-4 w-4" />
                          E-Mail
                        </button>
                      </div>
                    </>
                  ) : (
                    // Stacked card preview
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border border-white/10">
                        <AvatarFallback className="bg-white/5 text-foreground-secondary">
                          {client.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{client.name}</p>
                        <p className="text-sm text-foreground-muted">{client.company}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Keyboard hints */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <span className="micro-text flex items-center gap-1">
          <span className="cmd-hint">↑</span> vorheriger
        </span>
        <span className="micro-text flex items-center gap-1">
          <span className="cmd-hint">↓</span> nächster
        </span>
      </div>
    </div>
  )
}
