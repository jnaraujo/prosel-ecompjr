import { Outlet, useLocation, useNavigate } from "react-router-dom"
import NavbarDashboard from "../../components/navbar-dashboard"
import { useEffect } from "react"
import { isUserAuthenticated } from "@/lib/auth"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const queryClient = new QueryClient()

export default function Root() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate("/login")
    }
  }, [navigate, location])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavbarDashboard />
        <Outlet />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
