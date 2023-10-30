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
