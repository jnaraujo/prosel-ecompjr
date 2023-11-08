import { user } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { type User } from "@/services/api"
import { ChevronDown, ChevronUp, Plus, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import UserCardSkeleton from "./skeletons/user-card-skeleton"
import UserCard from "./user-card"
import { ScrollArea } from "./ui/scroll-area"

interface Props {
  users: User[]
  isLoading?: boolean
  refetch: () => void
}

export default function UserList({ users, isLoading, refetch }: Props) {
  const [isSideOpen, setIsSideOpen] = useState(false)
  const authUserEmail = user()?.sub
  const [searchParams] = useSearchParams()
  const userId = searchParams.get("userId")

  const isCreatingNewUser =
    !searchParams.get("userId") || searchParams.get("userId") === "new"

  const sortedUsers = users
    .sort((a, b) => {
      if (a.email === authUserEmail) return -1
      if (b.email === authUserEmail) return 1

      return a.email.localeCompare(b.email)
    })
    .map(({ id, ...user }) => {
      return {
        id: String(id),
        ...user,
      }
    })

  useEffect(() => {
    if (userId) {
      setIsSideOpen(false)
    }
  }, [userId])

  return (
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
        className={cn("hidden", {
          "fixed inset-0 z-10 flex flex-col bg-zinc-50 sm:hidden": isSideOpen,
        })}
      >
        <div className="flex items-center justify-between p-2 py-4">
          <h2 className="text-lg font-semibold text-zinc-600">Usuários</h2>
          <button onClick={() => setIsSideOpen(false)}>
            <X />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-auto px-2 pb-2">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <UserCardSkeleton key={i} />
            ))}

          {sortedUsers.map((user) => (
            <UserCard
              key={user.id}
              created_at={user.created_at}
              email={user.email}
              id={user.id}
              refetch={refetch}
              isUserSelected={user.id === userId}
            />
          ))}
        </div>
      </div>

      <ScrollArea className="hidden flex-1 sm:block">
        <div className="space-y-4 pr-3">
          <Link
            to={{ search: `?userId=new` }}
            className={cn(
              "flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-green-500 p-3 text-green-600 transition-colors duration-200 ease-in-out hover:border-green-600",
              {
                "bg-green-50": isCreatingNewUser,
              },
            )}
          >
            Criar novo usuário <Plus />
          </Link>

          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <UserCardSkeleton key={i} />
            ))}

          {sortedUsers.map((user) => (
            <UserCard
              key={user.id}
              created_at={user.created_at}
              email={user.email}
              id={user.id}
              refetch={refetch}
              isUserSelected={user.id === userId}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
