import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clickText, setClickText] = useState('');
  const [hidden, setHidden] = useState(true);

  // Position of mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the cursor ring
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Event listener for hover styles
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, .hover-trigger'
      );
      
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setHovered(true);
          const customText = el.getAttribute('data-cursor-text');
          if (customText) setClickText(customText);
        });
        el.addEventListener('mouseleave', () => {
          setHovered(false);
          setClickText('');
        });
      });
    };

    // Run listeners and set observer for dynamically added items
    addHoverListeners();
    
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, hidden]);

  if (hidden) return null;

  return (
    <>
      {/* Central Cursor Dot */}
      <motion.div
        className="cursor-dot hidden md:block"
        style={{
          left: mouseX,
          top: mouseY,
        }}
        animate={{
          scale: hovered ? 0.5 : 1,
          backgroundColor: hovered ? '#ec4899' : '#06b6d4',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
      />

      {/* Lagging Ring */}
      <motion.div
        className="cursor-ring hidden md:flex items-center justify-center pointer-events-none"
        style={{
          left: ringX,
          top: ringY,
        }}
        animate={{
          scale: hovered ? 1.8 : 1,
          borderColor: hovered ? 'rgba(236, 72, 153, 0.8)' : 'rgba(139, 92, 246, 0.4)',
          backgroundColor: hovered ? 'rgba(236, 72, 153, 0.05)' : 'rgba(139, 92, 246, 0.0)',
          boxShadow: hovered 
            ? '0 0 20px rgba(236, 72, 153, 0.3), inset 0 0 10px rgba(236, 72, 153, 0.2)'
            : 'none',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.3 }}
      >
        {clickText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[8px] uppercase tracking-wider text-neon-pink font-semibold whitespace-nowrap"
          >
            {clickText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
