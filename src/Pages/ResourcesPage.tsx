import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '../components/RootLayout';
import { FiBookOpen, FiVideo, FiCheckSquare, FiAlertCircle } from 'react-icons/fi';

const ResourceHub = lazy(() => import('../components/ResourceHub'));
const Videos = lazy(() => import('../components/Videos'));
const CyberQuiz = lazy(() => import('../components/CyberQuiz'));
const News = lazy(() => import('../components/News'));

export default function ResourcesPage() {
  const { language, handleWatchVideo } = useLayoutContext();

  return (
    <div className="flex flex-col gap-0">
      {/* Resources Header Banner */}
      <section className="relative py-20 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/30 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ictak-cyan/10 border border-ictak-cyan/20 text-ictak-cyan text-xs font-space font-semibold uppercase tracking-wider mb-6"
            >
              <FiBookOpen className="text-sm" />
              <span>Learning & Resource Hub</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-space text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-6"
            >
              Free Toolkits, Handbooks & <span className="text-ictak-cyan">Cyber Assessments</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8"
            >
              Access vetted cyber hygiene toolkits in English and Malayalam, watch quick fraud prevention micro-videos, evaluate your digital readiness with the Cyber IQ Quiz, and stay updated with latest state advisories.
            </motion.p>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            {[
              { name: 'Download Toolkits', id: '#resources', icon: FiBookOpen },
              { name: 'Scam Alert Videos', id: '#videos-section', icon: FiVideo },
              { name: 'Cyber IQ Quiz', id: '#cyber-quiz', icon: FiCheckSquare },
              { name: 'Latest Advisories', id: '#news-section', icon: FiAlertCircle },
            ].map((tab, idx) => {
              const Icon = tab.icon;
              return (
                <button
                  key={idx}
                  onClick={() => document.querySelector(tab.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-ictak-cyan/40 text-xs font-space font-semibold text-slate-200 transition flex items-center gap-2 cursor-pointer"
                >
                  <Icon className="text-ictak-cyan" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="h-40 flex items-center justify-center text-xs tracking-widest text-slate-400 font-space font-semibold animate-pulse">
            LOADING RESOURCES...
          </div>
        }
      >
        {/* Resource Downloads and Ambassador Guides */}
        <ResourceHub language={language} onWatchVideo={handleWatchVideo} />

        {/* Fraud Prevention Micro-Videos */}
        <div id="videos-section">
          <Videos />
        </div>

        {/* Gamified Cyber IQ Assessment */}
        <div id="cyber-quiz">
          <CyberQuiz language={language} />
        </div>

        {/* Latest Cyber News & Advisories */}
        <div id="news-section">
          <News language={language} />
        </div>
      </Suspense>
    </div>
  );
}
