import { type NextRequest, NextResponse } from "next/server"
import { updateArtisanStatus } from "@/lib/database"

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ error: "ID et statut requis" }, { status: 400 })
    }

    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 })
    }

    await updateArtisanStatus(id, status)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
