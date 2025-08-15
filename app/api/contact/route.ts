import { type NextRequest, NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validation basique
    if (!data.artisan_id || !data.client_name || !data.client_email) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 })
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.client_email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 })
    }


    // Envoyer les emails
    await sendContactEmail({
      artisanEmail: data.artisan.email!,
      clientName: data.client_name,
      clientEmail: data.client_email,
      clientPhone: data.client_phone,
      projectType: data.project_type,
      projectDescription: data.project_description,
      urgency: data.urgency,
      preferredContact: data.preferred_contact,
    })

    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error("Erreur lors de la création de la demande:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
