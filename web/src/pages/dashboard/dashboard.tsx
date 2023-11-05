import { useEffect } from "react"
import { isUserAuthenticated } from "@/lib/auth"
import { Link, defer, useSearchParams } from "react-router-dom"
import { getForms } from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import { FORMS_QUERY_STALE_TIME_IN_MS } from "@/constants/query"
import FormList from "@/components/form-list"
import Button from "@/components/button"
import { ChevronRight } from "lucide-react"
import { queryClient } from "./root"

export default function Dashboard() {
  const [searchParams] = useSearchParams()

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["formsData"],
    queryFn: getForms,
    refetchOnWindowFocus: false,
    enabled: isUserAuthenticated(),
    refetchInterval: FORMS_QUERY_STALE_TIME_IN_MS,
    staleTime: FORMS_QUERY_STALE_TIME_IN_MS,
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

export async function loader() {
  const data = queryClient.fetchQuery({
    queryKey: ["formsData"],
    queryFn: getForms,
    staleTime: FORMS_QUERY_STALE_TIME_IN_MS,
  })

  return defer({ data })
}
