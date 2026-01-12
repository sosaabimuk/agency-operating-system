"use client"

import { motion } from "framer-motion"
import { CockpitWrapper } from "@/components/layout/cockpit-wrapper"
import { FinanceHero } from "@/components/finances/finance-hero"
import { FinancePortals } from "@/components/finances/finance-portals"
import { revenueData } from "@/lib/data"
import { Plus } from "lucide-react"

export default function FinancesPage() {
  // Calculate current month revenue
  const currentMonthRevenue = revenueData[revenueData.length - 1]
  const previousMonthRevenue = revenueData[revenueData.length - 2]
  const totalCurrent = currentMonthRevenue.oneTime + currentMonthRevenue.recurring
  const totalPrevious = previousMonthRevenue.oneTime + previousMonthRevenue.recurring
  const trendPercentage = Math.round(((totalCurrent - totalPrevious) / totalPrevious) * 100)

  return (
    <CockpitWrapper>
      {/* Hero - Big Revenue Number */}
      <FinanceHero
        amount={totalCurrent}
        label="UMSATZ DIESEN MONAT"
        trend={{ value: Math.abs(trendPercentage), positive: trendPercentage >= 0 }}
        breakdown={{
          recurring: currentMonthRevenue.recurring,
          oneTime: currentMonthRevenue.oneTime,
        }}
      />

      {/* Finance Portals */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
        <h2 className="section-title mb-6">BEREICHE</h2>
        <FinancePortals />
      </motion.div>

      {/* Quick Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 text-center"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
          style={{
            boxShadow: "0 0 30px rgba(255, 79, 0, 0.3)",
          }}
        >
          <Plus className="h-5 w-5" />
          Neue Rechnung erstellen
        </motion.button>
      </motion.div>
    </CockpitWrapper>
  )
}
