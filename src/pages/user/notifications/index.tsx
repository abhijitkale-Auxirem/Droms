import { useState } from "react";
import { Bell, Target, CheckSquare, Brain, Users, Award, Check, Trash2 } from "lucide-react";
import { mockNotifications } from "@/data/mockData";
import type { Notification } from "@/types";
import { cn, formatRelativeDate } from "@/lib/utils";
import { toast } from "sonner";

const typeIcons: Record<string, React.ElementType> = { goal: Target, habit: CheckSquare, ai: Brain, community: Users, achievement: Award };
const typeColors: Record<string, string> = {
  goal: "bg-blue-100 text-blue-600", habit: "bg-green-100 text-green-600",
  ai: "bg-purple-100 text-purple-600", community: "bg-amber-100 text-amber-600", achievement: "bg-pink-100 text-pink-600",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState("all");

  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => { setNotifications(prev => prev.map(n => ({ ...n, read: true }))); toast.success("All marked as read"); };
  const deleteNotif = (id: string) => { setNotifications(prev => prev.filter(n => n.id !== id)); toast.success("Notification deleted"); };

  const filtered = notifications.filter(n => filter === "all" ? true : filter === "unread" ? !n.read : n.type === filter);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary-600" /> Notifications
            {unreadCount > 0 && <span className="bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>}
          </h1>
          <p className="text-slate-500 mt-0.5">{unreadCount} unread notifications</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-sm text-primary-600 font-medium hover:underline flex items-center gap-1.5">
            <Check className="w-4 h-4" /> Mark all read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["all", "unread", "goal", "habit", "ai", "community", "achievement"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn("px-3 py-1.5 rounded-xl text-xs font-medium transition-all capitalize",
              filter === f ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-primary-300"
            )}>{f === "ai" ? "AI Coach" : f}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(notif => {
          const Icon = typeIcons[notif.type] || Bell;
          const colorClass = typeColors[notif.type] || "bg-slate-100 text-slate-600";
          return (
            <div key={notif.id} onClick={() => markRead(notif.id)}
              className={cn("bg-white rounded-2xl p-4 border transition-all cursor-pointer hover:shadow-sm",
                notif.read ? "border-slate-200" : "border-primary-200 bg-primary-50/30"
              )}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("font-medium text-sm", notif.read ? "text-slate-700" : "text-slate-900")}>{notif.title}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notif.read && <div className="w-2 h-2 rounded-full bg-primary-600" />}
                      <button onClick={e => { e.stopPropagation(); deleteNotif(notif.id); }}
                        className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{notif.message}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{formatRelativeDate(notif.createdAt)}</p>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );
}
