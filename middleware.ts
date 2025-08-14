import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Routes protégées
const isProtectedRoute = createRouteMatcher(['/admin'])

// Middleware Clerk
export default clerkMiddleware(async (auth, req) => {
    // Si c'est une route protégée, applique auth.protect()
    if (isProtectedRoute(req)) await auth.protect()
})

// Configuration du matcher
export const config = {
    matcher: [
        // Toutes les routes sauf _next, fichiers statiques ET sitemap
        '/((?!_next|sitemap(?:-[^/]*)?\\.xml|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
}
