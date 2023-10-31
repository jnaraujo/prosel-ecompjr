import { Link, useNavigate } from "react-router-dom"
import logo from "@/assets/logo.webp"
import cookies from "js-cookie"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"

export default function NavbarDashboard() {
  const navigate = useNavigate()

  function handleLogout() {
    cookies.remove("token")
    navigate("/login")
  }

  return (
    <nav className="container flex items-center justify-between py-2">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          width={128}
          height={44}
          className="-ml-[5px] h-9 object-contain md:h-10"
        />
      </Link>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-700 text-zinc-700">
            <User size={24} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Sua conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard">Formulários</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/create-user">Criar usuário</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
