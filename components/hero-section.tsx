"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Shield, Users, Star } from "lucide-react"

export function HeroSection() {
  return (
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-24 lg:py-32 overflow-hidden">
        {/* Subtle background pattern */}
        <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            {/* Main heading */}
            <h1 className="font-serif font-bold text-5xl lg:text-7xl text-slate-900 mb-8 leading-tight">
              Trouvez le{" "}
              <span className="text-emerald-600">Couvreur</span>{" "}
              de Confiance
              <br />
              <span className="text-4xl lg:text-5xl text-slate-600">près de chez vous</span>
            </h1>

            <p className="text-xl text-slate-600 mb-16 max-w-3xl mx-auto leading-relaxed">
              Votre expert en couverture, pour des toits solides et durables.
              Découvrez les meilleurs artisans couvreurs de votre région.
            </p>


          </div>
        </div>
      </section>
  )
}