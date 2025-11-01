import axios from "axios";

const rawBase = process.env.REACT_APP_API_URL;
// Sanitize env to avoid accidental spaces/characters
const baseURL = (rawBase && rawBase.trim()) || "http://127.0.0.1:3000";

export const api = axios.create({ baseURL });

// Optional handlers to react to auth errors globally
let unauthorizedHandler: (() => void) | null = null;
let forbiddenHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (fn: (() => void) | null) => {
  unauthorizedHandler = fn;
};

export const setForbiddenHandler = (fn: (() => void) | null) => {
  forbiddenHandler = fn;
};

// Basic logging + global handling for error responses
const isDev = process.env.NODE_ENV !== "production";

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status as number | undefined;
    const url = error?.config?.url as string | undefined;
    const hadAuth = !!(error?.config?.headers && (error.config.headers as any)["Authorization"]);

    if (isDev) {
      if (status) {
        const label = status === 401 ? "Unauthorized" : status === 403 ? "Forbidden" : "Error";
        // eslint-disable-next-line no-console
        console.warn(`[API] ${status} ${label} on ${url ?? "<unknown>"}`, error?.response?.data);
      } else if (error?.request) {
        // eslint-disable-next-line no-console
        console.error(`[API] Network error calling ${url ?? "<unknown>"}:`, error?.message);
      } else {
        // eslint-disable-next-line no-console
        console.error(`[API] Unexpected error:`, error?.message);
      }
    }

    if (status === 401 && unauthorizedHandler && hadAuth) unauthorizedHandler();
    if (status === 403 && forbiddenHandler) forbiddenHandler();

    return Promise.reject(error);
  }
);

if (isDev) {
  // eslint-disable-next-line no-console
  console.info(`[API] baseURL = ${api.defaults.baseURL}`);
}

// Eagerly set Authorization header from localStorage to avoid first-load race conditions
try {
  const saved = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  if (saved) {
    api.defaults.headers.common["Authorization"] = `Bearer ${saved}`;
  }
} catch {
  // ignore
}

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
