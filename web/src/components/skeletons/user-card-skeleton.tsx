export default function UserCardSkeleton() {
  const widths = ["w-1/2", "w-2/4", "w-3/4", "w-1/3", "w-2/3"]
  const randomWidth = widths[Math.floor(Math.random() * widths.length)]
  return (
    <div className="animate-pulse space-y-2 rounded-md border border-zinc-300 p-4">
      <div className={`h-4 rounded-md bg-zinc-200 ${randomWidth}`} />
    </div>
  )
}
