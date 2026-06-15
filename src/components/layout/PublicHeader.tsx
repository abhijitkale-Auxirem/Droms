import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Features",
    href: "/features",
    dropdown: [
      { label: "AI Success Coach", href: "/ai-coach", desc: "Personalized AI guidance" },
      { label: "Goal Planning", href: "/goal-planning", desc: "Turn dreams into plans" },
      { label: "Vision Board Studio", href: "/vision-board", desc: "Visual manifestation" },
      { label: "Habit Tracker", href: "/habit-tracking", desc: "Build powerful habits" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    dropdown: [
      { label: "Career Growth", href: "/career-growth", desc: "Advance professionally" },
      { label: "Financial Planning", href: "/financial-planning", desc: "Build wealth systematically" },
      { label: "Wellness Center", href: "/wellness", desc: "Holistic life balance" },
      { label: "Learning Academy", href: "/academy", desc: "Continuous growth" },
    ],
  },
  { label: "Community", href: "/community" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export default function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "nav-blur shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-purple flex items-center justify-center shadow-glow-purple group-hover:shadow-lg transition-all">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display gradient-text">Droms</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative text-white"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  onClick={() => setActiveDropdown(null)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isScrolled ? "text-white hover:text-primary-600 hover:bg-primary-50" : "text-slate-700 hover:text-primary-600 hover:bg-white/70"
                  )}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                </Link>

                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 w-64 z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 animate-fade-in-up">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-primary-50 transition-colors group"
                        >
                          <span className="text-sm font-medium text-slate-800 group-hover:text-primary-600">{sub.label}</span>
                          <span className="text-xs text-slate-500 mt-0.5">{sub.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <button onClick={() => navigate("/dashboard")} className="btn-primary text-sm py-2.5">
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link to="/login" className={cn(
                  "text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-200",
                  isScrolled ? "text-slate-700 hover:text-primary-600" : "text-slate-700 hover:text-primary-600"
                )}>
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2.5">
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4 animate-fade-in-up">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-slate-100 mt-4 pt-4 px-4 flex flex-col gap-2">
              {isAuthenticated ? (
                <button onClick={() => { navigate("/dashboard"); setMobileOpen(false); }} className="btn-primary text-sm text-center">
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-ghost text-sm text-center">Login</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary text-sm text-center">Get Started Free</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
