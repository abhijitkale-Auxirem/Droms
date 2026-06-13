import { useState, useEffect } from "react";
import { Clock, Check, ChevronRight, Plus, Trash2, Edit2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface TaskItem {
  id: string;
  time: string;
  title: string;
  duration: number;
  completed: boolean;
}

interface RoutineGroup {
  title: string;
  emoji: string;
  completionRate: number;
  tasks: TaskItem[];
}

const defaultRoutines: Record<string, RoutineGroup> = {
  morning: {
    title: "Morning Routine", emoji: "🌅", completionRate: 90,
    tasks: [
      { id: "mr1", time: "5:30 AM", title: "Wake Up & Hydrate", duration: 5, completed: true },
      { id: "mr2", time: "5:35 AM", title: "Morning Stretch / Yoga", duration: 15, completed: true },
      { id: "mr3", time: "5:50 AM", title: "Meditation", duration: 20, completed: true },
      { id: "mr4", time: "6:10 AM", title: "Gratitude Journal", duration: 10, completed: false },
      { id: "mr5", time: "6:20 AM", title: "Cold Shower", duration: 5, completed: false },
      { id: "mr6", time: "6:25 AM", title: "Healthy Breakfast", duration: 15, completed: false },
      { id: "mr7", time: "6:40 AM", title: "Review Daily Goals", duration: 10, completed: false },
    ],
  },
  work: {
    title: "Work Routine", emoji: "💻", completionRate: 75,
    tasks: [
      { id: "wr1", time: "8:00 AM", title: "Deep Work Block #1", duration: 90, completed: true },
      { id: "wr2", time: "9:30 AM", title: "Email & Communications", duration: 30, completed: true },
      { id: "wr3", time: "10:00 AM", title: "Team Standup", duration: 15, completed: false },
      { id: "wr4", time: "10:15 AM", title: "Deep Work Block #2", duration: 90, completed: false },
      { id: "wr5", time: "12:00 PM", title: "Lunch Break (No Screens)", duration: 45, completed: false },
      { id: "wr6", time: "1:00 PM", title: "Project Work & Meetings", duration: 180, completed: false },
      { id: "wr7", time: "5:00 PM", title: "Day Review & Tomorrow Prep", duration: 20, completed: false },
    ],
  },
  fitness: {
    title: "Fitness Routine", emoji: "🏋️", completionRate: 85,
    tasks: [
      { id: "fr1", time: "6:00 AM", title: "Pre-workout Meal", duration: 10, completed: true },
      { id: "fr2", time: "6:30 AM", title: "Warmup & Dynamic Stretching", duration: 10, completed: true },
      { id: "fr3", time: "6:40 AM", title: "Run / Cardio", duration: 30, completed: true },
      { id: "fr4", time: "7:10 AM", title: "Strength Training", duration: 40, completed: false },
      { id: "fr5", time: "7:50 AM", title: "Cool Down & Stretching", duration: 10, completed: false },
      { id: "fr6", time: "8:00 AM", title: "Post-workout Protein Shake", duration: 5, completed: false },
    ],
  },
  night: {
    title: "Night Routine", emoji: "🌙", completionRate: 70,
    tasks: [
      { id: "nr1", time: "9:00 PM", title: "No More Screens", duration: 0, completed: false },
      { id: "nr2", time: "9:00 PM", title: "Reading (30 min)", duration: 30, completed: false },
      { id: "nr3", time: "9:30 PM", title: "Journal / Reflection", duration: 15, completed: false },
      { id: "nr4", time: "9:45 PM", title: "Tomorrow's Priorities", duration: 10, completed: false },
      { id: "nr5", time: "9:55 PM", title: "Sleep Prep (No Phone)", duration: 5, completed: false },
      { id: "nr6", time: "10:00 PM", title: "Sleep", duration: 480, completed: false },
    ],
  },
};

type RoutineKey = keyof typeof defaultRoutines;

export default function RoutinesPage() {
  const [active, setActive] = useState<RoutineKey>("morning");
  const [routinesList, setRoutinesList] = useState<Record<RoutineKey, RoutineGroup>>(defaultRoutines);
  
  // Modals & Form state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [form, setForm] = useState({ title: "", time: "", duration: 15 });

  useEffect(() => {
    const cached = localStorage.getItem("droms_routines_data");
    if (cached) {
      setRoutinesList(JSON.parse(cached));
    } else {
      setRoutinesList(defaultRoutines);
      localStorage.setItem("droms_routines_data", JSON.stringify(defaultRoutines));
    }
  }, []);

  const saveRoutines = (updated: Record<RoutineKey, RoutineGroup>) => {
    // Recompute completion rate dynamically for the updated routine
    const updatedRates = { ...updated };
    Object.keys(updatedRates).forEach(k => {
      const group = updatedRates[k as RoutineKey];
      if (group.tasks.length > 0) {
        const completed = group.tasks.filter(t => t.completed).length;
        group.completionRate = Math.round((completed / group.tasks.length) * 100);
      } else {
        group.completionRate = 0;
      }
    });

    setRoutinesList(updatedRates);
    localStorage.setItem("droms_routines_data", JSON.stringify(updatedRates));
  };

  const toggleTask = (routineKey: RoutineKey, taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...routinesList };
    updated[routineKey].tasks = updated[routineKey].tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    saveRoutines(updated);
    toast.success("Task updated!");
  };

  const handleOpenAdd = () => {
    setForm({ title: "", time: "6:00 AM", duration: 15 });
    setModalMode("add");
    setModalOpen(true);
  };

  const handleOpenEdit = (task: TaskItem, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setForm({ title: task.title, time: task.time, duration: task.duration });
    setModalMode("edit");
    setEditIndex(idx);
    setModalOpen(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const updated = { ...routinesList };
    if (modalMode === "add") {
      const newTask: TaskItem = {
        id: `t-${Date.now()}`,
        title: form.title,
        time: form.time,
        duration: Number(form.duration),
        completed: false
      };
      updated[active].tasks.push(newTask);
      toast.success(`Task "${form.title}" added to routine!`);
    } else {
      updated[active].tasks[editIndex] = {
        ...updated[active].tasks[editIndex],
        title: form.title,
        time: form.time,
        duration: Number(form.duration)
      };
      toast.success(`Task updated.`);
    }

    saveRoutines(updated);
    setModalOpen(false);
  };

  const handleDeleteTask = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...routinesList };
    const taskName = updated[active].tasks[idx].title;
    updated[active].tasks = updated[active].tasks.filter((_, i) => i !== idx);
    saveRoutines(updated);
    toast.success(`Task "${taskName}" deleted.`);
  };

  const current = routinesList[active] || { title: "", emoji: "", completionRate: 0, tasks: [] };
  const completedCount = current.tasks.filter(t => t.completed).length;
  const totalDuration = current.tasks.reduce((a, t) => a + t.duration, 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-primary-600 animate-pulse" /> Routines
          </h1>
          <p className="text-slate-500 mt-0.5">Build and track your daily and weekly routines</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      {/* Routine Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.entries(routinesList) as [RoutineKey, RoutineGroup][]).map(([key, r]) => (
          <button key={key} onClick={() => setActive(key)}
            className={cn("p-4 rounded-2xl border-2 text-left transition-all shadow-sm",
              active === key ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200" : "border-slate-200 bg-white hover:border-primary-200"
            )}>
            <div className="text-2xl mb-1">{r.emoji}</div>
            <p className={cn("text-sm font-semibold", active === key ? "text-primary-700" : "text-slate-800")}>{r.title}</p>
            <p className="text-xs text-slate-400 mt-0.5">{r.completionRate}% avg completion</p>
          </button>
        ))}
      </div>

      {/* Current Routine */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-primary-50 to-blue-50">
          <div>
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <span className="text-xl">{current.emoji}</span> {current.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">{completedCount}/{current.tasks.length} tasks completed • {totalDuration} min total</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold font-display text-primary-750">
              {current.tasks.length > 0 ? Math.round(completedCount / current.tasks.length * 100) : 0}%
            </p>
            <p className="text-[10px] uppercase font-bold text-slate-400">complete</p>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {current.tasks.map((task, idx) => (
            <div key={task.id}
              onClick={(e) => toggleTask(active, task.id, e)}
              className={cn("flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-slate-50/50 transition-colors",
                task.completed && "opacity-60"
              )}>
              <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                task.completed ? "bg-green-500 border-green-500 shadow-sm" : "border-slate-300 hover:border-primary-400"
              )}>
                {task.completed && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("font-semibold text-sm truncate", task.completed ? "text-slate-500 line-through" : "text-slate-800")}>{task.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{task.time} {task.duration > 0 ? `• ${task.duration} min` : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={(e) => handleOpenEdit(task, idx, e)}
                  className="p-1.5 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={(e) => handleDeleteTask(idx, e)}
                  className="p-1.5 text-slate-400 hover:text-red-650 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {current.tasks.length === 0 && (
            <div className="text-center py-12 text-slate-400 italic">No tasks set in this routine. Click "Add Task" to start!</div>
          )}
        </div>
      </div>

      {/* --- ADD / EDIT TASK MODAL --- */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {modalMode === "add" ? "Add Routine Task" : "Edit Routine Task"}
              </h3>
              <button 
                onClick={() => setModalOpen(false)} 
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Task Title</label>
                <input 
                  type="text" 
                  value={form.title} 
                  onChange={e => setForm({ ...form, title: e.target.value })} 
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white text-slate-800" 
                  placeholder="e.g. Read news, Brush teeth" 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Time Block</label>
                  <input 
                    type="text" 
                    value={form.time} 
                    onChange={e => setForm({ ...form, time: e.target.value })} 
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white text-slate-800" 
                    placeholder="e.g. 7:30 AM" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Duration (minutes)</label>
                  <input 
                    type="number" 
                    value={form.duration} 
                    onChange={e => setForm({ ...form, duration: parseInt(e.target.value) || 0 })} 
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white text-slate-800" 
                    placeholder="15" 
                    required 
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setModalOpen(false)} className="w-1/2 py-2.5 text-sm font-semibold border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-sm">Save Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
