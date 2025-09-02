// utils/interceptor.js
import axios from "axios";

/**
 * Build the base URL:
 * - Use env when present (recommended)
 * - NO automatic "/api" suffix
 * - Remove any trailing slash
 */
function computeBaseURL() {
  const raw =
    (import.meta?.env?.VITE_API_BASE_URL ||
      process.env.REACT_APP_BASE_URL ||
      "https://api.dabdoobkidz.com").trim();

  return raw.replace(/\/+$/, ""); // strip trailing slashes only
}

const instance = axios.create({
  baseURL: computeBaseURL(),
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Request failed";
    return Promise.reject(msg);
  }
);

export default instance;
