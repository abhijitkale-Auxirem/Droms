import { useState, useEffect } from "react";
import { Layout, Plus, Image, Quote, X, Star } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const defaultBoards = [
  {
    id: "vb1", title: "2025 Dream Life", items: [
      { type: "image", content: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=200&fit=crop", label: "Startup Launch" },
      { type: "image", content: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop", label: "Dream Home" },
      { type: "quote", content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { type: "image", content: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop", label: "Fitness Goals" },
      { type: "goal", content: "$2M Net Worth by 35", progress: 42 },
      { type: "quote", content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    ],
  },
  {
    id: "vb2", title: "Career Growth Board", items: [
      { type: "image", content: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=200&fit=crop", label: "Office Space" },
      { type: "quote", content: "Work hard in silence, let success make the noise.", author: "Frank Ocean" },
      { type: "goal", content: "CTO / Founder by 2026", progress: 68 },
    ],
  },
];

export default function VisionBoardsPage() {
  const [boards, setBoards] = useState(() => {
    const cached = localStorage.getItem("droms_vision_boards_data");
    return cached ? JSON.parse(cached) : defaultBoards;
  });

  useEffect(() => {
    localStorage.setItem("droms_vision_boards_data", JSON.stringify(boards));
  }, [boards]);

  const [activeBoard, setActiveBoard] = useState(boards[0]?.id || defaultBoards[0].id);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const currentBoard = boards.find(b => b.id === activeBoard)!;

  const createBoard = () => {
    if (!newBoardName) { toast.error("Enter board name"); return; }
    const nb = { id: `vb${Date.now()}`, title: newBoardName, items: [] };
    setBoards(prev => [...prev, nb]);
    setActiveBoard(nb.id);
    setShowAddModal(false);
    setNewBoardName("");
    toast.success("Vision board created! 🌟");
  };

  const addQuote = () => {
    const quotes = [
      { type: "quote", content: "Dream big and dare to fail.", author: "Norman Vaughan" },
      { type: "quote", content: "The only limit to our realization of tomorrow is our doubts of today.", author: "FDR" },
    ];
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    setBoards(prev => prev.map(b => b.id === activeBoard ? { ...b, items: [...b.items, q] } : b));
    toast.success("Quote added!");
  };

  const addGoal = () => {
    const goals = [
      { type: "goal", content: "Launch product & get 1000 users", progress: 45 },
      { type: "goal", content: "Build 6-figure income stream", progress: 30 },
    ];
    const g = goals[Math.floor(Math.random() * goals.length)];
    setBoards(prev => prev.map(b => b.id === activeBoard ? { ...b, items: [...b.items, g] } : b));
    toast.success("Goal card added!");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
            <Layout className="w-6 h-6 text-primary-600" /> Vision Boards
          </h1>
          <p className="text-slate-500 mt-0.5">Visualize your dream life and stay inspired</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Board
        </button>
      </div>

      {/* Board Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {boards.map(b => (
          <button key={b.id} onClick={() => setActiveBoard(b.id)}
            className={cn("flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all",
              activeBoard === b.id ? "bg-primary-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-primary-300"
            )}>
            {b.title}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
        <span className="text-sm text-slate-500 font-medium">Add to board:</span>
        <button onClick={() => toast.info("Click any image from the gallery below to add")} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 text-sm hover:bg-primary-100 transition-colors">
          <Image className="w-4 h-4" /> Image
        </button>
        <button onClick={addQuote} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-sm hover:bg-amber-100 transition-colors">
          <Quote className="w-4 h-4" /> Quote
        </button>
        <button onClick={addGoal} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-sm hover:bg-green-100 transition-colors">
          <Star className="w-4 h-4" /> Goal Card
        </button>
      </div>

      {/* Board */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 min-h-96">
        <h2 className="text-xl font-bold font-display text-white mb-6">{currentBoard.title}</h2>
        {currentBoard.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-white/40">
            <Layout className="w-16 h-16 mb-4" />
            <p className="text-lg">Your vision board is empty</p>
            <p className="text-sm mt-1">Add images, quotes, and goals to visualize your dreams</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentBoard.items.map((item, i) => (
              <div key={i} className={cn("rounded-2xl overflow-hidden group relative",
                item.type === "quote" ? "bg-white/10 backdrop-blur border border-white/20 p-4 col-span-2" :
                item.type === "goal" ? "bg-gradient-to-br from-primary-600 to-blue-600 p-4" : ""
              )}>
                {item.type === "image" && (
                  <div>
                    <img src={(item as { content: string }).content} alt={(item as { label?: string }).label} className="w-full h-40 object-cover" />
                    {(item as { label?: string }).label && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-sm font-medium">{(item as { label: string }).label}</p>
                      </div>
                    )}
                  </div>
                )}
                {item.type === "quote" && (
                  <div>
                    <Quote className="w-6 h-6 text-accent mb-2" />
                    <p className="text-white text-sm italic leading-relaxed mb-2">{(item as { content: string }).content}</p>
                    <p className="text-white/60 text-xs">— {(item as { author?: string }).author}</p>
                  </div>
                )}
                {item.type === "goal" && (
                  <div>
                    <Star className="w-5 h-5 text-accent mb-2" />
                    <p className="text-white font-semibold text-sm mb-3">{(item as { content: string }).content}</p>
                    <div className="h-1.5 bg-white/20 rounded-full">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${(item as { progress?: number }).progress || 0}%` }} />
                    </div>
                    <p className="text-white/60 text-xs mt-1">{(item as { progress?: number }).progress || 0}% complete</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Gallery */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Image Gallery — Click to Add</h3>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {[
            "photo-1487017159836-4e23ece2e4cf", "photo-1512621776951-a57141f2eefd",
            "photo-1571019613454-1cb2f99b2d8b", "photo-1507003211169-0a1dd7228f2d",
            "photo-1522202176988-66273c2fd55f", "photo-1488590528505-98d2b5aba04b",
            "photo-1560179707-f14e90ef3623", "photo-1436891620584-47fd0e565afb",
          ].map((photo, i) => (
            <button key={i} onClick={() => {
              const newItem = { type: "image", content: `https://images.unsplash.com/${photo}?w=300&h=200&fit=crop`, label: "My Goal" };
              setBoards(prev => prev.map(b => b.id === activeBoard ? { ...b, items: [...b.items, newItem] } : b));
              toast.success("Image added to vision board!");
            }} className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-transform">
              <img src={`https://images.unsplash.com/${photo}?w=100&h=100&fit=crop`} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6">
            <h2 className="text-lg font-bold font-display text-slate-900 mb-4">New Vision Board</h2>
            <input value={newBoardName} onChange={e => setNewBoardName(e.target.value)} onKeyDown={e => e.key === "Enter" && createBoard()}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-400 text-sm mb-4" placeholder="e.g. 2025 Dream Life" />
            <div className="flex gap-3">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium">Cancel</button>
              <button onClick={createBoard} className="flex-1 btn-primary py-2.5">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
