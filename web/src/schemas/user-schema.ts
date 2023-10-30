import { object, string, email } from "valibot"

export const userSchema = object({
  email: string([email("Insira um e-mail válido")]),
  password: string("Insira uma senha válida"),
})
