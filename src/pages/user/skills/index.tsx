import { useState, useEffect } from "react";
import { Plus, Star, TrendingUp, BookOpen, Award, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";

const initialSkills = [
  { id: "s1", name: "React & TypeScript", category: "Frontend", level: 85, target: 95, status: "in-progress", certifications: 2, hoursInvested: 340 },
  { id: "s2", name: "System Design", category: "Architecture", level: 65, target: 85, status: "in-progress", certifications: 0, hoursInvested: 120 },
  { id: "s3", name: "Leadership & Management", category: "Soft Skills", level: 70, target: 90, status: "in-progress", certifications: 1, hoursInvested: 80 },
  { id: "s4", name: "Machine Learning (Python)", category: "AI/ML", level: 55, target: 80, status: "in-progress", certifications: 1, hoursInvested: 200 },
  { id: "s5", name: "Public Speaking", category: "Communication", level: 60, target: 85, status: "in-progress", certifications: 0, hoursInvested: 45 },
  { id: "s6", name: "Financial Analysis", category: "Finance", level: 45, target: 70, status: "planned", certifications: 0, hoursInvested: 30 },
  { id: "s7", name: "AWS Cloud Architecture", category: "DevOps", level: 75, target: 90, status: "in-progress", certifications: 2, hoursInvested: 180 },
  { id: "s8", name: "Strategic Thinking", category: "Management", level: 80, target: 95, status: "in-progress", certifications: 1, hoursInvested: 60 },
];

const levelColor = (level: number) => {
  if (level >= 80) return "bg-green-500";
  if (level >= 60) return "bg-blue-500";
  if (level >= 40) return "bg-yellow-500";
  return "bg-red-500";
};

const levelLabel = (level: number) => {
  if (level >= 90) return "Expert";
  if (level >= 75) return "Advanced";
  if (level >= 50) return "Intermediate";
  return "Beginner";
};

export default function SkillsPage() {
  const [list, setList] = useState<typeof initialSkills>(() => {
    const cached = localStorage.getItem("droms_skills_development_data");
    return cached ? JSON.parse(cached) : initialSkills;
  });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", category: "Frontend", level: 50, target: 80, certifications: 0, hoursInvested: 0 });

  useEffect(() => {
    localStorage.setItem("droms_skills_development_data", JSON.stringify(list));
  }, [list]);

  const handleCreate = () => {
    if (!form.name || !form.target) { toast.error("Fill required fields"); return; }
    const newSkill = {
      id: `s-${Date.now()}`,
      name: form.name,
      category: form.category,
      level: parseInt(form.level as any) || 0,
      target: parseInt(form.target as any) || 80,
      status: "in-progress",
      certifications: parseInt(form.certifications as any) || 0,
      hoursInvested: parseInt(form.hoursInvested as any) || 0
    };
    setList(prev => [newSkill, ...prev]);
    toast.success(`Skill "${form.name}" added to tracker!`);
    setShowModal(false);
    setForm({ name: "", category: "Frontend", level: 50, target: 80, certifications: 0, hoursInvested: 0 });
  };

  const handleDelete = (id: string) => {
    const item = list.find(s => s.id === id);
    setList(prev => prev.filter(s => s.id !== id));
    toast.success(`Deleted skill: ${item?.name}`);
  };

  const handleAdjustLevel = (id: string, delta: number) => {
    setList(prev => prev.map(s => {
      if (s.id === id) {
        const nextLvl = Math.min(100, Math.max(0, s.level + delta));
        return { ...s, level: nextLvl };
      }
      return s;
    }));
  };

  const handleAddHours = (id: string, hours: number) => {
    setList(prev => prev.map(s => {
      if (s.id === id) {
        const nextHrs = s.hoursInvested + hours;
        toast.success(`Logged ${hours} study hours for ${s.name}`);
        return { ...s, hoursInvested: nextHrs };
      }
      return s;
    }));
  };

  const filtered = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()));

  const avgProficiency = list.length > 0 ? Math.round(list.reduce((s, sk) => s + sk.level, 0) / list.length) : 0;
  const totalCerts = list.reduce((s, sk) => s + sk.certifications, 0);
  const totalHours = list.reduce((s, sk) => s + sk.hoursInvested, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Skills Development</h1>
          <p className="text-slate-500 text-sm mt-1">Track and grow your professional skill set</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Skills Tracked", value: list.length, icon: Star, color: "text-primary-600" },
          { label: "Certifications", value: totalCerts, icon: Award, color: "text-amber-600" },
          { label: "Hours Invested", value: `${totalHours.toLocaleString()}h`, icon: BookOpen, color: "text-blue-600" },
          { label: "Avg. Proficiency", value: `${avgProficiency}%`, icon: TrendingUp, color: "text-green-600" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div>
              <p className="text-xs text-slate-500">{kpi.label}</p>
              <p className={`text-xl font-bold font-display ${kpi.color}`}>{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Search skills..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 bg-white" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Skill</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Category</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Current Level</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Target</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Gap</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Certifications</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Hours</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Proficiency</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(skill => (
                <tr key={skill.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{skill.name}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{skill.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-200 rounded-full flex-shrink-0">
                        <div className={`h-full rounded-full ${levelColor(skill.level)}`} style={{ width: `${skill.level}%` }} />
                      </div>
                      <span className="text-xs text-slate-600 font-bold">{skill.level}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{skill.target}%</td>
                  <td className={`px-6 py-4 text-sm font-medium ${skill.target - skill.level > 20 ? "text-red-600" : "text-yellow-600"}`}>
                    {skill.target - skill.level}%
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-amber-600 font-semibold">
                      <Award className="w-3.5 h-3.5" /> {skill.certifications}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-semibold">{skill.hoursInvested}h</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      skill.level >= 80 ? "bg-green-100 text-green-700" :
                      skill.level >= 60 ? "bg-blue-100 text-blue-700" :
                      skill.level >= 40 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                      {levelLabel(skill.level)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleAdjustLevel(skill.id, 5)}
                        className="text-xs px-2 py-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors font-semibold" title="Proficiency +5%">
                        +5%
                      </button>
                      <button onClick={() => handleAddHours(skill.id, 10)}
                        className="text-xs px-2 py-1 bg-blue-50 text-blue-650 hover:bg-blue-100 rounded-lg transition-colors font-semibold" title="Add 10 Study Hours">
                        +10h
                      </button>
                      <button onClick={() => handleDelete(skill.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-450 hover:text-red-650 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold font-display text-slate-900">Add Skill to Tracker</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Skill Name *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. Next.js Architecture" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <input value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. Frontend" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Target Level (%) *</label>
                  <input type="number" value={form.target} onChange={e => setForm({...form, target: parseInt(e.target.value) || 80})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 90" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Level (%)</label>
                  <input type="number" value={form.level} onChange={e => setForm({...form, level: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5 font-semibold">Certifications Count</label>
                  <input type="number" value={form.certifications} onChange={e => setForm({...form, certifications: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 font-semibold">Hours Invested (h)</label>
                <input type="number" value={form.hoursInvested} onChange={e => setForm({...form, hoursInvested: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 20" />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleCreate} className="flex-1 btn-primary py-2.5">Add Skill</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
