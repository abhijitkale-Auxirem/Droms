import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, Menu, Plus, Sparkles, ChevronDown, LogOut, User, Settings } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { mockNotifications } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  onMenuToggle: () => void;
}

export default function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const { user, logout } = useAuthStore();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-14 flex items-center px-4 gap-4">
      {/* Mobile Menu */}
      <button onClick={onMenuToggle} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500">
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search goals, habits, dreams..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Quick Add */}
        {/* <button className="hidden md:flex items-center gap-2 bg-gradient-purple text-white text-sm font-medium px-3 py-2 rounded-xl hover:shadow-glow-purple transition-all">
          <Plus className="w-4 h-4" />
          <span>Quick Add</span>
        </button> */}

        {/* AI Chip */}
        <button
          onClick={() => navigate("/dashboard/ai-coach")}
          className="hidden md:flex items-center gap-1.5 bg-purple-50 border border-purple-200 text-primary-600 text-xs font-medium px-3 py-2 rounded-xl hover:bg-purple-100 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Coach</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
            className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">Notifications</h3>
                <span className="text-xs text-primary-600 font-medium cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {mockNotifications.slice(0, 5).map((notif) => (
                  <div key={notif.id} className={cn(
                    "px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 transition-colors",
                    !notif.read && "bg-primary-50/40"
                  )}>
                    <p className="text-sm font-medium text-slate-800">{notif.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{notif.message}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-slate-100">
                <Link
                  to="/dashboard/notifications"
                  onClick={() => setShowNotifs(false)}
                  className="text-sm text-primary-600 font-medium hover:underline block text-center"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=7C3AED&color=fff`}
              alt={user?.name}
              className="w-8 h-8 rounded-full ring-2 ring-primary-200"
            />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-slate-800 leading-tight">{user?.name}</p>
              <p className="text-xs text-slate-500 leading-tight capitalize">{user?.plan} Plan</p>
            </div>
            <ChevronDown className="hidden md:block w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <div className="py-1">
                <Link to="/dashboard/profile" onClick={() => setShowProfile(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <User className="w-4 h-4 text-slate-400" /> Profile
                </Link>
                <Link to="/dashboard/settings" onClick={() => setShowProfile(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <Settings className="w-4 h-4 text-slate-400" /> Settings
                </Link>
                <button onClick={logout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
