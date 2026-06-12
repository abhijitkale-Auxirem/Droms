import { useState } from "react";
import { Brain, Play, Clock, Calendar, MoreVertical, Plus } from "lucide-react";
import { toast } from "sonner";

const meditationSessions = [
  { id: "m1", type: "Mindfulness", name: "Morning Clarity Meditation", duration: "20 min", guide: "Dr. Sarah Chen", streak: 42, sessionsCompleted: 86, status: "active", lastSession: "2025-01-15" },
  { id: "m2", type: "Breathwork", name: "Box Breathing for Focus", duration: "10 min", guide: "Marcus Lee", streak: 28, sessionsCompleted: 45, status: "active", lastSession: "2025-01-15" },
  { id: "m3", type: "Body Scan", name: "Evening Wind-Down", duration: "15 min", guide: "Dr. Amy Johnson", streak: 14, sessionsCompleted: 22, status: "active", lastSession: "2025-01-14" },
  { id: "m4", type: "Visualization", name: "Goal Achievement Visualization", duration: "12 min", guide: "Tony Sears", streak: 7, sessionsCompleted: 12, status: "active", lastSession: "2025-01-13" },
  { id: "m5", type: "Loving Kindness", name: "Compassion Practice", duration: "18 min", guide: "Dr. Priya Sharma", streak: 0, sessionsCompleted: 5, status: "paused", lastSession: "2025-01-08" },
  { id: "m6", type: "NSDR", name: "Non-Sleep Deep Rest Protocol", duration: "20 min", guide: "Dr. Andrew Lee", streak: 19, sessionsCompleted: 38, status: "active", lastSession: "2025-01-15" },
];

const recentLog = [
  { date: "Jan 15, 2025", sessions: 3, totalMinutes: 50, mood: "Excellent", notes: "Morning and evening sessions completed" },
  { date: "Jan 14, 2025", sessions: 2, totalMinutes: 32, mood: "Good", notes: "Focused on breathwork before presentation" },
  { date: "Jan 13, 2025", sessions: 2, totalMinutes: 35, mood: "Good", notes: "Visualization for startup pitch" },
  { date: "Jan 12, 2025", sessions: 3, totalMinutes: 48, mood: "Excellent", notes: "Full morning routine completed" },
  { date: "Jan 11, 2025", sessions: 1, totalMinutes: 20, mood: "Average", notes: "Only morning session, busy day" },
];

const moodColors: Record<string, string> = {
  Excellent: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
  Average: "bg-yellow-100 text-yellow-700",
  Poor: "bg-red-100 text-red-700",
};

export default function MeditationPage() {
  const [tab, setTab] = useState<"programs" | "log">("programs");
  const totalMinutes = 42 * 20;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Meditation Center</h1>
          <p className="text-slate-500 text-sm mt-1">Mindfulness, breathwork, and meditation practice tracker</p>
        </div>
        <button onClick={() => toast.success("Session logged!")} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Log Session
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Best Streak", value: "42 days", color: "text-orange-600" },
          { label: "Total Sessions", value: meditationSessions.reduce((s, m) => s + m.sessionsCompleted, 0), color: "text-primary-600" },
          { label: "Total Minutes", value: `${totalMinutes.toLocaleString()}`, color: "text-blue-600" },
          { label: "Active Programs", value: meditationSessions.filter(m => m.status === "active").length, color: "text-green-600" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
            <p className={`text-xl font-bold font-display ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["programs", "log"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === t ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
            {t === "programs" ? "Meditation Programs" : "Session Log"}
          </button>
        ))}
      </div>

      {tab === "programs" && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Program", "Type", "Guide", "Duration", "Streak", "Sessions", "Last Session", "Status", ""].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {meditationSessions.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-slate-900">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">{s.type}</span></td>
                    <td className="px-6 py-4 text-sm text-slate-600">{s.guide}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> {s.duration}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-orange-600">🔥 {s.streak}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{s.sessionsCompleted}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{s.lastSession}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => toast.success(`Starting: ${s.name}`)}
                        className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-2.5 py-1.5 rounded-lg transition-colors font-medium">
                        <Play className="w-3 h-3" /> Start
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "log" && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Date", "Sessions", "Total Minutes", "Mood", "Notes", ""].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLog.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{log.date}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{log.sessions} session{log.sessions > 1 ? "s" : ""}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary-600">{log.totalMinutes} min</td>
                    <td className="px-6 py-4"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${moodColors[log.mood]}`}>{log.mood}</span></td>
                    <td className="px-6 py-4 text-sm text-slate-500">{log.notes}</td>
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
      )}
    </div>
  );
}
