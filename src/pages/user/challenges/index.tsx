import { useState, useEffect } from "react";
import { Trophy, Users, Clock, Plus, Target, CheckCircle, Award, PlusCircle, Lock, Unlock, X } from "lucide-react";
import { challenges } from "@/data/mockData";
import { toast } from "sonner";

const initialChallenges = [
  ...challenges,
  { id: "ch6", title: "Digital Detox Weekend", category: "Wellness", participants: 1890, daysLeft: 3, progress: 85, joined: false, prize: "Zen Master Badge" },
  { id: "ch7", title: "10K Steps Daily - 21 Days", category: "Fitness", participants: 3450, daysLeft: 14, progress: 35, joined: true, prize: "Step Warrior Badge + 400 pts" },
  { id: "ch8", title: "Save $500 This Month", category: "Finance", participants: 780, daysLeft: 16, progress: 60, joined: false, prize: "Saver Badge + 250 pts" },
];

export default function ChallengesPage() {
  const [list, setList] = useState<typeof initialChallenges>(() => {
    const cached = localStorage.getItem("droms_challenges_data");
    return cached ? JSON.parse(cached) : initialChallenges;
  });
  const [filter, setFilter] = useState("all");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Productivity");
  const [newPrize, setNewPrize] = useState("");
  const [newDaysLeft, setNewDaysLeft] = useState(30);

  useEffect(() => {
    localStorage.setItem("droms_challenges_data", JSON.stringify(list));
  }, [list]);

  const handleJoin = (id: string) => {
    setList(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, joined: true, participants: c.participants + 1, progress: 0 }
          : c
      )
    );
    const item = list.find(c => c.id === id);
    toast.success(`Successfully joined challenge: ${item?.title}! `);
  };

  const handleLeave = (id: string) => {
    setList(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, joined: false, participants: Math.max(0, c.participants - 1), progress: 0 }
          : c
      )
    );
    const item = list.find(c => c.id === id);
    toast.info(`Left challenge: ${item?.title}`);
  };

  const handleProgressIncrement = (id: string) => {
    setList(prev =>
      prev.map(c => {
        if (c.id === id) {
          const nextProgress = Math.min(100, c.progress + 10);
          if (nextProgress === 100 && c.progress < 100) {
            toast.success(`Congratulations! You completed the challenge: ${c.title}! `);
          } else {
            toast.success(`Progress updated for: ${c.title} (+10%)`);
          }
          return { ...c, progress: nextProgress };
        }
        return c;
      })
    );
  };

  const handleCreateChallenge = () => {
    setNewTitle("");
    setNewCategory("Productivity");
    setNewPrize("Productivity Badge + 200 pts");
    setNewDaysLeft(30);
    setShowCreateModal(true);
  };

  const handleCreateChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error("Please enter a challenge title");
      return;
    }
    if (!newCategory.trim()) {
      toast.error("Please select or enter a category");
      return;
    }
    if (!newPrize.trim()) {
      toast.error("Please enter a prize/reward");
      return;
    }

    const newChallenge = {
      id: `ch-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory.trim(),
      participants: 1,
      daysLeft: Number(newDaysLeft) || 30,
      progress: 0,
      joined: true,
      prize: newPrize.trim()
    };

    setList(prev => [newChallenge, ...prev]);
    setShowCreateModal(false);
    toast.success(`Challenge "${newTitle}" created and joined! `);
  };

  const myJoined = list.filter(c => c.joined);
  const available = list.filter(c => !c.joined);
  const completedCount = 8 + list.filter(c => c.joined && c.progress >= 100).length;

  const filtered = filter === "joined" ? myJoined : filter === "available" ? available : list;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Challenges</h1>
          <p className="text-slate-500 text-sm mt-1">Personal and group challenges to push your limits</p>
        </div>
        <button onClick={handleCreateChallenge} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Create Challenge
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Challenges", value: myJoined.length, icon: Trophy, color: "text-primary-600 bg-primary-50" },
          { label: "Completed", value: completedCount, icon: CheckCircle, color: "text-green-600 bg-green-50" },
          { label: "Points Earned", value: "2,840", icon: Award, color: "text-amber-600 bg-amber-50" },
          { label: "Available", value: available.length, icon: PlusCircle, color: "text-blue-600 bg-blue-50" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
              <p className={`text-2xl font-bold font-display ${kpi.color.split(" ")[0]}`}>{kpi.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.color.split(" ")[1]}`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color.split(" ")[0]}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "joined", "available"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 capitalize ${filter === f ? "bg-primary-600 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
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
                {["Challenge", "Category", "Participants", "Days Left", "Progress", "Prize", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      {c.joined ? (
                        <Unlock className="w-4 h-4 text-emerald-500 flex-shrink-0 animate-pulse" />
                      ) : (
                        <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      )}
                      <span className="text-sm font-semibold text-slate-900">{c.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{c.category}</span></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600 font-medium">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> {c.participants.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {c.daysLeft} days
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {c.joined ? (
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-200 rounded-full flex-shrink-0">
                          <div className="h-full bg-primary-600 rounded-full transition-all duration-300" style={{ width: `${c.progress}%` }} />
                        </div>
                        <span className="text-xs text-slate-500 font-bold">{c.progress}%</span>
                      </div>
                    ) : <span className="text-xs text-slate-400">—</span>}
                  </td>
                  <td className="px-6 py-4 text-xs text-amber-700 font-semibold">{c.prize}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.joined ? "bg-primary-100 text-primary-700" : "bg-slate-100 text-slate-600"}`}>
                      {c.joined ? "Joined" : "Available"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {!c.joined ? (
                      <button
                        onClick={() => handleJoin(c.id)}
                        className="text-xs font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 px-3.5 py-2 rounded-xl transition-all"
                      >
                        Join Now
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleProgressIncrement(c.id)}
                          className="text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-xl transition-all"
                          title="Complete daily target (+10%)"
                        >
                          +10%
                        </button>
                        <button
                          onClick={() => handleLeave(c.id)}
                          className="text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-xl transition-all"
                        >
                          Leave
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Challenge Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary-600" />
                <h3 className="font-bold text-lg text-slate-900">Create New Challenge</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateChallengeSubmit}>
              <div className="p-6 space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Challenge Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Read 4 Books in 30 Days"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary-400 focus:bg-white transition-all text-slate-900 animate-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                    <div className="relative">
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary-400 focus:bg-white transition-all text-slate-900 cursor-pointer"
                      >
                        <option value="Productivity">Productivity</option>
                        <option value="Wellness">Wellness</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Finance">Finance</option>
                        <option value="Learning">Learning</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Duration (Days)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={365}
                      value={newDaysLeft}
                      onChange={(e) => setNewDaysLeft(Number(e.target.value))}
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary-400 focus:bg-white transition-all text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Reward / Prize</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Productivity Legend Badge"
                    value={newPrize}
                    onChange={(e) => setNewPrize(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary-400 focus:bg-white transition-all text-slate-900"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-glow-purple flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Create Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
