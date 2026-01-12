"use client"

import { motion } from "framer-motion"
import { Users, FolderKanban, Wallet, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { clients, projects, getTotalMRR } from "@/lib/data"

const portals = [
  {
    id: "clients",
    href: "/clients",
    icon: Users,
    label: "Clients",
    metric: `${clients.filter((c) => c.status === "active").length} aktiv`,
    description: `${clients.length} total`,
    accentColor: "rgba(16, 185, 129, 0.1)",
  },
  {
    id: "projects",
    href: "/projects",
    icon: FolderKanban,
    label: "Projects",
    metric: `${projects.filter((p) => p.status !== "completed").length} laufend`,
    description: "In Arbeit",
    accentColor: "rgba(59, 130, 246, 0.1)",
  },
  {
    id: "finances",
    href: "/finances",
    icon: Wallet,
    label: "Finances",
    metric: `€${getTotalMRR().toLocaleString("de-DE")}`,
    description: "MRR",
    accentColor: "rgba(255, 79, 0, 0.1)",
  },
]

export function PortalGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {portals.map((portal, index) => (
        <motion.div
          key={portal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        >
          <Link href={portal.href}>
            <div className="portal-block group">
              {/* Accent Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at center, ${portal.accentColor} 0%, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-foreground-muted group-hover:text-foreground transition-colors">
                    <portal.icon className="h-6 w-6" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-foreground-faint opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-foreground-muted">{portal.label}</p>
                  <p className="big-number text-foreground">{portal.metric}</p>
                  <p className="text-sm text-foreground-faint">{portal.description}</p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
