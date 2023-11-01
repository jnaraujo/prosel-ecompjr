import { cn } from "@/lib/utils"
import { FormResponse, deleteForm } from "@/services/api"
import { Link, useSearchParams } from "react-router-dom"
import ConfirmationDialog from "./confirmation-dialog"
import { Trash2 } from "lucide-react"

interface Props extends FormResponse {
  refetch: () => void
}

export default function FormCard({
  name,
  email,
  description,
  id,
  refetch,
}: Props) {
  const [searchParams] = useSearchParams()

  async function handleDeleteForm() {
    await deleteForm(id)
    refetch()
  }

  return (
    <Link
      to={{ search: `?formId=${id}` }}
      className={cn(
        "block cursor-pointer rounded-md border border-zinc-300 p-3 transition-colors duration-200 ease-in-out hover:border-zinc-400",
        {
          "border-brand-blue": String(id) === searchParams.get("formId"),
        },
      )}
    >
      <div className="flex w-full items-center justify-between">
        <strong className="line-clamp-1 text-base font-semibold text-zinc-500">
          {name} - {email}
        </strong>

        <ConfirmationDialog
          title="Tem certeza que deseja excluir este formulário?"
          description="Esta ação não pode ser desfeita."
          confirmText="Excluir formulário"
          cancelText="Cancelar"
          onConfirm={handleDeleteForm}
        >
          <Trash2 className="h-5 w-5 text-zinc-400 transition-colors duration-200 ease-in-out hover:text-red-600" />
        </ConfirmationDialog>
      </div>
      <p className="line-clamp-3 text-zinc-400">{description}</p>
    </Link>
  )
}
