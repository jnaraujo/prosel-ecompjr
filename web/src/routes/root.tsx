import { Outlet } from "react-router-dom"

export default function Root() {
  return (
      <main className="container min-h-screen">
        <Outlet />
      </main>
    <main className="min-h-screen bg-zinc-50">
      <Outlet />
    </main>
  )
}
