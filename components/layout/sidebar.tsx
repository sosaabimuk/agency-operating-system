"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Wallet,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/finances", label: "Finances", icon: Wallet },
  { href: "/templates", label: "Templates", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed left-0 top-0 z-40 h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, #030303 0%, #000000 100%)",
        borderRight: "1px solid rgba(255, 255, 255, 0.04)",
      }}
    >
      {/* Logo Area */}
      <div className="flex h-16 items-center justify-between px-4 relative">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              {/* Logo Mark */}
              <div className="relative">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-lg shadow-accent/20">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-xl bg-accent/30 blur-xl opacity-50" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground tracking-tight text-[15px]">Nodewerk</span>
                <span className="text-[10px] text-foreground-muted font-medium tracking-wide">AGENCY OS</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {collapsed && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mx-auto"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-shadow duration-300">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div className="absolute inset-0 rounded-xl bg-accent/30 blur-xl opacity-50" />
          </motion.div>
        )}

        {/* Divider */}
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border-prominent to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-surface-3 text-foreground"
                    : "text-foreground-secondary hover:text-foreground hover:bg-surface-2",
                )}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,79,0,0.5)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-accent/15 text-accent"
                      : "bg-transparent group-hover:bg-surface-3 text-foreground-muted group-hover:text-foreground-secondary",
                  )}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                </div>

                {/* Label */}
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      className={cn("text-[13px] font-medium", isActive && "text-foreground")}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Hover Glow */}
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 space-y-2">
        {/* Pro Badge */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-1 p-3 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold text-foreground">Pro Plan</span>
            </div>
            <p className="text-[11px] text-foreground-muted leading-relaxed">Unbegrenzte Clients & Projekte</p>
          </motion.div>
        )}

        {/* Divider */}
        <div className="mx-1 h-px bg-gradient-to-r from-transparent via-border-prominent to-transparent" />

        {/* Collapse Toggle */}
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2.5 rounded-xl",
            "text-foreground-muted hover:text-foreground-secondary hover:bg-surface-2",
            "transition-all duration-200",
            collapsed && "justify-center",
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </div>
          {!collapsed && <span className="text-xs font-medium">Collapse</span>}
        </motion.button>
      </div>
    </motion.aside>
  )
}
