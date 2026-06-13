import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  Search, Send, Phone, Video, MoreVertical, Circle, Plus, Sparkles, MessageSquare,
  PhoneOff, Mic, MicOff, VideoOff, Volume2, VolumeX, Users, ScreenShare, Check
} from "lucide-react";
import { toast } from "sonner";

class ToneGenerator {
  private ctx: AudioContext | null = null;
  private ringOsc1: OscillatorNode | null = null;
  private ringOsc2: OscillatorNode | null = null;
  private ringGain: GainNode | null = null;
  private ringInterval: any = null;

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playRing() {
    this.init();
    if (!this.ctx) return;
    this.stopRing();

    const playTone = () => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      this.ringOsc1 = this.ctx.createOscillator();
      this.ringOsc2 = this.ctx.createOscillator();
      this.ringGain = this.ctx.createGain();

      this.ringOsc1.frequency.value = 440;
      this.ringOsc2.frequency.value = 480;
      this.ringGain.gain.setValueAtTime(0, now);
      this.ringGain.gain.linearRampToValueAtTime(0.08, now + 0.1);
      this.ringGain.gain.setValueAtTime(0.08, now + 1.8);
      this.ringGain.gain.linearRampToValueAtTime(0, now + 2.0);

      this.ringOsc1.connect(this.ringGain);
      this.ringOsc2.connect(this.ringGain);
      this.ringGain.connect(this.ctx.destination);

      this.ringOsc1.start(now);
      this.ringOsc2.start(now);

      this.ringOsc1.stop(now + 2.0);
      this.ringOsc2.stop(now + 2.0);
    };

    try {
      playTone();
      this.ringInterval = setInterval(playTone, 4000);
    } catch (e) {
      console.warn("Failed to play ring tone:", e);
    }
  }

  stopRing() {
    if (this.ringInterval) {
      clearInterval(this.ringInterval);
      this.ringInterval = null;
    }
    try {
      this.ringOsc1?.stop();
      this.ringOsc2?.stop();
    } catch (e) {}
    this.ringOsc1 = null;
    this.ringOsc2 = null;
    this.ringGain = null;
  }

  playConnect() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.frequency.setValueAtTime(600, now);
      osc.frequency.setValueAtTime(800, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.warn("Failed to play connect sound:", e);
    }
  }

  playDisconnect() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.3);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn("Failed to play disconnect sound:", e);
    }
  }
}

const initialContacts = [
  { id: "c1", name: "Alex Rivera", role: "Accountability Partner", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face", lastMessage: "How's the startup going?", time: "2m ago", unread: 2, online: true },
  { id: "c2", name: "Emma Wilson", role: "Marathon Training Buddy", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face", lastMessage: "Great run today! 18 miles 🎉", time: "1h ago", unread: 0, online: true },
  { id: "c3", name: "Droms AI Coach", role: "AI Life Coach", avatar: "", lastMessage: "Your weekly report is ready", time: "3h ago", unread: 1, online: true, isAI: true },
  { id: "c4", name: "Raj Patel", role: "Finance Goal Partner", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face", lastMessage: "Hit 70% on my savings goal!", time: "Yesterday", unread: 0, online: false },
  { id: "c5", name: "Startup Founders Network", role: "Group · 234 members", avatar: "", lastMessage: "New challenge posted!", time: "Yesterday", unread: 5, online: false, isGroup: true },
];

const initialChatLogs: Record<string, { id: number; sender: string; content: string; time: string; mine: boolean }[]> = {
  c1: [
    { id: 1, sender: "Alex Rivera", content: "Hey! How's the MVP development coming along?", time: "10:30 AM", mine: false },
    { id: 2, sender: "me", content: "Actually really good! Hit 80% completion yesterday. Hoping to launch a beta by end of month ", time: "10:32 AM", mine: true },
    { id: 3, sender: "Alex Rivera", content: "That's incredible! You've been so consistent. Remember when you were stuck 3 months ago?", time: "10:33 AM", mine: false },
    { id: 4, sender: "me", content: "Haha yes! Breaking it down into daily tasks really helped. How's the fundraising going?", time: "10:35 AM", mine: true },
    { id: 5, sender: "Alex Rivera", content: "How's the startup going?", time: "10:40 AM", mine: false },
  ],
  c2: [
    { id: 1, sender: "Emma Wilson", content: "Hey! Are we still running tomorrow morning?", time: "Yesterday", mine: false },
    { id: 2, sender: "me", content: "Yes! 6 AM at the park. Let's aim for 15 miles.", time: "Yesterday", mine: true },
    { id: 3, sender: "Emma Wilson", content: "Great run today! 18 miles 🎉", time: "1h ago", mine: false },
  ],
  c3: [
    { id: 1, sender: "Droms AI Coach", content: "Hello! I've analyzed your goal setting patterns and have prepared a tailored weekly roadmap. Click below to view.", time: "Yesterday", mine: false },
    { id: 2, sender: "me", content: "Thank you! I will look at it.", time: "Yesterday", mine: true },
    { id: 3, sender: "Droms AI Coach", content: "Your weekly report is ready", time: "3h ago", mine: false },
  ],
  c4: [
    { id: 1, sender: "Raj Patel", content: "Hey! Did you adjust your monthly savings target?", time: "2 days ago", mine: false },
    { id: 2, sender: "me", content: "Yes, increased to $2k/mo.", time: "2 days ago", mine: true },
    { id: 3, sender: "Raj Patel", content: "Hit 70% on my savings goal!", time: "Yesterday", mine: false },
  ],
  c5: [
    { id: 1, sender: "James Liu", content: "Who is up for a 5 AM writing sprint tomorrow?", time: "Yesterday", mine: false },
    { id: 2, sender: "Sarah Chen", content: "I am in! Let's meet in the audio channel.", time: "Yesterday", mine: false },
    { id: 3, sender: "Admin", content: "New challenge posted!", time: "Yesterday", mine: false },
  ],
};

export default function MessagesPage() {
  const [contactsList, setContactsList] = useState<typeof initialContacts>(() => {
    const cached = localStorage.getItem("droms_messages_contacts");
    return cached ? JSON.parse(cached) : initialContacts;
  });
  const [selected, setSelected] = useState<typeof initialContacts[0]>(() => {
    const cachedContacts = localStorage.getItem("droms_messages_contacts");
    const list = cachedContacts ? JSON.parse(cachedContacts) : initialContacts;
    return list[0] || initialContacts[0];
  });
  const [chatLogs, setChatLogs] = useState<typeof initialChatLogs>(() => {
    const cached = localStorage.getItem("droms_messages_chatlogs");
    return cached ? JSON.parse(cached) : initialChatLogs;
  });
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("droms_messages_contacts", JSON.stringify(contactsList));
  }, [contactsList]);

  useEffect(() => {
    localStorage.setItem("droms_messages_chatlogs", JSON.stringify(chatLogs));
  }, [chatLogs]);
  
  // Calling simulation states
  const [activeCall, setActiveCall] = useState<{ type: "audio" | "video"; status: "calling" | "connected" } | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  // AI Coach TTS / Interactive calling states
  const [aiSubtitles, setAiSubtitles] = useState("");
  const [aiSpeaking, setAiSpeaking] = useState(false);
  
  const toneGen = useRef<ToneGenerator | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  // Initialize tone generator
  useEffect(() => {
    toneGen.current = new ToneGenerator();
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices(); // pre-load voices
    }
    return () => {
      toneGen.current?.stopRing();
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const startLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      setLocalStream(stream);
      setIsCameraOff(false);
    } catch (e) {
      console.warn("Could not access camera:", e);
      toast.error("No camera found or permission denied. Using fallback mockup.");
    }
  };

  const stopLocalVideo = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
  };

  const handleStartCall = (type: "audio" | "video") => {
    // Reset call settings
    setIsMuted(false);
    setIsCameraOff(false);
    setIsScreenSharing(false);
    setAiSubtitles("");
    setAiSpeaking(false);

    if (selected.isAI) {
      // Connect AI Coach Call immediately (AI is always available)
      toneGen.current?.playConnect();
      setActiveCall({ type, status: "connected" });
      const greeting = `Hello! I am your Droms AI Coach. I've analyzed your goal patterns and milestones. Let's discuss your progress. How can I help you today?`;
      speakAIResponse(greeting);
      return;
    }

    // Standard User Call
    setActiveCall({ type, status: "calling" });
    toneGen.current?.playRing();
    
    // Simulate connection after 3 seconds
    setTimeout(() => {
      setActiveCall(prev => {
        if (prev && prev.status === "calling") {
          toneGen.current?.stopRing();
          toneGen.current?.playConnect();
          
          if (type === "video") {
            startLocalVideo();
          }
          return { ...prev, status: "connected" };
        }
        return prev;
      });
    }, 3000);
  };

  const handleEndCall = () => {
    toneGen.current?.stopRing();
    toneGen.current?.playDisconnect();
    stopLocalVideo();
    setActiveCall(null);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    toast.success("Call ended");
  };

  const speakAIResponse = (text: string) => {
    if (!window.speechSynthesis) {
      setAiSubtitles(text);
      return;
    }
    window.speechSynthesis.cancel();
    setAiSubtitles(text);
    setAiSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith("en")) || null;
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onend = () => setAiSpeaking(false);
    utterance.onerror = () => setAiSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Bind local camera stream to video element
  useEffect(() => {
    if (localVideoRef.current && localStream && !isCameraOff) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream, isCameraOff, activeCall]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filtered = contactsList.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLogs, selected.id]);

  const handleSend = () => {
    if (!message.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg = {
      id: Date.now(),
      sender: "me",
      content: message,
      time: timeStr,
      mine: true
    };

    setChatLogs(prev => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] || []), newMsg]
    }));

    // Update last message in the contact list
    setContactsList(prev =>
      prev.map(c =>
        c.id === selected.id
          ? { ...c, lastMessage: message, time: "Just now", unread: 0 }
          : c
      )
    );

    setMessage("");

    // Simulate Droms AI Coach response
    if (selected.isAI) {
      setTimeout(() => {
        const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const aiMsg = {
          id: Date.now() + 1,
          sender: "Droms AI Coach",
          content: "As your AI success coach, I recommend taking a small micro-action right now to build momentum. Remember: consistency beats intensity! 🚀",
          time: replyTime,
          mine: false
        };
        setChatLogs(prev => ({
          ...prev,
          [selected.id]: [...(prev[selected.id] || []), aiMsg]
        }));
        setContactsList(prev =>
          prev.map(c =>
            c.id === selected.id
              ? { ...c, lastMessage: aiMsg.content, time: "Just now" }
              : c
          )
        );
      }, 1000);
    }
  };

  const handleAddContact = () => {
    const name = window.prompt("Enter Contact Name:");
    if (!name) return;
    const role = window.prompt("Enter Role / Description (e.g., Accountability Partner, Coding Mentor):", "Accountability Partner");
    if (!role) return;

    const newContactId = `c-${Date.now()}`;
    const newContact = {
      id: newContactId,
      name,
      role,
      avatar: "",
      lastMessage: "Conversation started",
      time: "Just now",
      unread: 0,
      online: true
    };

    setContactsList(prev => [newContact, ...prev]);
    setChatLogs(prev => ({
      ...prev,
      [newContactId]: [
        { id: Date.now(), sender: name, content: `Hey! I'm excited to connect as your ${role}. Let's crush our goals! 💪`, time: "Just now", mine: false }
      ]
    }));
    setSelected(newContact);
    toast.success(`Contact "${name}" added!`);
  };

  const currentMessages = chatLogs[selected.id] || [];

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
            <div className="p-4 border-b border-slate-100 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary-400" />
              </div>
              <button 
                onClick={handleAddContact}
                className="p-2.5 bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-xl transition-colors flex-shrink-0"
                title="Add New Contact"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.map(contact => (
                <div key={contact.id} onClick={() => {
                  setSelected(contact);
                  // Clear unread indicator
                  setContactsList(prev => prev.map(c => c.id === contact.id ? { ...c, unread: 0 } : c));
                }}
                  className={`flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-slate-50 ${selected.id === contact.id ? "bg-primary-50 border-r-2 border-primary-500" : ""}`}>
                  <div className="relative flex-shrink-0">
                    {contact.avatar ? (
                      <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${contact.isAI ? "bg-gradient-purple" : "bg-primary-200 text-primary-700"}`}>
                        {contact.isAI ? <Sparkles className="w-4 h-4 text-white animate-pulse" /> : contact.name[0]}
                      </div>
                    )}
                    {contact.online && <Circle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 absolute -bottom-0.5 -right-0.5 border-2 border-white rounded-full" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-slate-900 truncate">{contact.name}</span>
                      <span className="text-[10px] text-slate-400 flex-shrink-0 ml-2">{contact.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                      {contact.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-slate-50/50">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                {selected.avatar ? (
                  <img src={selected.avatar} alt={selected.name} className="w-9 h-9 rounded-full object-cover" />
                ) : (
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm ${selected.isAI ? "bg-gradient-purple" : "bg-primary-200 text-primary-700"}`}>
                    {selected.isAI ? <Sparkles className="w-4 h-4 text-white" /> : selected.name[0]}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{selected.name}</p>
                  <p className="text-xs text-slate-500">{selected.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleStartCall("audio")} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" title="Voice Call"><Phone className="w-4 h-4" /></button>
                <button onClick={() => handleStartCall("video")} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" title="Video Call"><Video className="w-4 h-4" /></button>
                <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><MoreVertical className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map(msg => (
                <div key={msg.id} className={`flex gap-3 ${msg.mine ? "flex-row-reverse" : ""}`}>
                  {!msg.mine && (
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0 ${selected.isAI ? "bg-gradient-purple" : "bg-primary-200 text-primary-700"}`}>
                      {selected.isAI ? <Sparkles className="w-3 h-3 text-white" /> : selected.name[0]}
                    </div>
                  )}
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${msg.mine ? "bg-primary-600 text-white" : "bg-white text-slate-800 border border-slate-100"}`}>
                    <p className="leading-relaxed">{msg.content}</p>
                    <p className={`text-[9px] mt-1 text-right ${msg.mine ? "text-primary-200" : "text-slate-400"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-slate-200 bg-white">
              <div className="flex items-center gap-2">
                <input type="text" value={message} onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
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

      {activeCall && createPortal(
        <div className="fixed inset-0 bg-slate-950/95 z-[9999] flex flex-col items-center justify-center text-white backdrop-blur-lg transition-all duration-300">
          <div className="flex flex-col items-center max-w-2xl w-full p-6 text-center space-y-6">
            
            {/* Header info */}
            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-display tracking-tight text-white flex items-center justify-center gap-2">
                {selected.isAI && <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />}
                {selected.name}
              </h3>
              <p className="text-xs text-slate-400 capitalize tracking-wide">{selected.role}</p>
              <p className="text-sm font-semibold text-primary-400 animate-pulse mt-2">
                {activeCall.status === "calling" ? "Calling..." : `Connected · Active ${activeCall.type === "video" ? "Video" : "Audio"} Call`}
              </p>
            </div>

            {/* MAIN CONTAINER: Conditional layouts based on user, group, or AI coach */}
            {selected.isAI ? (
              /* AI COACH CALL VIEW */
              <div className="w-full max-w-md bg-slate-900/50 border border-purple-500/20 rounded-3xl p-6 flex flex-col items-center space-y-6 backdrop-blur-sm shadow-2xl shadow-purple-950/10">
                <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-gradient-purple shadow-lg">
                  <Sparkles className={`w-12 h-12 text-white ${aiSpeaking ? "animate-bounce" : "animate-pulse"}`} />
                  {/* Waveform circles */}
                  {aiSpeaking && (
                    <>
                      <div className="absolute -inset-2 rounded-full border border-purple-500/30 animate-ping opacity-60 pointer-events-none" />
                      <div className="absolute -inset-4 rounded-full border border-purple-500/10 animate-ping opacity-30 pointer-events-none" />
                    </>
                  )}
                </div>

                {/* Subtitles Area */}
                <div className="w-full bg-slate-950/60 border border-slate-800 rounded-2xl p-4 min-h-[90px] flex items-center justify-center">
                  <p className="text-sm text-purple-200 italic leading-relaxed text-center">
                    {aiSubtitles || "Initializing AI Coach..."}
                  </p>
                </div>

                {/* Interactive Speech Prompts */}
                <div className="w-full space-y-2">
                  <p className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-1">Choose a Topic to Speak:</p>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => speakAIResponse("Looking at your habit tracker, you've completed 85% of your morning routines this week! You have built a solid streak. Let's keep it up today!")}
                      className="px-4 py-2.5 text-xs text-left bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/30 rounded-xl transition-all flex items-center justify-between text-slate-200"
                    >
                      <span>📊 "Review my daily habits and streaks"</span>
                      <Check className="w-3.5 h-3.5 text-purple-400 opacity-60" />
                    </button>
                    <button 
                      onClick={() => speakAIResponse("Every single action you take is a vote for the person you want to become. Don't worry about being perfect, just focus on being consistent. You have the power to hit your target today!")}
                      className="px-4 py-2.5 text-xs text-left bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/30 rounded-xl transition-all flex items-center justify-between text-slate-200"
                    >
                      <span>🔥 "Give me a motivation booster"</span>
                      <Check className="w-3.5 h-3.5 text-purple-400 opacity-60" />
                    </button>
                    <button 
                      onClick={() => speakAIResponse("Let's break down your highest priority goal. I recommend choosing one micro-action that takes less than 15 minutes and completing it right after this call. What action will that be?")}
                      className="px-4 py-2.5 text-xs text-left bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/30 rounded-xl transition-all flex items-center justify-between text-slate-200"
                    >
                      <span>🚀 "Help me plan my next career goal"</span>
                      <Check className="w-3.5 h-3.5 text-purple-400 opacity-60" />
                    </button>
                  </div>
                </div>
              </div>
            ) : selected.isGroup ? (
              /* GROUP CALL GRID VIEW */
              <div className="w-full max-w-xl grid grid-cols-2 gap-4">
                {/* Participant 1: Alex Rivera */}
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center space-y-3 relative overflow-hidden ring-2 ring-emerald-500/50">
                  <div className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 animate-pulse">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Speaking
                  </div>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" className="w-16 h-16 rounded-full border-2 border-emerald-400 object-cover" alt="Alex Rivera" />
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-200">Alex Rivera</p>
                    <p className="text-[10px] text-slate-500">Accountability Partner</p>
                  </div>
                </div>

                {/* Participant 2: Emma Wilson */}
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center space-y-3 relative">
                  <div className="absolute top-2 right-2 bg-slate-950/60 text-slate-400 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                    <MicOff className="w-3 h-3 text-red-400" /> Muted
                  </div>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" className="w-16 h-16 rounded-full object-cover" alt="Emma Wilson" />
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-200">Emma Wilson</p>
                    <p className="text-[10px] text-slate-500">Marathon Partner</p>
                  </div>
                </div>

                {/* Participant 3: James Liu */}
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center space-y-3 relative ring-2 ring-emerald-500/20">
                  <div className="absolute top-2 right-2 bg-emerald-500/10 text-emerald-400 text-[9px] px-1.5 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Speaking
                  </div>
                  <div className="w-16 h-16 rounded-full bg-primary-200 text-primary-700 flex items-center justify-center font-bold text-lg">JL</div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-200">James Liu</p>
                    <p className="text-[10px] text-slate-500">Co-Founder</p>
                  </div>
                </div>

                {/* Participant 4: Me */}
                <div className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
                  <div className="absolute top-2 right-2 bg-slate-950/60 text-slate-400 text-[9px] px-1.5 py-0.5 rounded">
                    Me
                  </div>
                  {activeCall.type === "video" && localStream && !isCameraOff ? (
                    <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-24 rounded-lg object-cover scale-x-[-1]" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center font-bold text-lg border border-slate-700">Me</div>
                  )}
                  <div className="text-center">
                    <p className="text-xs font-semibold text-slate-200">You</p>
                    <p className="text-[10px] text-slate-500">{isMuted ? "Audio Muted" : "Audio Active"}</p>
                  </div>
                </div>
              </div>
            ) : (
              /* SINGLE USER CALL VIEW */
              <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
                {/* Avatar / Video Preview */}
                <div className="relative">
                  {activeCall.type === "video" && activeCall.status === "connected" ? (
                    <div className="w-56 h-56 rounded-3xl overflow-hidden border-4 border-primary-500 shadow-2xl relative bg-slate-950 flex items-center justify-center">
                      {isCameraOff ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-xs gap-2">
                          <VideoOff className="w-8 h-8 text-slate-500" />
                          <span>Participant's camera off</span>
                        </div>
                      ) : selected.avatar ? (
                        <img src={selected.avatar} alt={selected.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-purple flex items-center justify-center text-white text-5xl font-bold">{selected.name[0]}</div>
                      )}
                    </div>
                  ) : (
                    <div className="w-36 h-36 rounded-full bg-gradient-purple flex items-center justify-center ring-4 ring-white/10 relative overflow-hidden shadow-2xl">
                      {selected.avatar ? (
                        <img src={selected.avatar} alt={selected.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-5xl font-bold">{selected.name[0]}</span>
                      )}
                    </div>
                  )}
                  {activeCall.status === "calling" && (
                    <div className="absolute -inset-4 rounded-full border-4 border-primary-500 animate-ping opacity-60 pointer-events-none" />
                  )}
                </div>

                {/* Picture in Picture local preview */}
                {activeCall.type === "video" && activeCall.status === "connected" && (
                  <div className="w-full h-32 rounded-2xl bg-slate-900 border border-white/10 relative overflow-hidden flex items-center justify-center">
                    {localStream && !isCameraOff ? (
                      <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
                    ) : (
                      <div className="text-center space-y-1">
                        <VideoOff className="w-6 h-6 mx-auto text-white/30" />
                        <p className="text-[10px] text-white/40">Camera off</p>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-slate-950/70 px-1.5 py-0.5 rounded text-[9px] font-bold">Me</div>
                  </div>
                )}
              </div>
            )}

            {/* CALL CONTROLS BAR */}
            <div className="flex items-center gap-4 pt-6">
              {/* Mute Mic Button */}
              <button 
                onClick={() => {
                  setIsMuted(!isMuted);
                  toast.info(isMuted ? "Microphone Unmuted" : "Microphone Muted");
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isMuted ? "bg-red-500/20 text-red-500 border border-red-500/30" : "bg-white/10 hover:bg-white/20 text-white"}`}
                title={isMuted ? "Unmute Mic" : "Mute Mic"}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* End Call Button */}
              <button 
                onClick={handleEndCall}
                className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 text-white shadow-xl shadow-red-950/40"
                title="End Call"
              >
                <PhoneOff className="w-7 h-7" />
              </button>

              {/* Toggle Camera Button (Video Call Only) */}
              {activeCall.type === "video" && (
                <button 
                  onClick={() => {
                    if (isCameraOff) {
                      startLocalVideo();
                    } else {
                      stopLocalVideo();
                      setIsCameraOff(true);
                    }
                    setIsCameraOff(!isCameraOff);
                    toast.info(isCameraOff ? "Camera stream active" : "Camera turned off");
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isCameraOff ? "bg-red-500/20 text-red-500 border border-red-500/30" : "bg-white/10 hover:bg-white/20 text-white"}`}
                  title={isCameraOff ? "Turn Camera On" : "Turn Camera Off"}
                >
                  {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </button>
              )}

              {/* Screen Share simulation button */}
              {activeCall.status === "connected" && !selected.isAI && (
                <button 
                  onClick={() => {
                    setIsScreenSharing(!isScreenSharing);
                    toast.success(isScreenSharing ? "Stopped screen sharing" : "Screen sharing started");
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isScreenSharing ? "bg-primary-600 text-white" : "bg-white/10 hover:bg-white/20 text-white"}`}
                  title="Share Screen"
                >
                  <ScreenShare className="w-5 h-5" />
                </button>
              )}
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
