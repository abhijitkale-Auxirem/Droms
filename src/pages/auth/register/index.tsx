import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import { login } from "@/lib/auth";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", agree: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login: storeLogin } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree) { toast.error("Please agree to terms"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const result = login(form.email, form.password);
    if (result.success && result.user) {
      const user = { ...result.user, name: form.name };
      storeLogin(user);
      toast.success("Account created! Welcome to Droms 🚀");
      navigate("/dashboard", { replace: true });
    } else {
      toast.error(result.error || "Registration failed");
    }
    setLoading(false);
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-display text-slate-900">Create your account</h2>
          <p className="text-slate-500 mt-1 text-sm">Start your dream journey for free</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm"
                placeholder="Alex Morgan" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm"
                placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type={showPassword ? "text" : "password"} value={form.password} onChange={e => setForm({...form, password: e.target.value})} required
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm"
                placeholder="Min. 6 characters" minLength={6} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <input type="checkbox" id="agree" checked={form.agree} onChange={e => setForm({...form, agree: e.target.checked})}
              className="w-4 h-4 mt-0.5 text-primary-600 rounded border-slate-300" />
            <label htmlFor="agree" className="text-sm text-slate-600">
              I agree to the <Link to="/terms" className="text-primary-600 hover:underline">Terms of Service</Link> and{" "}
              <Link to="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
            </label>
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">or sign up with</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {["Google", "Apple", "LinkedIn", "Microsoft"].map(p => (
            <button key={p} className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm text-slate-700">
              {p}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account? <Link to="/login" className="text-primary-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
