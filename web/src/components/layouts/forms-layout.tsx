import { useEffect } from "react"
import { getForms } from "@/services/api"
import { useQuery } from "react-query"
import { Link, useSearchParams } from "react-router-dom"
import Button from "../button"
import { ChevronRight } from "lucide-react"
import FormList from "../form-list"
import { isUserAuthenticated } from "@/lib/auth"
import { FORMS_QUERY_STALE_TIME_IN_MS } from "@/constants/query"

export default function FormsLayout() {
  const [searchParams] = useSearchParams()

  const { isLoading, data, refetch } = useQuery("formsData", getForms, {
    refetchOnWindowFocus: false,
    staleTime: FORMS_QUERY_STALE_TIME_IN_MS,
    enabled: isUserAuthenticated(),
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

      <main className="flex flex-1 flex-col justify-between overflow-y-auto py-4 pr-2 sm:py-0">
        {selectedForm ? (
          <>
            <div className="space-y-2">
              <div>
                <h1 className="text-2xl font-bold text-zinc-700">
                  Formulário de: {selectedForm.name}
                </h1>
                <h2 className="text-zinc-400">Email: {selectedForm.email}</h2>
              </div>
              <p className="hyphens-auto text-zinc-500">
                {selectedForm.description}
              </p>
            </div>
            <div className="flex w-full justify-end py-4">
              <Button
                asChild
                className="flex w-fit items-center justify-center gap-2"
              >
                <Link to={`mailto:${selectedForm.email}`}>
                  Responder email <ChevronRight />
                </Link>
              </Button>
            </div>{" "}
          </>
        ) : (
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-zinc-700">
              Nenhum formulário selecionado
            </h1>
            <p className="text-zinc-500">
              Selecione um formulário na barra lateral para visualizar as
              respostas.
            </p>
          </div>
        )}
      </main>
    </section>
  )
}
