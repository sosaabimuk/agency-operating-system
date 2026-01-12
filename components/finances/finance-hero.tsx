"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FinanceHeroProps {
  amount: number
  label: string
  trend?: { value: number; positive: boolean }
  breakdown?: { recurring: number; oneTime: number }
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1000
    const startTime = Date.now()
    const startValue = displayValue

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startValue + (value - startValue) * eased)
      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value])

  return <span>€{displayValue.toLocaleString("de-DE")}</span>
}

export function FinanceHero({ amount, label, trend, breakdown }: FinanceHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      {/* Label */}
      <p className="page-label mb-4">{label}</p>

      {/* Big Number */}
      <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-4">
        <AnimatedNumber value={amount} />
      </h1>

      {/* Trend */}
      {trend && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
            trend.positive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400",
          )}
        >
          {trend.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {trend.positive ? "+" : ""}
          {trend.value}% vs. Vormonat
        </div>
      )}

      {/* Breakdown */}
      {breakdown && (
        <div className="flex items-center justify-center gap-8 mt-6">
          <div className="text-center">
            <p className="micro-text mb-1">RECURRING</p>
            <p className="text-xl font-semibold text-foreground tabular-nums">
              €{breakdown.recurring.toLocaleString("de-DE")}
            </p>
          </div>
          <div className="h-8 w-px bg-border-prominent" />
          <div className="text-center">
            <p className="micro-text mb-1">ONE-TIME</p>
            <p className="text-xl font-semibold text-foreground tabular-nums">
              €{breakdown.oneTime.toLocaleString("de-DE")}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  )
}
