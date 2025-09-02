import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Wrench, Droplets, Thermometer, Brush, HardHat } from "lucide-react"

const services = [
    {
        icon: Home,
        title: "Rénovation de Toiture",
        description: "Rénovation complète de votre toiture avec matériaux de qualité",
        keywords: ["rénovation toiture", "remplacement toiture", "toiture neuve"],
    },
    {
        icon: Wrench,
        title: "Réparation de Toiture",
        description: "Réparation rapide de fuites, tuiles cassées et problèmes d'étanchéité",
        keywords: ["réparation toiture", "fuite toiture", "tuiles cassées"],
    },
    {
        icon: Droplets,
        title: "Étanchéité Toiture",
        description: "Solutions d'étanchéité pour toitures terrasses et toitures plates",
        keywords: ["étanchéité toiture", "toiture terrasse", "membrane étanche"],
    },
    {
        icon: Thermometer,
        title: "Isolation Toiture",
        description: "Amélioration de l'isolation thermique et phonique de votre toiture",
        keywords: ["isolation toiture", "isolation thermique", "économies énergie"],
    },
    {
        icon: Brush,
        title: "Nettoyage & Démoussage",
        description: "Nettoyage professionnel et démoussage pour prolonger la durée de vie",
        keywords: ["nettoyage toiture", "démoussage toiture", "entretien toiture"],
    },
    {
        icon: HardHat,
        title: "Pose de Toiture",
        description: "Installation de toitures neuves : tuiles, ardoises, zinc, bac acier",
        keywords: ["pose toiture", "toiture tuiles", "toiture ardoise"],
    },
]

export function CouvreurServicesSection() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="font-serif font-bold text-3xl lg:text-4xl text-slate-900 mb-4">Nos Services de Couverture</h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Entreprise de couverture spécialisée dans tous types de <strong>travaux de couverture</strong>. Nos{" "}
                        <strong>couvreurs zingueurs</strong> interviennent sur toute la France.
                    </p>
                </div>

                {/* Mobile Image */}
                <div className="block lg:hidden mb-8">
                    <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2012.36.29_284bbe7b.jpg-wHVYXq6HcbrTlrU79t7zq5U2nMVtoJ.jpeg"
                        alt="Couvreur installant des tuiles bleues"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                </div>

                <div className="hidden lg:flex gap-12 items-start mb-12">
                    {/* Left side - Image */}
                    <div className="flex-1">
                        <div className="relative">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2012.36.29_284bbe7b.jpg-wHVYXq6HcbrTlrU79t7zq5U2nMVtoJ.jpeg"
                                alt="Couvreur installant des tuiles bleues"
                                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl"></div>
                        </div>
                    </div>

                    {/* Right side - Services Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {services.map((service, index) => (
                                <Card
                                    key={index}
                                    className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-white/95 backdrop-blur-sm"
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl shadow-sm">
                                                <service.icon className="h-5 w-5 text-amber-600" />
                                            </div>
                                            <CardTitle className="text-lg text-slate-900 font-semibold">{service.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <p className="text-slate-600 mb-3 text-sm leading-relaxed">{service.description}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {service.keywords.slice(0, 2).map((keyword, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-medium"
                                                >
                          {keyword}
                        </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6 mb-12">
                    {services.map((service, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md bg-white">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-amber-100 rounded-lg">
                                        <service.icon className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 mb-4">{service.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {service.keywords.map((keyword, idx) => (
                                        <span key={idx} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
