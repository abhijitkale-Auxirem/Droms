import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error("Passwords do not match"); return; }
    if (form.password.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setDone(true);
    setLoading(false);
    toast.success("Password reset successfully!");
  };

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-8 lg:hidden">
        <div className="w-9 h-9 rounded-xl bg-gradient-purple flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold font-display text-white">Droms</span>
      </div>
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        {!done ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-display text-slate-900">Set New Password</h2>
              <p className="text-slate-500 mt-1 text-sm">Choose a strong password for your Droms account.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type={showPassword ? "text" : "password"} value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })} required minLength={8}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm"
                    placeholder="At least 8 characters" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="password" value={form.confirm}
                    onChange={e => setForm({ ...form, confirm: e.target.value })} required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm"
                    placeholder="Repeat your password" />
                </div>
              </div>
              <div className="space-y-1">
                {[
                  { label: "At least 8 characters", met: form.password.length >= 8 },
                  { label: "Passwords match", met: form.password === form.confirm && form.confirm.length > 0 },
                ].map(r => (
                  <div key={r.label} className={`flex items-center gap-2 text-xs ${r.met ? "text-green-600" : "text-slate-400"}`}>
                    <CheckCircle className={`w-3.5 h-3.5 ${r.met ? "text-green-600" : "text-slate-300"}`} />
                    {r.label}
                  </div>
                ))}
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Reset Password <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900 mb-2">Password Reset!</h3>
            <p className="text-slate-500 text-sm mb-6">Your password has been updated. Log in to continue your journey.</p>
            <button onClick={() => navigate("/login")} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
              Go to Login <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
