import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar"
import ScrollToHashElement from "../components/scroll-to-hash-element"

export default function Root() {
  return (
    <>
      <ScrollToHashElement />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </>
  )
}
