import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import {NextResponse} from "next/server";

const isProtectedRoute = createRouteMatcher(['/admin'])

export default clerkMiddleware(
    async (auth, req) => {
        const ALLOWED_USER_ID = process.env.CLERK_ID
        const userAgent = req.headers.get("user-agent") || "";

        // 🚫 Bloquer GPTBot
        if (userAgent.includes("GPTBot")) {
            return new NextResponse("Blocked for GPTBot", { status: 403 });
        }
        if (isProtectedRoute(req)) {
            await auth.protect()
            const { userId } = await auth()

            // Si l'utilisateur n'est pas autorisé, rediriger
            if (!userId || userId !== ALLOWED_USER_ID) {
                // La session sera automatiquement gérée par Clerk lors de la redirection
                return NextResponse.redirect(new URL('/sign-out', req.url))
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
        '/admin/:path*',
    ]
}