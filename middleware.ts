import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/admin'])

export default clerkMiddleware(
    async (auth, req) => {
        const ALLOWED_USER_ID = process.env.CLERK_ID

        if (isProtectedRoute(req)) {
            await auth.protect()
            const { userId } = await auth()

            // Si l'utilisateur n'est pas autorisé, rediriger
            if (!userId || userId !== ALLOWED_USER_ID) {
                // La session sera automatiquement gérée par Clerk lors de la redirection
                return Response.redirect(new URL('/sign-out', req.url))
            }
        }
    },
    {
        // SEULE ADDITION : tolérance pour le décalage d'horloge en dev
        ...(process.env.NODE_ENV === 'development' && {
            clockSkewInMs: 7200000 // 2 heures de tolérance
        })
    }
)

export const config = {
    matcher: [
        '/((?!_next|sitemap(?:-[^/]*)?\\.xml|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
}