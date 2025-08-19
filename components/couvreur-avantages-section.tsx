import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Euro, Users, MapPin, Calendar, FileText } from "lucide-react"

const avantages = [
    {
        icon: Euro,
        title: "Artisan Couvreur Pas Cher",
        description: "Tarifs compétitifs sans compromis sur la qualité",
        badge: "Prix Transparent",
    },
    {
        icon: CheckCircle,
        title: "Couvreur Certifié",
        description: "Tous nos artisans sont certifiés et qualifiés RGE",
        badge: "Qualifié RGE",
    },
    {
        icon: Users,
        title: "Couvreur Expérimenté",
        description: "Plus de 15 ans d'expérience en travaux de couverture",
        badge: "15+ ans",
    },
    {
        icon: MapPin,
        title: "Couverture Nationale",
        description: "Réseau d'artisans couvreurs dans toute la France",
        badge: "Partout en France",
    },
    {
        icon: Calendar,
        title: "Travaux Garantis",
        description: "Garantie décennale sur tous nos travaux de couverture",
        badge: "Garantie 10 ans",
    },
    {
        icon: FileText,
        title: "Devis Couvreur Gratuit",
        description: "Estimation gratuite et sans engagement sous 24h",
        badge: "100% Gratuit",
    },
]

const materiaux = [
    "Toiture en Tuiles",
    "Toiture en Ardoise",
    "Toiture Zinc",
    "Toiture Bac Acier",
    "Toiture Fibro-Ciment",
    "Toiture Végétalisée",
]

export function CouvreurAdvantagesSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="font-serif font-bold text-3xl lg:text-4xl text-slate-900 mb-6">
                            Pourquoi Choisir Nos <span className="text-amber-600">Couvreurs Professionnels</span> ?
                        </h2>
                        <p className="text-lg text-slate-600 mb-8">
                            Notre <strong>société de couverture</strong> vous garantit des travaux de qualité réalisés par des{" "}
                            <strong>spécialistes toiture</strong> expérimentés. Chaque <strong>couvreur charpentier</strong> de notre
                            réseau est sélectionné pour son expertise.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {avantages.map((avantage, index) => (
                                <Card key={index} className="border-l-4 border-l-amber-500 shadow-sm">
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-3">
                                            <avantage.icon className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-sm text-slate-900">{avantage.title}</h3>
                                                    <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                                                        {avantage.badge}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-slate-600">{avantage.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-2xl">
                        <h3 className="font-serif font-bold text-2xl text-slate-900 mb-6">Tous Types de Matériaux</h3>
                        <p className="text-slate-600 mb-6">
                            Nos <strong>couvreurs qualifiés</strong> maîtrisent tous les matériaux de couverture pour répondre à vos
                            besoins spécifiques.
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            {materiaux.map((materiau, index) => (
                                <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                                    <CheckCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                                    <span className="text-sm font-medium text-slate-700">{materiau}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <h4 className="font-semibold text-amber-800 mb-2">Traitement de Toiture Inclus</h4>
                            <p className="text-sm text-amber-700">
                                Hydrofuge, anti-mousse, et protection longue durée pour tous nos travaux.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}