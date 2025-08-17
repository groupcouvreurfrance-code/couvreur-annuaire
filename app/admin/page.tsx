import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ArtisansList  from "@/components/artisans-list"
import { getAllArtisans } from "@/lib/database"
import { SignOutButton } from "@clerk/nextjs"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface ArtisansPageProps {
  searchParams: {
    status?: string
    page?: string
  }
}

function Pagination({ currentPage, totalPages, status }: {
  currentPage: number;
  totalPages: number;
  status?: string;
}) {
  const statusParam = status ? `&status=${status}` : "";

  // Générer les numéros de pages à afficher (adapté pour mobile)
  const getVisiblePages = (isMobile: boolean = false) => {
    const delta = isMobile ? 1 : 2; // Moins de pages sur mobile
    const range = [];
    const rangeWithDots = [];

    // Calculer la plage de pages à afficher
    for (let i = Math.max(2, currentPage - delta);
         i <= Math.min(totalPages - 1, currentPage + delta);
         i++) {
      range.push(i);
    }

    // Ajouter la première page
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // Ajouter la plage calculée
    rangeWithDots.push(...range);

    // Ajouter la dernière page
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  const visiblePagesMobile = getVisiblePages(true);

  if (totalPages <= 1) return null;

  return (
      <div className="mt-8">
        {/* Version mobile */}
        <div className="flex sm:hidden flex-col space-y-4">
          {/* Navigation simplifiée pour mobile */}
          <div className="flex items-center justify-between">
            <a
                href={`/admin?page=${Math.max(1, currentPage - 1)}${statusParam}`}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md border ${
                    currentPage === 1
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'text-amber-600 border-amber-300 hover:bg-amber-50'
                }`}
                aria-disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Précédent
            </a>

            <span className="text-sm text-gray-600 px-4">
            {currentPage} / {totalPages}
          </span>

            <a
                href={`/admin?page=${Math.min(totalPages, currentPage + 1)}${statusParam}`}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md border ${
                    currentPage === totalPages
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'text-amber-600 border-amber-300 hover:bg-amber-50'
                }`}
                aria-disabled={currentPage === totalPages}
            >
              Suivant
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>

          {/* Pages rapides pour mobile */}
          <div className="flex items-center justify-center space-x-1 overflow-x-auto">
            {/* Première page */}
            <a
                href={`/admin?page=1${statusParam}`}
                className={`flex-shrink-0 p-2 rounded-md border ${
                    currentPage === 1
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'text-amber-600 border-amber-300 hover:bg-amber-50'
                }`}
            >
              <ChevronsLeft className="h-4 w-4" />
            </a>

            {/* Numéros de pages mobiles */}
            {visiblePagesMobile.map((page, index) => (
                page === '...' ? (
                    <span key={`dots-${index}`} className="px-2 py-1 text-gray-500 text-sm">
                ...
              </span>
                ) : (
                    <a
                        key={page}
                        href={`/admin?page=${page}${statusParam}`}
                        className={`flex-shrink-0 min-w-[36px] h-9 px-2 py-1 text-sm font-medium rounded-md border text-center flex items-center justify-center ${
                            currentPage === page
                                ? 'bg-amber-600 text-white border-amber-600'
                                : 'text-amber-600 border-amber-300 hover:bg-amber-50'
                        }`}
                    >
                      {page}
                    </a>
                )
            ))}

            {/* Dernière page */}
            <a
                href={`/admin?page=${totalPages}${statusParam}`}
                className={`flex-shrink-0 p-2 rounded-md border ${
                    currentPage === totalPages
                        ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'text-amber-600 border-amber-300 hover:bg-amber-50'
                }`}
            >
              <ChevronsRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Version desktop */}
        <div className="hidden sm:flex items-center justify-center space-x-2">
          {/* Aller au début */}
          <a
              href={`/admin?page=1${statusParam}`}
              className={`p-2 rounded-md border ${
                  currentPage === 1
                      ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'text-amber-600 border-amber-300 hover:bg-amber-50'
              }`}
              aria-disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Première page</span>
          </a>

          {/* Page précédente */}
          <a
              href={`/admin?page=${Math.max(1, currentPage - 1)}${statusParam}`}
              className={`p-2 rounded-md border ${
                  currentPage === 1
                      ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'text-amber-600 border-amber-300 hover:bg-amber-50'
              }`}
              aria-disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Page précédente</span>
          </a>

          {/* Numéros de pages */}
          <div className="flex items-center space-x-1">
            {visiblePages.map((page, index) => (
                page === '...' ? (
                    <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
                ) : (
                    <a
                        key={page}
                        href={`/admin?page=${page}${statusParam}`}
                        className={`min-w-[40px] h-10 px-3 py-2 text-sm font-medium rounded-md border text-center ${
                            currentPage === page
                                ? 'bg-amber-600 text-white border-amber-600'
                                : 'text-amber-600 border-amber-300 hover:bg-amber-50'
                        }`}
                    >
                      {page}
                    </a>
                )
            ))}
          </div>

          {/* Page suivante */}
          <a
              href={`/admin?page=${Math.min(totalPages, currentPage + 1)}${statusParam}`}
              className={`p-2 rounded-md border ${
                  currentPage === totalPages
                      ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'text-amber-600 border-amber-300 hover:bg-amber-50'
              }`}
              aria-disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Page suivante</span>
          </a>

          {/* Aller à la fin */}
          <a
              href={`/admin?page=${totalPages}${statusParam}`}
              className={`p-2 rounded-md border ${
                  currentPage === totalPages
                      ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'text-amber-600 border-amber-300 hover:bg-amber-50'
              }`}
              aria-disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Dernière page</span>
          </a>

          {/* Informations de pagination */}
          <div className="ml-4 text-sm text-gray-600">
            Page {currentPage} sur {totalPages}
          </div>
        </div>
      </div>
  );
}

export default async function ArtisansPage({ searchParams }: ArtisansPageProps) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page) || 1
  const { artisans, total } = await getAllArtisans(searchParam.status, page)
  const totalPages = Math.ceil(total / 10)

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
                currentStatus={searchParam.status}
                currentPage={page}
            />

            {/* Pagination améliorée */}
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                status={searchParam.status}
            />
          </div>
        </main>
        <Footer />
      </div>
  )
}