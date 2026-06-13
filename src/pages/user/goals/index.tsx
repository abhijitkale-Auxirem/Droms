import { useState, useEffect } from "react";
import { mockGoals } from "@/data/mockData";
import { getStatusColor, getProgressColor, cn } from "@/lib/utils";
import { Plus, Search, Target, Edit, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import type { Goal } from "@/types";
import { GOAL_CATEGORIES } from "@/constants";

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const cached = localStorage.getItem("droms_goals_data");
    return cached ? JSON.parse(cached) : mockGoals;
  });
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editGoal, setEditGoal] = useState<Goal | null>(null);
  const [form, setForm] = useState({ 
    title: "", 
    category: GOAL_CATEGORIES[0], 
    milestone: "", 
    deadline: "", 
    priority: "medium" as Goal["priority"],
    status: "on-track" as Goal["status"],
    progress: 0
  });

  useEffect(() => {
    localStorage.setItem("droms_goals_data", JSON.stringify(goals));
  }, [goals]);

  const filtered = goals.filter(g => {
    const m = g.title.toLowerCase().includes(search.toLowerCase()) || g.category.toLowerCase().includes(search.toLowerCase());
    return m && (filterStatus === "all" || g.status === filterStatus);
  });

  const openCreate = () => {
    setEditGoal(null);
    setForm({ 
      title: "", 
      category: GOAL_CATEGORIES[0], 
      milestone: "", 
      deadline: "", 
      priority: "medium",
      status: "on-track",
      progress: 0
    });
    setShowModal(true);
  };

  const openEdit = (goal: Goal) => {
    setEditGoal(goal);
    setForm({ 
      title: goal.title, 
      category: goal.category, 
      milestone: goal.milestone, 
      deadline: goal.deadline, 
      priority: goal.priority,
      status: goal.status,
      progress: goal.progress
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title || !form.deadline) { toast.error("Fill required fields"); return; }
    if (editGoal) {
      setGoals(prev => prev.map(g => g.id === editGoal.id ? { ...g, ...form } : g));
      toast.success("Goal updated!");
    } else {
      const newGoal: Goal = { id: `g${Date.now()}`, ...form };
      setGoals(prev => [newGoal, ...prev]);
      toast.success("Goal created! Let's crush it 🎯");
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    toast.success("Goal removed");
  };

  const stats = {
    total: goals.length,
    onTrack: goals.filter(g => g.status === "on-track").length,
    atRisk: goals.filter(g => g.status === "at-risk").length,
    completed: goals.filter(g => g.status === "completed").length,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary-600" /> Goals
          </h1>
          <p className="text-slate-500 mt-0.5">Break down your dreams into achievable goals</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Goal
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Goals", value: stats.total, color: "text-slate-700" },
          { label: "On Track", value: stats.onTrack, color: "text-green-600" },
          { label: "At Risk", value: stats.atRisk, color: "text-yellow-600" },
          { label: "Completed", value: stats.completed, color: "text-blue-600" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className={`text-2xl font-bold font-display mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search goals..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "on-track", "at-risk", "completed", "overdue"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={cn("px-3 py-2 rounded-xl text-sm font-medium transition-all capitalize whitespace-nowrap",
                filterStatus === s ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-primary-300"
              )}>{s}</button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Goal</th>
                <th>Category</th>
                <th>Milestone</th>
                <th className="w-44">Progress</th>
                <th>Deadline</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(goal => (
                <tr key={goal.id}>
                  <td className="font-medium text-slate-800">{goal.title}</td>
                  <td><span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{goal.category}</span></td>
                  <td className="text-xs text-slate-500">{goal.milestone}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar flex-1"><div className={`progress-fill ${getProgressColor(goal.progress)}`} style={{ width: `${goal.progress}%` }} /></div>
                      <span className="text-xs text-slate-500 w-8">{goal.progress}%</span>
                    </div>
                  </td>
                  <td className="text-sm text-slate-600">{goal.deadline}</td>
                  <td><span className={`status-badge ${getStatusColor(goal.priority)}`}>{goal.priority}</span></td>
                  <td><span className={`status-badge ${getStatusColor(goal.status)}`}>{goal.status}</span></td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(goal)} className="p-1.5 rounded-lg hover:bg-primary-50 text-slate-400 hover:text-primary-600 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(goal.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold font-display text-slate-900">{editGoal ? "Edit Goal" : "New Goal"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Goal Title *</label>
                <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="What do you want to achieve?" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    {GOAL_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Priority</label>
                  <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value as Goal["priority"]})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Milestone</label>
                <input type="text" value={form.milestone} onChange={e => setForm({...form, milestone: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. Phase 1 Complete" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Deadline *</label>
                <input type="date" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value as Goal["status"]})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    <option value="on-track">On Track</option>
                    <option value="at-risk">At Risk</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Progress ({form.progress}%)</label>
                  <div className="flex items-center gap-2 h-[42px]">
                    <input type="range" min="0" max="100" value={form.progress} onChange={e => setForm({...form, progress: parseInt(e.target.value) || 0})}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-650" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50">Cancel</button>
              <button onClick={handleSave} className="flex-1 btn-primary py-2.5">{editGoal ? "Update" : "Create Goal"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
