import { useState, useEffect } from "react";
import { Moon, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

const initialSleepLog = [
  { id: "s1", date: "Jun 13", bedtime: "10:45 PM", wakeTime: "6:30 AM", duration: "7h 45m", quality: "Good", deepSleep: "1h 52m", remSleep: "2h 10m", score: 82, notes: "No phone after 9pm" },
  { id: "s2", date: "Jun 12", bedtime: "11:30 PM", wakeTime: "7:00 AM", duration: "7h 30m", quality: "Good", deepSleep: "1h 40m", remSleep: "1h 58m", score: 78, notes: "Late meeting" },
  { id: "s3", date: "Jun 11", bedtime: "10:15 PM", wakeTime: "6:15 AM", duration: "8h 0m", quality: "Excellent", deepSleep: "2h 10m", remSleep: "2h 25m", score: 91, notes: "Perfect sleep hygiene day" },
  { id: "s4", date: "Jun 10", bedtime: "12:00 AM", wakeTime: "7:30 AM", duration: "7h 30m", quality: "Average", deepSleep: "1h 20m", remSleep: "1h 45m", score: 68, notes: "Stayed up coding" },
  { id: "s5", date: "Jun 09", bedtime: "10:30 PM", wakeTime: "6:30 AM", duration: "8h 0m", quality: "Excellent", deepSleep: "2h 05m", remSleep: "2h 20m", score: 89, notes: "Great recovery after workout" },
  { id: "s6", date: "Jun 08", bedtime: "11:00 PM", wakeTime: "6:45 AM", duration: "7h 45m", quality: "Good", deepSleep: "1h 48m", remSleep: "2h 05m", score: 80, notes: "" },
  { id: "s7", date: "Jun 07", bedtime: "10:45 PM", wakeTime: "6:30 AM", duration: "7h 45m", quality: "Good", deepSleep: "1h 55m", remSleep: "2h 12m", score: 83, notes: "" },
];

const qualityColors: Record<string, string> = {
  Excellent: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
  Average: "bg-yellow-100 text-yellow-700",
  Poor: "bg-red-100 text-red-700",
};

export default function SleepPage() {
  const [list, setList] = useState<typeof initialSleepLog>(() => {
    const cached = localStorage.getItem("droms_sleep_log");
    return cached ? JSON.parse(cached) : initialSleepLog;
  });
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [form, setForm] = useState({ date: "", bedtime: "10:30 PM", wakeTime: "6:30 AM", duration: "8h 0m", deepSleep: "2h 0m", remSleep: "2h 0m", score: 85, quality: "Good", notes: "" });

  useEffect(() => {
    localStorage.setItem("droms_sleep_log", JSON.stringify(list));
  }, [list]);

  const handleCreate = () => {
    if (!form.bedtime || !form.wakeTime || !form.duration) { toast.error("Fill required fields"); return; }
    const dateFormatted = form.date 
      ? new Date(form.date).toLocaleDateString([], { month: "short", day: "2-digit" })
      : new Date().toLocaleDateString([], { month: "short", day: "2-digit" });
    const newEntry = {
      id: `s-${Date.now()}`,
      date: dateFormatted,
      bedtime: form.bedtime,
      wakeTime: form.wakeTime,
      duration: form.duration,
      deepSleep: form.deepSleep || "—",
      remSleep: form.remSleep || "—",
      score: parseInt(form.score as any) || 80,
      quality: form.quality,
      notes: form.notes
    };
    setList(prev => [newEntry, ...prev]);
    toast.success("Sleep logged successfully! 🌌");
    setShowModal(false);
    setForm({ date: "", bedtime: "10:30 PM", wakeTime: "6:30 AM", duration: "8h 0m", deepSleep: "2h 0m", remSleep: "2h 0m", score: 85, quality: "Good", notes: "" });
  };

  const handleDelete = (id: string) => {
    setList(prev => prev.filter(s => s.id !== id));
    toast.success("Sleep entry deleted");
  };

  const avgScore = list.length > 0 ? Math.round(list.reduce((s, l) => s + l.score, 0) / list.length) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Sleep Hub</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor sleep quality and optimize your recovery</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Log Sleep
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "7-Day Avg Score", value: avgScore, suffix: "/100", color: avgScore >= 80 ? "text-green-600" : "text-yellow-600" },
          { label: "Avg Duration", value: "7h 45m", suffix: "", color: "text-primary-600" },
          { label: "Sleep Goal", value: "8h 0m", suffix: "", color: "text-blue-600" },
          { label: "Nights Tracked", value: list.length, suffix: " days", color: "text-slate-700" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
            <p className={`text-xl font-bold font-display ${kpi.color}`}>{kpi.value}{kpi.suffix}</p>
          </div>
        ))}
      </div>

      {/* Sleep Score Bars */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-semibold text-slate-900 mb-4">Weekly Sleep Score Overview</h3>
        <div className="flex items-end gap-3 h-32">
          {list.slice(0, 7).reverse().map(l => (
            <div key={l.id} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-slate-700">{l.score}</span>
              <div className="w-full rounded-t-lg bg-primary-600/20 relative" style={{ height: `${(l.score / 100) * 96}px` }}>
                <div className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-primary-600 transition-all" style={{ height: `${(l.score / 100) * 96}px` }} />
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{l.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["Date", "Bedtime", "Wake Time", "Duration", "Score", "Deep Sleep", "REM Sleep", "Quality", "Notes", "Actions"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-slate-700">{log.date}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{log.bedtime}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{log.wakeTime}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-primary-600">{log.duration}</td>
                  <td className="px-5 py-4">
                    <span className={`text-sm font-bold ${log.score >= 85 ? "text-green-600" : log.score >= 70 ? "text-blue-600" : "text-yellow-600"}`}>{log.score}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-indigo-600">{log.deepSleep}</td>
                  <td className="px-5 py-4 text-sm text-purple-600">{log.remSleep}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${qualityColors[log.quality]}`}>{log.quality}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-400 max-w-[150px] truncate">{log.notes || "—"}</td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => handleDelete(log.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-650 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Sleep Entry Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold font-display text-slate-900">Log Sleep Night</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
                <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Bedtime *</label>
                  <input value={form.bedtime} onChange={e => setForm({...form, bedtime: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 10:45 PM" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Wake Time *</label>
                  <input value={form.wakeTime} onChange={e => setForm({...form, wakeTime: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 6:30 AM" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Total Duration *</label>
                  <input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 7h 45m" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Sleep Score (1-100) *</label>
                  <input type="number" value={form.score} onChange={e => setForm({...form, score: parseInt(e.target.value) || 80})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="85" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Deep Sleep Duration</label>
                  <input value={form.deepSleep} onChange={e => setForm({...form, deepSleep: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 1h 50m" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">REM Sleep Duration</label>
                  <input value={form.remSleep} onChange={e => setForm({...form, remSleep: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 2h 10m" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Sleep Quality</label>
                  <select value={form.quality} onChange={e => setForm({...form, quality: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Average</option>
                    <option>Poor</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes</label>
                <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm resize-none" placeholder="e.g. No phone after 9pm" />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleCreate} className="flex-1 btn-primary py-2.5">Log Sleep</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
