import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(['/admin/:path*'])

export default clerkMiddleware(
    async (auth, req) => {
        const ALLOWED_USER_ID = process.env.CLERK_ID
        const userAgent = req.headers.get("user-agent") || "";

        if (userAgent.includes("GPTBot")) {
            return new NextResponse("Blocked for GPTBot", { status: 403 });
        }

        if (isProtectedRoute(req)) {
            const { userId } = await auth.protect()

            if (!userId || userId !== ALLOWED_USER_ID) {
                return NextResponse.redirect(new URL('/sign-in', req.url))
            }
        }
    }
)

export const config = {
    matcher: [
        '/admin/:path*',
    ]
}