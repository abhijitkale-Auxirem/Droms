import { useState, useEffect } from "react";
import { mockDreams } from "@/data/mockData";
import { getStatusColor, getProgressColor, cn } from "@/lib/utils";
import { Plus, Search, Filter, Sparkles, Edit, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import type { Dream } from "@/types";
import { DREAM_CATEGORIES } from "@/constants";

export default function DreamsPage() {
  const [dreams, setDreams] = useState<Dream[]>(() => {
    const cached = localStorage.getItem("droms_dreams_data");
    return cached ? JSON.parse(cached) : mockDreams;
  });

  useEffect(() => {
    localStorage.setItem("droms_dreams_data", JSON.stringify(dreams));
  }, [dreams]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editDream, setEditDream] = useState<Dream | null>(null);
  const [form, setForm] = useState({ title: "", category: "", priority: "medium" as Dream["priority"], status: "active" as Dream["status"], progress: 0, targetDate: "", description: "" });

  const filtered = dreams.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || d.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openCreate = () => {
    setEditDream(null);
    setForm({ title: "", category: DREAM_CATEGORIES[0], priority: "medium", status: "active", progress: 0, targetDate: "", description: "" });
    setShowModal(true);
  };

  const openEdit = (dream: Dream) => {
    setEditDream(dream);
    setForm({ title: dream.title, category: dream.category, priority: dream.priority, status: dream.status, progress: dream.progress, targetDate: dream.targetDate, description: dream.description || "" });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title || !form.targetDate) { toast.error("Fill required fields"); return; }
    if (editDream) {
      setDreams(prev => prev.map(d => d.id === editDream.id ? { ...d, ...form } : d));
      toast.success("Dream updated!");
    } else {
      const newDream: Dream = { id: `d${Date.now()}`, ...form };
      setDreams(prev => [newDream, ...prev]);
      toast.success("Dream created! Start planning your journey 🌟");
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setDreams(prev => prev.filter(d => d.id !== id));
    toast.success("Dream removed");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary-600" /> Dreams
          </h1>
          <p className="text-slate-500 mt-0.5">Define and track your biggest life dreams</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Dream
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Dreams", value: dreams.length, color: "bg-purple-100 text-purple-700" },
          { label: "Active", value: dreams.filter(d => d.status === "active").length, color: "bg-green-100 text-green-700" },
          { label: "Avg Progress", value: `${Math.round(dreams.reduce((a, d) => a + d.progress, 0) / dreams.length)}%`, color: "bg-blue-100 text-blue-700" },
          { label: "Completed", value: dreams.filter(d => d.status === "completed").length, color: "bg-amber-100 text-amber-700" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className={`text-2xl font-bold font-display mt-1 ${s.color.split(" ")[1]}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search dreams..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
        </div>
        <div className="flex gap-2">
          {["all", "active", "paused", "completed"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize",
                filterStatus === s ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-primary-300"
              )}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Dream</th>
                <th>Category</th>
                <th>Priority</th>
                <th className="w-44">Progress</th>
                <th>Target Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(dream => (
                <tr key={dream.id}>
                  <td>
                    <div>
                      <p className="font-medium text-slate-800">{dream.title}</p>
                      {dream.description && <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">{dream.description}</p>}
                    </div>
                  </td>
                  <td><span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{dream.category}</span></td>
                  <td><span className={`status-badge ${getStatusColor(dream.priority)}`}>{dream.priority}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar flex-1"><div className={`progress-fill ${getProgressColor(dream.progress)}`} style={{ width: `${dream.progress}%` }} /></div>
                      <span className="text-xs text-slate-500 w-8">{dream.progress}%</span>
                    </div>
                  </td>
                  <td className="text-sm text-slate-600">{dream.targetDate}</td>
                  <td><span className={`status-badge ${getStatusColor(dream.status)}`}>{dream.status}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(dream)} className="p-1.5 rounded-lg hover:bg-primary-50 text-slate-400 hover:text-primary-600 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(dream.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No dreams found. Create your first dream!</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold font-display text-slate-900">{editDream ? "Edit Dream" : "Create New Dream"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Dream Title *</label>
                <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="What's your dream?" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    {DREAM_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Priority</label>
                  <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value as Dream["priority"]})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Target Date *</label>
                  <input type="date" value={form.targetDate} onChange={e => setForm({...form, targetDate: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
                </div>
                {editDream && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                    <select value={form.status} onChange={e => setForm({...form, status: e.target.value as Dream["status"]})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                )}
              </div>
              {editDream && (
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-sm font-medium text-slate-700">Progress</label>
                    <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">{form.progress}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={form.progress} onChange={e => {
                    const val = parseInt(e.target.value);
                    setForm({
                      ...form,
                      progress: val,
                      status: val === 100 ? "completed" : form.status === "completed" ? "active" : form.status
                    });
                  }} className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary-600" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm resize-none" placeholder="Describe your dream in detail..." />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 btn-primary py-2.5">{editDream ? "Save Changes" : "Create Dream"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
