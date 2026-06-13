import { useState, useEffect } from "react";
import { Heart, Activity, Moon, Apple, Brain, Plus, Trash2, Edit2, X, Star } from "lucide-react";
import { getProgressColor } from "@/lib/utils";
import { toast } from "sonner";

interface WellnessGoal {
  id: string;
  title: string;
  category: "Fitness" | "Nutrition" | "Sleep" | "Mental Wellness";
  progress: number;
  current: string;
  target: string;
  status: "on-track" | "at-risk";
}

const defaultWellnessData: WellnessGoal[] = [
  { id: "w1", category: "Fitness", title: "Run 50 miles/month", progress: 88, current: "44 mi", target: "50 mi", status: "on-track" },
  { id: "w2", category: "Fitness", title: "Strength Train 3x/week", progress: 75, current: "9 sessions", target: "12 sessions", status: "on-track" },
  { id: "w3", category: "Fitness", title: "Daily Steps 10k", progress: 72, current: "7,200 avg", target: "10,000", status: "at-risk" },
  { id: "w4", category: "Nutrition", title: "Eat 150g Protein Daily", progress: 85, current: "127g avg", target: "150g", status: "on-track" },
  { id: "w5", category: "Nutrition", title: "Drink 3L Water Daily", progress: 80, current: "2.4L avg", target: "3L", status: "on-track" },
  { id: "w6", category: "Nutrition", title: "5 Servings Vegetables", progress: 60, current: "3 avg", target: "5", status: "at-risk" },
  { id: "w7", category: "Sleep", title: "Sleep 7-8 Hours", progress: 78, current: "6.7h avg", target: "7.5h", status: "at-risk" },
  { id: "w8", category: "Sleep", title: "Consistent Sleep Time", progress: 65, current: "11:30pm avg", target: "10:30pm", status: "at-risk" },
  { id: "w9", category: "Mental Wellness", title: "Daily Meditation 20min", progress: 95, current: "18min avg", target: "20min", status: "on-track" },
  { id: "w10", category: "Mental Wellness", title: "Stress Score < 30", progress: 70, current: "Score: 35", target: "Score: 30", status: "at-risk" },
];

const icons = { Fitness: Activity, Nutrition: Apple, Sleep: Moon, "Mental Wellness": Brain };

export default function WellnessPage() {
  const [goals, setGoals] = useState<WellnessGoal[]>([]);
  const [modal, setModal] = useState<{ open: boolean; mode: "add" | "edit"; category?: WellnessGoal["category"]; index?: number }>({ open: false, mode: "add" });
  const [form, setForm] = useState({ title: "", category: "Fitness" as WellnessGoal["category"], progress: 50, current: "", target: "", status: "on-track" as WellnessGoal["status"] });

  useEffect(() => {
    const cached = localStorage.getItem("droms_wellness_data");
    if (cached) {
      setGoals(JSON.parse(cached));
    } else {
      setGoals(defaultWellnessData);
      localStorage.setItem("droms_wellness_data", JSON.stringify(defaultWellnessData));
    }
  }, []);

  const saveGoals = (updated: WellnessGoal[]) => {
    setGoals(updated);
    localStorage.setItem("droms_wellness_data", JSON.stringify(updated));
  };

  const handleOpenAdd = (category: WellnessGoal["category"]) => {
    setForm({ title: "", category, progress: 50, current: "", target: "", status: "on-track" });
    setModal({ open: true, mode: "add", category });
  };

  const handleOpenEdit = (goal: WellnessGoal, idx: number) => {
    setForm({ title: goal.title, category: goal.category, progress: goal.progress, current: goal.current, target: goal.target, status: goal.status });
    setModal({ open: true, mode: "edit", index: idx });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (modal.mode === "add" && modal.category) {
      const newGoal: WellnessGoal = {
        id: `w-${Date.now()}`,
        title: form.title,
        category: modal.category,
        progress: Number(form.progress),
        current: form.current || `${Math.round(Number(form.progress) * 0.8)}`,
        target: form.target || "100",
        status: form.status
      };
      const updated = [...goals, newGoal];
      saveGoals(updated);
      toast.success(`Wellness goal added successfully!`);
    } else if (modal.mode === "edit" && modal.index !== undefined) {
      const updated = [...goals];
      updated[modal.index] = {
        ...updated[modal.index],
        title: form.title,
        progress: Number(form.progress),
        current: form.current,
        target: form.target,
        status: form.status
      };
      saveGoals(updated);
      toast.success(`Goal updated successfully!`);
    }

    setModal({ open: false, mode: "add" });
  };

  const handleDelete = (idx: number) => {
    const title = goals[idx].title;
    const updated = goals.filter((_, i) => i !== idx);
    saveGoals(updated);
    toast.success(`Goal "${title}" deleted`);
  };

  const toggleStatus = (idx: number) => {
    const updated = [...goals];
    updated[idx].status = updated[idx].status === "on-track" ? "at-risk" : "on-track";
    saveGoals(updated);
    toast.info(`Status updated to ${updated[idx].status}`);
  };

  const categoriesList: WellnessGoal["category"][] = ["Fitness", "Nutrition", "Sleep", "Mental Wellness"];

  // Compute stats dynamically
  const activeCount = goals.length;
  const overallScore = activeCount > 0 
    ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / activeCount) 
    : 80;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary-600 animate-pulse" /> Wellness Center
          </h1>
          <p className="text-slate-500 mt-0.5">Holistic health and lifestyle management</p>
        </div>
      </div>

      {/* Dynamic KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Wellness Score", value: `${overallScore}/100`, color: "text-green-600" },
          { label: "Active Goals", value: activeCount, color: "text-primary-600" },
          { label: "Goals On Track", value: goals.filter(g => g.status === "on-track").length, color: "text-blue-600" },
          { label: "At Risk Count", value: goals.filter(g => g.status === "at-risk").length, color: "text-red-500 animate-pulse" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 font-medium">{s.label}</p>
            <p className={`text-2xl font-bold font-display mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {categoriesList.map(cat => {
        const Icon = icons[cat] || Heart;
        const categoryGoals = goals.map((g, i) => ({ ...g, originalIndex: i })).filter(g => g.category === cat);
        return (
          <div key={cat} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-primary-600" />
                <h2 className="font-semibold text-slate-900">{cat} Tracking</h2>
              </div>
              <button 
                onClick={() => handleOpenAdd(cat)}
                className="text-xs text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Goal
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/10 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-3">Wellness Goal</th>
                    <th className="px-6 py-3">Current</th>
                    <th className="px-6 py-3">Target</th>
                    <th className="px-6 py-3 w-48">Progress</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {categoryGoals.map(goal => (
                    <tr key={goal.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-800">{goal.title}</td>
                      <td className="px-6 py-4 text-slate-700 font-medium">{goal.current}</td>
                      <td className="px-6 py-4 text-slate-500">{goal.target}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-300 ${getProgressColor(goal.progress)}`} style={{ width: `${goal.progress}%` }} />
                          </div>
                          <span className="text-xs text-slate-650 font-bold w-8">{goal.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span 
                          onClick={() => toggleStatus(goal.originalIndex)}
                          className={`status-badge text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded cursor-pointer transition-all hover:opacity-80 ${goal.status === "on-track" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-650 border border-red-200"}`}
                          title="Click to toggle status"
                        >
                          {goal.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenEdit(goal, goal.originalIndex)}
                            className="p-1.5 text-slate-400 hover:text-primary-600 rounded"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(goal.originalIndex)}
                            className="p-1.5 text-slate-400 hover:text-red-650 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {categoryGoals.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-slate-400 italic">No goals set in {cat}.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {/* --- ADD / EDIT GOAL MODAL --- */}
      {modal.open && (
        <div className="fixed inset-0 bg-slate-900/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {modal.mode === "add" ? `Add ${modal.category} Goal` : "Edit Wellness Goal"}
              </h3>
              <button 
                onClick={() => setModal({ open: false, mode: "add" })} 
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Goal / Activity Name</label>
                <input 
                  type="text" 
                  value={form.title} 
                  onChange={e => setForm({ ...form, title: e.target.value })} 
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white text-slate-800" 
                  placeholder="e.g. Strength train 3x/week" 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Progress Value</label>
                  <input 
                    type="text" 
                    value={form.current} 
                    onChange={e => setForm({ ...form, current: e.target.value })} 
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white text-slate-800" 
                    placeholder="e.g. 2 sessions" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Target Value</label>
                  <input 
                    type="text" 
                    value={form.target} 
                    onChange={e => setForm({ ...form, target: e.target.value })} 
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white text-slate-800" 
                    placeholder="e.g. 3 sessions" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Completion Progress ({form.progress}%)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={form.progress} 
                    onChange={e => setForm({ ...form, progress: parseInt(e.target.value) })}
                    className="w-full accent-primary-600 mt-2.5" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</label>
                  <select 
                    value={form.status} 
                    onChange={e => setForm({ ...form, status: e.target.value as WellnessGoal["status"] })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white text-slate-800"
                  >
                    <option value="on-track">On Track</option>
                    <option value="at-risk">At Risk</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setModal({ open: false, mode: "add" })} className="w-1/2 py-2.5 text-sm font-semibold border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-sm">Save Goal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
