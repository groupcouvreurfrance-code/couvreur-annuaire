"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  User, 
  FileText, 
  Euro, 
  Calendar,
  MessageSquare,
  Send,
  Sparkles
} from "lucide-react"
import type { Artisan } from "@/lib/database"

interface ContactFormProps {
  artisan: Artisan
  onSuccess?: () => void
}

export function ContactForm({ artisan, onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    project_type: "",
    project_description: "",
    budget_range: "",
    urgency: "no_rush",
    preferred_contact: "email",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artisan_id: artisan.id,
          ...formData,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        onSuccess?.()
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: "Vos informations", icon: User },
    { number: 2, title: "Votre projet", icon: FileText },
    { number: 3, title: "Détails & envoi", icon: Send },
  ]

  if (isSuccess) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-green-50 overflow-hidden">
        <CardContent className="p-8 text-center relative">
          {/* Effet de brillance en arrière-plan */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-500"></div>
          
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold text-2xl text-emerald-900 mb-3 flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 text-emerald-600" />
                Demande envoyée avec succès !
              </h3>
              <p className="text-emerald-700 text-lg leading-relaxed">
                Votre demande de devis a été transmise à <span className="font-semibold">{artisan.company_name}</span>.
                <br />
                <span className="text-emerald-600">Vous recevrez une réponse sous 24h.</span>
              </p>
            </div>
            
            <div className="bg-white/60 rounded-xl p-4 mb-6 backdrop-blur-sm">
              <p className="text-sm text-emerald-800">
                📧 Un email de confirmation vous a été envoyé
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setIsSuccess(false)}
              className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
            >
              Envoyer une nouvelle demande
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl bg-white overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-bold text-2xl text-slate-900 mb-2">
              Demande de devis
            </CardTitle>
            <p className="text-slate-600 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Recevez un devis personnalisé de <span className="font-semibold text-emerald-700">{artisan.company_name}</span>
            </p>
          </div>
          <Badge className="bg-emerald-100 text-emerald-700 px-3 py-1">
           
          </Badge>
        </div>
        
        {/* Indicateur de progression */}
        <div className="flex items-center justify-between mt-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  currentStep >= step.number
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-emerald-700' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 transition-all ${
                  currentStep > step.number ? 'bg-emerald-600' : 'bg-slate-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Étape 1: Informations personnelles */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="client_name" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nom complet *
                  </Label>
                  <Input
                    id="client_name"
                    required
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="Jean Dupont"
                    className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client_email" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email *
                  </Label>
                  <Input
                    id="client_email"
                    type="email"
                    required
                    value={formData.client_email}
                    onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                    placeholder="jean@email.com"
                    className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client_phone" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Téléphone
                </Label>
                <Input
                  id="client_phone"
                  type="tel"
                  value={formData.client_phone}
                  onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                  placeholder="06 12 34 56 78"
                  className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-emerald-600 hover:bg-emerald-700 px-8 h-12"
                  disabled={!formData.client_name || !formData.client_email}
                >
                  Continuer
                  <FileText className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Étape 2: Projet */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Type de projet
                </Label>
                <Select
                  value={formData.project_type}
                  onValueChange={(value) => setFormData({ ...formData, project_type: value })}
                >
                  <SelectTrigger className="border-slate-200 focus:border-emerald-500 h-12">
                    <SelectValue placeholder="Sélectionnez le type de travaux" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reparation">🔧 Réparation de toiture</SelectItem>
                    <SelectItem value="renovation">🏠 Rénovation complète</SelectItem>
                    <SelectItem value="neuf">✨ Construction neuve</SelectItem>
                    <SelectItem value="isolation">🛡️ Isolation</SelectItem>
                    <SelectItem value="demoussage">🧽 Démoussage</SelectItem>
                    <SelectItem value="gouttiere">💧 Gouttières</SelectItem>
                    <SelectItem value="autre">📋 Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project_description" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Description du projet
                </Label>
                <Textarea
                  id="project_description"
                  value={formData.project_description}
                  onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
                  placeholder="Décrivez votre projet en détail : surface, matériaux souhaités, contraintes particulières..."
                  rows={5}
                  className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Euro className="h-4 w-4" />
                  Budget approximatif
                </Label>
                <Select
                  value={formData.budget_range}
                  onValueChange={(value) => setFormData({ ...formData, budget_range: value })}
                >
                  <SelectTrigger className="border-slate-200 focus:border-emerald-500 h-12">
                    <SelectValue placeholder="Sélectionnez votre budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moins-5000">💰 Moins de 5 000€</SelectItem>
                    <SelectItem value="5000-10000">💰💰 5 000€ - 10 000€</SelectItem>
                    <SelectItem value="10000-20000">💰💰💰 10 000€ - 20 000€</SelectItem>
                    <SelectItem value="20000-50000">💰💰💰💰 20 000€ - 50 000€</SelectItem>
                    <SelectItem value="plus-50000">💰💰💰💰💰 Plus de 50 000€</SelectItem>
                    <SelectItem value="non-defini">❓ Non défini</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="px-8 h-12"
                >
                  Retour
                </Button>
                <Button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="bg-emerald-600 hover:bg-emerald-700 px-8 h-12"
                >
                  Continuer
                  <Send className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Étape 3: Finalisation */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-4">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Urgence du projet
                </Label>
                <RadioGroup
                  value={formData.urgency}
                  onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-3 border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="immediate" id="immediate" />
                    <Label htmlFor="immediate" className="flex items-center cursor-pointer flex-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">Urgent</p>
                        <p className="text-xs text-slate-500">Intervention rapide</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="within_week" id="within_week" />
                    <Label htmlFor="within_week" className="flex items-center cursor-pointer flex-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">Cette semaine</p>
                        <p className="text-xs text-slate-500">Sous 7 jours</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="within_month" id="within_month" />
                    <Label htmlFor="within_month" className="flex items-center cursor-pointer flex-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">Ce mois-ci</p>
                        <p className="text-xs text-slate-500">Sous 30 jours</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="no_rush" id="no_rush" />
                    <Label htmlFor="no_rush" className="flex items-center cursor-pointer flex-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium">Pas pressé</p>
                        <p className="text-xs text-slate-500">Quand c'est possible</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-slate-700">Contact préféré</Label>
                <RadioGroup
                  value={formData.preferred_contact}
                  onValueChange={(value) => setFormData({ ...formData, preferred_contact: value })}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-3 border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email" className="flex items-center cursor-pointer">
                      <Mail className="h-4 w-4 mr-2 text-blue-600" />
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="phone" id="phone" />
                    <Label htmlFor="phone" className="flex items-center cursor-pointer">
                      <Phone className="h-4 w-4 mr-2 text-green-600" />
                      Téléphone
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both" className="flex items-center cursor-pointer">
                      <div className="flex -space-x-1 mr-2">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <Phone className="h-4 w-4 text-green-600" />
                      </div>
                      Les deux
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  className="px-8 h-12"
                >
                  Retour
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 px-8 h-12 shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer ma demande
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}