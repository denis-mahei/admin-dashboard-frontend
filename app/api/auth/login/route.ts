import { NextRequest, NextResponse } from "next/server";
import { apiServer } from "@/lib/api/api.server";
import { cookies } from "next/headers";
import { parseCookie } from "cookie";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const res = await apiServer.post("/auth/login", body);

    const cookieStore = await cookies();
    const setCookie = res.headers["set-cookie"];

    if (setCookie) {
      const cookieArr = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArr) {
        const parsed = parseCookie(cookieStr);
        const options = {
          httpOnly: true,
          sameSite: "lax" as const,
          secure: process.env.NODE_ENV === "production",
          path: parsed.Path || "/",
        };
        if (parsed.access_token) {
          cookieStore.set("access_token", parsed.access_token, options);
        }
      }
      return NextResponse.json(res.data);
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return NextResponse.json(
        { message: e?.response?.data?.message ?? "Login failed." },
        { status: e?.response?.status ?? 500 },
      );
    }
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
