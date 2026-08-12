"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ProductRequest } from "@/lib/types/definitions";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getProducts = async ({
  name,
  category,
  page = 1,
  limit = 5,
}: {
  name: string;
  category: string;
  page: number;
  limit: number;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const { data } = await api.get("/products", {
      headers: {
        Cookie: `access_token=${token}`,
      },
      params: {
        name,
        category,
        page,
        limit,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to get products");
  }
};

export const addNewProduct = async (payload: ProductRequest) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const { data } = await api.post(`/products`, payload, {
      headers: { Cookie: `access_token=${token}` },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to add product");
  }
};

export const updateProduct = async (id: number, payload: ProductRequest) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const { data } = await api.patch(`/products/${id}`, payload, {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (id: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    await api.delete(`/products/${id}`, {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
  } catch (error) {
    throw new Error("Failed to delete product");
  }
};

export const getSuppliers = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const { data } = await api.get("/suppliers", {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch suppliers");
  }
};

export const getCustomers = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const { data } = await api.get("/customers", {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch customers");
  }
};

export const getDashboardData = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const { data } = await api.get("/dashboard", {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch dashboard data");
  }
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
    throw new Error("Unauthorized");
  }
  try {
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
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
};
