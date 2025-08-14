import Link from "next/link"

export function Footer() {
  return (
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Section À propos */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Concernant couvreurFrance</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              couvreurFrance est un site internet national qui permet aux entreprises et aux particuliers de trouver
              facilement, à proximité du lieu de leurs travaux, un couvreur. Nous travaillons avec une sélection
              d'artisans choisis pour leur sérieux et leur expertise.
            </p>

          </div>

          {/* Section Devis */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Devis pour votre couverture</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Vous souhaitez obtenir rapidement un prix pour la réparation de votre toiture, dans votre région ? Vous avez
              besoin de conseils ou vous souhaitez réserver une intervention en urgence ?
            </p>
            <p className="text-slate-300 mb-6">
             contactez-nous dès maintenant par téléphone ou par email, et nous vous mettrons en relation avec un
              et un conseiller vous recontactera rapidement.
            </p>
          </div>

          {/* Section Contact rapide */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Contact rapide</h2>

            <div className="space-y-6">
              {/* Téléphone */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Téléphone:</p>
                  <a href="tel:+3307 56 83 09 51" className="text-emerald-500 hover:text-emerald-400 font-medium text-lg">
                    (33) 07 56 83 09 51
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Email:</p>
                  <a href="mailto:groupcouvreurfrance@gmail.com" className="text-emerald-500 hover:text-emerald-400 font-medium">
                    groupcouvreurfrance@gmail.com
                  </a>
                </div>
              </div>


            </div>
          </div>

          {/* Section Rejoindre */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Rejoindre couvreurFrance</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Vous êtes artisan, professionnel du BTP expérimenté en couverture ? Vous pouvez nous contacter pour
              rejoindre notre réseau et savoir comment figurer sur ce site internet.
            </p>
            <a href="mailto:groupcouvreurfrance@gmail.com" className="text-emerald-500 hover:text-emerald-400 font-medium">
              groupcouvreurfrance@gmail.com
            </a>
          </div>

          {/* Bas de footer */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col space-y-6">
              {/* Copyright */}
              <div className="text-center">
                <p className="text-slate-400 text-sm">Copyright © 2025 couvreurFrance - Tous droits réservés</p>
              </div>

              {/* Réseaux sociaux */}
              <div className="flex justify-center space-x-8">
                <a href="#" className="text-emerald-500 hover:text-emerald-400 flex items-center space-x-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  <span className="text-sm font-medium">FACEBOOK</span>
                </a>

                <a href="#" className="text-emerald-500 hover:text-emerald-400 flex items-center space-x-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  <span className="text-sm font-medium">TWITTER</span>
                </a>



              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}
