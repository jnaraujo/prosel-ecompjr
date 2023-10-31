import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import ScrollToHashElement from "@/components/scroll-to-hash-element"

export default function Root() {
  return (
    <>
      <Outlet />
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
