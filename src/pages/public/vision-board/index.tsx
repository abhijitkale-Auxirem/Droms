import { Link } from "react-router-dom";
import { Layout, Image, ArrowRight, Palette, Download, Share2, Sparkles, Move } from "lucide-react";
import visionBoardImg from "@/assets/vision-board-preview.jpg";

const features = [
  { icon: Move, title: "Drag & Drop Builder", desc: "Intuitive canvas with snap-to-grid, free positioning, and multi-layer support for professional layouts." },
  { icon: Image, title: "Image Library", desc: "Access 10M+ premium Unsplash photos or upload your own. Smart search finds images matching your dreams." },
  { icon: Sparkles, title: "AI Image Suggestions", desc: "Describe your dream and AI generates custom visualization images unique to your vision." },
  { icon: Palette, title: "Themes & Styles", desc: "20+ premium board themes from minimalist to vibrant. Customize fonts, colors, and backgrounds." },
  { icon: Share2, title: "Share & Inspire", desc: "Share boards with your accountability group, or keep them private. Export as high-res PNG/PDF." },
  { icon: Download, title: "Export Anywhere", desc: "Download as wallpaper, print-ready poster, or share directly to Instagram from the app." },
];

const boards = [
  { title: "My 2025 Dream Life", items: 12, category: "Life Vision", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop" },
  { title: "Career Breakthrough", items: 8, category: "Career", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop" },
  { title: "Financial Freedom Vision", items: 10, category: "Finance", img: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=400&h=250&fit=crop" },
];

export default function VisionBoardPublicPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-16 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 text-sm text-accent mb-6">
              <Layout className="w-4 h-4" /> Vision Board Studio
            </div>
            <h1 className="text-5xl font-bold font-display text-white leading-tight mb-6">
              Make Your Dreams <span className="gradient-text-gold">Visible</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Science shows that visualizing your goals increases achievement by 42%. Build stunning digital vision boards that connect directly to your goal planner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 btn-primary text-lg px-8 py-4">
                Build Your Board <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-colors">
                View Templates
              </Link>
            </div>
          </div>
          <div>
            <img src={visionBoardImg} alt="Vision Board Studio" className="rounded-3xl w-full shadow-2xl ring-4 ring-white/10" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-slate-900 mb-4">The Most Powerful Vision Board Studio</h2>
            <p className="text-slate-500 text-lg">Everything you need to visualize, create, and manifest your ideal life</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="p-6 rounded-2xl border-2 border-slate-100 hover:border-accent/40 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center mb-4 transition-colors">
                  <f.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Boards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-4">Boards Created by Droms Members</h2>
            <p className="text-slate-500">Real vision boards from our community of achievers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {boards.map(board => (
              <div key={board.title} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative overflow-hidden h-48">
                  <img src={board.img} alt={board.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-white/90 text-xs font-semibold text-slate-700 px-2.5 py-1 rounded-full">{board.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 mb-1">{board.title}</h3>
                  <p className="text-sm text-slate-500">{board.items} items on this board</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
