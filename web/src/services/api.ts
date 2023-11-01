import { token } from "@/lib/auth"

interface Form {
  name: string
  email: string
  description: string
}
export async function createForm(form: Form) {
  const data = await fetch(`${import.meta.env.VITE_API_URL}/forms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })

  if (!data.ok) {
    throw new Error("Não foi possível enviar o formulário")
  }

  return data.json()
}

export interface FormResponse {
  name: string
  email: string
  description: string
  id: string
  created_at: string
}

export async function getForms(): Promise<FormResponse[]> {
  const data = await fetch(`${import.meta.env.VITE_API_URL}/forms`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  })

  if (!data.ok) {
    throw new Error("Não foi possível listar os formulários")
  }

  return data.json()
}

export async function deleteForm(id: string) {
  const data = await fetch(`${import.meta.env.VITE_API_URL}/forms/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  })

  if (!data.ok) {
    throw new Error("Não foi possível deletar o formulário")
  }

  return data.json()
}

interface UserLogin {
  email: string
  password: string
}

export function login(userLogin: UserLogin) {
  return fetch(`${import.meta.env.VITE_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLogin),
  })
}

export function createUser(userLogin: UserLogin) {
  return fetch(`${import.meta.env.VITE_API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(userLogin),
  })
}

export interface User {
  id: string
  email: string
  created_at: string
}

export async function findAllUsers(): Promise<User[]> {
  const data = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  })

  if (!data.ok) {
    throw new Error("Não foi possível listar os usuários")
  }

  return data.json()
}

interface UserUpdate {
  email: string
  password?: string
}

export function updateUser(id: number, user: UserUpdate) {
  const { password, ...rest } = user

  return fetch(`${import.meta.env.VITE_API_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify({
      ...rest,
      id,
      ...(password ? { password } : {}),
    }),
  })
}

export function deleteUser(id: string) {
  return fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
  })
}
