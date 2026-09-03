import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

/**
 * Single axios instance for the whole app.
 *
 * Why this exists as its own file:
 * every feature's `*.api.ts` imports THIS instance instead of calling
 * `axios.get(...)` directly. That means auth headers, base URL, and error
 * handling live in exactly one place — change them here once and every
 * feature picks it up automatically.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 30_000,
});

// Attach the auth token (if any) to every outgoing request.
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize errors so every feature can just read `error.message`.
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ??
      error.message ??
      "Something went wrong. Please try again.";

    if (status === 401) {
      localStorage.removeItem("accessToken");
      // Let the app redirect to /login instead of forcing it here — keeps
      // this file free of routing concerns.
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    } else {
      // Centralized toast so individual features don't each re-implement
      // "catch (e) { toast.error(...) }".
      toast.error(message);
    }

    return Promise.reject(new Error(message));
  },
);

export default api;
