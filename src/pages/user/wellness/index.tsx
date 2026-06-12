import { Heart, Activity, Moon, Apple, Brain } from "lucide-react";
import { getProgressColor } from "@/lib/utils";

const wellnessData = [
  { category: "Fitness", goals: [
    { title: "Run 50 miles/month", progress: 88, current: "44 mi", target: "50 mi", status: "on-track" },
    { title: "Strength Train 3x/week", progress: 75, current: "9 sessions", target: "12 sessions", status: "on-track" },
    { title: "Daily Steps 10k", progress: 72, current: "7,200 avg", target: "10,000", status: "at-risk" },
  ]},
  { category: "Nutrition", goals: [
    { title: "Eat 150g Protein Daily", progress: 85, current: "127g avg", target: "150g", status: "on-track" },
    { title: "Drink 3L Water Daily", progress: 80, current: "2.4L avg", target: "3L", status: "on-track" },
    { title: "5 Servings Vegetables", progress: 60, current: "3 avg", target: "5", status: "at-risk" },
  ]},
  { category: "Sleep", goals: [
    { title: "Sleep 7-8 Hours", progress: 78, current: "6.7h avg", target: "7.5h", status: "at-risk" },
    { title: "Consistent Sleep Time", progress: 65, current: "11:30pm avg", target: "10:30pm", status: "at-risk" },
  ]},
  { category: "Mental Wellness", goals: [
    { title: "Daily Meditation 20min", progress: 95, current: "18min avg", target: "20min", status: "on-track" },
    { title: "Stress Score < 30", progress: 70, current: "Score: 35", target: "Score: 30", status: "at-risk" },
  ]},
];

const icons = { Fitness: Activity, Nutrition: Apple, Sleep: Moon, "Mental Wellness": Brain };

export default function WellnessPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary-600" /> Wellness Center
        </h1>
        <p className="text-slate-500 mt-0.5">Holistic health and lifestyle management</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Wellness Score", value: "82/100", color: "text-green-600" },
          { label: "Active Goals", value: "9", color: "text-primary-600" },
          { label: "Avg Sleep", value: "6.7h", color: "text-blue-600" },
          { label: "Meditation Streak", value: "42d", color: "text-purple-600" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className={`text-2xl font-bold font-display mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {wellnessData.map(section => {
        const Icon = icons[section.category as keyof typeof icons] || Heart;
        return (
          <div key={section.category} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50">
              <Icon className="w-5 h-5 text-primary-600" />
              <h2 className="font-semibold text-slate-900">{section.category}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Goal</th>
                    <th>Current</th>
                    <th>Target</th>
                    <th className="w-44">Progress</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {section.goals.map(goal => (
                    <tr key={goal.title}>
                      <td className="font-medium text-slate-800">{goal.title}</td>
                      <td className="text-slate-700 font-medium">{goal.current}</td>
                      <td className="text-slate-500">{goal.target}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="progress-bar flex-1"><div className={`progress-fill ${getProgressColor(goal.progress)}`} style={{ width: `${goal.progress}%` }} /></div>
                          <span className="text-xs text-slate-500 w-8">{goal.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${goal.status === "on-track" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {goal.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
