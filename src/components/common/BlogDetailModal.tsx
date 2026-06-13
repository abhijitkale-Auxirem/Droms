import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BlogArticle, BLOG_ARTICLES } from "@/constants";
import { X, Calendar, Clock, User, Share2, Twitter, Linkedin, Facebook, Link as LinkIcon, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface BlogDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleId: string | null;
}

const categoryColors: Record<string, string> = {
  Habits: "bg-orange-900/40 text-orange-300 border-orange-800/50",
  Goals: "bg-purple-900/40 text-purple-300 border-purple-800/50",
  Productivity: "bg-blue-900/40 text-blue-300 border-blue-800/50",
  Finance: "bg-green-900/40 text-green-300 border-green-800/50",
  Mindset: "bg-pink-900/40 text-pink-300 border-pink-800/50",
  Community: "bg-teal-900/40 text-teal-300 border-teal-800/50",
};

export default function BlogDetailModal({ isOpen, onClose, articleId }: BlogDetailModalProps) {
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Sync state with prop changes
  useEffect(() => {
    if (articleId) {
      setCurrentId(articleId);
    }
  }, [articleId]);

  if (!isOpen || !currentId) return null;

  const article = BLOG_ARTICLES.find((a) => a.id === currentId);
  if (!article) return null;

  const relatedArticles = BLOG_ARTICLES.filter((a) =>
    article.relatedIds.includes(a.id)
  );

  const handleCopyLink = () => {
    const mockUrl = `${window.location.origin}/blog/${article.id}`;
    navigator.clipboard.writeText(mockUrl);
    toast.success("Article link copied to clipboard! 🔗");
  };

  const handleShare = (platform: "twitter" | "linkedin" | "facebook") => {
    const text = encodeURIComponent(`Check out this article: "${article.title}" on Auxirem!`);
    const url = encodeURIComponent(`${window.location.origin}/blog/${article.id}`);
    
    let shareUrl = "";
    if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }
    
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  // Helper to parse simple markdown strings into elements
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("###")) {
        return (
          <h4 key={i} className="text-xl font-bold font-display text-white mt-6 mb-3">
            {block.replace("###", "").trim()}
          </h4>
        );
      }
      if (block.startsWith("* **")) {
        // List items
        return (
          <ul key={i} className="list-disc pl-5 space-y-2 my-4 text-slate-300">
            {block.split("\n").map((li, idx) => (
              <li key={idx}>
                {li.replace("*", "").trim()}
              </li>
            ))}
          </ul>
        );
      }
      if (block.match(/^\d+\./)) {
        // Ordered items
        return (
          <ol key={i} className="list-decimal pl-5 space-y-2 my-4 text-slate-300">
            {block.split("\n").map((li, idx) => (
              <li key={idx}>
                {li.replace(/^\d+\.\s*/, "").trim()}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <p key={i} className="text-slate-300 leading-relaxed text-base mb-4">
          {block}
        </p>
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-slate-950 border-white/10 rounded-3xl shadow-2xl text-slate-100 scrollbar-thin">
        <DialogTitle className="sr-only">{article.title}</DialogTitle>
        <DialogDescription className="sr-only">
          Read full article: {article.title} by {article.author}.
        </DialogDescription>
        
        {/* Cover Image Banner */}
        <div className="relative w-full h-64 md:h-80 overflow-hidden">
          <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full border border-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-6 left-6 right-6">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border inline-block mb-3 ${categoryColors[article.category] || "bg-slate-800 text-slate-300 border-white/10"}`}>
              {article.category}
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-white leading-tight">
              {article.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 grid md:grid-cols-4 gap-8">
          {/* Main content column */}
          <div className="md:col-span-3 space-y-6">
            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pb-4 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary-400" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary-400" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary-400" />
                <span>{article.readTime} read</span>
              </div>
            </div>

            {/* Content text */}
            <article className="prose prose-invert max-w-none">
              {renderContent(article.content)}
            </article>
          </div>

          {/* Right sidebar column: Shares and Related */}
          <div className="md:col-span-1 space-y-8">
            {/* Share widget */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Share2 className="w-4 h-4" /> Share Article
              </h4>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleShare("twitter")}
                  aria-label="Share on Twitter"
                  className="flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Twitter className="w-5 h-5 text-slate-300" />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  aria-label="Share on LinkedIn"
                  className="flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-slate-300" />
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  aria-label="Share on Facebook"
                  className="flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5 text-slate-300" />
                </button>
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy article link"
                  className="flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <LinkIcon className="w-5 h-5 text-slate-300" />
                </button>
              </div>
            </div>

            {/* Related articles widget */}
            {relatedArticles.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Related Reads
                </h4>
                <div className="space-y-4">
                  {relatedArticles.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => setCurrentId(rel.id)}
                      className="group block text-left bg-slate-900 border border-white/5 hover:border-primary-500/50 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                    >
                      <img src={rel.img} alt={rel.title} className="w-full h-24 object-cover" />
                      <div className="p-3">
                        <span className="text-[10px] font-bold text-primary-400 uppercase tracking-wider">
                          {rel.category}
                        </span>
                        <h5 className="font-semibold text-xs text-white line-clamp-2 mt-1 leading-tight group-hover:text-primary-300 transition-colors">
                          {rel.title}
                        </h5>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2 font-medium">
                          Read <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
