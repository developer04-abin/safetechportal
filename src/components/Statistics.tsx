import { useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import { FiUsers, FiAward, FiMapPin, FiGrid } from 'react-icons/fi';

interface StatisticsProps {
  language: 'en' | 'ml';
  pledgeCountDelta: number;
}

export default function Statistics({ language, pledgeCountDelta }: StatisticsProps) {
  const t = translations[language];

  // Base dummy counts
  const [citizens, setCitizens] = useState(124310);
  const [pledges, setPledges] = useState(104232);
  const [clubs, setClubs] = useState(342);
  const [warriors, setWarriors] = useState(1845);

  useEffect(() => {
    // Add delta when citizen takes pledge
    setPledges(104232 + pledgeCountDelta);
    setCitizens(124310 + pledgeCountDelta);
  }, [pledgeCountDelta]);

  // Slowly increment numbers to simulate live telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setCitizens(prev => prev + Math.floor(Math.random() * 3) + 1);
      setPledges(prev => prev + Math.floor(Math.random() * 2) + 1);
      if (Math.random() > 0.95) setClubs(prev => prev + 1);
      if (Math.random() > 0.8) setWarriors(prev => prev + 1);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const statsData = [
    {
      id: "citizens",
      label: t.citizensEmpowered,
      value: citizens.toLocaleString(),
      target: "Target: 100K+",
      icon: FiUsers,
      color: "border-l-4 border-l-ictak-blue",
    },
    {
      id: "pledges",
      label: t.pledgesTaken,
      value: pledges.toLocaleString(),
      target: "Live Counter",
      icon: FiAward,
      color: "border-l-4 border-l-ictak-cyan",
    },
    {
      id: "clubs",
      label: t.activeClubs,
      value: clubs.toLocaleString(),
      target: "Target: 300+",
      icon: FiMapPin,
      color: "border-l-4 border-l-green-500",
    },
    {
      id: "warriors",
      label: t.warriorsCertified,
      value: warriors.toLocaleString(),
      target: "Target: 1,000+",
      icon: FiGrid,
      color: "border-l-4 border-l-orange-500",
    },
  ];

  return (
    <section id="statistics" className="py-16 bg-slate-50 dark:bg-slate-900 border-y border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="h2-scale font-space text-3xl font-bold text-slate-900 tracking-tight">
            {t.impactTitle}
          </h2>
          <p className="text-sm text-slate-500 font-light mt-2 max-w-xl mx-auto">
            {t.impactSubtitle}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`safetech-card p-6 rounded-2xl flex flex-col justify-between ${stat.color}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-space tracking-wider text-slate-400 font-semibold uppercase">
                      {stat.target}
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-space mt-1">
                      {stat.value}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-100 text-ictak-blue">
                    <Icon className="text-lg" />
                  </div>
                </div>
                <h3 className="h3-scale text-xs font-semibold text-slate-700 mt-4 leading-snug">
                  {stat.label}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
