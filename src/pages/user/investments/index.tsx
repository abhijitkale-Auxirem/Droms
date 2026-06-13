import { useState, useEffect } from "react";
import { Plus, TrendingUp, DollarSign, Trash2, X } from "lucide-react";
import { formatCurrency, getStatusColor } from "@/lib/utils";
import { toast } from "sonner";

const initialInvestments = [
  { id: "i1", name: "S&P 500 Index Fund (VOO)", type: "ETF", invested: 32000, currentValue: 41280, returnPct: 29.0, monthlyContrib: 1000, status: "on-track", risk: "Medium" },
  { id: "i2", name: "Total Market Fund (VTI)", type: "ETF", invested: 18000, currentValue: 22500, returnPct: 25.0, monthlyContrib: 500, status: "on-track", risk: "Medium" },
  { id: "i3", name: "Technology Sector (QQQ)", type: "ETF", invested: 8000, currentValue: 10800, returnPct: 35.0, monthlyContrib: 300, status: "on-track", risk: "High" },
  { id: "i4", name: "Bonds Index (BND)", type: "Bond", invested: 5000, currentValue: 4950, returnPct: -1.0, monthlyContrib: 200, status: "at-risk", risk: "Low" },
  { id: "i5", name: "Real Estate REIT (VNQ)", type: "REIT", invested: 6000, currentValue: 6720, returnPct: 12.0, monthlyContrib: 200, status: "on-track", risk: "Medium" },
  { id: "i6", name: "Crypto Portfolio", type: "Crypto", invested: 4000, currentValue: 5200, returnPct: 30.0, monthlyContrib: 100, status: "at-risk", risk: "Very High" },
];

export default function InvestmentsPage() {
  const [list, setList] = useState<typeof initialInvestments>(() => {
    const cached = localStorage.getItem("droms_investments_data");
    return cached ? JSON.parse(cached) : initialInvestments;
  });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", type: "ETF", invested: "", currentValue: "", monthlyContrib: "", risk: "Medium" });

  useEffect(() => {
    localStorage.setItem("droms_investments_data", JSON.stringify(list));
  }, [list]);

  const totalInvested = list.reduce((s, i) => s + i.invested, 0);
  const totalValue = list.reduce((s, i) => s + i.currentValue, 0);
  const totalReturn = totalValue - totalInvested;
  const returnPct = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  const filtered = list.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.type.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = () => {
    if (!form.name || !form.invested || !form.currentValue) { toast.error("Fill required fields"); return; }
    const invAmt = parseFloat(form.invested);
    const currVal = parseFloat(form.currentValue);
    const returnPct = invAmt > 0 ? parseFloat(((currVal - invAmt) / invAmt * 100).toFixed(1)) : 0;
    
    const newInv = {
      id: `i-${Date.now()}`,
      name: form.name,
      type: form.type,
      invested: invAmt,
      currentValue: currVal,
      returnPct,
      monthlyContrib: parseFloat(form.monthlyContrib) || 0,
      risk: form.risk,
      status: currVal >= invAmt ? "on-track" : "at-risk"
    };

    setList(prev => [newInv, ...prev]);
    toast.success(`Investment "${form.name}" added!`);
    setShowModal(false);
    setForm({ name: "", type: "ETF", invested: "", currentValue: "", monthlyContrib: "", risk: "Medium" });
  };

  const handleDelete = (id: string) => {
    const item = list.find(i => i.id === id);
    setList(prev => prev.filter(i => i.id !== id));
    toast.success(`Deleted position: ${item?.name}`);
  };

  const handleContrib = (id: string, amount: number) => {
    setList(prev => prev.map(inv => {
      if (inv.id === id) {
        const nextInvested = inv.invested + amount;
        const currentProfit = inv.currentValue - inv.invested;
        const nextValue = nextInvested + currentProfit;
        const nextReturnPct = nextInvested > 0 ? parseFloat((currentProfit / nextInvested * 100).toFixed(1)) : 0;
        toast.success(`Logged $${amount} monthly contribution to ${inv.name}`);
        return { ...inv, invested: nextInvested, currentValue: nextValue, returnPct: nextReturnPct };
      }
      return inv;
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Investment Portfolio</h1>
          <p className="text-slate-500 text-sm mt-1">Track your investments and portfolio performance</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Investment
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Invested", value: formatCurrency(totalInvested), color: "text-slate-900" },
          { label: "Portfolio Value", value: formatCurrency(totalValue), color: "text-primary-600" },
          { label: "Total Return", value: `${totalReturn >= 0 ? "+" : ""}${formatCurrency(totalReturn)}`, color: totalReturn >= 0 ? "text-green-600" : "text-red-600" },
          { label: "Return %", value: `${returnPct >= 0 ? "+" : ""}${returnPct.toFixed(1)}%`, color: returnPct >= 0 ? "text-green-600" : "text-red-600" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">{kpi.label}</p>
            <p className={`text-xl font-bold font-display ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <input type="text" placeholder="Search investments..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-4 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 bg-white" />
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
                <th className="px-6 py-4 text-right">Actions</th>
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
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleContrib(inv.id, inv.monthlyContrib || 500)}
                        className="text-xs px-2.5 py-1.5 rounded-xl font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                        Contrib
                      </button>
                      <button onClick={() => handleDelete(inv.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold font-display text-slate-900">Add Investment</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Asset Name *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. S&P 500 ETF (VOO)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Asset Type *</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    <option>ETF</option>
                    <option>Stock</option>
                    <option>Crypto</option>
                    <option>Bond</option>
                    <option>Real Estate</option>
                    <option>Cash</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Risk Profile</label>
                  <select value={form.risk} onChange={e => setForm({...form, risk: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Very High</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Amount Invested ($) *</label>
                  <input type="number" value={form.invested} onChange={e => setForm({...form, invested: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 5000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Value ($) *</label>
                  <input type="number" value={form.currentValue} onChange={e => setForm({...form, currentValue: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 5500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Monthly Contribution ($)</label>
                <input type="number" value={form.monthlyContrib} onChange={e => setForm({...form, monthlyContrib: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 500" />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleCreate} className="flex-1 btn-primary py-2.5">Create Position</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
