import { useState, useEffect, Suspense } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import Lenis from 'lenis';

import Loader from './Loader';
import CustomCursor from './CustomCursor';
import Header from './Header';
import Footer from './Footer';
import VideoModal from './VideoModal';
import Chatbot from './Chatbot';

export interface LayoutContextType {
  darkMode: boolean;
  language: 'en' | 'ml';
  handleWatchVideo: (url: string) => void;
  triggerIncidentReport: () => void;
  pledgeCountDelta: number;
  incrementPledge: () => void;
}

export function useLayoutContext() {
  return useOutletContext<LayoutContextType>();
}

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [contrastMode, setContrastMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [pledgeCountDelta, setPledgeCountDelta] = useState(0);

  // Video Modal State
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');

  // Incident reporting modal
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);

  // Sync dark mode state with root class list
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  const handleWatchVideo = (url: string) => {
    setActiveVideoUrl(url);
    setIsVideoOpen(true);
  };

  const triggerIncidentReport = () => {
    setIsIncidentModalOpen(true);
  };

  const incrementPledge = () => {
    setPledgeCountDelta((prev) => prev + 1);
  };

  const outletContext: LayoutContextType = {
    darkMode,
    language: 'en',
    handleWatchVideo,
    triggerIncidentReport,
    pledgeCountDelta,
    incrementPledge,
  };

  return (
    <div
      className={`${contrastMode ? 'high-contrast' : ''} ${
        textSize === 'large' ? 'text-size-large' : textSize === 'xl' ? 'text-size-xl' : ''
      }`}
    >
      {/* Pre-loader Screen */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <div className="relative min-h-screen text-slate-800 dark:text-slate-100 bg-[var(--bg-color)] overflow-hidden font-sans transition-colors duration-300 flex flex-col justify-between">
          {/* Custom Spring Cursor */}
          <CustomCursor />

          {/* Sticky Header */}
          <Header
            language="en"
            setLanguage={() => {}}
            contrastMode={contrastMode}
            setContrastMode={setContrastMode}
            textSize={textSize}
            setTextSize={setTextSize}
            onReportIncident={triggerIncidentReport}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {/* Main Content Router Outlet */}
          <main className="relative z-10 flex-grow pt-20">
            <Suspense
              fallback={
                <div className="min-h-[60vh] flex items-center justify-center text-xs tracking-widest text-slate-400 font-space font-semibold animate-pulse">
                  LOADING CONTENT...
                </div>
              }
            >
              <Outlet context={outletContext} />
            </Suspense>
          </main>

          {/* Shared Global Footer */}
          <Footer language="en" />

          {/* SOS Assistant Chatbot floating bottom right */}
          <Chatbot language="en" />

          {/* Video modal player popup */}
          <VideoModal
            isOpen={isVideoOpen}
            onClose={() => setIsVideoOpen(false)}
            videoUrl={activeVideoUrl}
          />

          {/* Incident Report 1930 Modal */}
          {isIncidentModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="relative bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl text-left">
                <button
                  onClick={() => setIsIncidentModalOpen(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>

                <h3 className="font-space text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                  <span>🚨</span> Report a Cyber Crime
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed mb-6 font-light">
                  If you have lost money in a cyber scam or financial phishing incident, contact the helpline immediately. Time is critical (Golden Hour).
                </p>

                <div className="flex flex-col gap-4">
                  {/* National Helpline Action */}
                  <a
                    href="tel:1930"
                    className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 hover:bg-red-100 border border-red-100 dark:border-red-900/55 transition flex justify-between items-center cursor-pointer group"
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-red-700 dark:text-red-400 uppercase font-space">
                        Call Hotline
                      </span>
                      <span className="text-xl font-extrabold text-red-600 dark:text-red-500 font-mono mt-0.5">
                        1930
                      </span>
                    </div>
                    <span className="text-xs font-bold font-space text-red-700 bg-white dark:bg-slate-800 border border-red-200 dark:border-slate-700 px-3 py-1 rounded-full group-hover:bg-red-200">
                      Call Now
                    </span>
                  </a>

                  {/* Web Portal Link */}
                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 border border-slate-200 dark:border-slate-750 transition flex justify-between items-center cursor-pointer group"
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-space">
                        National Web Portal
                      </span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1 truncate">
                        cybercrime.gov.in
                      </span>
                    </div>
                    <span className="text-xs font-bold font-space text-slate-600 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full group-hover:bg-slate-200">
                      Visit Site
                    </span>
                  </a>
                </div>

                <div className="mt-6 text-[10px] text-slate-400 text-center font-light leading-relaxed">
                  Provided in partnership with Kerala Police Cyberdome and KSITM. Secure connection.
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
