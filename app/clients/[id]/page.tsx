import { notFound } from "next/navigation"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { ClientDetail } from "@/components/clients/client-detail"
import { getClientById, getProjectsByClient, credentials } from "@/lib/data"

interface ClientPageProps {
  params: Promise<{ id: string }>
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { id } = await params
  const client = getClientById(id)

  if (!client) {
    notFound()
  }

  const clientProjects = getProjectsByClient(id)
  // For demo, only show credentials for the first client (Johannes/Aktimed)
  const clientCredentials = id === "1" ? credentials : []

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Clients", href: "/clients" },
        { label: `${client.name} – ${client.company}` },
      ]}
    >
      <ClientDetail client={client} projects={clientProjects} credentials={clientCredentials} />
    </PageWrapper>
  )
}
