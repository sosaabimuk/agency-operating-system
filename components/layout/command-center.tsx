"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Users, FolderKanban, Wallet, Plus, Home, FileText, ArrowRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { clients, projects } from "@/lib/data"

interface CommandCenterProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandCenter({ open, onOpenChange }: CommandCenterProps) {
  const [search, setSearch] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Filter results based on search
  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase()),
  )

  const filteredProjects = projects.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  const sections = [
    {
      title: "RECENT",
      items: [
        {
          id: "recent-1",
          label: clients[0]?.name || "Client",
          sublabel: "kürzlich angesehen",
          icon: Clock,
          action: () => router.push(`/clients/${clients[0]?.id}`),
        },
        {
          id: "recent-2",
          label: projects[0]?.name || "Project",
          sublabel: "kürzlich bearbeitet",
          icon: Clock,
          action: () => router.push(`/projects/${projects[0]?.id}`),
        },
      ],
    },
    {
      title: "NAVIGATION",
      items: [
        { id: "nav-1", label: "Dashboard", sublabel: "", icon: Home, shortcut: "⌘1", action: () => router.push("/") },
        {
          id: "nav-2",
          label: "Clients",
          sublabel: `${clients.length} total`,
          icon: Users,
          shortcut: "⌘2",
          action: () => router.push("/clients"),
        },
        {
          id: "nav-3",
          label: "Projects",
          sublabel: `${projects.length} aktiv`,
          icon: FolderKanban,
          shortcut: "⌘3",
          action: () => router.push("/projects"),
        },
        {
          id: "nav-4",
          label: "Finances",
          sublabel: "",
          icon: Wallet,
          shortcut: "⌘4",
          action: () => router.push("/finances"),
        },
      ],
    },
    {
      title: "CREATE",
      items: [
        { id: "create-1", label: "Neuer Client", sublabel: "", icon: Plus, action: () => console.log("New Client") },
        { id: "create-2", label: "Neues Projekt", sublabel: "", icon: Plus, action: () => console.log("New Project") },
        {
          id: "create-3",
          label: "Neue Rechnung",
          sublabel: "",
          icon: FileText,
          action: () => console.log("New Invoice"),
        },
      ],
    },
  ]

  // Add search results if searching
  const searchResults =
    search.length > 0
      ? [
          {
            title: "CLIENTS",
            items: filteredClients.slice(0, 3).map((c) => ({
              id: `client-${c.id}`,
              label: c.name,
              sublabel: c.company,
              icon: Users,
              action: () => router.push(`/clients/${c.id}`),
            })),
          },
          {
            title: "PROJECTS",
            items: filteredProjects.slice(0, 3).map((p) => ({
              id: `project-${p.id}`,
              label: p.name,
              sublabel: p.clientName,
              icon: FolderKanban,
              action: () => router.push(`/projects/${p.id}`),
            })),
          },
        ].filter((s) => s.items.length > 0)
      : sections

  const allItems = searchResults.flatMap((s) => s.items)

  React.useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      setSearch("")
      setSelectedIndex(0)
    }
  }, [open])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((i) => Math.min(i + 1, allItems.length - 1))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((i) => Math.max(i - 1, 0))
          break
        case "Enter":
          e.preventDefault()
          if (allItems[selectedIndex]) {
            allItems[selectedIndex].action()
            onOpenChange(false)
          }
          break
        case "Escape":
          e.preventDefault()
          onOpenChange(false)
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, selectedIndex, allItems, onOpenChange])

  let currentIndex = 0

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 z-50 w-full max-w-xl"
          >
            <div className="glass-panel overflow-hidden shadow-2xl shadow-black/50">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border-glass">
                <Search className="h-5 w-5 text-foreground-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setSelectedIndex(0)
                  }}
                  className="flex-1 bg-transparent text-foreground placeholder:text-foreground-faint outline-none text-base"
                />
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto py-2">
                {searchResults.map((section) => (
                  <div key={section.title} className="mb-2">
                    <div className="px-5 py-2">
                      <span className="section-title">{section.title}</span>
                    </div>
                    {section.items.map((item) => {
                      const itemIndex = currentIndex++
                      const isSelected = selectedIndex === itemIndex

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            item.action()
                            onOpenChange(false)
                          }}
                          onMouseEnter={() => setSelectedIndex(itemIndex)}
                          className={cn(
                            "w-full flex items-center gap-3 px-5 py-2.5 transition-colors",
                            isSelected ? "bg-white/5" : "hover:bg-white/[0.02]",
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-lg",
                              isSelected ? "bg-accent/15 text-accent" : "bg-white/5 text-foreground-muted",
                            )}
                          >
                            <item.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium text-foreground">{item.label}</div>
                            {item.sublabel && <div className="text-xs text-foreground-muted">{item.sublabel}</div>}
                          </div>
                          {"shortcut" in item && item.shortcut && <span className="cmd-hint">{item.shortcut}</span>}
                          {isSelected && <ArrowRight className="h-4 w-4 text-foreground-muted" />}
                        </button>
                      )
                    })}
                  </div>
                ))}

                {search.length > 0 && allItems.length === 0 && (
                  <div className="px-5 py-8 text-center">
                    <p className="text-foreground-muted">Keine Ergebnisse für "{search}"</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-center gap-6 px-5 py-3 border-t border-border-glass">
                <span className="micro-text flex items-center gap-1">
                  <span className="cmd-hint">↑↓</span> navigieren
                </span>
                <span className="micro-text flex items-center gap-1">
                  <span className="cmd-hint">↵</span> auswählen
                </span>
                <span className="micro-text flex items-center gap-1">
                  <span className="cmd-hint">esc</span> schließen
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
