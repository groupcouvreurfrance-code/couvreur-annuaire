"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Check, 
  X, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  User,
  Building2,
  Clock,
  Eye,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Users,
  Briefcase
} from "lucide-react"
import type { Artisan } from "@/lib/database"

interface ArtisansListProps {
  initialArtisans: (Artisan & { department_name?: string })[]
  initialTotal: number
  currentStatus?: string
  currentPage: number
}

export function ArtisansList({ initialArtisans, initialTotal, currentStatus, currentPage }: ArtisansListProps) {
  const [artisans, setArtisans] = useState(initialArtisans)
  const [total, setTotal] = useState(initialTotal)
  const [page, setPage] = useState(currentPage)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState(currentStatus || "all")
  const [isLoading, setIsLoading] = useState<number | null>(null)

  const filteredArtisans = artisans.filter((artisan) => {
    const matchesSearch =
      artisan.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.contactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.city?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || artisan.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleStatusUpdate = async (artisanId: number, newStatus: string) => {
    setIsLoading(artisanId)
    try {
      const response = await fetch("/api/admin/artisans", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: artisanId, status: newStatus }),
      })

      if (response.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setIsLoading(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 flex items-center gap-1 font-medium">
            <CheckCircle className="h-3 w-3" />
            Approuvé
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 flex items-center gap-1 font-medium">
            <Clock className="h-3 w-3" />
            En attente
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 flex items-center gap-1 font-medium">
            <XCircle className="h-3 w-3" />
            Rejeté
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusStats = () => {
    const approved = artisans.filter(a => a.status === "approved").length
    const pending = artisans.filter(a => a.status === "pending").length
    const rejected = artisans.filter(a => a.status === "rejected").length
    return { approved, pending, rejected }
  }

  const stats = getStatusStats()

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Users className="h-7 w-7 text-slate-600" />
              Gestion des Artisans
            </h1>
            <p className="text-slate-600 mt-1">Modération et validation des profils</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-3xl font-bold text-slate-900">{total}</p>
          </div>
        </div>
        
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 font-medium">Approuvés</p>
                <p className="text-2xl font-bold text-emerald-900">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 font-medium">En attente</p>
                <p className="text-2xl font-bold text-amber-900">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 font-medium">Rejetés</p>
                <p className="text-2xl font-bold text-red-900">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres améliorés */}
      <Card className="border-0 shadow-md bg-white">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Filter className="h-5 w-5 text-slate-600" />
            Filtres & Recherche
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Rechercher par nom, entreprise, ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 bg-slate-50"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-56 h-12 border-slate-200 focus:border-slate-400">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    Tous les statuts
                  </div>
                </SelectItem>
                <SelectItem value="pending">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    En attente
                  </div>
                </SelectItem>
                <SelectItem value="approved">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Approuvés
                  </div>
                </SelectItem>
                <SelectItem value="rejected">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Rejetés
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {searchTerm && (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <Search className="h-4 w-4" />
              {filteredArtisans.length} résultat{filteredArtisans.length > 1 ? "s" : ""} pour "{searchTerm}"
            </div>
          )}
        </CardContent>
      </Card>

      {/* Liste des artisans */}
      <div className="space-y-4">
        {filteredArtisans.map((artisan) => (
          <Card key={artisan.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-200 bg-white group">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex items-start gap-6">
                  {/* Avatar/Logo placeholder */}
                  <div className="flex-shrink-0">
                    {artisan.profileImage ? (
                      <img 
                        src={artisan.profileImage} 
                        alt={artisan.companyName}
                        className="w-16 h-16 rounded-xl object-cover border-2 border-slate-200 shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-slate-200 shadow-sm flex items-center justify-center">
                        <Building2 className="h-7 w-7 text-slate-500" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-xl text-slate-900 truncate group-hover:text-slate-700 transition-colors">
                            {artisan.companyName}
                          </h3>
                          {getStatusBadge(artisan.status)}
                        </div>
                        
                        {artisan.contactName && (
                          <p className="text-slate-600 font-medium mb-2 flex items-center gap-2">
                            <User className="h-4 w-4 text-slate-400" />
                            {artisan.contactName}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(artisan.createdAt).toLocaleDateString("fr-FR")}
                          </div>
                          {artisan.yearsExperience && (
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {artisan.yearsExperience} ans d'exp.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions rapides */}
                     
                    </div>

                    {/* Informations de contact */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      {artisan.email && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
                          <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{artisan.email}</span>
                        </div>
                      )}
                      {artisan.phone && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
                          <Phone className="h-4 w-4 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{artisan.phone}</span>
                        </div>
                      )}
                      {(artisan.city || artisan.department_name) && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
                          <MapPin className="h-4 w-4 text-slate-400 flex-shrink-0" />
                          <span className="truncate">
                            {artisan.city}
                            {artisan.city && artisan.department_name && ", "}
                            {artisan.department_name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {artisan.description && (
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2 bg-slate-50 rounded-lg p-3">
                        {artisan.description}
                      </p>
                    )}

                    {/* Services */}
                    {artisan.services && artisan.services.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {artisan.services.slice(0, 4).map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-slate-100 text-slate-700 border-0">
                            {service}
                          </Badge>
                        ))}
                        {artisan.services.length > 4 && (
                          <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 border-0">
                            +{artisan.services.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-500">
                    ID: {artisan.id}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {artisan.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(artisan.id, "approved")}
                          disabled={isLoading === artisan.id}
                          className="bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all"
                        >
                          {isLoading === artisan.id ? (
                            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4 mr-1" />
                          )}
                          Approuver
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(artisan.id, "rejected")}
                          disabled={isLoading === artisan.id}
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Rejeter
                        </Button>
                      </>
                    )}
                    
                    {artisan.status === "approved" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(artisan.id, "pending")}
                        disabled={isLoading === artisan.id}
                        className="border-amber-200 text-amber-600 hover:bg-amber-50"
                      >
                        {isLoading === artisan.id ? (
                          <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                        ) : (
                          <Clock className="h-4 w-4 mr-1" />
                        )}
                        Remettre en attente
                      </Button>
                    )}
                    
                    {artisan.status === "rejected" && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(artisan.id, "approved")}
                        disabled={isLoading === artisan.id}
                        className="bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all"
                      >
                        {isLoading === artisan.id ? (
                          <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4 mr-1" />
                        )}
                        Approuver
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* État vide amélioré */}
      {filteredArtisans.length === 0 && (
        <Card className="border-0 shadow-md">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Aucun artisan trouvé</h3>
            <p className="text-slate-500 mb-4">
              {searchTerm 
                ? `Aucun résultat pour "${searchTerm}" avec ces filtres.`
                : "Aucun artisan ne correspond à ces critères de filtrage."
              }
            </p>
            {(searchTerm || statusFilter !== "all") && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                }}
                className="text-slate-600"
              >
                Réinitialiser les filtres
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}