// utils/interceptor.js
import axios from "axios";

/**
 * Build a bullet-proof API base:
 * - Prefer env var, fallback to production host
 * - Normalize kidS/kidZ typos to the live host
 * - Remove trailing slashes
 * - Ensure exactly one "/api" suffix
 */
function computeBaseURL() {
  const raw =
    (import.meta?.env?.VITE_API_BASE_URL ||
     process.env.REACT_APP_BASE_URL || // keep your existing var
     "https://api.dabdoobkidz.com").trim();

  let base = raw
    .replace("dabdoobkids.com", "dabdoobkidz.com") // normalize domain
    .replace(/\/+$/, ""); // strip trailing slash

  if (!/\/api$/i.test(base)) base += "/api"; // ensure /api suffix
  return base;
}

const instance = axios.create({
  baseURL: computeBaseURL(),
  // withCredentials: true, // uncomment if you start using cookies
});

// Request interceptor: attach Bearer token if present
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
  (error) => {
    console.error("Request Error Interceptor:", error);
    return Promise.reject(error);
  }
);

// Response interceptor: return response as-is; for errors, provide a safe message fallback
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // keep compatibility with places that expect a string (e.g. err === "Unauthorized")
    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Request failed";
    return Promise.reject(msg);
  }
);

export default instance;
