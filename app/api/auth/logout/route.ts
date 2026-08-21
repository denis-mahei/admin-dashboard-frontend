import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiServer } from "@/lib/api/api.server";

export async function GET() {
  try {
    await apiServer.get("/auth/logout");
  } catch (e) {
    console.error("NestJS logout failed:", e);
  }

  const cookieStore = await cookies();
  cookieStore.delete("access_token");

  return NextResponse.json({ success: true });
}
