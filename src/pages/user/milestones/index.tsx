import { useState } from "react";
import { Plus, Flag, Calendar, Sparkles, MoreVertical, Filter, Search } from "lucide-react";
import { mockGoals } from "@/data/mockData";
import { getStatusColor, getProgressColor, formatDate } from "@/lib/utils";
import { toast } from "sonner";

export default function MilestonesPage() {
  const [search, setSearch] = useState("");

  const milestones = mockGoals.flatMap(goal =>
    Array.from({ length: 3 }, (_, i) => ({
      id: `${goal.id}-m${i}`,
      goalTitle: goal.title,
      title: `${["Planning", "In Progress", "Review"][i]} - ${goal.milestone}`,
      dueDate: new Date(new Date(goal.deadline).getTime() - (2 - i) * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: i === 0 ? "completed" : i === 1 ? goal.status : "upcoming" as const,
      progress: i === 0 ? 100 : i === 1 ? goal.progress : 0,
      priority: goal.priority,
    }))
  ).filter(m => m.goalTitle.toLowerCase().includes(search.toLowerCase()) || m.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Milestones</h1>
          <p className="text-slate-500 text-sm mt-1">Track key checkpoints across all your goals</p>
        </div>
        <button onClick={() => toast.info("Milestone creation available in Goals module")} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Milestone
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search milestones..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 bg-white" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Milestones", value: milestones.length, color: "text-slate-900" },
          { label: "Completed", value: milestones.filter(m => m.status === "completed").length, color: "text-green-600" },
          { label: "In Progress", value: milestones.filter(m => m.status === "on-track" || m.status === "at-risk").length, color: "text-blue-600" },
          { label: "Upcoming", value: milestones.filter(m => m.status === "upcoming").length, color: "text-slate-500" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold font-display ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Milestone</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Parent Goal</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Progress</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Due Date</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Priority</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Status</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {milestones.slice(0, 20).map(m => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Flag className="w-4 h-4 text-primary-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-900">{m.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-[200px] truncate">{m.goalTitle}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-slate-200 rounded-full flex-shrink-0">
                        <div className={`h-full rounded-full ${getProgressColor(m.progress)}`} style={{ width: `${m.progress}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{m.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatDate(m.dueDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${getStatusColor(m.priority)}`}>{m.priority}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${getStatusColor(m.status)}`}>
                      {m.status === "on-track" ? "On Track" : m.status === "at-risk" ? "At Risk" : m.status.charAt(0).toUpperCase() + m.status.slice(1)}
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
