import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import { BLOG_ARTICLES } from "@/constants";
import BlogDetailModal from "@/components/common/BlogDetailModal";

const categoryColors: Record<string, string> = {
  Habits: "bg-orange-100 text-orange-700",
  Goals: "bg-purple-100 text-purple-700",
  Productivity: "bg-blue-100 text-blue-700",
  Finance: "bg-green-100 text-green-700",
  Mindset: "bg-pink-100 text-pink-700",
  Community: "bg-teal-100 text-teal-700",
};

export default function BlogPage() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

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
            <div
              onClick={() => setSelectedArticleId(BLOG_ARTICLES[0].id)}
              className="group grid lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden border-2 border-slate-100 hover:border-primary-200 hover:shadow-xl cursor-pointer transition-all duration-300"
            >
              <img src={BLOG_ARTICLES[0].img} alt={BLOG_ARTICLES[0].title} className="w-full h-72 lg:h-auto object-cover" />
              <div className="p-8 flex flex-col justify-center">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-4 max-w-max ${categoryColors[BLOG_ARTICLES[0].category]}`}>{BLOG_ARTICLES[0].category}</span>
                <h3 className="text-2xl font-bold font-display text-slate-900 mb-4 leading-tight group-hover:text-primary-600 transition-colors">{BLOG_ARTICLES[0].title}</h3>
                <p className="text-slate-500 mb-6">Discover the neurological mechanisms behind habit formation and how Droms leverages this science to help you build lasting change.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                      {BLOG_ARTICLES[0].author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{BLOG_ARTICLES[0].author}</p>
                      <p className="text-xs text-slate-400">{BLOG_ARTICLES[0].date} · {BLOG_ARTICLES[0].readTime} read</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArticleId(BLOG_ARTICLES[0].id);
                    }}
                    className="btn-primary text-sm px-4 py-2 flex items-center gap-1.5 hover:scale-105 transition-transform"
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* All Articles */}
          <div>
            <h2 className="text-2xl font-bold font-display text-slate-900 mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_ARTICLES.slice(1).map(article => (
                <div
                  key={article.title}
                  onClick={() => setSelectedArticleId(article.id)}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between text-left"
                >
                  <div>
                    <img src={article.img} alt={article.title} className="w-full h-44 object-cover" />
                    <div className="p-5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3 ${categoryColors[article.category] || "bg-slate-100 text-slate-600"}`}>{article.category}</span>
                      <h3 className="font-bold text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-primary-600 transition-colors">{article.title}</h3>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-0 border-t border-slate-100 mt-2 pt-3 flex items-center justify-between text-xs text-slate-400">
                    <span>{article.author} · {article.readTime} read</span>
                    <span className="text-primary-600 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BlogDetailModal isOpen={!!selectedArticleId} onClose={() => setSelectedArticleId(null)} articleId={selectedArticleId} />
    </div>
  );
}
