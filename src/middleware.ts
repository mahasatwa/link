import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "link-admin-token";
const jwtSecret = process.env.JWT_SECRET;

async function isAuthenticated(token: string): Promise<boolean> {
  if (!jwtSecret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(jwtSecret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !(await isAuthenticated(token))) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
