import { Outlet } from "react-router-dom"

export default function Root() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <Outlet />
    </main>
  )
}
