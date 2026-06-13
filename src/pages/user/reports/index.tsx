import { FileText, Download, FileSpreadsheet } from "lucide-react";
import { mockGoals, mockHabits, mockDreams, mockFinancialGoals } from "@/data/mockData";
import { downloadCSV, downloadJSON } from "@/lib/utils";
import { toast } from "sonner";

const reports = [
  { id: "goals", title: "Goals Report", desc: "Complete goals with progress, milestones, and status", icon: "", lastGenerated: "Jan 15, 2025", count: mockGoals.length },
  { id: "dreams", title: "Dreams Report", desc: "All dreams with categories, priorities, and progress", icon: "", lastGenerated: "Jan 15, 2025", count: mockDreams.length },
  { id: "habits", title: "Habit Analytics Report", desc: "Habit streaks, completion rates, and performance", icon: "", lastGenerated: "Jan 15, 2025", count: mockHabits.length },
  { id: "finance", title: "Financial Goals Report", desc: "Savings, investments, and debt reduction progress", icon: "", lastGenerated: "Jan 14, 2025", count: mockFinancialGoals.length },
  { id: "progress", title: "Monthly Progress Report", desc: "Overall success metrics and achievement summary", icon: "", lastGenerated: "Jan 1, 2025", count: null },
  { id: "wellness", title: "Wellness Analytics", desc: "Fitness, sleep, nutrition, and wellness trends", icon: "", lastGenerated: "Jan 15, 2025", count: null },
];

const dataMap: Record<string, unknown[]> = {
  goals: mockGoals,
  dreams: mockDreams,
  habits: mockHabits,
  finance: mockFinancialGoals,
};

export default function ReportsPage() {
  const handleDownload = (reportId: string, format: "csv" | "json") => {
    const data = dataMap[reportId];
    if (!data) { toast.info("Report generating..."); setTimeout(() => toast.success("Report downloaded!"), 1500); return; }
    if (format === "csv") downloadCSV(data as Record<string, unknown>[], `droms-${reportId}-report`);
    else downloadJSON(data, `droms-${reportId}-report`);
    toast.success(`${format.toUpperCase()} report downloaded!`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary-600" /> Reports
        </h1>
        <p className="text-slate-500 mt-0.5">Download and export your personal data and analytics</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {reports.map(report => (
          <div key={report.id} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md hover:border-primary-200 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{report.icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-900">{report.title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{report.desc}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
              <span>Last generated: {report.lastGenerated}</span>
              {report.count && <span>{report.count} records</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleDownload(report.id, "csv")}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 text-sm font-medium transition-colors">
                <FileSpreadsheet className="w-4 h-4" /> CSV
              </button>
              <button onClick={() => handleDownload(report.id, "json")}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium transition-colors">
                <Download className="w-4 h-4" /> JSON
              </button>
              <button onClick={() => { toast.info("Generating PDF..."); setTimeout(() => toast.success("PDF downloaded!"), 2000); }}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-sm font-medium transition-colors">
                <FileText className="w-4 h-4" /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
