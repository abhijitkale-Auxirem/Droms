import { useState, useRef, useEffect } from "react";
import { Brain, Send, Sparkles, Zap, Target, Heart, TrendingUp, RefreshCw } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

interface Message { id: string; role: "user" | "assistant"; content: string; timestamp: Date; }

const SUGGESTIONS = [
  "How can I achieve my startup goal faster?",
  "Create a morning routine for peak performance",
  "How should I invest my first $10,000?",
  "Help me overcome procrastination",
  "What habits should I build for career growth?",
  "Create a 30-day fitness plan for me",
];

const AI_RESPONSES: Record<string, string> = {
  default: "Great question! Based on your current progress and goals, here's my personalized recommendation:\n\n**Key Insights:**\n• Your success score of 847 puts you in the top 15% of Droms users\n• Your 42-day habit streak shows exceptional consistency\n• Your biggest growth opportunity is in your financial goals\n\n**Recommended Actions:**\n1. Dedicate 2 focused hours daily to your MVP development\n2. Schedule investor outreach calls for Tuesday and Thursday mornings\n3. Increase your monthly investment contribution by $500\n\nYou're doing exceptionally well. Keep this momentum going! 🚀",
  startup: "Your startup journey is on track! Here's a focused 30-day sprint plan:\n\n**Week 1-2: MVP Finalization**\n• Complete remaining 20% of core features\n• Set up beta testing group of 50 users\n• Create pitch deck (use our Career Growth module for templates)\n\n**Week 3-4: Investor Preparation**\n• Research 20 target seed investors in your space\n• Perfect your 60-second pitch\n• Set up 5 warm introductions through LinkedIn\n\n**Key Metrics to Track:**\n• Daily active users: Target 100 by month end\n• Retention rate: Aim for 40%+ day-7 retention\n• MRR: Target first $1,000\n\nYou've got this! Your consistency score suggests you'll nail the execution. 💪",
  habit: "Building peak performance habits requires strategic layering. Here's your personalized morning routine:\n\n**5:30 AM - Wake & Hydrate** (5 min)\n• Drink 500ml water immediately\n• No phone for first 30 minutes\n\n**5:35 AM - Movement** (20 min)\n• 10 min yoga or stretching\n• 10 min brisk walk or light cardio\n\n**5:55 AM - Mindfulness** (15 min)\n• 10 min meditation (you're already doing this — great!)\n• 5 min gratitude journaling\n\n**6:10 AM - Deep Work Prep** (10 min)\n• Review your top 3 priorities for the day\n• Set up your workspace\n• No email or social media until 10 AM\n\n**6:20 AM - Peak Focus Block** (90 min)\n• Your most important task, zero interruptions\n\nYour current 42-day streak proves you can stick to routines. This upgrade will boost your success score by an estimated 80-120 points! 🌅",
};

const getAIResponse = (message: string): string => {
  const lower = message.toLowerCase();
  if (lower.includes("startup") || lower.includes("business") || lower.includes("mvp")) return AI_RESPONSES.startup;
  if (lower.includes("morning") || lower.includes("routine") || lower.includes("habit")) return AI_RESPONSES.habit;
  return AI_RESPONSES.default;
};

function formatMessage(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      return <p key={i} className="font-bold text-slate-900 mt-3 first:mt-0">{line.replace(/\*\*/g, "")}</p>;
    }
    if (line.startsWith("• ")) {
      return <li key={i} className="ml-4 text-slate-700">{line.replace("• ", "")}</li>;
    }
    if (/^\d+\./.test(line)) {
      return <li key={i} className="ml-4 text-slate-700 list-decimal">{line.replace(/^\d+\. /, "")}</li>;
    }
    if (line === "") return <br key={i} />;
    return <p key={i} className="text-slate-700">{line}</p>;
  });
}

export default function AICoachPage() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Welcome back, ${user?.name?.split(" ")[0]}! 🌟\n\nI've analyzed your recent progress and I'm excited to work with you today. Your success score is at **847** — you're in peak form!\n\n**Today's Priority Insights:**\n• Your startup MVP is at 80% — push for 90% this week\n• Habit streak at 42 days — protect it at all costs\n• Financial goals are on track — consider increasing investment\n\nWhat would you like to focus on today? I'm here to help you crush your goals!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (text?: string) => {
    const msgText = text || input.trim();
    if (!msgText) return;
    setInput("");
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: msgText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: getAIResponse(msgText), timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const quickStats = [
    { icon: Target, label: "Goals On Track", value: "7/10", color: "text-blue-600 bg-blue-50" },
    { icon: Sparkles, label: "Success Score", value: "847", color: "text-purple-600 bg-purple-50" },
    { icon: Heart, label: "Wellness Score", value: "82%", color: "text-pink-600 bg-pink-50" },
    { icon: TrendingUp, label: "Growth Rate", value: "+23%", color: "text-green-600 bg-green-50" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)] max-w-7xl mx-auto">
      {/* Chat */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-primary-50 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-purple flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Droms AI Coach</p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-xs text-slate-500">Active & analyzing your data</p>
              </div>
            </div>
          </div>
          <button onClick={() => setMessages(msgs => [msgs[0]])} className="p-2 rounded-lg hover:bg-white text-slate-400 hover:text-slate-600 transition-colors" title="Clear chat">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
          {messages.map(msg => (
            <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
              {msg.role === "assistant" ? (
                <div className="w-8 h-8 rounded-xl bg-gradient-purple flex items-center justify-center flex-shrink-0 mt-1">
                  <Brain className="w-4 h-4 text-white" />
                </div>
              ) : (
                <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=7C3AED&color=fff`}
                  alt={user?.name} className="w-8 h-8 rounded-full flex-shrink-0 mt-1" />
              )}
              <div className={cn("max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                msg.role === "assistant" ? "bg-slate-50 border border-slate-200 text-slate-700" : "bg-primary-600 text-white"
              )}>
                {msg.role === "assistant" ? <div className="space-y-1">{formatMessage(msg.content)}</div> : msg.content}
                <p className={cn("text-xs mt-2", msg.role === "assistant" ? "text-slate-400" : "text-white/60")}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-purple flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-slate-100">
          {SUGGESTIONS.slice(0, 4).map(s => (
            <button key={s} onClick={() => sendMessage(s)}
              className="flex-shrink-0 text-xs bg-slate-100 hover:bg-primary-100 hover:text-primary-700 text-slate-600 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap">
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex gap-3">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask your AI coach anything..." disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm" />
            <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
              className="w-11 h-11 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Stats */}
      <div className="lg:w-72 space-y-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-slate-900">Your Performance</h3>
          </div>
          <div className="space-y-3">
            {quickStats.map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${color.split(" ")[1]} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${color.split(" ")[0]}`} />
                  </div>
                  <span className="text-sm text-slate-600">{label}</span>
                </div>
                <span className={`font-bold text-sm ${color.split(" ")[0]}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-dark rounded-2xl p-5 text-white">
          <h3 className="font-semibold mb-3">Today's Focus</h3>
          <div className="space-y-2">
            {["Complete MVP feature set", "Reach out to 3 investors", "20 min meditation", "Journal entry"].map((task, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-4 h-4 rounded-full border border-slate-500 flex-shrink-0" />
                {task}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-3">Quick Suggestions</h3>
          <div className="space-y-2">
            {SUGGESTIONS.slice(4).map(s => (
              <button key={s} onClick={() => sendMessage(s)} className="w-full text-left text-xs text-slate-600 hover:text-primary-600 p-2 rounded-lg hover:bg-primary-50 transition-colors">
                💡 {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
