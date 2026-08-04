import { useState } from 'react';
import { translations } from '../utils/translations';
import { FiDownload, FiFileText, FiPlay } from 'react-icons/fi';

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
}

interface VideoStory {
  id: number;
  titleEn: string;
  titleMl: string;
  speakerEn: string;
  speakerMl: string;
  thumbnail: string;
  videoUrl: string;
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
      size: "2.4 MB"
    },
    {
      id: 2,
      titleEn: "SafeTech Digital Parenting Toolkit (Full Guide)",
      titleMl: "രക്ഷിതാക്കൾക്കായുള്ള ഡിജിറ്റൽ പേരന്റിംഗ് ഗൈഡ് (മുഴുവൻ പതിപ്പ്)",
      type: "PDF Manual",
      size: "4.8 MB"
    },
    {
      id: 3,
      titleEn: "Senior Citizens OTP & Financial Fraud Prevention Flyer",
      titleMl: "മുതിർന്ന പൗരന്മാർക്കുള്ള സാമ്പത്തിക തട്ടിപ്പ് പ്രതിരോധ ലഘുലേഖ",
      type: "PDF Flyer",
      size: "1.1 MB"
    },
    {
      id: 4,
      titleEn: "Workplace Cyber Security Best Practices Checklist",
      titleMl: "ഓഫീസുകൾക്കായുള്ള സൈബർ സുരക്ഷാ ചെക്ക്‌ലിസ്റ്റ്",
      type: "PDF Checklist",
      size: "850 KB"
    }
  ];

  const videos: VideoStory[] = [
    {
      id: 1,
      titleEn: "How I helped my grandmother recover ₹45,000 lost to a scam in under an hour",
      titleMl: "തട്ടിപ്പിൽ നഷ്ടപ്പെട്ട പണം 1 മണിക്കൂറിനുള്ളിൽ തിരികെ വാങ്ങാൻ മുത്തശ്ശിയെ സഹായിച്ച കഥ",
      speakerEn: "Anjali Menon, Jagratha Ambassador, Ernakulam",
      speakerMl: "അഞ്ജലി മേനോൻ, ജാഗ്രതാ അംബാസഡർ, എറണാകുളം",
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // placeholder URL
    },
    {
      id: 2,
      titleEn: "Setting up institutional clubs: Tips for school coordinators",
      titleMl: "സ്കൂളുകളിൽ സേഫ്ടെക് ക്ലബ് രൂപീകരണം: അറിയേണ്ട കാര്യങ്ങൾ",
      speakerEn: "Dr. Thomas George, Master ToT Trainer",
      speakerMl: "ഡോ. തോമസ് ജോർജ്, മാസ്റ്റർ ട്രെയിനർ",
      thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  const handleDownload = (title: string) => {
    alert(`Demo: Downloading resource "${title}"`);
  };

  return (
    <section id="resources" className="py-20 bg-white dark:bg-[#08080f] border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="h2-scale font-space text-3xl font-bold text-slate-900 tracking-tight">
            {t.resourceTitle}
          </h2>
          <p className="text-sm text-slate-500 font-light mt-2">
            {t.resourceSubtitle}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-5 py-2.5 rounded-xl font-space font-bold text-xs uppercase tracking-wider transition cursor-pointer border ${
              activeTab === 'materials'
                ? 'bg-ictak-blue border-ictak-blue text-white shadow-sm'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
            }`}
          >
            {t.assetsTab}
          </button>
          
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-5 py-2.5 rounded-xl font-space font-bold text-xs uppercase tracking-wider transition cursor-pointer border ${
              activeTab === 'videos'
                ? 'bg-ictak-blue border-ictak-blue text-white shadow-sm'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
            }`}
          >
            {t.storiesTab}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'materials' ? (
          /* Downloadable Materials List */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((res) => (
              <div
                key={res.id}
                className="safetech-card p-6 rounded-2xl flex items-center justify-between border-slate-200/60 bg-white"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="p-3 rounded-xl bg-slate-100 text-ictak-blue text-lg">
                    <FiFileText />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-sm text-slate-800 leading-snug line-clamp-1">
                      {language === 'en' ? res.titleEn : res.titleMl}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold font-mono mt-1 uppercase">
                      {res.type} • {res.size}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(language === 'en' ? res.titleEn : res.titleMl)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-ictak-cyan bg-slate-50 text-slate-700 hover:text-ictak-blue transition cursor-pointer shrink-0"
                  title={t.download}
                >
                  <FiDownload />
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Video Testimonials Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="group safetech-card rounded-2xl overflow-hidden border-slate-200/60 bg-white flex flex-col justify-between"
              >
                {/* Thumbnail player area */}
                <div className="h-56 relative overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img
                    src={vid.thumbnail}
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  
                  {/* Play Button Overlay */}
                  <button
                    onClick={() => onWatchVideo(vid.videoUrl)}
                    className="w-14 h-14 rounded-full bg-ictak-cyan hover:bg-ictak-cyan/90 text-white flex items-center justify-center text-xl shrink-0 cursor-pointer shadow-lg hover:scale-110 transition z-10"
                  >
                    <FiPlay className="ml-1" />
                  </button>
                </div>

                {/* Text Info */}
                <div className="p-6 text-left">
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug line-clamp-2">
                    {language === 'en' ? vid.titleEn : vid.titleMl}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mt-3 font-space">
                    {language === 'en' ? vid.speakerEn : vid.speakerMl}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
