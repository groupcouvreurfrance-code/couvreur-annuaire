import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Phone, MapPin, Mail } from "lucide-react"

export function Header() {
  return (
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl text-slate-900">couvreur-groupefrance</span>
          </Link>

          {/* Navigation principale */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
                href="/"
                className="text-slate-700 hover:text-emerald-600 transition-colors font-medium py-2 px-1 relative group"
            >
              Accueil
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link
                href="/departements"
                className="text-slate-700 hover:text-emerald-600 transition-colors font-medium py-2 px-1 relative group"
            >
              Départements
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Call to action */}
            <div className="hidden lg:flex items-center space-x-3 text-sm">
              <div className="flex items-center text-slate-600">
                <Phone className="h-4 w-4 mr-1.5" />
                <span className="font-medium">07 56 83 09 51</span>
              </div>
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="flex items-center text-slate-600">
                <MapPin className="h-4 w-4 mr-1.5" />
                <span>France entière</span>
              </div>
            </div>

            {/* Bouton Contact */}
            <Button
                asChild
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <a
                  href="mailto:groupcouvreurfrance@gmail.com?subject=Demande de contact&body=Bonjour,%0D%0A%0D%0AJe souhaiterais obtenir des informations concernant vos services de couverture.%0D%0A%0D%0ACordialement"
                  className="flex items-center space-x-2"
              >
                <Mail className="h-4 w-4" />

              </a>
            </Button>
          </div>
        </div>
      </header>
  )
}