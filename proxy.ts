import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
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
    "/",
  ],
};
