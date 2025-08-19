// lib/actions/admin.ts
'use server'

import { writeFile } from 'fs/promises'
import { join } from 'path'
import { revalidatePath } from 'next/cache'
import artisansData from '@/prisma/data/artisans.json'
import {Artisan} from "@/lib/database";


// Chemin vers le fichier JSON des artisans
const ARTISANS_JSON_PATH = join(process.cwd(), 'prisma/data/artisans.json')

// ===== ACTIONS ARTISANS ===== //

export async function updateArtisanStatus(artisanId: number, status: string) {
    try {
        console.log(`🔄 Updating artisan ${artisanId} status to: ${status}`)

        // Charger les données actuelles
        const artisans: Artisan[] = [...artisansData]

        // Trouver l'artisan
        const artisanIndex = artisans.findIndex(a => a.id === artisanId)

        if (artisanIndex === -1) {
            throw new Error(`Artisan with ID ${artisanId} not found`)
        }

        let result

        if (status === "rejected") {
            // Supprimer l'artisan du tableau
            result = artisans[artisanIndex]
            artisans.splice(artisanIndex, 1)
        } else {
            // Mettre à jour le statut
            artisans[artisanIndex] = {
                ...artisans[artisanIndex],
                status,
                updated_at: new Date().toISOString()
            }
            result = artisans[artisanIndex]
        }

        // Sauvegarder dans le fichier JSON
        await writeFile(ARTISANS_JSON_PATH, JSON.stringify(artisans, null, 2), 'utf8')

        // 🔄 Revalidate admin pages
        revalidatePath('/admin')

        console.log(`✅ Artisan ${artisanId} status updated successfully`)
        return { success: true, data: result }

    } catch (error) {
        console.error(`❌ Error updating artisan status:`, error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

export async function updateArtisanInfo(artisanId: number, data: {
    companyName?: string
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
    featured?: boolean
}) {
    try {
        console.log(`🔄 Updating artisan ${artisanId} info`)

        // Charger les données actuelles
        const artisans: Artisan[] = [...artisansData]

        // Trouver l'artisan
        const artisanIndex = artisans.findIndex(a => a.id === artisanId)

        if (artisanIndex === -1) {
            throw new Error(`Artisan with ID ${artisanId} not found`)
        }

        // Préparer les données de mise à jour
        const updateData: Partial<Artisan> = {
            updated_at: new Date().toISOString()
        }

        // Ajouter seulement les champs définis
        if (data.companyName !== undefined) updateData.companyName = data.companyName
        if (data.contactName !== undefined) updateData.contactName = data.contactName
        if (data.email !== undefined) updateData.email = data.email
        if (data.phone !== undefined) updateData.phone = data.phone
        if (data.address !== undefined) updateData.address = data.address
        if (data.city !== undefined) updateData.city = data.city
        if (data.profileImage !== undefined) updateData.profileImage = data.profileImage
        if (data.website !== undefined) updateData.website = data.website
        if (data.description !== undefined) updateData.description = data.description
        if (data.yearsExperience !== undefined) updateData.yearsExperience = data.yearsExperience
        if (data.services !== undefined) updateData.services = data.services
        if (data.featured !== undefined) updateData.featured = data.featured

        // Mettre à jour l'artisan
        artisans[artisanIndex] = {
            ...artisans[artisanIndex],
            ...updateData
        }

        const result = artisans[artisanIndex]

        // Sauvegarder dans le fichier JSON
        await writeFile(ARTISANS_JSON_PATH, JSON.stringify(artisans, null, 2), 'utf8')

        // 🔄 Revalidate admin pages
        revalidatePath('/admin')
        revalidatePath('/admin/artisans')

        console.log(`✅ Artisan ${artisanId} info updated successfully`)
        return { success: true, data: result }

    } catch (error) {
        console.error(`❌ Error updating artisan info:`, error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

// ===== FONCTION UTILITAIRE POUR AJOUTER UN NOUVEL ARTISAN ===== //

export async function addArtisan(artisanData: Omit<Artisan, 'id' | 'created_at' | 'updated_at'>) {
    try {
        console.log(`🔄 Adding new artisan: ${artisanData.companyName}`)

        // Charger les données actuelles
        const artisans: Artisan[] = [...artisansData]

        // Générer un nouvel ID (le plus grand ID + 1)
        const maxId = Math.max(...artisans.map(a => a.id), 0)
        const newId = maxId + 1

        // Créer le nouvel artisan
        const newArtisan: Artisan = {
            ...artisanData,
            id: newId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        // Ajouter au tableau
        artisans.push(newArtisan)

        // Sauvegarder dans le fichier JSON
        await writeFile(ARTISANS_JSON_PATH, JSON.stringify(artisans, null, 2), 'utf8')

        // 🔄 Revalidate admin pages
        revalidatePath('/admin')
        revalidatePath('/admin/artisans')

        console.log(`✅ Artisan ${newId} added successfully`)
        return { success: true, data: newArtisan }

    } catch (error) {
        console.error(`❌ Error adding artisan:`, error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}