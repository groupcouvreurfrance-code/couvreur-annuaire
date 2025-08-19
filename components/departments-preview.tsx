import Link from "next/link"
import { Button } from "@/components/ui/button"

export function DepartmentsPreview() {
    return (
        <section id={"departements"} className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-serif font-bold text-3xl lg:text-4xl text-slate-900 mb-4">
                        Couvreurs par Département
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Découvrez les artisans couvreurs qualifiés dans votre département
                    </p>
                </div>

                <div className="text-center">
                    <Link href="/departements">
                        <Button
                            variant="outline"
                            size="lg"
                            className="relative overflow-hidden border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                        >
              <span className="relative z-10 flex flex-row">
                Voir tous les départements
              </span>
                            {/* Effet de brillance corrigé */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent animate-ping opacity-75 rounded-md pointer-events-none"></div>
                        </Button>
                    </Link>
                    {/* Texte indicatif */}
                    <p className="mt-2 text-sm text-amber-600 animate-bounce font-medium">
                        👆 Cliquez ici !
                    </p>
                </div>
            </div>
        </section>
    )
}
