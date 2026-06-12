import { useState } from "react";
import { Plus, Dumbbell, Calendar, TrendingUp, Target, MoreVertical, Search } from "lucide-react";
import { toast } from "sonner";

const fitnessGoals = [
  { id: "f1", goal: "Run 5K in Under 25 Minutes", category: "Running", current: "28:30", target: "24:59", progress: 68, lastActivity: "2025-01-14", frequency: "5x/week", status: "in-progress" },
  { id: "f2", goal: "Bench Press 225 lbs", category: "Strength", current: "185 lbs", target: "225 lbs", progress: 82, lastActivity: "2025-01-15", frequency: "3x/week", status: "in-progress" },
  { id: "f3", goal: "Complete Full Marathon", category: "Endurance", current: "18 mi longest run", target: "26.2 mi", progress: 75, lastActivity: "2025-01-12", frequency: "4x/week", status: "on-track" },
  { id: "f4", goal: "10% Body Fat", category: "Body Composition", current: "16%", target: "10%", progress: 40, lastActivity: "2025-01-15", frequency: "Daily", status: "in-progress" },
  { id: "f5", goal: "100 Push-ups Non-Stop", category: "Calisthenics", current: "65 max", target: "100 push-ups", progress: 65, lastActivity: "2025-01-14", frequency: "Daily", status: "in-progress" },
  { id: "f6", goal: "Squat 300 lbs", category: "Strength", current: "245 lbs", target: "300 lbs", progress: 82, lastActivity: "2025-01-13", frequency: "2x/week", status: "on-track" },
];

const workoutLog = [
  { date: "Jan 15", workout: "Upper Body Strength", duration: "65 min", calories: 420, notes: "PR on bench press 190 lbs" },
  { date: "Jan 14", workout: "10K Run (Tempo)", duration: "52 min", calories: 580, notes: "Avg pace 5:12/km" },
  { date: "Jan 13", workout: "Lower Body + Core", duration: "70 min", calories: 390, notes: "Squats 245 lbs x5 reps" },
  { date: "Jan 12", workout: "Long Distance Run", duration: "2h 10min", calories: 1240, notes: "18 miles at easy pace" },
  { date: "Jan 11", workout: "Rest Day + Yoga", duration: "30 min", calories: 120, notes: "Active recovery" },
];

export default function FitnessPage() {
  const [tab, setTab] = useState<"goals" | "log">("goals");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Fitness Goals</h1>
          <p className="text-slate-500 text-sm mt-1">Track athletic performance and body composition goals</p>
        </div>
        <button onClick={() => toast.success("Fitness goal added!")} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Fitness Goal
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Goals", value: fitnessGoals.length, color: "text-slate-900" },
          { label: "Workouts This Week", value: 5, color: "text-primary-600" },
          { label: "Weekly Calories", value: "2,750", color: "text-orange-600" },
          { label: "Avg Progress", value: `${Math.round(fitnessGoals.reduce((s, g) => s + g.progress, 0) / fitnessGoals.length)}%`, color: "text-green-600" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
            <p className={`text-xl font-bold font-display ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["goals", "log"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize ${tab === t ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
            {t === "goals" ? "Fitness Goals" : "Workout Log"}
          </button>
        ))}
      </div>

      {/* Goals Table */}
      {tab === "goals" && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Goal", "Category", "Current", "Target", "Progress", "Frequency", "Last Activity", "Status", ""].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fitnessGoals.map(g => (
                  <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{g.goal}</td>
                    <td className="px-6 py-4"><span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full">{g.category}</span></td>
                    <td className="px-6 py-4 text-sm text-slate-700 font-medium">{g.current}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{g.target}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-200 rounded-full flex-shrink-0">
                          <div className="h-full bg-primary-600 rounded-full" style={{ width: `${g.progress}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{g.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{g.frequency}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{g.lastActivity}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${g.status === "on-track" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                        {g.status === "on-track" ? "On Track" : "In Progress"}
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
      )}

      {/* Workout Log */}
      {tab === "log" && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Date", "Workout", "Duration", "Calories", "Notes", ""].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {workoutLog.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{log.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{log.workout}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{log.duration}</td>
                    <td className="px-6 py-4 text-sm text-orange-600 font-medium">{log.calories} kcal</td>
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
