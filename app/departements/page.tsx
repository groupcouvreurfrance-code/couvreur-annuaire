import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllDepartments } from "@/lib/database"
import Link from "next/link"
import { MapPin, ChevronRight } from "lucide-react"

interface DepartementsPageProps {
  searchParams: { page?: string }
}

export default async function DepartementsPage({ searchParams }: DepartementsPageProps) {
  // On récupère TOUS les départements d'un coup (pas de pagination)
  const { departments: allDepartments, total } = await getAllDepartments(1, 100) // ou une grande limite

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
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h1 className="font-serif font-bold text-4xl lg:text-5xl text-slate-900 mb-4">
                  Tous les Départements
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Trouvez des couvreurs qualifiés dans tous les départements de France
                </p>
                <div className="mt-6 text-sm text-slate-500">
                  {total} départements disponibles
                </div>
              </div>

              <div className="max-w-6xl mx-auto">
                {rangeOrder.map(range => {
                  if (!groupedDepartments[range]) return null

                  return (
                      <div key={range} className="mb-10">
                        <div className="flex items-center mb-6">
                          <h2 className="font-serif font-semibold text-2xl text-slate-800 mr-4">
                            Départements {range}
                          </h2>
                          <div className="flex-1 h-px bg-slate-300"></div>
                          <span className="ml-4 text-sm text-slate-500 bg-slate-200 px-3 py-1 rounded-full">
                        {groupedDepartments[range].length} dép.
                      </span>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                          {groupedDepartments[range].map((dept, index) => (
                              <Link key={dept.id} href={`/departement/${dept.slug}`}>
                                <div className={`
                            flex items-center justify-between p-4 hover:bg-slate-50 transition-colors duration-150
                            ${index !== groupedDepartments[range].length - 1 ? 'border-b border-slate-100' : ''}
                            group cursor-pointer
                          `}>
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center justify-center w-12 h-12 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                                <span className="text-emerald-700 font-mono font-semibold text-sm">
                                  {dept.code}
                                </span>
                                    </div>
                                    <div>
                                      <h3 className="font-serif font-semibold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">
                                        {dept.name}
                                      </h3>
                                      <div className="flex items-center text-slate-500 text-sm mt-1">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        <span className="font-mono text-xs mr-2">/{dept.slug}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                                </div>
                              </Link>
                          ))}
                        </div>
                      </div>
                  )
                })}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
  )
}