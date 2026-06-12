import { Link } from "react-router-dom";
import { Briefcase, ArrowRight, Map, Star, TrendingUp, Award, Users, BookOpen } from "lucide-react";

const roadmap = [
  { level: "Current", role: "Senior Developer", skills: ["React", "Node.js", "System Design"], salary: "$120K" },
  { level: "6 Months", role: "Lead Engineer", skills: ["Team Leadership", "Architecture", "Mentoring"], salary: "$145K" },
  { level: "1 Year", role: "Engineering Manager", skills: ["People Management", "OKRs", "Product Thinking"], salary: "$175K" },
  { level: "2 Years", role: "Director of Engineering", skills: ["P&L Ownership", "Executive Presence", "Strategy"], salary: "$220K" },
];

const features = [
  { icon: Map, title: "Career Roadmap Builder", desc: "AI creates personalized step-by-step career progression plans based on your current role, goals, and timeline." },
  { icon: Star, title: "Skill Gap Analysis", desc: "Compare your current skills to your target role requirements and get a prioritized learning plan." },
  { icon: TrendingUp, title: "Promotion Tracker", desc: "Track your progress toward promotion criteria. Know exactly what you need to do to level up." },
  { icon: Award, title: "Certification Planner", desc: "Identify high-value certifications, plan study schedules, and track exam preparation milestones." },
  { icon: Users, title: "Network Builder", desc: "Set networking goals, track relationship building, and manage your professional community strategically." },
  { icon: BookOpen, title: "Industry Intelligence", desc: "AI curates market insights, salary data, and emerging skill trends for your specific career path." },
];

export default function CareerGrowthPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
            <Briefcase className="w-4 h-4 text-blue-400" /> Career Growth System
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-6">
            Accelerate Your <span className="gradient-text">Career Trajectory</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed mb-8">
            Stop leaving your career to chance. Droms gives you a data-driven career strategy with AI-powered guidance to reach your professional goals faster than you thought possible.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-4">
            Plan Your Career <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Career Roadmap Visual */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-4">Sample Career Roadmap</h2>
            <p className="text-slate-500">AI-generated progression plan for a software engineer</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 to-primary-200 hidden md:block" />
            <div className="space-y-8">
              {roadmap.map((step, i) => (
                <div key={step.level} className={`flex gap-8 items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 bg-white rounded-2xl p-6 border-2 ${i === 0 ? "border-primary-300 shadow-lg" : "border-slate-200"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${i === 0 ? "bg-primary-100 text-primary-700" : "bg-slate-100 text-slate-600"}`}>{step.level}</span>
                      <span className="text-lg font-bold text-green-600">{step.salary}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{step.role}</h3>
                    <div className="flex flex-wrap gap-2">
                      {step.skills.map(s => (
                        <span key={s} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-primary-600 border-4 border-white shadow-lg flex-shrink-0 hidden md:block" />
                  <div className="flex-1 hidden md:block" />
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
            <h2 className="text-4xl font-bold font-display text-slate-900 mb-4">Your Complete Career Strategy Platform</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-blue-600" />
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
