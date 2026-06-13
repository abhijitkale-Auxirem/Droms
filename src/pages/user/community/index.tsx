import { useState, useEffect } from "react";
import { communityGroups, challenges as mockChallenges } from "@/data/mockData";
import { Users, Trophy, MessageSquare, UserPlus, UserCheck } from "lucide-react";
import { cn, getProgressColor } from "@/lib/utils";
import { toast } from "sonner";

export default function CommunityPage() {
  const [groups, setGroups] = useState(() => {
    const cached = localStorage.getItem("droms_community_groups");
    return cached ? JSON.parse(cached) : communityGroups;
  });

  const [challengesList, setChallengesList] = useState(() => {
    const cached = localStorage.getItem("droms_challenges_data");
    return cached ? JSON.parse(cached) : mockChallenges;
  });

  const [activeTab, setActiveTab] = useState<"groups" | "challenges">("groups");

  useEffect(() => {
    localStorage.setItem("droms_community_groups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem("droms_challenges_data", JSON.stringify(challengesList));
  }, [challengesList]);

  const toggleJoin = (id: string) => {
    setGroups(prev => prev.map(g => {
      if (g.id === id) {
        toast.success(g.joined ? "Left group" : "Joined group! Welcome! 🎉");
        return { ...g, joined: !g.joined, members: g.joined ? g.members - 1 : g.members + 1 };
      }
      return g;
    }));
  };

  const toggleJoinChallenge = (id: string) => {
    setChallengesList(prev => prev.map(ch => {
      if (ch.id === id) {
        const nextJoined = !ch.joined;
        toast.success(nextJoined ? `Joined challenge: ${ch.title}! 🏆` : `Left challenge: ${ch.title}`);
        return { 
          ...ch, 
          joined: nextJoined, 
          participants: nextJoined ? ch.participants + 1 : Math.max(0, ch.participants - 1) 
        };
      }
      return ch;
    }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-primary-600" /> Community
        </h1>
        <p className="text-slate-500 mt-0.5">Grow together with accountability partners and mentors</p>
      </div>

      <div className="flex gap-2">
        {[{ id: "groups", label: "Accountability Groups", icon: Users }, { id: "challenges", label: "Challenges", icon: Trophy }].map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id as "groups" | "challenges")}
            className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
              activeTab === id ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-primary-300"
            )}>
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {activeTab === "groups" && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Group</th>
                  <th>Category</th>
                  <th>Members</th>
                  <th>Activity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {groups.map(g => (
                  <tr key={g.id}>
                    <td className="font-medium text-slate-800">{g.name}</td>
                    <td><span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{g.category}</span></td>
                    <td className="text-slate-600">{g.members.toLocaleString()}</td>
                    <td>
                      <span className={cn("status-badge", g.activity === "Very Active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700")}>
                        {g.activity}
                      </span>
                    </td>
                    <td>
                      {g.joined ? (
                        <span className="flex items-center gap-1 text-xs text-green-600 font-medium"><UserCheck className="w-3.5 h-3.5" /> Joined</span>
                      ) : (
                        <span className="text-xs text-slate-400">Not joined</span>
                      )}
                    </td>
                    <td>
                      <button onClick={() => toggleJoin(g.id)}
                        className={cn("flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors",
                          g.joined ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-primary-50 text-primary-600 hover:bg-primary-100"
                        )}>
                        {g.joined ? <><UserCheck className="w-3 h-3" /> Leave</> : <><UserPlus className="w-3 h-3" /> Join</>}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "challenges" && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Challenge</th>
                  <th>Category</th>
                  <th>Participants</th>
                  <th>Days Left</th>
                  <th className="w-40">Progress</th>
                  <th>Prize</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {challengesList.map(ch => (
                  <tr key={ch.id}>
                    <td className="font-medium text-slate-800">{ch.title}</td>
                    <td><span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{ch.category}</span></td>
                    <td className="text-slate-600">{ch.participants.toLocaleString()}</td>
                    <td className="text-slate-600">{ch.daysLeft}d</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar flex-1"><div className={`progress-fill ${getProgressColor(ch.progress)}`} style={{ width: `${ch.progress}%` }} /></div>
                        <span className="text-xs text-slate-500 w-8">{ch.progress}%</span>
                      </div>
                    </td>
                    <td className="text-xs text-amber-600 font-medium">{ch.prize}</td>
                    <td>
                      <button onClick={() => toggleJoinChallenge(ch.id)}
                        className={cn("text-xs px-3 py-1.5 rounded-lg font-medium transition-colors",
                          ch.joined ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-primary-50 text-primary-600 hover:bg-primary-100"
                        )}>
                        {ch.joined ? "Leave" : "Join"}
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
