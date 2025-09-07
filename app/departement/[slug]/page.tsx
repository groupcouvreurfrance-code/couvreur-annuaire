import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArtisanCard } from "@/components/artisan-card"
import { ContactForm } from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import departmentData from "../../../public/data/departments-data.json"
import {
  getDepartmentBySlug,
  getCommunesByDepartment,
  getDepartmentArtisan
} from "@/lib/database"
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
    title: `Couvreur (${department.name} - ${department.code}) tel: ${artisan?.phone}`,
    description: `Trouvez le meilleur couvreur en ${department.name} (${department.code}) pour vos travaux de toiture. ${artisan ? `${artisan.companyName} vous accompagne avec des artisans qualifiés` : "Devis gratuits, artisans qualifiés partout dans le département"}.`,
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
      canonical: `https://www.couvreur-groupefrance.com/departement/${department.slug}`,
    },

  }
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const param = await params;
  const department = await getDepartmentBySlug(param.slug)

  if (!department) {
    notFound()
  }

  // Trouve les données spécifiques au département actuel
  const currentDepartmentData = departmentData.find(
      (dept: any) => dept.code === department.code || dept.slug === department.slug
  );

  const [{ communes: allCommunes, total }, artisan] = await Promise.all([
    getCommunesByDepartment(department.code),
    getDepartmentArtisan(department.id),
  ])

  // Diviser les communes en tranches de 60
  const createCommuneChunks = (communes: any[], chunkSize: number = 60) => {
    const chunks: any[][] = []
    const sortedCommunes = [...communes].sort((a, b) => a.name.localeCompare(b.name))

    for (let i = 0; i < sortedCommunes.length; i += chunkSize) {
      chunks.push(sortedCommunes.slice(i, i + chunkSize))
    }

    return chunks
  }

  const communeChunks = createCommuneChunks(allCommunes, 60)

  // JSON-LD optimisé
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: artisan ? artisan.companyName : `Couvreur ${department.name}`,
    description: `Service de couverture professionnel dans le ${department.name} (${department.code})`,
    url: `https://www.couvreur-groupefrance.com/departement/${department.slug}`,
    ...(artisan && artisan.address && {
      address: {
        "@type": "PostalAddress",
        addressLocality: department.name,
        addressRegion: department.name,
        postalCode: department.code,
        addressCountry: "FR"
      }
    }),
    ...(artisan && artisan.phone && {
      telephone: artisan.phone
    }),
    areaServed: {
      "@type": "AdministrativeArea",
      name: department.name,
    },
    ...(artisan && {
      openingHours: "Mo-Fr 08:00-18:00"
    }),
    "@id": `https://www.couvreur-groupefrance.com/departement/${department.slug}`,
    serviceType: "Couverture et toiture",
    priceRange: "$$"
  }

  const breadcrumbJsonLd = {
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
  }

  // Person Schema pour mettre en évidence l'artisan
  const personJsonLd = artisan ? {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artisan.contactName || artisan.companyName,
    jobTitle: "Couvreur professionnel",
    description: `Couvreur expert à ${department.name}, spécialisé dans tous travaux de couverture et toiture`,
    image: artisan.profileImage,
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
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Certification RGE",
        description: "Reconnu Garant de l'Environnement"
      }
    ],
    knowsAbout: [
      "Réparation de toiture",
      "Rénovation de toiture",
      "Travaux de zinguerie",
      "Pose de gouttières",
      "Étanchéité",
      "Isolation de toiture",
      "Démoussage"
    ]
  } : null

  return (
      <div className="min-h-screen">
        <Header/>
        <main>
          {/* Breadcrumb */}
          <section className="py-2 bg-white border-b border-slate-200">
            <div className="container mx-auto px-4">
              <div className="flex items-center text-sm">
                <Link href="/" className="text-slate-500 hover:text-amber-600 transition-colors">
                  Accueil
                </Link>
                <span className="mx-2 text-slate-400">/</span>
                <Link href="/departements" className="text-slate-500 hover:text-amber-600 transition-colors">
                  Départements
                </Link>
                <span className="mx-2 text-slate-400">/</span>
                <span className="text-slate-900 font-medium">{department.name}</span>
              </div>
            </div>
          </section>

          {/* Hero Section */}
          <section className="py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
            <div className="container mx-auto px-4 relative z-10">
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

                {/* Stats */}
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

          {/* Artisan Section */}
          {artisan ? (
              <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                      <h2 className="font-serif font-bold md:text-3xl text-slate-900 mb-3">
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
                            <p className="text-slate-600 text-sm">
                              Gratuit et sans engagement
                            </p>
                          </div>
                          <ContactForm artisan={artisan}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
          ) : (
              <section className="py-12 bg-white">
                <div className="container mx-auto px-4 text-center">
                  <div className="max-w-2xl mx-auto">
                    <div className="bg-slate-50 rounded-xl p-8">
                      <div
                          className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
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
                </div>
              </section>
          )}

          {/* Section expertise spécifique - utilise les données du département actuel */}
          {currentDepartmentData && (
              <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="font-serif font-bold text-3xl text-slate-900 mb-8 text-center">
                      Couvreur spécialisé {department.name}
                    </h2>

                    <div className="bg-slate-50 rounded-xl p-6 md:p-8 mb-8">
                      <p className="text-slate-700 leading-relaxed text-lg">
                        {currentDepartmentData.description}
                      </p>
                    </div>

                    <h2 className="font-serif font-bold text-3xl text-slate-900 mb-8 text-center">
                      Prestations
                    </h2>
                    <div className="bg-white rounded-2xl  p-8">
                      <h3 className="font-serif font-bold text-2xl text-center text-slate-900 mb-8">
                        Services de couverture à {department.name}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          `Couvreur ${department.name}`,
                          `Artisan couvreur ${department.name}`,
                          `Entreprise de couverture ${department.name}`,
                          `Travaux de couverture ${department.name}`,
                          `Travaux de zinguerie ${department.name}`,
                          `SOS fuite toiture ${department.name}`,
                          `Rénovation de toiture  ${department.name}`,
                          `Isolation de toiture ${department.name}`,
                          `Démoussage de toiture ${department.name}`,
                          `Réparation de toiture  ${department.name}`,
                          `Réfection de toiture  ${department.name}`,
                          `Remplacement d'éléments en  ${department.name}`,
                          `Étanchéité toiture  ${department.name}`,
                          `Pose de couverture  ${department.name}`,
                          `Pose de gouttière en  ${department.name}`,
                          `Remplacement de gouttière  ${department.name}`,
                          `Prestation zingueur  ${department.name}`,
                          `Traitement charpente  ${department.name}`,
                          `Pose de fenêtre de toit  ${department.name}`,
                          `Etanchéité toit et terrasse  ${department.name}`,
                        ].map((service) => (
                            <div
                                key={service}
                                className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 transition rounded-lg px-4 py-3 border-1"
                            >
                              <div
                                  className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold">
                                ✓
                              </div>
                              <span className="text-slate-700 font-medium">{service}</span>
                            </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </section>
          )}


          {/* Liste des Communes */}
          <section id="communes" className="py-12 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="font-serif font-bold text-3xl text-slate-900 mb-3">
                  Communes du {department.name}
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  {artisan ? `${artisan.companyName} intervient` : "Service disponible"} dans les {total} communes
                </p>
              </div>

              {allCommunes.length > 0 ? (
                  <div className="max-w-6xl mx-auto space-y-8">
                    {communeChunks.map((chunk, index) => {
                      const firstCommune = chunk[0]?.name || ""
                      const lastCommune = chunk[chunk.length - 1]?.name || ""
                      const firstLetter = firstCommune.charAt(0).toUpperCase()
                      const lastLetter = lastCommune.charAt(0).toUpperCase()

                      return (
                          <div key={index}
                               className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <div className="bg-amber-600 text-white p-4">
                              <div className="flex items-center justify-between">
                                <div className="font-bold text-lg">
                                  {firstLetter === lastLetter ? `${firstLetter}` : `${firstLetter} - ${lastLetter}`}
                                </div>
                                <span
                                    className="text-amber-100 text-sm">{chunk.length} commune{chunk.length > 1 ? 's' : ''}</span>
                              </div>
                            </div>

                            <div className="p-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {chunk.map((commune) => (
                                    <Link key={commune.id} href={`/commune/${commune.slug}`}>
                                      <div
                                          className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors duration-150 group cursor-pointer">
                                        <div className="flex items-center space-x-3">
                                          <MapPin
                                              className="h-4 w-4 text-slate-400 group-hover:text-amber-600 flex-shrink-0"/>
                                          <span
                                              className="font-medium text-slate-900 group-hover:text-amber-700 transition-colors text-sm">
                                          {commune.name}
                                        </span>
                                        </div>
                                        <ChevronRight
                                            className="h-4 w-4 text-slate-400 group-hover:text-amber-600 transition-colors flex-shrink-0"/>
                                      </div>
                                    </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                      )
                    })}
                  </div>
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
                <h2 className="font-serif font-bold text-3xl text-white mb-4">
                  Vous êtes couvreur à {department.name} ?
                </h2>
                <p className="text-amber-100 text-lg mb-6 leading-relaxed">
                  Rejoignez notre réseau d'artisans qualifiés. Inscription gratuite et sans engagement.
                </p>
                <a
                    href="mailto:groupcouvreurfrance@gmail.com?subject=Inscription"
                    className="inline-flex items-center bg-white text-amber-700 hover:bg-amber-50 px-6 py-3 text-lg font-medium rounded-md"
                >
                  Inscription gratuite
                </a>
              </div>
            </div>
          </section>

        </main>
        <Footer/>

        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd)}}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />

        {personJsonLd && (
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(personJsonLd)}}
            />
        )}
      </div>
  )
}