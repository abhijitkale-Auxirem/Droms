import { useNavigate } from "react-router-dom";
import * as Icons from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FeatureDetail } from "@/constants";

interface FeatureDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: FeatureDetail | null;
}

export default function FeatureDetailModal({ isOpen, onClose, feature }: FeatureDetailModalProps) {
  const navigate = useNavigate();
  if (!feature) return null;

  // Dynamically resolve the Lucide icon from iconName string
  const LucideIcon = (Icons as any)[feature.iconName] || Icons.CircleHelp || Icons.Sparkles;

  const handleCtaClick = () => {
    onClose();
    navigate("/register");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-slate-900 border-white/10 rounded-3xl shadow-2xl text-slate-100">
        <DialogTitle className="sr-only">{feature.title} Detail</DialogTitle>
        <DialogDescription className="sr-only">
          Explore detailed capabilities, benefits, and screenshots of our {feature.title} feature.
        </DialogDescription>
        <div className="grid md:grid-cols-2">
          {/* Left Column: Image and gradient banner */}
          <div className="relative h-64 md:h-full min-h-[300px] flex items-center justify-center overflow-hidden">
            <img
              src={feature.imageUrl}
              alt={feature.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent`} />
            <div className="relative z-10 p-8 flex flex-col justify-end h-full w-full">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg mb-4`}>
                <LucideIcon className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Feature Spotlight</span>
              <h3 className="text-3xl font-bold font-display text-white">{feature.title}</h3>
            </div>
          </div>

          {/* Right Column: Detailed info and benefits */}
          <div className="p-8 flex flex-col justify-between bg-slate-900">
            <div className="space-y-6">
              <div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">Key Benefits</h4>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Icons.CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCtaClick}
                className={`flex-1 py-3 px-6 rounded-xl text-center font-bold text-white bg-gradient-to-r ${feature.color} hover:opacity-90 shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
              >
                {feature.ctaText}
              </button>
              <button
                onClick={onClose}
                className="py-3 px-6 rounded-xl text-center font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
