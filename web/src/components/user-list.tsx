import { cn } from "@/lib/utils"
import { type User } from "@/services/api"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

interface Props {
  users: User[]
  isLoading?: boolean
}

export default function UserList({ users, isLoading }: Props) {
  const [isSideOpen, setIsSideOpen] = useState(false)

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
            className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-green-500 p-3 text-green-600 transition-colors duration-200 ease-in-out hover:border-green-600"
          >
            Criar novo usuário <Plus />
          </Link>

          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}

          {users.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </ul>
      </div>
    </div>
  )
}

function CardSkeleton() {
  const widths = ["w-1/2", "w-2/4", "w-3/4", "w-1/3", "w-2/3"]
  const randomWidth = widths[Math.floor(Math.random() * widths.length)]
  return (
    <div className="animate-pulse space-y-2 rounded-md border border-zinc-300 p-4">
      <div className={`h-4 rounded-md bg-zinc-200 ${randomWidth}`} />
    </div>
  )
}

function UserCard({ email, id }: User) {
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
