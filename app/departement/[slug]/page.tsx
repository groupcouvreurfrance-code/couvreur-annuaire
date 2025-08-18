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
  const { slug } = await params
  const department = await getDepartmentBySlug(slug)

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

// Composant optimisé pour les listes de communes
const CommunesList = ({ communes, departmentName, artisanCompanyName }) => {
  // Créer des groupes par première lettre
  const groupedCommunes = communes.reduce((acc, commune) => {
    const firstLetter = commune.name.charAt(0).toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(commune)
    return acc
  }, {})

  return (
      <div className="max-w-6xl mx-auto space-y-6">
        {Object.entries(groupedCommunes).map(([letter, communeGroup]) => (
            <div key={letter} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-amber-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-lg">{letter}</div>
                  <span className="text-amber-100 text-sm">
                {communeGroup.length} commune{communeGroup.length > 1 ? 's' : ''}
              </span>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {communeGroup.map((commune) => (
                      <Link key={commune.id} href={`/commune/${commune.slug}`}>
                        <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors duration-150 group cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <MapPin className="h-4 w-4 text-slate-400 group-hover:text-amber-600 flex-shrink-0"/>
                            <span className="font-medium text-slate-900 group-hover:text-amber-700 transition-colors text-sm">
                        {commune.name}
                      </span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 transition-colors flex-shrink-0"/>
                        </div>
                      </Link>
                  ))}
                </div>
              </div>
            </div>
        ))}
      </div>
  )
}

// Composant pour les services (évite la répétition)
const ServicesList = ({ title, services, departmentName, bgColor = "bg-slate-50" }) => (
    <div className={`${bgColor} rounded-xl p-6`}>
      <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">{title}</h3>
      <div className="space-y-2">
        {services.map((service, index) => (
            <div key={index} className="flex items-center">
              <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
              <span className="text-slate-700">{service} {departmentName}</span>
            </div>
        ))}
      </div>
    </div>
)

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const param = await params;
  const department = await getDepartmentBySlug(param.slug)

  if (!department) {
    notFound()
  }

  const [{ communes: allCommunes, total }, artisan] = await Promise.all([
    getCommunesByDepartment(department.code, 1, 9999),
    getDepartmentArtisan(department.id),
  ])

  // Services optimisés (structure de données plus propre)
  const servicesData = {
    mainServices: [
      "Rénovation de toiture", "Réparation de toiture", "Pose de toiture",
      "Nettoyage de toiture", "Étanchéité toiture", "Isolation toiture"
    ],
    materials: [
      "Tuiles", "Ardoise", "Zinc", "Bac acier", "Toiture plate", "Charpente bois"
    ],
    zinguerie: [
      "Gouttières", "Noues", "Chéneaux", "Habillage cheminée"
    ],
    urgences: [
      "Dépannage toiture", "Fuite toiture", "Bâchage", "Intervention rapide"
    ]
  }

  // JSON-LD optimisé et condensé
  const structuredData = {
    business: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: artisan ? artisan.companyName : `Couvreur ${department.name}`,
      description: `Service de couverture professionnel dans le ${department.name} (${department.code})`,
      url: `https://www.couvreur-groupefrance.com/departement/${department.slug}`,
      ...(artisan && {
        address: {
          "@type": "PostalAddress",
          addressLocality: department.name,
          addressRegion: department.name,
          postalCode: department.code,
          addressCountry: "FR"
        },
        telephone: artisan.phone,
        openingHours: "Mo-Fr 08:00-18:00"
      }),
      areaServed: {
        "@type": "AdministrativeArea",
        name: department.name,
      },
      serviceType: "Couverture et toiture",
      priceRange: "$$"
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: "https://www.couvreur-groupefrance.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Départements",
          item: "https://www.couvreur-groupefrance.com/departements",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: department.name,
          item: `https://www.couvreur-groupefrance.com/departement/${department.slug}`,
        },
      ],
    },
    ...(artisan && {
      person: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: artisan.contactName || artisan.companyName,
        jobTitle: "Couvreur professionnel",
        description: `Couvreur expert à ${department.name}, spécialisé dans tous travaux de couverture et toiture`,
        telephone: artisan.phone,
        email: artisan.email,
        url: artisan.website,
        worksFor: {
          "@type": "LocalBusiness",
          name: artisan.companyName,
          address: {
            "@type": "PostalAddress",
            addressRegion: department.name,
            addressCountry: "FR"
          }
        },
        knowsAbout: [
          "Réparation de toiture", "Rénovation de toiture", "Travaux de zinguerie",
          "Pose de gouttières", "Étanchéité", "Isolation de toiture", "Démoussage"
        ]
      }
    })
  }

  return (
      <div className="min-h-screen">
        <Header/>
        <main>
          {/* Breadcrumb optimisé */}
          <nav className="py-2 bg-white border-b border-slate-200" aria-label="Fil d'Ariane">
            <div className="container mx-auto px-4">
              <ol className="flex items-center text-sm">
                <li><Link href="/" className="text-slate-500 hover:text-amber-600 transition-colors">Accueil</Link></li>
                <li><span className="mx-2 text-slate-400">/</span></li>
                <li><Link href="/departements" className="text-slate-500 hover:text-amber-600 transition-colors">Départements</Link></li>
                <li><span className="mx-2 text-slate-400">/</span></li>
                <li><span className="text-slate-900 font-medium">{department.name}</span></li>
              </ol>
            </div>
          </nav>

          {/* Hero Section optimisé */}
          <section className="py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <Link
                    href="/departements"
                    className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-4 transition-colors text-sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-2"/>
                  Tous les départements
                </Link>

                <div className="flex items-center justify-center mb-3">
                  <Building className="h-5 w-5 text-amber-400 mr-2"/>
                  <span className="text-amber-100 font-medium text-sm">Département {department.code}</span>
                </div>

                <h1 className="font-serif font-bold text-3xl lg:text-4xl text-white mb-4">
                  Couvreur à <span className="text-amber-400">{department.name}</span>
                </h1>

                <p className="text-lg text-slate-200 mb-6 max-w-2xl mx-auto leading-relaxed">
                  {artisan
                      ? `${artisan.companyName} intervient dans toutes les communes`
                      : "Service professionnel disponible dans toutes les communes"
                  } du département {department.name}.
                </p>

                {/* Stats compactes */}
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-2xl font-bold text-white mb-1">{total}</div>
                    <div className="text-amber-100 text-xs">Communes</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-2xl font-bold text-white mb-1">
                      {artisan ? artisan.yearsExperience || "10+" : "10+"}
                    </div>
                    <div className="text-amber-100 text-xs">Années</div>
                  </div>
                </div>

                {artisan && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                          href={`tel:${artisan.phone}`}
                          className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
                      >
                        <Building className="h-4 w-4 mr-2"/>
                        Contacter {artisan.companyName}
                      </a>
                      <a
                          href="#communes"
                          className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/20 text-sm"
                      >
                        <Users className="h-4 w-4 mr-2"/>
                        Voir les communes
                      </a>
                    </div>
                )}
              </div>
            </div>
          </section>

          {/* Section Artisan ou Service condensée */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                {artisan ? (
                    <>
                      <div className="text-center mb-8">
                        <h2 className="font-serif font-bold text-2xl md:text-3xl text-slate-900 mb-3">
                          Expert en couverture dans le {department.name}
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                          {artisan.companyName} vous propose une expertise reconnue dans tout le département.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <ArtisanCard artisan={artisan}/>
                        <div className="lg:sticky lg:top-4">
                          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6">
                            <div className="text-center mb-4">
                              <h3 className="font-serif font-bold text-xl text-slate-900 mb-2">
                                Demandez votre devis
                              </h3>
                              <p className="text-slate-600 text-sm">Gratuit et sans engagement</p>
                            </div>
                            <ContactForm artisan={artisan}/>
                          </div>
                        </div>
                      </div>
                    </>
                ) : (
                    <div className="max-w-2xl mx-auto text-center">
                      <div className="bg-slate-50 rounded-xl p-8">
                        <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Building className="h-6 w-6 text-slate-500"/>
                        </div>
                        <h2 className="font-serif font-bold text-2xl text-slate-900 mb-3">
                          Service de couverture dans le {department.name}
                        </h2>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                          Nous recherchons un couvreur qualifié pour le {department.name}.
                          En attendant, nous orientons vers les départements voisins.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                          <Button className="bg-amber-600 hover:bg-amber-700 px-6 py-2">
                            Nous contacter
                          </Button>
                          <a
                              href="mailto:groupcouvreurfrance@gmail.com?subject=Inscription"
                              className="flex items-center space-x-2 bg-white text-amber-700 hover:bg-amber-50 px-6 py-3 text-lg font-medium rounded-md"
                          >
                            Vous êtes couvreur ?
                          </a>
                        </div>
                      </div>
                    </div>
                )}
              </div>
            </div>
          </section>

          {/* Contenu informatif condensé */}
          <section className="py-12 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif font-bold text-2xl md:text-3xl text-slate-900 mb-8 text-center">
                  Services de couverture à {department.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="rounded-xl p-6 bg-white shadow-sm">
                    <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">Couvreur professionnel</h3>
                    <p className="text-slate-700">
                      Notre équipe intervient pour tous travaux de toiture à {department.name} : création, rénovation,
                      réparation d'urgence. Maîtrise de tous matériaux avec garantie d'étanchéité.
                    </p>
                  </div>

                  <div className="rounded-xl p-6 bg-white shadow-sm">
                    <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">Entreprise de couverture</h3>
                    <p className="text-slate-700">
                      Prestations complètes de l'installation à l'entretien. Matériaux robustes et techniques modernes
                      pour un résultat durable et esthétique à {department.name}.
                    </p>
                  </div>
                </div>

                {/* Services optimisés avec composant réutilisable */}
                <h3 className="font-serif font-bold text-2xl text-slate-900 mb-6 text-center">Nos prestations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ServicesList
                      title="Services principaux"
                      services={servicesData.mainServices}
                      departmentName={department.name}
                      bgColor="bg-amber-50"
                  />
                  <ServicesList
                      title="Matériaux"
                      services={servicesData.materials}
                      departmentName={department.name}
                      bgColor="bg-white"
                  />
                  <ServicesList
                      title="Zinguerie"
                      services={servicesData.zinguerie}
                      departmentName={department.name}
                      bgColor="bg-white"
                  />
                  <ServicesList
                      title="Urgences"
                      services={servicesData.urgences}
                      departmentName={department.name}
                      bgColor="bg-amber-50"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Liste des Communes optimisée */}
          <section id="communes" className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="font-serif font-bold text-2xl md:text-3xl text-slate-900 mb-3">
                  Communes du {department.name}
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  {artisan ? `${artisan.companyName} intervient` : "Service disponible"} dans les {total} communes
                </p>
              </div>

              {allCommunes.length > 0 ? (
                  <CommunesList
                      communes={allCommunes.sort((a, b) => a.name.localeCompare(b.name))}
                      departmentName={department.name}
                      artisanCompanyName={artisan?.companyName}
                  />
              ) : (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-6 w-6 text-slate-500"/>
                    </div>
                    <p className="text-slate-600">Aucune commune disponible dans ce département.</p>
                  </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-serif font-bold text-2xl md:text-3xl text-white mb-4">
                  Vous êtes couvreur à {department.name} ?
                </h2>
                <p className="text-amber-100 text-lg mb-6 leading-relaxed">
                  Rejoignez notre réseau d'artisans qualifiés. Inscription gratuite et sans engagement.
                </p>
                <a
                    href="mailto:groupcouvreurfrance@gmail.com?subject=Inscription"
                    className="inline-flex items-center bg-white text-amber-700 hover:bg-amber-50 px-6 py-3 text-lg font-medium rounded-md transition-colors"
                >
                  Inscription gratuite
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer/>

        {/* JSON-LD optimisé et condensé */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData.breadcrumb)}}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData.business)}}
        />
        {structuredData.person && (
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData.person)}}
            />
        )}
      </div>
  )
}