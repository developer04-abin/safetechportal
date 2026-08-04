import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  const Player = ReactPlayer as any;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />

          {/* Player Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 z-10 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
            >
              <IoClose className="text-xl" />
            </button>

            <Player
              url={videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
              config={{
                youtube: {
                  playerVars: { showinfo: 0, rel: 0 }
                } as any
              }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
