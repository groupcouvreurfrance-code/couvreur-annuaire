import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Shield, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif font-bold text-4xl lg:text-6xl text-slate-900 mb-6 leading-tight">
            Trouvez le Couvreur de Confiance près de chez Vous
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Votre expert en couverture, pour des toits solides et durables. Découvrez les meilleurs artisans couvreurs
            de votre région.
          </p>



          {/* Trust Indicators */}

        </div>
      </div>
    </section>
  )
}
