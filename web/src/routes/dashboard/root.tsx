import { Outlet } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import NavbarDashboard from "../../components/navbar-dashboard"

const queryClient = new QueryClient()

export default function Root() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavbarDashboard />
        <Outlet />
      </QueryClientProvider>
    </>
  )
}
