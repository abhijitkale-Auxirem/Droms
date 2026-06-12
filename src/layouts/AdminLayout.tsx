import { useState } from "react";
import { Users, BarChart2, DollarSign, BookOpen, Shield, Settings, LogOut, LayoutDashboard, Bell, FileText, MessageSquare, Star } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const adminNav = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Users", path: "/admin/users", icon: Users },
  { label: "Subscriptions", path: "/admin/subscriptions", icon: DollarSign },
  { label: "Revenue", path: "/admin/revenue", icon: BarChart2 },
  { label: "Courses", path: "/admin/courses", icon: BookOpen },
  { label: "Communities", path: "/admin/communities", icon: Shield },
  { label: "Challenges", path: "/admin/challenges", icon: Star },
  { label: "Content", path: "/admin/content", icon: FileText },
  { label: "Testimonials", path: "/admin/testimonials", icon: MessageSquare },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart2 },
  { label: "Reports", path: "/admin/reports", icon: FileText },
  { label: "Support", path: "/admin/support", icon: MessageSquare },
  { label: "Notifications", path: "/admin/notifications", icon: Bell },
  { label: "Roles", path: "/admin/roles", icon: Shield },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-[240px] bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0 h-full z-40">
        <div className="flex items-center gap-2.5 h-16 px-5 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Droms Admin</p>
            <p className="text-slate-500 text-xs">Control Panel</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {adminNav.map(item => {
            const active = isActive(item.path);
            return (
              <Link key={item.path} to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium",
                  active ? "bg-primary-700/40 text-white border border-primary-600/30" : "text-slate-400 hover:text-white hover:bg-white/5"
                )}>
                <item.icon className={cn("w-4 h-4", active ? "text-primary-400" : "text-slate-500")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
            <img src={`https://ui-avatars.com/api/?name=Admin&background=7C3AED&color=fff`} alt="Admin" className="w-8 h-8 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">admin@droms.ai</p>
            </div>
            <button onClick={handleLogout} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-[240px]">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <h1 className="text-lg font-bold font-display text-slate-900">
            {adminNav.find(n => isActive(n.path))?.label || "Dashboard"}
          </h1>
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-sm text-primary-600 hover:underline">← Back to App</Link>
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">Admin Mode</span>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
