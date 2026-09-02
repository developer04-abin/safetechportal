import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useLayoutContext } from '../components/RootLayout';
import { FiPhoneCall, FiAlertTriangle } from 'react-icons/fi';

const Contact = lazy(() => import('../components/Contact'));

export default function ContactPage() {
  const { language, triggerIncidentReport } = useLayoutContext();

  return (
    <div className="flex flex-col gap-0">
      {/* Contact Header Banner */}
      <section className="relative py-20 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-950/30 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emergency-red/10 border border-emergency-red/20 text-emergency-red text-xs font-space font-semibold uppercase tracking-wider mb-6"
            >
              <FiPhoneCall className="text-sm animate-pulse" />
              <span>Support & Emergency Response</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-space text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-6"
            >
              Get in Touch & <span className="text-emergency-red">Report Cyber Frauds</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8"
            >
              Have a query about SafeTech programs, Master Trainer registrations, or school club kits? Reach our support desk or call the National Cyber Helpline 1930 immediately for financial fraud.
            </motion.p>
          </div>

          {/* Emergency Golden Hour Highlight Banner */}
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-600/20 via-orange-600/10 to-red-600/20 border border-red-500/30 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-start gap-4 text-left">
              <div className="p-3 bg-red-600/20 text-red-500 rounded-2xl text-2xl shrink-0">
                <FiAlertTriangle className="animate-bounce" />
              </div>
              <div>
                <h3 className="font-space text-lg font-bold text-white flex items-center gap-2">
                  Immediate Financial Fraud Reporting (Golden Hour)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-1 max-w-xl">
                  If you lost money through UPI, Netbanking, or OTP scams, call <strong>1930</strong> within the first hour so banks can freeze fraudulent transfers immediately.
                </p>
              </div>
            </div>

            <button
              onClick={triggerIncidentReport}
              className="w-full md:w-auto px-8 py-3.5 rounded-2xl bg-emergency-red hover:bg-red-600 text-white font-space font-bold uppercase text-xs sm:text-sm tracking-wider shadow-lg transition cursor-pointer shrink-0"
            >
              Open 1930 Guide
            </button>
          </div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="h-40 flex items-center justify-center text-xs tracking-widest text-slate-400 font-space font-semibold animate-pulse">
            LOADING CONTACT INTERFACE...
          </div>
        }
      >
        {/* Contact Form & Office Coordinates */}
        <Contact language={language} />
      </Suspense>
    </div>
  );
}
