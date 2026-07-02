import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth")
    const isApiRoute = req.nextUrl.pathname.startsWith("/api")

    // Let API routes and auth page through
    if (isApiRoute || isAuthPage) return NextResponse.next()

    // Redirect to login if not logged in and trying to access protected page
    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/auth", req.url))
    }

    return NextResponse.next()
})

// Which routes this middleware runs on
export const config = {
    matcher: ["/dashboard/:path*", "/applications/:path*", "/companies/:path*"],
}