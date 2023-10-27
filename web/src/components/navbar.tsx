import logo from "../assets/logo.webp"

export default function Navbar() {
  return (
    <nav className="container flex items-center justify-start py-2">
      <img
        src={logo}
        alt="logo"
        width={128}
        height={44}
        className="h-12 object-contain"
      />
    </nav>
  )
}
