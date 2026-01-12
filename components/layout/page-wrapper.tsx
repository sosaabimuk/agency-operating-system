"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Sidebar } from "./sidebar"
import { TopBar } from "./top-bar"
import { CommandPalette } from "./command-palette"
import { AmbientBackground } from "./ambient-background"
import { KeyboardShortcuts } from "./keyboard-shortcuts"

interface PageWrapperProps {
  children: React.ReactNode
  breadcrumbs?: { label: string; href?: string }[]
}

export function PageWrapper({ children, breadcrumbs = [] }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-background relative">
      <AmbientBackground />

      <CommandPalette />

      <KeyboardShortcuts />

      <Sidebar />
      <div className="pl-[240px] transition-all duration-200 relative z-10">
        <TopBar breadcrumbs={breadcrumbs} />
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
