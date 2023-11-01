import { Link } from "react-router-dom"
import logo from "../assets/logo.webp"
import Button from "./button"

export default function Navbar() {
  return (
    <nav className="container flex items-center justify-between py-2">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          width={128}
          height={40}
          className="h-9 object-contain md:h-10"
        />
      </Link>

      <Button asChild className="w-fit py-1" variant="outline">
        <Link to="/login">Login</Link>
      </Button>
    </nav>
  )
}
