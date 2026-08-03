"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const signUp = async (credentials: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) => {
  const { data } = await api.post("/auth/register", credentials);
  return data;
};

export const signIn = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const logout = async () => await api.get("/auth/logout");

export const getUserInfo = async () => await api.get("/auth/user-info");

export const getProducts = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "No access token provided." });
  }
  try {
    const { data } = await api.get("/products", {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ error: error.message });
    }
  }
};

export const getSuppliers = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "No access token provided." });
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
    return NextResponse.json({ message: "No access token provided." });
  }
  try {
    const { data } = await api.get("/customers", {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ error: error.message });
    }
  }
};
