import CreateUserForm from "@/components/create-user-form"
import UpdateUserForm from "@/components/update-user-form"
import { cn } from "@/lib/utils"
import { User, findAllUsers } from "@/services/api"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Link, useSearchParams } from "react-router-dom"
import cookies from "js-cookie"

export default function Users() {
  const { isLoading, error, data } = useQuery("usersData", findAllUsers, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!cookies.get("token"),
  })

  const [isSideOpen, setIsSideOpen] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    document.title = "Usuários | EcompJr"
  }, [])

  useEffect(() => {
    if (!searchParams.get("userId")) {
      setSearchParams({ userId: "new" })
    }
  }, [setSearchParams, searchParams])

  if (isLoading) return null
  if (error) return <p>Erro ao carregar formulários.</p>

  const selectedUser = data?.find(
    (user) => String(user.id) === searchParams.get("userId"),
  )

  const createNewUser = searchParams.get("userId") === "new"

  return (
    <section className="container flex h-[94svh] flex-col sm:flex-row sm:gap-8">
      <aside className="flex flex-col gap-2 overflow-hidden sm:max-w-[300px] sm:flex-1">
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          <h2
            className="flex items-center justify-between text-lg font-semibold text-zinc-600"
            onClick={() => setIsSideOpen((prev) => !prev)}
          >
            Usuários{" "}
            <span className="sm:hidden">
              {isSideOpen ? <ChevronUp /> : <ChevronDown />}
            </span>
          </h2>

          <div
            className={cn("flex-1 space-y-4 overflow-y-auto pb-4", {
              "hidden sm:block": !isSideOpen,
            })}
          >
            <ul className="space-y-4 pr-1">
              <Link
                to={{ search: `?userId=new` }}
                className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-green-500 p-3 text-green-600 transition-colors duration-200 ease-in-out hover:border-green-600"
              >
                Criar novo usuário <Plus />
              </Link>

              {data?.map((user) => <UserBox key={user.id} {...user} />)}
            </ul>
          </div>
        </div>
      </aside>

      <main className="flex flex-1 justify-center py-4 sm:py-0">
        {createNewUser ? (
          <CreateUserForm />
        ) : (
          <UpdateUserForm
            user={{
              id: Number(searchParams.get("userId")),
              email: selectedUser?.email ?? "",
            }}
          />
        )}
      </main>
    </section>
  )
}

function UserBox({ email, id }: User) {
  const [searchParams] = useSearchParams()

  return (
    <Link
      to={{ search: `?userId=${id}` }}
      className={cn(
        "block cursor-pointer rounded-md border border-zinc-300 p-3 transition-colors duration-200 ease-in-out hover:border-zinc-400",
        {
          "border-brand-blue": String(id) === searchParams.get("userId"),
        },
      )}
    >
      <strong className="text-base font-medium text-zinc-500">{email}</strong>
    </Link>
  )
}
