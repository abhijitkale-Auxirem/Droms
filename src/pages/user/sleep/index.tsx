import { useState } from "react";
import { Moon, Plus, TrendingUp, MoreVertical } from "lucide-react";
import { toast } from "sonner";

const sleepLog = [
  { date: "Jan 15", bedtime: "10:45 PM", wakeTime: "6:30 AM", duration: "7h 45m", quality: "Good", deepSleep: "1h 52m", remSleep: "2h 10m", score: 82, notes: "No phone after 9pm" },
  { date: "Jan 14", bedtime: "11:30 PM", wakeTime: "7:00 AM", duration: "7h 30m", quality: "Good", deepSleep: "1h 40m", remSleep: "1h 58m", score: 78, notes: "Late meeting" },
  { date: "Jan 13", bedtime: "10:15 PM", wakeTime: "6:15 AM", duration: "8h 0m", quality: "Excellent", deepSleep: "2h 10m", remSleep: "2h 25m", score: 91, notes: "Perfect sleep hygiene day" },
  { date: "Jan 12", bedtime: "12:00 AM", wakeTime: "7:30 AM", duration: "7h 30m", quality: "Average", deepSleep: "1h 20m", remSleep: "1h 45m", score: 68, notes: "Stayed up coding" },
  { date: "Jan 11", bedtime: "10:30 PM", wakeTime: "6:30 AM", duration: "8h 0m", quality: "Excellent", deepSleep: "2h 05m", remSleep: "2h 20m", score: 89, notes: "Great recovery after workout" },
  { date: "Jan 10", bedtime: "11:00 PM", wakeTime: "6:45 AM", duration: "7h 45m", quality: "Good", deepSleep: "1h 48m", remSleep: "2h 05m", score: 80, notes: "" },
  { date: "Jan 9", bedtime: "10:45 PM", wakeTime: "6:30 AM", duration: "7h 45m", quality: "Good", deepSleep: "1h 55m", remSleep: "2h 12m", score: 83, notes: "" },
];

const qualityColors: Record<string, string> = {
  Excellent: "bg-green-100 text-green-700",
  Good: "bg-blue-100 text-blue-700",
  Average: "bg-yellow-100 text-yellow-700",
  Poor: "bg-red-100 text-red-700",
};

const avgScore = Math.round(sleepLog.reduce((s, l) => s + l.score, 0) / sleepLog.length);
const avgDuration = "7h 45m";

export default function SleepPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Sleep Tracker</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor sleep quality and optimize your recovery</p>
        </div>
        <button onClick={() => toast.success("Sleep entry logged!")} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Log Sleep
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "7-Day Avg Score", value: avgScore, suffix: "/100", color: avgScore >= 80 ? "text-green-600" : "text-yellow-600" },
          { label: "Avg Duration", value: avgDuration, suffix: "", color: "text-primary-600" },
          { label: "Sleep Goal", value: "8h 0m", suffix: "", color: "text-blue-600" },
          { label: "Nights Tracked", value: sleepLog.length, suffix: " days", color: "text-slate-700" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
            <p className={`text-xl font-bold font-display ${kpi.color}`}>{kpi.value}{kpi.suffix}</p>
          </div>
        ))}
      </div>

      {/* Sleep Score Bars */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Weekly Sleep Score Overview</h3>
        <div className="flex items-end gap-3 h-32">
          {sleepLog.map(l => (
            <div key={l.date} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-slate-700">{l.score}</span>
              <div className="w-full rounded-t-lg bg-primary-600/20 relative" style={{ height: `${(l.score / 100) * 96}px` }}>
                <div className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-primary-600 transition-all" style={{ height: `${(l.score / 100) * 96}px` }} />
              </div>
              <span className="text-xs text-slate-400">{l.date.split(" ")[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["Date", "Bedtime", "Wake Time", "Duration", "Score", "Deep Sleep", "REM Sleep", "Quality", "Notes", ""].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sleepLog.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
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
                  <td className="px-5 py-4">
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
