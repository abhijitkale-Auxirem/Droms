import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  const isPathAllowed = () => {
    if (!user) return false;
    const path = location.pathname;

    // Admin paths check
    if (path.startsWith("/admin")) {
      if (user.role === "admin") return true;
      if (user.role === "coach") {
        return path === "/admin" || path.startsWith("/admin/courses") || path.startsWith("/admin/support") || path.startsWith("/admin/users");
      }
      if (user.role === "leader") {
        return path === "/admin" || path.startsWith("/admin/communities") || path.startsWith("/admin/challenges") || path.startsWith("/admin/reports");
      }
      return false; // Other roles cannot access admin paths
    }

    return true;
  };

  const allowed = isPathAllowed();

  useEffect(() => {
    if (isAuthenticated && !allowed) {
      toast.error(`Access Denied: Your role (${user?.role}) cannot access ${location.pathname}`);
    }
  }, [isAuthenticated, allowed, user?.role, location.pathname]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowed) {
    const fallback = user?.role === "coach" || user?.role === "leader" ? "/admin" : "/dashboard";
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}
