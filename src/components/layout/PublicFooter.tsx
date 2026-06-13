import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Twitter, Instagram, Linkedin, Youtube, Github, Mail, Phone, MapPin } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Product: [
    { label: "Features", href: "/features" },
    { label: "AI Coach", href: "/ai-coach" },
    { label: "Goal Planning", href: "/goal-planning" },
    { label: "Vision Board", href: "/vision-board" },
    { label: "Pricing", href: "/pricing" },
  ],
  Resources: [
    { label: "Learning Academy", href: "/academy" },
    { label: "Success Stories", href: "/success-stories" },
    { label: "Community", href: "/community" },
    { label: "Help Center", href: "/help" },
    { label: "API Docs", href: "/docs" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/security" },
  ],
};

export default function PublicFooter() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      navigate(`/register?email=${encodeURIComponent(email)}`);
    } else {
      navigate("/register");
    }
  };

  return (
    <footer className="bg-droms-dark text-slate-300 relative overflow-hidden">
      {/* Wave Top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path d="M0,30 Q360,60 720,30 Q1080,0 1440,30 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative pt-20 pb-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Newsletter */}
        <div className="bg-gradient-purple rounded-3xl p-8 md:p-12 mb-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 rounded-3xl" />
          <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-3 relative">
            Start Your Dream Journey Today
          </h3>
          <p className="text-white/80 mb-6 relative">Join 156,000+ achievers transforming their dreams into reality</p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
            {/* <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-white/60"
            /> */}
            <button type="submit" className="bg-accent hover:bg-yellow-500 text-droms-dark font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
              Get Started Free
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-purple flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display text-white">Droms</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Transform your dreams into reality through AI-powered goal planning and personal growth.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, href: SOCIAL_LINKS.twitter, label: "Twitter" },
                { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
                { Icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
                { Icon: Youtube, href: SOCIAL_LINKS.youtube, label: "YouTube" },
                { Icon: Github, href: SOCIAL_LINKS.github, label: "GitHub" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold mb-4 text-sm">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-slate-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block transition-transform">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-6 mb-8 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary-400" />
            <span>hello@droms.ai</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary-400" />
            <span>+1 (888) 376-6700</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary-400" />
            <span>San Francisco, CA 94105</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 Droms Inc. All rights reserved. Transforming dreams since 2024.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
