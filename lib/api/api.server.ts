"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { handleApiError } from "@/lib/utils/errorHandler";

export const apiServer = axios.create({
  baseURL: process.env.API_BASE_URL,
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
    const { data } = await apiServer.get("/products", {
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

export const getSupplierLookUp = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const { data } = await apiServer.get("/suppliers/lookup", {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getSuppliers = async ({
  name,
  page = 1,
  limit = 5,
  sortBy = "name",
  order = "asc",
}: {
  name: string;
  page: number;
  limit: number;
  sortBy?: string;
  order?: string;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const { data } = await apiServer.get("/suppliers", {
      headers: {
        Cookie: `access_token=${token}`,
      },
      params: {
        name,
        page,
        limit,
        sortBy,
        order,
      },
    });
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getCustomers = async ({
  name,
  page = 1,
  limit = 5,
}: {
  name: string;
  page: number;
  limit: number;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const { data } = await apiServer.get("/customers", {
      headers: {
        Cookie: `access_token=${token}`,
      },
      params: {
        name,
        page,
        limit,
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
    const { data } = await apiServer.get("/dashboard", {
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
    const { data } = await apiServer.get("/orders", {
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
