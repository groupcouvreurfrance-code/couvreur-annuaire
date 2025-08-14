"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, Award, Phone } from "lucide-react"

export function CouvreurHeroSection() {
    const scrollToDepartments = () => {
        const departmentsSection = document.getElementById("departements")
        if (departmentsSection) {
            departmentsSection.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-32 overflow-hidden">
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{
                        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-14%20at%2012.36.46_0aeb4673.jpg-deqIqzW8CnWufRnvaFsJe2IrvGbNZ1.jpeg')`,
                    }}
                ></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="font-serif font-bold text-4xl lg:text-6xl mb-6 leading-tight">
                        Couvreur Professionnel
                        <span className="block text-emerald-400">Partout en France</span>
                    </h1>
                    <p className="text-xl lg:text-2xl text-slate-200 mb-8 leading-relaxed">
                        Trouvez votre <strong>artisan couvreur qualifié</strong> près de chez vous. Devis gratuit, travaux garantis,
                        intervention rapide.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg bg-transparent"
                            onClick={scrollToDepartments}
                        >
                            Trouver un Couvreur
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        <Card className="bg-white/15 backdrop-blur-sm border-white/30">
                            <CardContent className="p-6 text-center">
                                <Shield className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                                <h3 className="font-semibold text-lg mb-2 text-white">Garantie Décennale</h3>
                                <p className="text-slate-200">Tous nos couvreurs sont assurés</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/15 backdrop-blur-sm border-white/30">
                            <CardContent className="p-6 text-center">
                                <Clock className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                                <h3 className="font-semibold text-lg mb-2 text-white">Intervention Rapide</h3>
                                <p className="text-slate-200">Devis sous 24h, urgences 7j/7</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/15 backdrop-blur-sm border-white/30">
                            <CardContent className="p-6 text-center">
                                <Award className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                                <h3 className="font-semibold text-lg mb-2 text-white">Artisans Certifiés</h3>
                                <p className="text-slate-200">Couvreurs expérimentés et qualifiés</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
