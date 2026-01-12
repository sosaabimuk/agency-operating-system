"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Copy, Check, ShoppingBag, Mail, CreditCard, Lock, Globe, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Credential } from "@/lib/data"
import { cn } from "@/lib/utils"

interface CredentialVaultProps {
  credentials: Credential[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  Mail,
  CreditCard,
  Globe,
  Key,
}

function CredentialField({
  label,
  value,
  isSecret = false,
}: {
  label: string
  value: string
  isSecret?: boolean
}) {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayValue = isSecret && !revealed ? "••••••••••••••••" : value

  return (
    <div className="flex items-center justify-between py-2">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted mb-1">{label}</p>
        <p
          className={cn(
            "text-sm font-mono truncate",
            isSecret && !revealed ? "text-foreground-muted" : "text-foreground",
          )}
        >
          {displayValue}
        </p>
      </div>
      <div className="flex items-center gap-1 ml-3">
        {isSecret && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-foreground-muted hover:text-foreground"
            onClick={() => setRevealed(!revealed)}
          >
            {revealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-foreground-muted hover:text-foreground"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}

export function CredentialVault({ credentials }: CredentialVaultProps) {
  if (credentials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-background-tertiary flex items-center justify-center mb-4">
          <Lock className="h-8 w-8 text-foreground-muted" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">Keine Zugänge hinterlegt</h3>
        <p className="text-foreground-muted max-w-sm">
          Füge Zugangsdaten für diesen Client hinzu, um sie sicher zu speichern.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {credentials.map((cred, index) => {
        const Icon = iconMap[cred.icon] || Key
        return (
          <motion.div
            key={cred.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass rounded-xl p-5 border border-border"
          >
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background-tertiary">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{cred.system}</h4>
                <p className="text-xs text-foreground-muted">Aktualisiert: {cred.lastUpdated}</p>
              </div>
            </div>

            <div className="space-y-1 divide-y divide-border">
              <CredentialField label="Username / Email" value={cred.username} />
              <CredentialField label="Passwort" value={cred.password} isSecret />
              {cred.apiKey && <CredentialField label="API Key" value={cred.apiKey} isSecret />}
            </div>

            {cred.notes && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted mb-1">Notizen</p>
                <p className="text-sm text-foreground-secondary">{cred.notes}</p>
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
