import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsPlus, BsArrowLeft, BsArrowRight, BsXLg } from 'react-icons/bs';

interface PhotoItem {
  id: number;
  src: string;
  title: string;
  category: string;
}

const photoGallery: PhotoItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    title: "Statewide SafeTech Inauguration",
    category: "Inauguration"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    title: "School Club Coordinator Training",
    category: "Workshop"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    title: "Digital Safety Panel (Trivandrum)",
    category: "Seminar"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    title: "Student Ambassador Peer CTF",
    category: "Gamification"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
    title: "Anti-Fraud Campaign (Ernakulam)",
    category: "Outreach"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    title: "Cyber Security Awareness Drill",
    category: "CyberSec"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    title: "Elderly Citizen Triage Seminar",
    category: "Elderly Care"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    title: "Joint Committee (KSITM-Police)",
    category: "Review"
  }
];

export default function Gallery() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photoGallery.length - 1));
  };

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev !== null && prev < photoGallery.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-20 lg:py-24 relative bg-slate-50 dark:bg-[#06060c] select-none border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <span className="font-space text-xs tracking-wider text-ictak-blue dark:text-ictak-cyan font-bold uppercase">CAMPAIGN ACTIONS</span>
            <h2 className="h2-scale font-space text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2">
              SafeTech Outreach <span className="text-ictak-cyan">Gallery</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm font-light leading-relaxed">
            Snapshots of cyber-security outreach drives, student ambassador certifications, and community seminars across Kerala.
          </p>
        </div>

        {/* Masonry Columns */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {photoGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onClick={() => setActiveImageIndex(index)}
              className="break-inside-avoid relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 hover:border-ictak-cyan/40 group cursor-pointer shadow-sm"
            >
              {/* Image */}
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-102"
                loading="lazy"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <div className="p-2.5 rounded-full bg-ictak-cyan text-white w-9 h-9 flex items-center justify-center absolute top-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                  <BsPlus className="text-xl" />
                </div>
                <div>
                  <span className="text-[10px] font-space text-ictak-cyan tracking-widest font-bold uppercase">
                    {item.category}
                  </span>
                  <h4 className="font-space text-sm font-bold text-white mt-1 leading-snug">
                    {item.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImageIndex(null)}
              className="absolute inset-0"
            />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-4xl max-h-[85vh] flex flex-col items-center justify-center gap-4">
              
              {/* Close button */}
              <button
                onClick={() => setActiveImageIndex(null)}
                className="absolute top-[-50px] right-2 text-white/80 hover:text-white text-2xl transition-colors cursor-pointer"
              >
                <BsXLg />
              </button>

              {/* Image Display */}
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-full max-h-[75vh] rounded-2xl overflow-hidden border border-slate-700/30 shadow-2xl"
              >
                <img 
                  src={photoGallery[activeImageIndex].src} 
                  alt={photoGallery[activeImageIndex].title} 
                  className="max-w-full max-h-[70vh] object-contain mx-auto"
                />

                {/* Footer Label inside lightbox */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/75 backdrop-blur-sm p-4 text-center">
                  <span className="font-space text-[10px] text-ictak-cyan tracking-widest uppercase font-bold">
                    {photoGallery[activeImageIndex].category}
                  </span>
                  <h3 className="font-space text-sm font-semibold text-white mt-1">
                    {photoGallery[activeImageIndex].title}
                  </h3>
                </div>
              </motion.div>

              {/* Navigation Controllers */}
              <div className="flex gap-8 mt-2">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition cursor-pointer"
                >
                  <BsArrowLeft className="text-xl" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition cursor-pointer"
                >
                  <BsArrowRight className="text-xl" />
                </button>
              </div>

            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
