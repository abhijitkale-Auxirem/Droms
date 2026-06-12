import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, Smartphone } from "lucide-react";
import { login } from "@/lib/auth";
import { useAuthStore } from "@/store/authStore";
import { DEMO_EMAIL, DEMO_PASSWORD } from "@/constants";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "otp">("email");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");

  const { login: storeLogin, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = login(email, password);
    if (result.success && result.user) {
      storeLogin(result.user);
      toast.success("Welcome back to Droms! 🚀");
      navigate("/dashboard", { replace: true });
    } else {
      toast.error(result.error || "Login failed");
    }
    setLoading(false);
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(DEMO_EMAIL, DEMO_PASSWORD);
    if (result.success && result.user) {
      storeLogin(result.user);
      toast.success("Welcome to Droms Demo! 🌟");
      navigate("/dashboard", { replace: true });
    }
    setLoading(false);
  };

  const handleOtpInput = (i: number, val: string) => {
    if (val.length > 1) return;
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < 5) {
      document.getElementById(`otp-${i + 1}`)?.focus();
    }
  };

  const handleSendOtp = async () => {
    if (!phone) { toast.error("Enter your phone number"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setOtpSent(true);
    setLoading(false);
    toast.success("OTP sent to " + phone);
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 6) { toast.error("Enter complete OTP"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = login(DEMO_EMAIL, DEMO_PASSWORD);
    if (result.success && result.user) {
      storeLogin(result.user);
      toast.success("Welcome to Droms! 🎉");
      navigate("/dashboard", { replace: true });
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: string) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const result = login(DEMO_EMAIL, DEMO_PASSWORD);
    if (result.success && result.user) {
      storeLogin(result.user);
      toast.success(`Signed in with ${provider}! 🎉`);
      navigate("/dashboard", { replace: true });
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Logo (mobile) */}
      <div className="flex items-center gap-2.5 mb-8 lg:hidden">
        <div className="w-9 h-9 rounded-xl bg-gradient-purple flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold font-display text-white">Droms</span>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-display text-slate-900">Welcome back</h2>
          <p className="text-slate-500 mt-1 text-sm">Sign in to continue your dream journey</p>
        </div>

        {/* Demo Banner */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-200 rounded-xl p-3 mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-primary-700">Demo Account Ready</p>
            <p className="text-xs text-slate-500">{DEMO_EMAIL} / {DEMO_PASSWORD}</p>
          </div>
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="bg-primary-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-1"
          >
            Demo Login <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Method Toggle */}
        <div className="flex rounded-xl border border-slate-200 p-1 mb-5">
          {[
            { id: "email", label: "Email", Icon: Mail },
            { id: "otp", label: "Mobile OTP", Icon: Smartphone },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setLoginMethod(id as "email" | "otp")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                loginMethod === id ? "bg-primary-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-800"
              )}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {loginMethod === "email" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all text-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-primary-600 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all text-sm"
                  placeholder="Enter password"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-primary-600 rounded border-slate-300"
              />
              <label htmlFor="remember" className="text-sm text-slate-600">Remember me for 30 days</label>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 py-3">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {!otpSent ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 transition-all text-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
                <button onClick={handleSendOtp} disabled={loading} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                  {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Send OTP"}
                </button>
              </>
            ) : (
              <>
                <p className="text-sm text-slate-600">Enter the 6-digit code sent to {phone}</p>
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpInput(i, e.target.value)}
                      className="w-11 h-12 text-center text-lg font-bold border border-slate-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                    />
                  ))}
                </div>
                <button onClick={handleVerifyOtp} disabled={loading} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                  {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Verify OTP"}
                </button>
                <button onClick={() => setOtpSent(false)} className="w-full text-sm text-slate-500 hover:text-primary-600">
                  Change number
                </button>
              </>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400">or continue with</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Google", icon: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg", provider: "Google" },
            { label: "Apple", icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", provider: "Apple" },
            { label: "LinkedIn", icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png", provider: "LinkedIn" },
            { label: "Microsoft", icon: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", provider: "Microsoft" },
          ].map(({ label, icon, provider }) => (
            <button
              key={provider}
              onClick={() => handleSocialLogin(provider)}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm text-slate-700"
            >
              <img src={icon} alt={label} className="w-4 h-4 object-contain" />
              {label}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary-600 font-medium hover:underline">Sign up free</Link>
        </p>
      </div>
    </div>
  );
}
