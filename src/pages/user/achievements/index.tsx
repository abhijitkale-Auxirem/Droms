import { mockAchievements } from "@/data/mockData";
import { Award, Star, Zap, Trophy } from "lucide-react";
import { formatDate } from "@/lib/utils";

const locked = [
  { title: "Dream Crusher", description: "Complete 20 goals", icon: "🎯", points: 500, category: "Goals" },
  { title: "Wealth Builder", description: "Reach $100K net worth", icon: "💎", points: 1000, category: "Finance" },
  { title: "100-Day Champion", description: "Maintain 100-day streak", icon: "🏆", points: 1500, category: "Habits" },
  { title: "Community Leader", description: "Lead an accountability group", icon: "👑", points: 750, category: "Community" },
];

export default function AchievementsPage() {
  const totalPoints = mockAchievements.reduce((a, b) => a + b.points, 0);
  const level = Math.floor(totalPoints / 500) + 1;
  const levelProgress = (totalPoints % 500) / 500 * 100;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
          <Award className="w-6 h-6 text-primary-600" /> Achievements
        </h1>
        <p className="text-slate-500 mt-0.5">Your milestones and earned badges</p>
      </div>

      {/* Level Card */}
      <div className="bg-gradient-dark rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center shadow-glow-gold">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold font-display text-white">Level {level} Achiever</h2>
              <span className="bg-accent text-droms-dark text-xs font-bold px-2.5 py-0.5 rounded-full">PRO</span>
            </div>
            <p className="text-slate-400 text-sm mb-3">{totalPoints} total points • {mockAchievements.length} badges earned</p>
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>Level {level}</span>
                <span>{totalPoints % 500}/500 pts to Level {level + 1}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full">
                <div className="h-full bg-gradient-to-r from-accent to-orange-500 rounded-full transition-all duration-1000" style={{ width: `${levelProgress}%` }} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Star, value: totalPoints, label: "Total Points", color: "text-accent" },
              { icon: Award, value: mockAchievements.length, label: "Badges", color: "text-primary-400" },
              { icon: Zap, value: level, label: "Level", color: "text-green-400" },
            ].map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="text-center bg-white/10 rounded-xl p-3">
                <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
                <p className="text-white font-bold font-display">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Earned Badges */}
      <div>
        <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center"><span className="w-2.5 h-2.5 rounded-full bg-green-500 block" /></span>
          Earned Badges ({mockAchievements.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockAchievements.map(ach => (
            <div key={ach.id} className="bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-lg hover:border-primary-200 hover:-translate-y-0.5 transition-all text-center">
              <div className="text-4xl mb-3">{ach.icon}</div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1">{ach.title}</h3>
              <p className="text-xs text-slate-500 mb-2">{ach.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">{ach.category}</span>
                <span className="text-xs font-bold text-accent">+{ach.points}pts</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">{formatDate(ach.earnedAt)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Badges */}
      <div>
        <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center"><span className="w-2.5 h-2.5 rounded-full bg-slate-400 block" /></span>
          Upcoming Badges ({locked.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {locked.map(ach => (
            <div key={ach.title} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-center opacity-60">
              <div className="text-4xl mb-3 grayscale">{ach.icon}</div>
              <h3 className="font-semibold text-slate-600 text-sm mb-1">{ach.title}</h3>
              <p className="text-xs text-slate-400 mb-2">{ach.description}</p>
              <span className="text-xs font-bold text-slate-500">+{ach.points}pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
