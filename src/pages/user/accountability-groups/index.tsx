import { useState } from "react";
import { Users, Search, Plus, MessageSquare, Shield, Trophy, UserPlus, MoreVertical } from "lucide-react";
import { communityGroups } from "@/data/mockData";
import { toast } from "sonner";

const partners = [
  { id: "p1", name: "Alex Rivera", goal: "Launch Tech Startup", streak: 28, checkIns: 45, compatibility: 94, status: "active", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" },
  { id: "p2", name: "Emma Wilson", goal: "Run a Marathon", streak: 19, checkIns: 31, compatibility: 87, status: "active", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face" },
  { id: "p3", name: "Raj Patel", goal: "Financial Freedom", streak: 42, checkIns: 68, compatibility: 91, status: "active", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face" },
];

export default function AccountabilityGroupsPage() {
  const [tab, setTab] = useState<"groups" | "partners">("groups");
  const [search, setSearch] = useState("");

  const filteredGroups = communityGroups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Accountability Groups</h1>
          <p className="text-slate-500 text-sm mt-1">Your accountability communities and partners</p>
        </div>
        <button onClick={() => toast.success("Group join request sent!")} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Join Group
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Groups Joined", value: communityGroups.filter(g => g.joined).length, color: "text-primary-600" },
          { label: "Accountability Partners", value: partners.length, color: "text-blue-600" },
          { label: "Weekly Check-ins", value: 12, color: "text-green-600" },
          { label: "Best Partner Streak", value: "42 days", color: "text-orange-600" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
            <p className={`text-xl font-bold font-display ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["groups", "partners"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === t ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
            {t === "groups" ? "My Groups" : "My Partners"}
          </button>
        ))}
      </div>

      {tab === "groups" && (
        <>
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search groups..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 bg-white" />
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {["Group Name", "Category", "Members", "Activity", "Status", "Actions"].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredGroups.map(group => (
                    <tr key={group.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                            <Shield className="w-4 h-4 text-primary-600" />
                          </div>
                          <span className="text-sm font-medium text-slate-900">{group.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4"><span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{group.category}</span></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Users className="w-3.5 h-3.5 text-slate-400" /> {group.members}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${group.activity === "Very Active" ? "bg-green-100 text-green-700" : group.activity === "Active" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {group.activity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${group.joined ? "bg-primary-100 text-primary-700" : "bg-slate-100 text-slate-600"}`}>
                          {group.joined ? "Joined" : "Not Joined"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {group.joined ? (
                          <button onClick={() => toast.success(`Opened: ${group.name}`)}
                            className="flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors">
                            <MessageSquare className="w-3 h-3" /> Open Group
                          </button>
                        ) : (
                          <button onClick={() => toast.success(`Joined: ${group.name}`)}
                            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                            <UserPlus className="w-3 h-3" /> Join
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "partners" && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Partner", "Shared Goal", "Streak", "Check-ins", "Compatibility", "Status", ""].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {partners.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full ring-2 ring-primary-100" />
                        <span className="text-sm font-medium text-slate-900">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{p.goal}</td>
                    <td className="px-6 py-4 text-sm font-bold text-orange-600">🔥 {p.streak} days</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{p.checkIns} total</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${p.compatibility}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{p.compatibility}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">Active</span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => toast.success(`Messaging ${p.name}...`)}
                        className="flex items-center gap-1.5 text-xs font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors">
                        <MessageSquare className="w-3 h-3" /> Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
