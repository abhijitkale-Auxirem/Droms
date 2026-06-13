import { useState, useEffect } from "react";
import { Crown, Check, Zap, ArrowRight, CreditCard, Calendar, Shield, Trash } from "lucide-react";
import { PRICING_PLANS } from "@/constants";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BillingHistoryItem {
  date: string;
  description: string;
  amount: string;
  status: string;
}

const defaultBillingHistory: BillingHistoryItem[] = [
  { date: "Jan 1, 2025", description: "Pro Plan - Monthly", amount: "$19.00", status: "paid" },
  { date: "Dec 1, 2024", description: "Pro Plan - Monthly", amount: "$19.00", status: "paid" },
  { date: "Nov 1, 2024", description: "Pro Plan - Monthly", amount: "$19.00", status: "paid" },
];

export default function SubscriptionPage() {
  const { user, login: updateAuthUser } = useAuthStore();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [history, setHistory] = useState<BillingHistoryItem[]>([]);

  // Load billing history
  useEffect(() => {
    const cachedHistory = localStorage.getItem("droms_billing_history");
    if (cachedHistory) {
      setHistory(JSON.parse(cachedHistory));
    } else {
      setHistory(defaultBillingHistory);
      localStorage.setItem("droms_billing_history", JSON.stringify(defaultBillingHistory));
    }
  }, []);

  const saveHistory = (updated: BillingHistoryItem[]) => {
    setHistory(updated);
    localStorage.setItem("droms_billing_history", JSON.stringify(updated));
  };

  const handleUpgradeDowngrade = (planName: string) => {
    if (!user) return;
    
    let tier: "free" | "pro" | "enterprise" = "free";
    let amountStr = "$0.00";
    if (planName === "Pro") {
      tier = "pro";
      amountStr = billing === "annual" ? "$182.40" : "$19.00";
    } else if (planName === "Enterprise") {
      tier = "enterprise";
      amountStr = billing === "annual" ? "$470.40" : "$49.00";
    }

    // Update plan in store
    updateAuthUser({ ...user, plan: tier });
    
    // Add billing transaction if it's not a downgrade to free
    if (tier !== "free") {
      const todayStr = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
      const newTransaction: BillingHistoryItem = {
        date: todayStr,
        description: `${planName} Plan - ${billing === "annual" ? "Annual" : "Monthly"}`,
        amount: amountStr,
        status: "paid"
      };
      const updatedHistory = [newTransaction, ...history];
      saveHistory(updatedHistory);
    }
    
    toast.success(`Successfully switched to ${planName} Plan! 🎉`);
  };

  const handleCancelSubscription = () => {
    if (!user) return;
    const confirmCancel = window.confirm("Are you sure you want to cancel your premium subscription? You will lose access to the AI Coach and advanced metrics.");
    if (confirmCancel) {
      updateAuthUser({ ...user, plan: "free" });
      toast.success("Subscription cancelled. Plan downgraded to Free/Starter.");
    }
  };

  // Determine active plan properties
  const userPlan = user?.plan || "free";
  const activePlanName = userPlan === "pro" ? "Pro Plan" : userPlan === "enterprise" ? "Enterprise Plan" : "Starter Plan";
  const activePlanPrice = userPlan === "pro" ? 19 : userPlan === "enterprise" ? 49 : 0;
  const renewalText = userPlan === "free" ? "No renewal (Forever Free)" : "Renews next month";

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900">Subscription</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your plan, billing, and payment methods</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-gradient-purple rounded-2xl p-6 text-white relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Crown className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Current Plan</p>
              <h3 className="text-2xl font-bold font-display">{activePlanName}</h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold font-display">
              ${activePlanPrice}
              <span className="text-lg font-normal text-white/70">
                {userPlan === "free" ? "" : "/mo"}
              </span>
            </p>
            <p className="text-white/70 text-sm flex items-center gap-1 justify-end mt-1">
              <Calendar className="w-3.5 h-3.5" /> {renewalText}
            </p>
          </div>
        </div>
        <div className="relative mt-4 flex gap-3 flex-wrap">
          <button onClick={() => toast.success("Redirecting to Stripe billing portal...")} className="bg-white text-primary-700 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-white/90 transition-colors flex items-center gap-2">
            <CreditCard className="w-4 h-4" /> Manage Billing Method
          </button>
          {userPlan !== "free" && (
            <button onClick={handleCancelSubscription} className="bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
              Cancel Subscription
            </button>
          )}
        </div>
      </div>

      {/* Plan Comparison Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
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
          {PRICING_PLANS.map(plan => {
            // Check if this plan card matches user's current tier
            const isCurrentPlan = 
              (plan.name === "Starter" && userPlan === "free") ||
              (plan.name.toLowerCase() === userPlan);

            return (
              <div key={plan.name} className={cn(
                "rounded-2xl p-5 border-2 relative flex flex-col justify-between shadow-sm transition-all hover:shadow-md",
                isCurrentPlan ? "border-primary-500 bg-primary-50/40" : "border-slate-200"
              )}>
                {isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-wider">
                    Current Plan
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{plan.name}</h4>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-bold font-display text-slate-900">
                      ${billing === "annual" ? Math.round(plan.price * 0.8) : plan.price}
                    </span>
                    <span className="text-slate-500 text-sm">/{plan.period === "forever" ? "forever" : "mo"}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{plan.description}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={() => !isCurrentPlan && handleUpgradeDowngrade(plan.name)}
                  disabled={isCurrentPlan}
                  className={cn(
                    "w-full py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm",
                    isCurrentPlan 
                      ? "bg-slate-200 text-slate-400 cursor-default" 
                      : "bg-primary-600 text-white hover:bg-primary-700 active:scale-95"
                  )}>
                  {isCurrentPlan ? "Active Plan" : plan.price === 0 ? "Downgrade" : "Upgrade"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <h3 className="font-bold text-slate-900">Billing History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/10 border-b border-slate-200">
                {["Date", "Description", "Amount", "Status", ""].map(h => (
                  <th key={h} className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {history.map((item, i) => (
                <tr key={i} className="hover:bg-slate-55/10 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-650 font-medium">{item.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{item.description}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{item.amount}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold uppercase bg-green-55/20 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => toast.success("Invoice downloaded!")} className="text-xs text-primary-600 hover:underline font-semibold">Download PDF</button>
                  </td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-slate-400 italic">No payment receipts available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
