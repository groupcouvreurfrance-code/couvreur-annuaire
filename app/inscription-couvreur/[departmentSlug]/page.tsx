import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArtisanRegistrationForm } from "@/components/artisan-registration-form"
import { getDepartmentBySlug } from "@/lib/database"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"

interface RegistrationPageProps {
  params: {
    departmentSlug: string
  }
}

export async function generateMetadata({ params }: RegistrationPageProps): Promise<Metadata> {
  const department = await getDepartmentBySlug(params.departmentSlug)

  if (!department) {
    return {
      title: "Département non trouvé",
    }
  }

  return {
    title: `Inscription Couvreur ${department.name} - Rejoignez notre réseau`,
    description: `Inscrivez-vous comme couvreur professionnel dans le ${department.name}. Développez votre activité avec notre plateforme.`,
    robots: "noindex, nofollow", // Pas d'indexation pour les pages d'inscription
  }
}

export default async function RegistrationPage({ params }: RegistrationPageProps) {
  const department = await getDepartmentBySlug(params.departmentSlug)

  if (!department) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Breadcrumb */}
        <section className="py-4 bg-slate-50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-slate-600">
              <Link href="/" className="hover:text-emerald-600">
                Accueil
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/departement/${department.slug}`} className="hover:text-emerald-600">
                {department.name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-900">Inscription Couvreur</span>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <ArtisanRegistrationForm departmentId={department.id} departmentName={department.name} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
