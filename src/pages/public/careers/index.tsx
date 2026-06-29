import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock, ArrowRight, Star, Heart, Compass, Smile } from "lucide-react";

export default function CareersPage() {
  const positions = [
    { title: "Senior React Engineer", dept: "Engineering", type: "Full-Time", location: "Remote / SF", salary: "$130k - $160k" },
    { title: "AI Research Scientist", dept: "AI & Data Science", type: "Full-Time", location: "Remote / SF", salary: "$150k - $190k" },
    { title: "Lead Product Designer", dept: "Design", type: "Full-Time", location: "Remote", salary: "$120k - $150k" },
    { title: "Growth Marketing Manager", dept: "Marketing", type: "Full-Time", location: "Remote / NYC", salary: "$90k - $120k" },
  ];

  return (
    <div className="overflow-hidden">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
            <Briefcase className="w-4 h-4 text-accent" /> Careers
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-display text-white mb-6">
            Build the Future of <span className="gradient-text-gold">Personal Growth</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto">
            Help us build the behavioral operating system for human potential. We are a fully remote team passionate about technology, design, and growth.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Values */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-4">Why Droms?</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Our culture is built on enabling everyone to do their best work while growing personally and professionally.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-24">
            {[
              { icon: Star, title: "Self-Direction", desc: "We trust you to own your outcomes and manage your time." },
              { icon: Heart, title: "Personal Growth", desc: "Generous budget for courses, books, and wellness." },
              { icon: Compass, title: "Bold Ambition", desc: "We build for scale and tackle difficult engineering challenges." },
              { icon: Smile, title: "Life First", desc: "Flexible work hours, unlimited PTO, and remote configuration." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-slate-50 hover:bg-slate-100/50 transition-all rounded-2xl p-6 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Open Roles */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-8">Open Roles</h2>
            <div className="space-y-4">
              {positions.map((pos) => (
                <div key={pos.title} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border border-slate-100 hover:border-primary-200 hover:shadow-sm transition-all bg-white gap-4">
                  <div>
                    <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full uppercase tracking-wider">{pos.dept}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2">{pos.title}</h3>
                    <div className="flex items-center gap-4 text-slate-500 text-sm mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {pos.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {pos.type}</span>
                      <span className="font-medium text-slate-700">{pos.salary}</span>
                    </div>
                  </div>
                  <a href={`mailto:careers@droms.ai?subject=Application for ${pos.title}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700">
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
