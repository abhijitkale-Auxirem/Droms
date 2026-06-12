import { useState } from "react";
import { Clock, Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const routines = {
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
    title: "Work Routine", emoji: "💼", completionRate: 75,
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
    title: "Fitness Routine", emoji: "🏃", completionRate: 85,
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

type RoutineKey = keyof typeof routines;

export default function RoutinesPage() {
  const [active, setActive] = useState<RoutineKey>("morning");
  const [tasks, setTasks] = useState(routines);

  const toggleTask = (routineKey: RoutineKey, taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [routineKey]: {
        ...prev[routineKey],
        tasks: prev[routineKey].tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t),
      },
    }));
    toast.success("Task updated!");
  };

  const current = tasks[active];
  const completedCount = current.tasks.filter(t => t.completed).length;
  const totalDuration = current.tasks.reduce((a, t) => a + t.duration, 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
          <Clock className="w-6 h-6 text-primary-600" /> Routines
        </h1>
        <p className="text-slate-500 mt-0.5">Build and track your daily and weekly routines</p>
      </div>

      {/* Routine Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.entries(routines) as [RoutineKey, typeof routines[RoutineKey]][]).map(([key, r]) => (
          <button key={key} onClick={() => setActive(key)}
            className={cn("p-4 rounded-2xl border-2 text-left transition-all",
              active === key ? "border-primary-500 bg-primary-50" : "border-slate-200 bg-white hover:border-primary-200"
            )}>
            <div className="text-2xl mb-1">{r.emoji}</div>
            <p className={cn("text-sm font-semibold", active === key ? "text-primary-700" : "text-slate-800")}>{r.title}</p>
            <p className="text-xs text-slate-400 mt-0.5">{r.completionRate}% avg</p>
          </button>
        ))}
      </div>

      {/* Current Routine */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-primary-50 to-blue-50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{current.emoji}</span>
            <div>
              <h2 className="font-semibold text-slate-900">{current.title}</h2>
              <p className="text-xs text-slate-500">{completedCount}/{current.tasks.length} tasks completed • {totalDuration} min total</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold font-display text-primary-600">{Math.round(completedCount / current.tasks.length * 100)}%</p>
            <p className="text-xs text-slate-500">complete</p>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {current.tasks.map(task => (
            <div key={task.id}
              onClick={() => toggleTask(active, task.id)}
              className={cn("flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-slate-50 transition-colors",
                task.completed && "opacity-60"
              )}>
              <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                task.completed ? "bg-green-500 border-green-500" : "border-slate-300 hover:border-primary-400"
              )}>
                {task.completed && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
              <div className="flex-1">
                <p className={cn("font-medium text-sm", task.completed ? "text-slate-500 line-through" : "text-slate-800")}>{task.title}</p>
                <p className="text-xs text-slate-400">{task.time} {task.duration > 0 ? `• ${task.duration} min` : ""}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
