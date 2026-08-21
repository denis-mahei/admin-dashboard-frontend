import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiServer } from "@/lib/api/api.server";
import axios from "axios";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const { id } = await params;
  const body = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { data } = await apiServer.patch(`/suppliers/${id}`, body, {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error?.response?.data.message },
        { status: error?.response?.status },
      );
    }
  }
}
