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
  return (
      <Card className="group relative overflow-hidden bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Badge Featured en overlay */}
        {artisan.featured && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-md">
                <Award className="h-3 w-3 mr-1" />
                Recommandé
              </Badge>
            </div>
        )}

        <CardContent className="p-0">
          {/* Header avec gradient subtil */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 pb-4">
            <div className="flex items-start gap-4">
              {/* Image de profil */}
              <div className="relative flex-shrink-0">
                {artisan.profileImage ? (
                    <img
                        src={artisan.profileImage}
                        alt={artisan.companyName}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border-2 border-white shadow-md"
                    />
                ) : (
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-white shadow-md flex items-center justify-center">
                      <User className="h-8 w-8 text-amber-600" />
                    </div>
                )}

                {/* Indicateur en ligne */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg md:text-xl text-slate-900 mb-1 group-hover:text-amber-700 transition-colors truncate pr-2">
                    {artisan.companyName}
                  </h3>
                </div>

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
                      <div className="px-2 py-1 bg-slate-200 rounded-md text-slate-600 font-medium text-xs">
                        {artisan.yearsExperience} ans d&apos;exp.
                      </div>
                  )}

                </div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="p-6 pt-4">
            {/* Contact rapide - Version mobile améliorée */}
            <div className="mb-4">
              {/* Version desktop - affichage côte à côte */}
              <div className="hidden md:flex items-center gap-2">
                {artisan.phone && (
                    <a
                        href={`tel:${artisan.phone}`}
                        className="flex items-center text-slate-600 bg-slate-50 hover:bg-amber-50 hover:text-amber-700 rounded-lg px-3 py-2 text-sm flex-1 min-w-0 transition-colors group/contact"
                    >
                      <Phone className="h-4 w-4 mr-2 text-slate-400 group-hover/contact:text-amber-500 flex-shrink-0" />
                      <span className="truncate">{artisan.phone}</span>
                    </a>
                )}
                {artisan.email && (
                    <a
                        href={`mailto:${artisan.email}`}
                        className="flex items-center text-slate-600 bg-slate-50 hover:bg-amber-50 hover:text-amber-700 rounded-lg px-3 py-2 text-sm flex-1 min-w-0 transition-colors group/contact"
                    >
                      <Mail className="h-4 w-4 mr-2 text-slate-400 group-hover/contact:text-amber-500 flex-shrink-0" />
                      <span className="truncate">{artisan.email}</span>
                    </a>
                )}
              </div>

              {/* Version mobile - boutons séparés empilés */}
              <div className="md:hidden space-y-2">
                {artisan.phone && (
                    <a
                        href={`tel:${artisan.phone}`}
                        className="flex items-center justify-center text-white bg-amber-600 hover:bg-amber-700 rounded-lg px-4 py-3 text-sm font-medium transition-colors w-full"
                    >
                      <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>Appeler : {artisan.phone}</span>
                    </a>
                )}
                {artisan.email && (
                    <a
                        href={`mailto:${artisan.email}`}
                        className="flex items-center justify-center text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg px-4 py-3 text-sm font-medium transition-colors w-full"
                    >
                      <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Email : {artisan.email}</span>
                    </a>
                )}
              </div>
            </div>

            {/* Site web */}
            {artisan.website && (
                <div className="mb-4">
                  <a
                      href={artisan.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors text-sm"
                  >
                    <ComputerIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{artisan.website}</span>
                    <ChevronRight className="h-4 w-4 ml-auto flex-shrink-0" />
                  </a>
                </div>
            )}

            {/* Description */}
            {artisan.description && (
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {artisan.description}
                </p>
            )}

            {/* Services */}
            {artisan.services && artisan.services.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {artisan.services.slice(0, 4).map((service, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 hover:from-slate-150 hover:to-slate-100 border-0 transition-all"
                        >
                          {service}
                        </Badge>
                    ))}
                    {artisan.services.length > 4 && (
                        <Badge
                            variant="secondary"
                            className="text-xs bg-slate-100 text-slate-700 border-0"
                        >
                          +{artisan.services.length - 4}
                        </Badge>
                    )}
                  </div>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
  )
}