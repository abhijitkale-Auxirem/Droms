import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { login } from "@/lib/auth";
import { toast } from "sonner";

export default function OTPLoginPage() {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { login: storeLogin } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.match(/^\+?[1-9]\d{9,14}$/)) { toast.error("Enter a valid phone number"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setStep("otp");
    setResendTimer(30);
    setLoading(false);
    toast.success(`OTP sent to ${phone}`);
  };

  const verifyOTP = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const result = login("demo@droms.ai", "Demo@123");
    if (result.success && result.user) {
      storeLogin(result.user);
      toast.success("Welcome back!");
      navigate("/dashboard", { replace: true });
    }
    setLoading(false);
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (newOtp.join("").length === 6) setTimeout(verifyOTP, 100);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus();
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
        {step === "phone" ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-display text-slate-900">Login with Mobile</h2>
              <p className="text-slate-500 mt-1 text-sm">Enter your mobile number to receive a one-time password.</p>
            </div>
            <form onSubmit={sendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Send OTP <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-display text-slate-900">Enter OTP</h2>
              <p className="text-slate-500 mt-1 text-sm">We sent a 6-digit code to <strong>{phone}</strong>. Use <strong>123456</strong> as demo.</p>
            </div>
            <div className="flex gap-2 justify-center mb-6">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOTPChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className="w-12 h-12 text-center text-xl font-bold rounded-xl border-2 border-slate-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-slate-900"
                />
              ))}
            </div>
            <button onClick={verifyOTP} disabled={loading || otp.join("").length !== 6} className="w-full btn-primary py-3 flex items-center justify-center gap-2 mb-4">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Verify & Login <ArrowRight className="w-4 h-4" /></>}
            </button>
            <div className="flex items-center justify-between text-sm">
              <button onClick={() => { setStep("phone"); setOtp(["", "", "", "", "", ""]); }} className="text-slate-500 hover:text-slate-700">Change Number</button>
              {resendTimer > 0 ? (
                <span className="text-slate-400">Resend in {resendTimer}s</span>
              ) : (
                <button onClick={() => { setResendTimer(30); toast.success("OTP resent!"); }} className="text-primary-600 flex items-center gap-1 hover:underline">
                  <RefreshCw className="w-3.5 h-3.5" /> Resend OTP
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
