import { useState } from "react";
import { Search, Plus, MoreVertical, Filter, UserCheck, UserX, Mail } from "lucide-react";
import { toast } from "sonner";

const users = [
  { id: "u1", name: "Sarah Mitchell", email: "sarah.m@gmail.com", plan: "Pro", role: "Student", joined: "Jan 15, 2025", lastActive: "Today", goals: 12, habits: 8, streak: 34, status: "active" },
  { id: "u2", name: "David Park", email: "d.park@outlook.com", plan: "Enterprise", role: "Professional", joined: "Jan 14, 2025", lastActive: "Today", goals: 24, habits: 15, streak: 62, status: "active" },
  { id: "u3", name: "Maria Santos", email: "m.santos@yahoo.com", plan: "Pro", role: "Individual User", joined: "Nov 2, 2024", lastActive: "Yesterday", goals: 8, habits: 6, streak: 15, status: "active" },
  { id: "u4", name: "James Liu", email: "james.l@gmail.com", plan: "Starter", role: "Individual User", joined: "Jan 13, 2025", lastActive: "2 days ago", goals: 3, habits: 2, streak: 3, status: "pending" },
  { id: "u5", name: "Emma Chen", email: "emma.c@company.com", plan: "Pro", role: "Coach / Mentor", joined: "Oct 15, 2024", lastActive: "Today", goals: 18, habits: 11, streak: 89, status: "active" },
  { id: "u6", name: "Alex Rivera", email: "alex.r@startup.io", plan: "Enterprise", role: "Entrepreneur", joined: "Sep 8, 2024", lastActive: "Today", goals: 31, habits: 20, streak: 124, status: "active" },
  { id: "u7", name: "Priya Sharma", email: "p.sharma@med.edu", plan: "Pro", role: "Community Leader", joined: "Dec 1, 2024", lastActive: "3 days ago", goals: 14, habits: 9, streak: 28, status: "suspended" },
  { id: "u8", name: "Michael Johnson", email: "m.johnson@corp.com", plan: "Enterprise", role: "Admin", joined: "Aug 20, 2024", lastActive: "Today", goals: 42, habits: 18, streak: 201, status: "active" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === "all" || u.plan.toLowerCase() === planFilter;
    return matchSearch && matchPlan;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage all platform users</p>
        </div>
        <button onClick={() => toast.success("User invite sent!")} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Invite User
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "156,842", color: "text-slate-900" },
          { label: "Active Today", value: "8,341", color: "text-green-600" },
          { label: "Pro/Enterprise", value: "42,180", color: "text-primary-600" },
          { label: "Suspended", value: "128", color: "text-red-600" },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">{k.label}</p>
            <p className={`text-xl font-bold font-display ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 bg-white" />
        </div>
        {["all", "starter", "pro", "enterprise"].map(f => (
          <button key={f} onClick={() => setPlanFilter(f)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize ${planFilter === f ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
            {f === "all" ? "All Plans" : f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["User", "Role", "Plan", "Joined", "Last Active", "Goals", "Streak", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{u.name}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">{u.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${u.plan === "Enterprise" ? "bg-amber-100 text-amber-700" : u.plan === "Pro" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"}`}>{u.plan}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{u.joined}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{u.lastActive}</td>
                  <td className="px-6 py-4 text-sm text-slate-700 font-medium">{u.goals}</td>
                  <td className="px-6 py-4 text-sm font-bold text-orange-600">🔥 {u.streak}d</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${u.status === "active" ? "bg-green-100 text-green-700" : u.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{u.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toast.success(`Email sent to ${u.name}`)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" title="Send Email">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button onClick={() => toast.success(`${u.name} ${u.status === "suspended" ? "activated" : "suspended"}`)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-colors" title="Toggle Status">
                        {u.status === "suspended" ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
