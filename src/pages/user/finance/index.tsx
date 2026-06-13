import { useState, useEffect } from "react";
import { mockFinancialGoals, financialChartData } from "@/data/mockData";
import { getStatusColor, getProgressColor, formatCurrency, cn } from "@/lib/utils";
import { TrendingUp, Plus, DollarSign, X } from "lucide-react";
import { toast } from "sonner";
import type { FinancialGoal } from "@/types";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function FinancePage() {
  const [goals, setGoals] = useState<FinancialGoal[]>(() => {
    const cached = localStorage.getItem("droms_financial_goals");
    return cached ? JSON.parse(cached) : mockFinancialGoals;
  });
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", type: "savings" as FinancialGoal["type"], targetAmount: "", currentAmount: "", deadline: "" });

  useEffect(() => {
    localStorage.setItem("droms_financial_goals", JSON.stringify(goals));
  }, [goals]);

  const totalTarget = goals.reduce((a, g) => a + g.targetAmount, 0);
  const totalCurrent = goals.reduce((a, g) => a + g.currentAmount, 0);
  const overallProgress = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0;

  const handleCreate = () => {
    if (!form.title || !form.targetAmount || !form.deadline) { toast.error("Fill required fields"); return; }
    const newGoal: FinancialGoal = {
      id: `f${Date.now()}`, title: form.title, type: form.type,
      targetAmount: Number(form.targetAmount), currentAmount: Number(form.currentAmount) || 0,
      deadline: form.deadline, status: "on-track"
    };
    setGoals(prev => [newGoal, ...prev]);
    toast.success("Financial goal created! 💰");
    setShowModal(false);
    setForm({ title: "", type: "savings", targetAmount: "", currentAmount: "", deadline: "" });
  };

  const handleDeposit = (id: string, amount: number) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        const nextAmt = Math.min(g.targetAmount, g.currentAmount + amount);
        const nextStatus = nextAmt >= g.targetAmount ? "completed" : g.status;
        toast.success(`Deposited $${amount} into ${g.title}! 💰`);
        return { ...g, currentAmount: nextAmt, status: nextStatus };
      }
      return g;
    }));
  };

  const handleDelete = (id: string) => {
    const item = goals.find(g => g.id === id);
    setGoals(prev => prev.filter(g => g.id !== id));
    toast.success(`Deleted financial goal: ${item?.title}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary-600" /> Financial Goals
          </h1>
          <p className="text-slate-500 mt-0.5">Track your path to financial freedom</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Goal
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Target", value: formatCurrency(totalTarget), color: "text-slate-700" },
          { label: "Current Progress", value: formatCurrency(totalCurrent), color: "text-primary-600" },
          { label: "Overall Progress", value: `${overallProgress}%`, color: "text-green-600" },
          { label: "Goals On Track", value: goals.filter(g => g.status === "on-track").length, color: "text-blue-600" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className={`text-xl font-bold font-display mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h2 className="font-semibold text-slate-900 mb-4">Wealth Growth Timeline</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={financialChartData}>
            <defs>
              <linearGradient id="invGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="savGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }} formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
            <Area type="monotone" dataKey="investments" stroke="#7C3AED" strokeWidth={2} fill="url(#invGrad)" name="Investments" />
            <Area type="monotone" dataKey="savings" stroke="#22C55E" strokeWidth={2} fill="url(#savGrad)" name="Savings" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Goals Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Financial Goals</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Goal</th>
                <th>Type</th>
                <th>Current</th>
                <th>Target</th>
                <th className="w-44">Progress</th>
                <th>Deadline</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {goals.map(goal => {
                const pct = Math.round((goal.currentAmount / goal.targetAmount) * 100);
                return (
                  <tr key={goal.id}>
                    <td className="font-medium text-slate-800">{goal.title}</td>
                    <td><span className={cn("status-badge capitalize",
                      goal.type === "savings" ? "bg-green-100 text-green-700" :
                      goal.type === "investment" ? "bg-blue-100 text-blue-700" :
                      goal.type === "debt" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    )}>{goal.type}</span></td>
                    <td className="font-semibold text-slate-800">{formatCurrency(goal.currentAmount)}</td>
                    <td className="text-slate-600">{formatCurrency(goal.targetAmount)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar flex-1"><div className={`progress-fill ${getProgressColor(pct)}`} style={{ width: `${pct}%` }} /></div>
                        <span className="text-xs text-slate-500 w-8">{pct}%</span>
                      </div>
                    </td>
                    <td className="text-sm text-slate-600">{goal.deadline}</td>
                    <td><span className={`status-badge ${getStatusColor(goal.status)}`}>{goal.status}</span></td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {goal.status !== "completed" && (
                          <button onClick={() => handleDeposit(goal.id, 500)}
                            className="text-xs px-2.5 py-1.5 rounded-xl font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                            +$500
                          </button>
                        )}
                        <button onClick={() => handleDelete(goal.id)}
                          className="text-xs px-2.5 py-1.5 rounded-xl font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                          Delete
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
              <h2 className="text-lg font-bold font-display text-slate-900">New Financial Goal</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Goal Name *</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="e.g. Emergency Fund" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
                <select value={form.type} onChange={e => setForm({...form, type: e.target.value as FinancialGoal["type"]})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                  <option value="savings">Savings</option>
                  <option value="investment">Investment</option>
                  <option value="debt">Debt Reduction</option>
                  <option value="budget">Budget</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Target Amount *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="number" value={form.targetAmount} onChange={e => setForm({...form, targetAmount: e.target.value})}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="50000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="number" value={form.currentAmount} onChange={e => setForm({...form, currentAmount: e.target.value})}
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" placeholder="0" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Target Date *</label>
                <input type="date" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleCreate} className="flex-1 btn-primary py-2.5">Create Goal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
