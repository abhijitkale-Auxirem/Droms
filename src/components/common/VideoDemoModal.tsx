import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoDemoModal({ isOpen, onClose }: VideoDemoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-white/10 rounded-2xl shadow-2xl">
        <DialogTitle className="sr-only">Product Demo Video</DialogTitle>
        <DialogDescription className="sr-only">
          Watch the Auxirem product walkthrough to learn how to set goals, track habits, and plan your life.
        </DialogDescription>
        <div className="relative w-full aspect-video">
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Auxirem Product Walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
