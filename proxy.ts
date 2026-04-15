import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PUBLIC_ROUTES = ["/login", "/register", "/api/auth"];
const AUTH_ROUTES = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = getSessionCookie(request);

  const isPublicRoute =
    PUBLIC_ROUTES.some((route) => pathname.startsWith(route)) ||
    pathname === "/onboarding";

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Autenticado tentando acessar login/register → dashboard
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Não autenticado tentando acessar rota protegida → login
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
