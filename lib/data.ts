// Dummy data for Nodewerk OS

export interface Client {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: "lead" | "proposal" | "active" | "paused" | "completed"
  mrr: number
  projects: number
  tags: string[]
  startDate: string
  lifetimeValue: number
  lastContact: string
  avatar?: string
  contractModel?: string
  contractTerms?: string
  nextInvoice?: string
  paymentStatus?: "paid" | "pending" | "overdue"
}

export interface Project {
  id: string
  name: string
  clientId: string
  clientName: string
  clientAvatar?: string
  status: "backlog" | "in-progress" | "review" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  progress: number
  dueDate: string
  value: number
  description?: string
  tags: string[]
  commentsCount: number
  attachmentsCount: number
  tasks: ProjectTask[]
  milestones: Milestone[]
}

export interface ProjectTask {
  id: string
  title: string
  completed: boolean
  dueDate?: string
  assignee?: string
  priority?: "low" | "medium" | "high"
  group: string
}

export interface Milestone {
  id: string
  name: string
  date: string
  status: "completed" | "active" | "pending"
}

export interface Invoice {
  id: string
  invoiceNumber: string
  clientId: string
  clientName: string
  projectId?: string
  status: "draft" | "sent" | "pending" | "paid" | "overdue"
  lineItems: InvoiceLineItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  dueDate: string
  paidDate?: string
  createdAt: string
  sentAt?: string
  notes?: string
}

export interface InvoiceLineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Retainer {
  id: string
  clientId: string
  clientName: string
  amount: number
  startDate: string
  minimumTermMonths: number
  currentMonth: number
  status: "active" | "paused" | "cancelled"
  nextBillingDate: string
  paymentHistory: RetainerPayment[]
}

export interface RetainerPayment {
  month: string
  amount: number
  status: "paid" | "pending" | "upcoming"
}

export interface Proposal {
  id: string
  clientId: string
  clientName: string
  title: string
  status: "draft" | "sent" | "viewed" | "accepted" | "declined" | "expired"
  value: number
  recurringValue?: number
  sentDate?: string
  acceptedDate?: string
  createdAt: string
}

export interface Activity {
  id: string
  message: string
  timestamp: string
  type: "success" | "info" | "warning" | "neutral"
}

export interface Credential {
  id: string
  system: string
  icon: string
  username: string
  password: string
  apiKey?: string
  notes?: string
  lastUpdated: string
}

export const clients: Client[] = [
  {
    id: "1",
    name: "Johannes",
    company: "Aktimed GmbH",
    email: "johannes@aktimed.de",
    phone: "+49 171 1234567",
    status: "active",
    mrr: 850,
    projects: 2,
    tags: ["E-Commerce", "Support AI", "Retainer"],
    startDate: "Jan 2025",
    lifetimeValue: 5400,
    lastContact: "vor 2 Stunden",
    contractModel: "Kickstart + Retainer",
    contractTerms: "6 Monate Mindestlaufzeit",
    nextInvoice: "15. Feb",
    paymentStatus: "paid",
  },
  {
    id: "2",
    name: "Max Müller",
    company: "TechStart UG",
    email: "max@techstart.io",
    phone: "+49 172 9876543",
    status: "lead",
    mrr: 0,
    projects: 0,
    tags: ["SaaS", "MVP"],
    startDate: "-",
    lifetimeValue: 0,
    lastContact: "vor 5 Stunden",
  },
  {
    id: "3",
    name: "Sarah Klein",
    company: "DesignStudio Berlin",
    email: "sarah@designstudio.berlin",
    phone: "+49 173 5551234",
    status: "active",
    mrr: 1200,
    projects: 3,
    tags: ["Branding", "Website", "Retainer"],
    startDate: "Okt 2024",
    lifetimeValue: 8400,
    lastContact: "gestern",
    contractModel: "Full Service",
    contractTerms: "12 Monate",
    nextInvoice: "1. Feb",
    paymentStatus: "paid",
  },
  {
    id: "4",
    name: "Thomas Weber",
    company: "Weber Consulting",
    email: "thomas@weber-consulting.de",
    phone: "+49 174 8887766",
    status: "proposal",
    mrr: 0,
    projects: 0,
    tags: ["Consulting", "Automation"],
    startDate: "-",
    lifetimeValue: 0,
    lastContact: "vor 3 Tagen",
  },
  {
    id: "5",
    name: "Anna Schmidt",
    company: "HealthTech Solutions",
    email: "anna@healthtech.solutions",
    phone: "+49 175 2223344",
    status: "active",
    mrr: 500,
    projects: 1,
    tags: ["Healthcare", "App"],
    startDate: "Dez 2024",
    lifetimeValue: 1500,
    lastContact: "vor 1 Woche",
    contractModel: "Project-based",
    contractTerms: "3 Monate",
    nextInvoice: "20. Feb",
    paymentStatus: "pending",
  },
]

export const projects: Project[] = [
  {
    id: "1",
    name: "Support AI Setup",
    clientId: "1",
    clientName: "Johannes",
    clientAvatar: "JA",
    status: "in-progress",
    priority: "high",
    progress: 65,
    dueDate: "2025-01-25",
    value: 900,
    description:
      "Komplettes Support AI System mit n8n Workflow, Intent Recognition und automatischen Antworten für E-Commerce Kundenanfragen.",
    tags: ["Bot", "API", "Setup"],
    commentsCount: 3,
    attachmentsCount: 2,
    tasks: [
      { id: "t1", title: "Zugänge von Johannes erhalten", completed: true, group: "SETUP", assignee: "Aurell" },
      { id: "t2", title: "Shopify API verbunden", completed: true, group: "SETUP", assignee: "Aurell" },
      { id: "t3", title: "EasyBill API verbunden", completed: true, group: "SETUP", assignee: "Aurell" },
      {
        id: "t4",
        title: "Gmail IMAP einrichten",
        completed: false,
        dueDate: "2025-01-18",
        group: "SETUP",
        assignee: "Aurell",
        priority: "high",
      },
      {
        id: "t5",
        title: "DHL Tracking API",
        completed: false,
        dueDate: "2025-01-19",
        group: "SETUP",
        assignee: "Partner",
      },
      { id: "t6", title: "n8n Workflow Grundstruktur", completed: true, group: "DEVELOPMENT", assignee: "Aurell" },
      {
        id: "t7",
        title: "Intent Recognition trainieren",
        completed: false,
        dueDate: "2025-01-20",
        group: "DEVELOPMENT",
        assignee: "Aurell",
      },
      {
        id: "t8",
        title: "Response Templates erstellen",
        completed: false,
        dueDate: "2025-01-21",
        group: "DEVELOPMENT",
        assignee: "Aurell",
      },
      {
        id: "t9",
        title: "Error Handling",
        completed: false,
        dueDate: "2025-01-22",
        group: "DEVELOPMENT",
        assignee: "Aurell",
      },
      { id: "t10", title: "Internal Testing", completed: false, group: "TESTING", assignee: "Aurell" },
      { id: "t11", title: "Johannes Beta Access", completed: false, group: "TESTING", assignee: "Aurell" },
      { id: "t12", title: "Bug Fixes", completed: false, group: "TESTING", assignee: "Aurell" },
      { id: "t13", title: "Production Deployment", completed: false, group: "GO-LIVE", assignee: "Aurell" },
      { id: "t14", title: "Handover Documentation", completed: false, group: "GO-LIVE", assignee: "Aurell" },
    ],
    milestones: [
      { id: "m1", name: "Kickoff", date: "2025-01-10", status: "completed" },
      { id: "m2", name: "Setup", date: "2025-01-15", status: "completed" },
      { id: "m3", name: "Testing", date: "2025-01-20", status: "active" },
      { id: "m4", name: "Go-Live", date: "2025-01-25", status: "pending" },
      { id: "m5", name: "Retainer", date: "2025-02-01", status: "pending" },
    ],
  },
  {
    id: "2",
    name: "E-Commerce Relaunch",
    clientId: "1",
    clientName: "Johannes",
    clientAvatar: "JA",
    status: "backlog",
    priority: "medium",
    progress: 15,
    dueDate: "2025-02-28",
    value: 4500,
    description: "Kompletter Relaunch des Shopify Stores mit neuem Design und optimierter UX.",
    tags: ["Shopify", "Design", "UX"],
    commentsCount: 1,
    attachmentsCount: 0,
    tasks: [],
    milestones: [],
  },
  {
    id: "3",
    name: "Brand Identity",
    clientId: "3",
    clientName: "Sarah Klein",
    clientAvatar: "SK",
    status: "review",
    priority: "medium",
    progress: 90,
    dueDate: "2025-02-10",
    value: 3200,
    description: "Entwicklung einer neuen Brand Identity inkl. Logo, Farben und Styleguide.",
    tags: ["Branding", "Logo", "Design"],
    commentsCount: 5,
    attachmentsCount: 8,
    tasks: [],
    milestones: [],
  },
  {
    id: "4",
    name: "Mobile App MVP",
    clientId: "5",
    clientName: "Anna Schmidt",
    clientAvatar: "AS",
    status: "in-progress",
    priority: "high",
    progress: 40,
    dueDate: "2025-04-01",
    value: 8500,
    description: "MVP für Healthcare App mit Patientenverwaltung und Terminbuchung.",
    tags: ["App", "React Native", "Healthcare"],
    commentsCount: 12,
    attachmentsCount: 4,
    tasks: [],
    milestones: [],
  },
  {
    id: "5",
    name: "Automation Workflow",
    clientId: "3",
    clientName: "Sarah Klein",
    clientAvatar: "SK",
    status: "completed",
    priority: "low",
    progress: 100,
    dueDate: "2025-01-05",
    value: 1200,
    description: "Automatisierung der Buchhaltung mit n8n und EasyBill.",
    tags: ["n8n", "Automation"],
    commentsCount: 2,
    attachmentsCount: 1,
    tasks: [],
    milestones: [],
  },
]

export const invoices: Invoice[] = [
  {
    id: "inv1",
    invoiceNumber: "INV-007",
    clientId: "1",
    clientName: "Johannes",
    projectId: "1",
    status: "paid",
    lineItems: [
      { id: "li1", description: "Kickstart: Support AI Setup - Anzahlung", quantity: 1, unitPrice: 450, total: 450 },
    ],
    subtotal: 450,
    taxRate: 19,
    taxAmount: 85.5,
    total: 535.5,
    dueDate: "2025-01-15",
    paidDate: "2025-01-14",
    createdAt: "2025-01-10",
    sentAt: "2025-01-10",
    notes: "Vielen Dank für Ihr Vertrauen!",
  },
  {
    id: "inv2",
    invoiceNumber: "INV-006",
    clientId: "1",
    clientName: "Johannes",
    projectId: "1",
    status: "pending",
    lineItems: [
      { id: "li2", description: "Kickstart: Support AI Setup - Restzahlung", quantity: 1, unitPrice: 450, total: 450 },
    ],
    subtotal: 450,
    taxRate: 19,
    taxAmount: 85.5,
    total: 535.5,
    dueDate: "2025-01-25",
    createdAt: "2025-01-15",
    sentAt: "2025-01-15",
  },
  {
    id: "inv3",
    invoiceNumber: "INV-005",
    clientId: "2",
    clientName: "Max Müller",
    status: "paid",
    lineItems: [{ id: "li3", description: "Consulting: Strategieberatung", quantity: 4, unitPrice: 300, total: 1200 }],
    subtotal: 1200,
    taxRate: 19,
    taxAmount: 228,
    total: 1428,
    dueDate: "2025-01-10",
    paidDate: "2025-01-09",
    createdAt: "2025-01-02",
    sentAt: "2025-01-02",
  },
  {
    id: "inv4",
    invoiceNumber: "INV-004",
    clientId: "3",
    clientName: "Sarah Klein",
    status: "overdue",
    lineItems: [{ id: "li4", description: "Brand Identity - Konzeptphase", quantity: 1, unitPrice: 850, total: 850 }],
    subtotal: 850,
    taxRate: 19,
    taxAmount: 161.5,
    total: 1011.5,
    dueDate: "2025-01-01",
    createdAt: "2024-12-20",
    sentAt: "2024-12-20",
  },
]

export const retainers: Retainer[] = [
  {
    id: "ret1",
    clientId: "1",
    clientName: "Johannes",
    amount: 850,
    startDate: "2025-01-01",
    minimumTermMonths: 6,
    currentMonth: 1,
    status: "active",
    nextBillingDate: "2025-02-01",
    paymentHistory: [
      { month: "Jan 2025", amount: 850, status: "paid" },
      { month: "Feb 2025", amount: 850, status: "upcoming" },
      { month: "Mär 2025", amount: 850, status: "upcoming" },
    ],
  },
  {
    id: "ret2",
    clientId: "3",
    clientName: "Sarah Klein",
    amount: 1200,
    startDate: "2024-10-01",
    minimumTermMonths: 12,
    currentMonth: 4,
    status: "active",
    nextBillingDate: "2025-02-01",
    paymentHistory: [
      { month: "Okt 2024", amount: 1200, status: "paid" },
      { month: "Nov 2024", amount: 1200, status: "paid" },
      { month: "Dez 2024", amount: 1200, status: "paid" },
      { month: "Jan 2025", amount: 1200, status: "paid" },
      { month: "Feb 2025", amount: 1200, status: "upcoming" },
    ],
  },
]

export const proposals: Proposal[] = [
  {
    id: "prop1",
    clientId: "1",
    clientName: "Johannes",
    title: "Kickstart + Partnerschaft",
    status: "accepted",
    value: 900,
    recurringValue: 850,
    sentDate: "2025-01-08",
    acceptedDate: "2025-01-11",
    createdAt: "2025-01-07",
  },
  {
    id: "prop2",
    clientId: "4",
    clientName: "Thomas Weber",
    title: "Automation Consulting",
    status: "sent",
    value: 2400,
    sentDate: "2025-01-12",
    createdAt: "2025-01-10",
  },
  {
    id: "prop3",
    clientId: "2",
    clientName: "Max Müller",
    title: "SaaS MVP Development",
    status: "draft",
    value: 8500,
    recurringValue: 500,
    createdAt: "2025-01-14",
  },
]

export const revenueData = [
  { month: "Jan", oneTime: 1800, recurring: 850 },
  { month: "Feb", oneTime: 2200, recurring: 1700 },
  { month: "Mär", oneTime: 1500, recurring: 1700 },
  { month: "Apr", oneTime: 3200, recurring: 2050 },
  { month: "Mai", oneTime: 2800, recurring: 2050 },
  { month: "Jun", oneTime: 1900, recurring: 2050 },
  { month: "Jul", oneTime: 4100, recurring: 2550 },
  { month: "Aug", oneTime: 3500, recurring: 2550 },
  { month: "Sep", oneTime: 2700, recurring: 2550 },
  { month: "Okt", oneTime: 3800, recurring: 3050 },
  { month: "Nov", oneTime: 2100, recurring: 3050 },
  { month: "Dez", oneTime: 4500, recurring: 3050 },
]

export const activities: Activity[] = [
  {
    id: "1",
    message: "Johannes hat Proposal angenommen",
    timestamp: "vor 2 Stunden",
    type: "success",
  },
  {
    id: "2",
    message: "Neue Anfrage von Max Müller",
    timestamp: "vor 5 Stunden",
    type: "info",
  },
  {
    id: "3",
    message: "Rechnung #004 bezahlt",
    timestamp: "gestern",
    type: "success",
  },
  {
    id: "4",
    message: 'Projekt "Brand Identity" wartet auf Review',
    timestamp: "vor 2 Tagen",
    type: "warning",
  },
  {
    id: "5",
    message: "Neuer Retainer-Vertrag mit DesignStudio",
    timestamp: "vor 3 Tagen",
    type: "success",
  },
]

export const credentials: Credential[] = [
  {
    id: "1",
    system: "Shopify",
    icon: "ShoppingBag",
    username: "aktimed-admin",
    password: "Aktimed2025!Secure",
    apiKey: "shpat_1234567890abcdef",
    notes: "Hauptadmin-Account für E-Commerce",
    lastUpdated: "12. Jan 2025",
  },
  {
    id: "2",
    system: "Gmail",
    icon: "Mail",
    username: "support@aktimed.de",
    password: "GmailSecure!2025",
    notes: "Support-Postfach",
    lastUpdated: "10. Jan 2025",
  },
  {
    id: "3",
    system: "Stripe",
    icon: "CreditCard",
    username: "johannes@aktimed.de",
    password: "StripeSecure!2025",
    apiKey: "sk_live_abcdef1234567890",
    notes: "Live API Key - Vorsicht!",
    lastUpdated: "8. Jan 2025",
  },
]

// Helper functions
export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Guten Morgen"
  if (hour < 18) return "Guten Tag"
  return "Guten Abend"
}

export function getClientsByStatus(status: Client["status"]): Client[] {
  return clients.filter((c) => c.status === status)
}

export function getClientById(id: string): Client | undefined {
  return clients.find((c) => c.id === id)
}

export function getProjectsByClient(clientId: string): Project[] {
  return projects.filter((p) => p.clientId === clientId)
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getProjectsByStatus(status: Project["status"]): Project[] {
  return projects.filter((p) => p.status === status)
}

export function getTotalMRR(): number {
  return retainers.filter((r) => r.status === "active").reduce((sum, r) => sum + r.amount, 0)
}

export function getActiveClientsCount(): number {
  return clients.filter((c) => c.status === "active").length
}

export function getPipelineValue(): number {
  return clients
    .filter((c) => c.status === "lead" || c.status === "proposal")
    .reduce((sum, c) => sum + (c.mrr || 1500), 4500)
}

export function getOutstandingAmount(): number {
  return invoices.filter((i) => i.status === "pending" || i.status === "overdue").reduce((sum, i) => sum + i.total, 0)
}

export function getRevenueMTD(): number {
  return invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.total, 0)
}
