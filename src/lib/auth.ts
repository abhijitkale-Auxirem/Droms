import { User } from "@/types";

const AUTH_KEY = "droms_auth";
const USER_KEY = "droms_user";

export const DEMO_USER: User = {
  id: "demo-001",
  name: "Alex Morgan",
  email: "demo@droms.ai",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  plan: "pro",
  role: "individual",
  joinedAt: "2024-01-15",
  successScore: 847,
  streakDays: 42,
};

export const INDIVIDUAL_USER = DEMO_USER;

export const STUDENT_USER: User = {
  id: "demo-student",
  name: "Sarah Mitchell",
  email: "student@droms.ai",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  plan: "pro",
  role: "student",
  joinedAt: "2025-01-15",
  successScore: 612,
  streakDays: 34,
};

export const PROFESSIONAL_USER: User = {
  id: "demo-professional",
  name: "David Park",
  email: "professional@droms.ai",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  plan: "enterprise",
  role: "professional",
  joinedAt: "2025-01-14",
  successScore: 789,
  streakDays: 62,
};

export const ENTREPRENEUR_USER: User = {
  id: "demo-entrepreneur",
  name: "Alex Rivera",
  email: "entrepreneur@droms.ai",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  plan: "enterprise",
  role: "entrepreneur",
  joinedAt: "2024-09-08",
  successScore: 915,
  streakDays: 124,
};

export const COACH_USER: User = {
  id: "demo-coach",
  name: "Emma Chen",
  email: "coach@droms.ai",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face",
  plan: "pro",
  role: "coach",
  joinedAt: "2024-10-15",
  successScore: 885,
  streakDays: 89,
};

export const LEADER_USER: User = {
  id: "demo-leader",
  name: "Priya Sharma",
  email: "leader@droms.ai",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
  plan: "pro",
  role: "leader",
  joinedAt: "2024-12-01",
  successScore: 720,
  streakDays: 28,
};

export const ADMIN_USER: User = {
  id: "admin-001",
  name: "Admin User",
  email: "admin@droms.ai",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
  plan: "enterprise",
  role: "admin",
  joinedAt: "2023-08-20",
  successScore: 999,
  streakDays: 120,
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
  if ((email === "demo@droms.ai" || email === "individual@droms.ai") && password === "Demo@123") {
    saveAuth(INDIVIDUAL_USER);
    return { success: true, user: INDIVIDUAL_USER };
  }
  if (email === "student@droms.ai" && password === "Demo@123") {
    saveAuth(STUDENT_USER);
    return { success: true, user: STUDENT_USER };
  }
  if (email === "professional@droms.ai" && password === "Demo@123") {
    saveAuth(PROFESSIONAL_USER);
    return { success: true, user: PROFESSIONAL_USER };
  }
  if (email === "entrepreneur@droms.ai" && password === "Demo@123") {
    saveAuth(ENTREPRENEUR_USER);
    return { success: true, user: ENTREPRENEUR_USER };
  }
  if (email === "coach@droms.ai" && password === "Demo@123") {
    saveAuth(COACH_USER);
    return { success: true, user: COACH_USER };
  }
  if (email === "leader@droms.ai" && password === "Demo@123") {
    saveAuth(LEADER_USER);
    return { success: true, user: LEADER_USER };
  }
  if (email === "admin@droms.ai" && password === "Admin@123") {
    saveAuth(ADMIN_USER);
    return { success: true, user: ADMIN_USER };
  }
  // Simulate other valid credentials
  if (email && password.length >= 6) {
    const user: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      email,
      plan: "free",
      role: email.includes("admin") ? "admin" : "individual",
      joinedAt: new Date().toISOString(),
      successScore: 0,
      streakDays: 0,
    };
    saveAuth(user);
    return { success: true, user };
  }
  return { success: false, error: "Invalid credentials. Try demo@droms.ai / Demo@123 or admin@droms.ai / Admin@123" };
}

export function logout(): void {
  clearAuth();
}
