"use client"
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CollapsibleLegalSection() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="mb-12">
            {/* Titre cliquable */}
            <button
                onClick={toggleOpen}
                className="w-full flex items-center justify-between text-left mb-6 group focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg p-2"
            >
                <h2 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    Mentions légales
                </h2>
                <ChevronDown
                    className={`h-6 w-6 text-white group-hover:text-amber-400 transition-all duration-300 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* Contenu collapsible */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="text-slate-300 space-y-4 text-sm">
                    <div>
                        <p className="text-white font-medium mb-2">Éditeur du site :</p>
                        <p>M. JOE BOCCADIFUOCO</p>
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
                        <p>L'ensemble des contenus présents sur ce site (textes, images, logo, etc.) sont protégés par le droit d'auteur.
                            Toute reproduction, même partielle, est interdite sans l'accord préalable de l'éditeur.</p>
                    </div>

                    <div>
                        <p className="text-white font-medium mb-2">Données personnelles :</p>
                        <p>Ce site ne collecte aucune donnée personnelle autre que celles transmises volontairement via l'email de contact.
                            Conformément à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de suppression
                            de vos données en nous contactant à l'adresse suivante : groupcouvreurfrance@gmail.com.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}