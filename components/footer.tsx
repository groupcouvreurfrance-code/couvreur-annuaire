import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-serif font-bold text-xl">CouvreursFrance</span>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              L'annuaire de référence pour trouver les meilleurs couvreurs de France. Artisans certifiés, devis
              gratuits, interventions rapides.
            </p>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/departements" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Départements
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Artisans</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/inscription" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Inscription
                </Link>
              </li>
              <li>
                <Link href="/connexion" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/aide" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Aide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <p className="text-slate-400">© 2024 CouvreursFrance. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
