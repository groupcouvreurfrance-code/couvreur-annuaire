import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Wrench, Droplets, Thermometer, Brush, HardHat, ArrowRight } from "lucide-react"

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
                <div className="text-center mb-16">
                    <h2 className="font-serif font-bold text-3xl lg:text-4xl text-slate-900 mb-4">Nos Services de Couverture</h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Entreprise de couverture spécialisée dans tous types de <strong>travaux de couverture</strong>. Nos{" "}
                        <strong>couvreurs zingueurs</strong> interviennent sur toute la France.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {services.map((service, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-emerald-100 rounded-lg">
                                        <service.icon className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 mb-4">{service.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {service.keywords.map((keyword, idx) => (
                                        <span key={idx} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">
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
