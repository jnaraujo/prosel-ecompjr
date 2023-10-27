import { Link } from "react-router-dom"
import logo from "../assets/logo.webp"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
export default function Footer() {
  return (
    <footer className="container space-y-4 border-t border-zinc-300 py-6 text-center">
      <div className="flex justify-center gap-8">
        <Link
          to="https://twitter.com/EcompJr"
          target="_blank"
          aria-label="Twitter"
        >
          <Twitter className="h-6 w-6 text-brand-blue transition-all duration-200 ease-in-out hover:scale-110 hover:text-sky-700" />
        </Link>

        <Link
          to="https://www.facebook.com/ecompjr.uefs/"
          target="_blank"
          aria-label="Facebook"
        >
          <Facebook className="h-6 w-6 text-brand-blue transition-all duration-200 ease-in-out hover:scale-110 hover:text-sky-700" />
        </Link>

        <Link
          to="https://www.instagram.com/ecompjr/"
          target="_blank"
          aria-label="Instagram"
        >
          <Instagram className="h-6 w-6 text-brand-blue transition-all duration-200 ease-in-out hover:scale-110 hover:text-sky-700" />
        </Link>

        <Link
          to="https://github.com/EcompJr"
          target="_blank"
          aria-label="Github"
        >
          <Linkedin className="h-6 w-6 text-brand-blue transition-all duration-200 ease-in-out hover:scale-110 hover:text-sky-700" />
        </Link>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-zinc-700">
          Copyright @ EcompJr - {new Date().getFullYear()}
        </p>

        <img
          src={logo}
          alt="EcompJr"
          className="mx-auto w-24"
          width={128}
          height={44}
        />
      </div>
    </footer>
  )
}
