import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllDepartments } from "@/lib/database"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface DepartementsPageProps {
  searchParams: { page?: string }
}

export default async function DepartementsPage({ searchParams }: DepartementsPageProps) {
  const currentPage = Number(searchParams.page) || 1
  const { departments, total } = await getAllDepartments(currentPage)
  const totalPages = Math.ceil(total / 20)

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="font-serif font-bold text-4xl lg:text-5xl text-slate-900 mb-4">Tous les Départements</h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Trouvez des couvreurs qualifiés dans tous les départements de France
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {departments.map((dept) => (
                <Link key={dept.id} href={`/departement/${dept.slug}`}>
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-slate-200 hover:border-emerald-200 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-serif font-semibold text-lg text-slate-900">{dept.name}</h3>
                        <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded font-mono">
                          {dept.code}
                        </span>
                      </div>
                      <div className="flex items-center text-slate-600 text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Voir les couvreurs
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-8">
                {currentPage > 1 && (
                  <Link
                    href={`/departements?page=${currentPage - 1}`}
                    className="px-4 py-2 text-sm font-medium text-emerald-600 bg-white border border-emerald-300 rounded-md hover:bg-emerald-50"
                  >
                    Précédent
                  </Link>
                )}
                <span className="mx-4 text-sm text-slate-600">
                  Page {currentPage} sur {totalPages}
                </span>
                {currentPage < totalPages && (
                  <Link
                    href={`/departements?page=${currentPage + 1}`}
                    className="px-4 py-2 text-sm font-medium text-emerald-600 bg-white border border-emerald-300 rounded-md hover:bg-emerald-50"
                  >
                    Suivant
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
