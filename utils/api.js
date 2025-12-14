import axios from "axios";

export const api = axios.create({
 baseURL: process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL
});

// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
