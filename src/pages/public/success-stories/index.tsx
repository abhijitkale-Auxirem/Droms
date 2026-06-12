import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/constants";

const extendedStories = [
  ...TESTIMONIALS,
  { name: "James Liu", role: "Financial Analyst → Fund Manager", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face", quote: "Droms financial planning tools helped me triple my investment portfolio in 18 months while maintaining perfect work-life balance.", rating: 5, achievement: "3x portfolio growth in 18 months" },
  { name: "Maria Santos", role: "Teacher → EdTech Founder", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face", quote: "The AI coach pushed me beyond my comfort zone every single day. I went from teaching 30 students to impacting 50,000+ through my platform.", rating: 5, achievement: "50K+ students reached" },
];

export default function SuccessStoriesPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold font-display text-white mb-4">
            Real <span className="gradient-text-gold">Success Stories</span>
          </h1>
          <p className="text-slate-300 text-xl">Discover how Droms users transformed their dreams into extraordinary achievements.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {extendedStories.map((story, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: story.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed mb-6 italic">"{story.quote}"</p>
                <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-3 mb-6 border border-primary-100">
                  <p className="text-sm font-bold text-primary-700">🏆 {story.achievement}</p>
                </div>
                <div className="flex items-center gap-3">
                  <img src={story.avatar} alt={story.name} className="w-12 h-12 rounded-full ring-2 ring-primary-100" />
                  <div>
                    <p className="font-semibold text-slate-900">{story.name}</p>
                    <p className="text-sm text-slate-500">{story.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-4">Write Your Own Success Story</h2>
            <p className="text-slate-500 mb-8 text-lg">Join 156,000+ achievers transforming their dreams into reality</p>
            <Link to="/register" className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-4">
              Start Free Today <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
