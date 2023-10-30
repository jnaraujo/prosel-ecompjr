import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "../components/navbar"
import ScrollToHashElement from "../components/scroll-to-hash-element"
import Footer from "../components/footer"

export default function Root() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />

      <ScrollToHashElement />
      <Toaster
        toastOptions={{
          duration: 5000,
          style: {
            fontFamily: "var(--font-inter)",
          },
        }}
        position="top-center"
      />
    </>
  )
}
