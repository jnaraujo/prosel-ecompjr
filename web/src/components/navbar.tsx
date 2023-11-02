import { Link, useLocation } from "react-router-dom"
import logo from "../assets/logo.webp"
import Button from "./button"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const location = useLocation()

  const isOnLoginpage = location.pathname === "/login"

  return (
    <header
      className={cn("py-2", {
        "bg-blue-50": !isOnLoginpage,
      })}
    >
      <nav className="container flex items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            width={128}
            height={40}
            className="h-9 object-contain md:h-10"
          />
        </Link>

        {!isOnLoginpage && (
          <Button asChild className="w-fit py-1" variant="outline">
            <Link to="/login">Login</Link>
          </Button>
        )}
      </nav>
    </header>
  )
}
