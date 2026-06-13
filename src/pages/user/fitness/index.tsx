import { useState, useEffect } from "react";
import { Plus, Dumbbell, Calendar, Trash2, X } from "lucide-react";
import { toast } from "sonner";

const initialFitnessGoals = [
  { id: "f1", goal: "Run 5K in Under 25 Minutes", category: "Running", current: "28:30", target: "24:59", progress: 68, lastActivity: "2026-06-12", frequency: "5x/week", status: "in-progress" },
  { id: "f2", goal: "Bench Press 225 lbs", category: "Strength", current: "185 lbs", target: "225 lbs", progress: 82, lastActivity: "2026-06-13", frequency: "3x/week", status: "in-progress" },
  { id: "f3", goal: "Complete Full Marathon", category: "Endurance", current: "18 mi longest run", target: "26.2 mi", progress: 75, lastActivity: "2026-06-10", frequency: "4x/week", status: "on-track" },
  { id: "f4", goal: "10% Body Fat", category: "Body Composition", current: "16%", target: "10%", progress: 40, lastActivity: "2026-06-13", frequency: "Daily", status: "in-progress" },
  { id: "f5", goal: "100 Push-ups Non-Stop", category: "Calisthenics", current: "65 max", target: "100 push-ups", progress: 65, lastActivity: "2026-06-12", frequency: "Daily", status: "in-progress" },
  { id: "f6", goal: "Squat 300 lbs", category: "Strength", current: "245 lbs", target: "300 lbs", progress: 82, lastActivity: "2026-06-11", frequency: "2x/week", status: "on-track" },
];

const initialWorkoutLog = [
  { id: "l1", date: "Jun 13", workout: "Upper Body Strength", duration: "65 min", calories: 420, notes: "PR on bench press 190 lbs" },
  { id: "l2", date: "Jun 12", workout: "10K Run (Tempo)", duration: "52 min", calories: 580, notes: "Avg pace 5:12/km" },
  { id: "l3", date: "Jun 11", workout: "Lower Body + Core", duration: "70 min", calories: 390, notes: "Squats 245 lbs x5 reps" },
  { id: "l4", date: "Jun 10", workout: "Long Distance Run", duration: "2h 10min", calories: 1240, notes: "18 miles at easy pace" },
  { id: "l5", date: "Jun 09", workout: "Rest Day + Yoga", duration: "30 min", calories: 120, notes: "Active recovery" },
];

export default function FitnessPage() {
  const [tab, setTab] = useState<"goals" | "log">("goals");
  const [goals, setGoals] = useState<typeof initialFitnessGoals>(() => {
    const cached = localStorage.getItem("droms_fitness_goals");
    return cached ? JSON.parse(cached) : initialFitnessGoals;
  });
  const [logs, setLogs] = useState<typeof initialWorkoutLog>(() => {
    const cached = localStorage.getItem("droms_fitness_logs");
    return cached ? JSON.parse(cached) : initialWorkoutLog;
  });

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);

  // Form states
  const [goalForm, setGoalForm] = useState({ goal: "", category: "Running", current: "", target: "", frequency: "3x/week", progress: 0 });
  const [logForm, setLogForm] = useState({ workout: "", duration: "", calories: "", notes: "" });

  useEffect(() => {
    localStorage.setItem("droms_fitness_goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("droms_fitness_logs", JSON.stringify(logs));
  }, [logs]);

  const handleCreateGoal = () => {
    if (!goalForm.goal || !goalForm.target) { toast.error("Fill required fields"); return; }
    const newGoal = {
      id: `f-${Date.now()}`,
      goal: goalForm.goal,
      category: goalForm.category,
      current: goalForm.current || "0",
      target: goalForm.target,
      progress: goalForm.progress,
      lastActivity: new Date().toISOString().split("T")[0],
      frequency: goalForm.frequency,
      status: "in-progress"
    };
    setGoals(prev => [newGoal, ...prev]);
    toast.success("Fitness goal created! 🏋️");
    setShowGoalModal(false);
    setGoalForm({ goal: "", category: "Running", current: "", target: "", frequency: "3x/week", progress: 0 });
  };

  const handleCreateLog = () => {
    if (!logForm.workout || !logForm.duration) { toast.error("Fill required fields"); return; }
    const newLog = {
      id: `l-${Date.now()}`,
      date: new Date().toLocaleDateString([], { month: "short", day: "2-digit" }),
      workout: logForm.workout,
      duration: logForm.duration,
      calories: parseInt(logForm.calories) || 0,
      notes: logForm.notes
    };
    setLogs(prev => [newLog, ...prev]);
    toast.success("Workout logged successfully! 💪");
    setShowLogModal(false);
    setLogForm({ workout: "", duration: "", calories: "", notes: "" });
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    toast.success("Goal deleted");
  };

  const handleDeleteLog = (id: string) => {
    setLogs(prev => prev.filter(l => l.id !== id));
    toast.success("Workout log deleted");
  };

  const handleIncrementProgress = (id: string) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        const nextProgress = Math.min(100, g.progress + 10);
        const nextStatus = nextProgress === 100 ? "on-track" : g.status;
        toast.success(`Progress updated for: ${g.goal} (+10%)`);
        return { ...g, progress: nextProgress, status: nextStatus, lastActivity: new Date().toISOString().split("T")[0] };
      }
      return g;
    }));
  };

  const avgProgress = goals.length > 0 ? Math.round(goals.reduce((s, g) => s + g.progress, 0) / goals.length) : 0;
  const totalCalories = logs.slice(0, 5).reduce((s, l) => s + l.calories, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Fitness Hub</h1>
          <p className="text-slate-500 text-sm mt-1">Track athletic performance and body composition goals</p>
        </div>
        {tab === "goals" ? (
          <button onClick={() => setShowGoalModal(true)} className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Add Fitness Goal
          </button>
        ) : (
          <button onClick={() => setShowLogModal(true)} className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Log Workout
          </button>
        )}
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Goals", value: goals.length, color: "text-slate-900" },
          { label: "Logged Workouts", value: logs.length, color: "text-primary-600" },
          { label: "Recent Calories Burned", value: `${totalCalories.toLocaleString()} kcal`, color: "text-orange-600" },
          { label: "Avg Progress", value: `${avgProgress}%`, color: "text-green-600" },
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
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize ${tab === t ? "bg-primary-600 text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"}`}>
            {t === "goals" ? "Fitness Goals" : "Workout Log"}
          </button>
        ))}
      </div>

      {/* Goals Table */}
      {tab === "goals" && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Goal", "Category", "Current", "Target", "Progress", "Frequency", "Last Activity", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {goals.map(g => (
                  <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{g.goal}</td>
                    <td className="px-6 py-4"><span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full font-medium">{g.category}</span></td>
                    <td className="px-6 py-4 text-sm text-slate-700 font-medium">{g.current}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{g.target}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-200 rounded-full flex-shrink-0">
                          <div className="h-full bg-primary-600 rounded-full" style={{ width: `${g.progress}%` }} />
                        </div>
                        <span className="text-xs text-slate-500 font-bold">{g.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{g.frequency}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{g.lastActivity}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${g.status === "on-track" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                        {g.status === "on-track" ? "On Track" : "In Progress"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center gap-2">
                        {g.progress < 100 && (
                          <button onClick={() => handleIncrementProgress(g.id)}
                            className="text-xs px-2.5 py-1.5 rounded-xl font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                            +10%
                          </button>
                        )}
                        <button onClick={() => handleDeleteGoal(g.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-450 hover:text-red-650 transition-colors" title="Delete">
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

      {/* Workout Log */}
      {tab === "log" && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Date", "Workout", "Duration", "Calories", "Notes", "Actions"].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{log.date}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{log.workout}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{log.duration}</td>
                    <td className="px-6 py-4 text-sm text-orange-600 font-bold">{log.calories} kcal</td>
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

      {/* Add Fitness Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold font-display text-slate-900">Add Fitness Goal</h2>
              <button onClick={() => setShowGoalModal(false)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Goal Description *</label>
                <input value={goalForm.goal} onChange={e => setGoalForm({...goalForm, goal: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. Bench Press 225 lbs" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <select value={goalForm.category} onChange={e => setGoalForm({...goalForm, category: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    <option>Running</option>
                    <option>Strength</option>
                    <option>Endurance</option>
                    <option>Body Composition</option>
                    <option>Calisthenics</option>
                    <option>Flexibility</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Frequency</label>
                  <select value={goalForm.frequency} onChange={e => setGoalForm({...goalForm, frequency: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    <option>Daily</option>
                    <option>5x/week</option>
                    <option>4x/week</option>
                    <option>3x/week</option>
                    <option>2x/week</option>
                    <option>Weekly</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Value</label>
                  <input value={goalForm.current} onChange={e => setGoalForm({...goalForm, current: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 185 lbs" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Target Value *</label>
                  <input value={goalForm.target} onChange={e => setGoalForm({...goalForm, target: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 225 lbs" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Initial Progress ({goalForm.progress}%)</label>
                <input type="range" min="0" max="100" value={goalForm.progress} onChange={e => setGoalForm({...goalForm, progress: parseInt(e.target.value) || 0})}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowGoalModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleCreateGoal} className="flex-1 btn-primary py-2.5">Add Goal</button>
            </div>
          </div>
        </div>
      )}

      {/* Log Workout Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold font-display text-slate-900">Log Workout</h2>
              <button onClick={() => setShowLogModal(false)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Workout Name *</label>
                <input value={logForm.workout} onChange={e => setLogForm({...logForm, workout: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. Upper Body Strength" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Duration *</label>
                  <input value={logForm.duration} onChange={e => setLogForm({...logForm, duration: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 60 min" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Calories Burned (kcal)</label>
                  <input type="number" value={logForm.calories} onChange={e => setLogForm({...logForm, calories: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 450" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes</label>
                <textarea value={logForm.notes} onChange={e => setLogForm({...logForm, notes: e.target.value})} rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm resize-none" placeholder="How did it feel? Any PRs?" />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowLogModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleCreateLog} className="flex-1 btn-primary py-2.5">Log Workout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
