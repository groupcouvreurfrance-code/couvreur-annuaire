'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'

// Import dynamique pour éviter les problèmes SSR avec Leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
    ssr: false,
    loading: () => (
        <div className="h-96 bg-slate-100 animate-pulse rounded-lg flex items-center justify-center">
            <MapPin className="h-8 w-8 text-slate-400" />
        </div>
    )
})

const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })

interface CarteCoordonnees {
    lat: number
    lon: number
}

interface CarteCommuneProps {
    nomCommune: string
    departement: string
    artisanNom?: string
}

// Fonction pour récupérer les coordonnées d'une commune
async function getCoordinatesFromCommune(nomCommune: string, departement: string): Promise<CarteCoordonnees | null> {
    try {
        const query = encodeURIComponent(`${nomCommune}, ${departement}, France`)
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`)
        const data = await response.json()

        if (data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            }
        }
        return null
    } catch (error) {
        console.error('Erreur lors de la récupération des coordonnées:', error)
        return null
    }
}

export default function CarteCommune({ nomCommune, departement, artisanNom }: CarteCommuneProps) {
    const [coordinates, setCoordinates] = useState<CarteCoordonnees | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                setLoading(true)
                const coords = await getCoordinatesFromCommune(nomCommune, departement)
                if (coords) {
                    setCoordinates(coords)
                } else {
                    setError(true)
                }
            } catch (err) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchCoordinates()
    }, [nomCommune, departement])

    if (loading) {
        return (
            <div className="h-96 bg-slate-100 animate-pulse rounded-lg flex items-center justify-center">
                <div className="text-center">
                    <MapPin className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500">Chargement de la carte...</p>
                </div>
            </div>
        )
    }

    if (error || !coordinates) {
        return (
            <div className="h-96 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-200">
                <div className="text-center">
                    <MapPin className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500">Carte non disponible pour cette commune</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg border border-slate-200">
            <MapContainer
                center={[coordinates.lat, coordinates.lon]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <Marker position={[coordinates.lat, coordinates.lon]}>
                    <Popup>
                        <div className="text-center p-2">
                            <h3 className="font-semibold text-slate-900">{nomCommune}</h3>
                            <p className="text-sm text-slate-600">{departement}</p>
                            {artisanNom && (
                                <p className="text-sm text-emerald-600 mt-1">
                                    📍 {artisanNom}
                                </p>
                            )}
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}