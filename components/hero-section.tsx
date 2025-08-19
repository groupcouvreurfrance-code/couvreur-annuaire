"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, Award, Phone, MapPin, Star, ArrowRight, CheckCircle, Users, Zap } from "lucide-react"

export default function CouvreurHeroSection() {
    const scrollToDepartments = () => {
        const departmentsSection = document.getElementById("departements")
        if (departmentsSection) {
            departmentsSection.scrollIntoView({ behavior: "smooth" })
        }
    }

    const guarantees = [
        {
            icon: Shield,
            title: "Sécurité Garantie",
            shortTitle: "Sécurité",
            description: "Couvreurs assurés et chantiers sécurisés selon normes",
            highlight: "100% Assuré"
        },
        {
            icon: Clock,
            title: "Intervention Rapide",
            shortTitle: "24h",
            description: "Devis sous 24h et intervention programmée rapidement",
            highlight: "Devis 24h"
        },

    ]

    const services = [
        "Couverture & Rénovation",
        "Charpente Bois",
        "Zinguerie Complète",
        "Goutières & Cheneaux",
        "Panneaux Solaires"
    ]



    return (
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
            {/* Background avec parallax effect */}
            <div className="absolute inset-0 hidden lg:block">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed  "
                    style={{
                        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2012.36.46_0aeb4673.jpg-deqIqzW8CnWufRnvaFsJe2IrvGbNZ1.jpeg')`,
                    }}
                />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90" />

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-amber-500/10 rounded-full blur-xl hidden lg:block" />
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl hidden lg:block" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
                <div className="py-12 sm:py-16 lg:py-24 xl:py-32">

                    {/* Badge professionnel */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-full text-sm font-medium backdrop-blur-sm">
                            <Star className="w-4 h-4" />
                            <span>Couvreur Expert  </span>
                        </div>
                    </div>

                    {/* Titre principal */}
                    <div className="text-center mb-8 lg:mb-12">
                        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 lg:mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                                Couvreur Expert
                            </span>

                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed mb-6 lg:mb-8">
                            Trouvez votre <span className="font-semibold text-white">artisan couvreur qualifié</span> près de votre adresse.
                            <span className="font-semibold text-amber-300"> Devis gratuit</span> personnalisé,
                            travaux de couverture garantis pour tous vos projets.
                        </p>


                    </div>

                    {/* Image mobile */}
                    <div className="block lg:hidden mb-8 rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2012.36.46_0aeb4673.jpg-deqIqzW8CnWufRnvaFsJe2IrvGbNZ1.jpeg"
                            alt="Couvreur expert certifié RGE installant tuiles"
                            className="w-full h-48 sm:h-64 object-cover"
                        />
                    </div>

                    {/* CTA principal */}
                    <div className="text-center mb-12 lg:mb-16">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-8 py-4 text-base lg:text-lg rounded-xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105"
                                onClick={scrollToDepartments}
                            >
                                <Phone className="w-5 h-5 mr-2" />
                                Devis Gratuit 24h
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-6 py-4 text-base lg:text-lg bg-white/10 backdrop-blur-sm rounded-xl font-semibold transition-all duration-300"
                                onClick={scrollToDepartments}
                            >
                                <MapPin className="w-5 h-5 mr-2" />
                                Trouver un Couvreur
                            </Button>
                        </div>

                        <p className="text-sm text-slate-300 mt-4 flex items-center justify-center gap-2">
                            <span>Sans engagement • Réponse rapide • Intervention France entière</span>
                        </p>
                    </div>

                    {/* Garanties */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-12 lg:mb-16">
                        {guarantees.map((guarantee, index) => (
                            <div key={index} className="lg:hidden">
                                {/* Version mobile simplifiée */}
                                <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                                    <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg">
                                        <guarantee.icon className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-sm text-white">
                                            {guarantee.shortTitle}
                                        </h3>
                                        <p className="text-xs text-slate-300 truncate">
                                            {guarantee.description}
                                        </p>
                                    </div>
                                    <div className="text-xs font-bold text-amber-400 px-2 py-1 bg-amber-500/20 rounded-full whitespace-nowrap">
                                        {guarantee.highlight}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Version desktop avec cards */}
                        {guarantees.map((guarantee, index) => (
                            <Card key={`desktop-${index}`} className="hidden lg:block bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-105 hover:shadow-2xl">
                                <CardContent className="p-6 text-center">
                                    <div className="p-4 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <guarantee.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-bold mb-3">
                                        {guarantee.highlight}
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 text-white">
                                        {guarantee.title}
                                    </h3>
                                    <p className="text-slate-200 text-sm leading-relaxed">
                                        {guarantee.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Section expertise étendue */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-8 xl:p-10 border border-white/20 shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                            {/* Colonne gauche */}
                            <div className="space-y-6">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-300 rounded-full text-sm font-medium mb-4">
                                        <Users className="w-4 h-4" />
                                        <span>Expertise Complète</span>
                                    </div>

                                    <h2 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-white mb-4">
                                        Couverture, Charpente & Zinguerie
                                    </h2>

                                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-6">
                                        Notre <span className="font-semibold text-white">équipe de professionnels</span> maîtrise
                                        tous les métiers du bâtiment. Nous réalisons vos projets avec le plus grand soin,
                                        garantissant durabilité et longévité.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="font-semibold text-base text-amber-300 flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        Nos Spécialités
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {services.map((service, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm text-slate-200">
                                                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                                                <span>{service}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-xl border border-amber-400/30">
                                    <p className="text-sm text-amber-200 leading-relaxed">
                                        <span className="font-semibold">Intervention tous bâtiments :</span> maisons individuelles,
                                        construction neuve, restauration du patrimoine. Chaque élément traité avec expertise
                                        pour protéger votre habitation.
                                    </p>
                                </div>
                            </div>

                            {/* Colonne droite */}
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 border border-blue-400/30">
                                    <h3 className="font-bold text-lg text-blue-200 mb-4 flex items-center gap-2">
                                        <Phone className="w-5 h-5" />
                                        Contact Direct
                                    </h3>
                                    <p className="text-sm text-blue-100 leading-relaxed mb-4">
                                        Découvrez nos conseils personnalisés et informations détaillées.
                                        Accédez à notre expertise adaptée à votre besoin spécifique.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm">
                                            <a
                                                href="mailto:groupcouvreurfrance@gmail.com?subject=Demande de contact&body=Bonjour,%0D%0A%0D%0AJe souhaiterais obtenir des informations concernant vos services de couverture.%0D%0A%0D%0ACordialement"
                                                className="flex items-center space-x-1 md:space-x-2"
                                            >
                                                Nous Contacter
                                            </a>
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 border border-green-400/30">
                                    <h3 className="font-bold text-base text-green-200 mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5" />
                                        Services Complets
                                    </h3>
                                    <div className="space-y-2 text-sm text-green-100">
                                        <div className="flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3 text-green-400" />
                                            <span>Nettoyage & entretien toiture</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3 text-green-400" />
                                            <span>Évacuation eaux & étanchéité</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3 text-green-400" />
                                            <span>Installation panneaux solaires</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        <span className="font-semibold text-white">Demande simple :</span> renseignez votre adresse,
                                        votre demande sera traitée rapidement par notre équipe d'experts qualifiés.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}