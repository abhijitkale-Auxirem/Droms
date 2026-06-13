import { useState, useEffect } from "react";
import { Briefcase, Plus, Trash2, Edit2, Check, X, ChevronUp, ChevronDown } from "lucide-react";
import { getProgressColor } from "@/lib/utils";
import { toast } from "sonner";

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface Milestone {
  title: string;
  date: string;
  status: "completed" | "in-progress" | "planned";
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  status: "active" | "in-progress";
}

const defaultSkills: Skill[] = [
  { name: "React / TypeScript", level: 90, category: "Technical" },
  { name: "Machine Learning", level: 65, category: "Technical" },
  { name: "Product Management", level: 75, category: "Business" },
  { name: "Fundraising & Pitching", level: 50, category: "Business" },
  { name: "Leadership", level: 80, category: "Soft Skills" },
  { name: "Public Speaking", level: 70, category: "Soft Skills" },
  { name: "Financial Modeling", level: 60, category: "Finance" },
  { name: "SEO & Growth Marketing", level: 55, category: "Marketing" },
];

const defaultMilestones: Milestone[] = [
  { title: "Promoted to Senior Engineer", date: "Mar 2023", status: "completed" },
  { title: "Launched Side Project (1K users)", date: "Aug 2023", status: "completed" },
  { title: "Led Team of 5 Engineers", date: "Jan 2024", status: "completed" },
  { title: "Complete ML Certification", date: "Apr 2025", status: "in-progress" },
  { title: "Raise Seed Funding ($500K)", date: "Jun 2025", status: "in-progress" },
  { title: "Launch SaaS Product", date: "Sep 2025", status: "planned" },
  { title: "Reach $100K ARR", date: "Dec 2025", status: "planned" },
  { title: "Build Team of 10", date: "Jun 2026", status: "planned" },
];

const defaultCerts: Certification[] = [
  { name: "AWS Solutions Architect", issuer: "Amazon", date: "2024-01", status: "active" },
  { name: "Google Product Manager", issuer: "Google", date: "2023-08", status: "active" },
  { name: "Deep Learning Specialization", issuer: "Coursera/deeplearning.ai", date: "In Progress", status: "in-progress" },
  { name: "Certified Scrum Master", issuer: "Scrum Alliance", date: "2023-03", status: "active" },
];

export default function CareerPage() {
  const [skillsList, setSkillsList] = useState<Skill[]>([]);
  const [milestonesList, setMilestonesList] = useState<Milestone[]>([]);
  const [certsList, setCertsList] = useState<Certification[]>([]);

  // Modals state
  const [skillModal, setSkillModal] = useState<{ open: boolean; mode: "add" | "edit"; index?: number }>({ open: false, mode: "add" });
  const [milestoneModal, setMilestoneModal] = useState<{ open: boolean; mode: "add" | "edit"; index?: number }>({ open: false, mode: "add" });
  const [certModal, setCertModal] = useState<{ open: boolean; mode: "add" | "edit"; index?: number }>({ open: false, mode: "add" });

  // Form states
  const [skillForm, setSkillForm] = useState({ name: "", category: "Technical", level: 50 });
  const [milestoneForm, setMilestoneForm] = useState({ title: "", date: "", status: "planned" as Milestone["status"] });
  const [certForm, setCertForm] = useState({ name: "", issuer: "", date: "", status: "active" as Certification["status"] });

  // Load from LocalStorage
  useEffect(() => {
    const cachedSkills = localStorage.getItem("droms_career_skills");
    const cachedMilestones = localStorage.getItem("droms_career_milestones");
    const cachedCerts = localStorage.getItem("droms_career_certs");

    if (cachedSkills) setSkillsList(JSON.parse(cachedSkills));
    else {
      setSkillsList(defaultSkills);
      localStorage.setItem("droms_career_skills", JSON.stringify(defaultSkills));
    }

    if (cachedMilestones) setMilestonesList(JSON.parse(cachedMilestones));
    else {
      setMilestonesList(defaultMilestones);
      localStorage.setItem("droms_career_milestones", JSON.stringify(defaultMilestones));
    }

    if (cachedCerts) setCertsList(JSON.parse(cachedCerts));
    else {
      setCertsList(defaultCerts);
      localStorage.setItem("droms_career_certs", JSON.stringify(defaultCerts));
    }
  }, []);

  // Sync to LocalStorage helpers
  const saveSkills = (list: Skill[]) => {
    setSkillsList(list);
    localStorage.setItem("droms_career_skills", JSON.stringify(list));
  };

  const saveMilestones = (list: Milestone[]) => {
    setMilestonesList(list);
    localStorage.setItem("droms_career_milestones", JSON.stringify(list));
  };

  const saveCerts = (list: Certification[]) => {
    setCertsList(list);
    localStorage.setItem("droms_career_certs", JSON.stringify(list));
  };

  // --- SKILL ACTIONS ---
  const handleOpenAddSkill = () => {
    setSkillForm({ name: "", category: "Technical", level: 50 });
    setSkillModal({ open: true, mode: "add" });
  };

  const handleOpenEditSkill = (skill: Skill, idx: number) => {
    setSkillForm({ name: skill.name, category: skill.category, level: skill.level });
    setSkillModal({ open: true, mode: "edit", index: idx });
  };

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name.trim()) return;

    if (skillModal.mode === "add") {
      const updated = [...skillsList, skillForm];
      saveSkills(updated);
      toast.success(`Skill "${skillForm.name}" added successfully!`);
    } else if (skillModal.mode === "edit" && skillModal.index !== undefined) {
      const updated = [...skillsList];
      updated[skillModal.index] = skillForm;
      saveSkills(updated);
      toast.success(`Skill "${skillForm.name}" updated successfully!`);
    }
    setSkillModal({ open: false, mode: "add" });
  };

  const handleDeleteSkill = (idx: number) => {
    const skillName = skillsList[idx].name;
    const updated = skillsList.filter((_, i) => i !== idx);
    saveSkills(updated);
    toast.success(`Skill "${skillName}" deleted.`);
  };

  const adjustSkillLevel = (idx: number, delta: number) => {
    const updated = [...skillsList];
    const newLevel = Math.min(100, Math.max(0, updated[idx].level + delta));
    updated[idx].level = newLevel;
    saveSkills(updated);
  };

  // --- MILESTONE ACTIONS ---
  const handleOpenAddMilestone = () => {
    const currentYear = new Date().getFullYear();
    setMilestoneForm({ title: "", date: `Dec ${currentYear}`, status: "planned" });
    setMilestoneModal({ open: true, mode: "add" });
  };

  const handleOpenEditMilestone = (m: Milestone, idx: number) => {
    setMilestoneForm({ title: m.title, date: m.date, status: m.status });
    setMilestoneModal({ open: true, mode: "edit", index: idx });
  };

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneForm.title.trim()) return;

    if (milestoneModal.mode === "add") {
      const updated = [...milestonesList, milestoneForm];
      saveMilestones(updated);
      toast.success(`Milestone "${milestoneForm.title}" added to roadmap!`);
    } else if (milestoneModal.mode === "edit" && milestoneModal.index !== undefined) {
      const updated = [...milestonesList];
      updated[milestoneModal.index] = milestoneForm;
      saveMilestones(updated);
      toast.success(`Milestone "${milestoneForm.title}" updated.`);
    }
    setMilestoneModal({ open: false, mode: "add" });
  };

  const handleDeleteMilestone = (idx: number) => {
    const title = milestonesList[idx].title;
    const updated = milestonesList.filter((_, i) => i !== idx);
    saveMilestones(updated);
    toast.success(`Milestone "${title}" deleted.`);
  };

  const cycleMilestoneStatus = (idx: number) => {
    const updated = [...milestonesList];
    const current = updated[idx].status;
    let next: Milestone["status"] = "planned";
    if (current === "planned") next = "in-progress";
    else if (current === "in-progress") next = "completed";
    
    updated[idx].status = next;
    saveMilestones(updated);
    toast.info(`Updated status to "${next}"`);
  };

  // --- CERTIFICATION ACTIONS ---
  const handleOpenAddCert = () => {
    const currentYear = new Date().getFullYear();
    setCertForm({ name: "", issuer: "", date: `${currentYear}-01`, status: "active" });
    setCertModal({ open: true, mode: "add" });
  };

  const handleOpenEditCert = (c: Certification, idx: number) => {
    setCertForm({ name: c.name, issuer: c.issuer, date: c.date, status: c.status });
    setCertModal({ open: true, mode: "edit", index: idx });
  };

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.name.trim() || !certForm.issuer.trim()) return;

    if (certModal.mode === "add") {
      const updated = [...certsList, certForm];
      saveCerts(updated);
      toast.success(`Certification "${certForm.name}" added.`);
    } else if (certModal.mode === "edit" && certModal.index !== undefined) {
      const updated = [...certsList];
      updated[certModal.index] = certForm;
      saveCerts(updated);
      toast.success(`Certification "${certForm.name}" updated.`);
    }
    setCertModal({ open: false, mode: "add" });
  };

  const handleDeleteCert = (idx: number) => {
    const name = certsList[idx].name;
    const updated = certsList.filter((_, i) => i !== idx);
    saveCerts(updated);
    toast.success(`Certification "${name}" deleted.`);
  };

  const toggleCertStatus = (idx: number) => {
    const updated = [...certsList];
    updated[idx].status = updated[idx].status === "active" ? "in-progress" : "active";
    saveCerts(updated);
    toast.info(`Updated status to "${updated[idx].status}"`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary-600" /> Career Growth
          </h1>
          <p className="text-slate-500 mt-0.5">Track skills, certifications, and career milestones</p>
        </div>
        <button 
          onClick={handleOpenAddSkill} 
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      {/* Skills Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-semibold text-slate-900">Skills Development</h2>
          <span className="text-xs text-slate-500 font-medium">{skillsList.length} skills tracked</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/20 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3">Skill</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3 w-64">Proficiency</th>
                <th className="px-6 py-3">Level</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {skillsList.map((skill, idx) => (
                <tr key={idx} className="hover:bg-slate-55/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">{skill.name}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{skill.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Inline Delta controls */}
                      <div className="flex flex-col">
                        <button 
                          onClick={() => adjustSkillLevel(idx, 5)} 
                          className="p-0.5 hover:bg-slate-100 text-slate-400 hover:text-primary-600 rounded transition-colors"
                          title="Increase 5%"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => adjustSkillLevel(idx, -5)} 
                          className="p-0.5 hover:bg-slate-100 text-slate-400 hover:text-primary-600 rounded transition-colors"
                          title="Decrease 5%"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      {/* Bar indicator */}
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-300 ${getProgressColor(skill.level)}`} style={{ width: `${skill.level}%` }} />
                      </div>
                      <span className="text-xs font-bold text-slate-600 w-8">{skill.level}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-slate-600">
                      {skill.level >= 80 ? "🏆 Expert" : skill.level >= 60 ? "🚀 Advanced" : skill.level >= 40 ? "📈 Intermediate" : "🌱 Beginner"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenEditSkill(skill, idx)} 
                        className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                        title="Edit Skill"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteSkill(idx)} 
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {skillsList.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400 italic">No skills added yet. Click "Add Skill" above to start!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Career Roadmap */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="font-semibold text-slate-900">Career Roadmap</h2>
            <button 
              onClick={handleOpenAddMilestone}
              className="text-xs text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Add Milestone
            </button>
          </div>
          <div className="p-6 space-y-4 flex-1 overflow-y-auto">
            {milestonesList.map((m, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2.5 hover:bg-slate-50/50 rounded-xl transition-all border border-transparent hover:border-slate-100">
                <div 
                  onClick={() => cycleMilestoneStatus(idx)}
                  className={`w-3.5 h-3.5 rounded-full mt-1.5 flex-shrink-0 cursor-pointer transition-transform hover:scale-125 ${m.status === "completed" ? "bg-green-500 ring-4 ring-green-50" : m.status === "in-progress" ? "bg-primary-500 ring-4 ring-primary-50 animate-pulse" : "bg-slate-300 ring-4 ring-slate-100"}`}
                  title="Click to toggle status"
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${m.status === "completed" ? "text-slate-400 line-through font-normal" : "text-slate-800"}`}>{m.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{m.date}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span 
                    onClick={() => cycleMilestoneStatus(idx)}
                    className={`status-badge text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded cursor-pointer transition-all hover:opacity-80 ${m.status === "completed" ? "bg-green-50 text-green-700 border border-green-200" : m.status === "in-progress" ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-slate-50 text-slate-600 border border-slate-200"}`}
                    title="Click to cycle status"
                  >
                    {m.status}
                  </span>
                  <button onClick={() => handleOpenEditMilestone(m, idx)} className="p-1 text-slate-400 hover:text-primary-650 rounded"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDeleteMilestone(idx)} className="p-1 text-slate-400 hover:text-red-655 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
            {milestonesList.length === 0 && (
              <p className="text-center py-8 text-slate-400 italic">No milestones defined. Set up your future achievements!</p>
            )}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="font-semibold text-slate-900">Certifications</h2>
            <button 
              onClick={handleOpenAddCert}
              className="text-xs text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Add Certification
            </button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/10 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-3">Certification</th>
                  <th className="px-6 py-3">Issuer</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {certsList.map((cert, idx) => (
                  <tr key={idx} className="hover:bg-slate-55/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{cert.name}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{cert.issuer}</td>
                    <td className="px-6 py-4 text-slate-500">{cert.date}</td>
                    <td className="px-6 py-4">
                      <span 
                        onClick={() => toggleCertStatus(idx)}
                        className={`status-badge text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded cursor-pointer transition-all hover:opacity-85 ${cert.status === "active" ? "bg-green-50 text-green-700 border border-green-200" : "bg-blue-50 text-blue-700 border border-blue-200"}`}
                        title="Click to toggle status"
                      >
                        {cert.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDeleteCert(idx)} 
                        className="p-1.5 text-slate-450 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete certification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {certsList.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-400 italic">No certifications listed. Keep learning!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- SKILLS MODAL --- */}
      {skillModal.open && (
        <div className="fixed inset-0 bg-slate-900/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">{skillModal.mode === "add" ? "Add New Skill" : "Edit Skill"}</h3>
              <button onClick={() => setSkillModal({ open: false, mode: "add" })} className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Skill Name</label>
                <input 
                  type="text" 
                  value={skillForm.name} 
                  onChange={e => setSkillForm({ ...skillForm, name: e.target.value })} 
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white transition-all text-slate-800" 
                  placeholder="e.g. Docker, Python, System Architecture" 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Category</label>
                  <select 
                    value={skillForm.category} 
                    onChange={e => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white transition-all text-slate-800"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Business">Business</option>
                    <option value="Soft Skills">Soft Skills</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Proficiency ({skillForm.level}%)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={skillForm.level} 
                    onChange={e => setSkillForm({ ...skillForm, level: parseInt(e.target.value) })}
                    className="w-full accent-primary-600 mt-3" 
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setSkillModal({ open: false, mode: "add" })} className="w-1/2 py-2.5 text-sm font-semibold border border-slate-200 hover:bg-slate-50 rounded-xl transition-all text-slate-700">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all shadow-sm">Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ROADMAP MODAL --- */}
      {milestoneModal.open && (
        <div className="fixed inset-0 bg-slate-900/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">{milestoneModal.mode === "add" ? "Add Milestone" : "Edit Milestone"}</h3>
              <button onClick={() => setMilestoneModal({ open: false, mode: "add" })} className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveMilestone} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Milestone Title</label>
                <input 
                  type="text" 
                  value={milestoneForm.title} 
                  onChange={e => setMilestoneForm({ ...milestoneForm, title: e.target.value })} 
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white transition-all text-slate-800" 
                  placeholder="e.g. Pass Scrum Certification, Double ARR" 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Target Date</label>
                  <input 
                    type="text" 
                    value={milestoneForm.date} 
                    onChange={e => setMilestoneForm({ ...milestoneForm, date: e.target.value })} 
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white transition-all text-slate-800" 
                    placeholder="e.g. Dec 2025" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</label>
                  <select 
                    value={milestoneForm.status} 
                    onChange={e => setMilestoneForm({ ...milestoneForm, status: e.target.value as Milestone["status"] })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white transition-all text-slate-800"
                  >
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setMilestoneModal({ open: false, mode: "add" })} className="w-1/2 py-2.5 text-sm font-semibold border border-slate-200 hover:bg-slate-50 rounded-xl transition-all text-slate-700">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all shadow-sm">Save Milestone</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CERTIFICATION MODAL --- */}
      {certModal.open && (
        <div className="fixed inset-0 bg-slate-900/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">{certModal.mode === "add" ? "Add Certification" : "Edit Certification"}</h3>
              <button onClick={() => setCertModal({ open: false, mode: "add" })} className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveCert} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Certification Name</label>
                <input 
                  type="text" 
                  value={certForm.name} 
                  onChange={e => setCertForm({ ...certForm, name: e.target.value })} 
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white transition-all text-slate-800" 
                  placeholder="e.g. PMP, AWS Advanced Networking" 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Issuer</label>
                <input 
                  type="text" 
                  value={certForm.issuer} 
                  onChange={e => setCertForm({ ...certForm, issuer: e.target.value })} 
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white transition-all text-slate-800" 
                  placeholder="e.g. AWS, Scrum Alliance, Udemy" 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date / Period</label>
                  <input 
                    type="text" 
                    value={certForm.date} 
                    onChange={e => setCertForm({ ...certForm, date: e.target.value })} 
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white transition-all text-slate-800" 
                    placeholder="e.g. 2024-05 or In Progress" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</label>
                  <select 
                    value={certForm.status} 
                    onChange={e => setCertForm({ ...certForm, status: e.target.value as Certification["status"] })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-primary-400 focus:bg-white transition-all text-slate-800"
                  >
                    <option value="active">Active</option>
                    <option value="in-progress">In Progress</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setCertModal({ open: false, mode: "add" })} className="w-1/2 py-2.5 text-sm font-semibold border border-slate-200 hover:bg-slate-50 rounded-xl transition-all text-slate-700">Cancel</button>
                <button type="submit" className="w-1/2 py-2.5 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all shadow-sm">Save Certification</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
