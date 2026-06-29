import { Link } from "react-router-dom";
import { Check, Shield, ArrowRight, Star, Zap } from "lucide-react";
import { PRICING_PLANS } from "@/constants";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  return (
    <div className="overflow-hidden">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
            <Shield className="w-4 h-4 text-accent" /> Simple, Transparent Pricing
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-4">
            Invest in Your <span className="gradient-text-gold">Dream Self</span>
          </h1>
          <p className="text-slate-300 text-xl">Start free, upgrade when you're ready. Cancel anytime.</p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8 -mt-8">
            {PRICING_PLANS.map((plan) => (
              <div key={plan.name} className={cn(
                "bg-white rounded-3xl p-8 border-2 relative transition-all duration-300 hover:-translate-y-2",
                plan.highlighted ? "border-primary-500 shadow-2xl shadow-primary-500/20" : "border-slate-200 hover:shadow-xl"
              )}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-purple text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    ⚡ Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold font-display text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-bold font-display text-slate-900">${plan.price}</span>
                  <span className="text-slate-500">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Check className={cn("w-4 h-4 flex-shrink-0", plan.highlighted ? "text-primary-600" : "text-slate-400")} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={cn(
                  "block text-center font-semibold py-3.5 rounded-xl transition-all duration-200",
                  plan.highlighted ? "bg-gradient-purple text-white hover:shadow-glow-purple" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-display text-slate-900 mb-12">Trusted by Thousands of Achievers</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: "156K+", label: "Active Users" },
              { value: "89%", label: "Goal Achievement Rate" },
              { value: "4.9/5", label: "Average Rating" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-4xl font-bold font-display gradient-text mb-1">{s.value}</p>
                <p className="text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
