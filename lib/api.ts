import { User } from "firebase/auth";

// NOTE (LOCAL DEVELOPMENT):
// The backend must be run inside the Python virtual environment (venv)
// and started with uvicorn bound to 0.0.0.0 so that Expo/iOS devices
// on the same LAN can reach it.
//
// Required local command:
//   to find Local IP to Cntrl C/V: ifconfig | grep "inet " (KEEP THE :8000 AT THE END OF THE IP)
//   cd ./backend/
//   source venv/bin/activate
//   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
//
// The BASE_URL below should point to the host (Daniel's/ Holden's) machine’s LAN IP
// (e.g. 192.168.x.x). This is a LOCAL DEV ONLY requirement.
//
// In production, the backend will be deployed to a public HTTPS endpoint
// (e.g. https://api.lovelyapp.com). No IP-based networking, venv activation,
// or uvicorn commands will be required for the released app.

const BASE_URL = "http://192.168.1.89:8000";

/* =========================
   Error Type
   ========================= */

class ApiError extends Error {
  status?: number;
  isNetworkError?: boolean;

  constructor(message: string, status?: number, isNetworkError = false) {
    super(message);
    this.status = status;
    this.isNetworkError = isNetworkError;
  }
}

/* =========================
   Auth Headers (async)
   ========================= */

async function getAuthHeaders(user: User | null | undefined) {
  if (!user) {
    throw new ApiError("No authenticated user", 401);
  }

  // Force refresh token during dev to avoid stale auth
  const token = await user.getIdToken(true);

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/* =========================
   Request Helpers
   ========================= */

// Simple in-memory cache (GET only)
const responseCache = new Map<string, any>();

// Configurable values
const REQUEST_TIMEOUT_MS = 8000;
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 400;

// Small sleep helper
const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

async function request<T>(
  user: User | null | undefined,
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const method = options.method || "GET";
  const url = `${BASE_URL}${path}`;

  // Serve cached GET responses
  if (method === "GET" && responseCache.has(url)) {
    return responseCache.get(url);
  }

  const headers = await getAuthHeaders(user);

  console.log("[API] Request:", method, url);

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT_MS
    );

    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (res.status === 401) {
        throw new ApiError("Unauthorized", 401);
      }

      if (!res.ok) {
        const text = await res.text();
        throw new ApiError(text || "Request failed", res.status);
      }

      const data = (await res.json()) as T;

      // Cache GET responses only
      if (method === "GET") {
        responseCache.set(url, data);
      }

      return data;
    } catch (err: any) {
      clearTimeout(timeout);

      const isLastAttempt = attempt === MAX_RETRIES;

      // Abort or network error
      if (err.name === "AbortError") {
        console.warn("[API] Request timed out:", url);
      } else if (err instanceof ApiError) {
        throw err;
      } else {
        console.warn("[API] Network error:", err);
      }

      if (isLastAttempt) {
        throw new ApiError(
          "Network error: backend unreachable",
          undefined,
          true
        );
      }

      // Retry with small delay
      await sleep(RETRY_DELAY_MS * (attempt + 1));
    }
  }

  // Should never reach here
  throw new ApiError("Unexpected request failure");
}

/* =========================
   Partner Profile API
   ========================= */

export function getPartnerProfile(user: User | null | undefined) {
  return request<{
    exists: boolean;
    profile: any | null;
  }>(user, "/partner-profile");
}

export function putPartnerProfile(
  user: User | null | undefined,
  profile: any
) {
  // Invalidate cache on write
  responseCache.delete(`${BASE_URL}/partner-profile`);

  return request(user, "/partner-profile", {
    method: "PUT",
    body: JSON.stringify(profile),
  });
}



