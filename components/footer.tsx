import Link from "next/link"

export function Footer() {
  return (
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Section À propos */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Concernant couvreur-groupefrance</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              couvreur-groupefrance est un site internet national qui permet aux entreprises et aux particuliers de trouver
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
                  <a href="tel:+3307 56 83 09 51" className="text-amber-500 hover:text-amber-400 font-medium text-lg">
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
                  <a href="mailto:groupcouvreurfrance@gmail.com" className="text-amber-500 hover:text-amber-400 font-medium">
                    groupcouvreurfrance@gmail.com
                  </a>
                </div>
              </div>


            </div>
          </div>

          {/* Section Création de site web */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Création de site web</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Vous souhaitez créer votre site web professionnel pour développer votre activité ? Nous proposons des
              solutions de création de sites internet adaptées pour vous.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-white font-medium mb-1">Contactez-nous :</p>
                <div className="flex flex-col space-y-2">
                  <a href="tel:+3307 56 83 09 51" className="text-amber-500 hover:text-amber-400 font-medium">
                    (33) 07 56 83 09 51
                  </a>
                  <a href="mailto:groupcouvreurfrance@gmail.com" className="text-amber-500 hover:text-amber-400 font-medium">
                    groupcouvreurfrance@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section Rejoindre */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Rejoindre couvreur-groupefrance</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Vous êtes artisan, professionnel du BTP expérimenté en couverture ? Vous pouvez nous contacter pour
              rejoindre notre réseau et savoir comment figurer sur ce site internet.
            </p>
            <a href="mailto:groupcouvreurfrance@gmail.com" className="text-amber-500 hover:text-amber-400 font-medium">
              groupcouvreurfrance@gmail.com
            </a>
          </div>

          {/* Mentions légales */}
          {/* Mentions légales */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white">Mentions légales</h2>
            <div className="text-slate-300 space-y-4 text-sm">

              <div>
                <p className="text-white font-medium mb-2">Éditeur du site :</p>
                <p>M. JOE BOCCADIFUOCO</p> {/* tu peux mettre juste ton nom complet ici */}
                <p>Adresse : 11 rue avenue de Toulouse, 34000 Montpellier</p>
                <p>Email : groupcouvreurfrance@gmail.com</p>
                <p>Tél : (33) 07 56 83 09 51</p>
              </div>

              <div>
                <p className="text-white font-medium mb-2">Directeur de la publication :</p>
                <p>M. JOE BOCCADIFUOCO</p>
              </div>

              <div>
                <p className="text-white font-medium mb-2">Hébergement :</p>
                <p>Vercel Inc.</p>
                <p>340 S Lemon Ave #4133</p>
                <p>Walnut, CA 91789, États-Unis</p>
                <p>Site : <a href="https://vercel.com" className="text-amber-500 hover:text-amber-400">https://vercel.com</a></p>
              </div>

              <div>
                <p className="text-white font-medium mb-2">Propriété intellectuelle :</p>
                <p>L’ensemble des contenus présents sur ce site (textes, images, logo, etc.) sont protégés par le droit d’auteur.
                  Toute reproduction, même partielle, est interdite sans l’accord préalable de l’éditeur.</p>
              </div>

              <div>
                <p className="text-white font-medium mb-2">Données personnelles :</p>
                <p>Ce site ne collecte aucune donnée personnelle autre que celles transmises volontairement via l’email de contact.
                  Conformément à la loi Informatique et Libertés, vous disposez d’un droit d’accès, de suppression
                  de vos données en nous contactant à l’adresse suivante : groupcouvreurfrance@gmail.com.</p>
              </div>

            </div>
          </div>


          {/* Bas de footer */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col space-y-6">
              {/* Copyright */}
              <div className="text-center">
                <p className="text-slate-400 text-sm">Copyright © 2025 couvreur-groupefrance - Tous droits réservés</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}