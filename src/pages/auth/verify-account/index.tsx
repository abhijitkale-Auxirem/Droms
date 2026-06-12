import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, CheckCircle, ArrowRight, Mail } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { login } from "@/lib/auth";
import { toast } from "sonner";

export default function VerifyAccountPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: storeLogin } = useAuthStore();
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const result = login("demo@droms.ai", "Demo@123");
    if (result.success && result.user) {
      storeLogin(result.user);
      toast.success("Account verified! Welcome to Droms 🎉");
      navigate("/dashboard", { replace: true });
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
      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-900 mb-2">Verify Your Email</h2>
        <p className="text-slate-500 text-sm mb-6">Enter the 6-digit verification code sent to your email address.</p>
        <form onSubmit={handleVerify} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Verification Code</label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              maxLength={6}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm text-center text-2xl tracking-[0.5em] font-bold"
              placeholder="000000"
            />
            <p className="text-xs text-slate-400 mt-1.5 text-center">Enter any code (demo mode)</p>
          </div>
          <button type="submit" disabled={loading || code.length < 6} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Verify Account <CheckCircle className="w-4 h-4" /></>}
          </button>
        </form>
        <button onClick={handleVerify} className="mt-4 text-sm text-primary-600 hover:underline">Skip verification (Demo)</button>
      </div>
    </div>
  );
}
