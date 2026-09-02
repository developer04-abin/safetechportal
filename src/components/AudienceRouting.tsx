import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { translations } from '../utils/translations';
import { FiBook, FiUserCheck, FiHeart } from 'react-icons/fi';

interface AudienceRoutingProps {
  language: 'en' | 'ml';
  onNavigateToQuiz?: () => void;
}

export default function AudienceRouting({ language, onNavigateToQuiz }: AudienceRoutingProps) {
  const t = translations[language];
  const navigate = useNavigate();

  const pathways = [
    {
      id: 'students',
      title: t.studentTitle,
      description: t.studentDesc,
      action: t.studentAction,
      icon: FiBook,
      color: 'bg-gradient-to-br from-ictak-blue/5 to-ictak-blue/10 dark:from-ictak-blue/15 dark:to-slate-900 border-ictak-blue/15 dark:border-ictak-blue/30 hover:border-ictak-blue shadow-md',
      btnColor: 'bg-gradient-to-r from-ictak-blue to-cyan-700 text-white hover:opacity-95',
      badge: language === 'en' ? '15 Credits Program' : '15 ക്രെഡിറ്റ് പ്രോഗ്രാം',
      onClick: () => {
        if (onNavigateToQuiz) {
          onNavigateToQuiz();
        } else {
          navigate('/resources');
        }
      },
    },
    {
      id: 'parents',
      title: t.parentTitle,
      description: t.parentDesc,
      action: t.parentAction,
      icon: FiUserCheck,
      color: 'bg-gradient-to-br from-ictak-cyan/5 to-ictak-cyan/10 dark:from-ictak-cyan/15 dark:to-slate-900 border-ictak-cyan/15 dark:border-ictak-cyan/30 hover:border-ictak-cyan shadow-md',
      btnColor: 'bg-gradient-to-r from-ictak-cyan to-blue-600 text-white hover:opacity-95',
      badge: language === 'en' ? 'Parenting Toolkits' : 'രക്ഷിതാക്കൾക്കുള്ള ഗൈഡ്',
      onClick: () => {
        navigate('/resources');
      },
    },
    {
      id: 'seniors',
      title: t.seniorTitle,
      description: t.seniorDesc,
      action: t.seniorAction,
      icon: FiHeart,
      color: 'bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-slate-900 border-orange-200 dark:border-orange-800/40 hover:border-orange-500 shadow-md',
      btnColor: 'bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:opacity-95',
      badge: language === 'en' ? 'High Legibility Mode' : 'ലളിതമായ രൂപം',
      customStyle: 'text-size-large font-bold',
      onClick: () => {
        navigate('/resources');
      },
    },
  ];

  return (
    <section id="audience-routing" className="py-20 lg:py-24 bg-slate-50 dark:bg-[#06060c] border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="h2-scale font-space text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t.routingTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light mt-2 max-w-xl mx-auto">
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
                className={`p-8 rounded-3xl border flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 ${path.color} ${
                  path.customStyle || ''
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-[10px] sm:text-xs font-space font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm">
                      {path.badge}
                    </span>
                    <Icon className="text-2xl text-slate-700 dark:text-slate-300" />
                  </div>

                  {/* Title and details with custom class scaling */}
                  <h3 className="h3-scale text-xl lg:text-2xl font-bold font-space text-slate-950 dark:text-white mb-4 leading-tight">
                    {path.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-8">
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
