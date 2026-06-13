import { useState, useEffect } from "react";
import { Brain, Play, Clock, X, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

const initialMeditationSessions = [
  { id: "m1", type: "Mindfulness", name: "Morning Clarity Meditation", duration: "20 min", guide: "Dr. Sarah Chen", streak: 42, sessionsCompleted: 86, status: "active", lastSession: "2026-06-13" },
  { id: "m2", type: "Breathwork", name: "Box Breathing for Focus", duration: "10 min", guide: "Marcus Lee", streak: 28, sessionsCompleted: 45, status: "active", lastSession: "2026-06-13" },
  { id: "m3", type: "Body Scan", name: "Evening Wind-Down", duration: "15 min", guide: "Dr. Amy Johnson", streak: 14, sessionsCompleted: 22, status: "active", lastSession: "2026-06-12" },
  { id: "m4", type: "Visualization", name: "Goal Achievement Visualization", duration: "12 min", guide: "Tony Sears", streak: 7, sessionsCompleted: 12, status: "active", lastSession: "2026-06-11" },
  { id: "m5", type: "Loving Kindness", name: "Compassion Practice", duration: "18 min", guide: "Dr. Priya Sharma", streak: 0, sessionsCompleted: 5, status: "paused", lastSession: "2026-06-08" },
  { id: "m6", type: "NSDR", name: "Non-Sleep Deep Rest Protocol", duration: "20 min", guide: "Dr. Andrew Lee", streak: 19, sessionsCompleted: 38, status: "active", lastSession: "2026-06-13" },
];

const initialRecentLog = [
  { id: "l1", date: "Jun 13, 2026", sessions: 3, totalMinutes: 50, mood: "Excellent", notes: "Morning and evening sessions completed" },
  { id: "l2", date: "Jun 12, 2026", sessions: 2, totalMinutes: 32, mood: "Good", notes: "Focused on breathwork before presentation" },
  { id: "l3", date: "Jun 11, 2026", sessions: 2, totalMinutes: 35, mood: "Good", notes: "Visualization for startup pitch" },
  { id: "l4", date: "Jun 10, 2026", sessions: 3, totalMinutes: 48, mood: "Excellent", notes: "Full morning routine completed" },
  { id: "l5", date: "Jun 09, 2026", sessions: 1, totalMinutes: 20, mood: "Average", notes: "Only morning session, busy day" },
];

const moodColors: Record<string, string> = {
  Excellent: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
  Average: "bg-yellow-100 text-yellow-700",
  Poor: "bg-red-100 text-red-700",
};

export default function MeditationPage() {
  const [tab, setTab] = useState<"programs" | "log">("programs");
  const [programs, setPrograms] = useState<typeof initialMeditationSessions>(() => {
    const cached = localStorage.getItem("droms_meditation_programs");
    return cached ? JSON.parse(cached) : initialMeditationSessions;
  });
  const [logs, setLogs] = useState<typeof initialRecentLog>(() => {
    const cached = localStorage.getItem("droms_meditation_log");
    return cached ? JSON.parse(cached) : initialRecentLog;
  });

  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);

  // Form states
  const [programForm, setProgramForm] = useState({ name: "", type: "Mindfulness", guide: "", duration: "15 min" });
  const [logForm, setLogForm] = useState({ date: "", sessions: 1, totalMinutes: 15, mood: "Excellent", notes: "" });

  useEffect(() => {
    localStorage.setItem("droms_meditation_programs", JSON.stringify(programs));
  }, [programs]);

  useEffect(() => {
    localStorage.setItem("droms_meditation_log", JSON.stringify(logs));
  }, [logs]);

  const handleCreateProgram = () => {
    if (!programForm.name || !programForm.guide) { toast.error("Fill required fields"); return; }
    const newProg = {
      id: `m-${Date.now()}`,
      name: programForm.name,
      type: programForm.type,
      guide: programForm.guide,
      duration: programForm.duration,
      streak: 0,
      sessionsCompleted: 0,
      status: "active",
      lastSession: "Never"
    };
    setPrograms(prev => [newProg, ...prev]);
    toast.success("Meditation program added!");
    setShowProgramModal(false);
    setProgramForm({ name: "", type: "Mindfulness", guide: "", duration: "15 min" });
  };

  const handleCreateLog = () => {
    const dateStr = logForm.date 
      ? new Date(logForm.date).toLocaleDateString([], { year: "numeric", month: "short", day: "2-digit" })
      : new Date().toLocaleDateString([], { year: "numeric", month: "short", day: "2-digit" });
    const newLog = {
      id: `l-${Date.now()}`,
      date: dateStr,
      sessions: logForm.sessions,
      totalMinutes: logForm.totalMinutes,
      mood: logForm.mood,
      notes: logForm.notes
    };
    setLogs(prev => [newLog, ...prev]);
    toast.success("Meditation session logged!");
    setShowLogModal(false);
    setLogForm({ date: "", sessions: 1, totalMinutes: 15, mood: "Excellent", notes: "" });
  };

  const handleDeleteProgram = (id: string) => {
    setPrograms(prev => prev.filter(p => p.id !== id));
    toast.success("Program deleted");
  };

  const handleDeleteLog = (id: string) => {
    setLogs(prev => prev.filter(l => l.id !== id));
    toast.success("Session log deleted");
  };

  const handleStartSession = (id: string) => {
    const todayStr = new Date().toISOString().split("T")[0];
    setPrograms(prev => prev.map(p => {
      if (p.id === id) {
        const alreadyDoneToday = p.lastSession === todayStr;
        const nextStreak = alreadyDoneToday ? p.streak : p.streak + 1;
        const nextCount = p.sessionsCompleted + 1;
        
        // Add log entry automatically
        const minutes = parseInt(p.duration) || 15;
        const dateFormatted = new Date().toLocaleDateString([], { year: "numeric", month: "short", day: "2-digit" });
        const autoLog = {
          id: `l-${Date.now()}`,
          date: dateFormatted,
          sessions: 1,
          totalMinutes: minutes,
          mood: "Excellent",
          notes: `Completed daily session of ${p.name}`
        };
        setLogs(l => [autoLog, ...l]);
        
        toast.success(`Completed session of ${p.name}! Streak: ${nextStreak} days 🧘`);
        return { ...p, streak: nextStreak, sessionsCompleted: nextCount, lastSession: todayStr };
      }
      return p;
    }));
  };

  const bestStreak = programs.length > 0 ? Math.max(...programs.map(p => p.streak)) : 0;
  const totalSessions = programs.reduce((s, m) => s + m.sessionsCompleted, 0);
  const totalMinutes = logs.reduce((s, l) => s + l.totalMinutes, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Meditation Center</h1>
          <p className="text-slate-500 text-sm mt-1">Mindfulness, breathwork, and meditation practice tracker</p>
        </div>
        {tab === "programs" ? (
          <button onClick={() => setShowProgramModal(true)} className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Add Program
          </button>
        ) : (
          <button onClick={() => setShowLogModal(true)} className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Log Session
          </button>
        )}
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Best Streak", value: `${bestStreak} days`, color: "text-orange-600" },
          { label: "Total Sessions", value: totalSessions, color: "text-primary-600" },
          { label: "Total Minutes", value: `${totalMinutes.toLocaleString()} min`, color: "text-blue-600" },
          { label: "Active Programs", value: programs.filter(m => m.status === "active").length, color: "text-green-600" },
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
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Program", "Type", "Guide", "Duration", "Streak", "Sessions", "Last Session", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {programs.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-slate-900">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-medium">{s.type}</span></td>
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
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleStartSession(s.id)}
                          className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg transition-colors font-medium">
                          <Play className="w-3 h-3" /> Play
                        </button>
                        <button onClick={() => handleDeleteProgram(s.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-650 transition-colors" title="Delete">
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
      )}

      {tab === "log" && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Date", "Sessions", "Total Minutes", "Mood", "Notes", "Actions"].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{log.date}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{log.sessions} session{log.sessions > 1 ? "s" : ""}</td>
                    <td className="px-6 py-4 text-sm font-bold text-primary-600">{log.totalMinutes} min</td>
                    <td className="px-6 py-4"><span className={`text-xs font-medium px-2.5 py-1 rounded-full ${moodColors[log.mood]}`}>{log.mood}</span></td>
                    <td className="px-6 py-4 text-sm text-slate-500">{log.notes}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDeleteLog(log.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-450 hover:text-red-650 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Program Modal */}
      {showProgramModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold font-display text-slate-900">Add Meditation Program</h2>
              <button onClick={() => setShowProgramModal(false)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Program Name *</label>
                <input value={programForm.name} onChange={e => setProgramForm({...programForm, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. Zen Mind Daily" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
                  <select value={programForm.type} onChange={e => setProgramForm({...programForm, type: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    <option>Mindfulness</option>
                    <option>Breathwork</option>
                    <option>Body Scan</option>
                    <option>Visualization</option>
                    <option>Loving Kindness</option>
                    <option>NSDR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Duration</label>
                  <select value={programForm.duration} onChange={e => setProgramForm({...programForm, duration: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    <option>5 min</option>
                    <option>10 min</option>
                    <option>12 min</option>
                    <option>15 min</option>
                    <option>20 min</option>
                    <option>30 min</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Guide / Instructor *</label>
                <input value={programForm.guide} onChange={e => setProgramForm({...programForm, guide: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. Dr. Sarah Chen" />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowProgramModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleCreateProgram} className="flex-1 btn-primary py-2.5">Add Program</button>
            </div>
          </div>
        </div>
      )}

      {/* Log Session Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold font-display text-slate-900">Log Meditation Session</h2>
              <button onClick={() => setShowLogModal(false)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
                <input type="date" value={logForm.date} onChange={e => setLogForm({...logForm, date: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Sessions Count</label>
                  <input type="number" value={logForm.sessions} onChange={e => setLogForm({...logForm, sessions: parseInt(e.target.value) || 1})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Total Minutes</label>
                  <input type="number" value={logForm.totalMinutes} onChange={e => setLogForm({...logForm, totalMinutes: parseInt(e.target.value) || 15})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mood After</label>
                <select value={logForm.mood} onChange={e => setLogForm({...logForm, mood: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Average</option>
                  <option>Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes</label>
                <textarea value={logForm.notes} onChange={e => setLogForm({...logForm, notes: e.target.value})} rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm resize-none" placeholder="Thoughts, sensations, insights..." />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowLogModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleCreateLog} className="flex-1 btn-primary py-2.5">Log Session</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
