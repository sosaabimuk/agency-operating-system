"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, Users, FolderKanban, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, shortcut: "1" },
  { href: "/clients", label: "Clients", icon: Users, shortcut: "2" },
  { href: "/projects", label: "Projects", icon: FolderKanban, shortcut: "3" },
  { href: "/finances", label: "Finances", icon: Wallet, shortcut: "4" },
]

export function MinimalDock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed left-0 top-0 z-50 h-screen w-14 flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <div className="relative">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
            <span className="text-white font-bold text-xs">N</span>
          </div>
          <div className="absolute inset-0 rounded-xl bg-accent/30 blur-xl opacity-50" />
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col items-center gap-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          const isHovered = hoveredIndex === index

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative"
              >
                {/* Active Glow Background */}
                {isActive && (
                  <motion.div
                    layoutId="dock-active-bg"
                    className="absolute inset-0 rounded-xl bg-accent/10"
                    style={{
                      boxShadow: "0 0 20px rgba(255, 79, 0, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200",
                    isActive ? "text-accent" : "text-foreground-muted hover:text-foreground-secondary",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </motion.div>

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-14 top-1/2 -translate-y-1/2 z-50"
                    >
                      <div className="glass-panel px-3 py-1.5 flex items-center gap-2 whitespace-nowrap">
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                        <span className="cmd-hint">⌘{item.shortcut}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          )
        })}
      </div>

      {/* Command K Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="cmd-hint">⌘K</div>
      </div>
    </motion.nav>
  )
}
