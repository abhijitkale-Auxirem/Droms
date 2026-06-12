import { Users, DollarSign, BarChart2, TrendingUp, BookOpen, Shield, ArrowUp, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Users", value: "156,842", change: "+2,341 this month", trend: "up", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Monthly Revenue", value: "$287,400", change: "+18.4% vs last month", trend: "up", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
  { label: "Active Subscriptions", value: "42,180", change: "+892 this week", trend: "up", icon: Shield, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Churn Rate", value: "2.1%", change: "-0.3% vs last month", trend: "down", icon: TrendingUp, color: "text-red-600", bg: "bg-red-50" },
  { label: "Courses Completed", value: "18,920", change: "+1,240 this month", trend: "up", icon: BookOpen, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Avg Success Score", value: "76.4", change: "+2.1 pts vs last month", trend: "up", icon: BarChart2, color: "text-teal-600", bg: "bg-teal-50" },
];

const recentUsers = [
  { name: "Sarah Mitchell", email: "sarah.m@gmail.com", plan: "Pro", joined: "Jan 15, 2025", status: "active" },
  { name: "David Park", email: "d.park@outlook.com", plan: "Enterprise", joined: "Jan 14, 2025", status: "active" },
  { name: "Maria Santos", email: "m.santos@yahoo.com", plan: "Pro", joined: "Jan 14, 2025", status: "active" },
  { name: "James Liu", email: "james.l@gmail.com", plan: "Starter", joined: "Jan 13, 2025", status: "pending" },
  { name: "Emma Chen", email: "emma.c@company.com", plan: "Pro", joined: "Jan 13, 2025", status: "active" },
];

const topCourses = [
  { name: "Deep Learning Specialization", enrolled: 12400, completion: 72, rating: 4.9 },
  { name: "Financial Independence Masterclass", enrolled: 9800, completion: 85, rating: 4.8 },
  { name: "Leadership & Influence", enrolled: 15200, completion: 91, rating: 4.9 },
  { name: "Startup Fundraising Bootcamp", enrolled: 7200, completion: 68, rating: 4.7 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold font-display text-slate-900 mb-1">{stat.value}</p>
            <div className="flex items-center gap-1 text-xs">
              {stat.trend === "up" ? <ArrowUp className="w-3 h-3 text-green-600" /> : <ArrowDown className="w-3 h-3 text-red-600" />}
              <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-900">Recent Signups</h3>
            <Link to="/admin/users" className="text-xs text-primary-600 hover:underline">View All →</Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["User", "Plan", "Status"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentUsers.map((u, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{u.name}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${u.plan === "Enterprise" ? "bg-amber-100 text-amber-700" : u.plan === "Pro" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"}`}>{u.plan}</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${u.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{u.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Courses */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-900">Top Performing Courses</h3>
            <Link to="/admin/courses" className="text-xs text-primary-600 hover:underline">View All →</Link>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["Course", "Enrolled", "Completion"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topCourses.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-3 text-sm font-medium text-slate-900 max-w-[180px] truncate">{c.name}</td>
                  <td className="px-6 py-3 text-sm text-slate-600">{c.enrolled.toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${c.completion}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{c.completion}%</span>
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
