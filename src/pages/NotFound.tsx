import { Link } from "react-router-dom";
import { Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-gradient-purple flex items-center justify-center mx-auto mb-6 shadow-glow-purple">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-8xl font-bold font-display text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold font-display text-white mb-3">Page Not Found</h2>
        <p className="text-slate-400 mb-8">This page doesn't exist yet. But your dreams do — let's get back to building them.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link to="/dashboard" className="flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
