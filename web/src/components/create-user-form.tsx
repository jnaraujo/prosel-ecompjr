import Button from "@/components/button"
import { userSchema } from "@/schemas/user-schema"
import { createUser } from "@/services/api"
import { useState } from "react"
import { ValiError, parse } from "valibot"
import toast from "react-hot-toast"

interface Props {
  refetch: () => void
}

export default function CreateUserForm({ refetch }: Props) {
  const [isSending, setIsSending] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsSending(true)
    try {
      const form = parse(userSchema, {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      })

      const data = await createUser(form)
      const json = await data.json()

      if (!data.ok) {
        toast.error(errorToMessage(json.detail))
        return
      }

      toast.success("Usuário criado com sucesso!")
      refetch()
    } catch (error) {
      if (error instanceof ValiError) {
        toast.error(error.message)
        return
      }

      toast.error("Ocorreu um erro ao criar o usuário.")
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
        Crie um novo administrador
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
          required
        />
      </label>

      <label className="space-y-1">
        <span className="text-sm text-zinc-600">
          Senha: <span className="text-red-500">*</span>
        </span>
        <input
          name="password"
          className="w-full rounded-md border border-gray-300 p-2 placeholder-gray-400 outline-none focus:border-brand-blue"
          type="password"
          placeholder="********"
          autoComplete="new-password"
          required
        />
      </label>

      <Button type="submit" isLoading={isSending}>
        {isSending ? "Criando..." : "Criar novo administrador"}
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
