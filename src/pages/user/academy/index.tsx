import { useState } from "react";
import { mockCourses } from "@/data/mockData";
import { GraduationCap, Play, CheckCircle, Clock, User } from "lucide-react";
import { getProgressColor, cn } from "@/lib/utils";
import { toast } from "sonner";

const categories = ["All", "Technology", "Finance", "Leadership", "Mindset", "Entrepreneurship", "Productivity"];

export default function AcademyPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? mockCourses : mockCourses.filter(c => c.category === filter);
  const completed = mockCourses.filter(c => c.status === "completed").length;
  const inProgress = mockCourses.filter(c => c.status === "in-progress").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary-600" /> Learning Academy
        </h1>
        <p className="text-slate-500 mt-0.5">Courses and learning paths for personal growth</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Enrolled Courses", value: mockCourses.length },
          { label: "In Progress", value: inProgress },
          { label: "Completed", value: completed },
          { label: "Learning Hours", value: "97h" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-500">{s.label}</p>
            <p className="text-2xl font-bold font-display text-primary-600 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={cn("flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all",
              filter === cat ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-primary-300"
            )}>{cat}</button>
        ))}
      </div>

      {/* Table view for in-progress */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">All Courses</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Category</th>
                <th>Instructor</th>
                <th>Duration</th>
                <th>Lessons</th>
                <th className="w-44">Progress</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(course => (
                <tr key={course.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={course.thumbnail} alt={course.title} className="w-10 h-8 rounded-lg object-cover" />
                      <span className="font-medium text-slate-800 max-w-xs truncate">{course.title}</span>
                    </div>
                  </td>
                  <td><span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{course.category}</span></td>
                  <td className="text-sm text-slate-600">{course.instructor}</td>
                  <td className="text-sm text-slate-600 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" />{course.duration}</td>
                  <td className="text-sm text-slate-600">{course.completedLessons}/{course.totalLessons}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar flex-1"><div className={`progress-fill ${getProgressColor(course.progress)}`} style={{ width: `${course.progress}%` }} /></div>
                      <span className="text-xs text-slate-500 w-8">{course.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={cn("status-badge",
                      course.status === "completed" ? "bg-green-100 text-green-700" :
                      course.status === "in-progress" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                    )}>
                      {course.status === "completed" && <CheckCircle className="w-3 h-3 inline mr-1" />}
                      {course.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => toast.success(`Continuing ${course.title}...`)}
                      className="flex items-center gap-1 text-xs bg-primary-50 text-primary-600 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-colors font-medium">
                      <Play className="w-3 h-3" /> {course.status === "not-started" ? "Start" : "Continue"}
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
