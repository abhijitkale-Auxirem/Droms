import { useState } from "react";
import { Terminal, Shield, Sparkles, Target, CheckSquare, Brain, ArrowRight, Copy, Check } from "lucide-react";
import { toast } from "sonner";

type Language = "curl" | "javascript" | "python";

interface CodeExamples {
  curl: string;
  javascript: string;
  python: string;
}

interface Endpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  title: string;
  desc: string;
  params: { name: string; type: string; required: boolean; desc: string }[];
  examples: CodeExamples;
  response: string;
}

const endpoints: Endpoint[] = [
  {
    id: "auth",
    method: "POST",
    path: "/api/v1/auth/token",
    title: "Authenticate Request",
    desc: "Exchange your API secret key for a short-lived bearer token to authenticate subsequent requests.",
    params: [
      { name: "client_id", type: "string", required: true, desc: "Your unique Auxirem client identifier." },
      { name: "client_secret", type: "string", required: true, desc: "Your Auxirem API secret key." }
    ],
    examples: {
      curl: `curl -X POST https://api.auxirem.com/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "aux_983274",
    "client_secret": "sk_live_8f372a83e0c..."
  }'`,
      javascript: `const response = await fetch('https://api.auxirem.com/v1/auth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_id: 'aux_983274',
    client_secret: 'sk_live_8f372a83e0c...'
  })
});
const { access_token } = await response.json();`,
      python: `import requests

resp = requests.post(
    'https://api.auxirem.com/v1/auth/token',
    json={
        'client_id': 'aux_983274',
        'client_secret': 'sk_live_8f372a83e0c...'
    }
)
access_token = resp.json()['access_token']`
    },
    response: `{
  "access_token": "token_7a8d29c8...",
  "token_type": "Bearer",
  "expires_in": 3600
}`
  },
  {
    id: "goals",
    method: "GET",
    path: "/api/v1/goals",
    title: "Retrieve Goals",
    desc: "Fetch list of active goals, filtered by status, category, or milestone target dates.",
    params: [
      { name: "status", type: "string", required: false, desc: "Filter by goal status: 'active', 'completed', 'overdue'." },
      { name: "limit", type: "integer", required: false, desc: "Number of goals to return (default: 20, max: 100)." }
    ],
    examples: {
      curl: `curl -X GET https://api.auxirem.com/v1/goals?status=active \\
  -H "Authorization: Bearer token_7a8d29c8..."`,
      javascript: `const response = await fetch('https://api.auxirem.com/v1/goals?status=active', {
  headers: {
    'Authorization': 'Bearer token_7a8d29c8...'
  }
});
const goals = await response.json();`,
      python: `import requests

resp = requests.get(
    'https://api.auxirem.com/v1/goals',
    params={'status': 'active'},
    headers={'Authorization': 'Bearer token_7a8d29c8...'}
)
goals = resp.json()`
    },
    response: `[
  {
    "id": "goal_8273",
    "title": "Launch Auxirem MVP",
    "status": "active",
    "progress": 80,
    "milestones_count": 5,
    "created_at": "2026-05-10T12:00:00Z"
  }
]`
  },
  {
    id: "habits",
    method: "POST",
    path: "/api/v1/habits/log",
    title: "Log Habit Progress",
    desc: "Record a completion or metric update for a specific daily habit routine.",
    params: [
      { name: "habit_id", type: "string", required: true, desc: "The identifier of the target habit." },
      { name: "completed_at", type: "string", required: true, desc: "ISO 8601 formatted timestamp of execution." }
    ],
    examples: {
      curl: `curl -X POST https://api.auxirem.com/v1/habits/log \\
  -H "Authorization: Bearer token_7a8d29c8..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "habit_id": "hab_0918",
    "completed_at": "2026-06-12T17:40:00Z"
  }'`,
      javascript: `const response = await fetch('https://api.auxirem.com/v1/habits/log', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer token_7a8d29c8...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    habit_id: 'hab_0918',
    completed_at: '2026-06-12T17:40:00Z'
  })
});
const result = await response.json();`,
      python: `import requests

resp = requests.post(
    'https://api.auxirem.com/v1/habits/log',
    json={
        'habit_id': 'hab_0918',
        'completed_at': '2026-06-12T17:40:00Z'
    },
    headers={'Authorization': 'Bearer token_7a8d29c8...'}
)
result = resp.json()`
    },
    response: `{
  "success": true,
  "habit_id": "hab_0918",
  "streak_count": 14,
  "score_delta": +2.5
}`
  },
  {
    id: "coach",
    method: "POST",
    path: "/api/v1/coach/chat",
    title: "Query AI Coach",
    desc: "Submit prompts directly to the AI coach context and retrieve motivational recommendations.",
    params: [
      { name: "message", type: "string", required: true, desc: "The user query or context string." },
      { name: "context_scope", type: "array", required: false, desc: "Scope identifiers: 'goals', 'habits', 'finance'." }
    ],
    examples: {
      curl: `curl -X POST https://api.auxirem.com/v1/coach/chat \\
  -H "Authorization: Bearer token_7a8d29c8..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Give me tips for staying consistent with my fitness goals",
    "context_scope": ["goals", "habits"]
  }'`,
      javascript: `const response = await fetch('https://api.auxirem.com/v1/coach/chat', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer token_7a8d29c8...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: 'Give me tips for staying consistent with my fitness goals',
    context_scope: ['goals', 'habits']
  })
});
const reply = await response.json();`,
      python: `import requests

resp = requests.post(
    'https://api.auxirem.com/v1/coach/chat',
    json={
        'message': 'Give me tips for staying consistent with my fitness goals',
        'context_scope': ['goals', 'habits']
    },
    headers={'Authorization': 'Bearer token_7a8d29c8...'}
)
reply = resp.json()`
    },
    response: `{
  "response": "Based on your 14-day habit streak, you perform best between 8-10 AM. I recommend shifting your workout session block to mornings. Keep driving forward!",
  "suggested_actions": [
    { "type": "reschedule_habit", "habit_id": "hab_0918", "time": "08:30" }
  ]
}`
  }
];

export default function DocsPage() {
  const [lang, setLang] = useState<Language>("curl");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Snippet copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row pt-20">
      {/* Sticky Left Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-white/10 p-6 md:sticky md:top-20 md:h-[calc(100vh-80px)] overflow-y-auto">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center">
            <Terminal className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-bold text-lg font-display text-white">Auxirem API</span>
        </div>

        <nav className="space-y-8">
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Getting Started</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleScrollTo("welcome")} className="text-slate-300 hover:text-white transition-colors w-full text-left font-medium">
                  Introduction
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo("auth")} className="text-slate-300 hover:text-white transition-colors w-full text-left font-medium">
                  Authentication
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Resources Reference</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {endpoints.slice(1).map((ep) => (
                <li key={ep.id}>
                  <button
                    onClick={() => handleScrollTo(ep.id)}
                    className="flex items-center gap-2 text-left hover:text-white transition-colors font-medium"
                  >
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded leading-none ${
                      ep.method === "GET" ? "bg-emerald-950 text-emerald-400 border border-emerald-800/50" : "bg-purple-950 text-purple-400 border border-purple-800/50"
                    }`}>
                      {ep.method}
                    </span>
                    <span>{ep.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto px-6 md:px-12 py-10 grid lg:grid-cols-2 gap-12 overflow-x-hidden">
        {/* Left Column: Descriptions */}
        <div className="space-y-16 lg:max-w-xl">
          <section id="welcome" className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-purple-950 text-purple-300 border border-purple-800/50 rounded-full px-4 py-1.5 text-sm font-medium">
              <Shield className="w-4 h-4" /> v1.0.0 Stable API
            </div>
            <h1 className="text-4xl font-extrabold font-display text-white leading-tight">
              Build with the <span className="gradient-text">Auxirem Platform</span>
            </h1>
            <p className="text-slate-300 leading-relaxed">
              Integrate the power of Auxirem's goal planning, AI success coaching, and habit metrics into your own scripts, widgets, or third-party products.
            </p>
            <p className="text-slate-400 text-sm">
              Our REST API accepts JSON bodies, returns standard response codes, and utilizes OAuth2/Bearer standard authentication.
            </p>
          </section>

          {endpoints.map((ep) => (
            <section key={ep.id} id={ep.id} className="space-y-4 pt-10 border-t border-white/5">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2 py-1 rounded border ${
                  ep.method === "GET" ? "bg-emerald-950 text-emerald-400 border-emerald-800/50" : "bg-purple-950 text-purple-400 border-purple-800/50"
                }`}>
                  {ep.method}
                </span>
                <span className="text-sm font-mono text-slate-300 font-semibold">{ep.path}</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-white">{ep.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{ep.desc}</p>

              {/* Params list */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Request Parameters</h4>
                <div className="border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10 text-xs">
                  {ep.params.map((p) => (
                    <div key={p.name} className="p-3 bg-slate-900/50 flex flex-col sm:flex-row gap-2">
                      <div className="sm:w-1/3">
                        <span className="font-mono text-slate-100 font-bold">{p.name}</span>
                        <span className="text-[10px] text-slate-500 block">{p.type} · {p.required ? "required" : "optional"}</span>
                      </div>
                      <div className="sm:w-2/3 text-slate-300">{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Right Column: Code blocks and response mocks (Sticky on desktop) */}
        <div className="space-y-12 lg:sticky lg:top-24 lg:h-[calc(100vh-140px)] overflow-y-auto pr-2">
          {/* Language Switcher */}
          <div className="flex items-center justify-between bg-slate-900 border border-white/10 rounded-2xl p-1">
            <div className="flex gap-1">
              {(["curl", "javascript", "python"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all uppercase ${
                    lang === l ? "bg-gradient-purple text-white shadow" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {l === "curl" ? "cURL" : l}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-slate-500 px-3 font-semibold uppercase tracking-wider">REST Request</span>
          </div>

          {endpoints.map((ep) => {
            const code = ep.examples[lang];
            const isCopied = copiedId === `${ep.id}-${lang}`;
            return (
              <div key={ep.id} className="space-y-4">
                {/* Code Request Block */}
                <div>
                  <div className="flex justify-between items-center bg-slate-900 border border-white/10 border-b-0 rounded-t-2xl px-4 py-2 text-xs">
                    <span className="font-semibold text-slate-400">{ep.title} Request ({lang})</span>
                    <button
                      onClick={() => handleCopyCode(`${ep.id}-${lang}`, code)}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <pre className="bg-slate-900/40 border border-white/10 rounded-b-2xl p-4 overflow-x-auto text-[11px] font-mono leading-relaxed text-slate-200 scrollbar-thin">
                    <code>{code}</code>
                  </pre>
                </div>

                {/* Response Block */}
                <div>
                  <div className="bg-slate-900 border border-white/10 border-b-0 rounded-t-2xl px-4 py-2 text-xs">
                    <span className="font-semibold text-slate-400">Response Example (200 OK)</span>
                  </div>
                  <pre className="bg-slate-950/60 border border-white/10 rounded-b-2xl p-4 overflow-x-auto text-[11px] font-mono leading-relaxed text-slate-300 scrollbar-thin">
                    <code>{ep.response}</code>
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
