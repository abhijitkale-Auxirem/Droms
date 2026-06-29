import { Link } from "react-router-dom";
import { Shield, Lock, Eye, CheckCircle } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="overflow-hidden">
      <section className="py-16 bg-gradient-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
            <Shield className="w-4 h-4" /> Privacy Policy
          </div>
          <h1 className="text-4xl font-bold font-display text-white mb-4">Your Privacy Matters</h1>
          <p className="text-slate-300">Last updated: January 15, 2025</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="flex gap-6 mb-12 flex-wrap">
            {[
              { icon: Lock, title: "End-to-End Encryption", desc: "All your data encrypted in transit and at rest" },
              { icon: Eye, title: "No Data Selling", desc: "We never sell or share your personal data" },
              { icon: CheckCircle, title: "You Own Your Data", desc: "Export or delete everything at any time" },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3 flex-1 min-w-[200px] bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="prose prose-slate max-w-none">
            {[
              { title: "1. Information We Collect", content: "We collect information you provide directly to us, such as when you create an account, set goals, or contact support. This includes: name, email address, profile information, goal and dream data, habit tracking data, usage analytics, and device information. We do not collect financial account numbers or sensitive medical data." },
              { title: "2. How We Use Your Information", content: "We use your information to: provide and improve our services, personalize your experience, power AI coaching recommendations, send notifications and reminders, communicate about updates and features, analyze usage patterns to improve the platform, and ensure security and prevent fraud." },
              { title: "3. Data Storage & Security", content: "Your data is stored on enterprise-grade infrastructure with AES-256 encryption. We use TLS 1.3 for all data transmission. Access to production systems is restricted, logged, and audited. We undergo regular security audits and penetration testing. Our infrastructure is SOC 2 Type II certified." },
              { title: "4. Data Sharing", content: "We never sell your personal data. We may share data with: service providers who assist in operating the platform (under strict confidentiality agreements), when required by law or legal process, with your explicit consent for specific sharing features. All third-party partners are GDPR compliant." },
              { title: "5. Your Rights", content: "You have the right to: access all data we hold about you, export your data in JSON or CSV format, correct inaccurate information, delete your account and all associated data, opt out of marketing communications, restrict certain types of data processing, and lodge a complaint with your local data protection authority." },
              { title: "6. Cookies & Tracking", content: "We use essential cookies for authentication and preferences. Optional analytics cookies (which you can disable) help us improve the platform. We do not use third-party advertising cookies. You can manage cookie preferences in your account settings." },
              { title: "7. Contact Us", content: "For privacy questions or to exercise your rights, contact our Privacy Officer at privacy@droms.ai or write to: Droms Inc., 123 Innovation Drive, San Francisco, CA 94105, USA. We respond to all requests within 30 days." },
            ].map(section => (
              <div key={section.title} className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-3 font-display">{section.title}</h2>
                <p className="text-slate-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
