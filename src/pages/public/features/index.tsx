import { Link } from "react-router-dom";
import { Brain, Target, CheckSquare, Layout, TrendingUp, Heart, GraduationCap, Users, Trophy, ArrowRight } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Life Coach", desc: "Personalized AI coaching that analyzes your goals and progress to deliver tailored recommendations, motivation strategies, and breakthrough insights.", color: "from-purple-500 to-indigo-600" },
  { icon: Target, title: "Smart Goal Planning", desc: "Transform dreams into actionable milestones with AI-assisted breakdown, dependency mapping, progress visualization, and deadline management.", color: "from-blue-500 to-cyan-600" },
  { icon: CheckSquare, title: "Habit Architecture", desc: "Build powerful daily routines with streak tracking, behavioral analytics, smart reminders, and habit correlation analysis.", color: "from-green-500 to-teal-600" },
  { icon: Layout, title: "Vision Board Studio", desc: "Create stunning digital vision boards with drag-and-drop builder, image uploads, affirmations, and direct goal mapping.", color: "from-pink-500 to-rose-600" },
  { icon: TrendingUp, title: "Financial Planning", desc: "Track savings goals, investments, budgets, and wealth growth with beautiful analytics and AI-powered financial insights.", color: "from-amber-500 to-orange-600" },
  { icon: Heart, title: "Wellness Center", desc: "Holistic wellbeing management including fitness tracking, nutrition planning, meditation programs, and sleep optimization.", color: "from-red-500 to-pink-600" },
  { icon: GraduationCap, title: "Learning Academy", desc: "Curated courses and learning paths for leadership, productivity, finance, mindset, and personal development.", color: "from-violet-500 to-purple-600" },
  { icon: Users, title: "Community & Accountability", desc: "Join accountability groups, find mentors, share achievements, and grow alongside thousands of ambitious achievers.", color: "from-sky-500 to-blue-600" },
  { icon: Trophy, title: "Challenges & Gamification", desc: "Personal and group challenges, achievement badges, leaderboards, and rewards to keep you motivated and engaged.", color: "from-yellow-500 to-amber-600" },
];

export default function FeaturesPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold font-display text-white mb-6">
            Every Tool You Need to{" "}
            <span className="gradient-text">Achieve Greatness</span>
          </h1>
          <p className="text-slate-300 text-xl">One platform. Infinite possibilities. Your complete personal growth ecosystem.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="group bg-white border border-slate-200 hover:border-primary-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-4">{feature.desc}</p>
                  <div className="flex items-center gap-1 text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-purple text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Start Using All Features Free</h2>
          <p className="text-white/80 text-xl mb-8">No credit card required. Full access to core features forever.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-8 py-4 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
