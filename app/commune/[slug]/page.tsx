import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArtisanCard } from "@/components/artisan-card"
import { ContactForm } from "@/components/contact-form"
import { getCommuneBySlug, getCommuneArtisan } from "@/lib/database"
import { notFound } from "next/navigation"
import { MapPin, ArrowLeft, Phone, Mail, Star, Shield, Clock, Award } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import {getRotatingContent} from "@/lib/content-rotation";

// Lazy loading des composants lourds
const CarteCommune = dynamic(() => import("@/components/carte-commune"), {
  loading: () => <div className="h-64 bg-slate-200 animate-pulse rounded-lg" />,
  ssr: false // Désactive le SSR pour les cartes qui sont lourdes
})

const MeteoCommune = dynamic(() => import("@/components/meteo-commune"), {
  loading: () => <div className="h-32 bg-slate-200 animate-pulse rounded-lg" />,
  ssr: false
})

interface CommunePageProps {
  params: {
    slug: string
  }
}

// Composant de skeleton réutilisable
const SkeletonCard = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 animate-pulse">
      <div className="flex items-center justify-center w-12 h-12 bg-slate-200 rounded-lg mb-4 mx-auto"></div>
      <div className="h-4 bg-slate-200 rounded mb-2"></div>
      <div className="h-6 bg-slate-200 rounded"></div>
    </div>
)

// Optimisation des métadonnées
export async function generateMetadata({ params }: CommunePageProps): Promise<Metadata> {
  const { slug } = await params
  const commune = await getCommuneBySlug(slug)

  if (!commune) {
    return {
      title: "Commune non trouvée",
      description: "Cette commune n'existe pas dans notre annuaire.",
    }
  }

  const artisan = await getCommuneArtisan(commune.id)

  return {
    title: `Couvreur ${commune.name} - ${commune.department_name} | Devis Gratuit`,
    description: `Couvreur professionnel à ${commune.name}. ${artisan ? `${artisan.companyName} intervient` : "Service professionnel"} dans tout le ${commune.department_name}. Devis gratuit et rapide.`,
    keywords: [
      `couvreur ${commune.name}`,
      `toiture ${commune.name}`,
      `réparation toit ${commune.name}`,
      `artisan couvreur ${commune.department_name}`,
      `devis couverture ${commune.name}`,
    ],
    openGraph: {
      title: `Couvreur ${commune.name} - Devis Gratuit`,
      description: `Votre couvreur professionnel à ${commune.name}. Intervention rapide dans le ${commune.department_name}.`,
      type: "website",
      locale: "fr_FR",
    },
    alternates: {
      canonical: `/commune/${params.slug}`,
    },
    other: {
      "geo.region": "FR",
      "geo.placename": commune.name,
    },
  }
}

export default async function CommunePage({ params }: CommunePageProps) {
  const commune = await getCommuneBySlug(params.slug)

  if (!commune) {
    notFound()
  }

  const artisan = await getCommuneArtisan(commune.id)
  const rotatingContent = getRotatingContent(commune.name)

  // Optimisation des schémas JSON-LD (version minifiée)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: artisan?.companyName || `Service de couverture ${commune.name}`,
    description: `Couvreur professionnel à ${commune.name}`,
    "@id": `https://www.couvreur-groupefrance.com/commune/${params.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: commune.name,
      postalCode: commune.postalCode,
      addressRegion: commune.department_name,
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "City",
      name: commune.name,
    },
    serviceType: "Couverture et toiture",
    priceRange: "€€",
    ...(artisan && {
      telephone: artisan.phone,
      email: artisan.email,
      openingHours: "Mo-Fr 08:00-18:00",
    }),
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
        name: commune.department_name,
        item: `https://www.couvreur-groupefrance.com/departement/${commune.department_slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: commune.name,
        item: `https://www.couvreur-groupefrance.com/commune/${params.slug}`,
      },
    ],
  }

  return (
      <div className="min-h-screen">
        <Header />
        <main>
          {/* Breadcrumb optimisé */}
          <section className="py-3 bg-white border-b border-slate-200">
            <div className="container mx-auto px-4">
              <nav className="flex items-center text-sm" aria-label="Breadcrumb">
                <Link href="/" className="text-slate-500 hover:text-amber-600 transition-colors">
                  Accueil
                </Link>
                <span className="mx-2 text-slate-400">/</span>
                <Link href={`/departement/${commune.department_slug}`} className="text-slate-500 hover:text-amber-600 transition-colors">
                  {commune.department_name}
                </Link>
                <span className="mx-2 text-slate-400">/</span>
                <span className="text-slate-900 font-medium">{commune.name}</span>
              </nav>
            </div>
          </section>

          {/* Hero Section optimisé */}
          <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <Link
                    href={`/departement/${commune.department_slug}`}
                    className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-colors"
                    aria-label={`Retour au département ${commune.department_name}`}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                  Retour au {commune.department_name}
                </Link>

                <div className="flex items-center justify-center mb-6">
                  <MapPin className="h-6 w-6 text-amber-400 mr-3" aria-hidden="true" />
                  <span className="text-amber-100 font-medium">{commune.department_name}</span>
                </div>

                <h1 className="font-serif font-bold text-4xl lg:text-6xl text-white mb-6">
                  Couvreur à <span className="text-amber-400">{commune.name}</span>
                </h1>

                <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                  {artisan
                      ? `${artisan.companyName} vous accompagne pour tous vos travaux de couverture`
                      : "Trouvez rapidement un couvreur professionnel"
                  } à {commune.name}.
                </p>

                {artisan && (
                    <>
                      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                          <Shield className="h-4 w-4 text-amber-400 mr-2" aria-hidden="true" />
                          <span className="text-white text-sm">Certifié RGE</span>
                        </div>
                        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                          <Clock className="h-4 w-4 text-amber-400 mr-2" aria-hidden="true" />
                          <span className="text-white text-sm">Intervention 24h</span>
                        </div>
                        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                          <Award className="h-4 w-4 text-amber-400 mr-2" aria-hidden="true" />
                          <span className="text-white text-sm">Devis gratuit</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={`tel:${artisan.phone}`}
                            className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                            aria-label={`Appeler ${artisan.companyName} au ${artisan.phone}`}
                        >
                          <Phone className="h-5 w-5 mr-3" aria-hidden="true" />
                          Appeler maintenant
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 border border-white/20"
                        >
                          <Mail className="h-5 w-5 mr-3" aria-hidden="true" />
                          Demander un devis
                        </a>
                      </div>
                    </>
                )}
              </div>
            </div>
          </section>

          {/* Artisan Section avec lazy loading */}
          {artisan ? (
              <section id="contact" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                      <h2 className="font-serif font-bold md:text-4xl text-slate-900 mb-6">
                        Votre couvreur de confiance à {commune.name}
                      </h2>
                      <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        {artisan.companyName} vous propose une expertise reconnue
                        pour tous vos projets de couverture.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                      <Suspense fallback={<div className="h-64 bg-slate-200 animate-pulse rounded-lg" />}>
                        <ArtisanCard artisan={artisan} />
                      </Suspense>

                      <div className="lg:sticky lg:top-8">
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8">
                          <div className="text-center mb-6">
                            <h3 className="font-serif font-bold text-2xl text-slate-900 mb-2">
                              Demandez votre devis
                            </h3>
                            <p className="text-slate-600">Gratuit et sans engagement</p>
                          </div>
                          <Suspense fallback={<div className="h-48 bg-slate-200 animate-pulse rounded-lg" />}>
                            <ContactForm artisan={artisan} />
                          </Suspense>
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
                        <MapPin className="h-8 w-8 text-slate-500" aria-hidden="true" />
                      </div>
                      <h2 className="font-serif font-bold text-3xl text-slate-900 mb-4">
                        Service de couverture à {commune.name}
                      </h2>
                      <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        Nous recherchons actuellement un couvreur qualifié pour desservir {commune.name}.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
          )}

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif font-bold text-4xl text-white mb-6">
                  Vous êtes couvreur à {commune.name} ?
                </h2>
                <p className="text-amber-100 text-xl mb-8 leading-relaxed">
                  Rejoignez notre réseau d&apos;artisans qualifiés. Inscription gratuite.
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

          {/* Contenu informatif optimisé */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif font-bold text-3xl text-slate-900 mb-8 text-center">
                  {rotatingContent.title}
                </h2>

                <div className="space-y-8">
                  {rotatingContent.sections.slice(0, 3).map((section, index) => (
                      <article key={index} className={`rounded-xl p-6 md:p-8 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-amber-50'}`}>
                        <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">
                          {section.title}
                        </h3>
                        <p className="text-slate-700">
                          {section.content}
                        </p>
                      </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Services - Version allégée */}
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h3 className="font-serif font-bold text-2xl text-center text-slate-900 mb-6">
                  Services de couverture à {commune.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    `Couvreur ${commune.name}`,
                    `Réparation de toiture ${commune.name}`,
                    `Rénovation de toiture ${commune.name}`,
                    `Travaux de zinguerie ${commune.name}`,
                    `Isolation de toiture ${commune.name}`,
                    `Démoussage de toiture ${commune.name}`,
                  ].map((service) => (
                      <div key={service} className="flex items-center py-3 px-4 bg-white rounded-lg shadow-sm">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-slate-700 font-medium">{service}</span>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Localisation avec lazy loading */}
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-serif font-bold text-3xl text-slate-900 mb-4">
                    Localisation à {commune.name}
                  </h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Découvrez la position géographique de {commune.name}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Carte avec lazy loading */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <Suspense fallback={<div className="h-64 bg-slate-200 animate-pulse" />}>
                      <CarteCommune
                          nomCommune={commune.name}
                          departement={commune.department_name}
                          artisanNom={artisan?.companyName}
                      />
                    </Suspense>
                  </div>

                  {/* Météo avec lazy loading */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">
                      Météo à {commune.name}
                    </h3>
                    <Suspense fallback={<div className="h-32 bg-slate-200 animate-pulse rounded-lg" />}>
                      <MeteoCommune
                          nomCommune={commune.name}
                          departement={commune.department_name}
                      />
                    </Suspense>
                  </div>
                </div>

                {/* Infos géographiques */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Suspense fallback={<SkeletonCard />}>
                    <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                      <MapPin className="h-8 w-8 text-amber-600 mx-auto mb-2" aria-hidden="true" />
                      <h4 className="font-semibold text-slate-900">Commune</h4>
                      <p className="text-slate-600">{commune.name}</p>
                    </div>
                  </Suspense>

                  <Suspense fallback={<SkeletonCard />}>
                    <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                      <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" aria-hidden="true" />
                      <h4 className="font-semibold text-slate-900">Département</h4>
                      <p className="text-slate-600">{commune.department_name}</p>
                    </div>
                  </Suspense>

                  <Suspense fallback={<SkeletonCard />}>
                    <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                      <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" aria-hidden="true" />
                      <h4 className="font-semibold text-slate-900">Zone d'intervention</h4>
                      <p className="text-slate-600">{commune.name} + 20km</p>
                    </div>
                  </Suspense>
                </div>
              </div>
            </div>
          </section>

        </main>
        <Footer/>

        {/* JSON-LD optimisé */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd)}}
        />
      </div>
  )
}