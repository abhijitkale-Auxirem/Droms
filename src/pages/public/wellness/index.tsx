import { Link } from "react-router-dom";
import { Heart, ArrowRight, Activity, Moon, Apple, Brain, Dumbbell, Smile } from "lucide-react";

const pillars = [
  { icon: Dumbbell, title: "Fitness Goals", desc: "Track workouts, set performance targets, and monitor body composition progress over time.", color: "bg-red-50", iconColor: "text-red-600" },
  { icon: Apple, title: "Nutrition Planning", desc: "Set nutrition goals, track macro targets, and build healthy eating habits that align with your lifestyle.", color: "bg-green-50", iconColor: "text-green-600" },
  { icon: Brain, title: "Mental Wellness", desc: "Mood tracking, stress management techniques, and AI-guided mental health strategies for resilience.", color: "bg-purple-50", iconColor: "text-purple-600" },
  { icon: Smile, title: "Meditation Programs", desc: "Guided meditation plans, mindfulness practice tracking, and breathwork programs for inner peace.", color: "bg-blue-50", iconColor: "text-blue-600" },
  { icon: Moon, title: "Sleep Optimization", desc: "Track sleep quality, set sleep goals, and get AI recommendations to optimize your recovery and energy.", color: "bg-indigo-50", iconColor: "text-indigo-600" },
  { icon: Activity, title: "Wellness Score", desc: "A holistic daily wellness score combining all dimensions — physical, mental, and emotional balance.", color: "bg-amber-50", iconColor: "text-amber-600" },
];

export default function WellnessPublicPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-primary-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-pink-600/20 border border-pink-500/30 rounded-full px-4 py-1.5 text-sm text-pink-300 mb-6">
            <Heart className="w-4 h-4" /> Wellness Management
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-6">
            Holistic Wellness for <span className="gradient-text">Peak Performance</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed mb-8">
            True success requires a healthy foundation. Droms monitors every dimension of your wellness — body, mind, and spirit — so you can perform at your absolute best.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-4">
            Start Wellness Journey <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Wellness Pillars */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-slate-900 mb-4">6 Pillars of Complete Wellness</h2>
            <p className="text-slate-500 text-lg">Droms tracks every dimension of your health and wellbeing</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map(p => (
              <div key={p.title} className="p-6 rounded-2xl border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl ${p.color} flex items-center justify-center mb-4`}>
                  <p.icon className={`w-6 h-6 ${p.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Score Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-4">Your Daily Wellness Score</h2>
            <p className="text-slate-500">A unified score across all wellness dimensions</p>
          </div>
          <div className="bg-droms-dark rounded-3xl p-8">
            <div className="text-center mb-8">
              <p className="text-slate-400 text-sm mb-2">Today's Wellness Score</p>
              <p className="text-8xl font-bold font-display gradient-text">82</p>
              <p className="text-green-400 text-sm mt-2">↑ +5 from yesterday</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Physical", score: 88, color: "bg-red-500" },
                { label: "Mental", score: 79, color: "bg-purple-500" },
                { label: "Nutrition", score: 74, color: "bg-green-500" },
                { label: "Sleep", score: 85, color: "bg-indigo-500" },
                { label: "Stress", score: 72, color: "bg-yellow-500" },
                { label: "Energy", score: 91, color: "bg-orange-500" },
              ].map(s => (
                <div key={s.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-slate-300 text-xs">{s.label}</p>
                    <p className="text-white text-sm font-bold">{s.score}</p>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full">
                    <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.score}%` }} />
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
