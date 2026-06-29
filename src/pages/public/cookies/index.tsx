import { Shield, Eye, Settings, FileText } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="overflow-hidden">
      <section className="py-16 bg-gradient-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6">
            <Shield className="w-4 h-4" /> Cookies Policy
          </div>
          <h1 className="text-4xl font-bold font-display text-white mb-4">Cookie Policy</h1>
          <p className="text-slate-300">Last updated: January 15, 2025</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="flex gap-6 mb-12 flex-wrap">
            {[
              { icon: FileText, title: "Transparency", desc: "Clearly list all the cookies we use and why" },
              { icon: Eye, title: "Your Control", desc: "Choose which optional cookies you want to allow" },
              { icon: Settings, title: "Preferences", desc: "Easily update your selections at any time" },
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
              { 
                title: "1. What Are Cookies?", 
                content: "Cookies are small text files stored on your device when you visit websites. They help websites recognize your device, remember preferences, and provide specific features. We also use web beacons and local storage for similar tracking purposes." 
              },
              { 
                title: "2. Essential Cookies", 
                content: "These cookies are strictly necessary to provide you with services available through our site and to use some of its features, such as accessing secure areas, maintaining user sessions, and enforcing security policies. Because these cookies are essential, they cannot be turned off." 
              },
              { 
                title: "3. Performance and Analytics Cookies", 
                content: "We use performance and analytics cookies to collect aggregate data about how visitors interact with our application. This helps us measure page loads, identify bugs, and optimize site layout and performance. All data collected by these cookies is anonymized." 
              },
              { 
                title: "4. Functionality Cookies", 
                content: "These cookies allow our website to remember choices you make when you use the service, such as your language preferences, theme settings, or customized UI layouts. Their purpose is to provide a more personalized and streamlined experience." 
              },
              { 
                title: "5. Managing Cookie Preferences", 
                content: "You can adjust your cookie settings through your browser preferences. Most browsers allow you to block cookies entirely, delete existing cookies, or receive a warning before a cookie is stored. Please note that disabling cookies may affect the functionality of some sections of Droms." 
              },
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
