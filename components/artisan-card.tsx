import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {Star, Phone, Mail, MapPin, Shield, Award, ChevronRight, User, ComputerIcon, WorkflowIcon} from "lucide-react"
import type { Artisan } from "@/lib/database"
import {URL} from "next/dist/compiled/@edge-runtime/primitives";

interface ArtisanCardProps {
  artisan: Artisan
}

export function ArtisanCard({ artisan }: ArtisanCardProps) {
  const isPremium = artisan.featured;

  return (
      <Card className={`group relative overflow-hidden border-0 transition-all duration-500 hover:-translate-y-2 ${
          isPremium
              ? 'bg-gradient-to-br from-amber-50 via-white to-orange-50 shadow-lg hover:shadow-2xl ring-2 ring-amber-200 hover:ring-amber-300'
              : 'bg-white shadow-sm hover:shadow-xl'
      }`}>

        {/* Effet brillant premium */}
        {isPremium && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
        )}

        {/* Badge Premium repositionné et amélioré */}
        {isPremium && (
            <div className="absolute top-0 right-0 z-20">
              {/* Badge avec forme ondulée */}
              <div className="relative">
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-4 py-2 rounded-bl-2xl shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <Award className="h-4 w-4 animate-pulse" />
                    <span className="font-bold text-sm">RECOMMANDÉ</span>
                  </div>
                </div>
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-bl-2xl animate-pulse" />
              </div>
            </div>
        )}

        {/* Bandeau premium en bas du badge */}
        {isPremium && (
            <div className="absolute top-12 right-0 bg-gradient-to-l from-amber-400 to-transparent text-amber-900 px-6 py-1 text-xs font-semibold rounded-l-full shadow-sm z-10">
              ⭐ PROFESSIONNEL CERTIFIÉ
            </div>
        )}

        <CardContent className="p-0 relative">
          {/* Header avec gradient premium */}
          <div className={`p-6 pb-4 ${
              isPremium
                  ? 'bg-gradient-to-br from-amber-50 via-white to-orange-50'
                  : 'bg-gradient-to-br from-slate-50 to-slate-100'
          }`}>
            <div className="flex items-start gap-4">
              {/* Image de profil avec effet premium */}
              <div className="relative flex-shrink-0">
                {artisan.profileImage ? (
                    <img
                        src={artisan.profileImage}
                        alt={artisan.companyName}
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover shadow-md transition-all duration-300 ${
                            isPremium
                                ? 'border-3 border-gradient-to-r from-amber-400 to-orange-400 ring-4 ring-amber-100 group-hover:ring-amber-200'
                                : 'border-2 border-white'
                        }`}
                    />
                ) : (
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl shadow-md flex items-center justify-center transition-all duration-300 ${
                        isPremium
                            ? 'bg-gradient-to-br from-amber-200 via-orange-100 to-amber-100 border-3 border-amber-400 ring-4 ring-amber-100 group-hover:ring-amber-200'
                            : 'bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-white'
                    }`}>
                      <User className={`h-8 w-8 ${isPremium ? 'text-amber-700' : 'text-amber-600'}`} />
                    </div>
                )}

                {/* Indicateur premium amélioré */}
                <div className={`absolute -bottom-1 -right-1 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all duration-300 ${
                    isPremium
                        ? 'w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:scale-110'
                        : 'w-5 h-5 bg-amber-500'
                }`}>
                  {isPremium ? (
                      <Award className="w-3 h-3 text-white" />
                  ) : (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>

                {/* Halo premium */}
                {isPremium && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/20 to-orange-400/20 animate-pulse -z-10 blur-sm" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-bold text-lg md:text-xl mb-1 group-hover:text-amber-700 transition-colors truncate pr-2 ${
                      isPremium ? 'text-slate-900' : 'text-slate-900'
                  }`}>
                    {artisan.companyName}
                    {isPremium && (
                        <span className="ml-2 inline-block">
                        <Award className="h-5 w-5 text-amber-500 inline animate-bounce" />
                      </span>
                    )}
                  </h3>
                </div>

                {/* Message premium persuasif */}
                {isPremium && (
                    <div className="mb-3 p-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg border border-amber-200">
                      <p className="text-xs font-semibold text-amber-800 flex items-center">
                        <span className="mr-1">🏆</span>
                        Artisan vérifié • Qualité garantie • Service prioritaire
                      </p>
                    </div>
                )}

                {artisan.contactName && (
                    <p className="text-slate-600 font-medium mb-3 truncate">{artisan.contactName}</p>
                )}

                <div className="flex items-center flex-wrap gap-2 text-sm">
                  {artisan.city && (
                      <div className="flex items-center text-slate-500">
                        <MapPin className="h-4 w-4 mr-1.5 text-slate-400" />
                        <span className="truncate">{artisan.city}</span>
                      </div>
                  )}

                  {artisan.yearsExperience && (
                      <div className={`px-2 py-1 rounded-md font-medium text-xs ${
                          isPremium
                              ? 'bg-gradient-to-r from-amber-200 to-orange-200 text-amber-800'
                              : 'bg-slate-200 text-slate-600'
                      }`}>
                        {artisan.yearsExperience} ans d&apos;exp.
                      </div>
                  )}

                  {/* Badge "Choix recommandé" */}
                  {isPremium && (
                      <div className="px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-md font-medium text-xs flex items-center">
                        <span className="mr-1">✨</span>
                        Choix recommandé
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Message de confiance premium */}
          {isPremium && (
              <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-y border-blue-100">
                <div className="flex items-center justify-center text-center">
                  <div className="flex items-center text-blue-800 text-sm font-medium">
                    <div className="flex -space-x-1 mr-3">
                      {[1,2,3,4,5].map(i => (
                          <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full border border-white flex items-center justify-center">
                            <span className="text-xs text-white">★</span>
                          </div>
                      ))}
                    </div>
                    <span>Satisfaction client garantie • Devis gratuit • Intervention rapide</span>
                  </div>
                </div>
              </div>
          )}

          {/* Contenu principal */}
          <div className="p-6 pt-4">
            {/* Contact rapide - Version mobile améliorée */}
            <div className="mb-4">
              {/* Version desktop - affichage côte à côte */}
              <div className="hidden md:flex items-center gap-2">
                {artisan.phone && (
                    <a
                        href={`tel:${artisan.phone}`}
                        className={`flex items-center rounded-lg px-3 py-2 text-sm flex-1 min-w-0 transition-all duration-300 group/contact ${
                            isPremium
                                ? 'text-amber-700 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200 hover:border-amber-300 hover:shadow-md'
                                : 'text-slate-600 bg-slate-50 hover:bg-amber-50 hover:text-amber-700'
                        }`}
                    >
                      <Phone className={`h-4 w-4 mr-2 flex-shrink-0 transition-colors ${
                          isPremium
                              ? 'text-amber-500 group-hover/contact:text-amber-600'
                              : 'text-slate-400 group-hover/contact:text-amber-500'
                      }`} />
                      <span className="truncate font-medium">{artisan.phone}</span>
                    </a>
                )}
                {artisan.email && (
                    <a
                        href={`mailto:${artisan.email}`}
                        className={`flex items-center rounded-lg px-3 py-2 text-sm flex-1 min-w-0 transition-all duration-300 group/contact ${
                            isPremium
                                ? 'text-amber-700 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200 hover:border-amber-300 hover:shadow-md'
                                : 'text-slate-600 bg-slate-50 hover:bg-amber-50 hover:text-amber-700'
                        }`}
                    >
                      <Mail className={`h-4 w-4 mr-2 flex-shrink-0 transition-colors ${
                          isPremium
                              ? 'text-amber-500 group-hover/contact:text-amber-600'
                              : 'text-slate-400 group-hover/contact:text-amber-500'
                      }`} />
                      <span className="truncate font-medium">{artisan.email}</span>
                    </a>
                )}
              </div>

              {/* Version mobile - boutons premium */}
              <div className="md:hidden space-y-2">
                {artisan.phone && (
                    <a
                        href={`tel:${artisan.phone}`}
                        className={`flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 w-full hover:scale-105 ${
                            isPremium
                                ? 'text-white bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 hover:from-amber-700 hover:via-orange-600 hover:to-amber-700 shadow-lg hover:shadow-xl'
                                : 'text-white bg-amber-600 hover:bg-amber-700'
                        }`}
                    >
                      <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>
                        {isPremium ? ' Appel prioritaire : ' : 'Appeler : '}
                        {artisan.phone}
                      </span>
                    </a>
                )}
                {artisan.email && (
                    <a
                        href={`mailto:${artisan.email}`}
                        className={`flex items-center justify-center border rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 w-full hover:scale-105 ${
                            isPremium
                                ? 'text-amber-800 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 hover:from-amber-200 hover:via-orange-100 hover:to-amber-200 border-amber-300 hover:border-amber-400 shadow-md hover:shadow-lg'
                                : 'text-amber-700 bg-amber-50 hover:bg-amber-100 border-amber-200'
                        }`}
                    >
                      <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {isPremium ? '✉️ Réponse garantie ' : `Email : ${artisan.email}`}
                      </span>
                    </a>
                )}
              </div>
            </div>

            {/* Site web premium */}
            {artisan.website && (
                <div className="mb-4">
                  <a
                      href={artisan.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center p-3 rounded-lg text-sm transition-all duration-300 hover:scale-105 ${
                          isPremium
                              ? 'bg-gradient-to-r from-slate-50 via-white to-slate-50 hover:from-slate-100 hover:via-slate-50 hover:to-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-md hover:shadow-lg'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    <ComputerIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate font-medium">
                      {isPremium ? '🌐 site professionnel' : artisan.website}
                    </span>
                    <ChevronRight className="h-4 w-4 ml-auto flex-shrink-0" />
                  </a>
                </div>
            )}

            {/* Description premium */}
            {artisan.description && (
                <div className={`mb-4 ${isPremium ? 'p-3 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-100' : ''}`}>
                  <p className={`text-sm leading-relaxed line-clamp-2 ${
                      isPremium ? 'text-slate-700 font-medium' : 'text-slate-600'
                  }`}>
                    {isPremium && '💼 '}
                    {artisan.description}
                  </p>
                </div>
            )}

            {/* Services premium */}
            {artisan.services && artisan.services.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {artisan.services.slice(0, 4).map((service, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className={`text-xs border-0 transition-all duration-300 hover:scale-105 ${
                                isPremium
                                    ? 'bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-amber-800 hover:from-amber-200 hover:via-orange-100 hover:to-amber-200 font-medium shadow-sm'
                                    : 'bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 hover:from-slate-150 hover:to-slate-100'
                            }`}
                        >
                          {isPremium && '⚡ '}{service}
                        </Badge>
                    ))}
                    {artisan.services.length > 4 && (
                        <Badge
                            variant="secondary"
                            className={`text-xs border-0 ${
                                isPremium
                                    ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 font-medium'
                                    : 'bg-slate-100 text-slate-700'
                            }`}
                        >
                          +{artisan.services.length - 4} services
                        </Badge>
                    )}
                  </div>
                </div>
            )}

            {/* Call-to-action premium */}
            {isPremium && (
                <div className="mt-6 p-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl text-white text-center shadow-lg">
                  <p className="text-sm font-bold mb-1">🎯 PROFESSIONNEL RECOMMANDÉ</p>
                  <p className="text-xs opacity-90">Intervention rapide • Devis gratuit • Garantie qualité</p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
  )
}