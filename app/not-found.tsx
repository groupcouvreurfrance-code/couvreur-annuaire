import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="font-serif font-bold text-6xl text-slate-900 mb-4">404</h1>
          <h2 className="font-serif font-semibold text-2xl text-slate-700 mb-4">Page non trouvée</h2>
          <p className="text-slate-600 mb-8 max-w-md">La page que vous recherchez n'existe pas ou a été déplacée.</p>
          <Link href="/">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Retour à l'accueil</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
