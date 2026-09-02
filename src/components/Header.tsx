import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { translations } from '../utils/translations';
import { HiOutlineSearch, HiMenu, HiX } from 'react-icons/hi';
import { MdFormatSize } from 'react-icons/md';
import { FiSun, FiMoon } from 'react-icons/fi';

interface HeaderProps {
  language: 'en' | 'ml';
  setLanguage: (lang: 'en' | 'ml') => void;
  contrastMode: boolean;
  setContrastMode: (mode: boolean) => void;
  textSize: 'normal' | 'large' | 'xl';
  setTextSize: (size: 'normal' | 'large' | 'xl') => void;
  onReportIncident: () => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

export default function Header({
  language,
  textSize,
  setTextSize,
  onReportIncident,
  darkMode,
  setDarkMode,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollDir = useScrollDirection();
  const navigate = useNavigate();
  const location = useLocation();

  const t = translations[language];

  const navItems = [
    { name: t.home, path: '/' },
    { name: t.about, path: '/about' },
    { name: t.clubs, path: '/clubs' },
    { name: t.contact, path: '/contact' },
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://translation-plugin.bhashini.co.in/v3/website_translation_utility.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (q.includes('club') || q.includes('school') || q.includes('college')) {
        navigate('/clubs');
      } else if (q.includes('about') || q.includes('theme') || q.includes('timeline') || q.includes('mission')) {
        navigate('/about');
      } else if (q.includes('contact') || q.includes('help') || q.includes('report') || q.includes('police')) {
        navigate('/contact');
      } else {
        // Search query navigates to home with search or smooth scrolls to resources
        if (location.pathname === '/') {
          document.querySelector('#resources')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/#resources');
        }
      }
      setSearchQuery('');
    }
  };

  const cycleTextSize = () => {
    if (textSize === 'normal') setTextSize('large');
    else if (textSize === 'large') setTextSize('xl');
    else setTextSize('normal');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[40] transition-all duration-500 ease-in-out ${
        scrollDir === 'down' && isScrolled ? '-translate-y-full' : 'translate-y-0'
      } ${
        isScrolled
          ? 'py-2.5 bg-white/95 dark:bg-slate-950/95 shadow-md border-b border-slate-200/80 dark:border-slate-800 backdrop-blur-md'
          : 'py-4 bg-white/80 dark:bg-black/60 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand Logos */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 cursor-pointer no-underline"
          >
            <span className="font-space text-lg sm:text-xl font-extrabold tracking-tight text-ictak-blue dark:text-white flex flex-col leading-none">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-ictak-cyan animate-pulse"></span>
                SafeTech <span className="text-ictak-cyan text-xs font-normal">KERALA</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans mt-0.5 font-semibold">
                Digital Responsibility
              </span>
            </span>
          </Link>

          {/* Trust Signals */}
          <div className="flex items-center gap-2 text-[8px] sm:text-[9px] text-slate-400 dark:text-slate-550 font-sans font-medium uppercase border-l pl-3 border-slate-300 dark:border-slate-700">
            <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 font-bold border border-slate-200 dark:border-slate-700">
              ICTAK
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 font-bold border border-slate-200 dark:border-slate-700">
              KSITM
            </span>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <HiX className="text-lg" /> : <HiMenu className="text-lg" />}
          </button>
        </div>

        {/* Search, Navigation and Controls */}
        <div className="hidden md:flex flex-wrap items-center justify-end gap-3 sm:gap-4 w-full md:w-auto">
          {/* Global Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center h-8">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-ictak-cyan focus:bg-white dark:focus:bg-slate-900 w-36 sm:w-44 text-slate-900 dark:text-slate-100 transition-all"
            />
            <HiOutlineSearch className="absolute left-2.5 text-slate-400 text-sm" />
          </form>

          {/* Nav menu links */}
          <nav className="flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative py-1 font-space text-xs uppercase tracking-wider transition-all cursor-pointer font-semibold ${
                    isActive
                      ? 'text-ictak-blue dark:text-ictak-cyan font-bold'
                      : 'text-slate-600 dark:text-slate-350 hover:text-ictak-cyan dark:hover:text-ictak-cyan'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-ictak-cyan rounded-full shadow-sm" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Accessible / Multi-Language controls */}
          <div className="flex items-center gap-2 border-l pl-3 border-slate-200 dark:border-slate-700">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer border border-slate-200 dark:border-slate-700"
              title="Toggle Theme"
            >
              {darkMode ? <FiSun className="text-sm text-yellow-500" /> : <FiMoon className="text-sm" />}
            </button>
            <div className="bhashini-plugin-container"></div>

            {/* Font Size Toggle */}
            <button
              onClick={cycleTextSize}
              className="p-1.5 rounded bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer border border-slate-200 dark:border-slate-700 flex items-center gap-0.5"
              title={`${t.fontSize}: ${textSize.toUpperCase()}`}
            >
              <MdFormatSize className="text-sm" />
              <span className="text-[9px] font-bold uppercase">
                {textSize === 'normal' ? 'A' : textSize === 'large' ? 'A+' : 'A++'}
              </span>
            </button>
          </div>

          {/* Emergency Call Action */}
          <button
            onClick={onReportIncident}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-emergency-red hover:bg-red-600 transition shadow-sm cursor-pointer"
          >
            Report 1930
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md flex flex-col gap-3">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center h-9 w-full">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-ictak-cyan w-full text-slate-900 dark:text-slate-100"
            />
            <HiOutlineSearch className="absolute left-2.5 text-slate-400 text-sm" />
          </form>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-xs font-space uppercase font-semibold tracking-wider transition ${
                    isActive
                      ? 'bg-ictak-cyan/10 text-ictak-cyan font-bold'
                      : 'text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                title="Toggle Theme"
              >
                {darkMode ? <FiSun className="text-sm text-yellow-500" /> : <FiMoon className="text-sm" />}
              </button>
              <button
                onClick={cycleTextSize}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1 text-xs font-bold"
              >
                <MdFormatSize />
                {textSize.toUpperCase()}
              </button>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReportIncident();
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-emergency-red"
            >
              Report 1930
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
