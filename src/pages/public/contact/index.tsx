import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="overflow-hidden">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold font-display text-white mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-slate-300 text-xl">We'd love to hear from you. Our team responds within 24 hours.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold font-display text-slate-900 mb-8">Contact Information</h2>
              <div className="space-y-6 mb-10">
                {[
                  { icon: Mail, label: "Email Us", value: "hello@droms.ai", sub: "We reply within 24 hours" },
                  { icon: Phone, label: "Call Us", value: "+1 (888) 376-6700", sub: "Mon-Fri, 9am-6pm PST" },
                  { icon: MapPin, label: "Visit Us", value: "San Francisco, CA 94105", sub: "125 Market Street, Suite 400" },
                  { icon: MessageSquare, label: "Live Chat", value: "Available in the app", sub: "AI + human support 24/7" },
                ].map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{label}</p>
                      <p className="text-slate-700">{value}</p>
                      <p className="text-sm text-slate-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
                <h3 className="font-semibold text-slate-900 mb-2">For Enterprise Inquiries</h3>
                <p className="text-slate-600 text-sm mb-3">Looking for team plans, custom integrations, or dedicated support?</p>
                <a href="mailto:enterprise@droms.ai" className="text-primary-600 font-medium text-sm hover:underline">enterprise@droms.ai →</a>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold font-display text-slate-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                    <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                  <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} required rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm resize-none" placeholder="Tell us more..." />
                </div>
                <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 py-3.5">
                  {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
