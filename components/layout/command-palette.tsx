"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command, Users, FolderKanban, Wallet, Plus, Search, FileText, Settings, Home, DollarSign } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { clients, projects } from "@/lib/data"

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command className="rounded-xl border border-border bg-background-secondary/95 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center border-b border-border px-4">
          <Command className="h-4 w-4 shrink-0 text-foreground-muted mr-2" />
          <CommandInput placeholder="Was möchtest du tun?" className="border-0 focus:ring-0" />
        </div>
        <CommandList className="max-h-[400px]">
          <CommandEmpty>Keine Ergebnisse gefunden.</CommandEmpty>

          {/* Quick Access */}
          <CommandGroup heading="Schnellzugriff">
            {clients.slice(0, 2).map((client) => (
              <CommandItem key={client.id} onSelect={() => runCommand(() => router.push(`/clients/${client.id}`))}>
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-6 w-6 rounded-full bg-background-tertiary flex items-center justify-center text-[10px] font-medium">
                    {client.name.slice(0, 2)}
                  </div>
                  <span>{client.name} anrufen</span>
                </div>
                <span className="text-xs text-foreground-muted">kürzlich</span>
              </CommandItem>
            ))}
            <CommandItem onSelect={() => runCommand(() => router.push("/finances"))}>
              <DollarSign className="mr-2 h-4 w-4" />
              <span>Neue Rechnung</span>
              <span className="ml-auto text-xs text-foreground-muted">finanzen</span>
            </CommandItem>
            {projects.slice(0, 1).map((project) => (
              <CommandItem key={project.id} onSelect={() => runCommand(() => router.push(`/projects/${project.id}`))}>
                <FolderKanban className="mr-2 h-4 w-4" />
                <span>{project.name}</span>
                <span className="ml-auto text-xs text-foreground-muted">projekt</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Navigation */}
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
              <Home className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
              <CommandShortcut>⌘1</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/clients"))}>
              <Users className="mr-2 h-4 w-4" />
              <span>Clients</span>
              <CommandShortcut>⌘2</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
              <FolderKanban className="mr-2 h-4 w-4" />
              <span>Projects</span>
              <CommandShortcut>⌘3</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/finances"))}>
              <Wallet className="mr-2 h-4 w-4" />
              <span>Finances</span>
              <CommandShortcut>⌘4</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Actions */}
          <CommandGroup heading="Aktionen">
            <CommandItem onSelect={() => runCommand(() => console.log("New Client"))}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Neuer Client</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("New Project"))}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Neues Projekt</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("New Invoice"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Rechnung erstellen</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Search"))}>
              <Search className="mr-2 h-4 w-4" />
              <span>Suche in allem...</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Clients */}
          <CommandGroup heading="Clients">
            {clients.map((client) => (
              <CommandItem key={client.id} onSelect={() => runCommand(() => router.push(`/clients/${client.id}`))}>
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-6 w-6 rounded-full bg-background-tertiary flex items-center justify-center text-[10px] font-medium">
                    {client.name.slice(0, 2)}
                  </div>
                  <div>
                    <span className="font-medium">{client.name}</span>
                    <span className="text-foreground-muted"> - {client.company}</span>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          {/* Projects */}
          <CommandGroup heading="Projekte">
            {projects.map((project) => (
              <CommandItem key={project.id} onSelect={() => runCommand(() => router.push(`/projects/${project.id}`))}>
                <FolderKanban className="mr-2 h-4 w-4" />
                <span>{project.name}</span>
                <span className="ml-auto text-xs text-foreground-muted">{project.clientName}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>

        <div className="flex items-center justify-center gap-4 px-4 py-3 border-t border-border text-[10px] text-foreground-muted">
          <span>⌘K öffnen</span>
          <span>·</span>
          <span>ESC schließen</span>
        </div>
      </Command>
    </CommandDialog>
  )
}
