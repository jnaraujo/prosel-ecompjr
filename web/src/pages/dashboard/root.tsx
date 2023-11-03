import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import NavbarDashboard from "../../components/navbar-dashboard"
import { useEffect } from "react"
import { isUserAuthenticated } from "@/lib/auth"

const queryClient = new QueryClient()

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
      </QueryClientProvider>
    </>
  )
}
