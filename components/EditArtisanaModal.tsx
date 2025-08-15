"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    RefreshCw,
    Edit,
    Save,
    Camera,
} from "lucide-react"
import { Label } from "./ui/label"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {updateArtisanInfo} from "@/lib/action";


// Types simulés pour l'exemple
interface Artisan {
    id: number
    companyName: string
    contactName?: string
    email?: string
    phone?: string
    address?: string
    city?: string
    profileImage?: string
    website?: string
    description?: string
    yearsExperience?: number
    services?: string[]
    status: string
    createdAt: string
    department_name?: string
}

interface ArtisansListProps {
    initialArtisans: Artisan[]
    initialTotal: number
    currentStatus?: string
    currentPage: number
}

// Modal d'édition des informations artisan
export function EditArtisanModal({ artisan, onUpdate }: { artisan: Artisan, onUpdate: (id: number, data: any) => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        companyName: artisan.companyName || '',
        contactName: artisan.contactName || '',
        email: artisan.email || '',
        phone: artisan.phone || '',
        address: artisan.address || '',
        city: artisan.city || '',
        profileImage: artisan.profileImage || '',
        website: artisan.website || '',
        description: artisan.description || '',
        yearsExperience: artisan.yearsExperience?.toString() || '',
        services: artisan.services?.join(', ') || ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Convertir yearsExperience en nombre si fourni et services en tableau
            const dataToUpdate = {
                ...formData,
                yearsExperience: formData.yearsExperience ? parseInt(formData.yearsExperience) : undefined,
                services: formData.services
                    ? formData.services.split(',').map(s => s.trim()).filter(s => s.length > 0)
                    : []
            }

            const response = await updateArtisanInfo(artisan.id, dataToUpdate)

            if (response) {
                onUpdate(artisan.id, dataToUpdate)
                setIsOpen(false)
            }
        } catch (error) {
            console.error("Erreur:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                    <Edit className="h-3 w-3" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Edit className="h-5 w-5 text-blue-600" />
                        Modifier l'artisan
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image de profil */}
                    <div className="space-y-2">
                        <Label htmlFor="profileImage">Photo de profil</Label>
                        <div className="flex items-center gap-3">
                            {formData.profileImage ? (
                                <img
                                    src={formData.profileImage}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-lg object-cover border"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-lg bg-slate-100 border flex items-center justify-center">
                                    <Camera className="h-6 w-6 text-slate-400" />
                                </div>
                            )}
                            <Input
                                id="profileImage"
                                type="url"
                                placeholder="URL de l'image"
                                value={formData.profileImage}
                                onChange={(e) => handleInputChange('profileImage', e.target.value)}
                                className="flex-1"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Nom de l'entreprise */}
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="companyName">Nom de l&apos;entreprise *</Label>
                            <Input
                                id="companyName"
                                value={formData.companyName}
                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                                placeholder="Nom de l'entreprise"
                                required
                            />
                        </div>

                        {/* Nom du contact */}
                        <div className="space-y-2">
                            <Label htmlFor="contactName">Nom du contact</Label>
                            <Input
                                id="contactName"
                                value={formData.contactName}
                                onChange={(e) => handleInputChange('contactName', e.target.value)}
                                placeholder="Nom du contact"
                            />
                        </div>

                        {/* Années d'expérience */}
                        <div className="space-y-2">
                            <Label htmlFor="yearsExperience">Années d&apos;expérience</Label>
                            <Input
                                id="yearsExperience"
                                type="number"
                                min="0"
                                max="50"
                                value={formData.yearsExperience}
                                onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                                placeholder="Ex: 5"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="email@exemple.com"
                            />
                        </div>

                        {/* Téléphone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="06 12 34 56 78"
                            />
                        </div>

                        {/* Adresse */}
                        <div className="space-y-2">
                            <Label htmlFor="address">Adresse</Label>
                            <Input
                                id="address"
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                placeholder="Adresse complète"
                            />
                        </div>

                        {/* Ville */}
                        <div className="space-y-2">
                            <Label htmlFor="city">Ville</Label>
                            <Input
                                id="city"
                                value={formData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                placeholder="Ville"
                            />
                        </div>
                    </div>

                    {/* Site web */}
                    <div className="space-y-2">
                        <Label htmlFor="website">Site web</Label>
                        <Input
                            id="website"
                            type="url"
                            value={formData.website}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            placeholder="https://www.exemple.com"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Décrivez l'activité, les spécialités, les services proposés..."
                            rows={4}
                            className="resize-none"
                        />
                    </div>

                    {/* Services */}
                    <div className="space-y-2">
                        <Label htmlFor="services">Services proposés</Label>
                        <Textarea
                            id="services"
                            value={formData.services}
                            onChange={(e) => handleInputChange('services', e.target.value)}
                            placeholder="Plomberie, Électricité, Chauffage, Climatisation (séparez par des virgules)"
                            rows={3}
                            className="resize-none"
                        />
                        <p className="text-xs text-gray-500">
                            Séparez les services par des virgules. Ex: Plomberie, Électricité, Chauffage
                        </p>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={isLoading}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !formData.companyName.trim()}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isLoading ? (
                                <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    Enregistrement...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Enregistrer
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}