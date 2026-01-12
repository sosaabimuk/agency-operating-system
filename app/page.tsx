"use client"

import { motion } from "framer-motion"
import { CockpitWrapper } from "@/components/layout/cockpit-wrapper"
import { TodayFocus } from "@/components/dashboard/today-focus"
import { PortalGrid } from "@/components/dashboard/portal-grid"

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Guten Morgen"
  if (hour < 18) return "Guten Tag"
  return "Guten Abend"
}

export default function DashboardPage() {
  const greeting = getGreeting()

  return (
    <CockpitWrapper>
      {/* Hero Section - Zentral, groß */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="text-center mb-16 pt-8"
      >
        {/* Page Label - winzig, uppercase */}
        <p className="page-label mb-4">Dashboard</p>

        {/* Greeting - riesig */}
        <h1 className="hero-name mb-3">
          {greeting}, <span className="text-accent">Aurell</span>
        </h1>

        {/* Context */}
        <p className="text-lg text-foreground-secondary max-w-md mx-auto">
          Du hast <span className="text-foreground font-medium">3 Projekte</span> in Arbeit und{" "}
          <span className="text-accent font-medium">1 Zahlung</span> ausstehend.
        </p>
      </motion.div>

      {/* Today Focus - Was gerade zählt */}
      <TodayFocus />

      {/* Portal Grid - Entry Points */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
        <h2 className="section-title mb-6">BEREICHE</h2>
        <PortalGrid />
      </motion.div>

      {/* Command K Hint - am unteren Rand */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center mt-20"
      >
        <p className="text-foreground-faint text-sm flex items-center justify-center gap-2">
          Drücke <span className="cmd-hint">⌘K</span> für Command Palette
        </p>
      </motion.div>
    </CockpitWrapper>
  )
}
