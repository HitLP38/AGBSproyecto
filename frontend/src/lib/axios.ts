// ✅ src/lib/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000", // ajusta si usas otro puerto
  withCredentials: true, // si usas cookies o Clerk Auth
});

export default instance;
