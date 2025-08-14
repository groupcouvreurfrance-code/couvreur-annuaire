"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Check,
  X,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  RefreshCw,
  Users,
} from "lucide-react"
import type { Artisan } from "@/lib/database"
import {EditArtisanModal} from "@/components/EditArtisanaModal";

interface ArtisansListProps {
  initialArtisans: (Artisan & { department_name?: string })[]
  initialTotal: number
  currentStatus?: string
  currentPage: number
}

export default function ArtisansList({ initialArtisans, initialTotal, currentStatus, currentPage }: ArtisansListProps) {
  const [artisans, setArtisans] = useState(initialArtisans || [])
  const [total, setTotal] = useState(initialTotal || 0)
  const [page, setPage] = useState(currentPage)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState(currentStatus || "all")
  const [isLoading, setIsLoading] = useState<number | null>(null)

  const filteredArtisans = artisans.filter((artisan) => {
    const matchesSearch =
        artisan.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        setArtisans((prev) =>
            prev.map((artisan) => (artisan.id === artisanId ? { ...artisan, status: newStatus } : artisan)),
        )
      }
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setIsLoading(null)
    }
  }

  const handleArtisanUpdate = (artisanId: number, updatedData: any) => {
    setArtisans((prev) =>
        prev.map((artisan) =>
            artisan.id === artisanId
                ? { ...artisan, ...updatedData }
                : artisan
        )
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Approuvé
            </Badge>
        )
      case "pending":
        return (
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              En attente
            </Badge>
        )


      default:
        return (
            <Badge variant="secondary" className="text-xs">
              {status}
            </Badge>
        )
    }
  }

  const getStatusStats = () => {
    const approved = artisans.filter((a) => a.status === "approved").length
    const pending = artisans.filter((a) => a.status === "pending").length
    const rejected = artisans.filter((a) => a.status === "rejected").length
    return { approved, pending, rejected }
  }

  const stats = getStatusStats()

  return (
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        {/* Header compact avec statistiques */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="h-6 w-6 text-slate-600" />
                Gestion des Couvreurs
              </h1>
              <p className="text-slate-600 text-sm">Modération et validation des profils</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Total</p>
              <p className="text-2xl font-bold text-slate-900">{total}</p>
            </div>
          </div>

          {/* Statistiques compactes */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-lg font-bold text-emerald-900">{stats.approved}</p>
              <p className="text-xs text-emerald-600">Approuvés</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-lg font-bold text-amber-900">{stats.pending}</p>
              <p className="text-xs text-amber-600">En attente</p>
            </div>
          </div>
        </div>

        {/* Filtres compacts */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                  placeholder="Rechercher par nom, entreprise, ville..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 h-10">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="approved">Approuvés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Liste compacte */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700 text-sm">Artisan</th>
                <th className="text-left p-4 font-medium text-slate-700 text-sm">Contact</th>
                <th className="text-left p-4 font-medium text-slate-700 text-sm">Localisation</th>
                <th className="text-left p-4 font-medium text-slate-700 text-sm">Statut</th>
                <th className="text-left p-4 font-medium text-slate-700 text-sm">Date</th>
                <th className="text-right p-4 font-medium text-slate-700 text-sm">Actions</th>
              </tr>
              </thead>
              <tbody>
              {filteredArtisans.map((artisan) => (
                  <tr key={artisan.id} className="border-b hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {artisan.profileImage ? (
                            <img
                                src={artisan.profileImage}
                                alt={artisan.companyName}
                                className="w-10 h-10 rounded-lg object-cover border"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-lg bg-slate-100 border flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-slate-500" />
                            </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 truncate">{artisan.companyName}</p>
                          {artisan.contactName && (
                              <p className="text-sm text-slate-500 truncate">{artisan.contactName}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        {artisan.email && (
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <Mail className="h-3 w-3" />
                              <span className="truncate max-w-32">{artisan.email}</span>
                            </div>
                        )}
                        {artisan.phone && (
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <Phone className="h-3 w-3" />
                              <span>{artisan.phone}</span>
                            </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {(artisan.city || artisan.department_name) && (
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">
                          {artisan.city}
                              {artisan.city && artisan.department_name && ", "}
                              {artisan.department_name}
                        </span>
                          </div>
                      )}
                    </td>
                    <td className="p-4">{getStatusBadge(artisan.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Calendar className="h-3 w-3" />
                        {new Date(artisan.createdAt).toLocaleDateString("fr-FR")}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* Bouton d'édition - toujours visible */}
                        <EditArtisanModal
                            artisan={artisan}
                            onUpdate={handleArtisanUpdate}
                        />

                        {artisan.status === "pending" && (
                            <>
                              <Button
                                  size="sm"
                                  onClick={() => handleStatusUpdate(artisan.id, "approved")}
                                  disabled={isLoading === artisan.id}
                                  className="h-8 px-3 bg-emerald-600 hover:bg-emerald-700"
                              >
                                {isLoading === artisan.id ? (
                                    <RefreshCw className="h-3 w-3 animate-spin" />
                                ) : (
                                    <Check className="h-3 w-3" />
                                )}
                              </Button>

                            </>
                        )}

                        {artisan.status === "approved" && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(artisan.id, "pending")}
                                disabled={isLoading === artisan.id}
                                className="h-8 px-3 border-amber-200 text-amber-600 hover:bg-amber-50"
                            >
                              {isLoading === artisan.id ? (
                                  <RefreshCw className="h-3 w-3 animate-spin" />
                              ) : (
                                  <Clock className="h-3 w-3" />
                              )}
                            </Button>
                        )}

                        {artisan.status === "rejected" && (
                            <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(artisan.id, "approved")}
                                disabled={isLoading === artisan.id}
                                className="h-8 px-3 bg-emerald-600 hover:bg-emerald-700"
                            >
                              {isLoading === artisan.id ? (
                                  <RefreshCw className="h-3 w-3 animate-spin" />
                              ) : (
                                  <Check className="h-3 w-3" />
                              )}
                            </Button>
                        )}
                      </div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>

          {/* État vide */}
          {filteredArtisans.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="font-medium text-slate-900 mb-2">Aucun artisan trouvé</h3>
                <p className="text-slate-500 text-sm mb-4">
                  {searchTerm
                      ? `Aucun résultat pour "${searchTerm}" avec ces filtres.`
                      : "Aucun artisan ne correspond à ces critères de filtrage."}
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
              </div>
          )}
        </div>
      </div>
  )
}