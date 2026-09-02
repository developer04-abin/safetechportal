import { useState } from 'react';
import { translations } from '../utils/translations';
import { FiDownload, FiFileText, FiPlay, FiVideo, FiCheckCircle } from 'react-icons/fi';

interface ResourceHubProps {
  language: 'en' | 'ml';
  onWatchVideo: (videoUrl: string) => void;
}

interface ResourceItem {
  id: number;
  titleEn: string;
  titleMl: string;
  type: string;
  size: string;
  downloads: string;
}

interface VideoStory {
  id: number;
  titleEn: string;
  titleMl: string;
  speakerEn: string;
  speakerMl: string;
  roleEn: string;
  roleMl: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
}

export default function ResourceHub({ language, onWatchVideo }: ResourceHubProps) {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'materials' | 'videos'>('materials');

  const resources: ResourceItem[] = [
    {
      id: 1,
      titleEn: "Official Cyber Hygiene Poster for Classrooms & Offices",
      titleMl: "ക്ലാസ് റൂമുകൾക്കും ഓഫീസുകൾക്കുമുള്ള സൈബർ ഹൈജീൻ പോസ്റ്റർ",
      type: "PDF Document",
      size: "2.4 MB",
      downloads: "14.2k downloads"
    },
    {
      id: 2,
      titleEn: "SafeTech Digital Parenting Toolkit (Full Guide)",
      titleMl: "രക്ഷിതാക്കൾക്കായുള്ള ഡിജിറ്റൽ പേരന്റിംഗ് ഗൈഡ് (മുഴുവൻ പതിപ്പ്)",
      type: "PDF Manual",
      size: "4.8 MB",
      downloads: "9.8k downloads"
    },
    {
      id: 3,
      titleEn: "Senior Citizens OTP & Financial Fraud Prevention Flyer",
      titleMl: "മുതിർന്ന പൗരന്മാർക്കുള്ള സാമ്പത്തിക തട്ടിപ്പ് പ്രതിരോധ ലഘുലേഖ",
      type: "PDF Flyer",
      size: "1.1 MB",
      downloads: "18.5k downloads"
    },
    {
      id: 4,
      titleEn: "Workplace Cyber Security Best Practices Checklist",
      titleMl: "ഓഫീസുകൾക്കായുള്ള സൈബർ സുരക്ഷാ ചെക്ക്‌ലിസ്റ്റ്",
      type: "PDF Checklist",
      size: "850 KB",
      downloads: "7.1k downloads"
    }
  ];

  const videos: VideoStory[] = [
    {
      id: 1,
      titleEn: "How I helped my grandmother recover ₹45,000 lost to a scam in under an hour (Golden Hour case study)",
      titleMl: "തട്ടിപ്പിൽ നഷ്ടപ്പെട്ട പണം 1 മണിക്കൂറിനുള്ളിൽ തിരികെ വാങ്ങാൻ മുത്തശ്ശിയെ സഹായിച്ച കഥ",
      speakerEn: "Anjali Menon",
      speakerMl: "അഞ്ജലി മേനോൻ",
      roleEn: "Jagratha Ambassador, Ernakulam",
      roleMl: "ജാഗ്രതാ അംബാസഡർ, എറണാകുളം",
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "4:15"
    },
    {
      id: 2,
      titleEn: "Setting up institutional clubs: Practical roadmap for school & college coordinators",
      titleMl: "സ്കൂളുകളിലും കോളേജുകളിലും സേഫ്ടെക് ക്ലബ് രൂപീകരണം: അറിയേണ്ട കാര്യങ്ങൾ",
      speakerEn: "Dr. Thomas George",
      speakerMl: "ഡോ. തോമസ് ജോർജ്",
      roleEn: "Master ToT Trainer, KSITM",
      roleMl: "മാസ്റ്റർ ട്രെയിനർ, കെ.എസ്.ഐ.ടി.എം",
      thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "5:30"
    }
  ];

  const handleDownload = (title: string) => {
    alert(`Demo: Downloading verified resource "${title}"`);
  };

  return (
    <section id="resources" className="py-20 lg:py-24 bg-white dark:bg-[#06060c] border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ictak-cyan/10 border border-ictak-cyan/20 text-ictak-cyan text-[11px] font-space font-bold uppercase tracking-wider mb-3">
            <FiDownload />
            <span>Learning Repository</span>
          </div>
          <h2 className="h2-scale font-space text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t.resourceTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light mt-2 max-w-xl mx-auto leading-relaxed">
            {t.resourceSubtitle}
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-6 py-2.5 rounded-2xl font-space font-bold text-xs uppercase tracking-wider transition cursor-pointer border flex items-center gap-2 ${
              activeTab === 'materials'
                ? 'bg-gradient-to-r from-ictak-blue to-cyan-700 border-transparent text-white shadow-md'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'
            }`}
          >
            <FiFileText className="text-sm" />
            <span>{t.assetsTab}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-2.5 rounded-2xl font-space font-bold text-xs uppercase tracking-wider transition cursor-pointer border flex items-center gap-2 ${
              activeTab === 'videos'
                ? 'bg-gradient-to-r from-ictak-blue to-cyan-700 border-transparent text-white shadow-md'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'
            }`}
          >
            <FiVideo className="text-sm" />
            <span>{t.storiesTab}</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'materials' ? (
          /* Downloadable Materials List */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((res) => (
              <div
                key={res.id}
                className="safetech-card p-6 sm:p-7 rounded-3xl flex items-center justify-between border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 text-left pr-4">
                  <div className="p-3.5 rounded-2xl bg-ictak-blue/5 dark:bg-ictak-cyan/10 text-ictak-blue dark:text-ictak-cyan text-xl shrink-0 group-hover:scale-105 transition-transform">
                    <FiFileText />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-space font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-ictak-cyan transition-colors">
                      {language === 'en' ? res.titleEn : res.titleMl}
                    </h4>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-space font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {res.type} • {res.size}
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <FiCheckCircle className="text-xs" />
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(language === 'en' ? res.titleEn : res.titleMl)}
                  className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-ictak-cyan hover:text-white dark:hover:bg-ictak-cyan dark:hover:text-slate-950 transition cursor-pointer shrink-0 shadow-xs"
                  title={t.download}
                >
                  <FiDownload className="text-base" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Video Ambassador Stories Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="group safetech-card rounded-3xl overflow-hidden border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Thumbnail Player Area with Accurately Positioned Play Icon */}
                <div className="h-60 sm:h-64 relative overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img
                    src={vid.thumbnail}
                    alt={vid.speakerEn}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/30 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-ictak-blue to-cyan-700 px-3 py-1 rounded-full font-space text-[9px] uppercase font-bold tracking-wider text-white shadow-md z-10">
                    Ambassador Story
                  </span>
                  <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full font-space text-[9px] font-bold text-white border border-white/20 z-10">
                    {vid.duration}
                  </span>

                  {/* Centered Play Button Trigger with Ripple Ring */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <button
                      onClick={() => onWatchVideo(vid.videoUrl)}
                      className="relative w-16 h-16 rounded-full bg-gradient-to-r from-ictak-blue to-ictak-cyan text-white flex items-center justify-center text-2xl shadow-[0_4px_25px_rgba(0,180,216,0.6)] group-hover:scale-110 transition-all duration-300 cursor-pointer pointer-events-auto border-2 border-white/80"
                      aria-label="Play Ambassador Story Video"
                    >
                      {/* Pulse Ping Ring */}
                      <span className="absolute inset-0 rounded-full bg-ictak-cyan animate-ping opacity-30 pointer-events-none" />
                      <FiPlay className="ml-1 text-white text-xl relative z-10" />
                    </button>
                  </div>
                </div>

                {/* Text Info Body */}
                <div className="p-6 sm:p-7 text-left flex flex-col justify-between flex-grow gap-4">
                  <div>
                    <h4 className="font-space font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-ictak-cyan transition-colors">
                      {language === 'en' ? vid.titleEn : vid.titleMl}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold font-space text-slate-900 dark:text-slate-200">
                        {language === 'en' ? vid.speakerEn : vid.speakerMl}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-space font-medium mt-0.5">
                        {language === 'en' ? vid.roleEn : vid.roleMl}
                      </span>
                    </div>

                    <button
                      onClick={() => onWatchVideo(vid.videoUrl)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-ictak-cyan hover:text-white dark:hover:bg-ictak-cyan dark:hover:text-slate-950 font-space text-[10px] uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300 transition cursor-pointer flex items-center gap-1.5"
                    >
                      <FiPlay className="text-xs" />
                      <span>Watch Story</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
