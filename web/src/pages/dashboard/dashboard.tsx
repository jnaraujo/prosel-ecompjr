import { useEffect } from "react"
import FormsLayout from "@/components/layouts/forms-layout"

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard | EcompJr"
  }, [])
  return <FormsLayout />
}
