import { PageWrapper } from "@/components/layout/page-wrapper"

export default function FinancesLoading() {
  return (
    <PageWrapper>
      <div className="animate-pulse">
        <div className="h-10 w-48 bg-background-secondary rounded-lg mb-2" />
        <div className="h-5 w-64 bg-background-secondary rounded-lg mb-8" />
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-background-secondary rounded-xl" />
          ))}
        </div>
        <div className="h-[300px] bg-background-secondary rounded-xl mb-8" />
        <div className="h-64 bg-background-secondary rounded-xl" />
      </div>
    </PageWrapper>
  )
}
