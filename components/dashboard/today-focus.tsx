"use client"

import { motion } from "framer-motion"
import { Calendar, DollarSign, Phone, ArrowRight, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface FocusItem {
  id: string
  type: "deadline" | "payment" | "call"
  title: string
  subtitle: string
  urgent?: boolean
  href: string
}

const focusItems: FocusItem[] = [
  {
    id: "1",
    type: "deadline",
    title: "Brand Refresh Meilenstein",
    subtitle: "Fashion Boutique Luxe · Heute fällig",
    urgent: true,
    href: "/projects/1",
  },
  {
    id: "2",
    type: "payment",
    title: "€2.500 Zahlung ausstehend",
    subtitle: "TechStart GmbH · 7 Tage überfällig",
    urgent: true,
    href: "/finances",
  },
  {
    id: "3",
    type: "call",
    title: "Projekt-Kickoff Call",
    subtitle: "Urban Homes · 14:00 Uhr",
    href: "/clients/4",
  },
]

const iconMap = {
  deadline: Calendar,
  payment: DollarSign,
  call: Phone,
}

export function TodayFocus() {
  return (
    <div className="mb-16">
      <h2 className="section-title mb-6">HEUTE WICHTIG</h2>

      <div className="space-y-3">
        {focusItems.map((item, index) => {
          const Icon = iconMap[item.type]

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <div
                  className={cn(
                    "group relative glass-card p-4 hover-lift cursor-pointer",
                    item.urgent && "focus-pulse",
                  )}
                  style={
                    item.urgent
                      ? {
                          boxShadow: "0 0 30px rgba(255, 79, 0, 0.1)",
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-4">
                    {/* Icon with Glow */}
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl",
                        item.urgent ? "bg-accent/15 text-accent" : "bg-white/5 text-foreground-muted",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-medium text-foreground truncate">{item.title}</h3>
                        {item.urgent && <AlertCircle className="h-4 w-4 text-accent flex-shrink-0" />}
                      </div>
                      <p className="text-sm text-foreground-muted truncate">{item.subtitle}</p>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="h-5 w-5 text-foreground-faint opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
