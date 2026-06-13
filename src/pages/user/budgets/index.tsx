import { useState, useEffect } from "react";
import { Plus, DollarSign, PieChart, TrendingDown, Search, Trash2, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const initialBudgets = [
  { id: "b1", category: "Housing", allocated: 2500, spent: 2300, period: "Monthly", status: "on-track" },
  { id: "b2", category: "Food & Groceries", allocated: 800, spent: 920, period: "Monthly", status: "over" },
  { id: "b3", category: "Transportation", allocated: 400, spent: 310, period: "Monthly", status: "on-track" },
  { id: "b4", category: "Entertainment", allocated: 300, spent: 180, period: "Monthly", status: "on-track" },
  { id: "b5", category: "Healthcare", allocated: 200, spent: 85, period: "Monthly", status: "on-track" },
  { id: "b6", category: "Clothing", allocated: 150, spent: 210, period: "Monthly", status: "over" },
  { id: "b7", category: "Education", allocated: 500, spent: 350, period: "Monthly", status: "on-track" },
  { id: "b8", category: "Subscriptions", allocated: 100, spent: 95, period: "Monthly", status: "on-track" },
  { id: "b9", category: "Personal Care", allocated: 150, spent: 120, period: "Monthly", status: "on-track" },
  { id: "b10", category: "Savings Transfer", allocated: 3000, spent: 3000, period: "Monthly", status: "completed" },
];

export default function BudgetsPage() {
  const [list, setList] = useState<typeof initialBudgets>(() => {
    const cached = localStorage.getItem("droms_budgets_data");
    return cached ? JSON.parse(cached) : initialBudgets;
  });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ category: "", allocated: "", spent: "", period: "Monthly" });

  useEffect(() => {
    localStorage.setItem("droms_budgets_data", JSON.stringify(list));
  }, [list]);

  const totalAllocated = list.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = list.reduce((s, b) => s + b.spent, 0);

  const filtered = list.filter(b => b.category.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = () => {
    if (!form.category || !form.allocated) { toast.error("Please fill required fields"); return; }
    const allocatedNum = parseFloat(form.allocated);
    const spentNum = parseFloat(form.spent) || 0;
    const newBudget = {
      id: `b-${Date.now()}`,
      category: form.category,
      allocated: allocatedNum,
      spent: spentNum,
      period: form.period,
      status: spentNum > allocatedNum ? "over" : spentNum === allocatedNum ? "completed" : "on-track"
    };
    setList(prev => [newBudget, ...prev]);
    toast.success(`Category "${form.category}" added!`);
    setShowModal(false);
    setForm({ category: "", allocated: "", spent: "", period: "Monthly" });
  };

  const handleDelete = (id: string) => {
    const item = list.find(b => b.id === id);
    setList(prev => prev.filter(b => b.id !== id));
    toast.success(`Deleted budget category: ${item?.category}`);
  };

  const handleAddSpent = (id: string, amount: number) => {
    setList(prev => prev.map(b => {
      if (b.id === id) {
        const nextSpent = b.spent + amount;
        const nextStatus = nextSpent > b.allocated ? "over" : nextSpent === b.allocated ? "completed" : "on-track";
        toast.info(`Logged $${amount} spending for ${b.category}`);
        return { ...b, spent: nextSpent, status: nextStatus };
      }
      return b;
    }));
  };

  const usagePercent = totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Budget Management</h1>
          <p className="text-slate-500 text-sm mt-1">Monthly spending allocation and tracking</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Budget", value: formatCurrency(totalAllocated), sub: "this month", color: "text-slate-900", icon: DollarSign },
          { label: "Total Spent", value: formatCurrency(totalSpent), sub: `${usagePercent}% used`, color: totalSpent > totalAllocated ? "text-red-600" : "text-blue-600", icon: PieChart },
          { label: "Remaining", value: formatCurrency(Math.max(totalAllocated - totalSpent, 0)), sub: "available", color: "text-green-600", icon: DollarSign },
          { label: "Over Budget", value: list.filter(b => b.status === "over").length, sub: "categories", color: "text-red-600", icon: TrendingDown },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-slate-500">{kpi.label}</p>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <p className={`text-xl font-bold font-display ${kpi.color}`}>{kpi.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-slate-700">Overall Budget Utilization</span>
          <span className="text-sm font-bold text-slate-900">{usagePercent}%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${totalSpent > totalAllocated ? "bg-red-500" : totalSpent / totalAllocated > 0.85 ? "bg-yellow-500" : "bg-green-500"}`}
            style={{ width: `${Math.min(usagePercent, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>Spent: {formatCurrency(totalSpent)}</span>
          <span>Budget: {formatCurrency(totalAllocated)}</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Search categories..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 bg-white" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Category</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Allocated</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Spent</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Remaining</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Usage</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Period</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(b => {
                const pct = b.allocated > 0 ? Math.round((b.spent / b.allocated) * 100) : 0;
                const remaining = b.allocated - b.spent;
                return (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{b.category}</td>
                    <td className="px-6 py-4 text-sm text-slate-700 font-medium">{formatCurrency(b.allocated)}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{formatCurrency(b.spent)}</td>
                    <td className={`px-6 py-4 text-sm font-medium ${remaining < 0 ? "text-red-600" : "text-green-600"}`}>
                      {remaining < 0 ? `-${formatCurrency(Math.abs(remaining))}` : formatCurrency(remaining)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-200 rounded-full flex-shrink-0">
                          <div className={`h-full rounded-full ${pct > 100 ? "bg-red-500" : pct > 85 ? "bg-yellow-500" : "bg-green-500"}`}
                            style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{b.period}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${b.status === "over" ? "bg-red-100 text-red-700" : b.status === "completed" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                        {b.status === "on-track" ? "On Track" : b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleAddSpent(b.id, 50)}
                          className="text-xs px-2.5 py-1.5 rounded-xl font-bold bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors">
                          +$50 Spent
                        </button>
                        <button onClick={() => handleDelete(b.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold font-display text-slate-900">Add Budget Category</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category Name *</label>
                <input value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. Groceries" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Allocated Budget ($) *</label>
                  <input type="number" value={form.allocated} onChange={e => setForm({...form, allocated: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Initial Spent ($)</label>
                  <input type="number" value={form.spent} onChange={e => setForm({...form, spent: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. 0" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Period</label>
                <select value={form.period} onChange={e => setForm({...form, period: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Annual</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleCreate} className="flex-1 btn-primary py-2.5">Create Category</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
