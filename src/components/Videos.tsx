import { useState } from 'react';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import { BsPlayFill, BsX } from 'react-icons/bs';

interface VideoClip {
  id: number;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
}

const videoData: VideoClip[] = [
  {
    id: 1,
    title: "How to Protect Your OTP and Prevent Banking Scams",
    category: "BANKING SAFETY",
    duration: "3:45",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // demo url
    description: "An easy-to-understand visual walkthrough explaining how OTP fraud works and why banks, police, or government officials will never ask you to reveal verification codes."
  },
  {
    id: 2,
    title: "Beware of Fake Courier & Customs Traps (Kerala Case Study)",
    category: "SCAM ALERT",
    duration: "4:12",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "A detailed breakdown of recent courier scams where fraudsters impersonate customs authorities claiming illegal contraband is under your name to extort money."
  },
  {
    id: 3,
    title: "Phishing Links: Don't Click Your Way Into Debt",
    category: "WEB HYGIENE",
    duration: "2:50",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "Learn how to spot malicious domain names, lookalike login forms, and fake SMS lotteries designed to steal your credentials."
  },
  {
    id: 4,
    title: "Screen Sharing Apps: The Hidden Window for Hackers",
    category: "DEVICE PRIVACY",
    duration: "3:15",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: "Why downloading remote desktop tools like AnyDesk or TeamViewer under scam instructions allows hackers to view and control your banking screen."
  }
];

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState<VideoClip | null>(null);
  const [featuredVideo, setFeaturedVideo] = useState<VideoClip>(videoData[0]);
  const Player = ReactPlayer as any;

  return (
    <section id="videos" className="py-20 lg:py-24 relative bg-white dark:bg-[#06060c] select-none border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12 text-left">
          <span className="font-space text-xs tracking-wider text-ictak-blue dark:text-ictak-cyan font-bold uppercase">DIGITAL SAFETY VIDEOS</span>
          <h2 className="h2-scale font-space text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2">
            Fraud Prevention <span className="text-ictak-cyan">Micro-videos</span>
          </h2>
        </div>

        {/* Netflix-style Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Featured Video Player Details */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div 
              onClick={() => setActiveVideo(featuredVideo)}
              className="relative aspect-video w-full rounded-3xl overflow-hidden group cursor-pointer border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Thumbnail Image */}
              <img 
                src={featuredVideo.thumbnail} 
                alt={featuredVideo.title} 
                className="w-full h-full object-cover transition-transform duration-75 group-hover:scale-[1.01]"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

              {/* Glowing Play Icon Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-ictak-blue to-ictak-cyan text-white flex items-center justify-center shadow-lg scale-95 group-hover:scale-105 transition-all duration-300">
                <BsPlayFill className="text-3xl md:text-4xl translate-x-0.5" />
              </div>

              {/* Details Bottom Left */}
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10 max-w-xl text-left">
                <span className="bg-gradient-to-r from-ictak-blue to-cyan-700 text-white px-3 py-1 rounded-full font-space text-[10px] font-bold uppercase tracking-wider shadow-md">
                  {featuredVideo.category}
                </span>
                <h3 className="font-space text-lg md:text-2xl font-bold text-white mt-3 leading-tight group-hover:text-ictak-cyan transition-colors duration-300">
                  {featuredVideo.title}
                </h3>
                <p className="text-xs text-white/80 font-light mt-2 hidden md:block leading-relaxed">
                  {featuredVideo.description}
                </p>
              </div>

              {/* Duration Tag Top Right */}
              <div className="absolute top-6 right-6 z-10 px-3 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-space text-white">
                {featuredVideo.duration} MIN
              </div>
            </div>
          </div>

          {/* Side Clips Row List */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between text-left">
            <h4 className="font-space text-xs tracking-wider text-slate-400 dark:text-slate-500 font-bold uppercase border-b border-slate-100 dark:border-slate-800 pb-2">
              SELECT SAFETY VIDEO
            </h4>
            
            <div className="flex flex-col gap-3.5 overflow-y-auto max-h-[380px] pr-2 scrollbar-thin flex-grow">
              {videoData.map((video) => (
                <div 
                  key={video.id}
                  onClick={() => setFeaturedVideo(video)}
                  className={`flex gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    featuredVideo.id === video.id 
                      ? 'bg-slate-100 dark:bg-slate-800 border-ictak-cyan/40 text-white shadow-xs' 
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {/* Thumbnail Mini */}
                  <div className="w-28 h-20 rounded-xl overflow-hidden relative shrink-0">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <BsPlayFill className="text-lg text-white" />
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="flex flex-col justify-center gap-1">
                    <span className="font-space text-[9px] text-ictak-cyan font-bold tracking-wider uppercase">
                      {video.category}
                    </span>
                    <h5 className="font-space text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2 group-hover:text-ictak-cyan transition-colors leading-snug">
                      {video.title}
                    </h5>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-space">{video.duration} MIN</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Pop-up Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="absolute inset-0"
            />

            {/* Video Player Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 z-10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
              >
                <BsX className="text-2xl" />
              </button>

              <Player
                url={activeVideo.videoUrl}
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
    </section>
  );
}
