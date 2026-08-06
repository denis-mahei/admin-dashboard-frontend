"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getProducts = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  try {
    const { data } = await api.get("/products", {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSuppliers = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const { data } = await api.get("/suppliers", {
    headers: {
      Cookie: `access_token=${token}`,
    },
  });
  return data;
};

export const getCustomers = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  try {
    const { data } = await api.get("/customers", {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDashboardData = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const { data } = await api.get("/dashboard", {
    headers: {
      Cookie: `access_token=${token}`,
    },
  });
  return data;
};

export const getOrders = async ({
  name,
  sortBy = "name",
  order = "asc",
  page = 1,
  limit = 5,
}: {
  name: string;
  sortBy: string;
  order: string;
  page: number;
  limit: number;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" });
  }
  const { data } = await api.get("/orders", {
    headers: {
      Cookie: `access_token=${token}`,
    },
    params: {
      name,
      sortBy,
      order,
      page,
      limit,
    },
  });
  return data;
};
