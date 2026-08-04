import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const signIn = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const logout = async () => {
  return await api.get("/auth/logout");
};
