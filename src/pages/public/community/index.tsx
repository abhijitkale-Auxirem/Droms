import { Link } from "react-router-dom";
import { Users, MessageSquare, Trophy, Heart, ArrowRight, Globe } from "lucide-react";

export default function CommunityPage() {
  const groups = [
    { name: "Startup Founders", members: 2340, category: "Business", activity: "Very Active", emoji: "" },
    { name: "Financial Independence", members: 8920, category: "Finance", activity: "Very Active", emoji: "" },
    { name: "Marathon Runners", members: 1560, category: "Fitness", activity: "Active", emoji: "" },
    { name: "Morning Ritual Masters", members: 4450, category: "Habits", activity: "Active", emoji: "" },
    { name: "Writers Circle", members: 1780, category: "Creativity", activity: "Active", emoji: "" },
    { name: "Tech Career Growth", members: 5670, category: "Career", activity: "Very Active", emoji: "" },
    { name: "Mindfulness Practice", members: 3210, category: "Wellness", activity: "Active", emoji: "" },
    { name: "Young Entrepreneurs", members: 6890, category: "Business", activity: "Very Active", emoji: "" },
  ];

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
            <Globe className="w-4 h-4 text-accent" /> 156,000+ Members Worldwide
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-4">
            Grow Together with an{" "}
            <span className="gradient-text">Unstoppable Community</span>
          </h1>
          <p className="text-slate-300 text-xl">Accountability partners, mentors, and fellow achievers who push you toward your dreams.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Users, value: "156K+", label: "Community Members" },
              { icon: MessageSquare, value: "2.4M+", label: "Conversations Daily" },
              { icon: Trophy, value: "89K+", label: "Goals Achieved Together" },
              { icon: Heart, value: "98%", label: "Member Satisfaction" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center p-6 bg-slate-50 rounded-2xl">
                <Icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <p className="text-3xl font-bold font-display gradient-text mb-1">{value}</p>
                <p className="text-slate-500 text-sm">{label}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold font-display text-slate-900 mb-8">Popular Accountability Groups</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {groups.map(g => (
              <div key={g.name} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-primary-200 hover:-translate-y-0.5 transition-all">
                <div className="text-3xl mb-3">{g.emoji}</div>
                <h3 className="font-semibold text-slate-900 mb-1">{g.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{g.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{g.members.toLocaleString()} members</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${g.activity === "Very Active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                    {g.activity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/register" className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-4">
              Join the Community <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
