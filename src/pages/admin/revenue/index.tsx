import { DollarSign, TrendingUp, Users, CreditCard, MoreVertical } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const revenueData = [
  { month: "Aug 2024", mrr: 198400, newSubs: 1840, churned: 320, net: 1520 },
  { month: "Sep 2024", mrr: 215600, newSubs: 2100, churned: 280, net: 1820 },
  { month: "Oct 2024", mrr: 238900, newSubs: 2450, churned: 310, net: 2140 },
  { month: "Nov 2024", mrr: 256200, newSubs: 2280, churned: 290, net: 1990 },
  { month: "Dec 2024", mrr: 271400, newSubs: 2680, churned: 350, net: 2330 },
  { month: "Jan 2025", mrr: 287400, newSubs: 2890, churned: 380, net: 2510 },
];

const planRevenue = [
  { plan: "Starter", users: 114662, revenue: 0, pct: 0 },
  { plan: "Pro", users: 38420, revenue: 729980, pct: 85.4 },
  { plan: "Enterprise", users: 3760, revenue: 184240, pct: 21.6 },
];

export default function AdminRevenuePage() {
  const currentMRR = 287400;
  const arr = currentMRR * 12;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900">Revenue Analytics</h1>
        <p className="text-slate-500 text-sm mt-1">Monthly recurring revenue and growth metrics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "MRR", value: formatCurrency(currentMRR), sub: "+18.4% MoM", color: "text-green-600" },
          { label: "ARR", value: formatCurrency(arr), sub: "Projected", color: "text-primary-600" },
          { label: "ARPU", value: "$6.83", sub: "Per user/month", color: "text-blue-600" },
          { label: "LTV", value: "$247", sub: "Avg customer value", color: "text-amber-600" },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">{k.label}</p>
            <p className={`text-xl font-bold font-display ${k.color}`}>{k.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Revenue by Plan */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-900">Revenue by Plan</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {["Plan", "Users", "Monthly Revenue", "Revenue Share", ""].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {planRevenue.map(p => (
              <tr key={p.plan} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${p.plan === "Enterprise" ? "bg-amber-100 text-amber-700" : p.plan === "Pro" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"}`}>{p.plan}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">{p.users.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm font-bold text-green-600">{p.revenue > 0 ? formatCurrency(p.revenue) : "Free"}</td>
                <td className="px-6 py-4">
                  {p.pct > 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 rounded-full">
                        <div className="h-full bg-primary-600 rounded-full" style={{ width: `${Math.min(p.pct, 100)}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{p.pct}%</span>
                    </div>
                  ) : <span className="text-xs text-slate-400">—</span>}
                </td>
                <td className="px-6 py-4">
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MRR History */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-900">MRR Growth History</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {["Month", "MRR", "New Subscribers", "Churned", "Net Growth", "Growth Rate"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {revenueData.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-700">{row.month}</td>
                <td className="px-6 py-4 text-sm font-bold text-green-600">{formatCurrency(row.mrr)}</td>
                <td className="px-6 py-4 text-sm text-slate-700">+{row.newSubs.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-red-500">-{row.churned}</td>
                <td className="px-6 py-4 text-sm font-semibold text-primary-600">+{row.net.toLocaleString()}</td>
                <td className="px-6 py-4">
                  {i > 0 ? (
                    <span className="text-xs text-green-600 font-medium">
                      +{(((row.mrr - revenueData[i - 1].mrr) / revenueData[i - 1].mrr) * 100).toFixed(1)}%
                    </span>
                  ) : <span className="text-xs text-slate-400">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
