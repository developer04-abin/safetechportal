import { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import Marqueue from '../components/Marqueue';
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

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Viewport Section */}
      <Hero darkMode={darkMode} />

      {/* Campaign breaking news & alert ticker */}
      <Marqueue language={language} />

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
    </div>
  );
}
