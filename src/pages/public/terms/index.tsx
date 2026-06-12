import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="pt-20">
      <section className="py-16 bg-gradient-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
            <FileText className="w-4 h-4" /> Terms of Service
          </div>
          <h1 className="text-4xl font-bold font-display text-white mb-4">Terms of Service</h1>
          <p className="text-slate-300">Last updated: January 15, 2025. Effective: January 15, 2025.</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <p className="text-slate-600 leading-relaxed mb-8">Welcome to Droms. By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully before using the platform.</p>
          <div className="space-y-8">
            {[
              { title: "1. Acceptance of Terms", content: "By creating an account or using Droms, you agree to these Terms of Service and our Privacy Policy. If you are using Droms on behalf of an organization, you agree to these terms on behalf of that organization. These terms constitute a legally binding agreement between you and Droms Inc." },
              { title: "2. Account Registration", content: "You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account and password. You must notify us immediately of any unauthorized use. Accounts are personal and may not be transferred without our written permission. You must be at least 16 years old to create an account." },
              { title: "3. Acceptable Use", content: "You agree not to use Droms to: upload malicious content or malware, harass or harm other users, violate any applicable laws or regulations, attempt to gain unauthorized access to our systems, scrape or extract data without permission, impersonate other users or Droms staff, or use the service for commercial purposes without an appropriate plan." },
              { title: "4. Subscription & Billing", content: "Paid plans are billed monthly or annually as selected. All fees are non-refundable except as required by law or as stated in our refund policy. We may change pricing with 30 days notice. You may cancel anytime and retain access through the end of your billing period. Enterprise agreements are governed by separate contracts." },
              { title: "5. Intellectual Property", content: "Droms and its original content, features, and functionality are owned by Droms Inc. and are protected by international copyright, trademark, and other intellectual property laws. You retain ownership of all content you create within the platform. By submitting content, you grant Droms a license to display and use that content in connection with the service." },
              { title: "6. Disclaimer & Limitation of Liability", content: "Droms provides tools for personal goal tracking and planning. We do not provide professional financial, medical, legal, or therapeutic advice. The AI coaching feature is an educational tool and should not replace professional consultation. Droms is not liable for any indirect, incidental, or consequential damages arising from your use of the service." },
              { title: "7. Termination", content: "We may terminate or suspend your account for violations of these terms. You may delete your account at any time from settings. Upon termination, your right to use the service ceases. You may request a data export before deletion. Sections on IP, disclaimers, and governing law survive termination." },
              { title: "8. Governing Law", content: "These terms are governed by the laws of California, USA, without regard to conflict of law principles. Any disputes shall be resolved in the courts of San Francisco County, California, or through binding arbitration as outlined in our arbitration policy." },
            ].map(section => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-slate-900 mb-3 font-display">{section.title}</h2>
                <p className="text-slate-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-600">Questions about these terms? Contact us at <a href="mailto:legal@droms.ai" className="text-primary-600 hover:underline">legal@droms.ai</a> or visit our <Link to="/contact" className="text-primary-600 hover:underline">Contact page</Link>.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
