import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '../components/RootLayout';
import { FiShield, FiTarget, FiUsers, FiAward } from 'react-icons/fi';

const FocusAreas = lazy(() => import('../components/FocusAreas'));
const Timeline = lazy(() => import('../components/Timeline'));
const Achievements = lazy(() => import('../components/Achievements'));
const Gallery = lazy(() => import('../components/Gallery'));
const Partners = lazy(() => import('../components/Partners'));

export default function AboutPage() {
  const { language } = useLayoutContext();

  return (
    <div className="flex flex-col gap-0">
      {/* About Header Banner */}
      <section className="relative py-20 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-ictak-blue/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ictak-cyan/10 border border-ictak-cyan/20 text-ictak-cyan text-xs font-space font-semibold uppercase tracking-wider mb-6"
            >
              <FiShield className="text-sm" />
              <span>Mission & Vision</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-space text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-6"
            >
              Building a Secure & Responsible <span className="text-ictak-cyan">Digital Kerala</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8"
            >
              SafeTech Kerala is a government-backed collaborative cyber literacy and digital hygiene movement driven by ICT Academy of Kerala (ICTAK), Kerala State IT Mission (KSITM), and Kerala Police Cyberdome.
            </motion.p>
          </div>

          {/* Quick Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-10 border-t border-slate-800/80">
            {[
              {
                icon: FiTarget,
                title: 'Statewide Goal',
                desc: 'Empowering 500,000+ citizens, students, and elders with actionable cyber hygiene skills.',
              },
              {
                icon: FiShield,
                title: 'Police Cyberdome Pact',
                desc: 'Direct advisories, real-time scam threat intelligence, and legal awareness integration.',
              },
              {
                icon: FiUsers,
                title: 'Grassroots Chapters',
                desc: 'Institutional SafeTech clubs established across schools and colleges in all 14 districts.',
              },
              {
                icon: FiAward,
                title: '15-Credit Certification',
                desc: 'Recognized digital safety credentials and Jagratha Ambassador badges for youth.',
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-ictak-cyan/30 transition-all flex flex-col gap-3 text-left"
                >
                  <div className="p-2.5 rounded-xl bg-ictak-cyan/10 text-ictak-cyan w-fit">
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="font-space text-base font-bold text-white">{pillar.title}</h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="h-40 flex items-center justify-center text-xs tracking-widest text-slate-400 font-space font-semibold animate-pulse">
            LOADING ABOUT CONTENT...
          </div>
        }
      >
        {/* Six Core Themes Grid */}
        <FocusAreas language={language} />

        {/* Milestone Timeline */}
        <Timeline />

        {/* Achievements */}
        <Achievements />

        {/* Photo Gallery */}
        <Gallery />

        {/* Partners */}
        <Partners />
      </Suspense>
    </div>
  );
}
