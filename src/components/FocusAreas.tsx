import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../utils/translations';
import { 
  FiShield, FiDollarSign, FiSmile, 
  FiFileText, FiLock, FiBookOpen, 
  FiSmartphone, FiCheckCircle, FiX, FiArrowRight, FiArrowLeft, FiCheck
} from 'react-icons/fi';

interface FocusAreasProps {
  language: 'en' | 'ml';
}

interface ThemeItem {
  id: number;
  title: string;
  description: string;
  details: string;
  icon: any;
  tag: string;
  tagMl: string;
  color: string;
  bgLight: string;
  bgDark: string;
  borderColor: string;
  tips: string[];
}

export default function FocusAreas({ language }: FocusAreasProps) {
  const t = translations[language];
  const [activeTheme, setActiveTheme] = useState<ThemeItem | null>(null);

  const themes: ThemeItem[] = [
    {
      id: 1,
      title: t.theme1Title,
      description: t.theme1Desc,
      details: t.theme1Details,
      icon: FiShield,
      tag: "CORE HYGIENE",
      tagMl: "അടിസ്ഥാന സുരക്ഷ",
      color: "text-ictak-blue dark:text-cyan-400",
      bgLight: "bg-ictak-blue/10",
      bgDark: "dark:bg-cyan-950/40",
      borderColor: "border-ictak-blue/20 dark:border-cyan-800/40",
      tips: language === 'en' 
        ? [
            "Use distinct, complex passphrases for email, banking, and social apps.",
            "Enable Time-based One-Time Password (TOTP) or Two-Factor Authentication.",
            "Apply operating system security patches and app updates immediately.",
            "Never perform sensitive financial or credential tasks over unencrypted public Wi-Fi."
          ] 
        : [
            "എല്ലാ അക്കൗണ്ടുകൾക്കും വ്യത്യസ്തവും ശക്തവുമായ പാസ്‌വേഡുകൾ ഉപയോഗിക്കുക.",
            "2-ഫാക്ടർ പ്രാമാണീകരണം (2FA) നിർബന്ധമായും പ്രവർത്തനക്ഷമമാക്കുക.",
            "മൊബൈൽ ഡിവൈസുകളും സോഫ്റ്റ്‌വെയറുകളും കൃത്യമായി അപ്‌ഡേറ്റ് ചെയ്യുക.",
            "പൊതു വൈഫൈ നെറ്റ്‌വർക്കുകളിൽ പ്രധാന ബാങ്കിംഗ് ഇടപാടുകൾ ഒഴിവാക്കുക."
          ]
    },
    {
      id: 2,
      title: t.theme2Title,
      description: t.theme2Desc,
      details: t.theme2Details,
      icon: FiDollarSign,
      tag: "FINANCIAL SAFETY",
      tagMl: "സാമ്പത്തിക സുരക്ഷ",
      color: "text-ictak-cyan",
      bgLight: "bg-ictak-cyan/10",
      bgDark: "dark:bg-cyan-950/40",
      borderColor: "border-ictak-cyan/25 dark:border-cyan-800/40",
      tips: language === 'en' 
        ? [
            "Banks, police, or courier officials will NEVER ask you for OTPs or PINs.",
            "Beware of parcel contraband/customs arrest extortion phone calls.",
            "Remember: Typing your UPI PIN will DEDUCT money from your account, not credit it.",
            "If defrauded, call National Cyber Helpline 1930 within the 'Golden Hour' (first 60 minutes)."
          ] 
        : [
            "ബാങ്ക് OTP അല്ലെങ്കിൽ UPI PIN ആരുമായും ഒരിക്കലും പങ്കിടരുത്.",
            "പാഴ്സലിൽ ലഹരിമരുന്ന് ഉണ്ടെന്ന് പറഞ്ഞ് കസ്റ്റംസ് പേരിൽ വരുന്ന കോളുകൾ വിശ്വസിക്കരുത്.",
            "UPI PIN നൽകുന്നത് പണം നിങ്ങളുടെ അക്കൗണ്ടിൽ നിന്ന് കുറയ്ക്കാൻ മാത്രമാണ്.",
            "തട്ടിപ്പ് നടന്നാൽ പണം തിരിച്ചുപിടിക്കാൻ ആദ്യ ഒരു മണിക്കൂറിനുള്ളിൽ 1930-ൽ വിളിക്കുക."
          ]
    },
    {
      id: 3,
      title: t.theme3Title,
      description: t.theme3Desc,
      details: t.theme3Details,
      icon: FiSmile,
      tag: "DIGITAL WELLNESS",
      tagMl: "ഡിജിറ്റൽ ആരോഗ്യം",
      color: "text-emerald-600 dark:text-emerald-400",
      bgLight: "bg-emerald-50",
      bgDark: "dark:bg-emerald-950/40",
      borderColor: "border-emerald-200 dark:border-emerald-800/40",
      tips: language === 'en' 
        ? [
            "Set strict app timer boundaries to avoid endless social doomscrolling.",
            "Practice digital detox and keep screens outside the bedroom 1 hour before sleep.",
            "Stand against cyberbullying and report aggressive online harassment.",
            "Seek guidance from school/campus counselors if feeling online anxiety or burnout."
          ] 
        : [
            "സോഷ്യൽ മീഡിയ ആപ്പുകൾക്കായി കർശനമായ സ്ക്രീൻ സമയപരിധി നിശ്ചയിക്കുക.",
            "ഉറങ്ങുന്നതിന് 1 മണിക്കൂർ മുമ്പ് ഡിജിറ്റൽ സ്ക്രീനുകൾ ഒഴിവാക്കുക.",
            "ഓൺലൈൻ ഭീഷണികളും അധിക്ഷേപങ്ങളും നേരിടുന്നവരെ സഹായിക്കുകയും റിപ്പോർട്ട് ചെയ്യുകയും ചെയ്യുക.",
            "മാനസിക സമ്മർദ്ദം അനുഭവപ്പെടുന്നുണ്ടെങ്കിൽ വിദഗ്ദ്ധ കൗൺസിലിംഗ് തേടുക."
          ]
    },
    {
      id: 4,
      title: t.theme4Title,
      description: t.theme4Desc,
      details: t.theme4Details,
      icon: FiFileText,
      tag: "INFORMATION HYGIENE",
      tagMl: "വിവര പരിശോധന",
      color: "text-purple-600 dark:text-purple-400",
      bgLight: "bg-purple-50",
      bgDark: "dark:bg-purple-950/40",
      borderColor: "border-purple-200 dark:border-purple-800/40",
      tips: language === 'en' 
        ? [
            "Cross-verify viral forward messages with official fact-check portals like PIB Fact Check.",
            "Scrutinize web domain URLs to detect imposter government or banking clones.",
            "Look out for AI-generated deepfake voice notes and synthetic video clips.",
            "Refrain from sharing panic-inducing unverified medical or communal forwards."
          ] 
        : [
            "വാട്സാപ്പ് ഫോർവേഡുകൾ PIB ഫാക്ട് ചെക്ക് പോർട്ടലുകൾ വഴി സ്ഥിരീകരിക്കുക.",
            "ഔദ്യോഗിക സർക്കാർ/ബാങ്ക് വെബ്‌സൈറ്റുകളുടെ ഡൊമെയ്ൻ വിലാസം കൃത്യമായി പരിശോധിക്കുക.",
            "എഐ ഡീപ്ഫേക്ക് വോയ്‌സ് കോളുകളും വീഡിയോകളും തിരിച്ചറിയാൻ ശ്രദ്ധിക്കുക.",
            "ഭീതി പടർത്തുന്ന വ്യാജ വാർത്തകൾ പ്രചരിപ്പിക്കുന്നത് ഒഴിവാക്കുക."
          ]
    },
    {
      id: 5,
      title: t.theme5Title,
      description: t.theme5Desc,
      details: t.theme5Details,
      icon: FiLock,
      tag: "PRIVACY & DPDP",
      tagMl: "വ്യക്തിഗത വിവര സംരക്ഷണം",
      color: "text-amber-600 dark:text-amber-400",
      bgLight: "bg-amber-50",
      bgDark: "dark:bg-amber-950/40",
      borderColor: "border-amber-200 dark:border-amber-800/40",
      tips: language === 'en' 
        ? [
            "Review camera, microphone, and contacts permissions for mobile apps.",
            "Decline third-party advertising cookies and tracking trackers on websites.",
            "Exercise your statutory right to withdraw consent and request data erasure under DPDP Act.",
            "Enforce encryption for cloud backup archives and local storage volumes."
          ] 
        : [
            "മൊബൈൽ ആപ്പുകൾക്ക് നൽകിയിട്ടുള്ള ക്യാമറ, മൈക്രോഫോൺ അനുമതികൾ പരിശോധിക്കുക.",
            "വെബ്‌സൈറ്റുകളിലെ അനാവശ്യ പരസ്യ ട്രാക്കറുകളും കുക്കികളും ഒഴിവാക്കുക.",
            "DPDP നിയമപ്രകാരം നിങ്ങളുടെ ഡാറ്റ നീക്കം ചെയ്യാനുള്ള അവകാശം ഉപയോഗിക്കുക.",
            "ക്ലൗഡ് ബാക്കപ്പുകൾ എൻക്രിപ്റ്റ് ചെയ്ത് സുരക്ഷിതമായി സൂക്ഷിക്കുക."
          ]
    },
    {
      id: 6,
      title: t.theme6Title,
      description: t.theme6Desc,
      details: t.theme6Details,
      icon: FiBookOpen,
      tag: "LEGAL RIGHTS & ETHICS",
      tagMl: "സൈബർ നിയമങ്ങൾ",
      color: "text-indigo-600 dark:text-indigo-400",
      bgLight: "bg-indigo-50",
      bgDark: "dark:bg-indigo-950/40",
      borderColor: "border-indigo-200 dark:border-indigo-800/40",
      tips: language === 'en' 
        ? [
            "Online identity theft and fake account impersonation are punishable under IT Act Sec 66C.",
            "Cyberstalking and morphing attract stringent non-bailable criminal penalties.",
            "Lodge formal grievances directly at the National Cyber Crime portal: cybercrime.gov.in.",
            "Maintain unaltered digital logs, URL links, and chat screenshots as legal evidence."
          ] 
        : [
            "വ്യാജ പ്രൊഫൈലുകൾ ഉണ്ടാക്കുന്നതും ഐഡന്റിറ്റി മോഷണവും ഐടി ആക്ട് 66C പ്രകാരം കുറ്റകരമാണ്.",
            "ഓൺലൈൻ സ്റ്റാക്കിംഗും ഫോട്ടോ മോർഫിംഗും ജാമ്യമില്ലാത്ത ക്രിമിനൽ കുറ്റമാണ്.",
            "പരാതികൾ cybercrime.gov.in എന്ന പോർട്ടൽ വഴി നേരിട്ട് രജിസ്റ്റർ ചെയ്യാം.",
            "നിയമനടപടികൾക്കായി സ്ക്രീൻഷോട്ടുകളും തെളിവുകളും കൃത്യമായി സൂക്ഷിക്കുക."
          ]
    },
    {
      id: 7,
      title: (t as any).theme7Title || (language === 'en' ? "Responsible Mobile Usage" : "ഉത്തരവാദിത്തമുള്ള മൊബൈൽ ഉപയോഗം"),
      description: (t as any).theme7Desc || (language === 'en' ? "Guidelines for mindful smartphone habits, app permissions hygiene, and safe communication." : "സ്മാർട്ട്ഫോൺ ഉപയോഗത്തിലെ നല്ല ശീലങ്ങൾ, ആപ്പ് സുരക്ഷ, സുരക്ഷിതമായ മൊബൈൽ ആശയവിനിമയം എന്നിവയ്ക്കുള്ള മാർഗ്ഗനിർദ്ദേശങ്ങൾ."),
      details: (t as any).theme7Details || (language === 'en' ? "Manage notifications and screen time, audit app permissions regularly, avoid downloading APKs from untrusted sources, secure wireless connections, and refrain from mobile usage while driving or before sleep." : "നോട്ടിഫിക്കേഷനുകളും സ്ക്രീൻ സമയവും നിയന്ത്രിക്കുക, ആപ്പ് അനുമതികൾ കൃത്യമായി പരിശോധിക്കുക, വിശ്വസനീയമല്ലാത്ത സ്രോതസ്സുകളിൽ നിന്ന് APK ഫയലുകൾ ഡൗൺലോഡ് ചെയ്യരുത്, ബ്ലൂടൂത്ത്/NFC സുരക്ഷിതമാക്കുക, ഡ്രൈവിംഗ് ചെയ്യുമ്പോഴോ രാത്രി വൈകിയോ മൊബൈൽ ഉപയോഗിക്കുന്നത് ഒഴിവാക്കുക."),
      icon: FiSmartphone,
      tag: "MOBILE RESILIENCE",
      tagMl: "മൊബൈൽ സുരക്ഷ",
      color: "text-teal-600 dark:text-teal-400",
      bgLight: "bg-teal-50",
      bgDark: "dark:bg-teal-950/40",
      borderColor: "border-teal-200 dark:border-teal-800/40",
      tips: language === 'en' 
        ? [
            "Avoid side-loading untrusted APK files or granting root permissions to unknown applications.",
            "Disable Bluetooth, Wi-Fi hotspot, and NFC when not in active use to prevent unauthorized pairing.",
            "Audit installed app permissions periodically and revoke unnecessary access to camera, mic, and contacts.",
            "Strictly avoid smartphone usage while driving, and establish no-screen zones during meals and sleep hours."
          ] 
        : [
            "അപരിചിതമായ ആപ്പുകൾ/APK ഫയലുകൾ ഇൻസ്റ്റാൾ ചെയ്യുകയോ അനാവശ്യ അനുമതികൾ നൽകുകയോ ചെയ്യരുത്.",
            "ഉപയോഗമില്ലാത്ത സമയങ്ങളിൽ ബ്ലൂടൂത്ത്, വൈഫൈ ഹോട്ട്സ്പോട്ട്, NFC എന്നിവ ഓഫ് ചെയ്തിടുക.",
            "മൊബൈൽ ആപ്പുകളുടെ അനുമതികൾ കൃത്യമായി പരിശോധിച്ച് അനാവശ്യ ആക്സസുകൾ റദ്ദാക്കുക.",
            "വാഹനം ഓടിക്കുമ്പോഴുള്ള മൊബൈൽ ഉപയോഗം കർശനമായി ഒഴിവാക്കുക, ഉറങ്ങുന്നതിന് മുമ്പ് ഫോൺ മാറ്റിവെക്കുക."
          ]
    },
  ];

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveTheme(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrevTheme = () => {
    if (!activeTheme) return;
    const currentIndex = themes.findIndex(t => t.id === activeTheme.id);
    const prevIndex = (currentIndex - 1 + themes.length) % themes.length;
    setActiveTheme(themes[prevIndex]);
  };

  const handleNextTheme = () => {
    if (!activeTheme) return;
    const currentIndex = themes.findIndex(t => t.id === activeTheme.id);
    const nextIndex = (currentIndex + 1) % themes.length;
    setActiveTheme(themes[nextIndex]);
  };

  return (
    <section id="focus-areas" className="relative z-10 py-20 lg:py-24 bg-white dark:bg-[#06060c] border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ictak-cyan/10 border border-ictak-cyan/20 text-ictak-cyan text-[11px] font-space font-bold uppercase tracking-wider mb-3">
            <FiShield />
            <span>Cyber Resilience Framework</span>
          </div>
          <h2 className="h2-scale font-space text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t.themesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light mt-2 max-w-xl mx-auto leading-relaxed">
            {t.themesSubtitle}
          </p>
        </div>

        {/* 7 Core Themes Grid with Fixed Equal Height Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {themes.map((theme) => {
            const Icon = theme.icon;
            return (
              <div
                key={theme.id}
                onClick={() => setActiveTheme(theme)}
                className="group safetech-card p-7 rounded-3xl cursor-pointer flex flex-col justify-between border border-slate-200/70 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-ictak-cyan transition-all duration-300 relative shadow-md hover:shadow-xl text-left min-h-[300px]"
              >
                <div>
                  {/* Top Bar: Category Pill & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3.5 rounded-2xl inline-flex ${theme.color} ${theme.bgLight} ${theme.bgDark} ${theme.borderColor} border group-hover:scale-105 transition-transform duration-300 shadow-sm`}>
                      <Icon className="text-2xl" />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-space font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {language === 'en' ? theme.tag : theme.tagMl}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="h3-scale text-lg font-bold text-slate-900 dark:text-white font-space mb-2.5 group-hover:text-ictak-cyan transition-colors duration-300 leading-snug">
                    {theme.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 font-light leading-relaxed line-clamp-3">
                    {theme.description}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-space font-bold text-ictak-blue dark:text-ictak-cyan group-hover:translate-x-0.5 transition-transform">
                  <span>{language === 'en' ? 'Inspect Guidelines' : 'മാർഗ്ഗനിർദ്ദേശങ്ങൾ കാണുക'}</span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-ictak-cyan group-hover:text-white flex items-center justify-center transition-colors">
                    <FiArrowRight className="text-xs" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Modal Dialogue (Eliminates all row resizing / layout shifting) */}
      <AnimatePresence>
        {activeTheme && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            
            {/* Backdrop Dismiss click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTheme(null)}
              className="absolute inset-0"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl z-10 select-none overflow-hidden max-h-[90vh] flex flex-col justify-between text-left"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className={`p-3.5 rounded-2xl ${activeTheme.bgLight} ${activeTheme.bgDark} ${activeTheme.color} ${activeTheme.borderColor} border text-2xl shrink-0`}>
                    <activeTheme.icon />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-space font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {language === 'en' ? activeTheme.tag : activeTheme.tagMl}
                    </span>
                    <h3 className="font-space text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                      {activeTheme.title}
                    </h3>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setActiveTheme(null)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                  title="Close (Esc)"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              {/* Modal Body - Scrollable content */}
              <div className="my-5 overflow-y-auto pr-1 space-y-5 flex-1 scrollbar-thin">
                {/* Detailed Overview */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <h4 className="text-xs font-space font-bold uppercase tracking-wider text-ictak-blue dark:text-ictak-cyan mb-1.5 flex items-center gap-1.5">
                    <FiCheckCircle />
                    {language === 'en' ? 'Core Mandate' : 'പ്രധാന ലക്ഷ്യം'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                    {activeTheme.details}
                  </p>
                </div>

                {/* Actionable Guidelines Checklist */}
                <div>
                  <h4 className="text-xs font-space font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                    {language === 'en' ? 'Practical Security Checklist' : 'പ്രായോഗിക സുരക്ഷാ നിർദ്ദേശങ്ങൾ'}
                  </h4>

                  <ul className="space-y-3">
                    {activeTheme.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs shrink-0 mt-0.5">
                          <FiCheck />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-light leading-snug">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer: Next / Prev Navigation */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevTheme}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-space text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <FiArrowLeft className="text-xs" />
                    <span>{language === 'en' ? 'Previous' : 'മുമ്പത്തേത്'}</span>
                  </button>
                  <button
                    onClick={handleNextTheme}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-space text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{language === 'en' ? 'Next' : 'അടുത്തത്'}</span>
                    <FiArrowRight className="text-xs" />
                  </button>
                </div>

                <button
                  onClick={() => setActiveTheme(null)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-ictak-blue to-ictak-cyan hover:opacity-95 text-white font-space text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm transition"
                >
                  {language === 'en' ? 'Got It' : 'മനസ്സിലായി'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
