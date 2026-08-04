import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const words = ["IMAGINE", "INNOVATE", "DEVELOP", "COLLABORATE", "LAUNCH"];

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // Scroll block during loading
    document.body.style.overflow = 'hidden';

    // Progress bar count simulation
    const duration = 2500; // 2.5 seconds loading time
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      const currentProgress = Math.min(Math.round((step / steps) * 100), 100);
      setProgress(currentProgress);

      // Cycle words based on progress
      const wordStep = Math.floor(100 / words.length);
      const newWordIndex = Math.min(Math.floor(currentProgress / wordStep), words.length - 1);
      setWordIndex(newWordIndex);

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          document.body.style.overflow = '';
          onComplete();
        }, 500); // Small delay to appreciate 100%
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-[#020204] z-[99999] flex flex-col justify-between p-8 md:p-16 select-none"
        initial={{ opacity: 1 }}
        exit={{ 
          y: '-100%', 
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
        }}
      >
        {/* Top Header Grid inside Loader */}
        <div className="flex justify-between items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="w-3 h-3 rounded-full bg-primary-cyan animate-pulse"></span>
            <span className="font-space text-xs tracking-[0.25em] text-gray-400">NEXUS EVENT PORTAL</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-space text-xs tracking-wider text-gray-500"
          >
            EST. 2026 / TECH SYMPOSIUM
          </motion.div>
        </div>

        {/* Center Text with Word Cycle */}
        <div className="flex flex-col items-start justify-center flex-grow py-20">
          <div className="h-[90px] md:h-[130px] overflow-hidden">
            <motion.h1
              key={wordIndex}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="font-space text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white flex items-center"
            >
              {words[wordIndex]}
              <span className="text-primary-purple">.</span>
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
            className="font-sans text-sm md:text-base text-gray-400 max-w-sm mt-4 leading-relaxed font-light"
          >
            Powering student hackathons, professional summits, and startup launchpads.
          </motion.p>
        </div>

        {/* Bottom Progress Tracker */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              <span className="text-[10px] text-gray-500 tracking-widest font-space">LOADING ENVIRONMENT</span>
              <span className="text-sm font-space text-primary-cyan mt-1">CONNECTING NODES...</span>
            </motion.div>
            
            <span className="font-space text-6xl md:text-8xl font-light text-white tracking-tighter">
              {progress}<span className="text-sm md:text-2xl text-gray-500">%</span>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-[2px] w-full bg-white/10 overflow-hidden relative rounded-full">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-primary-purple via-primary-blue to-primary-cyan"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
