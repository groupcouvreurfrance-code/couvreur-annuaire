import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArtisanCard } from "@/components/artisan-card"
import { ContactForm } from "@/components/contact-form"
import {getCommuneBySlug,  getCommuneArtisan} from "@/lib/database"
import { notFound } from "next/navigation"
import { MapPin, ArrowLeft, Phone, Mail, Star, Shield, Clock, Award,  } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import CarteCommune from "@/components/carte-commune"
import {
  getConclusionText,
  getConclusionTitle,
  getIntroText,
  getKeyPoints,
  getProfessionalServices,
  getRotatingContent,
  getSectionIcon
} from "@/lib/content-rotation";
import MeteoCommune from "@/components/meteo-commune";

interface CommunePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CommunePageProps): Promise<Metadata> {
  const param = await params;
  const { slug } = param;
  const commune = await getCommuneBySlug(slug)
  if (!commune) {
    return {
      title: "Commune non trouvée",
      description: "Cette commune n'existe pas dans notre annuaire.",
    }
  }

  const artisan = await getCommuneArtisan(commune.id)

  return {
    title: `Couvreur ${commune.name} (${commune.department_name}) tel: ${artisan?.phone}`,
    description: `Trouvez votre couvreur à ${commune.name} . ${artisan ? `${artisan.companyName} intervient` : "Service professionnel"} dans tout le ${commune.department_name}. `,
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
      canonical: `https://www.couvreur-groupefrance.com/commune/${param.slug}`,
    },
    other: {
      "geo.region": "FR",
      "geo.placename": commune.name,
    },
  }
}

export default async function CommunePage({ params }: CommunePageProps) {
  const param = await params;
  const commune = await getCommuneBySlug(param.slug)

  if (!commune) {
    notFound()
  }

  const artisan = await getCommuneArtisan(commune.id)

  // Contenu rotatif basé sur la première lettre de la commune
  const rotatingContent = getRotatingContent(commune.name)

  // LocalBusiness schema with improved structure
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: artisan ? artisan.companyName : `Service de couverture ${commune.name}`,
    description: `Couvreur professionnel à ${commune.name}  dans le ${commune.department_name}`,
    "@id": `https://www.couvreur-groupefrance.com/commune/${param.slug}`,
    url: `https://www.couvreur-groupefrance.com/commune/${param.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: artisan?.address || `${commune.name}, Centre-ville`,
      addressLocality: commune.name,
      postalCode: commune.postalCode,
      addressRegion: commune.department_name,
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "City",
      name: commune.name,
      containedInPlace: {
        "@type": "State",
        name: commune.department_name
      }
    },
    serviceType: "Couverture et toiture",
    priceRange: "€€",
    // Add artisan-specific fields if available
    ...(artisan && {
      telephone: artisan.phone,
      email: artisan.email,
      url: artisan.website,
      image: artisan.profileImage,
      openingHours: "Mo-Fr 08:00-18:00",
    }),
  }

  // Person Schema pour mettre en évidence l'artisan
  const personJsonLd = artisan ? {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artisan.contactName || artisan.companyName,
    jobTitle: "Couvreur professionnel",
    description: `Couvreur expert à ${commune.name}, spécialisé dans tous travaux de couverture et toiture`,
    image: artisan.profileImage,
    telephone: artisan.phone,
    email: artisan.email,
    url: artisan.website,
    worksFor: {
      "@type": "LocalBusiness",
      name: artisan.companyName,
      address: {
        "@type": "PostalAddress",
        addressLocality: commune.name,
        addressRegion: commune.department_name,
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

  // FAQ Schema pour répondre aux questions courantes
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Comment trouver un bon couvreur à ${commune.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Pour trouver un couvreur qualifié à ${commune.name}, vérifiez ses certifications (RGE), consultez les avis clients, demandez plusieurs devis gratuits et assurez-vous qu'il soit assuré. ${artisan ? `${artisan.companyName} répond à tous ces critères et intervient dans tout le ${commune.department_name}.` : `Nous pouvons vous mettre en relation avec des professionnels qualifiés dans le ${commune.department_name}.`}`
        }
      },
      {
        "@type": "Question",
        name: `Quels sont les tarifs d'un couvreur à ${commune.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Les tarifs d'un couvreur à ${commune.name} varient selon le type de travaux : réparation de tuiles (150-300€), réfection complète (80-150€/m²), zinguerie (50-100€/m²). Demandez toujours un devis gratuit pour une estimation précise adaptée à votre projet.`
        }
      },
      {
        "@type": "Question",
        name: `Quand faire appel à un couvreur à ${commune.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Contactez un couvreur à ${commune.name} dès les premiers signes : fuites, tuiles cassées, gouttières bouchées, mousse importante. Une intervention rapide évite des dégâts plus importants et coûteux. Les urgences sont traitées 24h/24.`
        }
      },
      {
        "@type": "Question",
        name: `Un couvreur à ${commune.name} peut-il intervenir en urgence ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Oui, ${artisan ? `${artisan.companyName} propose un service d'urgence 24h/24 et 7j/7` : 'les couvreurs professionnels proposent des interventions d\'urgence'} pour les fuites et dégâts importants à ${commune.name}. En cas d'urgence, contactez rapidement un professionnel pour limiter les dégâts.`
        }
      },
      {
        "@type": "Question",
        name: `Quelles assurances vérifier chez un couvreur à ${commune.name} ?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Vérifiez que votre couvreur à ${commune.name} possède une assurance responsabilité civile professionnelle et une garantie décennale. Ces assurances vous protègent en cas de dommages et couvrent les travaux pendant 10 ans.`
        }
      }
    ]
  }

  // Separate BreadcrumbList schema
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
        name: commune.department_name,
        item: `https://www.couvreur-groupefrance.com/departement/${commune.department_slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: commune.name,
        item: `https://www.couvreur-groupefrance.com/commune/${param.slug}`,
      },
    ],
  }

  // Separate Service schema for better SEO
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Services de couverture à ${commune.name}`,
    description: `Services professionnels de couverture et toiture à ${commune.name}`,
    provider: {
      "@type": "LocalBusiness",
      name: artisan ? artisan.companyName : `Service de couverture ${commune.name}`,
    },
    areaServed: {
      "@type": "City",
      name: commune.name,
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
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Travaux de zinguerie",
            description: `Travaux de zinguerie professionnels à ${commune.name}`,
          },
        },
      ],
    },
  }
  return (
      <div className="min-h-screen">
        <Header/>
        <main>
          {/* Breadcrumb - Version améliorée */}
          <section className="py-3 bg-white border-b border-slate-200">
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
                <Link href={`/departement/${commune.department_slug}`}
                      className="text-slate-500 hover:text-amber-600 transition-colors">
                  {commune.department_name}
                </Link>
                <span className="mx-2 text-slate-400">/</span>
                <span className="text-slate-900 font-medium">{commune.name}</span>
              </div>
            </div>
          </section>

          {/* Hero Section - Design moderne */}
          <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <Link
                    href={`/departement/${commune.department_slug}`}
                    className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2"/>
                  Retour au {commune.department_name}
                </Link>

                <div className="flex items-center justify-center mb-6">
                  <MapPin className="h-6 w-6 text-amber-400 mr-3"/>
                  <span className="text-amber-100 font-medium">{commune.department_name}</span>
                </div>

                <h1 className="font-serif font-bold text-4xl lg:text-6xl text-white mb-6">
                  Couvreur à <span className="text-amber-400">{commune.name}</span>
                </h1>

                <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                  {artisan
                      ? `${artisan.companyName} vous accompagne pour tous vos travaux de couverture`
                      : "Trouvez rapidement un couvreur professionnel"
                  } à {commune.name} et dans tout le {commune.department_name}.
                </p>

                {artisan && (
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                      <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <Shield className="h-4 w-4 text-amber-400 mr-2"/>
                        <span className="text-white text-sm">Certifié RGE</span>
                      </div>
                      <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <Clock className="h-4 w-4 text-amber-400 mr-2"/>
                        <span className="text-white text-sm">Intervention 24h</span>
                      </div>
                      <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <Award className="h-4 w-4 text-amber-400 mr-2"/>
                        <span className="text-white text-sm">Devis gratuit</span>
                      </div>
                    </div>
                )}

                {artisan ? (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <a
                          href={`tel:${artisan.phone}`}
                          className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <Phone className="h-5 w-5 mr-3"/>
                        Appeler maintenant
                      </a>
                      <a
                          href="#contact"
                          className="inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 border border-white/20"
                      >
                        <Mail className="h-5 w-5 mr-3"/>
                        Demander un devis
                      </a>
                    </div>
                ) : (
                    <>
                    </>
                )}
              </div>
            </div>
          </section>

          {/* Artisan Section - Design moderne */}
          {artisan ? (
              <section id="contact" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                      <h2 className="font-serif font-bold md:text-4xl text-slate-900 mb-6">
                        Votre couvreur de confiance, intervenant dans toute la commune de {commune.name}, pour vos
                        travaux de toiture.
                      </h2>
                      <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        {artisan.companyName} vous propose une expertise reconnue et un service de qualité
                        pour tous vos projets de couverture dans le {commune.department_name}.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                      <div className="space-y-8">
                        <ArtisanCard artisan={artisan}/>
                      </div>

                      <div id={"devis"} className="lg:sticky lg:top-8">
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8">
                          <div className="text-center mb-6">
                            <h3 className="font-serif font-bold text-2xl text-slate-900 mb-2">
                              Demandez votre devis
                            </h3>
                            <p className="text-slate-600">
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
              <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-slate-50 rounded-2xl p-12">
                      <div
                          className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MapPin className="h-8 w-8 text-slate-500"/>
                      </div>
                      <h2 className="font-serif font-bold text-3xl text-slate-900 mb-4">
                        Service de couverture à {commune.name}
                      </h2>
                      <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        Nous recherchons actuellement un couvreur qualifié pour desservir {commune.name} et le{" "}
                        {commune.department_name}. En attendant, nous pouvons vous mettre en relation avec des
                        professionnels des communes voisines.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
          )}


          {/* Contenu informatif rotatif */}
          <section className="py-16 bg-white" itemScope itemType="https://schema.org/Service">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Title avec structure SEO optimisée */}
                <header className="text-center mb-12">
                  <h2 className="font-serif font-bold text-3xl lg:text-4xl text-slate-900 mb-4" itemProp="name">
                    {rotatingContent.title}
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
                  <p className="text-slate-600 mt-6 text-lg leading-relaxed max-w-2xl mx-auto" itemProp="description">
                    {getIntroText(commune.name, rotatingContent.sections.length)}
                  </p>
                </header>

                {/* Sections avec structure enrichie */}
                <div className="space-y-8 lg:space-y-12">
                  {rotatingContent.sections.map((section, index) => {
                    const isEven = index % 2 === 0;
                    const IconComponent = getSectionIcon(section.title, index);

                    return (
                        <article
                            key={index}
                            className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl ${
                                isEven
                                    ? 'bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-150'
                                    : 'bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100'
                            }`}
                            itemScope
                            itemType="https://schema.org/Article"
                        >
                          {/* Layout avec image et contenu */}
                          <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0`}>

                            {/* Section Image */}
                            <div className="lg:w-1/2">
                              <div className="relative h-64 lg:h-full overflow-hidden">
                                <img
                                    src={section.image}
                                    alt={section.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                {/* Overlay gradient pour améliorer la lisibilité */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                                {/* Badge avec icône flottant sur l'image */}
                                <div
                                    className={`absolute top-4 ${isEven ? 'left-4' : 'right-4'} p-3 rounded-xl backdrop-blur-sm ${
                                        isEven
                                            ? 'bg-slate-900/20 text-white'
                                            : 'bg-amber-900/20 text-white'
                                    }`}>
                                  <IconComponent size={24}/>
                                </div>
                              </div>
                            </div>

                            {/* Section Contenu */}
                            <div className="lg:w-1/2">
                              <div className="p-6 md:p-8 lg:p-10 h-full flex flex-col justify-center">
                                {/* Décoration visuelle */}
                                <div
                                    className={`absolute top-4 ${isEven ? 'right-4' : 'left-4'} w-20 h-20 opacity-10 transform rotate-12 ${
                                        isEven ? 'text-slate-400' : 'text-amber-400'
                                    } hidden lg:block`}>
                                  <IconComponent size={80}/>
                                </div>

                                <div className="relative">
                                  {/* Titre de la section */}
                                  <h3 className="font-serif font-bold text-xl lg:text-2xl text-slate-900 mb-4 group-hover:text-amber-700 transition-colors"
                                      itemProp="headline">
                                    {section.title}
                                  </h3>

                                  <div className={`w-16 h-0.5 ${
                                      isEven ? 'bg-slate-400' : 'bg-amber-400'
                                  } rounded-full mb-6`}></div>

                                  {/* Contenu de la section */}
                                  <p className="text-slate-700 leading-relaxed text-base lg:text-lg mb-6"
                                     itemProp="text">
                                    {section.content}
                                  </p>

                                  {/* CTA contextuel pour la première section */}
                                  {index === 0 && (
                                      <div className="mt-6 p-4 bg-white/60 rounded-xl border border-slate-200/50">
                                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                          <div>
                                            <p className="font-semibold text-slate-800 mb-1">
                                              Besoin d'un devis personnalisé ?
                                            </p>
                                            <p className="text-sm text-slate-600">
                                              Intervention rapide à {commune.name} et alentours
                                            </p>
                                          </div>
                                          <button
                                              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
                                            <a href={"#devis"}>Demander un devis</a>
                                          </button>
                                        </div>
                                      </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                    );
                  })}
                </div>

                {/* Section conclusion avec variations */}
                <footer className="mt-16 text-center">
                  <div className="bg-gradient-to-r from-slate-100 to-amber-50 rounded-2xl p-8">
                    <h3 className="font-serif font-bold text-xl text-slate-900 mb-4">
                      {getConclusionTitle(commune.name)}
                    </h3>
                    <p className="text-slate-700 leading-relaxed max-w-2xl mx-auto">
                      {getConclusionText(commune.name, rotatingContent.sections.length)}
                    </p>
                    <div className="flex justify-center items-center gap-6 mt-6 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Disponible 7j/7
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Devis gratuit
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Garantie décennale
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </section>

          <div className="bg-white rounded-2xl  p-8">
            <h3 className="font-serif font-bold text-2xl text-center text-slate-900 mb-8">
              Services de couverture à {commune.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                `Couvreur ${commune.name}`,
                `Artisan couvreur ${commune.name}`,
                `Entreprise de couverture ${commune.name}`,
                `Travaux de couverture ${commune.name}`,
                `Travaux de zinguerie ${commune.name}`,
                `SOS fuite toiture ${commune.name}`,
                `Rénovation de toiture  ${commune.name}`,
                `Isolation de toiture ${commune.name}`,
                `Démoussage de toiture ${commune.name}`,
                `Réparation de toiture  ${commune.name}`,
                `Réfection de toiture  ${commune.name}`,
                `Remplacement d'éléments en  ${commune.name}`,
                `Étanchéité toiture  ${commune.name}`,
                `Pose de couverture  ${commune.name}`,
                `Pose de gouttière en  ${commune.name}`,
                `Remplacement de gouttière  ${commune.name}`,
                `Prestation zingueur  ${commune.name}`,
                `Traitement charpente  ${commune.name}`,
                `Pose de fenêtre de toit  ${commune.name}`,
                `Etanchéité toit et terrasse  ${commune.name}`,
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


          {/* Localisation Section - Design épuré */}
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-serif font-bold text-3xl text-slate-900 mb-4">
                    Localisation à {commune.name}
                  </h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Découvrez la position géographique de {commune.name} dans le {commune.department_name}
                  </p>
                </div>

                {/* Carte avec bordure moderne */}
                <div className="bg-white rounded-2xl  overflow-hidden mb-8">
                  <CarteCommune
                      nomCommune={commune.name}
                      departement={commune.department_name}
                      artisanNom={artisan?.companyName}
                  />
                </div>

                <section className="py-16 bg-slate-50">
                  <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                      <div className="text-center mb-12">
                        <h2 className="font-serif font-bold text-3xl text-slate-900 mb-4">
                          Météo à {commune.name}
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                          Consultez les prévisions pour planifier vos travaux de couverture
                        </p>
                      </div>

                      <div className="grid grid-cols-1  gap-8">
                        <MeteoCommune
                            nomCommune={commune.name}
                            departement={commune.department_name}
                        />

                      </div>
                    </div>
                  </div>
                </section>

                <div className="md:hidden space-y-4">
                  <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg">
                        <MapPin className="h-5 w-5 text-amber-600"/>
                      </div>
                      <span className="font-semibold text-slate-900">Commune</span>
                    </div>
                    <p className="text-slate-600 truncate font-medium">{commune.name}</p>
                  </div>

                  <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                        <Shield className="h-5 w-5 text-blue-600"/>
                      </div>
                      <span className="font-semibold text-slate-900">Département</span>
                    </div>
                    <p className="text-slate-600 truncate font-medium">{commune.department_name}</p>
                  </div>

                  <div className="flex items-center justify-between p-4 border-b border-slate-200">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                        <Star className="h-5 w-5 text-orange-600"/>
                      </div>
                      <span className="font-semibold  text-slate-900">Zone</span>
                    </div>
                    <p className="text-slate-600 truncate font-medium">{commune.name} + 20km</p>
                  </div>
                </div>

                {/* Version desktop originale (masquée sur mobile) */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div
                      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-lg mb-4 mx-auto">
                      <MapPin className="h-6 w-6 text-amber-600"/>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-center">Commune</h3>
                    <p className="text-slate-600 text-center text-lg font-medium">{commune.name}</p>
                  </div>

                  <div
                      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
                      <Shield className="h-6 w-6 text-blue-600"/>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-center">Département</h3>
                    <p className="text-slate-600 text-center text-lg font-medium">{commune.department_name}</p>
                  </div>

                  <div
                      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4 mx-auto">
                      <Star className="h-6 w-6 text-orange-600"/>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 text-center">Zone d'intervention</h3>
                    <p className="text-slate-600 text-center text-lg font-medium">
                      {commune.name} + 20km
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section pour les artisans */}
          <section className="py-20 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif font-bold text-4xl text-white mb-6">
                  Vous êtes couvreur à {commune.name} ?
                </h2>
                <p className="text-amber-100 text-xl mb-8 leading-relaxed">
                  Rejoignez notre réseau d&apos;artisans qualifiés et développez votre activité dans
                  le {commune.department_name}.
                  Inscription gratuite et sans engagement.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                      href="mailto:groupcouvreurfrance@gmail.com?subject=Inscription &body=Bonjour,%0D%0A%0D%0AJe souhaiterais obtenir des informations concernant l'inscription en tant que couvreur.%0D%0A%0D%0ACordialement"
                      className="flex items-center space-x-2 bg-white text-amber-700 hover:bg-amber-50 px-6 py-3 text-lg font-medium rounded-md"
                  >
                    Inscription gratuite
                  </a>
                </div>
              </div>
            </div>
          </section>

        </main>
        <Footer/>

        {/* Fixed JSON-LD scripts - separate for better validation */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd)}}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(serviceJsonLd)}}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(personJsonLd)}}
        />
      </div>
  )
}