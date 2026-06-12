import { Link } from "react-router-dom";
import { Brain, Zap, MessageCircle, TrendingUp, Target, Heart, ArrowRight, CheckCircle, Star } from "lucide-react";
import aiCoachImg from "@/assets/ai-coach-illustration.jpg";

const capabilities = [
  { icon: Target, title: "Goal Strategy", desc: "AI analyzes your dreams and creates personalized step-by-step plans tailored to your unique situation and timeline." },
  { icon: Brain, title: "Mindset Coaching", desc: "Identifies limiting beliefs and delivers evidence-based reframing techniques to overcome mental blocks." },
  { icon: TrendingUp, title: "Performance Analytics", desc: "Tracks your patterns and provides weekly insights on your productivity, consistency, and progress velocity." },
  { icon: Heart, title: "Wellness Guidance", desc: "Monitors stress, sleep, and energy levels to recommend optimal routines for peak performance." },
  { icon: MessageCircle, title: "24/7 Chat Support", desc: "Always available for motivation, accountability check-ins, and real-time advice whenever you need it." },
  { icon: Zap, title: "Adaptive Planning", desc: "Dynamically adjusts your plans based on life changes, setbacks, and new opportunities as they emerge." },
];

const conversations = [
  { role: "user", message: "I keep procrastinating on my startup. I have the idea but can't start building." },
  { role: "ai", message: "I notice this is your third week mentioning this. The procrastination likely stems from perfectionism — the fear that what you build won't match your vision. Let's break down the smallest possible first action. What's one thing you could code in the next 30 minutes?" },
  { role: "user", message: "I could set up the project repository I guess." },
  { role: "ai", message: "Perfect. That's your only task for today. I'll check in with you in 45 minutes. Once that's done, you'll have broken the inertia. Momentum builds from tiny wins — and you just identified your first one." },
];

export default function AICoachPublicPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-16 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-500/30 rounded-full px-4 py-1.5 text-sm text-primary-300 mb-6">
              <Brain className="w-4 h-4" /> Powered by Advanced AI Models
            </div>
            <h1 className="text-5xl font-bold font-display text-white leading-tight mb-6">
              Your Personal <span className="gradient-text">AI Life Coach</span> — Available 24/7
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Not just chatbots. Droms AI analyzes your complete life profile — goals, habits, patterns, emotions — and delivers coaching that's genuinely personalized to your journey.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Goal Strategy", "Mindset Reset", "Habit Building", "Career Advice", "Financial Guidance"].map(tag => (
                <span key={tag} className="bg-white/10 border border-white/20 text-white text-sm px-3 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
            <Link to="/register" className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-4">
              Start Free Coaching <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="relative">
            <img src={aiCoachImg} alt="AI Coach" className="rounded-3xl w-full shadow-2xl" />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">89% Goal Achievement Rate</p>
                  <p className="text-xs text-slate-500">Users coached by AI vs. 34% without</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-slate-900 mb-4">What Your AI Coach Can Do</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">More than motivation — a comprehensive coaching system that understands you.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div key={cap.title} className="p-6 rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary-50 group-hover:bg-gradient-purple flex items-center justify-center mb-4 transition-all duration-300">
                  <cap.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{cap.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Conversation */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-display text-slate-900 mb-4">Real Coaching Conversations</h2>
            <p className="text-slate-500 text-lg">See how Droms AI coaches go beyond surface-level advice</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-dark px-6 py-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-purple flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">Droms AI Coach</span>
              <span className="ml-auto text-xs text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block" /> Online
              </span>
            </div>
            <div className="p-6 space-y-4">
              {conversations.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold ${msg.role === "ai" ? "bg-gradient-purple text-white" : "bg-slate-200 text-slate-600"}`}>
                    {msg.role === "ai" ? "AI" : "You"}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "ai" ? "bg-primary-50 text-slate-800 border border-primary-100" : "bg-slate-900 text-white"}`}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-display text-white mb-4">Ready to Transform Your Life?</h2>
          <p className="text-slate-300 text-lg mb-8">Your AI coach is ready. Start your first session free — no credit card required.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-accent hover:bg-yellow-500 text-droms-dark font-bold text-lg px-8 py-4 rounded-xl transition-colors">
            Start Free AI Coaching <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
