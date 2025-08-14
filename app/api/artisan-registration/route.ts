import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Convertir yearsExperience en nombre si c'est une plage
    let yearsExp: number | null = null
    if (data.yearsExperience) {
      if (data.yearsExperience === "1-5") {
        yearsExp = 3 // moyenne de la plage
      } else if (data.yearsExperience === "5-10") {
        yearsExp = 7
      } else if (data.yearsExperience === "10+") {
        yearsExp = 15
      } else {
        const parsedYears = parseInt(data.yearsExperience)
        if (!isNaN(parsedYears)) {
          yearsExp = parsedYears
        }
      }
    }

    // Vérifier si un artisan existe déjà pour ce département
    const existingArtisan = await prisma.artisan.findFirst({
      where: {
        departmentId: data.departmentId,
      }
    })

    if (existingArtisan) {
      return NextResponse.json({ error: "Un couvreur est déjà inscrit pour ce département" }, { status: 400 })
    }

    // Créer le nouvel artisan (inactif par défaut)
    await prisma.artisan.create({
      data: {
        departmentId: data.departmentId,
        companyName: data.companyName,
        contactName: data.contactName || null,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || null,
        postalCode: data.postalCode || null,
        city: data.city || null,
        siret: data.siret || null,
        yearsExperience: yearsExp,services: Array.isArray(data.specialties)
            ? data.specialties
            : typeof data.specialties === 'string' && data.specialties.trim() !== ''
                ? data.specialties.split(',').map(s => s.trim())
                : [],

        certifications: [],
        insuranceValid: false,
        description: data.description || null,
        website: data.website || null,
        active: true,
        status: "pending"
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur inscription artisan:", error)
    return NextResponse.json({ 
      error: "Erreur lors de l'inscription",
      details: error instanceof Error ? error.message : "Erreur inconnue"
    }, { status: 500 })
  }
}
