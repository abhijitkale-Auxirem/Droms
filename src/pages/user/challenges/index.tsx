import { useState } from "react";
import { Trophy, Users, Clock, Plus, Target, MoreVertical } from "lucide-react";
import { challenges } from "@/data/mockData";
import { toast } from "sonner";

const allChallenges = [
  ...challenges,
  { id: "ch6", title: "Digital Detox Weekend", category: "Wellness", participants: 1890, daysLeft: 3, progress: 85, joined: false, prize: "Zen Master Badge" },
  { id: "ch7", title: "10K Steps Daily - 21 Days", category: "Fitness", participants: 3450, daysLeft: 14, progress: 35, joined: true, prize: "Step Warrior Badge + 400 pts" },
  { id: "ch8", title: "Save $500 This Month", category: "Finance", participants: 780, daysLeft: 16, progress: 60, joined: false, prize: "Saver Badge + 250 pts" },
];

export default function ChallengesPage() {
  const [filter, setFilter] = useState("all");
  const myJoined = allChallenges.filter(c => c.joined);
  const available = allChallenges.filter(c => !c.joined);

  const filtered = filter === "joined" ? myJoined : filter === "available" ? available : allChallenges;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Challenges</h1>
          <p className="text-slate-500 text-sm mt-1">Personal and group challenges to push your limits</p>
        </div>
        <button onClick={() => toast.success("Challenge created!")} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Create Challenge
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Challenges", value: myJoined.length, color: "text-primary-600" },
          { label: "Completed", value: 8, color: "text-green-600" },
          { label: "Points Earned", value: "2,840", color: "text-amber-600" },
          { label: "Available", value: available.length, color: "text-blue-600" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
            <p className={`text-xl font-bold font-display ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "joined", "available"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize ${filter === f ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
            {f === "all" ? "All Challenges" : f === "joined" ? "My Challenges" : "Available"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["Challenge", "Category", "Participants", "Days Left", "Progress", "Prize", "Status", ""].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-900">{c.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{c.category}</span></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> {c.participants.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {c.daysLeft} days
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {c.joined ? (
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-200 rounded-full flex-shrink-0">
                          <div className="h-full bg-primary-600 rounded-full" style={{ width: `${c.progress}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{c.progress}%</span>
                      </div>
                    ) : <span className="text-xs text-slate-400">—</span>}
                  </td>
                  <td className="px-6 py-4 text-xs text-amber-700 font-medium">{c.prize}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.joined ? "bg-primary-100 text-primary-700" : "bg-slate-100 text-slate-600"}`}>
                      {c.joined ? "Joined" : "Available"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {!c.joined ? (
                      <button onClick={() => toast.success(`Joined: ${c.title}`)}
                        className="text-xs font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors">
                        Join Now
                      </button>
                    ) : (
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    )}
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
