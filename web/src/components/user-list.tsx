import { user } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { type User } from "@/services/api"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import UserCardSkeleton from "./skeletons/user-card-skeleton"
import UserCard from "./user-card"

interface Props {
  users: User[]
  isLoading?: boolean
  refetch: () => void
}

export default function UserList({ users, isLoading, refetch }: Props) {
  const [isSideOpen, setIsSideOpen] = useState(false)
  const authUserEmail = user()?.sub
  const [searchParams] = useSearchParams()

  const isCreatingNewUser =
    !searchParams.get("userId") || searchParams.get("userId") === "new"

  const sortedUsers = users.sort((a, b) => {
    if (a.email === authUserEmail) return -1
    if (b.email === authUserEmail) return 1

    return a.email.localeCompare(b.email)
  })

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
        className={cn("flex-1 space-y-4 overflow-y-auto pb-4", {
          "hidden sm:block": !isSideOpen,
        })}
      >
        <ul className="space-y-4 pr-1">
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
            <UserCard key={user.id} {...user} refetch={refetch} />
          ))}
        </ul>
      </div>
    </div>
  )
}
