import { useEffect, useState } from "react"
import Button from "../../components/button"
import { ValiError, parse } from "valibot"
import { userSchema } from "../../schemas/user-schema"
import { login } from "../../services/api"
import toast from "react-hot-toast"
import cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [isSending, setIsSending] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Login | EcompJr"
  }, [])

  async function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setIsSending(true)
    try {
      const form = parse(userSchema, {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      })

      const data = await login(form)
      const { token } = await data.json()

      if (!data.ok || !token) {
        toast.error("Usuário ou senha inválidos.")
        return
      }

      cookies.set("token", token)

      navigate("/dashboard")
    } catch (error) {
      if (error instanceof ValiError) {
        toast.error(error.message)
        return
      }

      toast.error("Erro ao fazer login.")
    } finally {
      setIsSending(false)
    }
  }
  return (
    <main className="container flex min-h-[78svh] flex-1 flex-col items-center justify-center">
      <form onSubmit={submitMessage} className="flex flex-col space-y-2">
        <h1 className="text-center text-xl font-semibold text-zinc-700">
          Faça seu login
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
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm text-zinc-600">
            Password: <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            name="password"
            className="w-full rounded-md border border-gray-300 p-2 placeholder-gray-400 outline-none focus:border-brand-blue"
            type="password"
            placeholder="********"
            required
          />
        </div>

        <Button type="submit" disabled={isSending}>
          {isSending ? "Processando..." : "Entrar"}
        </Button>
      </form>
    </main>
  )
}
