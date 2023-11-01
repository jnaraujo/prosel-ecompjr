import { object, string, email, minLength, optional } from "valibot"

export const userSchema = object({
  email: string([
    email("Insira um e-mail válido"),
    minLength(8, "O e-mail deve ter pelo menos 8 caracteres"),
  ]),
  password: string("Insira uma senha válida", [
    minLength(8, "A senha deve ter pelo menos 8 caracteres"),
  ]),
})

export const updateUserSchema = object({
  email: string([
    email("Insira um e-mail válido"),
    minLength(8, "O e-mail deve ter pelo menos 8 caracteres"),
  ]),
  password: optional(
    string("Insira uma senha válida", [
      minLength(8, "A senha deve ter pelo menos 8 caracteres"),
    ]),
  ),
})
