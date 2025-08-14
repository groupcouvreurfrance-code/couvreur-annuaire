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

  // Diviser les communes en tranches de 60
  const createCommuneChunks = (communes: any[], chunkSize: number = 60) => {
    const chunks: any[][] = []

    // Trier toutes les communes alphabétiquement d'abord
    const sortedCommunes = [...communes].sort((a, b) => a.name.localeCompare(b.name))

    // Diviser en tranches de 60
    for (let i = 0; i < sortedCommunes.length; i += chunkSize) {
      chunks.push(sortedCommunes.slice(i, i + chunkSize))
    }

    return chunks
  }

  const communeChunks = createCommuneChunks(allCommunes, 60)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: artisan ? artisan.companyName : `Couvreur ${department.name}`,
    description: `Service de couverture professionnel dans le ${department.name} (${department.code})`,
    url: `https://www.couvreur-groupefrance.com/departement/${department.slug}`,
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
  }

  return (
      <div className="min-h-screen">
        <Header />
        <main>
          {/* Breadcrumb */}
          <section className="py-2 bg-white border-b border-slate-200">
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

          {/* Hero Section - Plus compact */}
          <section className="py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <Link
                    href="/departements"
                    className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-4 transition-colors text-sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Tous les départements
                </Link>

                <div className="flex items-center justify-center mb-3">
                  <Building className="h-5 w-5 text-emerald-400 mr-2" />
                  <span className="text-emerald-100 font-medium text-sm">Département {department.code}</span>
                </div>

                <h1 className="font-serif font-bold text-3xl lg:text-4xl text-white mb-4">
                  Couvreur à <span className="text-emerald-400">{department.name}</span>
                </h1>

                <p className="text-lg text-slate-200 mb-6 max-w-2xl mx-auto leading-relaxed">
                  {artisan
                      ? `${artisan.companyName} intervient dans toutes les communes`
                      : "Service professionnel disponible dans toutes les communes"
                  } du département {department.name}.
                </p>

                {/* Stats compacts */}
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-2xl font-bold text-white mb-1">{total}</div>
                    <div className="text-emerald-100 text-xs">Communes</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-2xl font-bold text-white mb-1">
                      {artisan ? artisan.yearsExperience || "10+" : "10+"}
                    </div>
                    <div className="text-emerald-100 text-xs">Années</div>
                  </div>
                </div>

                {artisan && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                          href={`tel:${artisan.phone}`}
                          className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
                      >
                        <Building className="h-4 w-4 mr-2" />
                        Contacter {artisan.companyName}
                      </a>
                      <a
                          href="#communes"
                          className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 border border-white/20 text-sm"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Voir les communes
                      </a>
                    </div>
                )}
              </div>
            </div>
          </section>

          {/* Artisan Section - Plus compact */}
          {artisan ? (
              <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                      <h2 className="font-serif font-bold text-3xl text-slate-900 mb-3">
                        Votre expert couverture dans le {department.name}
                      </h2>
                      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        {artisan.companyName} vous propose une expertise reconnue dans tout le département {department.name}.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      <ArtisanCard artisan={artisan} />
                      <div className="lg:sticky lg:top-4">
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6">
                          <div className="text-center mb-4">
                            <h3 className="font-serif font-bold text-xl text-slate-900 mb-2">
                              Demandez votre devis
                            </h3>
                            <p className="text-slate-600 text-sm">
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
              <section className="py-12 bg-white">
                <div className="container mx-auto px-4 text-center">
                  <div className="max-w-2xl mx-auto">
                    <div className="bg-slate-50 rounded-xl p-8">
                      <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Building className="h-6 w-6 text-slate-500" />
                      </div>
                      <h2 className="font-serif font-bold text-2xl text-slate-900 mb-3">
                        Service de couverture dans le {department.name}
                      </h2>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        Nous recherchons actuellement un couvreur qualifié pour desservir le {department.name}.
                        En attendant, nous pouvons vous orienter vers des professionnels des départements voisins.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2">
                          Nous contacter
                        </Button>
                        <Link href={`/inscription-couvreur/${department.slug}`}>
                          <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-6 py-2">
                            Vous êtes couvreur ?
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
          )}
          {/* Contenu informatif */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif font-bold text-3xl text-slate-900 mb-8 text-center">
                  Réfection de toitue à  {department.name}
                </h2>

                <div className="space-y-6">
                  <div className="rounded-xl p-6 md:p-8 bg-slate-50">
                    <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">1 - Couvreur {department.name}</h3>
                    <p className="text-slate-700 mb-4">
                      Besoin d&apos;un couvreur fiable à {department.name} ? Notre équipe intervient pour tous types de travaux de toiture : création, rénovation ou réparation d&apos;urgence. Nous maîtrisons la pose et l&apos;entretien de différentes couvertures, qu&apos;elles soient en tuiles, en zinc, en ardoise ou en bac acier. Nos interventions, réalisées dans le respect des règles de l'art, assurent une toiture résistante, parfaitement étanche et adaptée aux conditions climatiques locales.
                    </p>
                  </div>

                  <div className="rounded-xl p-6 md:p-8 bg-emerald-50">
                    <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">2 - Entreprise de couverture {department.name}</h3>
                    <p className="text-slate-700 mb-4">
                      Notre société de couverture à {department.name} prend en charge vos projets du début à la fin. De l&apos;installation à l&apos;entretien, en passant par les réparations et dépannages, nous proposons des prestations complètes sur mesure. Nous combinons des matériaux robustes à des techniques de pose modernes pour offrir un résultat à la fois durable et esthétique.
                    </p>
                  </div>

                  <div className="rounded-xl p-6 md:p-8 bg-slate-50">
                    <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">3 - Artisan couvreur {department.name}</h3>
                    <p className="text-slate-700 mb-4">
                      En tant qu&apos;artisan couvreur à {department.name}, nous privilégions la précision et la qualité dans chacun de nos chantiers. Que ce soit pour changer quelques tuiles, restaurer une charpente ou poser une nouvelle couverture, nous travaillons avec le souci du détail et dans le respect des délais convenus.
                    </p>
                  </div>

                  {/* Continuez avec les autres sections de la même manière */}
                  <div className="rounded-xl p-6 md:p-8 bg-emerald-50">
                    <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">4 - Travaux de zinguerie {department.name}</h3>
                    <p className="text-slate-700 mb-4">
                      Nous réalisons tous vos travaux de zinguerie à {department.name} : fabrication, pose et réparation de gouttières, noues, rives et abergements. Chaque élément est conçu pour favoriser l'évacuation de l'eau et protéger durablement vos murs et fondations.
                    </p>
                  </div>

                  <div className="rounded-xl p-6 md:p-8 bg-slate-50">
                    <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">5 - Travaux de couverture {department.name}</h3>
                    <p className="text-slate-700 mb-4">
                      Notre équipe réalise vos travaux de couverture à {department.name} avec professionnalisme. Nous intervenons sur tous types de matériaux, en neuf comme en rénovation, pour assurer une protection optimale contre les intempéries.
                    </p>
                  </div>

                  {/* Ajoutez les autres points de la même manière en alternant les classes bg-slate-50 et bg-emerald-50 */}

                </div>
              </div>
            </div>
          </section>
          {/* Services et prestations */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif font-bold text-3xl text-slate-900 mb-8 text-center">
                  Nos services de couverture à {department.name}
                </h2>

                <div className="space-y-8">


                  {/* Types de travaux */}
                  <div className="bg-emerald-50 rounded-xl p-6 md:p-8">
                    <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">1. Types de travaux</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        `Rénovation de toiture ${department.name}`,
                        `Réparation de toiture ${department.name}`,
                        `Pose de toiture ${department.name}`,
                        `Remplacement toiture ${department.name}`,
                        `Nettoyage de toiture ${department.name}`,
                        `Démoussage de toiture ${department.name}`,
                        `Étanchéité toiture ${department.name}`,
                        `Isolation toiture ${department.name}`,
                        `Traitement de toiture ${department.name}`,
                        `Entretien toiture ${department.name}`
                      ].map((service, index) => (
                          <div key={index} className="flex items-center py-2">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-slate-700">{service}</span>
                          </div>
                      ))}
                    </div>
                  </div>

                  {/* Types de toits et matériaux */}
                  <div className="bg-slate-50 rounded-xl p-6 md:p-8">
                    <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">2. Types de toits et matériaux</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        `Toiture en tuiles ${department.name}`,
                        `Toiture en ardoise ${department.name}`,
                        `Toiture zinc ${department.name}`,
                        `Toiture bac acier ${department.name}`,
                        `Toiture plate ${department.name}`,
                        `Toiture en pente ${department.name}`,
                        `Charpente bois ${department.name}`,
                        `Charpente traditionnelle ${department.name}`,
                        `Couverture métallique ${department.name}`,
                        `Couverture en lauze ${department.name}`,
                        `Bardage toiture ${department.name}`
                      ].map((service, index) => (
                          <div key={index} className="flex items-center py-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-slate-700">{service}</span>
                          </div>
                      ))}
                    </div>
                  </div>

                  {/* Zinguerie et éléments associés */}
                  <div className="bg-emerald-50 rounded-xl p-6 md:p-8">
                    <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">3. Zinguerie et éléments associés</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        `Zinguerie ${department.name}`,
                        `Pose de gouttières ${department.name}`,
                        `Réparation gouttières ${department.name}`,
                        `Habillage de rive ${department.name}`,
                        `Noues toiture ${department.name}`,
                        `Chéneaux ${department.name}`,
                        `Solins ${department.name}`,
                        `Habillage cheminée ${department.name}`
                      ].map((service, index) => (
                          <div key={index} className="flex items-center py-2">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-slate-700">{service}</span>
                          </div>
                      ))}
                    </div>
                  </div>

                  {/* Urgences et interventions rapides */}
                  <div className="bg-slate-50 rounded-xl p-6 md:p-8">
                    <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">4. Urgences et interventions rapides</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        `Dépannage toiture ${department.name}`,
                        `Urgence couvreur ${department.name}`,
                        `Fuite toiture ${department.name}`,
                        `Réparation fuite toit ${department.name}`,
                        `Bâchage toiture ${department.name}`,
                        `Intervention rapide couvreur ${department.name}`
                      ].map((service, index) => (
                          <div key={index} className="flex items-center py-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-slate-700">{service}</span>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Liste des Communes par tranches de 60 */}
          <section id="communes" className="py-12 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="font-serif font-bold text-3xl text-slate-900 mb-3">
                  Toutes les communes du {department.name}
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  {artisan ? `${artisan.companyName} intervient` : "Service disponible"} dans les {total} communes du département
                </p>
              </div>

              {allCommunes.length > 0 ? (
                  <div className="max-w-6xl mx-auto">
                    {/* Affichage par tranches de 60 communes */}
                    <div className="space-y-8">
                      {communeChunks.map((chunk, index) => {
                        const firstCommune = chunk[0]?.name || ""
                        const lastCommune = chunk[chunk.length - 1]?.name || ""
                        const firstLetter = firstCommune.charAt(0).toUpperCase()
                        const lastLetter = lastCommune.charAt(0).toUpperCase()

                        return (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                              <div className="bg-emerald-600 text-white p-4">
                                <div className="flex items-center justify-between">
                                  <div className="font-bold text-lg">
                                    {firstLetter === lastLetter
                                        ? `${firstLetter}`
                                        : `${firstLetter} - ${lastLetter}`
                                    }
                                  </div>
                                  <span className="text-emerald-100 text-sm">
                                  {chunk.length} commune{chunk.length > 1 ? 's' : ''}
                                    {firstCommune && lastCommune && firstCommune !== lastCommune &&
                                        ` • ${firstCommune} → ${lastCommune}`
                                    }
                                </span>
                                </div>
                              </div>

                              <div className="p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                  {chunk.map((commune) => (
                                      <Link key={commune.id} href={`/commune/${commune.slug}`}>
                                        <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors duration-150 group cursor-pointer">
                                          <div className="flex items-center space-x-3">
                                            <MapPin className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 flex-shrink-0" />
                                            <span className="font-medium text-slate-900 group-hover:text-emerald-700 transition-colors text-sm">
                                            {commune.name}
                                          </span>
                                          </div>
                                          <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-colors flex-shrink-0" />
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
              ) : (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-6 w-6 text-slate-500" />
                    </div>
                    <p className="text-slate-600">
                      Aucune commune disponible pour le moment dans ce département.
                    </p>
                  </div>
              )}
            </div>
          </section>

          {/* CTA Section pour les artisans - Plus compact */}

              <section className="py-12 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800">
                <div className="container mx-auto px-4 text-center">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="font-serif font-bold text-3xl text-white mb-4">
                      Vous êtes couvreur à {department.name} ?
                    </h2>
                    <p className="text-emerald-100 text-lg mb-6 leading-relaxed">
                      Rejoignez notre réseau d&apos;artisans qualifiés et développez votre activité dans
                      le {department.name}.
                      Inscription gratuite et sans engagement.
                    </p>
                    <a
                        href="mailto:groupcouvreurfrance@gmail.com?subject=Inscription &body=Bonjour,%0D%0A%0D%0AJe souhaiterais obtenir des informations concernant l'inscription en tant que couvreur.%0D%0A%0D%0ACordialement"
                        className="flex items-center space-x-2 bg-white text-emerald-700 hover:bg-emerald-50 px-6 py-3 text-lg font-medium rounded-md"
                    >
                      Inscription gratuite
                    </a>
                  </div>
                </div>
              </section>

        </main>
        <Footer/>

        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
      </div>
  )
}