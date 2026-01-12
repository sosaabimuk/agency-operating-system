import { notFound } from "next/navigation"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { ProjectDetail } from "@/components/projects/project-detail"
import { getProjectById } from "@/lib/data"

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <PageWrapper>
      <ProjectDetail project={project} />
    </PageWrapper>
  )
}
