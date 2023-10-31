import { Outlet, useNavigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import NavbarDashboard from "../../components/navbar-dashboard"
import { useEffect } from "react"
import cookies from "js-cookie"

const queryClient = new QueryClient()

export default function Root() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Dashboard | EcompJr"

    if (!cookies.get("token")) {
      navigate("/login")
    }
  }, [navigate])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavbarDashboard />
        <Outlet />
      </QueryClientProvider>
    </>
  )
}
