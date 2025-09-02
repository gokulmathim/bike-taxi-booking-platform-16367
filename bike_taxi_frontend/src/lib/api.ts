const DEFAULT_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export const API_BASE = DEFAULT_BASE.replace(/\/$/, "");

/** token getter assigned by AuthContext */
let tokenGetter: (() => string | null) | null = null;

export function setAuthTokenGetter(fn: () => string | null) {
  tokenGetter = fn;
}

async function request<T = unknown>(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  const token = tokenGetter ? tokenGetter() : null;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  const contentType = res.headers.get("Content-Type") || "";
  const isJSON = contentType.includes("application/json");

  if (!res.ok) {
    let message = `Request failed with ${res.status}`;
    if (isJSON) {
      try {
        const j = await res.json();
        message = j?.detail || j?.message || message;
      } catch {
        // ignore
      }
    } else {
      try {
        const t = await res.text();
        if (t) message = t;
      } catch {
        // ignore
      }
    }
    throw new Error(message);
  }

  if (isJSON) return res.json() as Promise<T>;
  return res.text() as unknown as T;
}

// PUBLIC_INTERFACE
export const api = {
  /** Perform GET request to backend */
  async get<T = unknown>(path: string) {
    return request<T>(path, { method: "GET" });
  },
  /** Perform POST request with JSON body */
  async post<T = unknown>(path: string, body?: unknown) {
    return request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined });
  },
  /** Perform PUT request with JSON body */
  async put<T = unknown>(path: string, body?: unknown) {
    return request<T>(path, { method: "PUT", body: body ? JSON.stringify(body) : undefined });
  },
  /** Perform DELETE request */
  async del<T = unknown>(path: string) {
    return request<T>(path, { method: "DELETE" });
  },
};
