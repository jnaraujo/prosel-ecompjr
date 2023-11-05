import Button from "@/components/button"
import { updateUserSchema } from "@/schemas/user-schema"
import { updateUser } from "@/services/api"
import { useEffect, useState } from "react"
import { ValiError, parse } from "valibot"
import toast from "react-hot-toast"

interface Props {
  user: {
    id: number
    email: string
  }
  refetch: () => void
}

export default function UpdateUserForm({
  user: { id, email },
  refetch,
}: Props) {
  const [isSending, setIsSending] = useState(false)

  const [emailField, setEmailField] = useState(email)
  const [passwordField, setPasswordField] = useState("")

  useEffect(() => {
    setEmailField(email)
  }, [id, email])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsSending(true)
    try {
      const password = event.currentTarget.password.value

      const form = parse(updateUserSchema, {
        email: emailField,
        password: password ? password : undefined,
      })

      const data = await updateUser(id, form)
      const json = await data.json()

      if (!data.ok) {
        toast.error(errorToMessage(json.detail))
        return
      }

      toast.success("Usuário atualizado com sucesso.")
      refetch()
    } catch (error) {
      if (error instanceof ValiError) {
        toast.error(error.message)
        return
      }

      toast.error("Ocorreu um erro ao atualizar o usuário.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col space-y-3"
      autoComplete="off"
    >
      <h1 className="text-start text-xl font-semibold text-zinc-700">
        Atualizar o perfil de "{email}"
      </h1>

      <label className="space-y-1">
        <span className="text-sm text-zinc-600">
          Email: <span className="text-red-500">*</span>
        </span>
        <input
          name="email"
          className="w-full rounded-md border border-gray-300 p-2 placeholder-gray-400 outline-none focus:border-brand-blue"
          type="email"
          placeholder="Ex: john@exemplo.com"
          value={emailField}
          onChange={(event) => setEmailField(event.target.value)}
          required
        />
      </label>

      <label className="space-y-1">
        <span className="text-sm text-zinc-600">Nova senha:</span>
        <input
          id="password"
          name="password"
          className="w-full rounded-md border border-gray-300 p-2 placeholder-gray-400 outline-none focus:border-brand-blue"
          type="password"
          placeholder="********"
          autoComplete="new-password"
          value={passwordField}
          onChange={(event) => setPasswordField(event.target.value)}
        />
      </label>

      <Button type="submit" isLoading={isSending}>
        {isSending ? "Atualizando..." : "Atualizar usuário"}
      </Button>
    </form>
  )
}

function errorToMessage(error: string) {
  switch (error) {
    case "Email already exists":
      return "O e-mail já está cadastrado."
    default:
      return "Ocorreu um erro inesperado."
  }
}
