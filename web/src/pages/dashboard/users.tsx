import CreateUserForm from "@/components/create-user-form"
import UpdateUserForm from "@/components/update-user-form"
import { findAllUsers } from "@/services/api"
import { useEffect } from "react"
import { defer, useSearchParams } from "react-router-dom"
import UserList from "@/components/user-list"
import { isUserAuthenticated } from "@/lib/auth"
import { USERS_QUERY_STALE_TIME_IN_MS } from "@/constants/query"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "./root"

export default function Users() {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: findAllUsers,
    refetchOnWindowFocus: false,
    enabled: isUserAuthenticated(),
    refetchInterval: USERS_QUERY_STALE_TIME_IN_MS,
    staleTime: USERS_QUERY_STALE_TIME_IN_MS,
  })

  const [searchParams] = useSearchParams()

  useEffect(() => {
    document.title = "Usuários | EcompJr"
  }, [])

  const selectedUser = data?.find(
    (user) => String(user.id) === searchParams.get("userId"),
  )

  const createNewUser = searchParams.get("userId") === "new"
  const showCreateUserForm = createNewUser || isLoading || !selectedUser

  return (
    <section className="container flex flex-1 flex-col sm:h-[93svh] sm:flex-row sm:gap-8">
      <aside className="flex flex-1 flex-col gap-2 overflow-hidden sm:max-w-[300px] sm:flex-1">
        <UserList refetch={refetch} users={data ?? []} isLoading={isLoading} />
      </aside>

      <main className="flex flex-1 justify-center py-4 sm:py-0">
        {showCreateUserForm ? (
          <CreateUserForm refetch={refetch} />
        ) : (
          <UpdateUserForm
            refetch={refetch}
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

export async function loader() {
  const data = queryClient.fetchQuery({
    queryKey: ["users"],
    queryFn: findAllUsers,
    staleTime: USERS_QUERY_STALE_TIME_IN_MS,
  })

  return defer({ data })
}
