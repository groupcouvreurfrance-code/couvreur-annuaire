// app/api/admin/artisans/update/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { updateArtisanInfo } from '@/lib/database'

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            id,
            companyName,
            contactName,
            email,
            phone,
            address,
            city,
            profileImage
        } = body

        // Validation basique
        if (!id) {
            return NextResponse.json(
                { error: 'ID artisan requis' },
                { status: 400 }
            )
        }

        if (!companyName || companyName.trim() === '') {
            return NextResponse.json(
                { error: 'Le nom de l\'entreprise est obligatoire' },
                { status: 400 }
            )
        }

        // Validation email si fourni
        if (email && email.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                return NextResponse.json(
                    { error: 'Format d\'email invalide' },
                    { status: 400 }
                )
            }
        }

        // Mise à jour de l'artisan
        const updatedArtisan = await updateArtisanInfo(parseInt(id), {
            companyName: companyName?.trim(),
            contactName: contactName?.trim() || null,
            email: email?.trim() || null,
            phone: phone?.trim() || null,
            address: address?.trim() || null,
            city: city?.trim() || null,
            profileImage: profileImage?.trim() || null,
        })

        return NextResponse.json({
            success: true,
            artisan: updatedArtisan,
            message: 'Artisan mis à jour avec succès'
        })

    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'artisan:', error)

        // Gestion des erreurs Prisma spécifiques
        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'Cet email est déjà utilisé par un autre artisan' },
                { status: 409 }
            )
        }

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Artisan non trouvé' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { error: 'Erreur interne du serveur' },
            { status: 500 }
        )
    }
}