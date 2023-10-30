import { object, string, email } from "valibot"

export const formSchema = object({
  name: string("Insira um nome válido"),
  email: string([email("Insira um e-mail válido")]),
  description: string("Insira uma descrição válida"),
})
