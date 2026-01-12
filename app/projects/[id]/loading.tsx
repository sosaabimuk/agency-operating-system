import { PageWrapper } from "@/components/layout/page-wrapper"

export default function ProjectLoading() {
  return (
    <PageWrapper>
      <div className="animate-pulse">
        <div className="h-4 w-32 bg-background-secondary rounded mb-6" />
        <div className="h-10 w-64 bg-background-secondary rounded-lg mb-2" />
        <div className="h-5 w-40 bg-background-secondary rounded-lg mb-6" />
        <div className="flex gap-4 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 w-32 bg-background-secondary rounded-lg" />
          ))}
        </div>
        <div className="h-2 w-full bg-background-secondary rounded-full mb-8" />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 h-96 bg-background-secondary rounded-xl" />
          <div className="h-96 bg-background-secondary rounded-xl" />
        </div>
      </div>
    </PageWrapper>
  )
}
