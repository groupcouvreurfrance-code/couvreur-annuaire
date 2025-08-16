"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Users, Award, MapPin } from "lucide-react"
import Link from "next/link"

interface MapData {
  code: string
  name: string
  slug: string
  artisan_count: number
  avg_rating: number
  featured_count: number
}

interface InteractiveMapProps {
  mapData: MapData[]
}

export function InteractiveMap({ mapData }: InteractiveMapProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<MapData | null>(null)
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null)

  const getDepartmentData = (code: string) => {
    return mapData.find((d) => d.code === code)
  }

  const getColorIntensity = (count: number) => {
    if (count === 0) return "fill-slate-100 hover:fill-slate-200"
    if (count <= 5) return "fill-amber-100 hover:fill-amber-200"
    if (count <= 15) return "fill-amber-200 hover:fill-amber-300"
    if (count <= 30) return "fill-amber-300 hover:fill-amber-400"
    if (count <= 50) return "fill-amber-400 hover:fill-amber-500"
    return "fill-amber-500 hover:fill-amber-600"
  }

  const handleDepartmentClick = (code: string) => {
    const data = getDepartmentData(code)
    if (data) {
      setSelectedDepartment(data)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Map */}
      <div className="lg:col-span-2">
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="font-serif font-semibold text-xl text-slate-900 mb-2">Carte des Couvreurs en France</h3>
            <p className="text-slate-600 text-sm">Cliquez sur un département pour voir les détails</p>
          </div>

          <div className="relative">
            <svg
              viewBox="0 0 1000 1000"
              className="w-full h-auto max-w-2xl mx-auto cursor-pointer"
              style={{ maxHeight: "600px" }}
            >
              {/* Simplified France map - key departments */}
              <g>
                {/* Paris (75) */}
                <circle
                  cx="500"
                  cy="300"
                  r="15"
                  className={`${getColorIntensity(getDepartmentData("75")?.artisan_count || 0)} stroke-slate-300 stroke-2 transition-all cursor-pointer`}
                  onClick={() => handleDepartmentClick("75")}
                  onMouseEnter={() => setHoveredDepartment("75")}
                  onMouseLeave={() => setHoveredDepartment(null)}
                />
                <text x="520" y="305" className="text-xs fill-slate-700 font-medium">
                  Paris
                </text>

                {/* Lyon - Rhône (69) */}
                <circle
                  cx="600"
                  cy="450"
                  r="12"
                  className={`${getColorIntensity(getDepartmentData("69")?.artisan_count || 0)} stroke-slate-300 stroke-2 transition-all cursor-pointer`}
                  onClick={() => handleDepartmentClick("69")}
                  onMouseEnter={() => setHoveredDepartment("69")}
                  onMouseLeave={() => setHoveredDepartment(null)}
                />
                <text x="615" y="455" className="text-xs fill-slate-700 font-medium">
                  Lyon
                </text>

                {/* Marseille - Bouches-du-Rhône (13) */}
                <circle
                  cx="650"
                  cy="650"
                  r="12"
                  className={`${getColorIntensity(getDepartmentData("13")?.artisan_count || 0)} stroke-slate-300 stroke-2 transition-all cursor-pointer`}
                  onClick={() => handleDepartmentClick("13")}
                  onMouseEnter={() => setHoveredDepartment("13")}
                  onMouseLeave={() => setHoveredDepartment(null)}
                />
                <text x="665" y="655" className="text-xs fill-slate-700 font-medium">
                  Marseille
                </text>

                {/* Lille - Nord (59) */}
                <circle
                  cx="450"
                  cy="150"
                  r="12"
                  className={`${getColorIntensity(getDepartmentData("59")?.artisan_count || 0)} stroke-slate-300 stroke-2 transition-all cursor-pointer`}
                  onClick={() => handleDepartmentClick("59")}
                  onMouseEnter={() => setHoveredDepartment("59")}
                  onMouseLeave={() => setHoveredDepartment(null)}
                />
                <text x="465" y="155" className="text-xs fill-slate-700 font-medium">
                  Lille
                </text>

                {/* Bordeaux - Gironde (33) */}
                <circle
                  cx="250"
                  cy="550"
                  r="12"
                  className={`${getColorIntensity(getDepartmentData("33")?.artisan_count || 0)} stroke-slate-300 stroke-2 transition-all cursor-pointer`}
                  onClick={() => handleDepartmentClick("33")}
                  onMouseEnter={() => setHoveredDepartment("33")}
                  onMouseLeave={() => setHoveredDepartment(null)}
                />
                <text x="265" y="555" className="text-xs fill-slate-700 font-medium">
                  Bordeaux
                </text>

                {/* Nantes - Loire-Atlantique (44) */}
                <circle
                  cx="200"
                  cy="400"
                  r="12"
                  className={`${getColorIntensity(getDepartmentData("44")?.artisan_count || 0)} stroke-slate-300 stroke-2 transition-all cursor-pointer`}
                  onClick={() => handleDepartmentClick("44")}
                  onMouseEnter={() => setHoveredDepartment("44")}
                  onMouseLeave={() => setHoveredDepartment(null)}
                />
                <text x="215" y="405" className="text-xs fill-slate-700 font-medium">
                  Nantes
                </text>

                {/* Strasbourg - Bas-Rhin (67) */}
                <circle
                  cx="750"
                  cy="300"
                  r="12"
                  className={`${getColorIntensity(getDepartmentData("67")?.artisan_count || 0)} stroke-slate-300 stroke-2 transition-all cursor-pointer`}
                  onClick={() => handleDepartmentClick("67")}
                  onMouseEnter={() => setHoveredDepartment("67")}
                  onMouseLeave={() => setHoveredDepartment(null)}
                />
                <text x="765" y="305" className="text-xs fill-slate-700 font-medium">
                  Strasbourg
                </text>

                {/* Toulouse - Haute-Garonne (31) */}
                <circle
                  cx="350"
                  cy="650"
                  r="12"
                  className={`${getColorIntensity(getDepartmentData("31")?.artisan_count || 0)} stroke-slate-300 stroke-2 transition-all cursor-pointer`}
                  onClick={() => handleDepartmentClick("31")}
                  onMouseEnter={() => setHoveredDepartment("31")}
                  onMouseLeave={() => setHoveredDepartment(null)}
                />
                <text x="365" y="655" className="text-xs fill-slate-700 font-medium">
                  Toulouse
                </text>

                {/* Rennes - Ille-et-Vilaine (35) */}
                <circle
                  cx="150"
                  cy="350"
                  r="10"
                  className={`${getColorIntensity(getDepartmentData("35")?.artisan_count || 0)} stroke-slate-300 stroke-2 transition-all cursor-pointer`}
                  onClick={() => handleDepartmentClick("35")}
                  onMouseEnter={() => setHoveredDepartment("35")}
                  onMouseLeave={() => setHoveredDepartment(null)}
                />
                <text x="165" y="355" className="text-xs fill-slate-700 font-medium">
                  Rennes
                </text>

                {/* Nice - Alpes-Maritimes (06) */}
                <circle
                  cx="700"
                  cy="700"
                  r="10"
                  className={`${getColorIntensity(getDepartmentData("06")?.artisan_count || 0)} stroke-slate-300 stroke-2 transition-all cursor-pointer`}
                  onClick={() => handleDepartmentClick("06")}
                  onMouseEnter={() => setHoveredDepartment("06")}
                  onMouseLeave={() => setHoveredDepartment(null)}
                />
                <text x="715" y="705" className="text-xs fill-slate-700 font-medium">
                  Nice
                </text>
              </g>

              {/* Hover tooltip */}
              {hoveredDepartment && (
                <g>
                  <rect
                    x="50"
                    y="50"
                    width="200"
                    height="80"
                    fill="white"
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    rx="8"
                    className="drop-shadow-lg"
                  />
                  <text x="60" y="70" className="text-sm font-semibold fill-slate-900">
                    {getDepartmentData(hoveredDepartment)?.name}
                  </text>
                  <text x="60" y="90" className="text-xs fill-slate-600">
                    {getDepartmentData(hoveredDepartment)?.artisan_count} couvreurs
                  </text>
                  <text x="60" y="110" className="text-xs fill-slate-600">
                    Note: {getDepartmentData(hoveredDepartment)?.avg_rating.toFixed(1)}/5
                  </text>
                </g>
              )}
            </svg>

            {/* Legend */}
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-900 mb-3">Légende</h4>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-100 rounded border"></div>
                  <span className="text-slate-600">0 couvreur</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-100 rounded border"></div>
                  <span className="text-slate-600">1-5 couvreurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-200 rounded border"></div>
                  <span className="text-slate-600">6-15 couvreurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-300 rounded border"></div>
                  <span className="text-slate-600">16-30 couvreurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-400 rounded border"></div>
                  <span className="text-slate-600">31-50 couvreurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-500 rounded border"></div>
                  <span className="text-slate-600">50+ couvreurs</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Department Details */}
      <div className="lg:col-span-1">
        {selectedDepartment ? (
          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="font-serif font-semibold text-xl text-slate-900 mb-1">{selectedDepartment.name}</h3>
                <p className="text-slate-600">Département {selectedDepartment.code}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">Couvreurs</span>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                    {selectedDepartment.artisan_count}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">Recommandés</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                    {selectedDepartment.featured_count}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">Note moyenne</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{selectedDepartment.avg_rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <Link href={`/departement/${selectedDepartment.slug}`}>
                <Button className="w-full bg-amber-600 hover:bg-amber-700">
                  <MapPin className="h-4 w-4 mr-2" />
                  Voir les couvreurs
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-serif font-semibold text-lg text-slate-900 mb-2">Sélectionnez un département</h3>
              <p className="text-slate-600">
                Cliquez sur un point de la carte pour voir les détails des couvreurs disponibles.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
