import { token } from "@/lib/auth"

interface Form {
  name: string
  email: string
  description: string
}
export function createForm(form: Form) {
  return fetch(`${import.meta.env.VITE_API_URL}/forms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
}

export interface FormResponse {
  name: string
  email: string
  description: string
  id: string
  created_at: string
}

export async function getForms(): Promise<FormResponse[]> {
  return fetch(`${import.meta.env.VITE_API_URL}/forms`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  }).then((res) => res.json())
}

export function deleteForm(id: string) {
  return fetch(`${import.meta.env.VITE_API_URL}/forms/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  })
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
  return fetch(`${import.meta.env.VITE_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  }).then((res) => res.json())
}

export function updateUser(id: number, userLogin: UserLogin) {
  return fetch(`${import.meta.env.VITE_API_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify({
      ...userLogin,
      id,
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
