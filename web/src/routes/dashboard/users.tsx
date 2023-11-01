import CreateUserForm from "@/components/create-user-form"
import UpdateUserForm from "@/components/update-user-form"
import { findAllUsers } from "@/services/api"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { useSearchParams } from "react-router-dom"
import UserList from "@/components/user-list"
import { isUserAuthenticated } from "@/lib/auth"

export default function Users() {
  const { isLoading, data, refetch } = useQuery("usersData", findAllUsers, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: isUserAuthenticated(),
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
