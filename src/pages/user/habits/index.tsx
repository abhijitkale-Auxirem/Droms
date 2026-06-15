import { useState, useEffect } from "react";
import { mockHabits } from "@/data/mockData";
import { getStatusColor, getProgressColor, cn } from "@/lib/utils";
import { 
  Plus, 
  Search, 
  CheckSquare, 
  X, 
  Flame, 
  TrendingUp,
  // New imports for habit-specific lucide icons
  Activity, 
  BookOpen, 
  Dumbbell, 
  PenTool, 
  Smile, 
  Target, 
  Zap, 
  Compass, 
  Sparkles, 
  Brain, 
  Coffee, 
  Briefcase 
} from "lucide-react";
import { toast } from "sonner";
import type { Habit } from "@/types";

const habitCategories = ["Wellness", "Learning", "Fitness", "Personal", "Productivity", "Mindset", "Health", "Career"];

// 1. Defined a lookup map for Lucide icon string keys to component references
const AVAILABLE_ICONS = {
  Target: Target,
  Activity: Activity,
  BookOpen: BookOpen,
  Dumbbell: Dumbbell,
  PenTool: PenTool,
  Smile: Smile,
  Zap: Zap,
  Compass: Compass,
  Sparkles: Sparkles,
  Brain: Brain,
  Coffee: Coffee,
  Briefcase: Briefcase
} as const;

type IconName = keyof typeof AVAILABLE_ICONS;
const habitIconNames = Object.keys(AVAILABLE_ICONS) as IconName[];

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const cached = localStorage.getItem("droms_habits_data");
    return cached ? JSON.parse(cached) : mockHabits;
  });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  // Adjusted initial fallback string to match our dictionary key
  const [form, setForm] = useState({ 
    title: "", 
    frequency: "daily" as Habit["frequency"], 
    category: habitCategories[0], 
    icon: "Target" 
  });

  useEffect(() => {
    localStorage.setItem("droms_habits_data", JSON.stringify(habits));
  }, [habits]);

  const filtered = habits.filter(h => 
    h.title.toLowerCase().includes(search.toLowerCase()) || 
    h.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!form.title) { toast.error("Enter habit title"); return; }
    const newHabit: Habit = { id: `h${Date.now()}`, ...form, streak: 0, completionRate: 0, status: "active" };
    setHabits(prev => [newHabit, ...prev]);
    toast.success("Habit created! Start your streak today 🔥");
    setShowModal(false);
    setForm({ title: "", frequency: "daily", category: habitCategories[0], icon: "Target" });
  };

  const toggleStatus = (id: string) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, status: h.status === "active" ? "paused" : "active" } : h));
    toast.success("Habit status updated");
  };

  const handleLogCompletion = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const newStreak = h.streak + 1;
        const newRate = Math.min(100, h.completionRate + 5);
        toast.success(`Streak updated to ${newStreak} days for ${h.title}! 🔥`);
        return { ...h, streak: newStreak, completionRate: newRate };
      }
      return h;
    }));
  };

  const handleDelete = (id: string) => {
    const item = habits.find(h => h.id === id);
    setHabits(prev => prev.filter(h => h.id !== id));
    toast.success(`Deleted habit: ${item?.title}`);
  };

  // Safe checks handling division exceptions for averages when array is empty
  const totalStreak = habits.reduce((a, h) => a + h.streak, 0);
  const avgCompletion = habits.length ? Math.round(habits.reduce((a, h) => a + h.completionRate, 0) / habits.length) : 0;
  const topStreak = habits.length ? Math.max(...habits.map(h => h.streak)) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-primary-600" /> Habit Tracker
          </h1>
          <p className="text-slate-500 mt-0.5">Build powerful daily habits that drive success</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Habit
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Habits", value: habits.filter(h => h.status === "active").length, icon: CheckSquare, color: "text-primary-600" },
          { label: "Total Streak Days", value: totalStreak, icon: Flame, color: "text-orange-500" },
          { label: "Avg Completion", value: `${avgCompletion}%`, icon: TrendingUp, color: "text-green-600" },
          { label: "Best Streak", value: `${topStreak}d`, icon: Flame, color: "text-red-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Icon className={`w-5 h-5 ${color}`} />
              <p className="text-sm text-slate-500">{label}</p>
            </div>
            <p className={`text-2xl font-bold font-display ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search habits..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm max-w-md" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Habit</th>
                <th>Category</th>
                <th>Frequency</th>
                <th>Streak</th>
                <th className="w-44">Completion Rate</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(habit => {
                // 2. Resolve icon string from data object into an executable Component reference
                const RowIcon = AVAILABLE_ICONS[habit.icon as IconName] || Target;

                return (
                  <tr key={habit.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-200">
                          <RowIcon className="w-5 h-5" />
                        </span>
                        <span className="font-medium text-slate-800">{habit.title}</span>
                      </div>
                    </td>
                    <td><span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{habit.category}</span></td>
                    <td className="capitalize text-sm text-slate-600">{habit.frequency}</td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="font-bold text-slate-800">{habit.streak}</span>
                        <span className="text-xs text-slate-400">days</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar flex-1">
                          <div className={`progress-fill ${getProgressColor(habit.completionRate)}`} style={{ width: `${habit.completionRate}%` }} />
                        </div>
                        <span className="text-xs text-slate-500 w-8">{habit.completionRate}%</span>
                      </div>
                    </td>
                    <td><span className={`status-badge ${getStatusColor(habit.status)}`}>{habit.status}</span></td>
                    <td>
                      <div className="flex items-center gap-2">
                        {habit.status === "active" && (
                          <button onClick={() => handleLogCompletion(habit.id)}
                            className="text-xs px-3 py-1.5 rounded-xl font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                            Complete Today
                          </button>
                        )}
                        <button onClick={() => toggleStatus(habit.id)}
                          className={cn("text-xs px-3 py-1.5 rounded-xl font-medium transition-colors",
                            habit.status === "active" ? "bg-amber-50 text-amber-600 hover:bg-amber-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                          )}>
                          {habit.status === "active" ? "Pause" : "Resume"}
                        </button>
                        <button onClick={() => handleDelete(habit.id)}
                          className="text-xs px-2.5 py-1.5 rounded-xl font-medium bg-red-50 text-red-650 hover:bg-red-100 transition-colors">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold font-display text-slate-900">New Habit</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Habit Name</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. Morning Meditation" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Icon Selection</label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1 border border-dashed border-slate-200 rounded-xl">
                  {/* 3. Mapping names out of the reference key array to build UI grid buttons */}
                  {habitIconNames.map(iconName => {
                    const ButtonIcon = AVAILABLE_ICONS[iconName];
                    const isSelected = form.icon === iconName;
                    
                    return (
                      <button 
                        key={iconName} 
                        type="button"
                        onClick={() => setForm({...form, icon: iconName})}
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                          isSelected 
                            ? "bg-primary-100 text-primary-600 border-2 border-primary-500" 
                            : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                        )}
                        title={iconName}
                      >
                        <ButtonIcon className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Frequency</label>
                  <select value={form.frequency} onChange={e => setForm({...form, frequency: e.target.value as Habit["frequency"]})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    {habitCategories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleCreate} className="flex-1 btn-primary py-2.5">Create Habit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}