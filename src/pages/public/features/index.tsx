import { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { FEATURE_DETAILS, FeatureDetail } from "@/constants";
import FeatureDetailModal from "@/components/common/FeatureDetailModal";

export default function FeaturesPage() {
  const [selectedFeature, setSelectedFeature] = useState<FeatureDetail | null>(null);

  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold font-display text-white mb-6">
            Every Tool You Need to{" "}
            <span className="gradient-text">Achieve Greatness</span>
          </h1>
          <p className="text-slate-300 text-xl">One platform. Infinite possibilities. Your complete personal growth ecosystem.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_DETAILS.map((feature) => {
              const Icon = (Icons as any)[feature.iconName] || Icons.CircleHelp || Icons.Sparkles;
              return (
                <div
                  key={feature.title}
                  onClick={() => setSelectedFeature(feature)}
                  className="group bg-white border border-slate-200 hover:border-primary-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-4">{feature.desc}</p>
                  <div className="flex items-center gap-1 text-primary-600 font-medium text-sm group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-purple text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-display mb-4">Start Using All Features Free</h2>
          <p className="text-white/80 text-xl mb-8">No credit card required. Full access to core features forever.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-8 py-4 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <FeatureDetailModal isOpen={!!selectedFeature} onClose={() => setSelectedFeature(null)} feature={selectedFeature} />
    </div>
  );
}
