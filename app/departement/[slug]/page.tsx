import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { ArtisanCard } from "@/components/artisan-card"
import { ContactForm } from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getDepartmentBySlug, getCommunesByDepartment, getDepartmentArtisan } from "@/lib/database"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"

interface DepartmentPageProps {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
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

export default async function DepartmentPage({ params, searchParams }: DepartmentPageProps) {
  const department = await getDepartmentBySlug(params.slug)

  if (!department) {
    notFound()
  }

  const currentPage = Number(searchParams?.page) || 1
  const [{ communes, total }, artisan] = await Promise.all([
    getCommunesByDepartment(department.code, currentPage),
    getDepartmentArtisan(department.id),
  ])
  const totalPages = Math.ceil(total / 20)

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
              <span className="text-slate-900">{department.name}</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif font-bold text-4xl lg:text-5xl text-slate-900 mb-4">
                Couvreur dans le {department.name} ({department.code})
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                {artisan ? `${artisan.companyName} intervient` : "Service professionnel disponible"} dans toutes les
                communes du département
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">{total}</div>
                  <div className="text-sm text-slate-600">Communes desservies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    {artisan ? artisan.yearsExperience || "10+" : "10+"}
                  </div>
                  <div className="text-sm text-slate-600">Années d'expérience</div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Artisan Section */}
        {artisan ? (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif font-bold text-3xl text-slate-900 mb-8 text-center">
                  Votre couvreur dans le {department.name}
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ArtisanCard artisan={artisan} />
                  <ContactForm artisan={artisan} />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="font-serif font-bold text-3xl text-slate-900 mb-4">
                  Service de couverture dans le {department.name}
                </h2>
                <p className="text-slate-600 text-lg mb-8">
                  Nous recherchons actuellement un couvreur qualifié pour desservir le {department.name}.
                  <Link href={`/inscription-couvreur/${department.slug}`}>
                    <span className="text-emerald-600 hover:underline">Vous êtes couvreur ? Inscrivez-vous</span>
                  </Link>
                </p>
                <div className="space-y-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 mr-4">Nous contacter</Button>
                  <Link href={`/inscription-couvreur/${department.slug}`}>
                    <Button
                      variant="outline"
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                    >
                      Vous êtes couvreur ? Inscrivez-vous
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Communes List */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="font-serif font-bold text-3xl text-slate-900 mb-8 text-center">
              Communes desservies dans le {department.name}
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              {artisan ? `${artisan.companyName} intervient` : "Service disponible"} dans toutes ces communes
            </p>

            {communes.length > 0 && total > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {communes.map((commune) => (
                  <Link key={commune.id} href={`/commune/${commune.slug}`}>
                    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30">
                      <CardContent className="p-4 text-center">
                        <h3 className="font-medium text-slate-900 text-sm">{commune.name}</h3>
                      
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600 text-lg">Aucune commune disponible pour le moment dans ce département.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-8">
                {currentPage > 1 && (
                  <Link
                    href={`/departement/${department.slug}?page=${currentPage - 1}`}
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
                    href={`/departement/${department.slug}?page=${currentPage + 1}`}
                    className="px-4 py-2 text-sm font-medium text-emerald-600 bg-white border border-emerald-300 rounded-md hover:bg-emerald-50"
                  >
                    Suivant
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        {!artisan && <section className="py-16 bg-emerald-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif font-bold text-3xl text-white mb-4">
              Vous êtes couvreur dans le {department.name} ?
            </h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Rejoignez notre réseau d'artisans qualifiés et développez votre activité
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-emerald-50">
              Inscription gratuite
            </Button>
          </div>
        </section>

        }
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  )
}
