import { PageWrapper } from "@/components/layout/page-wrapper"

export default function ProjectsLoading() {
  return (
    <PageWrapper>
      <div className="animate-pulse">
        <div className="h-10 w-48 bg-background-secondary rounded-lg mb-2" />
        <div className="h-5 w-64 bg-background-secondary rounded-lg mb-8" />
        <div className="flex gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-[300px] h-[400px] bg-background-secondary rounded-xl" />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
