"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Phone, MapPin, Mail, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          {/* Main header row */}
          <div className="flex h-20 md:h-24 items-center justify-between py-2 md:py-4">
            {/* Logo - Très grand partout */}
            <Link href="/" className="flex items-center space-x-2 md:space-x-3 group flex-shrink-0">
              <div className="h-20 w-20 md:h-20 md:w-20 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                <img
                    src="/og-image.png"
                    alt="Couvreur Groupe France"
                    className="w-16 h-16 md:w-16 md:h-16 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col justify-center">
              <span className="font-bold text-sm md:text-xl text-slate-900 transition-colors duration-300 group-hover:text-amber-600 leading-tight">
                Couvreur Groupe
              </span>
                <span className="text-xs text-amber-600 font-medium -mt-0.5 md:hidden">
                France
              </span>
                <span className="hidden md:inline font-bold text-xl text-slate-900 transition-colors duration-300 group-hover:text-amber-600 -mt-1">
                France
              </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                  href="/"
                  className="text-slate-700 hover:text-amber-600 transition-colors font-medium py-2 px-1 relative group"
              >
                Accueil
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                  href="/departements"
                  className="text-slate-700 hover:text-amber-600 transition-colors font-medium py-2 px-1 relative group"
              >
                Départements
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Desktop Contact Info */}
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

            {/* Right side actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Contact Button */}
              <Button
                  asChild
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-3 md:px-4"
              >
                <a
                    href="mailto:groupcouvreurfrance@gmail.com?subject=Demande de contact&body=Bonjour,%0D%0A%0D%0AJe souhaiterais obtenir des informations concernant vos services de couverture.%0D%0A%0D%0ACordialement"
                    className="flex items-center space-x-1 md:space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm">Contact</span>
                </a>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                    <X className="h-5 w-5 text-slate-700" />
                ) : (
                    <Menu className="h-5 w-5 text-slate-700" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Contact Info Bar */}
          <div className="md:hidden border-t border-slate-100 py-2">
            <div className="flex items-center justify-center space-x-4 text-xs">
              <div className="flex items-center text-slate-600">
                <Phone className="h-3 w-3 mr-1" />
                <span className="font-medium">07 56 83 09 51</span>
              </div>
              <div className="w-px h-3 bg-slate-300"></div>
              <div className="flex items-center text-slate-600">
                <MapPin className="h-3 w-3 mr-1" />
                <span>France entière</span>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
              <div className="md:hidden border-t border-slate-100 py-4 space-y-2">
                <Link
                    href="/"
                    className="block px-4 py-2 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link
                    href="/departements"
                    className="block px-4 py-2 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                >
                  Départements
                </Link>
              </div>
          )}
        </div>
      </header>
  )
}