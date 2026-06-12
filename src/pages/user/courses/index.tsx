import { useState } from "react";
import { Play, CheckCircle, Clock, BookOpen, Award, Search, Filter } from "lucide-react";
import { mockCourses } from "@/data/mockData";
import { getStatusColor } from "@/lib/utils";
import { toast } from "sonner";

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockCourses.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">My Courses</h1>
          <p className="text-slate-500 text-sm mt-1">Your enrolled courses and learning progress</p>
        </div>
        <button onClick={() => toast.info("Browse the full Academy to enroll in new courses")} className="btn-primary flex items-center gap-2 text-sm">
          <BookOpen className="w-4 h-4" /> Browse Academy
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Enrolled", value: mockCourses.length, icon: BookOpen, color: "text-blue-600" },
          { label: "In Progress", value: mockCourses.filter(c => c.status === "in-progress").length, icon: Play, color: "text-primary-600" },
          { label: "Completed", value: mockCourses.filter(c => c.status === "completed").length, icon: CheckCircle, color: "text-green-600" },
          { label: "Certificates", value: mockCourses.filter(c => c.status === "completed").length, icon: Award, color: "text-amber-600" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div>
              <p className="text-xs text-slate-500">{kpi.label}</p>
              <p className={`text-xl font-bold font-display ${kpi.color}`}>{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 bg-white" />
        </div>
        {["all", "in-progress", "completed", "not-started"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize ${filter === f ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
            {f === "all" ? "All" : f.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Course Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Course</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Category</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Instructor</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Progress</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Lessons</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Duration</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Status</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(course => (
                <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={course.thumbnail} alt={course.title} className="w-12 h-8 rounded-lg object-cover flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-900 max-w-[200px] line-clamp-1">{course.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{course.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{course.instructor}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-200 rounded-full flex-shrink-0">
                        <div className="h-full bg-primary-600 rounded-full" style={{ width: `${course.progress}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{course.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{course.completedLessons}/{course.totalLessons}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="w-3.5 h-3.5" /> {course.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(course.status)}`}>
                      {course.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => toast.success(`Continuing: ${course.title}`)}
                      className="flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors">
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
