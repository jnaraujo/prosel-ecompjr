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
