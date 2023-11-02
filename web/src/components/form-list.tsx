import { cn } from "@/lib/utils"
import { FormResponse } from "@/services/api"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import FormCard from "./form-card"
import FormCardSkeleton from "./skeletons/form-card-skeleton"

interface Props {
  forms: FormResponse[]
  refetch: () => void
  isLoading?: boolean
}

export default function FormList({ forms: data, refetch, isLoading }: Props) {
  const [isFormsOpen, setIsFormsOpen] = useState(false)

  const sortedForms = data?.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

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
        className={cn(
          "flex-1 space-y-4 overflow-hidden py-4 pb-4 pr-2 hover:overflow-y-auto hover:pr-1",
          {
            "hidden sm:block": !isFormsOpen,
          },
        )}
      >
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => <FormCardSkeleton key={i} />)}

        <div className="space-y-4">
          {sortedForms.map((form) => (
            <FormCard key={form.id} refetch={refetch} {...form} />
          ))}
        </div>
      </div>
    </div>
  )
}
