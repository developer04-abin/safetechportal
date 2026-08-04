import { useState, useRef, type MouseEvent } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCalendarOutline, IoLocationOutline, IoClose } from 'react-icons/io5';

// Swiper CSS imports
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export interface CampaignDetail {
  id: number;
  title: string;
  category: string;
  date: string;
  venue: string;
  description: string;
  image: string;
  seats: string;
  organizer: string;
  speakers: string[];
}

const featuredCampaigns: CampaignDetail[] = [
  {
    id: 1,
    title: "Digital Jagratha Ambassador Program",
    category: "STUDENTS & YOUTH",
    date: "Ongoing Enrollment",
    venue: "KSITM LMS Online Sub-portal",
    description: "A 15-credit cybersecurity training initiative designed for college students in Kerala. Learn to identify online phishing, manage security settings, report online harassment, and become a certified digital responsibility ambassador for your campus.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    seats: "Open to All Students",
    organizer: "ICT Academy of Kerala",
    speakers: ["Dr. Evelyn Harris (Cybersecurity Lead)", "Dr. Saji Gopinath (Educationist)"]
  },
  {
    id: 2,
    title: "Digital Parenting & Wellness Drive",
    category: "PARENTS & ADULTS",
    date: "Every Saturday",
    venue: "Community Halls & LSGD Panchayats",
    description: "Empowering parents with Digital Parenting Toolkits. Learn to configure device parental controls, manage children's screen time, identify signs of internet addiction, and practice healthy digital habits as a family.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
    seats: "40 Seats per batch",
    organizer: "Department of Electronics & IT",
    speakers: ["Prof. Alan Mercer (Family Counselor)", "Sarah Jenkins (Digital Wellness Advocate)"]
  },
  {
    id: 3,
    title: "Senior Citizens Anti-Fraud Shield",
    category: "ELDERLY COHORT",
    date: "Daily Workshops",
    venue: "Local Panchayats & Resident Associations",
    description: "A customized anti-scam drive for elderly citizens. Focuses on preventing OTP phishing, bank impersonation calls, pension portal frauds, and unauthorized application downloads. Features simplified guides and extra-large print resources.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    seats: "Local Registrations",
    organizer: "Kerala Police Cyberdome",
    speakers: ["Kev The Hacker (Security Auditor)", "Rita Vance (Cyber Crime Analyst)"]
  },
 
];

// Interactive Card Component with Custom 3D Tilt Effect
function CampaignCard({ campaign, onClick }: { campaign: CampaignDetail; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    
    // Normalize to tilt amount (max 12 degrees)
    const factor = 8;
    setTilt({
      x: -(y / (height / 2)) * factor,
      y: (x / (width / 2)) * factor
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
      className="w-full max-w-sm md:max-w-md mx-auto aspect-[3/4.5] rounded-3xl overflow-hidden safetech-card bg-white border border-slate-200/60 group cursor-pointer relative shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Glow highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-ictak-blue/5 to-ictak-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Campaign Image */}
      <div className="w-full h-1/2 overflow-hidden relative border-b border-slate-100">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category tag */}
        <span className="absolute top-4 left-4 bg-ictak-blue px-3 py-1.5 rounded-full font-space text-[10px] uppercase font-bold tracking-wider text-white shadow-md">
          {campaign.category}
        </span>
      </div>

      {/* Campaign Details */}
      <div className="p-6 md:p-8 flex flex-col justify-between h-1/2 text-left">
        <div className="flex flex-col gap-2">
          <h3 className="h3-scale font-space text-lg md:text-xl font-bold text-slate-900 group-hover:text-ictak-cyan transition-colors duration-300 line-clamp-2">
            {campaign.title}
          </h3>
          
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
            <IoCalendarOutline className="text-ictak-cyan shrink-0" />
            <span className="font-space">{campaign.date}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <IoLocationOutline className="text-ictak-blue shrink-0" />
            <span className="font-sans line-clamp-1">{campaign.venue}</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 line-clamp-3 mt-3 leading-relaxed font-light">
            {campaign.description}
          </p>
        </div>

        <button className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-ictak-cyan bg-slate-50 hover:bg-ictak-cyan/10 font-space text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-ictak-blue transition-all duration-300 mt-4 cursor-pointer">
          View Program Details
        </button>
      </div>
    </div>
  );
}

export default function FeaturedEvents() {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignDetail | null>(null);

  return (
    <section id="campaigns" className="py-20 relative bg-white dark:bg-[#08080f] border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-space text-xs tracking-wider text-ictak-blue uppercase font-bold">CURATED INITIATIVES</span>
            <h2 className="h2-scale font-space text-3xl font-bold text-slate-900 mt-2">
              Featured <span className="gradient-text-safetech">Campaigns</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm font-light leading-relaxed">
            Discover our flagship programs designed in partnership with KSITM and Kerala Police Cyberdome to secure every citizen's digital lifestyle.
          </p>
        </div>

        {/* Swiper Slider Wrapper */}
        <div className="py-4">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            coverflowEffect={{
              rotate: 8,
              stretch: 0,
              depth: 60,
              modifier: 1.2,
              slideShadows: false,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 }
            }}
            className="featured-swiper !pb-12"
          >
            {featuredCampaigns.map((campaign) => (
              <SwiperSlide key={campaign.id} className="!w-full max-w-sm md:max-w-md">
                <CampaignCard campaign={campaign} onClick={() => setSelectedCampaign(campaign)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {selectedCampaign && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCampaign(null)}
              className="absolute inset-0"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCampaign(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/85 text-slate-800 flex items-center justify-center hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer shadow-sm"
              >
                <IoClose className="text-xl" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Column 1: Image & Basic details */}
                <div className="h-64 md:h-full relative min-h-[300px]">
                  <img
                    src={selectedCampaign.image}
                    alt={selectedCampaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/95" />
                  
                  <div className="absolute bottom-6 left-6 z-10 text-left">
                    <span className="bg-ictak-cyan px-3 py-1 rounded-full font-space text-[9px] uppercase font-bold tracking-wider text-white">
                      {selectedCampaign.category}
                    </span>
                    <h3 className="font-space text-2xl font-bold text-white mt-2 leading-tight drop-shadow-md">
                      {selectedCampaign.title}
                    </h3>
                  </div>
                </div>

                {/* Column 2: Full description & schedule */}
                <div className="p-8 flex flex-col justify-between gap-6 bg-white text-left">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="font-space text-[10px] text-ictak-blue tracking-widest uppercase font-bold">PROGRAM DESCRIPTION</span>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                        {selectedCampaign.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-4 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-space uppercase">Date & Frequency</span>
                        <p className="text-slate-800 mt-1 font-semibold">{selectedCampaign.date}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-space uppercase">Host Center</span>
                        <p className="text-slate-800 mt-1 font-semibold">{selectedCampaign.venue}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-space uppercase">Availability</span>
                        <p className="text-ictak-cyan mt-1 font-bold">{selectedCampaign.seats}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-space uppercase">Joint Initiative</span>
                        <p className="text-slate-800 mt-1 font-semibold">{selectedCampaign.organizer}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] text-ictak-cyan tracking-widest font-space uppercase font-bold">GUEST SPEAKERS & PANELISTS</span>
                      <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                        {selectedCampaign.speakers.map((spk, idx) => (
                          <li key={idx} className="font-light">{spk}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCampaign(null);
                      // Scroll to onboarding or contact
                      const targetEl = selectedCampaign.id === 4 ? '#clubs' : '#contact';
                      document.querySelector(targetEl)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3.5 bg-ictak-blue text-white font-space font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-ictak-blue/90 shadow-sm transition"
                  >
                    Proceed To Registration
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
