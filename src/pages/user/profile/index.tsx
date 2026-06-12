import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Camera, User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "Alex Johnson",
    email: user?.email || "demo@droms.ai",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    bio: "Tech entrepreneur passionate about building the future. Avid runner, lifelong learner, and financial freedom seeker.",
    website: "www.alexjohnson.io",
    occupation: "Founder & CEO",
    company: "Startup Labs",
  });

  const stats = [
    { label: "Dreams Created", value: 8 },
    { label: "Goals Completed", value: 24 },
    { label: "Habit Streak", value: "42d" },
    { label: "Success Score", value: "87%" },
  ];

  const handleSave = () => {
    setEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">My Profile</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your personal information and public profile</p>
        </div>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Edit2 className="w-4 h-4" /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setEditing(false)} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              <X className="w-4 h-4" /> Cancel
            </button>
            <button onClick={handleSave} className="btn-primary flex items-center gap-2 text-sm">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Cover & Avatar */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary-600 to-secondary relative">
          <button className="absolute right-4 bottom-4 bg-black/30 hover:bg-black/50 text-white text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5" /> Change Cover
          </button>
        </div>
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-12 mb-4">
            <div className="relative">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${form.name}&background=7C3AED&color=fff&size=96`}
                alt={form.name}
                className="w-24 h-24 rounded-2xl ring-4 ring-white object-cover"
              />
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="pb-2">
              <h2 className="text-xl font-bold font-display text-slate-900">{form.name}</h2>
              <p className="text-slate-500 text-sm">{form.occupation} at {form.company}</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-bold font-display text-primary-600">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Full Name", field: "name", icon: User },
              { label: "Email", field: "email", icon: Mail },
              { label: "Phone", field: "phone", icon: Phone },
              { label: "Location", field: "location", icon: MapPin },
              { label: "Occupation", field: "occupation", icon: User },
              { label: "Company", field: "company", icon: User },
              { label: "Website", field: "website", icon: Mail },
            ].map(({ label, field, icon: Icon }) => (
              <div key={field}>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{label}</label>
                {editing ? (
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" value={(form as Record<string, string>)[field]}
                      onChange={e => setForm({ ...form, [field]: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 py-2.5 px-3 bg-slate-50 rounded-xl text-sm text-slate-700">
                    <Icon className="w-4 h-4 text-slate-400" />
                    {(form as Record<string, string>)[field]}
                  </div>
                )}
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Bio</label>
              {editing ? (
                <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm resize-none" />
              ) : (
                <p className="py-2.5 px-3 bg-slate-50 rounded-xl text-sm text-slate-700 leading-relaxed">{form.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
