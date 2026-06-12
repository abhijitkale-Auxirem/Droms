import { useState } from "react";
import { Crown, Check, Zap, ArrowRight, CreditCard, Calendar, Shield } from "lucide-react";
import { PRICING_PLANS } from "@/constants";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const billingHistory = [
  { date: "Jan 1, 2025", description: "Pro Plan - Monthly", amount: "$19.00", status: "paid" },
  { date: "Dec 1, 2024", description: "Pro Plan - Monthly", amount: "$19.00", status: "paid" },
  { date: "Nov 1, 2024", description: "Pro Plan - Monthly", amount: "$19.00", status: "paid" },
  { date: "Oct 1, 2024", description: "Pro Plan - Monthly", amount: "$19.00", status: "paid" },
];

export default function SubscriptionPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900">Subscription</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your plan, billing, and payment methods</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-purple rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Crown className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Current Plan</p>
              <h3 className="text-2xl font-bold font-display">Pro Plan</h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold font-display">$19<span className="text-lg font-normal text-white/70">/mo</span></p>
            <p className="text-white/70 text-sm flex items-center gap-1 justify-end mt-1">
              <Calendar className="w-3.5 h-3.5" /> Renews Feb 1, 2025
            </p>
          </div>
        </div>
        <div className="relative mt-4 flex gap-3 flex-wrap">
          <button onClick={() => toast.success("Redirecting to billing portal...")} className="bg-white text-primary-700 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-white/90 transition-colors flex items-center gap-2">
            <CreditCard className="w-4 h-4" /> Manage Billing
          </button>
          <button onClick={() => toast.info("Cancel flow initiated")} className="bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
            Cancel Plan
          </button>
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <h3 className="text-lg font-bold font-display text-slate-900">Compare Plans</h3>
          <div className="flex items-center bg-slate-100 rounded-xl p-1">
            <button onClick={() => setBilling("monthly")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${billing === "monthly" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}>
              Monthly
            </button>
            <button onClick={() => setBilling("annual")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${billing === "annual" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}>
              Annual <span className="text-green-600 text-xs font-bold ml-1">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {PRICING_PLANS.map(plan => (
            <div key={plan.name} className={cn(
              "rounded-2xl p-5 border-2 relative",
              plan.highlighted ? "border-primary-500 bg-primary-50" : "border-slate-200"
            )}>
              {plan.highlighted && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">Current Plan</div>}
              <h4 className="font-bold text-slate-900 mb-1">{plan.name}</h4>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold font-display text-slate-900">
                  ${billing === "annual" ? Math.round(plan.price * 0.8) : plan.price}
                </span>
                <span className="text-slate-500 text-sm">/mo</span>
              </div>
              <ul className="space-y-2 mb-4">
                {plan.features.slice(0, 4).map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => !plan.highlighted && toast.success(`Upgrading to ${plan.name}...`)}
                className={cn(
                  "w-full py-2 rounded-xl text-sm font-semibold transition-colors",
                  plan.highlighted ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}>
                {plan.highlighted ? "Current Plan" : plan.price === 0 ? "Downgrade" : "Upgrade"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-900">Billing History</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {["Date", "Description", "Amount", "Status", ""].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {billingHistory.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-600">{item.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.description}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">{item.amount}</td>
                <td className="px-6 py-4"><span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium capitalize">{item.status}</span></td>
                <td className="px-6 py-4">
                  <button onClick={() => toast.success("Invoice downloaded!")} className="text-xs text-primary-600 hover:underline">Download PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
