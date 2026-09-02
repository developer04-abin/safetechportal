import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '../components/RootLayout';
import { FiUsers, FiMapPin, FiAward, FiLayers } from 'react-icons/fi';

const ClubOnboarding = lazy(() => import('../components/ClubOnboarding'));

export default function ClubsPage() {
  const { language } = useLayoutContext();

  return (
    <div className="flex flex-col gap-0">
      {/* Clubs Header Banner */}
      <section className="relative py-20 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ictak-cyan/10 border border-ictak-cyan/20 text-ictak-cyan text-xs font-space font-semibold uppercase tracking-wider mb-6"
            >
              <FiUsers className="text-sm" />
              <span>Campus & Community Chapters</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-space text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-6"
            >
              SafeTech Clubs Across <span className="text-ictak-cyan">14 Districts</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8"
            >
              Start or register an official SafeTech Club at your school, college, or local self-government institution (LSGD). Get certified as a Master Trainer, conduct peer sessions, and build grassroots cyber defense resilience.
            </motion.p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
            {[
              { label: 'Active School Clubs', value: '180+', icon: FiLayers },
              { label: 'College Chapters', value: '145+', icon: FiAward },
              { label: 'Districts Covered', value: '14 / 14', icon: FiMapPin },
              { label: 'Peer Ambassadors', value: '4,200+', icon: FiUsers },
            ].map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left">
                  <div className="flex items-center gap-2 text-ictak-cyan mb-1">
                    <Icon className="text-base" />
                    <span className="text-[10px] uppercase font-space font-bold tracking-wider text-slate-400">
                      {metric.label}
                    </span>
                  </div>
                  <div className="font-space text-xl sm:text-2xl font-black text-white">{metric.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="h-40 flex items-center justify-center text-xs tracking-widest text-slate-400 font-space font-semibold animate-pulse">
            LOADING CLUBS DASHBOARD...
          </div>
        }
      >
        {/* SafeTech Club Onboarding Dashboard & Interactive Kerala Map */}
        <ClubOnboarding language={language} />
      </Suspense>
    </div>
  );
}
