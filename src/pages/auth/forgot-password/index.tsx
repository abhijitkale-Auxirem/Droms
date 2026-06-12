import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
    toast.success("Reset link sent! Check your email.");
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
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>
        {!sent ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-display text-slate-900">Reset Password</h2>
              <p className="text-slate-500 mt-1 text-sm">Enter your email and we'll send you a reset link.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Send Reset Link <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900 mb-2">Check Your Email</h3>
            <p className="text-slate-500 text-sm mb-6">We sent a password reset link to <strong>{email}</strong>. Check your inbox and spam folder.</p>
            <button onClick={() => { setSent(false); setEmail(""); }} className="text-primary-600 text-sm hover:underline block mb-4">Didn't receive it? Resend</button>
            <button onClick={() => navigate("/login")} className="w-full btn-primary py-3">Back to Login</button>
          </div>
        )}
      </div>
    </div>
  );
}
