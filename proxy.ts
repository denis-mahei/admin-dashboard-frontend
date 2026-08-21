import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const access_token = req.cookies.has("access_token");

  if (!access_token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/orders",
    "/customers",
    "/suppliers",
    "/products/:path*",
  ],
};
