// Dedicated route files for cleaner organization

// src/routes/PublicRoutes.tsx - Public page route definitions
export const publicRoutePaths = [
  "/", "/about", "/features", "/pricing", "/contact",
  "/community", "/success-stories", "/ai-coach", "/goal-planning",
  "/vision-board", "/habit-tracking", "/career-growth", "/financial-planning",
  "/wellness", "/academy", "/faq", "/blog", "/privacy", "/terms",
  "/solutions", "/help", "/docs", "/cookies", "/security", "/careers", "/press",
];

// src/routes/AuthRoutes.tsx - Auth route paths
export const authRoutePaths = [
  "/login", "/register", "/signup", "/forgot-password", "/reset-password",
  "/otp-login", "/verify-account",
];

// src/routes/UserRoutes.tsx - User dashboard route paths
export const userRoutePaths = [
  "/dashboard", "/dashboard/dreams", "/dashboard/goals", "/dashboard/milestones",
  "/dashboard/habits", "/dashboard/routines", "/dashboard/vision-boards",
  "/dashboard/ai-coach", "/dashboard/academy", "/dashboard/courses",
  "/dashboard/finance", "/dashboard/budgets", "/dashboard/investments",
  "/dashboard/career", "/dashboard/skills", "/dashboard/wellness",
  "/dashboard/fitness", "/dashboard/meditation", "/dashboard/sleep",
  "/dashboard/community", "/dashboard/accountability-groups",
  "/dashboard/challenges", "/dashboard/analytics", "/dashboard/reports",
  "/dashboard/achievements", "/dashboard/notifications", "/dashboard/messages",
  "/dashboard/profile", "/dashboard/subscription", "/dashboard/settings",
];

// src/routes/AdminRoutes.tsx - Admin route paths
export const adminRoutePaths = [
  "/admin", "/admin/users", "/admin/dreams", "/admin/goals",
  "/admin/communities", "/admin/challenges", "/admin/courses", "/admin/mentors",
  "/admin/content", "/admin/testimonials", "/admin/subscriptions", "/admin/payments",
  "/admin/revenue", "/admin/analytics", "/admin/reports", "/admin/notifications",
  "/admin/support", "/admin/roles", "/admin/permissions", "/admin/settings",
];
