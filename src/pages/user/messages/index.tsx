import { useState } from "react";
import { MessageSquare, Search, Send, Phone, Video, MoreVertical, Circle } from "lucide-react";

const contacts = [
  { id: "c1", name: "Alex Rivera", role: "Accountability Partner", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face", lastMessage: "How's the startup going?", time: "2m ago", unread: 2, online: true },
  { id: "c2", name: "Emma Wilson", role: "Marathon Training Buddy", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face", lastMessage: "Great run today! 18 miles 🎉", time: "1h ago", unread: 0, online: true },
  { id: "c3", name: "Droms AI Coach", role: "AI Life Coach", avatar: "", lastMessage: "Your weekly report is ready", time: "3h ago", unread: 1, online: true, isAI: true },
  { id: "c4", name: "Raj Patel", role: "Finance Goal Partner", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face", lastMessage: "Hit 70% on my savings goal!", time: "Yesterday", unread: 0, online: false },
  { id: "c5", name: "Startup Founders Network", role: "Group · 234 members", avatar: "", lastMessage: "New challenge posted!", time: "Yesterday", unread: 5, online: false, isGroup: true },
];

const messages = [
  { id: 1, sender: "Alex Rivera", content: "Hey! How's the MVP development coming along?", time: "10:30 AM", mine: false },
  { id: 2, sender: "me", content: "Actually really good! Hit 80% completion yesterday. Hoping to launch a beta by end of month 🚀", time: "10:32 AM", mine: true },
  { id: 3, sender: "Alex Rivera", content: "That's incredible! You've been so consistent. Remember when you were stuck 3 months ago?", time: "10:33 AM", mine: false },
  { id: 4, sender: "me", content: "Haha yes! Breaking it down into daily tasks really helped. How's the fundraising going?", time: "10:35 AM", mine: true },
  { id: 5, sender: "Alex Rivera", content: "How's the startup going?", time: "10:40 AM", mine: false },
];

export default function MessagesPage() {
  const [selected, setSelected] = useState(contacts[0]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-slate-900">Messages</h1>
        <p className="text-slate-500 text-sm mt-1">Chat with accountability partners and coaches</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden" style={{ height: "600px" }}>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-80 border-r border-slate-200 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search conversations..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary-400" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.map(contact => (
                <div key={contact.id} onClick={() => setSelected(contact)}
                  className={`flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-slate-50 ${selected.id === contact.id ? "bg-primary-50 border-r-2 border-primary-500" : ""}`}>
                  <div className="relative flex-shrink-0">
                    {contact.avatar ? (
                      <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full" />
                    ) : (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${contact.isAI ? "bg-gradient-purple" : "bg-primary-200 text-primary-700"}`}>
                        {contact.isAI ? "AI" : contact.isGroup ? contact.name[0] : contact.name[0]}
                      </div>
                    )}
                    {contact.online && <Circle className="w-3 h-3 text-green-500 fill-current absolute -bottom-0.5 -right-0.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-slate-900 truncate">{contact.name}</span>
                      <span className="text-xs text-slate-400 flex-shrink-0 ml-2">{contact.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {contact.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                {selected.avatar ? (
                  <img src={selected.avatar} alt={selected.name} className="w-9 h-9 rounded-full" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-purple flex items-center justify-center text-white font-bold text-sm">
                    {selected.name[0]}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{selected.name}</p>
                  <p className="text-xs text-slate-500">{selected.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><Phone className="w-4 h-4" /></button>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><Video className="w-4 h-4" /></button>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><MoreVertical className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-3 ${msg.mine ? "flex-row-reverse" : ""}`}>
                  {!msg.mine && (
                    <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs flex-shrink-0">
                      {selected.name[0]}
                    </div>
                  )}
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${msg.mine ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-800"}`}>
                    <p className="leading-relaxed">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.mine ? "text-primary-200" : "text-slate-400"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <input type="text" value={message} onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-primary-400"
                  placeholder="Type a message..." />
                <button onClick={handleSend} disabled={!message.trim()}
                  className="w-11 h-11 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:bg-slate-200 flex items-center justify-center text-white transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
