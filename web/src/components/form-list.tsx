import { cn } from "@/lib/utils"
import { FormResponse } from "@/services/api"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import FormCard from "./form-card"

interface Props {
  forms: FormResponse[]
  refetch: () => void
  isLoading?: boolean
}

export default function FormList({ forms: data, refetch, isLoading }: Props) {
  const [isFormsOpen, setIsFormsOpen] = useState(false)

  return (
    <div className="flex flex-1 flex-col gap-2 overflow-hidden">
      <h2
        className="flex items-center justify-between text-lg font-semibold text-zinc-600"
        onClick={() => setIsFormsOpen((prev) => !prev)}
      >
        Formulários{" "}
        <span className="sm:hidden">
          {isFormsOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </h2>

      <div
        className={cn("flex-1 space-y-4 overflow-y-auto pb-4", {
          "hidden sm:block": !isFormsOpen,
        })}
      >
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}

        <ul className="space-y-4 pr-1">
          {data?.map((form) => (
            <FormCard key={form.id} refetch={refetch} {...form} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function CardSkeleton() {
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
