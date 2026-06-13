import { useState, useEffect } from "react";
import { Play, CheckCircle, Clock, BookOpen, Award, Search, Filter, X, ArrowRight, Check, Sparkles } from "lucide-react";
import { getStatusColor, cn } from "@/lib/utils";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  instructor: string;
  duration: string;
  status: "completed" | "in-progress" | "not-started";
  thumbnail: string;
}

export default function CoursesPage() {
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Course Player states
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(30);

  // Load from LocalStorage (sharing the same state with AcademyPage)
  useEffect(() => {
    const cached = localStorage.getItem("droms_academy_courses");
    if (cached) {
      setCoursesList(JSON.parse(cached));
    } else {
      // Import mockCourses if not present
      import("@/data/mockData").then(m => {
        setCoursesList(m.mockCourses as Course[]);
        localStorage.setItem("droms_academy_courses", JSON.stringify(m.mockCourses));
      });
    }
  }, []);

  const saveCourses = (updated: Course[]) => {
    setCoursesList(updated);
    localStorage.setItem("droms_academy_courses", JSON.stringify(updated));
  };

  const activeCourse = coursesList.find(c => c.id === activeCourseId);

  const handleStartContinue = (courseId: string) => {
    setActiveCourseId(courseId);
    setActiveLessonIdx(0);
    setIsPlaying(false);
    setVideoProgress(25);
    
    // Auto mark as in-progress if it was not started
    const updated = coursesList.map(c => {
      if (c.id === courseId && c.status === "not-started") {
        return { ...c, status: "in-progress" as const, progress: Math.max(c.progress, 5) };
      }
      return c;
    });
    saveCourses(updated);
  };

  const toggleLessonComplete = (lessonIdx: number) => {
    if (!activeCourse) return;

    const updated = coursesList.map(c => {
      if (c.id === activeCourse.id) {
        let newCompleted = c.completedLessons;
        const isCurrentlyCompleted = lessonIdx < c.completedLessons;
        
        if (isCurrentlyCompleted) {
          newCompleted = Math.max(0, lessonIdx);
        } else {
          newCompleted = Math.min(c.totalLessons, lessonIdx + 1);
        }

        const newProgress = Math.round((newCompleted / c.totalLessons) * 100);
        let newStatus: Course["status"] = "in-progress";
        if (newProgress === 100) {
          newStatus = "completed";
          toast.success(`Congratulations! You've completed "${c.title}"! 🎉`);
        } else if (newProgress === 0) {
          newStatus = "not-started";
        }

        return {
          ...c,
          completedLessons: newCompleted,
          progress: newProgress,
          status: newStatus
        };
      }
      return c;
    });

    saveCourses(updated);
    toast.success("Lesson progress updated!");
  };

  const handleNextLesson = () => {
    if (!activeCourse) return;
    if (activeLessonIdx < activeCourse.totalLessons - 1) {
      if (activeLessonIdx >= activeCourse.completedLessons) {
        toggleLessonComplete(activeLessonIdx);
      }
      setActiveLessonIdx(prev => prev + 1);
      setIsPlaying(true);
      setVideoProgress(0);
    } else {
      if (activeCourse.completedLessons < activeCourse.totalLessons) {
        toggleLessonComplete(activeLessonIdx);
      }
      toast.success("You have reached the end of this course!");
    }
  };

  const filtered = coursesList.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary-600" /> My Courses
          </h1>
          <p className="text-slate-500 text-sm mt-1">Your enrolled courses and learning progress</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Enrolled", value: coursesList.length, icon: BookOpen, color: "text-blue-600" },
          { label: "In Progress", value: coursesList.filter(c => c.status === "in-progress").length, icon: Play, color: "text-primary-600" },
          { label: "Completed", value: coursesList.filter(c => c.status === "completed").length, icon: CheckCircle, color: "text-green-600" },
          { label: "Certificates", value: coursesList.filter(c => c.status === "completed").length, icon: Award, color: "text-amber-600" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{kpi.label}</p>
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
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize ${filter === f ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"}`}>
            {f === "all" ? "All" : f.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Course Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/10 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Instructor</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Lessons</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map(course => (
                <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={course.thumbnail} alt={course.title} className="w-12 h-8 rounded-lg object-cover flex-shrink-0" />
                      <span className="text-sm font-semibold text-slate-900 max-w-[200px] line-clamp-1">{course.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{course.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{course.instructor}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-slate-200 rounded-full flex-shrink-0">
                        <div className="h-full bg-primary-600 rounded-full" style={{ width: `${course.progress}%` }} />
                      </div>
                      <span className="text-xs text-slate-600 font-bold">{course.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-bold">{course.completedLessons}/{course.totalLessons}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="w-3.5 h-3.5" /> {course.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusColor(course.status)}`}>
                      {course.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleStartContinue(course.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-750 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Play className="w-3 h-3 fill-current" /> {course.status === "not-started" ? "Start" : "Continue"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- IMMERSIVE INTERACTIVE COURSE PLAYER MODAL --- */}
      {activeCourseId && activeCourse && (
        <div className="fixed inset-0 bg-slate-950/95 z-[9999] flex flex-col items-center justify-center p-4 md:p-6 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden text-white shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-850 bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary-600 rounded-xl text-white"><BookOpen className="w-5 h-5" /></div>
                <div>
                  <h2 className="text-md font-bold truncate max-w-lg">{activeCourse.title}</h2>
                  <p className="text-xs text-slate-400">Instructor: {activeCourse.instructor} • {activeCourse.duration}</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveCourseId(null)}
                className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Pane */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* LEFT COLUMN: Simulated Video Player */}
              <div className="flex-1 bg-slate-955 flex flex-col justify-between p-6 border-r border-slate-850">
                <div className="flex-1 flex flex-col justify-center">
                  
                  {/* Mock Video Container */}
                  <div className="relative aspect-video w-full rounded-2xl bg-black overflow-hidden border border-slate-800 group shadow-lg flex items-center justify-center">
                    <img src={activeCourse.thumbnail} alt="" className="w-full h-full object-cover opacity-35 absolute inset-0 pointer-events-none" />
                    
                    {/* Simulated visualizer when playing */}
                    {isPlaying ? (
                      <div className="relative flex flex-col items-center space-y-4">
                        <div className="flex items-center gap-1.5 h-12">
                          <span className="w-1.5 bg-primary-500 rounded-full animate-bounce h-8" style={{ animationDelay: "0.1s" }} />
                          <span className="w-1.5 bg-primary-400 rounded-full animate-bounce h-12" style={{ animationDelay: "0.3s" }} />
                          <span className="w-1.5 bg-primary-500 rounded-full animate-bounce h-10" style={{ animationDelay: "0.5s" }} />
                          <span className="w-1.5 bg-primary-400 rounded-full animate-bounce h-6" style={{ animationDelay: "0.2s" }} />
                        </div>
                        <p className="text-xs text-primary-300 font-semibold tracking-wider uppercase animate-pulse">Playing Lesson {activeLessonIdx + 1} video...</p>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setIsPlaying(true)}
                        className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform hover:bg-primary-750 shadow-2xl relative z-10"
                      >
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </button>
                    )}

                    {/* Lesson Banner */}
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold">
                      Lesson {activeLessonIdx + 1} of {activeCourse.totalLessons}
                    </div>
                  </div>
                </div>

                {/* Video Controls Bar */}
                <div className="space-y-4 pt-4">
                  {/* Progress slider */}
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>02:45</span>
                    <div className="flex-1 bg-slate-800 h-1.5 rounded-full relative cursor-pointer">
                      <div className="absolute top-0 left-0 h-full bg-primary-500 rounded-full" style={{ width: `${videoProgress}%` }} />
                    </div>
                    <span>12:50</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="px-4 py-2 text-xs font-semibold bg-slate-850 hover:bg-slate-800 text-slate-200 rounded-xl transition-all"
                      >
                        {isPlaying ? "Pause" : "Play"}
                      </button>
                      <button 
                        onClick={() => toggleLessonComplete(activeLessonIdx)}
                        className={cn("px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5",
                          activeLessonIdx < activeCourse.completedLessons
                            ? "bg-green-600/10 border-green-500/20 text-green-400"
                            : "bg-primary-600 hover:bg-primary-700 text-white border-transparent"
                        )}
                      >
                        {activeLessonIdx < activeCourse.completedLessons ? <Check className="w-3.5 h-3.5" /> : null}
                        {activeLessonIdx < activeCourse.completedLessons ? "Lesson Completed" : "Mark as Completed"}
                      </button>
                    </div>

                    <button 
                      onClick={handleNextLesson}
                      className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-xl flex items-center gap-1"
                    >
                      Next Lesson <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Interactive Lessons Syllabus */}
              <div className="w-full md:w-80 bg-slate-950/20 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-850 bg-slate-900/30">
                  <h3 className="font-semibold text-sm">Course Syllabus</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-slate-850 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${activeCourse.progress}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-green-400">{activeCourse.progress}% Done</span>
                  </div>
                </div>

                {/* Lesson Index List */}
                <div className="flex-1 overflow-y-auto divide-y divide-slate-850 p-2 space-y-1">
                  {Array.from({ length: activeCourse.totalLessons }).map((_, idx) => {
                    const isCompleted = idx < activeCourse.completedLessons;
                    const isCurrent = idx === activeLessonIdx;
                    return (
                      <div 
                        key={idx}
                        onClick={() => {
                          setActiveLessonIdx(idx);
                          setIsPlaying(true);
                          setVideoProgress(0);
                        }}
                        className={cn("flex items-center gap-3 p-3 cursor-pointer rounded-xl transition-all",
                          isCurrent ? "bg-primary-700/20 border border-primary-500/30" : "hover:bg-slate-900/40 border border-transparent"
                        )}
                      >
                        {/* Checkbox trigger */}
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLessonComplete(idx);
                          }}
                          className={cn("w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all",
                            isCompleted ? "bg-green-500 border-green-500 text-white" : "border-slate-700 hover:border-slate-500"
                          )}
                        >
                          {isCompleted && <Check className="w-3 h-3" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className={cn("text-xs font-semibold truncate", isCompleted && "text-slate-400 line-through")}>
                            {idx === 0 ? "Introduction to Category" : `Module ${idx} - Topic Guide`}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Duration: 12:50 • Video Lesson</p>
                        </div>
                        {isCurrent && <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-ping" />}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
