"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Mail, Phone, Calendar, Building, Euro } from "lucide-react"
import type { ContactRequest, Artisan } from "@prisma/client"

interface ContactRequestsListProps {
  initialRequests: (ContactRequest & { artisan: Artisan })[]
  currentStatus?: string
}

export function ContactRequestsList({ initialRequests, currentStatus }: ContactRequestsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState(currentStatus || "all")

  "use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Mail, Phone, Calendar, Building, Euro } from "lucide-react"
import type { ContactRequest } from "@prisma/client"

interface ContactRequestsListProps {
  initialRequests: (ContactRequest & { artisan: { companyName: string } })[]
  currentStatus?: string
}

export function ContactRequestsList({ initialRequests, currentStatus }: ContactRequestsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState(currentStatus || "all")
  const [requests] = useState(initialRequests)

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.artisan?.companyName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Nouvelle</Badge>
      case "contacted":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Contacté</Badge>
      case "completed":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Terminé</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "immediate":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Urgent</Badge>
      case "within_week":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Cette semaine</Badge>
      case "within_month":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Ce mois</Badge>
      case "no_rush":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Pas pressé</Badge>
      default:
        return <Badge variant="secondary">{urgency}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par client, email, artisan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="new">Nouvelles</SelectItem>
                <SelectItem value="contacted">Contactées</SelectItem>
                <SelectItem value="completed">Terminées</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <div className="text-sm text-slate-600">
        {filteredRequests.length} demande{filteredRequests.length > 1 ? "s" : ""} trouvée
        {filteredRequests.length > 1 ? "s" : ""}
      </div>

      {/* Requests list */}
      <div className="grid gap-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-serif font-semibold text-xl text-slate-900 mb-1">{request.client_name}</h3>
                      <p className="text-slate-600 mb-2">Pour: {request.company_name}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(request.created_at).toLocaleDateString("fr-FR")}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {getStatusBadge(request.status)}
                      {getUrgencyBadge(request.urgency)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {request.client_email}
                    </div>
                    {request.client_phone && (
                      <div className="flex items-center text-sm text-slate-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {request.client_phone}
                      </div>
                    )}
                    {request.project_type && (
                      <div className="flex items-center text-sm text-slate-600">
                        <Building className="h-4 w-4 mr-2" />
                        {request.project_type}
                      </div>
                    )}
                    {request.budget_range && (
                      <div className="flex items-center text-sm text-slate-600">
                        <Euro className="h-4 w-4 mr-2" />
                        {request.budget_range}
                      </div>
                    )}
                  </div>

                  {request.project_description && (
                    <div className="mb-4">
                      <h4 className="font-medium text-slate-900 mb-2">Description du projet:</h4>
                      <p className="text-slate-600 text-sm bg-slate-50 p-3 rounded-lg">{request.project_description}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>Contact préféré: {request.preferred_contact}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-slate-500">Aucune demande trouvée avec ces critères.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
