import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    CheckCircle,
    Euro,
    Users,
    MapPin,
    Calendar,
    FileText,
    Award,
    Clock,
    Shield,
    Phone,
    ArrowRight,
    Star,
    Mail
} from "lucide-react"

const avantages = [
    {
        icon: Euro,
        title: "Tarifs Compétitifs",
        shortTitle: "Prix Juste",
        description: "Tarifs transparents et compétitifs pour tous vos travaux, service de qualité adapté à votre besoin",
        badge: "Prix Juste",
        color: "emerald"
    },
    {
        icon: Award,
        title: "Formation Certifiée RGE",
        shortTitle: "Certifié RGE",
        description: "Artisans qualifiés RGE avec formation continue, métier certifié pour une qualité garantie",
        badge: "Certifié",
        color: "blue"
    },
    {
        icon: Users,
        title: "Équipe d'Experts",
        shortTitle: "15 ans d'expérience",
        description: "Plus de 15 ans d'expérience, compétences reconnues dans tous les métiers de la couverture",
        badge: "Experts",
        color: "purple"
    },
    {
        icon: MapPin,
        title: "Couverture Nationale",
        shortTitle: "Toute France",
        description: "Réseau de professionnels couvreurs dans toute la France, intervention rapide à votre adresse",
        badge: "National",
        color: "orange"
    },

    {
        icon: FileText,
        title: "Devis Gratuit 24h",
        shortTitle: "Devis Gratuit",
        description: "Estimation gratuite sous 24h avec informations complètes, demande sans engagement",
        badge: "Gratuit",
        color: "amber"
    },
]

const materiaux = [
    { nom: "Toiture Tuiles", detail: "Pose et restauration expert", icon: "🏠" },
    { nom: "Toiture Ardoise", detail: "Techniques traditionnelles", icon: "⚫" },
    { nom: "Toiture Zinc", detail: "Zinguerie moderne durable", icon: "🔧" },
    { nom: "Toiture Bac Acier", detail: "Construction performante", icon: "🏗️" },
    { nom: "Toiture Végétalisée", detail: "Solutions écologiques", icon: "🌱" },
    { nom: "Panneaux Solaires", detail: "Installation écologique", icon: "☀️" },
]

const servicesComplementaires = [
    { service: "Goutières & Cheneaux", detail: "Évacuation optimisée" },
    { service: "Charpente Bois", detail: "Structure sur-mesure" },
    { service: "Nettoyage Toiture", detail: "Entretien complet" },
    { service: "Zinguerie Complète", detail: "Techniques modernes" },
]



const colorVariants = {
    emerald: "from-emerald-500 to-emerald-600 bg-emerald-50 text-emerald-800 border-emerald-200",
    blue: "from-blue-500 to-blue-600 bg-blue-50 text-blue-800 border-blue-200",
    purple: "from-purple-500 to-purple-600 bg-purple-50 text-purple-800 border-purple-200",
    orange: "from-orange-500 to-orange-600 bg-orange-50 text-orange-800 border-orange-200",
    red: "from-red-500 to-red-600 bg-red-50 text-red-800 border-red-200",
    amber: "from-amber-500 to-amber-600 bg-amber-50 text-amber-800 border-amber-200",
}

export default function CouvreurAdvantagesSection() {
    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white via-slate-50 to-slate-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">



                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">

                    {/* Left column - Main content */}
                    <div className="space-y-8 lg:space-y-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6">
                                <Star className="w-4 h-4" />
                                <span>Pourquoi Nous Choisir ?</span>
                            </div>

                            <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-slate-900 mb-6 leading-tight">
                                Votre Entreprise de
                                <span className="block text-amber-600 mt-2">Couverture Professionnelle</span>
                            </h2>

                            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed mb-8">
                                Notre <span className="font-semibold text-slate-900">entreprise de couverture</span> vous garantit
                                des travaux de qualité. Chaque <span className="font-semibold text-slate-900"> charpentier</span> possède
                                une formation spécialisée et une expertise reconnue.
                            </p>
                        </div>


                        {/* Avantages grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            {avantages.map((avantage, index) => {
                                const colorClasses = colorVariants[avantage.color]
                                return (
                                    <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-1 hover:-translate-y-1 bg-white">
                                        <CardContent className="p-4 lg:p-5">
                                            <div className="flex items-start gap-3 sm:gap-4">
                                                <div className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-br ${colorClasses.split(' ')[0]} ${colorClasses.split(' ')[1]} group-hover:scale-110 transition-transform`}>
                                                    <avantage.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                                                            <span className="hidden sm:inline">{avantage.title}</span>
                                                            <span className="sm:hidden">{avantage.shortTitle}</span>
                                                        </h3>
                                                        <Badge className={`text-xs px-2 py-1 rounded-full font-medium ${colorClasses.split('bg-')[1].split(' text-')[0]} bg-${colorClasses.split('bg-')[1].split(' text-')[0]} text-${colorClasses.split('text-')[1].split(' border-')[0]} flex-shrink-0`}>
                                                            {avantage.badge}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                                        {avantage.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>

                        {/* Intervention info */}
                        <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
                            <h4 className="font-bold text-lg sm:text-xl text-slate-900 mb-4 flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-amber-600" />
                                Nos Domaines d'Intervention
                            </h4>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                                <span className="font-semibold">Intervention sur tous types de bâtiments :</span> maisons individuelles,
                                immeubles, patrimoine historique. Chaque chantier est organisé avec
                                respect des techniques et utilisation d'éléments de qualité premium.
                            </p>
                        </div>
                    </div>

                    {/* Right column - Materials & Services */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 ">
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-slate-900 mb-6">
                                    Matériaux & Techniques
                                </h3>
                                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                                    Nos <span className="font-semibold">couvreurs qualifiés</span> maîtrisent toutes les techniques
                                    et matériaux pour garantir durabilité et longévité à votre patrimoine.
                                </p>
                            </div>

                            {/* Matériaux */}
                            <div className="space-y-3">
                                <h4 className="font-semibold text-base sm:text-lg text-slate-900 mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    Types de Toitures
                                </h4>
                                <div className="grid grid-cols-1 gap-3">
                                    {materiaux.map((materiau, index) => (
                                        <div key={index} className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02] border border-slate-100">
                                            <div className="text-2xl">{materiau.icon}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-sm sm:text-base text-slate-900">
                                                    {materiau.nom}
                                                </div>
                                                <div className="text-xs sm:text-sm text-slate-600">
                                                    {materiau.detail}
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Treatment info */}
                            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 sm:p-6 border border-amber-200">
                                <h4 className="font-bold text-base sm:text-lg text-amber-900 mb-3 flex items-center gap-2">
                                    <Shield className="w-5 h-5" />
                                    Traitement & Protection
                                </h4>
                                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                                    Traitement hydrofuge, anti-mousse et protection longue durée.
                                    Évacuation des eaux optimisée avec goutières et systèmes adaptés
                                    pour garantir la longévité de vos travaux.
                                </p>
                            </div>

                            {/* Services complémentaires */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-600" />
                                    Services Complémentaires
                                </h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {servicesComplementaires.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-2 sm:p-3 bg-white rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <span className="text-xs sm:text-sm font-medium text-slate-900">
                                                    {item.service}
                                                </span>
                                                <span className="text-xs text-slate-500 ml-2">
                                                    {item.detail}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact info */}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}