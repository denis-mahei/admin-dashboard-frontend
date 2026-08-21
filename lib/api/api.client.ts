import axios from "axios";
import { ProductRequest, SupplierRequest } from "@/lib/types/definitions";

export const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const signIn = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await apiClient.post("/auth/login", credentials);
  return data;
};

export const logout = async () => await apiClient.get("/auth/logout");

export const addNewProduct = async (payload: ProductRequest) => {
  const { data } = await apiClient.post(`/products`, payload);
  return data;
};

export const updateProduct = async (id: number, payload: ProductRequest) => {
  const { data } = await apiClient.patch(`/products/${id}`, payload);
  return data;
};

export const deleteProduct = async (id: number) => {
  const { data } = await apiClient.delete(`/products/${id}`);
  return data;
};

export const addNewSupplier = async (payload: SupplierRequest) => {
  const { data } = await apiClient.post(`/suppliers`, payload);
  return data;
};

export const updateSupplier = async (id: number, payload: SupplierRequest) => {
  const { data } = await apiClient.patch(`/suppliers/${id}`, payload);
  return data;
};
