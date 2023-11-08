import { cn } from "@/lib/utils"
import { FormResponse } from "@/services/api"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { useEffect, useState } from "react"
import FormCard from "./form-card"
import FormCardSkeleton from "./skeletons/form-card-skeleton"
import { ScrollArea } from "./ui/scroll-area"
import { useSearchParams } from "react-router-dom"

interface Props {
  forms: FormResponse[]
  refetch: () => void
  isLoading?: boolean
}

export default function FormList({ forms: data, refetch, isLoading }: Props) {
  const [isFormsOpen, setIsFormsOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const formId = searchParams.get("formId")

  const sortedForms = data
    ?.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
    .map(({ id, ...form }) => {
      return {
        id: String(id),
        ...form,
      }
    })

  useEffect(() => {
    if (formId) {
      setIsFormsOpen(false)
    }
  }, [formId])

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
        className={cn("hidden", {
          "fixed inset-0 z-10 flex flex-col bg-zinc-50 sm:hidden": isFormsOpen,
        })}
      >
        <div className="flex items-center justify-between p-2 py-4">
          <h2 className="text-lg font-semibold text-zinc-600">Formulários</h2>
          <button onClick={() => setIsFormsOpen(false)}>
            <X />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-auto px-2 pb-2">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <FormCardSkeleton key={i} />
            ))}

          {sortedForms.map((form) => (
            <FormCard
              key={form.id}
              refetch={refetch}
              created_at={form.created_at}
              description={form.description}
              email={form.email}
              id={form.id}
              name={form.name}
              isFormSelected={formId === form.id}
            />
          ))}
        </div>
      </div>

      <ScrollArea className="hidden flex-1 sm:block">
        <div className="space-y-4 pr-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <FormCardSkeleton key={i} />
            ))}

          {sortedForms.map((form) => (
            <FormCard
              key={form.id}
              refetch={refetch}
              created_at={form.created_at}
              description={form.description}
              email={form.email}
              id={form.id}
              name={form.name}
              isFormSelected={formId === form.id}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
