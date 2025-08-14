import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArtisanCard } from "@/components/artisan-card"
import { ContactForm } from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import { getDepartmentBySlug, getCommunesByDepartment, getDepartmentArtisan } from "@/lib/database"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { MapPin, ChevronRight, Users, Building, ArrowLeft } from "lucide-react"

interface DepartmentPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: DepartmentPageProps): Promise<Metadata> {
  const department = await getDepartmentBySlug(params.slug)

  if (!department) {
    return {
      title: "Département non trouvé",
    }
  }

  const artisan = await getDepartmentArtisan(department.id)

  return {
    title: `Couvreur ${department.name} (${department.code}) - ${artisan ? artisan.companyName : "Service Professionnel"}`,
    description: `Couvreur professionnel dans le ${department.name} (${department.code}). ${artisan ? `${artisan.companyName} intervient` : "Service disponible"} dans toutes les communes du département. Devis gratuit.`,
    keywords: [
      `couvreur ${department.name}`,
      `couverture ${department.name}`,
      `toiture ${department.name}`,
      `artisan couvreur ${department.code}`,
      `réparation toit ${department.name}`,
      "devis gratuit",
      "professionnel certifié",
    ],
    openGraph: {
      title: `Couvreur ${department.name} (${department.code})`,
      description: `Service de couverture professionnel dans tout le ${department.name}.`,
      url: `/departement/${department.slug}`,
    },
    alternates: {
      canonical: `/departement/${department.slug}`,
    },
  }
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const department = await getDepartmentBySlug(params.slug)

  if (!department) {
    notFound()
  }

  // Récupérer TOUTES les communes d'un coup
  const [{ communes: allCommunes, total }, artisan] = await Promise.all([
    getCommunesByDepartment(department.code, 1, 9999), // Grande limite pour tout récupérer
    getDepartmentArtisan(department.id),
  ])

  // Grouper les communes par première lettre
  const groupCommunesByLetter = (communes: any[]) => {
    const groups: { [key: string]: any[] } = {}

    communes.forEach(commune => {
      const firstLetter = commune.name.charAt(0).toUpperCase()
      if (!groups[firstLetter]) groups[firstLetter] = []
      groups[firstLetter].push(commune)
    })

    // Trier chaque groupe alphabétiquement
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => a.name.localeCompare(b.name))
    })

    return groups
  }

  const groupedCommunes = groupCommunesByLetter(allCommunes)
  const letters = Object.keys(groupedCommunes).sort()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: artisan ? artisan.companyName : `Couvreur ${department.name}`,
    description: `Service de couverture professionnel dans le ${department.name} (${department.code})`,
    url: `https://couvreursfrance.vercel.app/departement/${department.slug}`,
    areaServed: {
      "@type": "AdministrativeArea",
      name: department.name,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: "https://couvreursfrance.vercel.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Départements",
          item: "https://couvreursfrance.vercel.app/departements",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: department.name,
          item: `https://couvreursfrance.vercel.app/departement/${department.slug}`,
        },
      ],
    },
  }

  return (
      <div className="min-h-screen">
        <Header />
        <main>
          {/* Breadcrumb */}
          <section className="py-3 bg-white border-b border-slate-200">
            <div className="container mx-auto px-4">
              <div className="flex items-center text-sm">
                <Link href="/" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  Accueil
                </Link>
                <span className="mx-2 text-slate-400">/</span>
                <Link href="/departements" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  Départements
                </Link>
                <span className="mx-2 text-slate-400">/</span>
                <span className="text-slate-900 font-medium">{department.name}</span>
              </div>
            </div>
          </section>

          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <Link
                    href="/departements"
                    className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Tous les départements
                </Link>

                <div className="flex items-center justify-center mb-6">
                  <Building className="h-6 w-6 text-emerald-400 mr-3" />
                  <span className="text-emerald-100 font-medium">Département {department.code}</span>
                </div>

                <h1 className="font-serif font-bold text-4xl lg:text-6xl text-white mb-6">
                  Couvreur dans le <span className="text-emerald-400">{department.name}</span>
                </h1>

                <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                  {artisan
                      ? `${artisan.companyName} intervient dans toutes les communes`
                      : "Service professionnel disponible dans toutes les communes"
                  } du département {department.name}.
                </p>

                {/* Stats modernes */}
                <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-3xl font-bold text-white mb-2">{total}</div>
                    <div className="text-emerald-100 text-sm">Communes desservies</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-3xl font-bold text-white mb-2">
                      {artisan ? artisan.yearsExperience || "10+" : "10+"}
                    </div>
                    <div className="text-emerald-100 text-sm">Années d'expérience</div>
                  </div>
                </div>

                {artisan && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <a
                          href={`tel:${artisan.phone}`}
                          className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <Building className="h-5 w-5 mr-3" />
                        Contacter {artisan.companyName}
                      </a>
                      <a
                          href="#communes"
                          className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 border border-white/20"
                      >
                        <Users className="h-5 w-5 mr-3" />
                        Voir les communes
                      </a>
                    </div>
                )}
              </div>
            </div>
          </section>

          {/* Artisan Section */}
          {artisan ? (
              <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                      <h2 className="font-serif font-bold text-4xl text-slate-900 mb-6">
                        Votre expert couverture dans le {department.name}
                      </h2>
                      <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        {artisan.companyName} vous propose une expertise reconnue dans tout le département {department.name}.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                      <ArtisanCard artisan={artisan} />
                      <div className="lg:sticky lg:top-8">
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8">
                          <div className="text-center mb-6">
                            <h3 className="font-serif font-bold text-2xl text-slate-900 mb-2">
                              Demandez votre devis
                            </h3>
                            <p className="text-slate-600">
                              Gratuit et sans engagement
                            </p>
                          </div>
                          <ContactForm artisan={artisan} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
          ) : (
              <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-slate-50 rounded-2xl p-12">
                      <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Building className="h-8 w-8 text-slate-500" />
                      </div>
                      <h2 className="font-serif font-bold text-3xl text-slate-900 mb-4">
                        Service de couverture dans le {department.name}
                      </h2>
                      <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        Nous recherchons actuellement un couvreur qualifié pour desservir le {department.name}.
                        En attendant, nous pouvons vous orienter vers des professionnels des départements voisins.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3">
                          Nous contacter
                        </Button>
                        <Link href={`/inscription-couvreur/${department.slug}`}>
                          <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3">
                            Vous êtes couvreur ?
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
          )}

          {/* Liste des Communes */}
          <section id="communes" className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-serif font-bold text-4xl text-slate-900 mb-6">
                  Toutes les communes du {department.name}
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  {artisan ? `${artisan.companyName} intervient` : "Service disponible"} dans les {total} communes du département
                </p>
              </div>

              {allCommunes.length > 0 ? (
                  <div className="max-w-7xl mx-auto">
                    {letters.map(letter => (
                        <div key={letter} className="mb-12">
                          <div className="flex items-center mb-6">
                            <div className="flex items-center justify-center w-12 h-12 bg-emerald-600 text-white rounded-xl font-bold text-xl mr-4">
                              {letter}
                            </div>
                            <div className="flex-1 h-px bg-slate-300"></div>
                            <span className="ml-4 text-sm text-slate-500 bg-slate-200 px-3 py-1 rounded-full">
                        {groupedCommunes[letter].length} commune{groupedCommunes[letter].length > 1 ? 's' : ''}
                      </span>
                          </div>

                          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            {groupedCommunes[letter].map((commune, index) => (
                                <Link key={commune.id} href={`/commune/${commune.slug}`}>
                                  <div className={`
                            flex items-center justify-between p-4 hover:bg-slate-50 transition-colors duration-150
                            ${index !== groupedCommunes[letter].length - 1 ? 'border-b border-slate-100' : ''}
                            group cursor-pointer
                          `}>
                                    <div className="flex items-center space-x-4">
                                      <div className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-lg group-hover:bg-emerald-100 transition-colors">
                                        <MapPin className="h-4 w-4 text-slate-600 group-hover:text-emerald-600" />
                                      </div>
                                      <div>
                                        <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                          {commune.name}
                                        </h3>
                                        <div className="text-slate-500 text-sm">
                                          <span className="font-mono text-xs">/{commune.slug}</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center text-slate-400">
                              <span className="text-sm mr-2 group-hover:text-emerald-600 transition-colors">
                                Voir les services
                              </span>
                                      <ChevronRight className="h-4 w-4 group-hover:text-emerald-600 transition-colors" />
                                    </div>
                                  </div>
                                </Link>
                            ))}
                          </div>
                        </div>
                    ))}
                  </div>
              ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MapPin className="h-8 w-8 text-slate-500" />
                    </div>
                    <p className="text-slate-600 text-lg">
                      Aucune commune disponible pour le moment dans ce département.
                    </p>
                  </div>
              )}
            </div>
          </section>

          {/* CTA Section pour les artisans */}
          {!artisan && (
              <section className="py-20 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800">
                <div className="container mx-auto px-4 text-center">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="font-serif font-bold text-4xl text-white mb-6">
                      Vous êtes couvreur dans le {department.name} ?
                    </h2>
                    <p className="text-emerald-100 text-xl mb-8 leading-relaxed">
                      Rejoignez notre réseau d'artisans qualifiés et développez votre activité dans le {department.name}.
                      Inscription gratuite et sans engagement.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link href={`/inscription-couvreur/${department.slug}`}>
                        <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4">
                          Inscription gratuite
                        </Button>
                      </Link>

                    </div>
                  </div>
                </div>
              </section>
          )}
        </main>
        <Footer />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </div>
  )
}