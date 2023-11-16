import { user } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { deleteUser, type User } from "@/services/api"
import { Link } from "react-router-dom"
import ConfirmationDialog from "./confirmation-dialog"
import toast from "react-hot-toast"
import { Trash2 } from "lucide-react"

interface UserCardProps extends User {
  refetch: () => void
  isUserSelected: boolean
}

export default function UserCard({
  email,
  id,
  refetch,
  isUserSelected,
}: UserCardProps) {
  const authUserEmail = user()?.sub
  const isAuthenticatedUser = authUserEmail === email

  return (
    <Link
      to={{ search: `?userId=${id}` }}
      className={cn(
        "flex cursor-pointer items-center justify-between rounded-md border border-zinc-300 p-3 transition-colors duration-200 ease-in-out hover:border-zinc-400",
        {
          "bg-brand-blue hover:border-sky-700": isUserSelected,
        },
      )}
    >
      <strong
        className={cn("text-base font-medium text-zinc-500", {
          "text-zinc-100": isUserSelected,
        })}
      >
        {email}
      </strong>

      {isAuthenticatedUser ? (
        <span
          className={cn("text-xs font-medium text-zinc-400", {
            "text-zinc-100": isUserSelected,
          })}
        >
          (Você)
        </span>
      ) : (
        <ConfirmationDialog
          title="Tem certeza que deseja excluir este usuário?"
          description="Esta ação não pode ser desfeita."
          confirmText="Excluir usuário"
          cancelText="Cancelar"
          onConfirm={() => {
            deleteUser(id)
              .then((res) => {
                if (!res.ok) {
                  throw new Error("Não foi possível excluir o usuário.")
                }
                return res.json()
              })
              .then(() => {
                toast.success("Usuário excluído com sucesso.")
                refetch()
              })
              .catch(() => {
                toast.error("Não foi possível excluir o usuário.")
              })
          }}
        >
          <Trash2
            className={cn(
              "h-5 w-5 text-zinc-400 transition-colors duration-200 ease-in-out hover:text-red-600",
              {
                "text-zinc-100 hover:text-red-500": isUserSelected,
              },
            )}
          />
        </ConfirmationDialog>
      )}
    </Link>
  )
}
