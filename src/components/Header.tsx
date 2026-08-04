import { useState, useEffect } from 'react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { translations } from '../utils/translations';
import { HiOutlineSearch } from 'react-icons/hi';
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
  const [activeItem, setActiveItem] = useState('#home');
  const scrollDir = useScrollDirection();

  const t = translations[language];

  const navItems = [
    { name: t.home, id: '#home' },
    { name: t.about, id: '#about' },
    { name: t.resources, id: '#resources' },
    { name: t.clubs, id: '#clubs' },
    { name: t.contact, id: '#contact' },
  ];

  useEffect(() => { const script = document.createElement("script"); script.src =  "https://translation-plugin.bhashini.co.in/v3/website_translation_utility.js"; script.async = true; document.body.appendChild(script); }, []); 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Track active section on scroll
      const sections = navItems.map(item => document.querySelector(item.id));
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section, index) => {
        if (!section) return;
        const top = (section as HTMLElement).offsetTop;
        const height = (section as HTMLElement).offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveItem(navItems[index].id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [language]);

  const handleNavClick = (id: string) => {
    setActiveItem(id);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for "${searchQuery}"...`);
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
          : 'py-4 bg-white/60 dark:bg-black/30 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Brand Logos */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('#home')}>
            <span className="font-space text-lg sm:text-xl font-extrabold tracking-tight text-ictak-blue dark:text-white flex flex-col leading-none">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-ictak-cyan animate-pulse"></span>
                SafeTech <span className="text-ictak-cyan text-xs font-normal">KERALA</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans mt-0.5 font-semibold">
                Digital Responsibility
              </span>
            </span>
          </div>

          {/* Trust Signals (ICTAK, KSITM, Police Badge representation) */}
          <div className="flex items-center gap-2 text-[8px] sm:text-[9px] text-slate-400 dark:text-slate-550 font-sans font-medium uppercase border-l pl-3 border-slate-300 dark:border-slate-700">
            <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 font-bold border border-slate-200 dark:border-slate-700">ICTAK</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 font-bold border border-slate-200 dark:border-slate-700">KSITM</span>
            {/* <span className="px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 font-bold border border-red-100 dark:border-red-900/30">Cyberdome</span> */}
          </div>
        </div>

        {/* Search, Navigation and Controls */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 w-full md:w-auto">
          {/* Global Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center h-8">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-ictak-cyan focus:bg-white dark:focus:bg-slate-900 w-36 sm:w-48 text-slate-900 dark:text-slate-100 transition-all"
            />
            <HiOutlineSearch className="absolute left-2.5 text-slate-400 text-sm" />
          </form>

          {/* Nav menu links */}
          <nav className="hidden lg:flex items-center gap-5">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 font-space text-xs uppercase tracking-wider transition-all font-semibold cursor-pointer ${
                  activeItem === item.id 
                    ? 'text-ictak-blue dark:text-ictak-cyan font-bold' 
                    : 'text-slate-500 dark:text-slate-450 hover:text-ictak-cyan'
                }`}
              >
                {item.name}
                {activeItem === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-ictak-cyan rounded-full shadow-sm" />
                )}
              </button>
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

            {/* High Contrast Toggle */}
            {/* <button
              onClick={() => setContrastMode(!contrastMode)}
              className={`p-1.5 rounded transition cursor-pointer border ${
                contrastMode 
                  ? 'bg-yellow-400 text-black border-yellow-400' 
                  : 'bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
              title={t.contrast}
            >
              <MdOutlineContrast className="text-sm" />
            </button> */}

            {/* Font Size Toggle */}
            <button
              onClick={cycleTextSize}
              className="p-1.5 rounded bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer border border-slate-200 dark:border-slate-700 flex items-center gap-0.5"
              title={`${t.fontSize}: ${textSize.toUpperCase()}`}
            >
              <MdFormatSize className="text-sm" />
              <span className="text-[9px] font-bold uppercase">{textSize === 'normal' ? 'A' : textSize === 'large' ? 'A+' : 'A++'}</span>
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
    </header>
  );
}
