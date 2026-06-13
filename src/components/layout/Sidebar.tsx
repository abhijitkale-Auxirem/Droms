import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Sparkles, Target, Layout, CheckSquare, Clock,
  Brain, GraduationCap, TrendingUp, Briefcase, Heart, Users,
  Trophy, BarChart2, FileText, Award, Bell, Settings,
  ChevronLeft, ChevronRight, Search, LogOut, X, MessageSquare, User, Crown, Shield
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const icons: Record<string, React.ElementType> = {
  LayoutDashboard, Sparkles, Target, Layout, CheckSquare, Clock,
  Brain, GraduationCap, TrendingUp, Briefcase, Heart, Users,
  Trophy, BarChart2, FileText, Award, Bell, Settings,
  MessageSquare, User, Crown, Shield,
};

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
  { id: "dreams", label: "Dreams", path: "/dashboard/dreams", icon: "Sparkles" },
  { id: "goals", label: "Goals", path: "/dashboard/goals", icon: "Target" },
  { id: "vision-boards", label: "Vision Boards", path: "/dashboard/vision-boards", icon: "Layout" },
  { id: "habits", label: "Habits", path: "/dashboard/habits", icon: "CheckSquare" },
  { id: "routines", label: "Routines", path: "/dashboard/routines", icon: "Clock" },
  { id: "ai-coach", label: "AI Coach", path: "/dashboard/ai-coach", icon: "Brain", badge: 3 },
  { id: "academy", label: "Learning Academy", path: "/dashboard/academy", icon: "GraduationCap" },
  { id: "finance", label: "Financial Goals", path: "/dashboard/finance", icon: "TrendingUp" },
  { id: "career", label: "Career Growth", path: "/dashboard/career", icon: "Briefcase" },
  { id: "wellness", label: "Wellness", path: "/dashboard/wellness", icon: "Heart" },
  { id: "community", label: "Community", path: "/dashboard/community", icon: "Users" },
  { id: "challenges", label: "Challenges", path: "/dashboard/challenges", icon: "Trophy" },
  { id: "analytics", label: "Analytics", path: "/dashboard/analytics", icon: "BarChart2" },
  { id: "reports", label: "Reports", path: "/dashboard/reports", icon: "FileText" },
  { id: "achievements", label: "Achievements", path: "/dashboard/achievements", icon: "Award" },
  { id: "notifications", label: "Notifications", path: "/dashboard/notifications", icon: "Bell", badge: 5 },
  { id: "messages", label: "Messages", path: "/dashboard/messages", icon: "MessageSquare" },
  { id: "profile", label: "My Profile", path: "/dashboard/profile", icon: "User" },
  { id: "subscription", label: "Subscription", path: "/dashboard/subscription", icon: "Crown" },
  { id: "settings", label: "Settings", path: "/dashboard/settings", icon: "Settings" },
];

const getAllowedSidebarItems = (role?: string) => {
  return sidebarItems;
};

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const allowedItems = getAllowedSidebarItems(user?.role);
  const filteredItems = allowedItems.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onMobileClose} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-droms-dark border-r border-purple-900/30 flex flex-col transition-all duration-300 z-50",
        collapsed ? "w-[70px]" : "w-[260px]",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className={cn(
          "flex items-center h-16 border-b border-purple-900/30 px-4 flex-shrink-0",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-purple flex items-center justify-center shadow-glow-purple">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold font-display text-white">Droms</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            {mobileOpen && (
              <button onClick={onMobileClose} className="lg:hidden p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Search */}
        {!collapsed && (
          <div className="px-4 py-3 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search modules..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-primary-500/50"
              />
            </div>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto sidebar-scroll px-2 py-2 space-y-0.5">
          {filteredItems.map((item) => {
            const Icon = icons[item.icon] || LayoutDashboard;
            const active = isActive(item.path);
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onMobileClose}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center rounded-xl transition-all duration-200 group relative",
                  collapsed ? "justify-center p-3" : "gap-3 px-3 py-2.5",
                  active
                    ? "bg-primary-700/40 text-white border border-primary-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn(
                  "flex-shrink-0 transition-all duration-200",
                  collapsed ? "w-5 h-5" : "w-4 h-4",
                  active ? "text-primary-400" : "text-slate-500 group-hover:text-white"
                )} />
                {!collapsed && (
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="bg-primary-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center font-medium">
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
                {active && !collapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-400 rounded-r-full" />
                )}
              </Link>
            );
          })}

          {/* Admin Link */}
          {!collapsed && (user?.role === "admin" || user?.role === "coach" || user?.role === "leader") && (
            <div className="pt-2 mt-2 border-t border-white/10">
              <Link to="/admin"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 group">
                <Shield className="w-4 h-4 text-slate-500 group-hover:text-red-400" />
                <span className="text-sm font-medium flex-1">
                  {user.role === "admin" ? "Admin Panel" : user.role === "coach" ? "Coach Panel" : "Leader Panel"}
                </span>
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-medium capitalize">{user.role}</span>
              </Link>
            </div>
          )}
        </nav>

        {/* User Section */}
        <div className={cn(
          "border-t border-purple-900/30 p-3 flex-shrink-0",
          collapsed ? "items-center justify-center flex flex-col gap-2" : ""
        )}>
          {!collapsed ? (
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=7C3AED&color=fff`}
                alt={user?.name}
                className="w-9 h-9 rounded-full ring-2 ring-primary-500/50"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=7C3AED&color=fff`}
                alt={user?.name}
                className="w-8 h-8 rounded-full ring-2 ring-primary-500/50"
              />
              <button
                onClick={logout}
                className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
