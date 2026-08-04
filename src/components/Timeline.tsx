import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  id: number;
  period: 'COMPLETED' | 'ACTIVE' | 'NEXT';
  stepNum: string;
  title: string;
  description: string;
  outcome: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    period: 'COMPLETED',
    stepNum: 'Step 1',
    title: 'The Digital Citizen Pledge',
    description: 'Enter your name and district, accept minimum consent conditions, and take the pledge to commit to safe, responsible internet usage.',
    outcome: 'Personal Safety Certificate'
  },
  {
    id: 2,
    period: 'COMPLETED',
    stepNum: 'Step 2',
    title: 'Test Your Cyber IQ',
    description: 'Participate in our interactive 5-question digital safety test to evaluate your understanding of phishing, online fraud, and privacy.',
    outcome: 'Personal Vulnerability Score'
  },
  {
    id: 3,
    period: 'COMPLETED',
    stepNum: 'Step 3',
    title: 'Access Demographic Resources',
    description: 'Navigate through tailored portals for Students, Parents/Adults, or Senior Citizens to view guides and download relevant PDFs.',
    outcome: 'Targeted Safety Toolkits'
  },
  {
    id: 4,
    period: 'ACTIVE',
    stepNum: 'Step 4',
    title: 'Register an Institutional Club',
    description: 'Schools, colleges, and local Panchayats upload signed campaign mandate charters to establish official SafeTech clubs.',
    outcome: 'Dedicated PMU Approval'
  },
  {
    id: 5,
    period: 'NEXT',
    stepNum: 'Step 5',
    title: 'Master Training of Trainers (ToT)',
    description: 'Selected coordinators undergo direct technical bootcamps led by Kerala Police Cyberdome and ICTAK training experts.',
    outcome: 'Certified Cyber Guide Credentials'
  },
  {
    id: 6,
    period: 'NEXT',
    stepNum: 'Step 6',
    title: 'Earn Academic Credits & Badges',
    description: 'College students completing assignments and community campaign hours obtain the 15-credit "Digital Jagratha Ambassador" award.',
    outcome: '15-Credit Certification'
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current?.scrollWidth || 0;
      const clientWidth = scrollRef.current?.clientWidth || 0;
      const xTranslate = -(scrollWidth - clientWidth + 100);

      // Pin the section and scroll the contents horizontally
      gsap.to(scrollRef.current, {
        x: xTranslate,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => `+=${scrollWidth - clientWidth + 500}`,
          invalidateOnRefresh: true,
        }
      });

      // Animate the drawing of the timeline line
      gsap.fromTo('.timeline-progress-line', 
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${scrollWidth - clientWidth + 500}`,
            scrub: 1.2,
          }
        }
      );

      // Animate timeline nodes staggered fade in
      gsap.from('.timeline-node', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="timeline"
      className="relative bg-white dark:bg-[#020204] overflow-hidden min-h-screen flex flex-col justify-center select-none border-b border-slate-200/50"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 z-10 text-left">
        <span className="font-space text-xs tracking-wider text-ictak-blue font-bold uppercase">CAMPAIGN BLUEPRINT</span>
        <h2 className="h2-scale font-space text-3xl font-bold text-slate-900 mt-2">
          Your Journey to <span className="gradient-text-safetech">Digital Empowerment</span>
        </h2>
      </div>

      {/* Horizontal Scroll Window */}
      <div className="relative flex-grow flex items-center mt-8 w-full">
        {/* Progress Line Tracker */}
        <div className="absolute top-[48%] left-0 right-0 h-[2px] bg-slate-100 w-full z-0" />
        <div className="absolute top-[48%] left-0 right-0 h-[2px] bg-gradient-to-r from-ictak-blue via-ictak-cyan to-green-500 w-full origin-left timeline-progress-line z-0" />

        <div 
          ref={scrollRef} 
          className="flex items-center gap-12 md:gap-20 px-12 md:px-20 w-max relative z-10 py-8"
        >
          {timelineData.map((item) => (
            <div 
              key={item.id} 
              className="timeline-node w-[280px] md:w-[340px] flex flex-col items-start gap-4 relative group"
            >
              {/* Timeline Connector Indicator */}
              <div className="absolute top-[12px] md:top-[18px] left-[15px] -translate-x-1/2 w-4.5 h-4.5 rounded-full border-4 border-white bg-slate-400 group-hover:scale-125 transition-all duration-300 z-20" 
                style={{
                  backgroundColor: item.period === 'COMPLETED' ? '#004d80' : item.period === 'ACTIVE' ? '#00b4d8' : '#cbd5e1',
                  boxShadow: item.period === 'ACTIVE' ? '0 0 12px #00b4d8' : 'none'
                }}
              />

              {/* Tag Period */}
              <span 
                className={`font-space text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full ${
                  item.period === 'COMPLETED' 
                    ? 'bg-blue-50 text-ictak-blue border border-blue-100' 
                    : item.period === 'ACTIVE' 
                    ? 'bg-cyan-50 text-ictak-cyan border border-cyan-100 animate-pulse' 
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {item.stepNum} • {item.period}
              </span>

              {/* Main Card */}
              <div className="w-full safetech-card p-6 md:p-8 rounded-3xl border border-slate-200/60 bg-white group-hover:border-ictak-cyan transition-all duration-300 mt-6 text-left">
                <h3 className="h3-scale font-space text-base md:text-lg font-bold text-slate-900 mt-1 group-hover:text-ictak-cyan transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light mt-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Foot Outcome Badge */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-150">
                  <span className="text-[9px] text-slate-400 font-space uppercase">Target Deliverable</span>
                  <span className="text-[10px] font-space text-ictak-blue font-bold">{item.outcome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
