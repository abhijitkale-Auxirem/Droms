// Generic admin page template used for multiple modules
import { useState } from "react";
import { Search, Plus, MoreVertical } from "lucide-react";
import { toast } from "sonner";

interface AdminTablePageProps {
  title: string;
  subtitle: string;
  addLabel: string;
  columns: string[];
  rows: Record<string, React.ReactNode>[];
}

function AdminTablePage({ title, subtitle, addLabel, columns, rows }: AdminTablePageProps) {
  const [search, setSearch] = useState("");
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900">{title}</h1>
          <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
        </div>
        <button onClick={() => toast.success(`${addLabel}!`)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> {addLabel}
        </button>
      </div>
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder={`Search ${title.toLowerCase()}...`} value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 bg-white" />
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {columns.map(col => (
                  <th key={col} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-4">{col}</th>
                ))}
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.filter(row => {
                const vals = Object.values(row).join(" ").toLowerCase();
                return vals.includes(search.toLowerCase());
              }).map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  {Object.values(row).map((cell, j) => (
                    <td key={j} className="px-6 py-4 text-sm text-slate-700">{cell}</td>
                  ))}
                  <td className="px-6 py-4">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---- Individual Admin Pages ----

export function AdminDreamsPage() {
  return <AdminTablePage
    title="Dreams Management"
    subtitle="Monitor and moderate user dreams"
    addLabel="Add Dream Category"
    columns={["Dream Title", "User", "Category", "Progress", "Status", "Created"]}
    rows={[
      { title: "Launch Tech Startup", user: "Alex Rivera", category: "Business", progress: "68%", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>, created: "Jan 10, 2025" },
      { title: "Financial Freedom", user: "Sarah Chen", category: "Finance", progress: "42%", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>, created: "Jan 8, 2025" },
      { title: "Run a Marathon", user: "Marcus J", category: "Fitness", progress: "75%", status: <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Completed</span>, created: "Dec 15, 2024" },
      { title: "Write a Book", user: "Emma Wilson", category: "Creativity", progress: "30%", status: <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Paused</span>, created: "Nov 20, 2024" },
      { title: "Travel 30 Countries", user: "Priya Sharma", category: "Travel", progress: "57%", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>, created: "Oct 5, 2024" },
    ]}
  />;
}

export function AdminGoalsPage() {
  return <AdminTablePage
    title="Goals Management"
    subtitle="View and manage all platform goals"
    addLabel="Create Goal Template"
    columns={["Goal", "User", "Category", "Deadline", "Progress", "Status"]}
    rows={[
      { goal: "Complete MVP Development", user: "Alex Rivera", cat: "Career", deadline: "Mar 31, 2025", progress: "80%", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">On Track</span> },
      { goal: "Save $50K Emergency Fund", user: "Sarah Chen", cat: "Financial", deadline: "Jun 1, 2025", progress: "72%", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">On Track</span> },
      { goal: "Run 50 Miles/Month", user: "Marcus J", cat: "Health", deadline: "Feb 28, 2025", progress: "88%", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">On Track</span> },
      { goal: "Write 1000 Words Daily", user: "Emma Wilson", cat: "Creativity", deadline: "Sep 1, 2025", progress: "45%", status: <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">At Risk</span> },
      { goal: "Invest $2K/Month", user: "James Liu", cat: "Financial", deadline: "Dec 31, 2025", progress: "95%", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">On Track</span> },
    ]}
  />;
}

export function AdminCommunitiesPage() {
  return <AdminTablePage
    title="Community Management"
    subtitle="Manage groups, moderate content, and track engagement"
    addLabel="Create Community"
    columns={["Group Name", "Category", "Members", "Posts/Week", "Activity", "Status"]}
    rows={[
      { name: "Startup Founders Network", cat: "Business", members: "234", posts: "42", activity: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Very Active</span>, status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
      { name: "Marathon Runners Club", cat: "Fitness", members: "156", posts: "28", activity: <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Active</span>, status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
      { name: "Financial Independence Journey", cat: "Finance", members: "892", posts: "86", activity: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Very Active</span>, status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
      { name: "Morning Ritual Masters", cat: "Habits", members: "445", posts: "31", activity: <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Moderate</span>, status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
      { name: "Book Writers Circle", cat: "Creativity", members: "178", posts: "19", activity: <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Active</span>, status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
    ]}
  />;
}

export function AdminChallengesPage() {
  return <AdminTablePage
    title="Challenges Management"
    subtitle="Create and manage platform challenges"
    addLabel="Create Challenge"
    columns={["Challenge", "Category", "Participants", "Duration", "Status", "Prize"]}
    rows={[
      { title: "30-Day Meditation", cat: "Wellness", participants: "1,234", duration: "30 days", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>, prize: "Wellness Badge + 500 pts" },
      { title: "No Excuses February", cat: "Productivity", participants: "2,890", duration: "28 days", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>, prize: "Legend Badge" },
      { title: "Financial Audit Week", cat: "Finance", participants: "567", duration: "7 days", status: <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Ending Soon</span>, prize: "Finance Master Badge" },
      { title: "Read 4 Books in 30 Days", cat: "Learning", participants: "445", duration: "30 days", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>, prize: "Knowledge Badge" },
      { title: "Marathon Training 12-Week", cat: "Fitness", participants: "234", duration: "84 days", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>, prize: "Athlete Badge + 1000 pts" },
    ]}
  />;
}

export function AdminCoursesPage() {
  return <AdminTablePage
    title="Course Management"
    subtitle="Manage learning content and courses"
    addLabel="Add Course"
    columns={["Course Title", "Category", "Instructor", "Students", "Rating", "Completion", "Status"]}
    rows={[
      { title: "Deep Learning Specialization", cat: "Technology", instructor: "Dr. Andrew Liu", students: "12,400", rating: "⭐ 4.9", completion: "72%", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Published</span> },
      { title: "Financial Independence Masterclass", cat: "Finance", instructor: "Sarah Ramsey", students: "9,800", rating: "⭐ 4.8", completion: "85%", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Published</span> },
      { title: "Leadership & Influence", cat: "Leadership", instructor: "John Maxwell Jr.", students: "15,200", rating: "⭐ 4.9", completion: "91%", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Published</span> },
      { title: "Startup Fundraising Bootcamp", cat: "Entrepreneurship", instructor: "Kevin Park", students: "7,200", rating: "⭐ 4.7", completion: "68%", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Published</span> },
      { title: "Mindset Reset", cat: "Psychology", instructor: "Dr. Carol Hayes", students: "5,100", rating: "⭐ 4.8", completion: "79%", status: <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Draft</span> },
    ]}
  />;
}

export function AdminMentorsPage() {
  return <AdminTablePage
    title="Mentors & Coaches"
    subtitle="Manage verified mentors and coaches on the platform"
    addLabel="Add Mentor"
    columns={["Name", "Specialty", "Sessions", "Rating", "Users", "Status"]}
    rows={[
      { name: "Dr. Sarah Chen", specialty: "Mindset & Performance", sessions: "1,240", rating: "⭐ 4.9", users: "342", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
      { name: "Marcus Lee", specialty: "Entrepreneurship", sessions: "890", rating: "⭐ 4.8", users: "218", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
      { name: "Dr. Amy Johnson", specialty: "Wellness & Nutrition", sessions: "2,100", rating: "⭐ 4.9", users: "567", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
      { name: "Kevin Park", specialty: "Startup & Fundraising", sessions: "560", rating: "⭐ 4.7", users: "142", status: <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Pending Review</span> },
    ]}
  />;
}

export function AdminContentPage() {
  return <AdminTablePage
    title="Content Management"
    subtitle="Manage blog posts, articles, and platform content"
    addLabel="Create Content"
    columns={["Title", "Type", "Author", "Published", "Views", "Status"]}
    rows={[
      { title: "The Science Behind Habit Formation", type: "Blog", author: "Dr. Lisa Chen", published: "Jan 12, 2025", views: "24,580", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Published</span> },
      { title: "How to Set Goals That Actually Work", type: "Blog", author: "Marcus Lee", published: "Jan 10, 2025", views: "18,920", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Published</span> },
      { title: "Q1 Platform Update", type: "Announcement", author: "Droms Team", published: "Jan 5, 2025", views: "156,840", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Published</span> },
      { title: "February Challenge Guide", type: "Guide", author: "Droms Team", published: "—", views: "0", status: <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Draft</span> },
    ]}
  />;
}

export function AdminTestimonialsPage() {
  return <AdminTablePage
    title="Testimonials"
    subtitle="Review and approve user success stories"
    addLabel="Add Testimonial"
    columns={["User", "Role", "Achievement", "Rating", "Status"]}
    rows={[
      { user: "Sarah Chen", role: "Product Manager", achievement: "Got promoted + launched startup", rating: "⭐⭐⭐⭐⭐", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Approved</span> },
      { user: "Marcus Johnson", role: "Entrepreneur", achievement: "3x revenue growth in 12 months", rating: "⭐⭐⭐⭐⭐", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Approved</span> },
      { user: "Priya Sharma", role: "Medical Professional", achievement: "Marathon + 30lbs lost + book written", rating: "⭐⭐⭐⭐⭐", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Approved</span> },
      { user: "James Liu", role: "Financial Analyst", achievement: "3x portfolio growth in 18 months", rating: "⭐⭐⭐⭐⭐", status: <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Pending</span> },
    ]}
  />;
}

export function AdminSubscriptionsPage() {
  return <AdminTablePage
    title="Subscriptions"
    subtitle="Manage all user subscriptions and billing"
    addLabel="Create Subscription"
    columns={["User", "Plan", "Amount", "Billing", "Start Date", "Next Renewal", "Status"]}
    rows={[
      { user: "Emma Chen", plan: "Pro", amount: "$19/mo", billing: "Monthly", start: "Oct 15, 2024", renewal: "Feb 15, 2025", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
      { user: "Michael Johnson", plan: "Enterprise", amount: "$49/mo", billing: "Monthly", start: "Aug 20, 2024", renewal: "Feb 20, 2025", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
      { user: "Sarah Mitchell", plan: "Pro", amount: "$19/mo", billing: "Annual", start: "Jan 1, 2025", renewal: "Jan 1, 2026", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
      { user: "James Liu", plan: "Starter", amount: "Free", billing: "—", start: "Jan 13, 2025", renewal: "—", status: <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">Free</span> },
    ]}
  />;
}

export function AdminPaymentsPage() {
  return <AdminTablePage
    title="Payments"
    subtitle="All payment transactions and receipts"
    addLabel="Generate Invoice"
    columns={["Transaction ID", "User", "Amount", "Plan", "Date", "Method", "Status"]}
    rows={[
      { id: "TXN-89421", user: "Emma Chen", amount: "$19.00", plan: "Pro", date: "Jan 15, 2025", method: "Visa ••4242", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Succeeded</span> },
      { id: "TXN-89420", user: "Michael Johnson", amount: "$49.00", plan: "Enterprise", date: "Jan 15, 2025", method: "Mastercard ••8821", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Succeeded</span> },
      { id: "TXN-89418", user: "Alex Rivera", amount: "$49.00", plan: "Enterprise", date: "Jan 14, 2025", method: "Visa ••1234", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Succeeded</span> },
      { id: "TXN-89410", user: "Priya Sharma", amount: "$19.00", plan: "Pro", date: "Jan 12, 2025", method: "PayPal", status: <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Failed</span> },
    ]}
  />;
}

export function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900">Platform Analytics</h1>
        <p className="text-slate-500 text-sm mt-1">Platform-wide performance metrics and insights</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "DAU", value: "24,820", sub: "+12.4% vs last week", color: "text-primary-600" },
          { label: "MAU", value: "89,400", sub: "+8.2% vs last month", color: "text-blue-600" },
          { label: "Avg Session", value: "18.4 min", sub: "+2.1 min vs last month", color: "text-green-600" },
          { label: "Goal Completion Rate", value: "89%", sub: "Platform average", color: "text-amber-600" },
        ].map(k => (
          <div key={k.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500 mb-1">{k.label}</p>
            <p className={`text-xl font-bold font-display ${k.color}`}>{k.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-900 mb-4">Top User Actions (Last 30 Days)</h3>
        <div className="space-y-3">
          {[
            { action: "Goal Created", count: "248,920", pct: 95 },
            { action: "Habit Tracked", count: "1,842,400", pct: 100 },
            { action: "AI Coach Session", count: "482,100", pct: 75 },
            { action: "Vision Board Updated", count: "124,580", pct: 48 },
            { action: "Course Lesson Completed", count: "892,340", pct: 82 },
          ].map(item => (
            <div key={item.action} className="flex items-center gap-4">
              <span className="text-sm text-slate-700 w-48">{item.action}</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full">
                <div className="h-full bg-primary-600 rounded-full" style={{ width: `${item.pct}%` }} />
              </div>
              <span className="text-sm font-medium text-slate-700 w-24 text-right">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900">Reports</h1>
        <p className="text-slate-500 text-sm mt-1">Generate and download platform reports</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: "User Growth Report", desc: "Monthly user acquisition, retention, and churn analysis", type: "PDF / Excel" },
          { title: "Revenue Report", desc: "MRR, ARR, plan distribution, and payment analytics", type: "PDF / Excel / CSV" },
          { title: "Engagement Report", desc: "DAU/MAU, feature usage, and session analytics", type: "PDF / Excel" },
          { title: "Content Performance", desc: "Course completions, blog views, and content effectiveness", type: "PDF / CSV" },
          { title: "Community Report", desc: "Group activity, post volume, and challenge participation", type: "PDF / Excel" },
          { title: "Support Report", desc: "Ticket volume, resolution time, and satisfaction scores", type: "PDF" },
        ].map(r => (
          <div key={r.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="font-bold text-slate-900 mb-2">{r.title}</h3>
            <p className="text-sm text-slate-500 mb-4">{r.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{r.type}</span>
              <button onClick={() => toast.success(`${r.title} downloaded!`)} className="text-xs font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminNotificationsPage() {
  return <AdminTablePage
    title="Notification Management"
    subtitle="Manage push notifications and email campaigns"
    addLabel="Send Notification"
    columns={["Title", "Type", "Target", "Sent", "Open Rate", "Status"]}
    rows={[
      { title: "January Challenge Reminder", type: "Push", target: "All Pro Users", sent: "42,180", openRate: "68%", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Sent</span> },
      { title: "New Course: AI Mastery", type: "Email", target: "All Users", sent: "156,842", openRate: "34%", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Sent</span> },
      { title: "Weekly Progress Report", type: "Email", target: "Active Users", sent: "89,400", openRate: "71%", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Sent</span> },
      { title: "February Challenge Launch", type: "Push + Email", target: "All Users", sent: "—", openRate: "—", status: <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Scheduled</span> },
    ]}
  />;
}

export function AdminSupportPage() {
  return <AdminTablePage
    title="Support Tickets"
    subtitle="Manage user support requests"
    addLabel="Create Ticket"
    columns={["Ticket ID", "User", "Subject", "Priority", "Assigned To", "Created", "Status"]}
    rows={[
      { id: "#TKT-4821", user: "James Liu", subject: "Can't access premium features", priority: <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">High</span>, assigned: "Support Team", created: "Jan 15, 2025", status: <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Open</span> },
      { id: "#TKT-4820", user: "Emma Chen", subject: "Vision board not saving", priority: <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Medium</span>, assigned: "Tech Support", created: "Jan 14, 2025", status: <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">In Progress</span> },
      { id: "#TKT-4815", user: "Marcus J", subject: "Billing question about annual plan", priority: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Low</span>, assigned: "Billing Team", created: "Jan 12, 2025", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Resolved</span> },
    ]}
  />;
}

export function AdminRolesPage() {
  return <AdminTablePage
    title="Roles & Permissions"
    subtitle="Manage user types, roles, and platform permissions"
    addLabel="Create Role"
    columns={["Role Name", "Description", "Flow / Actions", "Status"]}
    rows={[
      { role: "Individual User", desc: "Personal aspirations & tracking", flow: "Register → Define Dreams → Create Goals → Build Habits → Achieve Milestones", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
      { role: "Student", desc: "Academic growth & studies", flow: "Set Academic Goals → Track Learning → Build Study Habits → Milestones", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
      { role: "Professional", desc: "Career development", flow: "Define Career Goals → Build Skills → Track Achievements → Advance", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
      { role: "Entrepreneur", desc: "Business vision & KPIs", flow: "Set Business Vision → Create Growth Plan → Monitor KPIs → Goals", status: <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span> },
      { role: "Coach / Mentor", desc: "User guidance & reviews", flow: "Guide Users → Monitor Progress → Provide Accountability → Celebrate", status: <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Verified</span> },
      { role: "Community Leader", desc: "Moderates groups & challenges", flow: "Manage Groups → Organize Challenges → Encourage → Growth", status: <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Moderator</span> },
      { role: "Admin", desc: "Ecosystem governance & metrics", flow: "Manage Platform → Monitor Communities → Analyze Growth → Optimize", status: <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">System Role</span> },
    ]}
  />;
}

export function AdminPermissionsPage() {
  const rolesList = [
    "Individual User", "Student", "Professional", "Entrepreneur", "Coach / Mentor", "Community Leader", "Admin"
  ];

  const permissions = [
    { module: "Dream & Goal Management", grants: [true, true, true, true, true, true, true] },
    { module: "AI Life Coach Access", grants: [true, true, true, true, false, false, true] },
    { module: "Habit & Routine Tracker", grants: [true, true, true, true, false, false, true] },
    { module: "Personal Growth Academy", grants: [true, true, true, true, true, true, true] },
    { module: "Financial Goal Planning", grants: [true, false, true, true, false, false, true] },
    { module: "Community & Accountability", grants: [true, true, true, true, true, true, true] },
    { module: "Success Analytics", grants: [true, true, true, true, true, true, true] },
    { module: "User Management", grants: [false, false, false, false, true, true, true] },
    { module: "Platform Moderation", grants: [false, false, false, false, false, true, true] },
    { module: "System Settings", grants: [false, false, false, false, false, false, true] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900">Permissions Matrix</h1>
        <p className="text-slate-500 text-sm mt-1">Configure permissions for each user type</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase px-6 py-4">Module</th>
                {rolesList.map(r => (
                  <th key={r} className="text-center text-xs font-semibold text-slate-500 uppercase px-4 py-4 min-w-[120px]">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map(p => (
                <tr key={p.module} className="hover:bg-slate-50">
                  <td className="px-6 py-3 text-sm font-medium text-slate-900">{p.module}</td>
                  {p.grants.map((perm, i) => (
                    <td key={i} className="px-4 py-3 text-center">
                      {perm ? <span className="text-green-600 font-bold">✓</span> : <span className="text-slate-300">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900">Admin Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Platform configuration and system settings</p>
      </div>
      {[
        { section: "General Settings", fields: [
          { label: "Platform Name", value: "Droms" },
          { label: "Support Email", value: "support@droms.ai" },
          { label: "Max Free Dreams", value: "5" },
          { label: "Max Free Goals", value: "10" },
        ]},
        { section: "Feature Flags", fields: [
          { label: "AI Coach (Pro+)", value: "Enabled" },
          { label: "Vision Board Studio", value: "Enabled" },
          { label: "Community Groups", value: "Enabled" },
          { label: "Challenges Beta", value: "Enabled" },
        ]},
      ].map(section => (
        <div key={section.section} className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-4">{section.section}</h3>
          <div className="space-y-3">
            {section.fields.map(f => (
              <div key={f.label} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-700">{f.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-900">{f.value}</span>
                  <button onClick={() => toast.success("Setting updated!")} className="text-xs text-primary-600 hover:underline">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
