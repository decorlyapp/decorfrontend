import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Define public and private routes
const publicRoutes = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/verify-signup-link",
  "/studio$",  // Only matches exactly /studio
  "/_next(.*)",
  "/favicon.ico",
  "/images(.*)",
])

const privateRoutes = createRouteMatcher([
  "/profile(.*)",
  "/settings(.*)",
  "/studio/:id(.*)",  // Matches /studio/ followed by any path segment
])

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes without authentication
  if (publicRoutes(req)) {
    return
  }

  // Protect private routes
  if (privateRoutes(req)) {
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)
    return NextResponse.redirect(signInUrl)
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}