import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar"

export default function Root() {
  return (
    <>
      <Navbar />
      <main className="container min-h-screen">
        <Outlet />
      </main>
    </>
  )
}
