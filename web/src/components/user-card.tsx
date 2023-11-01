import { user } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { deleteUser, type User } from "@/services/api"
import { Link, useSearchParams } from "react-router-dom"
import ConfirmationDialog from "./confirmation-dialog"
import toast from "react-hot-toast"
import { Trash2 } from "lucide-react"

interface UserCardProps extends User {
  refetch: () => void
}

export default function UserCard({ email, id, refetch }: UserCardProps) {
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
          <Trash2 className="h-5 w-5 text-zinc-400 transition-colors duration-200 ease-in-out hover:text-red-600" />
        </ConfirmationDialog>
      )}
    </Link>
  )
}
