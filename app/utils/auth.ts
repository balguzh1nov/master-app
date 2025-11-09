"use client";

export type UserType = "guest" | "client" | "specialist";

export interface AuthUser {
  type: "client" | "specialist";
  email?: string;
  phone?: string;
  name?: string;
}

const AUTH_KEY = "mock_auth_user";

export function login(user: AuthUser) {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("auth-change"));
  }
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new Event("auth-change"));
  }
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getAuthUser() !== null;
}

export function getUserType(): UserType {
  const user = getAuthUser();
  if (!user) return "guest";
  return user.type;
}

