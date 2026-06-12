import { Link } from "react-router-dom";
import { Target, ArrowRight, CheckCircle, BarChart2, Calendar, Flag, Layers, Zap } from "lucide-react";

const steps = [
  { num: "01", title: "Define Your Dream", desc: "Start with the big picture — what does your ideal life look like in 5 years? Droms helps you articulate it clearly." },
  { num: "02", title: "Break Into Goals", desc: "AI automatically suggests SMART goals derived from your dream, organized by timeline and priority." },
  { num: "03", title: "Create Milestones", desc: "Each goal is broken into weekly milestones with specific actions, deadlines, and measurable outcomes." },
  { num: "04", title: "Track & Adapt", desc: "Daily progress tracking with AI-powered adjustments when life changes — no plan goes stale on Droms." },
];

const features = [
  { icon: Target, title: "SMART Goal Templates", desc: "80+ templates for every life category — career, health, finance, relationships, learning, and more." },
  { icon: Layers, title: "Goal Dependency Mapping", desc: "Visualize how your goals connect and which ones unlock others. Build a cohesive life strategy." },
  { icon: Calendar, title: "Timeline Planning", desc: "Drag-and-drop timeline view with quarterly, monthly, and weekly breakdowns for every goal." },
  { icon: BarChart2, title: "Progress Analytics", desc: "Real-time dashboards showing velocity, completion rates, and projected achievement dates." },
  { icon: Flag, title: "Milestone Celebrations", desc: "Automated achievement recognition keeps motivation high throughout the long-term journey." },
  { icon: Zap, title: "AI Goal Recommendations", desc: "Based on your profile, Droms suggests the next best goals aligned with your ultimate dream." },
];

export default function GoalPlanningPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
            <Target className="w-4 h-4 text-accent" /> Goal Planning System
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-6">
            Turn Dreams Into <span className="gradient-text-gold">Actionable Plans</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed mb-8">
            The most sophisticated goal planning system ever built for personal growth. Not just to-do lists — a complete life strategy engine powered by AI.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-4">
            Start Planning Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-slate-900 mb-4">How Droms Goal Planning Works</h2>
            <p className="text-slate-500 text-lg">From vague dream to daily action in 4 steps</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-purple flex items-center justify-center mx-auto mb-4 shadow-glow-purple">
                  <span className="text-white font-bold font-display text-xl">{step.num}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-slate-900 mb-4">Everything You Need to Achieve Goals</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-dark">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          {[
            { value: "89%", label: "Goal Achievement Rate", sub: "vs 34% industry average" },
            { value: "4.2x", label: "Faster Goal Completion", sub: "compared to manual planning" },
            { value: "2.4M+", label: "Goals Planned on Droms", sub: "and counting" },
          ].map(s => (
            <div key={s.label}>
              <p className="text-5xl font-bold font-display gradient-text-gold mb-2">{s.value}</p>
              <p className="text-white font-semibold mb-1">{s.label}</p>
              <p className="text-slate-400 text-sm">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
