"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MinimalDock } from "./minimal-dock"
import { AmbientSpace } from "./ambient-space"
import { CommandCenter } from "./command-center"
import { useRouter, usePathname } from "next/navigation"

interface CockpitWrapperProps {
  children: React.ReactNode
}

export function CockpitWrapper({ children }: CockpitWrapperProps) {
  const [commandOpen, setCommandOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command + K for command palette
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((prev) => !prev)
      }

      // Command + 1-4 for navigation
      if ((e.metaKey || e.ctrlKey) && !commandOpen) {
        switch (e.key) {
          case "1":
            e.preventDefault()
            router.push("/")
            break
          case "2":
            e.preventDefault()
            router.push("/clients")
            break
          case "3":
            e.preventDefault()
            router.push("/projects")
            break
          case "4":
            e.preventDefault()
            router.push("/finances")
            break
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [router, commandOpen])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient Space Background */}
      <AmbientSpace />

      {/* Command Center */}
      <CommandCenter open={commandOpen} onOpenChange={setCommandOpen} />

      {/* Minimal Dock Navigation */}
      <MinimalDock />

      {/* Main Content Area */}
      <motion.main
        key={pathname}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="ml-14 min-h-screen relative z-10"
      >
        <div className="max-w-6xl mx-auto px-8 py-12">{children}</div>
      </motion.main>
    </div>
  )
}
