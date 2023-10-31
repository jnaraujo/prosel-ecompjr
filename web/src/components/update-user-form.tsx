import Button from "@/components/button"
import { userSchema } from "@/schemas/user-schema"
import { findAllUsers, updateUser } from "@/services/api"
import { useEffect, useState } from "react"
import { ValiError, parse } from "valibot"
import toast from "react-hot-toast"
import { useQuery } from "react-query"

interface Props {
  user: {
    id: number
    email: string
  }
}

export default function UpdateUserForm({ user: { id, email } }: Props) {
  const [isSending, setIsSending] = useState(false)

  const [emailField, setEmailField] = useState(email)
  const [passwordField, setPasswordField] = useState("")

  const { refetch } = useQuery("usersData", findAllUsers, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  useEffect(() => {
    setEmailField(email)
  }, [id, email])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsSending(true)
    try {
      const form = parse(userSchema, {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
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
        Atualize um administrador
      </h1>

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm text-zinc-600">
          Email: <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          className="w-full rounded-md border border-gray-300 p-2 placeholder-gray-400 outline-none focus:border-brand-blue"
          type="email"
          placeholder="Ex: john@exemplo.com"
          value={emailField}
          onChange={(event) => setEmailField(event.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm text-zinc-600">
          Nova senha:
        </label>
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
      </div>

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
