import MarqueeComponent from 'react-fast-marquee';
import { FiShield, FiBriefcase, FiAward, FiCompass } from 'react-icons/fi';

const Marquee = (MarqueeComponent as any).default || MarqueeComponent;

const partnersData = [
  { id: 1, name: "ICT Academy of Kerala", icon: FiShield, color: "hover:text-[#004d80]" },
  { id: 2, name: "Kerala State IT Mission", icon: FiCompass, color: "hover:text-[#00b4d8]" },
  { id: 3, name: "Kerala Police Cyberdome", icon: FiShield, color: "hover:text-[#ef4444]" },
  { id: 4, name: "Department of IT (E&ITD)", icon: FiBriefcase, color: "hover:text-[#0f172a]" },
  { id: 5, name: "KITE Education Dept", icon: FiAward, color: "hover:text-[#0284c7]" },
  { id: 6, name: "Local Self Government (LSGD)", icon: FiCompass, color: "hover:text-[#16a34a]" },
  { id: 7, name: "Kerala Startup Mission", icon: FiAward, color: "hover:text-[#ea580c]" },
  { id: 8, name: "Digital University Kerala", icon: FiShield, color: "hover:text-[#4f46e5]" }
];

export default function Partners() {
  return (
    <section className="py-16 relative bg-[#f8fafc] dark:bg-[#020204]/40 select-none overflow-hidden border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="font-space text-xs tracking-wider text-slate-400 font-bold uppercase">CAMPAIGN ECOSYSTEM</span>
        <h4 className="font-space text-xs text-slate-500 font-bold mt-2 uppercase">
          Supported by Government Agencies & Academic Alliances
        </h4>
      </div>

      {/* Infinite Logo Ribbon */}
      <div className="w-full relative">
        <Marquee speed={35} pauseOnHover={true} gradient={false}>
          <div className="flex gap-20 items-center justify-around w-full pr-20 py-2">
            {partnersData.map((part) => {
              const Icon = part.icon;
              return (
                <div 
                  key={part.id} 
                  className={`flex items-center gap-3 text-slate-400 hover:text-slate-800 transition-all duration-300 cursor-pointer ${part.color} group`}
                >
                  <Icon className="text-2xl transition-all duration-300 group-hover:scale-105" />
                  <span className="font-space text-xs md:text-sm font-bold tracking-wider uppercase text-slate-500 group-hover:text-slate-800 transition-colors">
                    {part.name}
                  </span>
                </div>
              );
            })}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
