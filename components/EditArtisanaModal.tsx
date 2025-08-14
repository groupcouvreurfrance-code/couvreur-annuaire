"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    RefreshCw,
    Edit,
    Save,
    Camera,
} from "lucide-react"
import { Label } from "./ui/label"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";


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
        profileImage: artisan.profileImage || ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch("/api/admin/artisans/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: artisan.id, ...formData }),
            })

            if (response.ok) {
                onUpdate(artisan.id, formData)
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
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Edit className="h-5 w-5 text-blue-600" />
                        Modifier l'artisan
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    {/* Nom de l'entreprise */}
                    <div className="space-y-2">
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

                    <div className="grid grid-cols-2 gap-4">
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

                    <div className="flex justify-end gap-2 pt-4">
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
