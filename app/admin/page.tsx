

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ArtisansList  from "@/components/artisans-list"
import { getAllArtisans } from "@/lib/database"
import { SignOutButton } from "@clerk/nextjs"

interface ArtisansPageProps {
  searchParams: {
    status?: string
    page?: string
  }
}

export default async function ArtisansPage({ searchParams }: ArtisansPageProps) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page) || 1
  const { artisans, total } = await getAllArtisans(searchParam.status, page)

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-end items-center mb-8">
            <SignOutButton>
              <button className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50">
                Déconnexion
              </button>
            </SignOutButton>
          </div>

          <ArtisansList
            initialArtisans={artisans}
            initialTotal={total}
            currentStatus={searchParams.status}
            currentPage={page}
          />

          {/* Pagination */}
          <div className="flex items-center justify-center mt-8">
            {page > 1 && (
              <a
                href={`/admin?page=${page - 1}${searchParams.status ? `&status=${searchParams.status}` : ""}`}
                className="px-4 py-2 text-sm font-medium text-emerald-600 bg-white border border-emerald-300 rounded-md hover:bg-emerald-50"
              >
                Précédent
              </a>
            )}
            <span className="mx-4 text-sm text-slate-600">
              Page {page} sur {Math.ceil(total / 10)}
            </span>
            {page < Math.ceil(total / 10) && (
              <a
                href={`/admin?page=${page + 1}${searchParams.status ? `&status=${searchParams.status}` : ""}`}
                className="px-4 py-2 text-sm font-medium text-emerald-600 bg-white border border-emerald-300 rounded-md hover:bg-emerald-50"
              >
                Suivant
              </a>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
