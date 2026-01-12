"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function KeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger with Cmd/Ctrl key
      if (!e.metaKey && !e.ctrlKey) return

      // Ignore if typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return
      }

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
        case ",":
          e.preventDefault()
          router.push("/settings")
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [router])

  return null
}
