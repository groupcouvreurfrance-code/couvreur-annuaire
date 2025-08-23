'use client'

import { useEffect, useState } from 'react'
import { CloudSun, CloudRain, Sun, Cloud, Thermometer, Droplets, Wind } from 'lucide-react'

interface MeteoData {
    temperature: number
    conditions: string
    icon: string
    humidity: number
    windSpeed: number
    forecast: Array<{
        day: string
        temp: number
        icon: string
    }>
}

interface MeteoCommuneProps {
    nomCommune: string
    departement: string
}

async function getMeteoFromCommune(nomCommune: string, departement: string): Promise<MeteoData | null> {

    console.log(`Recherche météo pour la commune: ${nomCommune}, département: ${departement}`)

    try {
        // Utilisation de l'API Open-Meteo avec géocoding par nom
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nomCommune)}&count=1&language=fr&format=json`
        )
        const geoData = await geoResponse.json()

        if (!geoData.results || geoData.results.length === 0) return null

        const { latitude, longitude } = geoData.results[0]

        // Requête météo
        const meteoResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max&timezone=auto&forecast_days=3`
        )
        const meteoData = await meteoResponse.json()

        // Conversion des codes météo
        const weatherCodes: Record<number, { icon: string; label: string }> = {
            0: { icon: '☀️', label: 'Ensoleillé' },
            1: { icon: '🌤️', label: 'Peu nuageux' },
            2: { icon: '⛅', label: 'Partiellement nuageux' },
            3: { icon: '☁️', label: 'Couvert' },
            45: { icon: '🌫️', label: 'Brouillard' },
            51: { icon: '🌧️', label: 'Bruine' },
            53: { icon: '🌧️', label: 'Pluie modérée' },
            55: { icon: '🌧️', label: 'Forte pluie' },
            61: { icon: '🌧️', label: 'Pluie légère' },
            63: { icon: '🌧️', label: 'Pluie' },
            65: { icon: '🌧️', label: 'Forte pluie' },
            80: { icon: '🌦️', label: 'Averses' },
            81: { icon: '🌦️', label: 'Averses modérées' },
            82: { icon: '🌦️', label: 'Fortes averses' },
            95: { icon: '⛈️', label: 'Orage' },
            96: { icon: '⛈️', label: 'Orage avec grêle' },
        }

        const currentWeather = weatherCodes[meteoData.current.weather_code] || { icon: '❓', label: 'Inconnu' }

        return {
            temperature: meteoData.current.temperature_2m,
            conditions: currentWeather.label,
            icon: currentWeather.icon,
            humidity: meteoData.current.relative_humidity_2m,
            windSpeed: meteoData.current.wind_speed_10m,
            forecast: meteoData.daily.time.map((day: string, index: number) => {
                const weather = weatherCodes[meteoData.daily.weather_code[index]] || { icon: '❓', label: 'Inconnu' }
                return {
                    day: new Date(day).toLocaleDateString('fr-FR', { weekday: 'short' }),
                    temp: meteoData.daily.temperature_2m_max[index],
                    icon: weather.icon
                }
            })
        }
    } catch (error) {
        console.error('Erreur météo:', error)
        return null
    }
}

export default function MeteoCommune({ nomCommune, departement }: MeteoCommuneProps) {
    const [meteo, setMeteo] = useState<MeteoData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchMeteo = async () => {
            try {
                setLoading(true)
                let communeNormalisee = nomCommune.trim();

                // Expression régulière pour détecter "Xème arrondissement" à la fin
                const regexArrondissement = /(\d+)(?:er|eme|e)?\s*arrondissement$/i;

                if (regexArrondissement.test(communeNormalisee)) {
                    // Supprimer la partie "arrondissement" et garder seulement le nom de base
                    communeNormalisee = communeNormalisee.replace(regexArrondissement, '').trim();

                    // Si le résultat est vide (cas rare), on garde le nom original
                    if (communeNormalisee === '') {
                        communeNormalisee = nomCommune;
                    }
                }
                nomCommune =communeNormalisee

                const data = await getMeteoFromCommune(nomCommune, departement)
                if (data) {
                    setMeteo(data)
                } else {
                    setError(true)
                }
            } catch (err) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchMeteo()
    }, [nomCommune, departement])

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 h-64 animate-pulse">
                <div className="h-6 w-1/2 bg-slate-200 rounded mb-4"></div>
                <div className="flex justify-center my-8">
                    <div className="h-16 w-16 bg-slate-200 rounded-full"></div>
                </div>
                <div className="h-4 w-full bg-slate-200 rounded"></div>
            </div>
        )
    }

    if (error || !meteo) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    Météo à {nomCommune}
                </h3>
                <div className="text-center py-8 text-slate-500">
                    Données météo non disponibles
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-2xl border-1 overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    Météo à {nomCommune}
                </h3>

                <div className="flex flex-col items-center py-4">
                    <div className="text-5xl mb-2">{meteo.icon}</div>
                    <div className="text-3xl font-bold">{Math.round(meteo.temperature)}°C</div>
                    <div className="text-slate-600 mb-4">{meteo.conditions}</div>

                    <div className="flex gap-6 text-sm text-center">
                        <div className="flex items-center">
                            <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                            <span>{meteo.humidity}%</span>
                        </div>
                        <div className="flex items-center">
                            <Wind className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{Math.round(meteo.windSpeed)} km/h</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-sm mt-6">
                    {meteo.forecast.map((day, index) => (
                        <div key={index} className="bg-slate-50 p-2 rounded">
                            <div className="font-medium">{day.day}</div>
                            <div className="text-xl my-1">{day.icon}</div>
                            <div>{Math.round(day.temp)}°</div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 text-center">
                    <a
                        href={`https://www.meteoblue.com/fr/meteo/semaine/${nomCommune.toLowerCase()}_france_${departement.toLowerCase()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:text-amber-800 text-sm font-medium"
                    >
                        Prévisions détaillées
                    </a>
                </div>
            </div>
        </div>
    )
}