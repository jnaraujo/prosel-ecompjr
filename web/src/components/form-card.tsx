import { cn } from "@/lib/utils"
import { FormResponse, deleteForm } from "@/services/api"
import { Link } from "react-router-dom"
import ConfirmationDialog from "./confirmation-dialog"
import { Trash2 } from "lucide-react"
import { memo } from "react"

interface Props extends FormResponse {
  refetch: () => void
  isFormSelected: boolean
}

function FormCard({
  name,
  email,
  description,
  id,
  refetch,
  isFormSelected,
}: Props) {
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
          "bg-brand-blue hover:border-sky-700": isFormSelected,
        },
      )}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <strong
          className={cn(
            "line-clamp-1 break-all text-base font-semibold text-zinc-500",
            {
              "text-zinc-100": isFormSelected,
            },
          )}
        >
          {name} - {email}
        </strong>

        <ConfirmationDialog
          title="Tem certeza que deseja excluir este formulário?"
          description="Esta ação não pode ser desfeita."
          confirmText="Excluir formulário"
          cancelText="Cancelar"
          onConfirm={handleDeleteForm}
        >
          <Trash2
            className={cn(
              "h-5 w-5 text-zinc-400 transition-colors duration-200 ease-in-out hover:text-red-600",
              {
                "text-zinc-100 hover:text-red-500": isFormSelected,
              },
            )}
          />
        </ConfirmationDialog>
      </div>
      <p
        className={cn("line-clamp-3 text-zinc-400", {
          "text-zinc-200": isFormSelected,
        })}
      >
        {description}
      </p>
    </Link>
  )
}

const MemoizedFormCard = memo(FormCard)
export default MemoizedFormCard
