import { Briefcase, Plus } from "lucide-react";
import { getProgressColor } from "@/lib/utils";
import { toast } from "sonner";

const skills = [
  { name: "React / TypeScript", level: 90, category: "Technical" },
  { name: "Machine Learning", level: 65, category: "Technical" },
  { name: "Product Management", level: 75, category: "Business" },
  { name: "Fundraising & Pitching", level: 50, category: "Business" },
  { name: "Leadership", level: 80, category: "Soft Skills" },
  { name: "Public Speaking", level: 70, category: "Soft Skills" },
  { name: "Financial Modeling", level: 60, category: "Finance" },
  { name: "SEO & Growth Marketing", level: 55, category: "Marketing" },
];

const milestones = [
  { title: "Promoted to Senior Engineer", date: "Mar 2023", status: "completed" },
  { title: "Launched Side Project (1K users)", date: "Aug 2023", status: "completed" },
  { title: "Led Team of 5 Engineers", date: "Jan 2024", status: "completed" },
  { title: "Complete ML Certification", date: "Apr 2025", status: "in-progress" },
  { title: "Raise Seed Funding ($500K)", date: "Jun 2025", status: "in-progress" },
  { title: "Launch SaaS Product", date: "Sep 2025", status: "planned" },
  { title: "Reach $100K ARR", date: "Dec 2025", status: "planned" },
  { title: "Build Team of 10", date: "Jun 2026", status: "planned" },
];

const certs = [
  { name: "AWS Solutions Architect", issuer: "Amazon", date: "2024-01", status: "active" },
  { name: "Google Product Manager", issuer: "Google", date: "2023-08", status: "active" },
  { name: "Deep Learning Specialization", issuer: "Coursera/deeplearning.ai", date: "In Progress", status: "in-progress" },
  { name: "Certified Scrum Master", issuer: "Scrum Alliance", date: "2023-03", status: "active" },
];

export default function CareerPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary-600" /> Career Growth
          </h1>
          <p className="text-slate-500 mt-0.5">Track skills, certifications, and career milestones</p>
        </div>
        <button onClick={() => toast.info("Add skill feature coming soon!")} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      {/* Skills Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Skills Development</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr><th>Skill</th><th>Category</th><th className="w-52">Proficiency</th><th>Level</th></tr>
            </thead>
            <tbody>
              {skills.map(skill => (
                <tr key={skill.name}>
                  <td className="font-medium text-slate-800">{skill.name}</td>
                  <td><span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{skill.category}</span></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar flex-1"><div className={`progress-fill ${getProgressColor(skill.level)}`} style={{ width: `${skill.level}%` }} /></div>
                      <span className="text-xs text-slate-500 w-8">{skill.level}%</span>
                    </div>
                  </td>
                  <td><span className="text-xs font-medium text-slate-600">{skill.level >= 80 ? "Expert" : skill.level >= 60 ? "Advanced" : skill.level >= 40 ? "Intermediate" : "Beginner"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Career Roadmap */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Career Roadmap</h2>
          </div>
          <div className="p-6 space-y-3">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${m.status === "completed" ? "bg-green-500" : m.status === "in-progress" ? "bg-primary-500 animate-pulse" : "bg-slate-300"}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${m.status === "completed" ? "text-slate-500 line-through" : "text-slate-800"}`}>{m.title}</p>
                  <p className="text-xs text-slate-400">{m.date}</p>
                </div>
                <span className={`status-badge text-xs ${m.status === "completed" ? "bg-green-100 text-green-700" : m.status === "in-progress" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Certifications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead><tr><th>Certification</th><th>Issuer</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {certs.map(cert => (
                  <tr key={cert.name}>
                    <td className="font-medium text-slate-800">{cert.name}</td>
                    <td className="text-sm text-slate-500">{cert.issuer}</td>
                    <td className="text-sm text-slate-500">{cert.date}</td>
                    <td><span className={`status-badge ${cert.status === "active" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{cert.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
