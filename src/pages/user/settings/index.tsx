import { useState } from "react";
import { Settings, User, Shield, Bell, Palette, Globe, CreditCard, Save } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "language", label: "Language", icon: Globe },
  { id: "subscription", label: "Subscription", icon: CreditCard },
];

export default function SettingsPage() {
  const { user, login: updateAuthUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "", email: user?.email || "", bio: "Ambitious entrepreneur on a mission to build impactful tech products and achieve financial freedom by 35.",
    timezone: "America/Los_Angeles", phone: "+1 (555) 123-4567",
  });
  const [notifSettings, setNotifSettings] = useState({
    goalAlerts: true, habitReminders: true, aiInsights: true, communityUpdates: false, weeklyReport: true, achievements: true,
  });

  const handleSaveProfile = () => { 
    if (user) {
      updateAuthUser({ ...user, name: profileForm.name, email: profileForm.email });
      toast.success("Profile updated successfully!"); 
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size exceeds 2MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      if (user) {
        updateAuthUser({ ...user, avatar: dataUrl });
        toast.success("Profile photo updated successfully!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpgrade = (tier: "pro" | "enterprise") => {
    if (user) {
      updateAuthUser({ ...user, plan: tier });
      toast.success(`Successfully upgraded to ${tier === "pro" ? "Pro" : "Enterprise"} plan! 🎉`);
    }
  };

  const handleCancelSubscription = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel your subscription? You will lose access to premium features.");
    if (confirmCancel && user) {
      updateAuthUser({ ...user, plan: "free" });
      toast.success("Subscription cancelled successfully. Plan downgraded to Free.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary-600" /> Settings
        </h1>
        <p className="text-slate-500 mt-0.5">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={cn("w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                  activeTab === id ? "bg-primary-600 text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}>
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-6">
          {activeTab === "profile" && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-4">Profile Information</h2>
              <div className="flex items-center gap-4 mb-6">
                <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=7C3AED&color=fff`}
                  alt={user?.name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-primary-100" />
                <div>
                  <input 
                    type="file" 
                    id="avatar-upload" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleAvatarChange} 
                  />
                  <label 
                    htmlFor="avatar-upload" 
                    className="text-sm bg-primary-50 text-primary-600 font-medium px-4 py-2 rounded-xl hover:bg-primary-100 transition-colors cursor-pointer inline-block"
                  >
                    Change Photo
                  </label>
                  <p className="text-xs text-slate-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <input value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input value={profileForm.email} onChange={e => setProfileForm({...profileForm, email: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
                <textarea value={profileForm.bio} onChange={e => setProfileForm({...profileForm, bio: e.target.value})} rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                  <input value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Timezone</label>
                  <select value={profileForm.timezone} onChange={e => setProfileForm({...profileForm, timezone: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                  </select>
                </div>
              </div>
              <button onClick={handleSaveProfile} className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-4">Notification Preferences</h2>
              <div className="space-y-4">
                {Object.entries(notifSettings).map(([key, value]) => {
                  const labels: Record<string, { title: string; desc: string }> = {
                    goalAlerts: { title: "Goal Alerts", desc: "Get notified when you're close to milestones or deadlines" },
                    habitReminders: { title: "Habit Reminders", desc: "Daily reminders to complete your habits" },
                    aiInsights: { title: "AI Coach Insights", desc: "Personalized recommendations from your AI coach" },
                    communityUpdates: { title: "Community Updates", desc: "New posts and challenges from your groups" },
                    weeklyReport: { title: "Weekly Progress Report", desc: "Summary of your week's achievements" },
                    achievements: { title: "Achievement Unlocked", desc: "Be notified when you earn badges and milestones" },
                  };
                  const info = labels[key];
                  return (
                    <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div>
                        <p className="font-medium text-slate-800">{info.title}</p>
                        <p className="text-sm text-slate-500">{info.desc}</p>
                      </div>
                      <button onClick={() => setNotifSettings(p => ({ ...p, [key]: !value }))}
                        className={cn("w-12 h-6 rounded-full transition-all duration-300 relative",
                          value ? "bg-primary-600" : "bg-slate-300"
                        )}>
                        <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300",
                          value ? "left-7" : "left-1"
                        )} />
                      </button>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => toast.success("Notification preferences saved!")} className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Preferences
              </button>
            </div>
          )}

          {activeTab === "subscription" && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-4">Subscription Plan</h2>
              {user?.plan === "free" ? (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <p className="text-sm text-slate-500">Current Plan</p>
                    <p className="text-2xl font-bold font-display text-slate-800">Free / Starter</p>
                    <p className="text-sm text-slate-500 mt-2">Upgrade to premium plans to unlock the AI Coach, Unlimited Dreams, Net Worth Tracking, and more.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => handleUpgrade("pro")} 
                      className="py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Upgrade to Pro ($19/mo)
                    </button>
                    <button 
                      onClick={() => handleUpgrade("enterprise")} 
                      className="py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-900 transition-colors"
                    >
                      Upgrade to Enterprise ($49/mo)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-primary-600 to-blue-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-white/70">Current Plan</p>
                        <p className="text-2xl font-bold font-display capitalize">{user?.plan}</p>
                      </div>
                      <span className="bg-accent text-droms-dark text-sm font-bold px-3 py-1 rounded-full">Active</span>
                    </div>
                    <p className="text-white/80 text-sm mb-4">Your plan renews on February 15, 2026 • {user?.plan === "pro" ? "$19/month" : "$49/month"}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {["Unlimited Dreams & Goals", "AI Coach (50/mo)", "5 Vision Boards", "All Integrations"].map(f => (
                        <div key={f} className="flex items-center gap-2 text-sm text-white/80">
                          <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white" /></div>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => toast.info("Upgrade/change flow coming soon!")} className="py-3 rounded-xl bg-primary-50 text-primary-600 font-semibold hover:bg-primary-100 transition-colors">Manage Subscription</button>
                    <button onClick={handleCancelSubscription} className="py-3 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors">Cancel Subscription</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-4">Security Settings</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-slate-800">Two-Factor Authentication</p>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Disabled</span>
                </div>
                <p className="text-sm text-slate-500 mb-3">Add an extra layer of security to your account</p>
                <button onClick={() => toast.info("2FA setup coming soon!")} className="text-sm bg-primary-50 text-primary-600 font-medium px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors">Enable 2FA</button>
              </div>
              <button onClick={() => toast.success("Password updated!")} className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" /> Update Password
              </button>
            </div>
          )}

         

          {activeTab === "language" && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-4">Language & Region</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Language</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                  {["English (US)", "English (UK)", "Spanish", "French", "German", "Japanese", "Chinese (Simplified)", "Portuguese", "Arabic"].map(l => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Date Format</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <button onClick={() => toast.success("Language settings saved!")} className="btn-primary flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
