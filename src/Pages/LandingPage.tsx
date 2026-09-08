import { Suspense, lazy, useState } from 'react';
import Hero from '../components/Hero';
import Marqueue from '../components/Marqueue';
import DigitalJagrathaModal from '../components/DigitalJagrathaModal';
import { useLayoutContext } from '../components/RootLayout';

// Lazy load below-the-fold components for performance
const Statistics = lazy(() => import('../components/Statistics'));
const FeaturedEvents = lazy(() => import('../components/FeaturedEvents'));
// const AudienceRouting = lazy(() => import('../components/AudienceRouting'));
const Pledge = lazy(() => import('../components/Pledge'));
const ResourceHub = lazy(() => import('../components/ResourceHub'));
const Videos = lazy(() => import('../components/Videos'));
const CyberQuiz = lazy(() => import('../components/CyberQuiz'));
const News = lazy(() => import('../components/News'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Partners = lazy(() => import('../components/Partners'));

export default function LandingPage() {
  const { darkMode, language, pledgeCountDelta, incrementPledge, handleWatchVideo } = useLayoutContext();
  const [isAmbassadorModalOpen, setIsAmbassadorModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-0 relative">
      {/* Hero Viewport Section with Ambassador Trigger */}
      <Hero 
        darkMode={darkMode} 
        onRegisterAmbassador={() => setIsAmbassadorModalOpen(true)} 
      />

      {/* Campaign breaking news & alert ticker */}
      <Marqueue language={language} />

      {/* Prominent Easy Access Spotlight Section for Digital Jagratha Ambassador */}
      {/* <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-r from-slate-900 via-[#07132c] to-slate-900 border border-ictak-cyan/30 text-white shadow-2xl"
        >
        
          <div className="absolute top-0 right-0 w-80 h-80 bg-ictak-cyan/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
            <div className="flex flex-col gap-4 max-w-2xl text-left">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-space font-bold uppercase tracking-wider border border-emerald-500/30 shadow-xs">
                  <IoSparkles className="text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                  Now Open for All Districts
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ictak-cyan/20 text-ictak-cyan text-xs font-space font-bold border border-ictak-cyan/30">
                  <IoRibbonOutline />
                  15 KTU / Govt Activity Credits
                </span>
              </div>

              <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-ictak-cyan via-teal-300 to-emerald-400">Digital Jagratha Ambassador</span>
              </h2>

              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Lead the state-wide cybersecurity & digital responsibility movement in your institution, panchayath, and municipality. Complete our 15-credit module, lead local digital safety workshops, and earn official credentials from Goverment of Keralam and KSITM.
              </p>

            
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-ictak-cyan/20 text-ictak-cyan flex items-center justify-center shrink-0">
                    <IoSchoolOutline className="text-base" />
                  </div>
                  <div>
                    <span className="text-[11px] font-space font-bold text-white block">Academic Credits</span>
                    <span className="text-[10px] text-slate-400 font-light block">15 Certified Points</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <IoShieldCheckmark className="text-base" />
                  </div>
                  <div>
                    <span className="text-[11px] font-space font-bold text-white block">Govt Certification</span>
                    <span className="text-[10px] text-slate-400 font-light block">KSITM Verified</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <IoPeopleOutline className="text-base" />
                  </div>
                  <div>
                    <span className="text-[11px] font-space font-bold text-white block">LSGD Leadership</span>
                    <span className="text-[10px] text-slate-400 font-light block">Panchayath Networks</span>
                  </div>
                </div>
              </div>
            </div>

        
            <div className="flex flex-col items-center sm:items-end gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() => setIsAmbassadorModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-space font-bold uppercase tracking-wider text-sm text-slate-950 bg-gradient-to-r from-ictak-cyan via-teal-300 to-emerald-400 hover:shadow-[0_0_30px_rgba(0,180,216,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 shadow-xl group"
              >
                <IoShieldCheckmark className="text-xl text-slate-950 group-hover:rotate-12 transition-transform" />
                <span>Register as Ambassador</span>
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
              </button>

              <div className="text-[11px] text-slate-400 font-space text-center sm:text-right">
                ✓ Free Registration • Fast 2-Minute Onboarding
              </div>
            </div>
          </div>
        </motion.div>
      </section> */}

      <Suspense
        fallback={
          <div className="h-40 flex items-center justify-center text-xs tracking-widest text-slate-400 font-space font-semibold animate-pulse">
            LOADING RESOURCES & HIGHLIGHTS...
          </div>
        }
      >
        {/* Live Campaign Impact & Transparency Metrics */}
        <Statistics language={language} pledgeCountDelta={pledgeCountDelta} />

        {/* 3D Interactive Campaigns & Flagship Events */}
        <FeaturedEvents />

        {/* Tailored Demographics Pathways (Students, Parents, Seniors) */}
        {/* <div id="audience-routing">
          <AudienceRouting
            language={language}
            onNavigateToQuiz={() => {
              document.querySelector('#cyber-quiz')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div> */}

        {/* Interactive Digital Citizen Pledge */}
        <Pledge language={language} onPledgeTaken={incrementPledge} />

        {/* Integrated Resource Hub: Toolkits, Guidelines & Stories */}
        <div id="resources">
          <ResourceHub language={language} onWatchVideo={handleWatchVideo} />
        </div>

        {/* Fraud Prevention & Scam Awareness Micro-videos */}
        <div id="videos-section">
          <Videos />
        </div>

        {/* Gamified Cyber IQ Assessment */}
        <div id="cyber-quiz">
          <CyberQuiz language={language} />
        </div>

        {/* Latest Cyber Alerts, Workshops & News */}
        <div id="news-section">
          <News language={language} />
        </div>

        {/* Community Testimonials & Voices */}
        <Testimonials />

        {/* Institutional Backers & Supporters */}
        <Partners />
      </Suspense>

      
      {/* Digital Jagratha Ambassador Registration Modal */}
      <DigitalJagrathaModal 
        isOpen={isAmbassadorModalOpen} 
        onClose={() => setIsAmbassadorModalOpen(false)} 
      />
    </div>
  );
}

