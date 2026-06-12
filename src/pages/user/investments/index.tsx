import { useState } from "react";
import { Plus, TrendingUp, DollarSign, BarChart2, MoreVertical, Search } from "lucide-react";
import { formatCurrency, getStatusColor } from "@/lib/utils";
import { toast } from "sonner";

const investments = [
  { id: "i1", name: "S&P 500 Index Fund (VOO)", type: "ETF", invested: 32000, currentValue: 41280, returnPct: 29.0, monthlyContrib: 1000, status: "on-track", risk: "Medium" },
  { id: "i2", name: "Total Market Fund (VTI)", type: "ETF", invested: 18000, currentValue: 22500, returnPct: 25.0, monthlyContrib: 500, status: "on-track", risk: "Medium" },
  { id: "i3", name: "Technology Sector (QQQ)", type: "ETF", invested: 8000, currentValue: 10800, returnPct: 35.0, monthlyContrib: 300, status: "on-track", risk: "High" },
  { id: "i4", name: "Bonds Index (BND)", type: "Bond", invested: 5000, currentValue: 4950, returnPct: -1.0, monthlyContrib: 200, status: "at-risk", risk: "Low" },
  { id: "i5", name: "Real Estate REIT (VNQ)", type: "REIT", invested: 6000, currentValue: 6720, returnPct: 12.0, monthlyContrib: 200, status: "on-track", risk: "Medium" },
  { id: "i6", name: "Crypto Portfolio", type: "Crypto", invested: 4000, currentValue: 5200, returnPct: 30.0, monthlyContrib: 100, status: "at-risk", risk: "Very High" },
];

export default function InvestmentsPage() {
  const [search, setSearch] = useState("");
  const totalInvested = investments.reduce((s, i) => s + i.invested, 0);
  const totalValue = investments.reduce((s, i) => s + i.currentValue, 0);
  const totalReturn = totalValue - totalInvested;
  const returnPct = (totalReturn / totalInvested) * 100;

  const filtered = investments.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.type.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Investment Portfolio</h1>
          <p className="text-slate-500 text-sm mt-1">Track your investments and portfolio performance</p>
        </div>
        <button onClick={() => toast.success("Investment position added!")} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Investment
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Invested", value: formatCurrency(totalInvested), color: "text-slate-900" },
          { label: "Portfolio Value", value: formatCurrency(totalValue), color: "text-primary-600" },
          { label: "Total Return", value: `+${formatCurrency(totalReturn)}`, color: "text-green-600" },
          { label: "Return %", value: `+${returnPct.toFixed(1)}%`, color: "text-green-600" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
            <p className={`text-xl font-bold font-display ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Search investments..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 bg-white" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Investment</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Type</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Invested</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Current Value</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Return</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Monthly</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Risk</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Status</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 max-w-[200px]">{inv.name}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{inv.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{formatCurrency(inv.invested)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{formatCurrency(inv.currentValue)}</td>
                  <td className={`px-6 py-4 text-sm font-bold ${inv.returnPct >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {inv.returnPct >= 0 ? "+" : ""}{inv.returnPct}%
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{formatCurrency(inv.monthlyContrib)}/mo</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      inv.risk === "Low" ? "bg-green-100 text-green-700" :
                      inv.risk === "Medium" ? "bg-yellow-100 text-yellow-700" :
                      inv.risk === "High" ? "bg-orange-100 text-orange-700" :
                      "bg-red-100 text-red-700"}`}>
                      {inv.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(inv.status)}`}>
                      {inv.status === "on-track" ? "On Track" : "At Risk"}
                    </span>
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
      </div>
    </div>
  );
}
