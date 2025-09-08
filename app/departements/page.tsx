import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import {Metadata} from "next";
import { MapPin, ArrowRight, Building, Users, Shield, Star } from "lucide-react"
import departmentsData from "../../public/data/departments-data.json"
interface DepartementsPageProps {
  searchParams: { page?: string }
}

export const metadata: Metadata = {
  title: "Couvreurs par Département France ",
  description: "🏠 Trouvez un couvreur qualifié dans tous les départements français. ✅ Artisans certifiés ✅ Devis gratuit ✅ Intervention rapide. Plus de 95 départements couverts.",
  keywords: [
    "couvreur par département",
    "artisan couvreur France",
    "couverture toiture département",
    "liste couvreurs France",
    "trouvez couvreur local",
    "entreprise couverture région",
    "artisan toiture qualifié",
    "devis couvreur gratuit",
    "réparation toiture département",
    "couvreurs certifiés France",
  ],
  authors: [{ name: "Couvreur Groupe France" }],
  creator: "Couvreur Groupe France",
  publisher: "Couvreur Groupe France",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.couvreur-groupefrance.com"),
  alternates: {
    canonical: "https://www.couvreur-groupefrance.com/departements",
  },
  openGraph: {
    title: "Couvreurs par Département | Artisans Qualifiés dans toute la France",
    description: "Trouvez un couvreur professionnel près de chez vous. Plus de 95 départements couverts. Devis gratuit et intervention rapide.",
    url: "https://www.couvreur-groupefrance.com/departements",
    siteName: "Couvreur Groupe France",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "https://www.couvreur-groupefrance.com/images/couvreurs-france-carte.jpg",
        width: 1200,
        height: 630,
        alt: "Carte des couvreurs par département en France",
        type: "image/jpeg",
      },
      {
        url: "https://www.couvreur-groupefrance.com/images/artisan-couvreur-france.jpg",
        width: 1200,
        height: 800,
        alt: "Artisan couvreur professionnel travaillant sur une toiture",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Couvreurs par Département | Artisans Qualifiés France",
    description: "Trouvez un couvreur professionnel dans votre département. Devis gratuit et intervention rapide.",
    images: ["https://www.couvreur-groupefrance.com/images/couvreurs-france-carte.jpg"],
    creator: "@CouvreurFrance",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    "geo.region": "FR",
    "geo.country": "FR",
    "geo.placename": "France",
    "DC.title": "Couvreurs par Département en France",
    "DC.description": "Annuaire des couvreurs professionnels par département français",
    "DC.language": "fr",
    "DC.coverage": "France",
    "DC.subject": "Couverture, Toiture, Artisan, Bâtiment, Département",
  },
}

export default async function DepartementsPage({ searchParams }: DepartementsPageProps) {
  // On récupère TOUS les départements d'un coup (pas de pagination)
  const allDepartments = departmentsData // ou departmentsData selon la structure de votre JSON
  const total = allDepartments.length

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

  // JSON-LD pour la page de liste des départements
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.couvreur-groupefrance.com/departements",
    name: "Couvreurs par Département en France",
    description: "Annuaire des couvreurs professionnels dans tous les départements français",
    url: "https://www.couvreur-groupefrance.com/departements",
    mainEntity: {
      "@type": "ItemList",
      name: "Liste des départements avec couvreurs",
      numberOfItems: total,
      itemListOrder: "Ascending",
      itemListElement: allDepartments.map((dept, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${dept.name} (${dept.code})`,
        url: `https://www.couvreur-groupefrance.com/departement/${dept.slug}`,
        description: `Couvreur professionnel dans le ${dept.name}`,
      }))
    },
    provider: {
      "@type": "Organization",
      name: "Couvreur Groupe France",
      url: "https://www.couvreur-groupefrance.com",
    },
    about: {
      "@type": "Service",
      name: "Services de couverture et toiture",
      serviceType: "Couvreur",
      areaServed: {
        "@type": "Country",
        name: "France"
      }
    }
  }

  // BreadcrumbList JSON-LD
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
    ],
  }

  return (
      <div className="min-h-screen">
        <Header />
        <main>
          {/* Breadcrumb */}
          <section className="py-2 bg-white border-b border-slate-200">
            <div className="container mx-auto px-4">
              <div className="flex items-center text-sm">
                <Link href="/" className="text-slate-500 hover:text-amber-600 transition-colors">
                  Accueil
                </Link>
                <span className="mx-2 text-slate-400">/</span>
                <span className="text-slate-900 font-medium">Départements</span>
              </div>
            </div>
          </section>

          {/* Hero Section optimisée */}
          <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-amber-400 mr-2" />
                  <span className="text-amber-100 font-medium">Couverture France</span>
                </div>

                <h1 className="font-serif font-bold text-4xl lg:text-5xl text-white mb-6">
                  Trouvez votre <span className="text-amber-400">couvreur</span><br />
                  par département
                </h1>

                <p className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Découvrez notre réseau d'artisans couvreurs qualifiés dans tous les départements français.
                  Devis gratuit, intervention rapide et savoir-faire local.
                </p>

                {/* Points forts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                  <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <Shield className="h-6 w-6 text-amber-400 flex-shrink-0" />
                    <div className="text-white">
                      <div className="font-semibold text-sm">Artisans Certifiés</div>
                      <div className="text-amber-100 text-xs">Qualifiés et assurés</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <Star className="h-6 w-6 text-amber-400 flex-shrink-0" />
                    <div className="text-white">
                      <div className="font-semibold text-sm">Devis Gratuit</div>
                      <div className="text-amber-100 text-xs">Sans engagement</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <Building className="h-6 w-6 text-amber-400 flex-shrink-0" />
                    <div className="text-white">
                      <div className="font-semibold text-sm">{total} Départements</div>
                      <div className="text-amber-100 text-xs">Couverture nationale</div>
                    </div>
                  </div>
                </div>

                <div className="text-amber-100 text-lg">
                  Sélectionnez votre département ci-dessous
                </div>
              </div>
            </div>
          </section>

          {/* Section principale avec liste des départements */}
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-serif font-bold text-3xl text-slate-900 mb-4">
                  Couvreurs par département français
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Choisissez votre département pour découvrir nos artisans couvreurs locaux,
                  leurs spécialités et obtenir un devis personnalisé.
                </p>
                <div className="text-amber-600 font-semibold mt-4">
                  {total} départements disponibles
                </div>
              </div>

              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rangeOrder.map(range => {
                    if (!groupedDepartments[range]) return null

                    const getRangeTitle = (range: string) => {
                      switch(range) {
                        case '01-20': return 'Nord & Île-de-France'
                        case '21-40': return 'Nord-Est & Centre'
                        case '41-60': return 'Centre & Nord'
                        case '61-80': return 'Ouest & Nord-Ouest'
                        case '81-95': return 'Sud & Sud-Ouest'
                        case '96+': return 'Outre-Mer'
                        default: return range
                      }
                    }

                    return (
                        <div id={"departements"} key={range} className="bg-white rounded-xl border border-slate-200 hover:shadow-xl transition-shadow duration-300">
                          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-4 rounded-t-xl">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-bold text-lg mb-1">
                                  {range}
                                </h3>
                                <div className="text-amber-100 text-sm">
                                  {getRangeTitle(range)}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold">
                                  {groupedDepartments[range].length}
                                </div>
                                <div className="text-amber-100 text-xs">
                                  département{groupedDepartments[range].length > 1 ? 's' : ''}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div  className="p-4">
                            <div className="grid grid-cols-1 gap-1">
                              {groupedDepartments[range].map((dept) => (
                                  <Link key={dept.code} href={`/departement/${dept.slug}`}>
                                    <div className="flex items-center justify-between px-3 py-2 md:px-4 md:py-3 hover:bg-amber-50 rounded-lg transition-all duration-200 group cursor-pointer border border-transparent hover:border-amber-200">
                                      <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                                        <span className="flex-shrink-0 w-8 h-6 md:w-10 md:h-7 bg-amber-100 rounded text-amber-700 font-mono text-xs md:text-sm font-bold flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                                          {dept.code}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                          <span className="font-semibold text-xs md:text-sm text-slate-900 group-hover:text-amber-700 block truncate transition-colors">
                                            {dept.name}
                                          </span>
                                          <span className="text-xs md:text-xs text-slate-500 group-hover:text-amber-600">
                                            Couvreur disponible
                                          </span>
                                        </div>
                                      </div>
                                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
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

          {/* Section informative SEO */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif font-bold text-3xl text-slate-900 mb-8 text-center">
                  Pourquoi choisir nos couvreurs départementaux ?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-slate-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Shield className="h-8 w-8 text-amber-600 mr-3" />
                      <h3 className="font-bold text-xl text-slate-900">Expertise Locale</h3>
                    </div>
                    <p className="text-slate-700">
                      Nos artisans couvreurs connaissent parfaitement les spécificités climatiques et
                      architecturales de leur département. Ils utilisent les matériaux et techniques
                      les mieux adaptés à votre région.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Star className="h-8 w-8 text-amber-600 mr-3" />
                      <h3 className="font-bold text-xl text-slate-900">Qualité Garantie</h3>
                    </div>
                    <p className="text-slate-700">
                      Tous nos partenaires couvreurs sont certifiés, assurés et régulièrement contrôlés.
                      Ils respectent les normes en vigueur et offrent des garanties sur leurs interventions.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Users className="h-8 w-8 text-amber-600 mr-3" />
                      <h3 className="font-bold text-xl text-slate-900">Service Personnalisé</h3>
                    </div>
                    <p className="text-slate-700">
                      Chaque projet de toiture est unique. Nos couvreurs établissent un diagnostic précis
                      et vous proposent des solutions sur mesure adaptées à vos besoins et votre budget.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <Building className="h-8 w-8 text-amber-600 mr-3" />
                      <h3 className="font-bold text-xl text-slate-900">Proximité</h3>
                    </div>
                    <p className="text-slate-700">
                      Avec des artisans dans chaque département, vous bénéficiez d'une intervention rapide,
                      d'un suivi de qualité et d'un service après-vente de proximité.
                    </p>
                  </div>
                </div>

                {/* Section services */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl overflow-hidden">
                  {/* Section image en haut */}
                  <div className="relative h-64 md:h-56 lg:h-64">
                    <img
                        src="/images/couvreur/couvreur-1.jpg"
                        alt="Services de couverture - Couvreur professionnel"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    {/* Overlay léger pour améliorer le contraste */}
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>

                  {/* Titre et description sous l'image */}
                  <div className="p-8 pb-6">
                    <div className="text-center mb-8">
                      <h3 className="font-serif font-bold text-2xl lg:text-3xl text-slate-900 mb-3">
                        Services de couverture dans tous les départements
                      </h3>
                      <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mb-4"></div>
                      <p className="text-slate-600 max-w-2xl mx-auto">
                        Notre expertise au service de votre toiture : de la construction neuve aux réparations d'urgence
                      </p>
                    </div>

                    {/* Grille des services */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white/50 rounded-xl p-6 hover:bg-white/70 transition-colors group">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mr-3 group-hover:bg-amber-600 transition-colors">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                            </svg>
                          </div>
                          <h4 className="font-bold text-lg text-slate-900 group-hover:text-amber-700 transition-colors">Toiture neuve</h4>
                        </div>
                        <ul className="space-y-2 text-slate-700">
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                            Pose de toiture complète
                          </li>
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                            Charpente traditionnelle
                          </li>
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                            Étanchéité
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white/50 rounded-xl p-6 hover:bg-white/70 transition-colors group">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mr-3 group-hover:bg-amber-600 transition-colors">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                            </svg>
                          </div>
                          <h4 className="font-bold text-lg text-slate-900 group-hover:text-amber-700 transition-colors">Rénovation</h4>
                        </div>
                        <ul className="space-y-2 text-slate-700">
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                            Réfection de toiture
                          </li>
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                            Remplacement de tuiles
                          </li>
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                            Traitement anti-mousse
                          </li>
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                            Nettoyage de toiture
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white/50 rounded-xl p-6 hover:bg-white/70 transition-colors group">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-600 transition-colors">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                            </svg>
                          </div>
                          <h4 className="font-bold text-lg text-slate-900 group-hover:text-red-700 transition-colors">Urgences</h4>
                        </div>
                        <ul className="space-y-2 text-slate-700">
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                            Réparation de fuite
                          </li>
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                            Bâchage d'urgence
                          </li>
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                            Dépannage rapide
                          </li>
                          <li className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                            Intervention 7j/7
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Section CTA en bas */}
                    <div className="mt-8 text-center">
                      <p className="text-slate-600 mb-4 text-lg">
                        Intervention rapide sur toute la région
                      </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-serif font-bold text-3xl text-slate-900 mb-12 text-center">
                  Questions fréquentes
                </h2>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-900 mb-3">
                      Comment choisir un couvreur dans mon département ?
                    </h3>
                    <p className="text-slate-700">
                      Sélectionnez votre département dans la liste ci-dessus. Vous découvrirez les couvreurs
                      disponibles dans votre zone, leurs spécialités et pourrez demander un devis gratuit.
                      Tous nos partenaires sont certifiés et disposent des assurances nécessaires.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-900 mb-3">
                      Les devis sont-ils vraiment gratuits ?
                    </h3>
                    <p className="text-slate-700">
                      Oui, tous nos partenaires couvreurs proposent des devis entièrement gratuits et sans
                      engagement. Le devis détaille les travaux nécessaires, les matériaux utilisés et
                      les délais d'intervention.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-900 mb-3">
                      Quels types de toitures nos couvreurs traitent-ils ?
                    </h3>
                    <p className="text-slate-700">
                      Nos artisans couvreurs interviennent sur tous types de toitures : tuiles, ardoises,
                      zinc, bac acier, toitures plates, chaume... Ils maîtrisent aussi bien les techniques
                      traditionnelles que les innovations modernes.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-900 mb-3">
                      En cas d'urgence, quel est le délai d'intervention ?
                    </h3>
                    <p className="text-slate-700">
                      En cas de fuite ou de dégât urgent, nos couvreurs s'efforcent d'intervenir dans les
                      24-48h selon la disponibilité et la localisation. Un bâchage d'urgence peut souvent
                      être réalisé le jour même pour sécuriser votre toiture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA final */}
          <section className="py-16 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-serif font-bold text-3xl lg:text-4xl text-white mb-6">
                  Trouvez votre couvreur dès maintenant
                </h2>
                <p className="text-amber-100 text-xl mb-8 leading-relaxed">
                  Sélectionnez votre département et obtenez un devis gratuit
                  pour vos travaux de toiture
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                      href="#departements"
                      className="inline-flex items-center bg-white text-amber-700 hover:bg-amber-50 px-8 py-4 text-lg font-semibold rounded-lg transition-colors"
                  >
                    <MapPin className="h-5 w-5 mr-2"/>
                    Choisir mon département
                  </a>
                  <a
                      href="tel:+33123456789"
                      className="inline-flex items-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-700 px-8 py-4 text-lg font-semibold rounded-lg transition-colors"
                  >
                    Appeler directement
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />

        {/* JSON-LD Scripts */}
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbJsonLd)}}
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
      </div>
  )
}