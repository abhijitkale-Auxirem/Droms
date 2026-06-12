import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";

const articles = [
  { title: "The Science Behind Habit Formation: What Neuroscience Teaches Us", category: "Habits", author: "Dr. Lisa Chen", date: "Jan 12, 2025", readTime: "8 min", img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=250&fit=crop" },
  { title: "How to Set Goals That Actually Motivate You (And Why SMART Isn't Enough)", category: "Goals", author: "Marcus Lee", date: "Jan 10, 2025", readTime: "6 min", img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop" },
  { title: "The Morning Routine of World-Class Achievers", category: "Productivity", author: "Sarah Kim", date: "Jan 8, 2025", readTime: "10 min", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop" },
  { title: "Financial Freedom at 35: A Complete Roadmap", category: "Finance", author: "David Park", date: "Jan 5, 2025", readTime: "12 min", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop" },
  { title: "Why Vision Boards Actually Work (The Psychology)", category: "Mindset", author: "Dr. Priya Sharma", date: "Jan 3, 2025", readTime: "7 min", img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=250&fit=crop" },
  { title: "Building an Accountability System That Works", category: "Community", author: "James Liu", date: "Dec 28, 2024", readTime: "9 min", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=250&fit=crop" },
];

const categoryColors: Record<string, string> = {
  Habits: "bg-orange-100 text-orange-700",
  Goals: "bg-purple-100 text-purple-700",
  Productivity: "bg-blue-100 text-blue-700",
  Finance: "bg-green-100 text-green-700",
  Mindset: "bg-pink-100 text-pink-700",
  Community: "bg-teal-100 text-teal-700",
};

export default function BlogPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
            <BookOpen className="w-4 h-4" /> Droms Blog
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-4">Insights for <span className="gradient-text">Achievers</span></h1>
          <p className="text-slate-300 text-xl">Research-backed articles on goals, habits, productivity, finance, and personal growth.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          {/* Featured */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-8">Featured Article</h2>
            <div className="grid lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden border-2 border-slate-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300">
              <img src={articles[0].img} alt={articles[0].title} className="w-full h-72 lg:h-auto object-cover" />
              <div className="p-8 flex flex-col justify-center">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-4 ${categoryColors[articles[0].category]}`}>{articles[0].category}</span>
                <h3 className="text-2xl font-bold font-display text-slate-900 mb-4 leading-tight">{articles[0].title}</h3>
                <p className="text-slate-500 mb-6">Discover the neurological mechanisms behind habit formation and how Droms leverages this science to help you build lasting change.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                      {articles[0].author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{articles[0].author}</p>
                      <p className="text-xs text-slate-400">{articles[0].date} · {articles[0].readTime} read</p>
                    </div>
                  </div>
                  <Link to="/register" className="btn-primary text-sm px-4 py-2 flex items-center gap-1.5">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* All Articles */}
          <div>
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.slice(1).map(article => (
                <div key={article.title} className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <img src={article.img} alt={article.title} className="w-full h-44 object-cover" />
                  <div className="p-5">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3 ${categoryColors[article.category] || "bg-slate-100 text-slate-600"}`}>{article.category}</span>
                    <h3 className="font-bold text-slate-900 mb-3 leading-tight line-clamp-2">{article.title}</h3>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{article.author}</span>
                      <span>{article.readTime} read</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
