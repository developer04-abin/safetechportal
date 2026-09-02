import { Link } from 'react-router-dom';
import { translations } from '../utils/translations';
import { FiAlertCircle, FiShield, FiArrowUp } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

interface FooterProps {
  language: 'en' | 'ml';
}

export default function Footer({ language }: FooterProps) {
  const t = translations[language];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: t.home, path: '/' },
    { name: t.about, path: '/about' },
    { name: t.resources, path: '/#resources' },
    { name: t.clubs, path: '/clubs' },
    { name: t.contact, path: '/contact' },
  ];

  return (
    <footer className="relative bg-slate-900 text-slate-400 overflow-hidden pt-12 border-t border-slate-800">
      {/* Emergency Helpline Strip Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg border border-red-500/20">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-white/10 rounded-xl text-2xl text-white shrink-0">
              <FiAlertCircle className="animate-pulse" />
            </div>
            <div className="flex flex-col">
              <h4 className="font-space text-lg sm:text-xl font-bold uppercase tracking-wider">
                {t.emergencyHeader}
              </h4>
              <p className="text-xs text-white/80 font-light mt-0.5 max-w-md">
                {t.emergencySub}
              </p>
            </div>
          </div>
          <a
            href="tel:1930"
            className="w-full md:w-auto px-8 py-3.5 bg-white text-red-600 rounded-xl font-space font-extrabold uppercase text-sm tracking-wider text-center cursor-pointer shadow-sm hover:bg-slate-50 transition"
          >
            {language === 'en' ? 'Call Helpline' : 'ഹെൽപ്പ് ലൈനിൽ വിളിക്കുക'}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
        {/* Info Column */}
        <div className="flex flex-col gap-5 text-left">
          <Link to="/" className="font-space text-xl font-black text-white flex items-center gap-1.5 leading-none no-underline">
            <span className="w-2.5 h-2.5 rounded-full bg-ictak-cyan animate-pulse"></span>
            SafeTech <span className="text-ictak-cyan text-xs font-normal">KERALA</span>
          </Link>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            {t.footerDisclaimer}
          </p>
          {/* Social Icons */}
          <div className="flex gap-3.5 items-center">
            {[FaLinkedinIn, FaInstagram, FaTwitter, FaYoutube, FaFacebookF].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-ictak-cyan hover:text-slate-900 flex items-center justify-center text-sm transition-all cursor-pointer text-slate-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-4 text-left">
          <h4 className="font-space text-xs font-bold text-white tracking-wider uppercase">
            {language === 'en' ? 'Navigation' : 'ഹോം ലിങ്കുകൾ'}
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-white hover:text-ictak-cyan transition-colors cursor-pointer text-left font-semibold no-underline"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Institutional Partner Logos representation */}
        <div className="flex flex-col gap-4 text-left">
          <h4 className="font-space text-xs font-bold text-white tracking-wider uppercase">
            {t.partners}
          </h4>
          <div className="flex flex-wrap gap-2 text-[10px] font-space font-bold">
            <span className="px-2.5 py-1.5 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
              E & ITD, Govt of Kerala
            </span>
            <span className="px-2.5 py-1.5 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
              KITE, Dept of Education
            </span>
            <span className="px-2.5 py-1.5 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
              Kerala Police Cyberdome
            </span>
          </div>
        </div>

        {/* Campaign Info */}
        <div className="flex flex-col gap-4 text-left">
          <h4 className="font-space text-xs font-bold text-white tracking-wider uppercase">
            {language === 'en' ? 'Mission Support' : 'സഹായ കേന്ദ്രങ്ങൾ'}
          </h4>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            {language === 'en'
              ? 'SafeTech is designed to build grassroot awareness. Join as a school representative or Master Trainer to contribute.'
              : 'സൈബർ സുരക്ഷ പ്രാദേശിക തലത്തിൽ വളർത്താൻ സഹായിക്കുക. സ്കൂൾ കോർഡിനേറ്ററായോ മാസ്റ്റർ ട്രെയിനറായോ പങ്കാളിയാവുക.'}
          </p>
          <div className="flex items-center gap-2 text-xs font-bold text-ictak-cyan mt-1">
            <FiShield />
            <span>DPDP Act Compliant</span>
          </div>
        </div>
      </div>

      {/* Under Footer (Copyright & Back to top) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-slate-500">
        <span>
          © 2026 SafeTech Kerala Campaign Portal. All rights reserved. Created in partnership with KSITM & ICTAK.
        </span>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <a href="#" className="hover:text-white transition">
            {t.privacyPolicy}
          </a>
          <a href="#" className="hover:text-white transition">
            {t.termsOfUse}
          </a>
          <a href="#" className="hover:text-white transition">
            {t.accessibilityStmt}
          </a>
          <a href="#" className="hover:text-white transition">
            {t.sitemap}
          </a>
        </div>

        <button
          onClick={handleScrollTop}
          className="flex items-center gap-1.5 font-space text-[10px] uppercase font-bold tracking-wider text-slate-400 hover:text-white bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700 cursor-pointer transition"
        >
          Back To Top
          <FiArrowUp />
        </button>
      </div>
    </footer>
  );
}
