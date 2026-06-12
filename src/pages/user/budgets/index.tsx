import { useState } from "react";
import { Plus, DollarSign, PieChart, TrendingDown, Search, MoreVertical, Filter } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const budgets = [
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
  const [search, setSearch] = useState("");
  const totalAllocated = budgets.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);

  const filtered = budgets.filter(b => b.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">Budget Management</h1>
          <p className="text-slate-500 text-sm mt-1">Monthly spending allocation and tracking</p>
        </div>
        <button onClick={() => toast.success("Budget category added!")} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Budget", value: formatCurrency(totalAllocated), sub: "this month", color: "text-slate-900", icon: DollarSign },
          { label: "Total Spent", value: formatCurrency(totalSpent), sub: `${Math.round((totalSpent / totalAllocated) * 100)}% used`, color: totalSpent > totalAllocated ? "text-red-600" : "text-blue-600", icon: PieChart },
          { label: "Remaining", value: formatCurrency(Math.max(totalAllocated - totalSpent, 0)), sub: "available", color: "text-green-600", icon: DollarSign },
          { label: "Over Budget", value: budgets.filter(b => b.status === "over").length, sub: "categories", color: "text-red-600", icon: TrendingDown },
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
          <span className="text-sm font-bold text-slate-900">{Math.round((totalSpent / totalAllocated) * 100)}%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${totalSpent > totalAllocated ? "bg-red-500" : totalSpent / totalAllocated > 0.85 ? "bg-yellow-500" : "bg-green-500"}`}
            style={{ width: `${Math.min((totalSpent / totalAllocated) * 100, 100)}%` }}
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
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(b => {
                const pct = Math.round((b.spent / b.allocated) * 100);
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
                    <td className="px-6 py-4">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
