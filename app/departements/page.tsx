import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllDepartments } from "@/lib/database"
import Link from "next/link"
import {Metadata} from "next";

interface DepartementsPageProps {
  searchParams: { page?: string }
}
export const metadata: Metadata = {
  title: "Départements de France - Couvreurs",
  description: "Trouvez des couvreurs qualifiés par département partout en France.",
  alternates: {
    canonical: "https://www.couvreur-groupefrance.com/departements",
  },
}
export default async function DepartementsPage({ searchParams }: DepartementsPageProps) {
  // On récupère TOUS les départements d'un coup (pas de pagination)
  const { departments: allDepartments, total } = await getAllDepartments(1, 100)

  // Grouper les départements par tranche
  const groupDepartmentsByRange = (depts: any[]) => {
    const groups: { [key: string]: any[] } = {}

    depts.forEach(dept => {
      const code = parseInt(dept.code)
      let range = ''

      if (code <= 20) range = '01-20'
      else if (code <= 40) range = '21-40'
      else if (code <= 60) range = '41-60'
      else if (code <= 80) range = '61-80'
      else if (code <= 95) range = '81-95'
      else range = '96+'

      if (!groups[range]) groups[range] = []
      groups[range].push(dept)
    })

    // Trier chaque groupe par code
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => a.code.localeCompare(b.code))
    })

    return groups
  }

  const groupedDepartments = groupDepartmentsByRange(allDepartments)
  const rangeOrder = ['01-20', '21-40', '41-60', '61-80', '81-95', '96+']

  return (
      <div className="min-h-screen">
        <Header />
        <main>
          <section className="py-6 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-6">
                <h1 className="font-serif font-bold text-2xl lg:text-3xl text-slate-900 mb-2">
                  Départements de France
                </h1>
                <p className="text-sm text-slate-600 mb-1">
                  Couvreurs qualifiés par département
                </p>
                <div className="text-xs text-slate-500">
                  {total} départements
                </div>
              </div>

              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {rangeOrder.map(range => {
                    if (!groupedDepartments[range]) return null

                    return (
                        <div key={range} className="bg-white rounded-lg shadow-sm border border-slate-200">
                          <div className="bg-amber-600 text-white px-3 py-2 rounded-t-lg">
                            <div className="flex items-center justify-between">
                              <h2 className="font-semibold text-sm">
                                {range}
                              </h2>
                              <span className="text-amber-100 text-xs">
                            {groupedDepartments[range].length}
                          </span>
                            </div>
                          </div>

                          <div className="p-2">
                            <div className="grid grid-cols-1 gap-px">
                              {groupedDepartments[range].map((dept) => (
                                  <Link key={dept.id} href={`/departement/${dept.slug}`}>
                                    <div className="flex items-center justify-between px-2 py-1.5 hover:bg-slate-50 rounded transition-colors group cursor-pointer">
                                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                                  <span className="flex-shrink-0 w-7 h-5 bg-amber-50 rounded text-amber-700 font-mono text-xs font-semibold flex items-center justify-center group-hover:bg-amber-100">
                                    {dept.code}
                                  </span>
                                        <span className="font-medium text-xs text-slate-900 group-hover:text-amber-700 truncate">
                                    {dept.name}
                                  </span>
                                      </div>
                                      <svg className="w-3 h-3 text-slate-400 group-hover:text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </div>
                                  </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
  )
}