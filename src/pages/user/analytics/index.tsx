import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { progressChartData, financialChartData, habitStreakData } from "@/data/mockData";
import { BarChart2, TrendingUp, Target, CheckSquare } from "lucide-react";

const pieData = [
  { name: "Career", value: 30, color: "#7C3AED" },
  { name: "Financial", value: 25, color: "#2563EB" },
  { name: "Health", value: 20, color: "#22C55E" },
  { name: "Learning", value: 15, color: "#F59E0B" },
  { name: "Personal", value: 10, color: "#EF4444" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-primary-600" /> Analytics
        </h1>
        <p className="text-slate-500 mt-0.5">Deep insights into your personal growth journey</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Overall Progress", value: "74%", change: "+8% vs last month", icon: TrendingUp, color: "text-primary-600 bg-primary-50" },
          { label: "Goal Achievement", value: "78%", change: "+12% this quarter", icon: Target, color: "text-blue-600 bg-blue-50" },
          { label: "Habit Consistency", value: "85%", change: "Best month ever!", icon: CheckSquare, color: "text-green-600 bg-green-50" },
          { label: "Success Score", value: "847", change: "+62 this week", icon: BarChart2, color: "text-amber-600 bg-amber-50" },
        ].map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-slate-200">
            <div className={`w-10 h-10 rounded-xl ${color.split(" ")[1]} flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color.split(" ")[0]}`} />
            </div>
            <p className="text-sm text-slate-500">{label}</p>
            <p className={`text-2xl font-bold font-display mt-1 ${color.split(" ")[0]}`}>{value}</p>
            <p className="text-xs text-green-600 mt-1">{change}</p>
          </div>
        ))}
      </div>

      {/* Progress Trends */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h2 className="font-semibold text-slate-900 mb-1">6-Month Progress Overview</h2>
        <p className="text-xs text-slate-500 mb-5">Goals, Habits & Wellness performance over time</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={progressChartData}>
            <defs>
              {[["goalGrad", "#7C3AED"], ["habitGrad", "#2563EB"], ["wellGrad", "#22C55E"]].map(([id, color]) => (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} domain={[0, 100]} />
            <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
            <Legend />
            <Area type="monotone" dataKey="goals" stroke="#7C3AED" strokeWidth={2} fill="url(#goalGrad)" name="Goal Progress %" />
            <Area type="monotone" dataKey="habits" stroke="#2563EB" strokeWidth={2} fill="url(#habitGrad)" name="Habit Completion %" />
            <Area type="monotone" dataKey="wellness" stroke="#22C55E" strokeWidth={2} fill="url(#wellGrad)" name="Wellness Score %" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Financial Growth */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="font-semibold text-slate-900 mb-1">Financial Growth</h2>
          <p className="text-xs text-slate-500 mb-5">Savings, Investments & Debt reduction (USD)</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={financialChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
              <Legend />
              <Area type="monotone" dataKey="investments" stroke="#7C3AED" strokeWidth={2} fill="rgba(124,58,237,0.1)" name="Investments" />
              <Area type="monotone" dataKey="savings" stroke="#22C55E" strokeWidth={2} fill="rgba(34,197,94,0.1)" name="Savings" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Goal Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="font-semibold text-slate-900 mb-1">Goal Distribution by Category</h2>
          <p className="text-xs text-slate-500 mb-5">Focus areas breakdown</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                  {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {pieData.map(({ name, value, color }) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                    <span className="text-sm text-slate-600">{name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Habits Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h2 className="font-semibold text-slate-900 mb-1">Weekly Habit Performance</h2>
        <p className="text-xs text-slate-500 mb-5">Daily habits completed this week</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={habitStreakData} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} domain={[0, 10]} />
            <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
            <Bar dataKey="completed" radius={[6, 6, 0, 0]} name="Habits Completed">
              {habitStreakData.map((entry, index) => (
                <Cell key={index} fill={entry.completed >= 9 ? "#22C55E" : entry.completed >= 7 ? "#7C3AED" : "#F59E0B"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
