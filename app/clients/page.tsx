"use client"

import { motion } from "framer-motion"
import { CockpitWrapper } from "@/components/layout/cockpit-wrapper"
import { ClientStack } from "@/components/clients/client-stack"
import { clients } from "@/lib/data"
import { Plus } from "lucide-react"

export default function ClientsPage() {
  const activeClients = clients.filter((c) => c.status === "active")
  const allClients = clients

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
          <p className="page-label mb-2">Clients</p>
          <h1 className="hero-name">{allClients.length} Clients</h1>
          <p className="text-foreground-secondary mt-2">
            {activeClients.length} aktiv · {clients.filter((c) => c.status === "lead").length} Leads
          </p>
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
          Neuer Client
        </motion.button>
      </motion.div>

      {/* Client Stack */}
      <div className="max-w-2xl mx-auto">
        <ClientStack clients={allClients} />
      </div>
    </CockpitWrapper>
  )
}
