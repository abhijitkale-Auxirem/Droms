import { Link } from "react-router-dom";
import { ArrowRight, Heart, Target, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-display text-white mb-6">
            We Believe Everyone Deserves to{" "}
            <span className="gradient-text-gold">Live Their Dreams</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed">
            Droms was born from a simple truth: most people have incredible dreams but lack the systems, support, and guidance to turn them into reality. We're here to change that.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold font-display text-slate-900 mb-6">Our Mission</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                To democratize personal success by providing every person — regardless of background, resources, or circumstances — access to world-class goal planning, AI coaching, and achievement systems.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                We combine cutting-edge AI technology with proven behavioral science to create the most effective personal growth platform ever built.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Heart, title: "Human-First", desc: "Technology that serves human potential" },
                { icon: Target, title: "Goal-Centric", desc: "Every feature serves your goals" },
                { icon: Users, title: "Community", desc: "Grow together with accountability" },
                { icon: Award, title: "Excellence", desc: "Only the best for your journey" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <Icon className="w-8 h-8 text-primary-600 mb-3" />
                  <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                  <p className="text-sm text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-dark rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold font-display text-white mb-4">Join the Movement</h2>
            <p className="text-slate-300 mb-8">156,000+ achievers are already transforming their dreams into reality</p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-gradient-purple text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-glow-purple transition-all">
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
