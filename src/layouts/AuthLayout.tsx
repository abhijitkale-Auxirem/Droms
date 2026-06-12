import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-dark flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
          <div className="absolute top-3/4 left-1/2 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
          {/* Floating shapes */}
          <div className="absolute top-20 right-20 w-16 h-16 border-2 border-primary-400/30 rounded-2xl rotate-12 animate-float-slow" />
          <div className="absolute bottom-40 left-20 w-10 h-10 border-2 border-accent/30 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-2xl bg-gradient-purple flex items-center justify-center shadow-glow-purple">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold font-display text-white">Droms</span>
        </Link>

        {/* Main Content */}
        <div className="relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              156,000+ achievers and growing
            </div>
            <h1 className="text-5xl font-bold font-display text-white leading-tight mb-4">
              Transform Your<br />
              <span className="gradient-text-gold">Dreams</span> Into<br />
              Reality
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Join the world's most powerful AI-driven personal growth platform. Set goals, build habits, and achieve the life you've always envisioned.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { value: "89%", label: "Goal Success Rate" },
              { value: "42 days", label: "Avg. Habit Streak" },
              { value: "4.9★", label: "User Rating" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card-dark p-4 text-center">
                <p className="text-2xl font-bold text-white font-display">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="glass-card-dark p-5">
            <p className="text-slate-300 text-sm italic mb-3">
              "Droms helped me go from dreaming about my startup to actually launching it. The AI coach is like having a mentor available 24/7."
            </p>
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="Marcus" className="w-9 h-9 rounded-full" />
              <div>
                <p className="text-white text-sm font-medium">Marcus Johnson</p>
                <p className="text-slate-500 text-xs">Founder & CEO, TechVentures</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-slate-600 text-sm relative z-10">© 2025 Droms Inc. All rights reserved.</p>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm lg:hidden" />
        <div className="w-full max-w-md relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
