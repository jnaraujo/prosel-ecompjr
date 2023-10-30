import toast from "react-hot-toast"
import Button from "./button"
import { createForm } from "../services/api"
import { formSchema } from "../schemas/form-schema"
import { ValiError, parse } from "valibot"
import { useState } from "react"

export default function Form() {
  const [isSending, setIsSending] = useState(false)

  async function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSending(true)
    try {
      const form = parse(formSchema, {
        name: e.currentTarget.username.value,
        email: e.currentTarget.email.value,
        description: e.currentTarget.message.value,
      })

      await createForm(form)

      toast.success("Mensagem enviada com sucesso!")

      // @ts-ignore
      e.target.reset()
    } catch (error) {
      console.log(error)

      if (error instanceof ValiError) {
        toast.error(error.message)
        return
      }

      toast.error("Erro ao enviar mensagem.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <form onSubmit={submitMessage} className="flex flex-col space-y-2">
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm text-zinc-600">
          Nome: <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="username"
          className="w-full rounded-md border border-gray-300 p-2 placeholder-gray-400 outline-none focus:border-brand-blue"
          type="text"
          placeholder="João da Silva"
          required
        />
      </div>

      <div>
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

      <div>
        <label htmlFor="message" className="text-sm text-zinc-600">
          Mensagem: <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          className="w-full resize-none rounded-md border border-gray-300 p-2 placeholder-gray-400 outline-none focus:border-brand-blue"
          cols={30}
          rows={7}
          placeholder="Ex: Olá, gostaria de um orçamento para..."
          required
        ></textarea>
      </div>
      <Button type="submit" disabled={isSending}>
        {isSending ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  )
}
