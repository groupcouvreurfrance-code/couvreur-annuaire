"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ArtisanRegistrationFormProps {
  departmentId: number
  departmentName: string
}

export function ArtisanRegistrationForm({ departmentId, departmentName }: ArtisanRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      departmentId,
      companyName: formData.get("companyName"),
      contactName: formData.get("contactName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      siret: formData.get("siret"),
      yearsExperience: formData.get("yearsExperience"),
      specialties: formData.get("specialties"),
      description: formData.get("description"),
      website: formData.get("website"),
    }

    try {
      // Envoyer les données à l'API d'inscription
      const response = await fetch("/api/artisan-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // Si l'inscription est réussie, envoyer l'email à l'admin
        const notificationResponse = await fetch("/api/artisan-notification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            departmentName,
          }),
        })

        if (notificationResponse.ok) {
          setIsSubmitted(true)
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-serif font-bold text-2xl text-slate-900 mb-2">Inscription reçue !</h3>
          <p className="text-slate-600">
            Votre demande d&apos;inscription pour le {departmentName} a été reçue. Nous vous recontacterons sous 48h pour
            valider votre profil.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-center">Inscription Couvreur - {departmentName}</CardTitle>
        <p className="text-slate-600 text-center">Rejoignez notre réseau et développez votre activité</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Nom de l'entreprise *</Label>
              <Input id="companyName" name="companyName" required />
            </div>
            <div>
              <Label htmlFor="contactName">Nom du contact *</Label>
              <Input id="contactName" name="contactName" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone *</Label>
              <Input id="phone" name="phone" type="tel" required />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Adresse complète *</Label>
            <Input id="address" name="address" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siret">SIRET *</Label>
              <Input id="siret" name="siret" required />
            </div>
            <div>
              <Label htmlFor="yearsExperience">Années d'expérience</Label>
              <Select name="yearsExperience">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5 ans</SelectItem>
                  <SelectItem value="5-10">5-10 ans</SelectItem>
                  <SelectItem value="10-20">10-20 ans</SelectItem>
                  <SelectItem value="20+">Plus de 20 ans</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="specialties">Spécialités</Label>
            <Input id="specialties" name="specialties" placeholder="Ex: Tuiles, Ardoises, Zinc, Charpente..." />
          </div>

          <div>
            <Label htmlFor="description">Description de votre activité</Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Présentez votre entreprise et vos services..."
            />
          </div>

          <div>
            <Label htmlFor="website">Site web (optionnel)</Label>
            <Input id="website" name="website" type="url" placeholder="https://" />
          </div>

          <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={isSubmitting}>
            {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
