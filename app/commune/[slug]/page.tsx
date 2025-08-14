import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArtisanCard } from "@/components/artisan-card"
import { ContactForm } from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import { getCommuneBySlug, getCommuneArtisan } from "@/lib/database"
import { notFound } from "next/navigation"
import { MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import CarteCommune from "@/components/carte-commune";

interface CommunePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CommunePageProps): Promise<Metadata> {
  const commune = await getCommuneBySlug(params.slug)

  if (!commune) {
    return {
      title: "Commune non trouvée",
      description: "Cette commune n'existe pas dans notre annuaire.",
    }
  }

  const artisan = await getCommuneArtisan(commune.id)

  return {
    title: `Couvreur ${commune.name}  - ${commune.department_name} | Devis Gratuit`,
    description: `Trouvez votre couvreur à ${commune.name} . ${artisan ? `${artisan.companyName} intervient` : "Service professionnel"} dans tout le ${commune.department_name}. Devis gratuit et rapide.`,
    keywords: [
      `couvreur ${commune.name}`,
      `toiture ${commune.name}`,
      `réparation toit ${commune.name}`,
      `artisan couvreur ${commune.department_name}`,
      `devis couverture ${commune.name}`,
      `zingueur ${commune.name}`,
      `rénovation toiture ${commune.name}`,
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
      "geo.position": "",
      ICBM: "",
    },
  }
}

export default async function CommunePage({ params }: CommunePageProps) {
  const commune = await getCommuneBySlug(params.slug)

  if (!commune) {
    notFound()
  }

  const artisan = await getCommuneArtisan(commune.id)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: artisan ? artisan.companyName : `Service de couverture ${commune.name}`,
    description: `Couvreur professionnel à ${commune.name}  dans le ${commune.department_name}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: commune.name,
      postalCode: commune.postalCode,
      addressRegion: commune.department_name,
      addressCountry: "FR",
    },
    serviceArea: {
      "@type": "State",
      name: commune.department_name,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de couverture",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Réparation de toiture",
            description: `Réparation de toiture à ${commune.name}`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Rénovation de toiture",
            description: `Rénovation complète de toiture à ${commune.name}`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pose de gouttières",
            description: `Installation et réparation de gouttières à ${commune.name}`,
          },
        },
      ],
    },
    ...(artisan && {
      telephone: artisan.phone,
      email: artisan.email,
      url: artisan.website,
      priceRange: "€€",
      openingHours: "Mo-Fr 08:00-18:00",
    }),
  }

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Header />
      <main>
        {/* Breadcrumb */}
        <section className="py-4 bg-slate-50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-slate-600">
              <Link href="/" className="hover:text-emerald-600">
                Accueil
              </Link>
              <span className="mx-2">/</span>
              <Link href="/departements" className="hover:text-emerald-600">
                Départements
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/departement/${commune.department_slug}`} className="hover:text-emerald-600">
                {commune.department_name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-900">{commune.name}</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Link
                  href={`/departement/${commune.department_slug}`}
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2"/>
                Retour au {commune.department_name}
              </Link>

              <h1 className="font-serif font-bold text-4xl lg:text-5xl text-slate-900 mb-4">
                Couvreur à {commune.name} - {commune.department_name}
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                {artisan ? `${artisan.companyName} intervient` : "Service professionnel disponible"} à {commune.name}{" "}
                et dans tout le {commune.department_name}. Devis et intervention rapide.
              </p>

              <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                      <h2 className="font-serif font-bold text-3xl text-slate-900 mb-4">
                        Localisation à {commune.name}
                      </h2>
                      <p className="text-slate-600">
                        Découvrez la position géographique de {commune.name} dans le {commune.department_name}
                      </p>
                    </div>

                    <CarteCommune
                        nomCommune={commune.name}
                        departement={commune.department_name}
                        artisanNom={artisan?.companyName}
                    />

                    {/* Informations complémentaires sous la carte */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-slate-900 mb-2">Commune</h3>
                        <p className="text-slate-600">{commune.name}</p>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-slate-900 mb-2">Département</h3>
                        <p className="text-slate-600">{commune.department_name}</p>
                      </div>

                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>


        {/* Artisan Section */}
        {artisan ? (
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <h2 className="font-serif font-bold text-3xl text-slate-900 mb-8 text-center">
                    Votre couvreur à {commune.name}
                  </h2>
                  <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                    Contactez directement {artisan.companyName} pour obtenir votre devis
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ArtisanCard artisan={artisan}/>
                    <ContactForm artisan={artisan}/>
                  </div>
                </div>
              </div>
            </section>
        ) : (
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto">
                  <h2 className="font-serif font-bold text-3xl text-slate-900 mb-4">
                    Service de couverture à {commune.name}
                  </h2>
                  <p className="text-slate-600 text-lg mb-8">
                    Nous recherchons actuellement un couvreur qualifié pour desservir {commune.name} et le{" "}
                    {commune.department_name}.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section - Seulement affiché s'il n'y a pas d'artisan */}
        {!artisan && (
          <section className="py-16 bg-emerald-600">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-serif font-bold text-3xl text-white mb-4">Vous êtes couvreur à {commune.name} ?</h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                Rejoignez notre réseau d&apos;artisans qualifiés et développez votre activité dans le {commune.department_name}
              </p>
              <Link href={`/inscription-couvreur/${commune.department_slug}`}>
                <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-emerald-50">
                  Inscription gratuite
                </Button>
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
