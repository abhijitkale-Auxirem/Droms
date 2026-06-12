import { Link } from "react-router-dom";
import { FileText, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { FAQ_ITEMS } from "@/constants";

const extraFAQs = [
  { question: "Does Droms integrate with other apps?", answer: "Yes! Droms integrates with Google Calendar, Apple Health, Notion, Slack, and 50+ other tools via our native integrations and Zapier connection." },
  { question: "Can I use Droms offline?", answer: "Core features like habit tracking and journaling work offline. Your data syncs automatically when you reconnect to the internet." },
  { question: "How does the AI Coach learn my preferences?", answer: "The AI builds your profile from your goals, habits, responses, and behavior patterns over time. The more you use Droms, the more personalized it becomes." },
  { question: "Is there a mobile app?", answer: "Yes! Droms is available on iOS and Android with full feature parity to the web app, including offline capability and push notifications." },
];

const allFAQs = [...FAQ_ITEMS, ...extraFAQs];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900 pr-4">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
            <FileText className="w-4 h-4" /> Frequently Asked Questions
          </div>
          <h1 className="text-5xl font-bold font-display text-white mb-4">Got Questions?</h1>
          <p className="text-slate-300 text-xl">Everything you need to know about Droms. Can't find what you need? <Link to="/contact" className="text-primary-400 hover:underline">Contact us</Link>.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="space-y-4">
            {allFAQs.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>

          <div className="mt-16 text-center bg-gradient-to-r from-primary-50 to-blue-50 rounded-3xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold font-display text-slate-900 mb-3">Still have questions?</h3>
            <p className="text-slate-500 mb-6">Our team is available 24/7 to help you get the most out of Droms.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="btn-primary px-6 py-3">Contact Support</Link>
              <Link to="/register" className="bg-white border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:shadow-md transition-all flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
