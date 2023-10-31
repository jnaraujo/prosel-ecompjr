import { useEffect, useState } from "react"
import { FormResponse, deleteForm, getForms } from "../../services/api"
import { useQuery } from "react-query"
import { Link, useSearchParams } from "react-router-dom"
import { cn } from "../../lib/utils"
import Button from "../../components/button"
import { ChevronDown, ChevronRight, ChevronUp, Trash2 } from "lucide-react"
import cookies from "js-cookie"
import ConfirmationDialog from "@/components/confirmation-dialog"

export default function Dashboard() {
  const [isFormsOpen, setIsFormsOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const { isLoading, error, data, refetch } = useQuery("formsData", getForms, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!cookies.get("token"),
  })

  useEffect(() => {
    document.title = "Dashboard | EcompJr"
  }, [])

  useEffect(() => {
    if (data && data.length > 0 && !searchParams.get("formId")) {
      setSearchParams({ formId: data[0].id })
    }
  }, [data, searchParams, setSearchParams])

  if (isLoading) return null
  if (!data) return null
  if (error) return <p>Erro ao carregar formulários.</p>

  const selectedForm = data.find(
    (form) => String(form.id) === searchParams.get("formId"),
  )

  return (
    <section className="container flex min-h-[90svh] flex-col sm:h-[93svh] sm:flex-row sm:gap-8">
      <aside className="flex flex-col gap-2 overflow-hidden sm:max-w-[300px] sm:flex-1">
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
            <ul className="space-y-4 pr-1">
              {data?.map((form) => (
                <FormBox key={form.id} refetch={refetch} {...form} />
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <main className="flex flex-1 flex-col justify-between py-4 sm:py-0">
        {selectedForm ? <Form {...selectedForm} /> : <FormNotFound />}

        <div className="flex w-full justify-end py-4">
          <Button
            asChild
            className="flex w-fit items-center justify-center gap-2"
          >
            <Link to={`mailto:${selectedForm?.email}`}>
              Responder email <ChevronRight />
            </Link>
          </Button>
        </div>
      </main>
    </section>
  )
}

interface UserBoxProps extends FormResponse {
  refetch: () => void
}

function FormBox({ name, email, description, id, refetch }: UserBoxProps) {
  const [searchParams] = useSearchParams()

  async function handleDeleteForm() {
    await deleteForm(id)
    refetch()
  }

  return (
    <Link
      to={{ search: `?formId=${id}` }}
      className={cn(
        "block cursor-pointer rounded-md border border-zinc-300 p-3 transition-colors duration-200 ease-in-out hover:border-zinc-400",
        {
          "border-brand-blue": String(id) === searchParams.get("formId"),
        },
      )}
    >
      <div className="flex w-full items-center justify-between">
        <strong className="line-clamp-1 text-base font-semibold text-zinc-500">
          {name} - {email}
        </strong>

        <ConfirmationDialog
          title="Tem certeza que deseja excluir este formulário?"
          description="Esta ação não pode ser desfeita."
          confirmText="Excluir formulário"
          cancelText="Cancelar"
          onConfirm={handleDeleteForm}
        >
          <Trash2 className="h-5 w-5 text-zinc-400 transition-colors duration-200 ease-in-out hover:text-red-600" />
        </ConfirmationDialog>
      </div>
      <p className="line-clamp-3 text-zinc-400">{description}</p>
    </Link>
  )
}

function Form({ name, email, description }: FormResponse) {
  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-2xl font-bold text-zinc-700">
          Formulário de: {name}
        </h1>
        <h2 className="text-zinc-400">Email: {email}</h2>
      </div>
      <p className="text-zinc-500">{description}</p>
    </div>
  )
}

function FormNotFound() {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-zinc-700">
        Nenhum formulário selecionado
      </h1>
      <p className="text-zinc-500">
        Selecione um formulário na barra lateral para visualizar as respostas.
      </p>
    </div>
  )
}
