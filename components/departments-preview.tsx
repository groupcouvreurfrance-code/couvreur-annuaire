import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const popularDepartments = [
  { name: "Paris", code: "75", slug: "paris", artisanCount: 156 },
  { name: "Nord", code: "59", slug: "nord", artisanCount: 89 },
  { name: "Rhône", code: "69", slug: "rhone", artisanCount: 124 },
  { name: "Bouches-du-Rhône", code: "13", slug: "bouches-du-rhone", artisanCount: 98 },
  { name: "Loire-Atlantique", code: "44", slug: "loire-atlantique", artisanCount: 76 },
  { name: "Gironde", code: "33", slug: "gironde", artisanCount: 82 },
]

export function DepartmentsPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-3xl lg:text-4xl text-slate-900 mb-4">Couvreurs par Département</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Découvrez les artisans couvreurs qualifiés dans votre département
          </p>
        </div>

        <div className="text-center">
          <Link href="/departements">
            <Button
              variant="outline"
              size="lg"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
            >
              Voir tous les départements
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
