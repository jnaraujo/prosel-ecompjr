import { cn } from "@/lib/utils"
import { FormResponse } from "@/services/api"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import FormCard from "./form-card"
import FormCardSkeleton from "./skeletons/form-card-skeleton"
import { ScrollArea } from "./ui/scroll-area"

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

      <ScrollArea
        className={cn("flex-1", {
          "hidden sm:block": !isFormsOpen,
        })}
      >
        <div className="space-y-4 pr-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <FormCardSkeleton key={i} />
            ))}

          {sortedForms.map((form) => (
            <FormCard key={form.id} refetch={refetch} {...form} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
