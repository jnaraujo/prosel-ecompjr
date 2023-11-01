import { useEffect } from "react"
import { FormResponse, getForms } from "@/services/api"
import { useQuery } from "react-query"
import { Link, useSearchParams } from "react-router-dom"
import Button from "../button"
import { ChevronRight } from "lucide-react"
import cookies from "js-cookie"
import FormList from "../form-list"

export default function FormsLayout() {
  const [searchParams] = useSearchParams()

  const { isLoading, data, refetch } = useQuery("formsData", getForms, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!cookies.get("token"),
  })

  useEffect(() => {
    document.title = "Dashboard | EcompJr"
  }, [])

  const selectedForm = (data || []).find(
    (form) => String(form.id) === searchParams.get("formId"),
  )

  return (
    <section className="container flex flex-1 flex-col sm:h-[93svh] sm:flex-row sm:gap-8">
      <aside className="flex flex-1 flex-col gap-2 overflow-hidden sm:max-w-[300px] sm:flex-1">
        <FormList forms={data || []} refetch={refetch} isLoading={isLoading} />
      </aside>

      <main className="flex flex-1 flex-col justify-between py-4 sm:py-0">
        {selectedForm ? <Form {...selectedForm} /> : <FormNotFound />}
      </main>
    </section>
  )
}

function Form({ name, email, description }: FormResponse) {
  return (
    <>
      <div className="space-y-2">
        <div>
          <h1 className="text-2xl font-bold text-zinc-700">
            Formulário de: {name}
          </h1>
          <h2 className="text-zinc-400">Email: {email}</h2>
        </div>
        <p className="break-all text-zinc-500">{description}</p>
      </div>

      <div className="flex w-full justify-end py-4">
        <Button
          asChild
          className="flex w-fit items-center justify-center gap-2"
        >
          <Link to={`mailto:${email}`}>
            Responder email <ChevronRight />
          </Link>
        </Button>
      </div>
    </>
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
