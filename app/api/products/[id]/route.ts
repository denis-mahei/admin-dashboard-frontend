import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiServer } from "@/lib/api/api.server";
import axios from "axios";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  try {
    const { data } = await apiServer.patch(`/products/${id}`, body, {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return NextResponse.json(data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return NextResponse.json(
        { message: e?.response?.data?.message },
        { status: e?.response?.status },
      );
    }
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  console.log(id);
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data } = await apiServer.delete(`/products/${id}`, {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return NextResponse.json(data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return NextResponse.json(
        { message: e?.response?.data?.message },
        { status: e?.response?.status },
      );
    }
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 },
    );
  }
}
