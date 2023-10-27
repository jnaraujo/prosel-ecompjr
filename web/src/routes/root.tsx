import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar"

export default function Root() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </>
  )
}
