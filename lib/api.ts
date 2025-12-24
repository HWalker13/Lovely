import { User } from "firebase/auth";

const BASE_URL = "http://192.168.1.89:8000";// iOS Simulator

class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

async function getAuthHeaders(user: User | null | undefined) {
  if (!user) {
    throw new ApiError("No authenticated user", 401);
  }

  const token = await user.getIdToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function request<T>(
  user: User | null | undefined,
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = await getAuthHeaders(user);

console.log("API REQUEST:", `${BASE_URL}/partner-profile`); //Delete Later

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (res.status === 401) {
    throw new ApiError("Unauthorized", 401);
  }

  if (!res.ok) {
    const text = await res.text();
    throw new ApiError(text || "Request failed", res.status);
  }

  return res.json();
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
  return request(user, "/partner-profile", {
    method: "PUT",
    body: JSON.stringify(profile),
  });
}


