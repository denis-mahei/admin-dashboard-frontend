"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { ProductRequest, SupplierRequest } from "@/lib/types/definitions";
import { handleApiError } from "@/lib/utils/errorHandler";

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

export const addNewSupplier = async (payload: SupplierRequest) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const { data } = await api.post(`/suppliers`, payload, {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to add supplier");
  }
};

export const updateSupplier = async (id: number, payload: SupplierRequest) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const { data } = await api.patch(`/suppliers/${id}`, payload, {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to update supplier");
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

export const getSupplierLookUp = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  try {
    const { data } = await api.get("/suppliers/lookup", {
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
    const { data } = await api.get("/suppliers", {
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
    const { data } = await api.get("/customers", {
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
