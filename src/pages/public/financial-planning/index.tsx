import { Link } from "react-router-dom";
import { DollarSign, ArrowRight, PiggyBank, TrendingUp, CreditCard, BarChart2, Shield, Zap } from "lucide-react";

const features = [
  { icon: PiggyBank, title: "Savings Goal Tracking", desc: "Set savings targets with automated contribution schedules and visual progress toward each milestone." },
  { icon: TrendingUp, title: "Investment Planning", desc: "Track investment portfolios, set return targets, and get AI recommendations for diversification." },
  { icon: CreditCard, title: "Debt Reduction Engine", desc: "Avalanche or snowball method strategies with payoff timelines and interest savings calculations." },
  { icon: BarChart2, title: "Net Worth Dashboard", desc: "Real-time net worth tracking across all assets and liabilities with growth trend analysis." },
  { icon: Shield, title: "Budget Management", desc: "Category-based budgeting with overspend alerts, spending pattern insights, and optimization tips." },
  { icon: Zap, title: "Financial AI Coach", desc: "Personalized financial advice based on your income, goals, and spending patterns. Like a CFO for your life." },
];

const metrics = [
  { month: "Jan", savings: 36000, investments: 67500 },
  { month: "Feb", savings: 38000, investments: 72000 },
  { month: "Mar", savings: 40000, investments: 78000 },
];

export default function FinancialPlanningPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-green-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-500/30 rounded-full px-4 py-1.5 text-sm text-green-300 mb-6">
            <DollarSign className="w-4 h-4" /> Financial Planning System
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-6">
            Build Wealth <span className="gradient-text-gold">Systematically</span>
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed mb-8">
            Financial freedom doesn't happen by accident. Droms gives you a complete wealth-building roadmap — savings, investments, debt elimination, and passive income tracking in one platform.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 btn-primary text-lg px-8 py-4">
            Start Financial Planning <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Financial Dashboard Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-4">Your Financial Command Center</h2>
          </div>
          <div className="bg-droms-dark rounded-3xl p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Net Worth", value: "$177,500", change: "+12.4%", color: "text-green-400" },
                { label: "Monthly Savings", value: "$3,200", change: "+8.2%", color: "text-blue-400" },
                { label: "Investment Return", value: "18.6%", change: "YTD", color: "text-yellow-400" },
              ].map(m => (
                <div key={m.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-slate-400 text-xs mb-1">{m.label}</p>
                  <p className={`text-xl font-bold font-display ${m.color}`}>{m.value}</p>
                  <p className="text-slate-500 text-xs mt-1">{m.change}</p>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {[
                { name: "Emergency Fund", progress: 72, target: "$50,000", current: "$36,000", color: "bg-blue-500" },
                { name: "Index Fund Portfolio", progress: 67.5, target: "$100,000", current: "$67,500", color: "bg-green-500" },
                { name: "Pay Off Student Loans", progress: 70, target: "$35,000", current: "$24,500 paid", color: "bg-orange-500" },
                { name: "Down Payment Fund", progress: 28, target: "$150,000", current: "$42,000", color: "bg-purple-500" },
              ].map(g => (
                <div key={g.name} className="bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white text-sm font-medium">{g.name}</p>
                    <div className="text-right">
                      <p className="text-white text-xs">{g.current}</p>
                      <p className="text-slate-500 text-xs">of {g.target}</p>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full">
                    <div className={`h-full rounded-full ${g.color}`} style={{ width: `${g.progress}%` }} />
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
            <h2 className="text-4xl font-bold font-display text-slate-900 mb-4">Complete Wealth Management System</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-green-600" />
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
