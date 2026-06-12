import { Link } from "react-router-dom";
import { CheckSquare, ArrowRight, Flame, BarChart2, Calendar, Bell, RefreshCw, Star } from "lucide-react";

const habits = [
  { emoji: "🧘", name: "Morning Meditation", streak: 42, rate: 94, category: "Wellness" },
  { emoji: "📚", name: "Read 30 Minutes", streak: 28, rate: 88, category: "Learning" },
  { emoji: "🏃", name: "Daily Exercise", streak: 19, rate: 78, category: "Fitness" },
  { emoji: "✍️", name: "Journaling", streak: 35, rate: 85, category: "Mindset" },
  { emoji: "💧", name: "Drink 8 Glasses Water", streak: 21, rate: 80, category: "Health" },
  { emoji: "🙏", name: "Gratitude Practice", streak: 56, rate: 97, category: "Mindset" },
];

const features = [
  { icon: Flame, title: "Streak Tracking", desc: "Visual fire streaks that grow longer the more consistent you are. Never break the chain." },
  { icon: BarChart2, title: "Completion Analytics", desc: "Heatmap calendars, weekly trends, and deep analytics on your habit performance patterns." },
  { icon: Bell, title: "Smart Reminders", desc: "AI learns when you're most likely to complete habits and sends reminders at optimal times." },
  { icon: Calendar, title: "Flexible Scheduling", desc: "Daily, weekly, or custom schedules. Set habits for specific days, times, or intervals." },
  { icon: RefreshCw, title: "Habit Stacking", desc: "Link habits together into powerful routines. Complete one habit, trigger the next automatically." },
  { icon: Star, title: "Habit Challenges", desc: "Join 30-day habit challenges with thousands of users. Compete, support, and celebrate together." },
];

export default function HabitTrackingPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-green-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
            <Flame className="w-4 h-4 text-orange-400" /> Habit Tracking System
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-6">
            Build Habits That <span className="gradient-text">Actually Stick</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed mb-8">
            Most habit apps fail because they don't understand behavior science. Droms uses habit stacking, streak psychology, and AI coaching to make your new behaviors permanent.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-4">
            Start Building Habits <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Live Demo Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-4">Your Habit Dashboard Preview</h2>
            <p className="text-slate-500">Real data from a sample Droms user's 60-day habit journey</p>
          </div>
          <div className="bg-droms-dark rounded-3xl p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold">Active Habits</h3>
              <span className="text-xs text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full">6 Active</span>
            </div>
            <div className="space-y-3">
              {habits.map(h => (
                <div key={h.name} className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                  <span className="text-2xl">{h.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{h.name}</p>
                    <p className="text-slate-500 text-xs">{h.category}</p>
                  </div>
                  <div className="flex items-center gap-1 text-orange-400 text-sm font-bold">
                    <Flame className="w-4 h-4" /> {h.streak}d
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm font-bold">{h.rate}%</p>
                    <div className="w-16 h-1.5 bg-white/10 rounded-full mt-1">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: `${h.rate}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-slate-900 mb-4">Built on Habit Science</h2>
            <p className="text-slate-500 text-lg">Every feature designed based on behavioral psychology research</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
