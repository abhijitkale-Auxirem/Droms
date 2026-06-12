import { useState } from "react";
import { Plus, Star, TrendingUp, BookOpen, Award, Search, MoreVertical } from "lucide-react";
import { toast } from "sonner";

const skills = [
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
  const [search, setSearch] = useState("");
  const filtered = skills.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Skills Development</h1>
          <p className="text-slate-500 text-sm mt-1">Track and grow your professional skill set</p>
        </div>
        <button onClick={() => toast.success("Skill added to tracker!")} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Skills Tracked", value: skills.length, icon: Star, color: "text-primary-600" },
          { label: "Certifications", value: skills.reduce((s, sk) => s + sk.certifications, 0), icon: Award, color: "text-amber-600" },
          { label: "Hours Invested", value: skills.reduce((s, sk) => s + sk.hoursInvested, 0), icon: BookOpen, color: "text-blue-600" },
          { label: "Avg. Proficiency", value: `${Math.round(skills.reduce((s, sk) => s + sk.level, 0) / skills.length)}%`, icon: TrendingUp, color: "text-green-600" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
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
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
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
                <th className="px-6 py-4" />
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
                      <span className="text-xs text-slate-600">{skill.level}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{skill.target}%</td>
                  <td className={`px-6 py-4 text-sm font-medium ${skill.target - skill.level > 20 ? "text-red-600" : "text-yellow-600"}`}>
                    {skill.target - skill.level}%
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-amber-600">
                      <Award className="w-3.5 h-3.5" /> {skill.certifications}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{skill.hoursInvested}h</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      skill.level >= 80 ? "bg-green-100 text-green-700" :
                      skill.level >= 60 ? "bg-blue-100 text-blue-700" :
                      skill.level >= 40 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                      {levelLabel(skill.level)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
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
