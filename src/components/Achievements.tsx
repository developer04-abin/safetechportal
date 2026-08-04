import { motion } from 'framer-motion';

interface AchievementItem {
  id: number;
  year: string;
  category: 'AWARDS' | 'COLLABORATIONS' | 'IMPACT' | 'MILESTONES';
  title: string;
  description: string;
}

const achievements: AchievementItem[] = [
  {
    id: 1,
    year: "2024",
    category: "COLLABORATIONS",
    title: "Police Cyberdome Pact",
    description: "Formalized joint technical curriculum development and resource-sharing pacts with Kerala Police Cyberdome experts to build robust campaign content."
  },
  {
    id: 2,
    year: "2024",
    category: "MILESTONES",
    title: "Pilot Campaign Launch",
    description: "Successfully conducted pilot digital responsibility workshops in 15 schools across Thiruvananthapuram and Ernakulam, testing interactive quizzes."
  },
  {
    id: 3,
    year: "2025",
    category: "IMPACT",
    title: "Grassroots Club Onboarding",
    description: "Onboarded 120 institutional student clubs, training over 5,000+ student guides and launching local community parenting drives."
  },
  {
    id: 4,
    year: "2025",
    category: "AWARDS",
    title: "Digital Safety Outreach Award",
    description: "Recognized as the best cybersecurity public campaign of the year by the Department of Electronics & IT (E&ITD) for innovative civic triaging."
  },
  {
    id: 5,
    year: "2026",
    category: "MILESTONES",
    title: "Statewide Expansion",
    description: "Scaled resources across all 14 districts in Kerala, targetting 300+ SafeTech clubs, 100k+ citizen pledges, and introducing Bhashini portal translations."
  }
];

export default function Achievements() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="font-space text-xs tracking-wider text-ictak-blue font-bold uppercase">CAMPAIGN PROGRESSION</span>
          <h2 className="h2-scale font-space text-3xl font-bold text-slate-900 mt-2">
            SafeTech Key <span className="gradient-text-safetech">Milestones</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mt-2 font-light leading-relaxed">
            A retrospect of our technical partnerships, regional citizen outreach metrics, and public safety honors.
          </p>
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative border-l border-slate-200 md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-[1px] md:before:bg-slate-200 max-w-5xl mx-auto flex flex-col gap-12 md:gap-16">
          
          {achievements.map((ach, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative w-full md:w-1/2 flex flex-col items-start px-8 md:px-12 ${
                  isLeft ? 'md:self-start md:items-end md:text-right' : 'md:self-end'
                }`}
              >
                {/* Node Dot Tracker */}
                <div 
                  className={`absolute top-[6px] left-[-6px] md:left-auto md:top-[12px] w-3 h-3 rounded-full bg-ictak-cyan border-2 border-white shadow-sm ${
                    isLeft ? 'md:right-[-6px]' : 'md:left-[-6px]'
                  }`} 
                />

                {/* Tag Period */}
                <div className="flex items-center gap-2 mb-2 font-space text-[10px] uppercase font-bold tracking-widest text-ictak-cyan">
                  <span>{ach.year}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                  <span className="text-slate-400">{ach.category}</span>
                </div>

                {/* Card Container */}
                <div className="w-full safetech-card p-6 md:p-8 rounded-3xl border border-slate-200/60 bg-white group hover:border-ictak-cyan transition-all duration-300 text-left">
                  <h3 className="h3-scale font-space text-base md:text-lg font-bold text-slate-900 group-hover:text-ictak-blue transition-colors duration-300">
                    {ach.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-light mt-3 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
