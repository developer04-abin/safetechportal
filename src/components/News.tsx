import { motion } from 'framer-motion';
import { BsArrowUpRight, BsBroadcast } from 'react-icons/bs';

interface NewsProps {
  language: 'en' | 'ml';
}

interface NewsCardItem {
  id: number;
  image: string;
  headlineEn: string;
  headlineMl: string;
  descriptionEn: string;
  descriptionMl: string;
  dateEn: string;
  dateMl: string;
  categoryEn: string;
  categoryMl: string;
}

const newsData: NewsCardItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    headlineEn: "District-Level Cyber Safety Workshops Scheduled across 14 Districts",
    headlineMl: "14 ജില്ലകളിലും ജില്ലാതല സൈബർ സുരക്ഷാ വർക്ക്ഷോപ്പുകൾ പ്രഖ്യാപിച്ചു",
    descriptionEn: "KSITM is organizing offline cyber hygiene training programs for local self-government leaders and school coordinators starting next week.",
    descriptionMl: "തദ്ദേശസ്വയംഭരണ പ്രതിനിധികൾക്കും സ്കൂൾ കോർഡിനേറ്റർമാർക്കുമായി അടുത്ത ആഴ്ച മുതൽ ഓഫ്‌ലൈൻ സൈബർ ശുചിത്വ പരിശീലന പരിപാടികൾ കെഎസ്‌ഐടിഎം സംഘടിപ്പിക്കുന്നു.",
    dateEn: "August 12, 2026",
    dateMl: "2026 ഓഗസ്റ്റ് 12",
    categoryEn: "Workshops",
    categoryMl: "വർക്ക്ഷോപ്പ്"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    headlineEn: "Master Training of Trainers (ToT) Cohort 4 Registration Begins",
    headlineMl: "മാസ്റ്റർ ട്രെയിനർ (ToT) ബാച്ച് 4 രജിസ്ട്രേഷൻ ആരംഭിച്ചു",
    descriptionEn: "Are you a cybersecurity professional? Join as a Master Trainer to onboard SafeTech clubs. Technical curriculum sessions start in mid-August.",
    descriptionMl: "നിങ്ങൾ ഒരു സൈബർ സുരക്ഷാ വിദഗ്ദ്ധനാണോ? സേഫ്ടെക് ക്ലബ്ബുകളെ നയിക്കാൻ മാസ്റ്റർ ട്രെയിനറായി ചേരൂ. സാങ്കേതിക സെഷനുകൾ ഓഗസ്റ്റ് പകുതിയോടെ ആരംഭിക്കും.",
    dateEn: "August 08, 2026",
    dateMl: "2026 ഓഗസ്റ്റ് 08",
    categoryEn: "ToT Programs",
    categoryMl: "പരിശീലനം"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    headlineEn: "SafeTech Kerala Surpasses 100k Committed Citizens Milestone",
    headlineMl: "സേഫ്ടെക് കേരള പത്തുലക്ഷം പ്രതിജ്ഞകൾ എന്ന നാഴികക്കല്ലിലേക്ക്",
    descriptionEn: "Our digital safety pledge campaign has crossed the milestone with active engagement from LSGD panchayats and colleges.",
    descriptionMl: "കോളേജുകളുടെയും തദ്ദേശ സ്വയംഭരണ സ്ഥാപനങ്ങളുടെയും സഹകരണത്തോടെ ഡിജിറ്റൽ സുരക്ഷാ പ്രതിജ്ഞാ കാമ്പയിൻ വൻ വിജയമായി മുന്നേറുന്നു.",
    dateEn: "August 02, 2026",
    dateMl: "2026 ഓഗസ്റ്റ് 02",
    categoryEn: "Milestones",
    categoryMl: "നേട്ടങ്ങൾ"
  }
];

export default function News({ language }: NewsProps) {

  return (
    <section id="news" className="py-20 lg:py-24 relative bg-slate-50 dark:bg-[#06060c] border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <span className="font-space text-xs tracking-widest text-ictak-blue dark:text-ictak-cyan uppercase flex items-center gap-2 font-bold mb-2">
              <BsBroadcast className="animate-pulse text-emergency-red" />
              {language === 'en' ? 'Announcements & Feed' : 'പ്രഖ്യാപനങ്ങളും അറിയിപ്പുകളും'}
            </span>
            <h2 className="h2-scale font-space text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-1">
              {language === 'en' ? 'News, Events & Workshops' : 'വാർത്തകളും വർക്ക്ഷോപ്പുകളും'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm font-light leading-relaxed">
            {language === 'en'
              ? 'Stay up to date with upcoming district level events, Master ToT sessions, and KSITM campaign updates.'
              : 'ജില്ലാതല വർക്ക്ഷോപ്പുകൾ, മാസ്റ്റർ ട്രെയിനർ ഷെഡ്യൂളുകൾ, കെഎസ്‌ഐടിഎം അറിയിപ്പുകൾ എന്നിവ അറിയാം.'}
          </p>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news, index) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col justify-between rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image Header */}
              <div className="h-48 md:h-52 w-full overflow-hidden relative border-b border-slate-100 dark:border-slate-800">
                <img 
                  src={news.image} 
                  alt={language === 'en' ? news.headlineEn : news.headlineMl} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[10px] font-space font-bold uppercase tracking-wider bg-gradient-to-r from-ictak-blue to-cyan-700 text-white rounded-full shadow-md">
                    {language === 'en' ? news.categoryEn : news.categoryMl}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-3 flex-grow text-left">
                <span className="text-[10px] font-space text-slate-400 dark:text-slate-500 font-semibold uppercase">
                  {language === 'en' ? news.dateEn : news.dateMl}
                </span>

                <h3 className="h3-scale text-base font-bold text-slate-900 dark:text-white group-hover:text-ictak-cyan transition-colors duration-300 leading-snug line-clamp-2">
                  {language === 'en' ? news.headlineEn : news.headlineMl}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 font-light leading-relaxed line-clamp-3">
                  {language === 'en' ? news.descriptionEn : news.descriptionMl}
                </p>
              </div>

              {/* Read More Footer */}
              <div className="p-6 pt-0">
                <button className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 group-hover:border-ictak-cyan bg-slate-50 dark:bg-slate-800 group-hover:bg-ictak-cyan/10 font-space text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 group-hover:text-ictak-blue dark:group-hover:text-ictak-cyan flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer">
                  <span>{language === 'en' ? 'View Details' : 'വിവരങ്ങൾ കാണുക'}</span>
                  <BsArrowUpRight className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
