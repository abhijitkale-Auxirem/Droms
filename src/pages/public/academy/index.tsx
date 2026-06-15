import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight, BookOpen, Award, Play, Users, Star, Clock } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const categories = [
  { name: "Leadership & Management", courses: 24, icon: "", color: "bg-purple-50 border-purple-200" },
  { name: "Financial Intelligence", courses: 18, icon: "", color: "bg-green-50 border-green-200" },
  { name: "Productivity Systems", courses: 31, icon: "", color: "bg-yellow-50 border-yellow-200" },
  { name: "Mindset & Psychology", courses: 22, icon: "", color: "bg-blue-50 border-blue-200" },
  { name: "Health & Wellness", courses: 16, icon: "", color: "bg-red-50 border-red-200" },
  { name: "Entrepreneurship", courses: 28, icon: "", color: "bg-orange-50 border-orange-200" },
];

const featuredCourses = [
  { title: "Deep Learning Specialization", instructor: "Dr. Andrew Liu", rating: 4.9, students: 12400, duration: "40 hrs", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=300&h=180&fit=crop" },
  { title: "Financial Independence Masterclass", instructor: "Sarah Ramsey", rating: 4.8, students: 9800, duration: "20 hrs", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=180&fit=crop" },
  { title: "Leadership & Influence", instructor: "John Maxwell Jr.", rating: 4.9, students: 15200, duration: "15 hrs", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=300&h=180&fit=crop" },
];

export default function AcademyPublicPage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleCourseClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard/courses");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
            <GraduationCap className="w-4 h-4 text-accent" /> Personal Growth Academy
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-6">
            Learn From the World's <span className="gradient-text-gold">Best Mentors</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed mb-8">
            139 courses. 80+ expert instructors. Every topic needed to transform your life — leadership, finance, productivity, mindset, health, and more. All connected to your personal goals.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-slate-300">
            <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-accent" /> 139 Courses</div>
            <div className="flex items-center gap-2"><Users className="w-4 h-4 text-accent" /> 82K+ Students</div>
            <div className="flex items-center gap-2"><Award className="w-4 h-4 text-accent" /> Verified Certificates</div>
          </div>
          <Link to="/register" className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-4">
            Explore Academy Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-4">Learning Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(cat => (
              <Link to="/register" key={cat.name} className={`flex items-center gap-4 p-5 rounded-2xl border-2 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${cat.color}`}>
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{cat.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{cat.courses} courses</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-4">Featured Courses</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <div 
                key={course.title} 
                onClick={handleCourseClick}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="relative">
                  <img src={course.img} alt={course.title} className="w-full h-44 object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary-600 ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 mb-1 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-slate-500 mb-3">{course.instructor}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-slate-700">{course.rating}</span>
                      <span className="text-slate-400">({course.students.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5" /> {course.duration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
