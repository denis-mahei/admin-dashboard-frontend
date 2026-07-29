import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const register = async (credentials: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) => {
  const { data } = await api.post("/auth/register", credentials);
  return data;
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const logout = async () => await api.get("/auth/logout");

export const getUserInfo = async () => await api.get("/auth/user-info");

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};
