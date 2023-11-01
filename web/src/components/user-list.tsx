import { user } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { deleteUser, type User } from "@/services/api"
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import ConfirmationDialog from "./confirmation-dialog"
import toast from "react-hot-toast"

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

  const sorted = users.sort((a, b) => {
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
            Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}

          {sorted.map((user) => (
            <UserCard key={user.id} {...user} refetch={refetch} />
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

interface UserCardProps extends User {
  refetch: () => void
}

function UserCard({ email, id, refetch }: UserCardProps) {
  const [searchParams] = useSearchParams()
  const authUserEmail = user()?.sub

  const isAuthenticatedUser = authUserEmail === email

  return (
    <Link
      to={{ search: `?userId=${id}` }}
      className={cn(
        "flex cursor-pointer items-center justify-between rounded-md border border-zinc-300 p-3 transition-colors duration-200 ease-in-out hover:border-zinc-400",
        {
          "border-brand-blue": String(id) === searchParams.get("userId"),
        },
      )}
    >
      <strong className="text-base font-medium text-zinc-500">{email}</strong>

      {isAuthenticatedUser ? (
        <span className="text-xs font-medium text-zinc-400">(Você)</span>
      ) : (
        <ConfirmationDialog
          title="Tem certeza que deseja excluir este usuário?"
          description="Esta ação não pode ser desfeita."
          confirmText="Excluir usuário"
          cancelText="Cancelar"
          onConfirm={() => {
            deleteUser(id)
              .then((res) => res.json())
              .then((data) => {
                if (!data.ok) {
                  toast.error("Não foi possível excluir o usuário.")
                  return
                }
                toast.success("Usuário excluído com sucesso.")
                refetch()
              })
          }}
        >
          <Trash2 className="h-5 w-5 text-zinc-400 transition-colors duration-200 ease-in-out hover:text-red-600" />
        </ConfirmationDialog>
      )}
    </Link>
  )
}
