export default function FormCardSkeleton() {
  return (
    <div className="animate-pulse space-y-2 rounded-md border border-zinc-300 p-3">
      <div className="h-4 w-1/2 rounded-md bg-zinc-200" />
      <div className="space-y-1">
        <div className="h-4 w-1/4 rounded-md bg-zinc-200" />
        <div className="h-4 w-3/4 rounded-md bg-zinc-200" />
      </div>
    </div>
  )
}
