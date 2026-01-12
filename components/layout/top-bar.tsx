"use client"

import { Bell, Plus, Search, ChevronRight, Command } from "lucide-react"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TopBarProps {
  breadcrumbs?: { label: string; href?: string }[]
}

export function TopBar({ breadcrumbs = [] }: TopBarProps) {
  const openCommandPalette = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    })
    document.dispatchEvent(event)
  }

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-xl" />

      {/* Top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-prominent to-transparent" />

      <div className="relative flex h-full items-center justify-between px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-foreground-faint" />}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-foreground-muted hover:text-foreground transition-colors font-medium"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground font-semibold">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>

        {/* Center: Command Palette Trigger */}
        <motion.button
          onClick={openCommandPalette}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={cn(
            "hidden md:flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300",
            "bg-surface-2 border border-border",
            "hover:border-border-prominent hover:bg-surface-3",
            "text-foreground-muted hover:text-foreground-secondary",
          )}
        >
          <Search className="h-4 w-4" />
          <span className="text-sm">Search or command...</span>
          <div className="flex items-center gap-0.5 ml-2">
            <kbd className="flex h-5 w-5 items-center justify-center rounded border border-border bg-surface-inset text-[10px] font-medium text-foreground-muted">
              <Command className="h-2.5 w-2.5" />
            </kbd>
            <kbd className="flex h-5 items-center justify-center rounded border border-border bg-surface-inset px-1.5 text-[10px] font-medium text-foreground-muted">
              K
            </kbd>
          </div>
        </motion.button>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-surface-2 border border-border text-foreground-secondary hover:text-foreground hover:border-border-prominent transition-all"
          >
            <Bell className="h-[18px] w-[18px]" />
            {/* Notification Dot */}
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_6px_rgba(255,79,0,0.5)]" />
            </span>
          </motion.button>

          {/* Quick Add */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300",
                  "bg-gradient-to-b from-accent to-accent-dark text-white",
                  "shadow-lg shadow-accent/25 hover:shadow-accent/40",
                  "hover:from-accent-light hover:to-accent",
                )}
              >
                <Plus className="h-5 w-5" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-52 p-1.5 bg-surface-2 border-border rounded-xl shadow-xl shadow-black/20"
            >
              <DropdownMenuItem className="cursor-pointer px-3 py-2.5 rounded-lg hover:bg-surface-3 focus:bg-surface-3 text-foreground-secondary hover:text-foreground transition-colors">
                <Plus className="h-4 w-4 mr-2.5 text-foreground-muted" />
                New Client
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer px-3 py-2.5 rounded-lg hover:bg-surface-3 focus:bg-surface-3 text-foreground-secondary hover:text-foreground transition-colors">
                <Plus className="h-4 w-4 mr-2.5 text-foreground-muted" />
                New Project
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer px-3 py-2.5 rounded-lg hover:bg-surface-3 focus:bg-surface-3 text-foreground-secondary hover:text-foreground transition-colors">
                <Plus className="h-4 w-4 mr-2.5 text-foreground-muted" />
                Create Invoice
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Avatar className="h-9 w-9 border-2 border-surface-3 ring-1 ring-border cursor-pointer hover:ring-border-prominent transition-all">
              <AvatarFallback className="bg-gradient-to-br from-surface-3 to-surface-2 text-foreground text-xs font-semibold">
                AU
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
