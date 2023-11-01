import cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

export function logout() {
  cookies.remove("token")
}

export function saveToken(jwt: string) {
  cookies.set("token", jwt)
}

export function token() {
  return cookies.get("token")
}

export function user() {
  const token = cookies.get("token")

  if (token === undefined) {
    return null
  }

  const jwt = jwtDecode(token)

  if (!jwt.exp || jwt.exp < Date.now() / 1000) {
    logout()
    return null
  }

  return jwt
}

export function isUserAuthenticated() {
  return user() !== null
}
