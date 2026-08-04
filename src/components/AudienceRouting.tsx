import { motion } from 'framer-motion';
import { translations } from '../utils/translations';
import { FiBook, FiUserCheck, FiHeart } from 'react-icons/fi';

interface AudienceRoutingProps {
  language: 'en' | 'ml';
  onNavigateToQuiz: () => void;
}

export default function AudienceRouting({ language, onNavigateToQuiz }: AudienceRoutingProps) {
  const t = translations[language];

  const pathways = [
    {
      id: "students",
      title: t.studentTitle,
      description: t.studentDesc,
      action: t.studentAction,
      icon: FiBook,
      color: "bg-gradient-to-br from-ictak-blue/5 to-ictak-blue/10 border-ictak-blue/15 hover:border-ictak-blue",
      btnColor: "bg-ictak-blue text-white hover:bg-ictak-blue/90",
      badge: language === 'en' ? "15 Credits Program" : "15 ക്രെഡിറ്റ് പ്രോഗ്രാം",
      onClick: () => {
        // Scroll to Quiz section as a demo hook
        onNavigateToQuiz();
      }
    },
    {
      id: "parents",
      title: t.parentTitle,
      description: t.parentDesc,
      action: t.parentAction,
      icon: FiUserCheck,
      color: "bg-gradient-to-br from-ictak-cyan/5 to-ictak-cyan/10 border-ictak-cyan/15 hover:border-ictak-cyan",
      btnColor: "bg-ictak-cyan text-white hover:bg-ictak-cyan/90",
      badge: language === 'en' ? "Parenting Toolkits" : "രക്ഷിതാക്കൾക്കുള്ള ഗൈഡ്",
      onClick: () => {
        // Scroll to resource hub
        document.querySelector('#resources')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: "seniors",
      title: t.seniorTitle,
      description: t.seniorDesc,
      action: t.seniorAction,
      icon: FiHeart,
      color: "bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200 hover:border-orange-500",
      btnColor: "bg-orange-500 text-white hover:bg-orange-600",
      badge: language === 'en' ? "High Legibility Mode" : "ലളിതമായ രൂപം",
      // Extra size for senior accessibility
      customStyle: "text-size-large font-bold",
      onClick: () => {
        // Open videos modal or scroll to micro videos
        document.querySelector('#resources')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  return (
    <section id="audience-routing" className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="h2-scale font-space text-3xl font-bold text-slate-900 tracking-tight">
            {t.routingTitle}
          </h2>
          <p className="text-sm text-slate-500 font-light mt-2 max-w-xl mx-auto">
            {t.routingSubtitle}
          </p>
        </div>

        {/* Pathways Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pathways.map((path) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.id}
                whileHover={{ scale: 1.02 }}
                className={`p-8 rounded-3xl border flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 ${path.color} ${path.customStyle || ''}`}
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-3 py-1 rounded-full bg-white text-[10px] sm:text-xs font-space font-bold border border-slate-200 text-slate-700 shadow-sm">
                      {path.badge}
                    </span>
                    <Icon className="text-2xl text-slate-700" />
                  </div>
                  
                  {/* Title and details with custom class scaling */}
                  <h3 className="h3-scale text-xl lg:text-2xl font-bold font-space text-slate-950 mb-4 leading-tight">
                    {path.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-slate-600 font-light leading-relaxed mb-8">
                    {path.description}
                  </p>
                </div>

                <button
                  onClick={path.onClick}
                  className={`w-full py-3.5 rounded-xl font-space font-bold uppercase tracking-wider text-xs sm:text-sm transition cursor-pointer shadow-sm ${path.btnColor}`}
                >
                  {path.action}
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
