import { useState, useEffect } from "react";
import { mockCourses } from "@/data/mockData";
import { GraduationCap, Play, CheckCircle, Clock, X, ChevronRight, Volume2, Maximize, ArrowRight, Check, Sparkles } from "lucide-react";
import { getProgressColor, cn } from "@/lib/utils";
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

const categories = ["All", "Technology", "Finance", "Leadership", "Mindset", "Entrepreneurship", "Productivity"];

export default function AcademyPage() {
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [filter, setFilter] = useState("All");
  
  // Course Player states
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(30); // in percent

  // Load courses from LocalStorage
  useEffect(() => {
    const cached = localStorage.getItem("droms_academy_courses");
    if (cached) {
      setCoursesList(JSON.parse(cached));
    } else {
      setCoursesList(mockCourses as Course[]);
      localStorage.setItem("droms_academy_courses", JSON.stringify(mockCourses));
    }
  }, []);

  const saveCourses = (updated: Course[]) => {
    setCoursesList(updated);
    localStorage.setItem("droms_academy_courses", JSON.stringify(updated));
  };

  const activeCourse = coursesList.find(c => c.id === activeCourseId);

  // Triggered when clicking "Start" or "Continue"
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

  // Toggles the completion of a specific lesson index
  const toggleLessonComplete = (lessonIdx: number) => {
    if (!activeCourse) return;

    const updated = coursesList.map(c => {
      if (c.id === activeCourse.id) {
        let newCompleted = c.completedLessons;
        
        // If checking a lesson, increment completed lessons (cap at totalLessons)
        // Note: For simulation simplicity, we toggle and re-calculate progress
        const isCurrentlyCompleted = lessonIdx < c.completedLessons;
        
        if (isCurrentlyCompleted) {
          // Unchecking: reduce to that lesson level
          newCompleted = Math.max(0, lessonIdx);
        } else {
          // Checking: set completed lessons up to lessonIdx + 1
          newCompleted = Math.min(c.totalLessons, lessonIdx + 1);
        }

        const newProgress = Math.round((newCompleted / c.totalLessons) * 100);
        let newStatus: Course["status"] = "in-progress";
        if (newProgress === 100) {
          newStatus = "completed";
          toast.success(`Congratulations! You've completed "${c.title}"! 🎉`, { duration: 4000 });
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
      // Mark current lesson as completed if it wasn't already
      if (activeLessonIdx >= activeCourse.completedLessons) {
        toggleLessonComplete(activeLessonIdx);
      }
      setActiveLessonIdx(prev => prev + 1);
      setIsPlaying(true);
      setVideoProgress(0);
    } else {
      // Last lesson completed
      if (activeCourse.completedLessons < activeCourse.totalLessons) {
        toggleLessonComplete(activeLessonIdx);
      }
      toast.success("You have reached the end of this course!");
    }
  };

  const filtered = filter === "All" ? coursesList : coursesList.filter(c => c.category === filter);
  const completed = coursesList.filter(c => c.status === "completed").length;
  const inProgress = coursesList.filter(c => c.status === "in-progress").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary-600 animate-pulse" /> Learning Academy
        </h1>
        <p className="text-slate-500 mt-0.5">Courses and learning paths for personal growth</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Enrolled Courses", value: coursesList.length },
          { label: "In Progress", value: inProgress },
          { label: "Completed", value: completed },
          { label: "Learning Hours", value: "97h" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <p className="text-sm text-slate-500 font-medium">{s.label}</p>
            <p className="text-2xl font-bold font-display text-primary-600 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={cn("flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm",
              filter === cat ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-primary-300"
            )}>{cat}</button>
        ))}
      </div>

      {/* Courses List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h2 className="font-semibold text-slate-900">All Available Courses</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/10 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Instructor</th>
                <th className="px-6 py-3">Duration</th>
                <th className="px-6 py-3">Lessons</th>
                <th className="px-6 py-3 w-44">Progress</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map(course => (
                <tr key={course.id} className="hover:bg-slate-55/20 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    <div className="flex items-center gap-3">
                      <img src={course.thumbnail} alt={course.title} className="w-10 h-8 rounded-lg object-cover" />
                      <span className="font-semibold text-slate-850 max-w-xs truncate">{course.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{course.category}</span></td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{course.instructor}</td>
                  <td className="px-6 py-4 text-slate-500"><span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" />{course.duration}</span></td>
                  <td className="px-6 py-4 text-slate-550 font-bold">{course.completedLessons}/{course.totalLessons}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-300 ${getProgressColor(course.progress)}`} style={{ width: `${course.progress}%` }} />
                      </div>
                      <span className="text-xs text-slate-600 font-bold w-8">{course.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("status-badge text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded",
                      course.status === "completed" ? "bg-green-50 text-green-700 border border-green-200" :
                      course.status === "in-progress" ? "bg-blue-50 text-blue-750 border border-blue-200" : "bg-slate-50 text-slate-600 border border-slate-200"
                    )}>
                      {course.status === "completed" && <CheckCircle className="w-3.5 h-3.5 inline mr-1" />}
                      {course.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleStartContinue(course.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary-50 hover:bg-primary-100 text-primary-600 px-3 py-1.5 rounded-lg transition-colors"
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
                <div className="p-2.5 bg-primary-600 rounded-xl text-white"><GraduationCap className="w-5 h-5" /></div>
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
