import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import {
  ArrowRight, Sparkles, Star, ChevronDown, ChevronUp, Play,
  Zap, Globe, Shield, Brain
} from "lucide-react";
import { SUCCESS_STATS, TESTIMONIALS, FAQ_ITEMS, PRICING_PLANS, FEATURE_DETAILS, FeatureDetail } from "@/constants";
import heroImg from "@/assets/hero-banner.jpg";
import aiCoachImg from "@/assets/ai-coach-illustration.jpg";
import visionBoardImg from "@/assets/vision-board-preview.jpg";
import { cn } from "@/lib/utils";
import VideoDemoModal from "@/components/common/VideoDemoModal";
import FeatureDetailModal from "@/components/common/FeatureDetailModal";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<FeatureDetail | null>(null);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-dark">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={heroImg} alt="Hero" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-droms-dark/60 via-droms-dark/40 to-droms-dark/90" />
        </div>

        {/* Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] w-20 h-20 border-2 border-primary-400/20 rounded-2xl rotate-12 animate-float" />
          <div className="absolute top-40 right-[15%] w-12 h-12 bg-accent/20 rounded-full animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-40 left-[5%] w-16 h-16 border-2 border-secondary/20 rounded-full animate-float" style={{ animationDelay: "4s" }} />
          <div className="absolute top-1/3 right-[5%] w-24 h-24 border border-white/10 rounded-3xl animate-float-slow" />
          {/* Glow orbs */}
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-24 pb-16 w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <Link to="/register" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur border border-white/20 rounded-full px-5 py-2.5 text-sm text-white/80 mb-8 animate-fade-in-up hover:scale-105 transition-all duration-300">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>156,000+ Dreamers Worldwide</span>
              <span className="text-accent font-semibold">• Join Now</span>
            </Link>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Transform Your{" "}
              <span className="relative inline-block">
                <span className="gradient-text-gold">Dreams</span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent to-orange-500 rounded-full" />
              </span>
              {" "}Into{" "}
              <span className="gradient-text">Reality</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              The world's most powerful AI-driven personal growth platform. Set goals, build habits, track wealth, grow your career, and achieve the life you've always envisioned.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/register" className="group flex items-center gap-2 bg-gradient-purple text-white font-semibold px-8 py-4 rounded-2xl shadow-glow-purple hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                Start Free Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* <button onClick={() => setIsDemoOpen(true)} className="flex items-center gap-2.5 text-white/80 hover:text-white font-medium px-6 py-4 rounded-2xl border border-white/20 hover:border-white/40 hover:bg-white/5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Play className="w-3 h-3 ml-0.5" />
                </div>
                Watch Demo
              </button> */}
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-6 text-sm text-slate-400 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex -space-x-2">
                {["photo-1472099645785-5658abf4ff4e", "photo-1494790108377-be9c29b29330", "photo-1507003211169-0a1dd7228f2d", "photo-1573496359142-b8d87734a5a2"].map((p, i) => (
                  <img key={i} src={`https://images.unsplash.com/${p}?w=40&h=40&fit=crop&crop=face`} className="w-8 h-8 rounded-full border-2 border-droms-dark" alt="" />
                ))}
              </div>
              <span>4.9 ★ from 8,000+ reviews</span>
              <span className="hidden sm:block">•</span>
              <span className="hidden sm:block">No credit card required</span>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 relative max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <div className="absolute -inset-4 bg-gradient-purple rounded-3xl blur-xl opacity-20" />
            <div className="relative glass-card-dark overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/10 rounded-full px-6 py-1 text-xs text-slate-400">app.droms.ai/dashboard</div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-4 gap-4">
                {[
                  { label: "Success Score", value: "847", change: "+12", color: "bg-purple-500/20 border-purple-500/30" },
                  { label: "Goals On Track", value: "7/10", change: "+2", color: "bg-blue-500/20 border-blue-500/30" },
                  { label: "Habit Streak", value: "42 days", change: "+1", color: "bg-green-500/20 border-green-500/30" },
                  { label: "Net Worth", value: "$128K", change: "+$3K", color: "bg-amber-500/20 border-amber-500/30" },
                ].map(item => (
                  <div key={item.label} className={`${item.color} border rounded-xl p-3`}>
                    <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-white">{item.value}</p>
                    <p className="text-xs text-green-400 mt-0.5">{item.change} this week</p>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <div className="bg-white/5 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <span className="text-sm font-medium text-white">Goal Progress</span>
                    <span className="text-xs text-slate-400">This Month</span>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { label: "Launch MVP", progress: 80, color: "bg-purple-500" },
                      { label: "Emergency Fund", progress: 72, color: "bg-blue-500" },
                      { label: "Daily Run 50mi", progress: 88, color: "bg-green-500" },
                      { label: "Deep Learning Course", progress: 60, color: "bg-amber-500" },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 w-36 truncate">{item.label}</span>
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.progress}%` }} />
                        </div>
                        <span className="text-xs text-slate-400 w-8 text-right">{item.progress}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {SUCCESS_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold font-display gradient-text mb-1">{stat.value}</p>
                <p className="text-slate-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" /> Powerful Features
            </div>
            <h2 className="section-heading text-slate-900 mb-4">
              Everything You Need to{" "}
              <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              One unified platform that replaces a dozen apps. Goal planning, habit tracking, AI coaching, and more — all working together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_DETAILS.slice(0, 6).map((feature) => {
              const Icon = (Icons as any)[feature.iconName] || Icons.CircleHelp || Icons.Sparkles;
              return (
                <div
                  key={feature.title}
                  className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedFeature(feature)}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                  <div className="flex items-center gap-1 text-primary-600 text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Coach Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 text-primary-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Brain className="w-4 h-4" /> AI Success Coach
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold font-display text-slate-900 mb-6 leading-tight">
                Your Personal AI Coach,{" "}
                <span className="gradient-text">Available 24/7</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Our advanced AI analyzes your goals, habits, and progress to deliver personalized coaching, motivation strategies, and breakthrough insights that help you achieve 3x faster.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { title: "Personalized Goal Recommendations", desc: "AI maps your dreams to actionable daily steps" },
                  { title: "Real-time Motivation Engine", desc: "Smart nudges when you need them most" },
                  { title: "Breakthrough Barrier Analysis", desc: "Identify and overcome your specific blockers" },
                  { title: "Financial & Career Guidance", desc: "Data-driven advice for wealth and career growth" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{item.title}</p>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/ai-coach" className="btn-primary inline-flex items-center gap-2">
                Meet Your AI Coach <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-purple rounded-3xl blur-2xl opacity-20 transform scale-105" />
              <img src={aiCoachImg} alt="AI Coach" className="relative rounded-3xl shadow-2xl w-full" />
              {/* Chat bubbles overlay */}
              <div className="absolute top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-[200px] animate-float">
                <p className="text-xs text-slate-500 mb-1">AI Coach</p>
                <p className="text-sm font-medium text-slate-800">"You're 80% to your MVP goal! Focus on investor outreach this week."</p>
              </div>
              <div className="absolute bottom-6 -right-6 bg-primary-600 rounded-2xl shadow-xl p-4 max-w-[180px] animate-float" style={{ animationDelay: "3s" }}>
                <p className="text-xs text-white/70 mb-1">Insight</p>
                <p className="text-sm font-medium text-white">"Your peak performance hours: 8–11am. Schedule deep work now!"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Board Preview */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <img src={visionBoardImg} alt="Vision Board" className="rounded-3xl shadow-2xl w-full" />
              <div className="absolute -bottom-4 -right-4 bg-accent rounded-2xl shadow-xl p-4 text-droms-dark">
                <p className="text-2xl font-bold font-display">2,400+</p>
                <p className="text-sm font-medium">Vision Boards Created Today</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
                <Sparkles className="w-4 h-4 text-accent" /> Vision Board Studio
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold font-display text-white mb-6 leading-tight">
                Visualize Your{" "}
                <span className="gradient-text-gold">Dream Life</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Create stunning digital vision boards that connect directly to your goals. Upload images, add affirmations, and watch your vision come to life.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {["Drag & Drop Builder", "Image Upload", "Goal Mapping", "Affirmation Cards", "Shareable Boards", "Progress Tracking"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-slate-300 text-sm">
                    <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
              <Link to="/vision-board" className="inline-flex items-center gap-2 bg-accent hover:bg-yellow-500 text-droms-dark font-bold px-6 py-3 rounded-xl transition-colors">
                Create Your Vision Board <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Star className="w-4 h-4 fill-current" /> Success Stories
            </div>
            <h2 className="section-heading text-slate-900 mb-4">
              Real People, Real{" "}
              <span className="gradient-text">Transformations</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div className="bg-primary-50 rounded-xl p-2.5 mb-4">
                  <p className="text-xs font-semibold text-primary-700"> {t.achievement}</p>
                </div>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-slate-50" id="pricing">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Shield className="w-4 h-4" /> Simple Pricing
            </div>
            <h2 className="section-heading text-slate-900 mb-4">
              Invest in Your{" "}
              <span className="gradient-text">Future Self</span>
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">Start free, upgrade when you're ready. Cancel anytime, no questions asked.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan) => (
              <div key={plan.name} className={cn(
                "bg-white rounded-3xl p-8 border-2 relative transition-all duration-300 hover:-translate-y-2",
                plan.highlighted
                  ? "border-primary-500 shadow-2xl shadow-primary-500/20"
                  : "border-slate-200 hover:border-primary-200 hover:shadow-xl"
              )}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-purple text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold font-display text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-display text-slate-900">${plan.price}</span>
                    <span className="text-slate-500">/{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                        plan.highlighted ? "bg-primary-100" : "bg-slate-100"
                      )}>
                        <div className={cn("w-2 h-2 rounded-full", plan.highlighted ? "bg-primary-600" : "bg-slate-400")} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={cn(
                  "block text-center font-semibold py-3 rounded-xl transition-all duration-200",
                  plan.highlighted
                    ? "bg-gradient-purple text-white hover:shadow-glow-purple"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading text-slate-900 mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-800 pr-4">{item.question}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
            <Globe className="w-4 h-4 text-accent" /> Join 156,000+ Achievers
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
            Your Best Life Starts{" "}
            <span className="gradient-text-gold">Today</span>
          </h2>
          <p className="text-slate-300 text-xl mb-10 max-w-2xl mx-auto">
            Don't let another year pass without taking action. Join Droms and start building the life you've always dreamed of.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="group flex items-center gap-2 bg-gradient-purple text-white font-bold px-10 py-4 rounded-2xl shadow-glow-purple hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg">
              Start Your Journey Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="text-slate-300 hover:text-white font-medium px-8 py-4 rounded-2xl border border-white/20 hover:border-white/40 transition-all">
              Sign In
            </Link>
          </div>
          <p className="text-slate-500 text-sm mt-6">Free forever • No credit card • Cancel anytime</p>
        </div>
      </section>

      <VideoDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <FeatureDetailModal isOpen={!!selectedFeature} onClose={() => setSelectedFeature(null)} feature={selectedFeature} />
    </div>
  );
}
