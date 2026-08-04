import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';
import bgVideo from '../assets/Gemini__New_chat_Search_chats.mp4';
import Magnetic from './Magnetic';
import { HiOutlineArrowDown } from 'react-icons/hi';
import { BsPlayCircle } from 'react-icons/bs';

interface HeroProps {
  onRegisterClick?: () => void;
  onWatchHighlights?: () => void;
  darkMode?: boolean;
}

export default function Hero({}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();

  // Parallax Scroll Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Spotlight follow maths relative to hero container
  const getSpotlightStyles = () => {
    if (!containerRef.current) return {};
    const rect = containerRef.current.getBoundingClientRect();
    const x = mousePos.x - rect.left;
    const y = mousePos.y - rect.top;
    return {
      '--x': `${x}px`,
      '--y': `${y}px`,
    } as React.CSSProperties;
  };

  const handleChoosePathClick = () => {
    document.querySelector('#audience-routing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTakePledgeClick = () => {
    document.querySelector('#pledge-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartClubClick = () => {
    document.querySelector('#clubs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-start overflow-hidden pt-24"
    >
      {/* Clear Background Video for Hero Viewport */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 pointer-events-none"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      
      {/* Dark gradient backdrop overlay - no white shades to keep video clear */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-1 pointer-events-none" />

      {/* Background Interactive Spotlight Overlay */}
      <div 
        className="absolute inset-0 spotlight-overlay z-2" 
        style={getSpotlightStyles()} 
      />

      {/* Floating Animated Neon Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-ictak-blue/5 dark:bg-ictak-blue/15 rounded-full filter blur-[100px] animate-pulse-slow z-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-ictak-cyan/5 dark:bg-ictak-cyan/15 rounded-full filter blur-[120px] animate-pulse-slow z-1 pointer-events-none" />

      {/* Floating 3D/Glass SVGs */}
      <motion.div
        className="absolute top-20 right-1/4 w-12 h-12 glass-panel border-white/10 rounded-xl flex items-center justify-center text-ictak-cyan font-bold pointer-events-none hidden md:flex"
        animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        🛡️
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-1/5 w-16 h-16 glass-panel border-white/10 rounded-2xl flex items-center justify-center text-ictak-cyan text-xl font-bold pointer-events-none hidden md:flex"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        AI
      </motion.div>

      {/* Hero Content Area - Left Aligned & High Contrast White Text */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-left max-w-3xl px-6 md:px-12 mr-auto flex flex-col items-start gap-5 select-none"
      >
        {/* Top Tagline Badge */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs md:text-sm font-space text-ictak-cyan uppercase tracking-widest shadow-md"
        >
          <span className="w-2 h-2 rounded-full bg-ictak-cyan animate-ping"></span>
          Statewide Digital Security Mission
        </motion.div> */}

        {/* Cinematic Headline - White Font */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-space text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-md"
        >
          Empowering Kerala's <br />
          <span className="text-ictak-cyan">Digital Future</span>
        </motion.h1>

        {/* Subtitle - White/Light Grey for clear readability */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-xs md:text-base text-slate-200 leading-relaxed font-light text-left"
        >
          Welcome to SafeTech Kerala, a joint digital safety and responsibility campaign by ICTAK, KSITM, and Kerala Police Cyberdome. Take the pledge, test your Cyber IQ, and safeguard your digital footprint today.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 mt-4 w-full justify-start"
        >
          <Magnetic strength={0.25} range={60}>
            <button
              onClick={handleChoosePathClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-space font-semibold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 glass-panel border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            >
              Choose Your Path
            </button>
          </Magnetic>

          <Magnetic strength={0.25} range={60}>
            <button
              onClick={handleTakePledgeClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-space font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-ictak-blue to-ictak-cyan hover:shadow-md cursor-pointer transition-all duration-300"
            >
              Take the Pledge
            </button>
          </Magnetic>

          <Magnetic strength={0.25} range={60}>
            <button
              onClick={handleStartClubClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-space font-semibold uppercase tracking-wider text-ictak-cyan flex items-center justify-center gap-2 glass-panel border-ictak-cyan/20 hover:border-ictak-cyan/40 bg-ictak-cyan/5 hover:bg-ictak-cyan/10 transition-all duration-300 cursor-pointer"
            >
              <BsPlayCircle className="text-lg animate-pulse" />
              Start a Club
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Floating Particle Dots */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        style={{ y: bgY, opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-350 hover:text-white transition-colors duration-300"
        onClick={handleChoosePathClick}
      >
        <span className="text-[10px] font-space tracking-[0.3em] uppercase text-white">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HiOutlineArrowDown className="text-lg text-white" />
        </motion.div>
      </motion.div>
    </section>
  );
}
