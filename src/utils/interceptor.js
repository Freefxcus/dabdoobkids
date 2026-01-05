// utils/interceptor.js
import axios from "axios";

/**
 * Build the base URL:
 * - Use env when present (recommended)
 * - NO automatic "/api" suffix
 * - Remove any trailing slash
 */
function getViteApiBaseUrl() {
  try {
    // avoids parse error in CRA because import.meta is inside a string
    return Function("try { return import.meta.env?.REACT_APP_BASE_URL } catch(e) { return undefined }")();
  } catch {
    return undefined;
  }
}

function computeBase() {
  const raw = (
    getViteApiBaseUrl() ||
    process.env.REACT_APP_API_BASE_URL ||
    "https://api.dabdoobkidz.com"
  ).trim();

  return raw
    .replace("dabdoobkids.com", "dabdoobkidz.com")
    .replace(/\/+$/, "");
}


const instance = axios.create({
  baseURL: computeBase(),
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    const fullUrl =
      (config.baseURL?.replace(/\/+$/, "") || "") +
      "/" +
      String(config.url || "").replace(/^\/+/, "");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
    }
    console.log("[HTTP]", (config.method || "GET").toUpperCase(), fullUrl);
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
