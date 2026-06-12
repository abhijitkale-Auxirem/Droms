import { useAuthStore } from "@/store/authStore";
import { mockDreams, mockGoals, mockHabits, progressChartData, habitStreakData } from "@/data/mockData";
import { getProgressColor, getStatusColor, cn } from "@/lib/utils";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Sparkles, Target, CheckSquare, TrendingUp, Award, ArrowUpRight, Brain, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const activeGoals = mockGoals.filter(g => g.status !== "completed");
  const onTrackGoals = mockGoals.filter(g => g.status === "on-track").length;
  const todayHabits = mockHabits.filter(h => h.status === "active");
  const completedHabits = todayHabits.filter(h => h.completionRate > 80).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">
            Good morning, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-slate-500 mt-0.5">You're {user?.streakDays}-day streak strong. Keep it going!</p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="bg-gradient-purple text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Success Score: <span className="text-accent font-bold">{user?.successScore}</span>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Dreams", value: mockDreams.filter(d => d.status === "active").length, sub: "2 need attention", icon: Sparkles, color: "bg-purple-100 text-purple-600", change: "+1 this week" },
          { label: "Goals On Track", value: `${onTrackGoals}/${mockGoals.length}`, sub: "3 at risk", icon: Target, color: "bg-blue-100 text-blue-600", change: "+2 this month" },
          { label: "Habit Streak", value: `${user?.streakDays}d`, sub: "Personal best!", icon: CheckSquare, color: "bg-green-100 text-green-600", change: "↑ 42 days" },
          { label: "Today's Habits", value: `${completedHabits}/${todayHabits.length}`, sub: `${todayHabits.length - completedHabits} remaining`, icon: Award, color: "bg-amber-100 text-amber-600", change: "84% rate" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-md hover:border-primary-200 transition-all">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-slate-500 font-medium">{kpi.label}</p>
                <div className={`w-9 h-9 rounded-xl ${kpi.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-bold font-display text-slate-900 mb-1">{kpi.value}</p>
              <p className="text-xs text-slate-500">{kpi.sub}</p>
              <p className="text-xs text-green-600 font-medium mt-1">{kpi.change}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Progress Trends */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-slate-900">Progress Trends</h2>
              <p className="text-xs text-slate-500 mt-0.5">Goals • Habits • Wellness</p>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">+12% avg</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={progressChartData}>
              <defs>
                <linearGradient id="goalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="habitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="wellGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
              <Area type="monotone" dataKey="goals" stroke="#7C3AED" strokeWidth={2} fill="url(#goalGrad)" name="Goals" />
              <Area type="monotone" dataKey="habits" stroke="#2563EB" strokeWidth={2} fill="url(#habitGrad)" name="Habits" />
              <Area type="monotone" dataKey="wellness" stroke="#22C55E" strokeWidth={2} fill="url(#wellGrad)" name="Wellness" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Habits */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-slate-900">Weekly Habit Completion</h2>
              <p className="text-xs text-slate-500 mt-0.5">Habits completed per day this week</p>
            </div>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">Avg 8.1/10</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={habitStreakData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} domain={[0, 10]} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} />
              <Bar dataKey="completed" fill="#7C3AED" radius={[6, 6, 0, 0]} name="Habits Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Goal Summary Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="font-semibold text-slate-900">Goal Summary</h2>
            <p className="text-xs text-slate-500 mt-0.5">Your active goals and progress</p>
          </div>
          <Link to="/dashboard/goals" className="text-sm text-primary-600 font-medium hover:underline flex items-center gap-1">
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Goal</th>
                <th>Category</th>
                <th>Milestone</th>
                <th className="w-40">Progress</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activeGoals.slice(0, 6).map((goal) => (
                <tr key={goal.id}>
                  <td className="font-medium text-slate-800">{goal.title}</td>
                  <td><span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{goal.category}</span></td>
                  <td className="text-slate-500 text-xs">{goal.milestone}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar flex-1">
                        <div className={`progress-fill ${getProgressColor(goal.progress)}`} style={{ width: `${goal.progress}%` }} />
                      </div>
                      <span className="text-xs text-slate-500 w-8">{goal.progress}%</span>
                    </div>
                  </td>
                  <td className="text-xs text-slate-500">{goal.deadline}</td>
                  <td><span className={`status-badge ${getStatusColor(goal.status)}`}>{goal.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Row: Dreams + Habits */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Dream Progress */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Dream Progress</h2>
            <Link to="/dashboard/dreams" className="text-sm text-primary-600 font-medium hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {mockDreams.slice(0, 5).map(dream => (
              <div key={dream.id} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-800">{dream.title}</p>
                  <p className="text-xs text-slate-500">{dream.category}</p>
                </div>
                <div className="flex-1" />
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">{dream.progress}%</p>
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full mt-1">
                    <div className={`h-full rounded-full ${getProgressColor(dream.progress)}`} style={{ width: `${dream.progress}%` }} />
                  </div>
                </div>
                <span className={`status-badge ${getStatusColor(dream.status)} ml-2`}>{dream.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Habit Completion */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Today's Habits</h2>
            <Link to="/dashboard/habits" className="text-sm text-primary-600 font-medium hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {mockHabits.slice(0, 5).map(habit => (
              <div key={habit.id} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors">
                <span className="text-xl">{habit.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{habit.title}</p>
                  <p className="text-xs text-slate-500">{habit.streak}d streak • {habit.frequency}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">{habit.completionRate}%</p>
                  <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-1">
                    <div className={`h-full rounded-full ${getProgressColor(habit.completionRate)}`} style={{ width: `${habit.completionRate}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Coach CTA */}
      <div className="bg-gradient-dark rounded-2xl p-6 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">AI Coach Insight</span>
          </div>
          <p className="text-white font-medium mb-1">You're in your peak performance phase! 🔥</p>
          <p className="text-slate-400 text-sm">Focus on high-impact tasks now. Your startup funding goal needs attention.</p>
        </div>
        <Link to="/dashboard/ai-coach" className="relative z-10 flex-shrink-0 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap ml-4">
          Chat with AI
        </Link>
      </div>
    </div>
  );
}
