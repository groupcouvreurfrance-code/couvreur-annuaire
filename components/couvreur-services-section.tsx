import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Wrench, Droplets, Thermometer, Brush, HardHat, ArrowRight, Phone, Mail, MapPin, CheckCircle } from "lucide-react"

const services = [
    {
        icon: Home,
        title: "Rénovation et Restauration",
        shortTitle: "Rénovation",
        description: "Rénovation complète et restauration du patrimoine avec matériaux haute qualité et techniques modernes adaptées",
        keywords: ["rénovation toiture", "restauration patrimoine", "création toiture"],
        details: "Redonnez à votre toiture tout son éclat grâce à notre savoir-faire expert"
    },
    {
        icon: Wrench,
        title: "Réparation Expert",
        shortTitle: "Réparation",
        description: "Réparation rapide pour fuites, tuiles cassées et problèmes d'étanchéité sur chantier sécurisé",
        keywords: ["réparation toiture", "intervention rapide", "chantier sécurisé"],
        details: "Service d'urgence pour protéger votre habitation dans les temps impartis"
    },
    {
        icon: Droplets,
        title: "Étanchéité & Évacuation",
        shortTitle: "Étanchéité",
        description: "Solutions d'étanchéité professionnelles pour toitures terrasses, goutières et cheneaux",
        keywords: ["étanchéité toiture", "évacuation eaux", "goutières"],
        details: "Protection durable contre l'eau et les intempéries"
    },
    {
        icon: Brush,
        title: "Nettoyage & Entretien",
        shortTitle: "Entretien",
        description: "Nettoyage professionnel et démoussage pour assurer durabilité et longévité",
        keywords: ["nettoyage toiture", "entretien", "démoussage"],
        details: "Préservation de tous les éléments de votre structure"
    },
    {
        icon: HardHat,
        title: "Pose & Construction",
        shortTitle: "Construction",
        description: "Installation toitures neuves : tuiles, ardoise, zinc, bac acier avec charpente adaptée",
        keywords: ["pose toiture", "construction neuve", "charpente"],
        details: "Expertise complète avec garantie décennale"
    },
]

const servicesExtendus = [
    "Couverture Zinguerie Charpente",
    "Goutières et Cheneaux",
    "Charpente Bois Sur-Mesure",
    "Panneaux Solaires",
    "Zinguerie Traditionnelle"
]



export default function CouvreurServicesSection() {
    return (
        <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Background image for larger screens */}
            <div
                className=" lg:bg-gradient-to-br lg:from-slate-900 lg:via-slate-800 lg:to-slate-900 absolute hidden lg:block inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed "
                    style={{
                        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2012.36.29_284bbe7b.jpg-wHVYXq6HcbrTlrU79t7zq5U2nMVtoJ.jpeg')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80"/>
            </div>
            <div className="absolute hidden lg:block inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/70"/>

            {/* Decorative elements */}
            <div className="absolute hidden lg:block top-20 left-10 w-20 h-20 bg-amber-500/10 rounded-full blur-xl hidden lg:block"/>
            <div className="absolute hidden lg:block bottom-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl hidden lg:block"/>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 lg:bg-amber-500/20 text-amber-800 lg:text-amber-300 rounded-full text-sm font-medium mb-4">
                        <HardHat className="w-4 h-4"/>
                        <span>Services Professionnels</span>
                    </div>

                    <h2 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-slate-900 lg:text-white mb-4 sm:mb-6 leading-tight">
                        Services Couverture
                        <span
                            className="block text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-amber-600 lg:text-amber-400 mt-2">
                            Tous Métiers du Bâtiment
                        </span>
                    </h2>

                    <p className="text-base sm:text-lg lg:text-xl text-slate-700 lg:text-slate-200 max-w-4xl mx-auto mb-6 leading-relaxed">
                        <span className="font-semibold">Entreprise de couverture</span> experte dans tous types de
                        travaux.
                    </p>


                </div>

                {/* Mobile image */}
                <div className="block lg:hidden mb-8 sm:mb-12 rounded-2xl overflow-hidden shadow-lg">
                    <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2012.36.29_284bbe7b.jpg-wHVYXq6HcbrTlrU79t7zq5U2nMVtoJ.jpeg"
                        alt="Couvreur expert installant tuiles sur chantier sécurisé"
                        className="w-full h-48 sm:h-64 object-cover"
                    />
                </div>

                {/* Services grid */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
                    {services.map((service, index) => (
                        <Card key={index}
                              className="group lg:bg-white/10 backdrop-blur-sm  hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/95 backdrop-blur-sm hover:-translate-y-1">
                            <CardHeader className="pb-3 sm:pb-4">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div
                                        className="p-2 sm:p-3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl group-hover:from-amber-200 group-hover:to-amber-300 transition-colors">
                                        <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-amber-700"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-lg sm:text-xl text-slate-900 lg:text-slate-200 leading-tight">
                                            <span className="hidden sm:inline">{service.title}</span>
                                            <span className="sm:hidden">{service.shortTitle}</span>
                                        </CardTitle>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3 sm:space-y-4">
                                <p className="text-sm sm:text-base text-slate-600  lg:text-slate-300 leading-relaxed line-clamp-3">
                                    {service.description}
                                </p>
                                <p className="text-xs sm:text-sm text-amber-700  lg:text-amber-200 font-medium italic leading-relaxed">
                                    {service.details}
                                </p>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {service.keywords.map((keyword, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 px-2 sm:px-3 py-1 rounded-full font-medium"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Extended section */}
                <div
                    className="bg-white/95 lg:bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/20 shadow-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left column */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-slate-900 lg:text-white mb-4">
                                    Excellence et Savoir-Faire
                                </h3>
                                <p className="text-sm sm:text-base text-slate-600 lg:text-slate-200 leading-relaxed mb-6">
                                    <span className="font-semibold">Découvrez</span> notre expertise dans tous les
                                    métiers
                                    de la couverture, charpente et zinguerie. Techniques éprouvées et matériaux
                                    garantissant durabilité et longévité.
                                </p>
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"/>
                                    <span
                                        className="text-sm sm:text-base text-slate-600 lg:text-slate-200 leading-relaxed">
                                        <span className="font-semibold">Structure et charpente bois</span> -
                                        Création et rénovation avec formation spécialisée
                                    </span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"/>
                                    <span
                                        className="text-sm sm:text-base text-slate-600 lg:text-slate-200 leading-relaxed">
                                        <span className="font-semibold">Zinguerie moderne</span> -
                                        Goutières et cheneaux pour évacuation optimale
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"/>
                                    <span
                                        className="text-sm sm:text-base text-slate-600 lg:text-slate-200 leading-relaxed">
                                        <span className="font-semibold">Matériaux premium</span> -
                                        Zinc et solutions modernes avec techniques avancées
                                    </span>
                                </div>
                            </div>

                            <div
                                className="bg-gradient-to-br from-amber-50 to-amber-100 lg:from-amber-500/20 lg:to-amber-600/20 rounded-xl p-4 sm:p-5 border border-amber-200/50 lg:border-amber-400/30">
                                <h4 className="font-semibold text-amber-800 lg:text-amber-300 text-sm sm:text-base mb-2 flex items-center gap-2">
                                    <MapPin className="w-4 h-4"/>
                                    Intervention Sur Tous Bâtiments
                                </h4>
                                <p className="text-xs sm:text-sm text-amber-700 lg:text-amber-200 leading-relaxed">
                                    Maisons individuelles, immeubles, construction neuve, restauration du patrimoine.
                                    Chaque chantier organisé avec sécurité et respect de l'environnement.
                                </p>
                            </div>
                        </div>

                        {/* Right column */}

                    </div>

                    {/* Bottom info */}
                    <div className="mt-8 pt-6 sm:pt-8 border-t border-slate-200 lg:border-slate-600/30">
                        <p className="text-xs sm:text-sm text-slate-600 lg:text-slate-300 text-center leading-relaxed">
                            <span className="font-semibold">Bénéficiez de notre expérience :</span> formation continue,
                            compétences certifiées, savoir-faire reconnu. Choisir notre entreprise,
                            c'est opter pour la qualité et la sécurité.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}