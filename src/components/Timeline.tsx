import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiCheckCircle, FiClock, FiArrowRight } from 'react-icons/fi';

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
    outcome: 'Personal Safety Certificate',
  },
  {
    id: 2,
    period: 'COMPLETED',
    stepNum: 'Step 2',
    title: 'Test Your Cyber IQ',
    description: 'Participate in our interactive 5-question digital safety test to evaluate your understanding of phishing, online fraud, and privacy.',
    outcome: 'Personal Vulnerability Score',
  },
  {
    id: 3,
    period: 'COMPLETED',
    stepNum: 'Step 3',
    title: 'Access Demographic Resources',
    description: 'Navigate through tailored portals for Students, Parents/Adults, or Senior Citizens to view guides and download relevant PDFs.',
    outcome: 'Targeted Safety Toolkits',
  },
  {
    id: 4,
    period: 'ACTIVE',
    stepNum: 'Step 4',
    title: 'Register an Institutional Club',
    description: 'Schools, colleges, and local Panchayats upload signed campaign mandate charters to establish official SafeTech clubs.',
    outcome: 'Dedicated PMU Approval',
  },
  {
    id: 5,
    period: 'NEXT',
    stepNum: 'Step 5',
    title: 'Master Training of Trainers (ToT)',
    description: 'Selected coordinators undergo direct technical bootcamps led by Kerala Police Cyberdome and ICTAK training experts.',
    outcome: 'Certified Cyber Guide Credentials',
  },
  {
    id: 6,
    period: 'NEXT',
    stepNum: 'Step 6',
    title: 'Earn Academic Credits & Badges',
    description: 'College students completing assignments and community campaign hours obtain the 15-credit "Digital Jagratha Ambassador" award.',
    outcome: '15-Credit Certification',
  },
];

export default function Timeline() {
  const [activeStep, setActiveStep] = useState(3); // default highlight on Step 4 (ACTIVE)
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="timeline"
      className="relative z-10 py-20 lg:py-24 bg-slate-50/70 dark:bg-[#04040a] overflow-hidden select-none border-b border-slate-200/60 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ictak-blue/10 dark:bg-ictak-cyan/10 border border-ictak-blue/20 dark:border-ictak-cyan/20 text-ictak-blue dark:text-ictak-cyan text-[11px] font-space font-bold uppercase tracking-wider mb-3">
              <span>Campaign Blueprint</span>
            </div>
            <h2 className="h2-scale font-space text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Your Journey to <span className="text-ictak-cyan">Digital Empowerment</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light mt-2 max-w-xl">
              Follow the six systematic stages from individual pledge commitment to certified grassroots campus leadership.
            </p>
          </div>

          {/* Slider Arrow Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={scrollLeft}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-ictak-cyan hover:text-white dark:hover:bg-ictak-cyan dark:hover:text-slate-950 transition cursor-pointer shadow-sm"
              aria-label="Previous timeline step"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-ictak-cyan hover:text-white dark:hover:bg-ictak-cyan dark:hover:text-slate-950 transition cursor-pointer shadow-sm"
              aria-label="Next timeline step"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* Step Navigation Dots Bar */}
        <div className="hidden lg:grid grid-cols-6 gap-3 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          {timelineData.map((item, index) => {
            const isCurrent = activeStep === index;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveStep(index);
                  if (scrollContainerRef.current) {
                    const cards = scrollContainerRef.current.children;
                    if (cards[index]) {
                      (cards[index] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                  }
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                  isCurrent
                    ? 'bg-white dark:bg-slate-800 border-ictak-cyan shadow-md ring-1 ring-ictak-cyan'
                    : 'bg-white/40 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-space font-bold uppercase tracking-wider">
                  <span className={isCurrent ? 'text-ictak-cyan' : 'text-slate-400'}>{item.stepNum}</span>
                  {item.period === 'COMPLETED' ? (
                    <FiCheckCircle className="text-emerald-500" />
                  ) : item.period === 'ACTIVE' ? (
                    <span className="w-2 h-2 rounded-full bg-ictak-cyan animate-pulse" />
                  ) : (
                    <FiClock className="text-slate-400" />
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate font-space">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Horizontal Scroll Window */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800 no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {timelineData.map((item, index) => {
            const isActive = activeStep === index;
            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveStep(index)}
                className={`snap-center shrink-0 w-[300px] sm:w-[350px] p-7 rounded-3xl border flex flex-col justify-between text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 border-ictak-cyan shadow-xl ring-2 ring-ictak-cyan/30 translate-y-[-4px]'
                    : 'bg-white dark:bg-slate-900/70 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                }`}
              >
                <div>
                  {/* Top Header Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`font-space text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border ${
                        item.period === 'COMPLETED'
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                          : item.period === 'ACTIVE'
                          ? 'bg-cyan-50 dark:bg-cyan-950/30 text-ictak-cyan border-cyan-200 dark:border-cyan-800 shadow-[0_0_12px_rgba(0,180,216,0.2)]'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {item.stepNum} • {item.period}
                    </span>

                    <span className="font-space font-black text-2xl text-slate-200 dark:text-slate-800">
                      0{item.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="h3-scale font-space text-lg font-bold text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer Outcome Deliverable */}
                <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 font-space uppercase tracking-wider">
                      Target Deliverable
                    </span>
                    <span className="text-xs font-space font-bold text-ictak-blue dark:text-ictak-cyan mt-0.5">
                      {item.outcome}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    <FiArrowRight />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
