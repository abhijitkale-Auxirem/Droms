import { User } from "@/types";

const AUTH_KEY = "droms_auth";
const USER_KEY = "droms_user";

export const DEMO_USER: User = {
  id: "demo-001",
  name: "Alex Morgan",
  email: "demo@droms.ai",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  plan: "pro",
  joinedAt: "2024-01-15",
  successScore: 847,
  streakDays: 42,
};

export function saveAuth(user: User): void {
  localStorage.setItem(AUTH_KEY, "true");
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getAuth(): { isAuthenticated: boolean; user: User | null } {
  const isAuthenticated = localStorage.getItem(AUTH_KEY) === "true";
  const userStr = localStorage.getItem(USER_KEY);
  const user = userStr ? JSON.parse(userStr) : null;
  return { isAuthenticated, user };
}

export function clearAuth(): void {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function login(email: string, password: string): { success: boolean; user?: User; error?: string } {
  if (email === "demo@droms.ai" && password === "Demo@123") {
    saveAuth(DEMO_USER);
    return { success: true, user: DEMO_USER };
  }
  // Simulate other valid credentials
  if (email && password.length >= 6) {
    const user: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      email,
      plan: "free",
      joinedAt: new Date().toISOString(),
      successScore: 0,
      streakDays: 0,
    };
    saveAuth(user);
    return { success: true, user };
  }
  return { success: false, error: "Invalid credentials. Try demo@droms.ai / Demo@123" };
}

export function logout(): void {
  clearAuth();
}
