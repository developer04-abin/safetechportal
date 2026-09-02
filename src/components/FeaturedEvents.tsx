import { useState, useRef, type MouseEvent } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCalendarOutline, IoLocationOutline, IoClose, IoChevronBack, IoChevronForward, IoStar, IoChatboxEllipsesOutline } from 'react-icons/io5';
import { FiAward, FiArrowRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import msmeImage from '../assets/msme_cyber_resilience.jpg';

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
  badge?: string;
  rating: number;
  reviewCount: string;
  comment: string;
  commentAuthor: string;
}

const featuredCampaigns: CampaignDetail[] = [
  {
    id: 1,
    title: "Digital Jagratha Ambassador Program",
    category: "STUDENTS & YOUTH",
    date: "Ongoing Enrollment",
    venue: "KSITM LMS Online Sub-portal & Campuses",
    description: "A 15-credit cybersecurity training initiative designed for higher education students across Kerala. Learn to identify phishing, configure device privacy, prevent cyber harassment, and lead peer awareness clubs on your campus.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    seats: "Open to All College Students",
    organizer: "ICT Academy of Kerala & KSITM",
    speakers: ["Dr. Evelyn Harris (Cybersecurity Lead)", "Dr. Saji Gopinath (Educationist)"],
    badge: "15 Academic Credits",
    rating: 4.9,
    reviewCount: "340+ reviews",
    comment: "Certified 1,400+ students on our campus. The live phishing simulation labs were eye-opening!",
    commentAuthor: "Rahul M., Campus Ambassador, CET"
  },
  {
    id: 2,
    title: "Digital Parenting & Wellness Drive",
    category: "PARENTS & FAMILIES",
    date: "Every Saturday (10:00 AM)",
    venue: "Community Centers & Local Panchayats",
    description: "Empowering parents with actionable digital wellbeing toolkits. Learn to configure family router parental controls, recognize signs of gaming addiction, prevent cyberbullying, and foster healthy screen time habits at home.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
    seats: "40 Seats Per Batch",
    organizer: "Department of Electronics & IT",
    speakers: ["Prof. Alan Mercer (Family Counselor)", "Sarah Jenkins (Digital Wellness Advocate)"],
    badge: "Free Family Toolkit",
    rating: 4.8,
    reviewCount: "210+ reviews",
    comment: "Setting router rules and device limits became so simple after this workshop. Highly recommend!",
    commentAuthor: "Anitha V., Parent Coordinator, Ernakulam"
  },
  {
    id: 3,
    title: "Senior Citizens Anti-Fraud Shield",
    category: "SENIOR CITIZENS",
    date: "Weekly Neighborhood Clinics",
    venue: "Resident Welfare Associations & LSGD Halls",
    description: "A customized anti-scam initiative for elders. Demystifies UPI payment fraud, fake electricity bill SMS, digital arrest threats, and pension KYC scams with simplified large-print guides and live helpline demonstrations.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    seats: "Walk-in & Pre-registration",
    organizer: "Kerala Police Cyberdome",
    speakers: ["Sri. Ramesh Kumar (DSP Cyber Operations)", "Rita Vance (Financial Fraud Investigator)"],
    badge: "1930 Golden Hour Training",
    rating: 5.0,
    reviewCount: "520+ reviews",
    comment: "They explained OTP and electricity bill scams with large guides. I feel much safer using UPI now.",
    commentAuthor: "K. Sreedharan Nair (71 yrs), Kozhikode"
  },
  {
    id: 4,
    title: "Statewide Campus Cyber Hackathon & CTF",
    category: "TECH & ENGINEERING",
    date: "Annual State Championship",
    venue: "Technopark / Infopark Cyber Arena",
    description: "Kerala's premier civic ethical hacking and Capture The Flag (CTF) tournament. Student engineers compete to detect web vulnerabilities, build defensive digital forensics tools, and win cash prizes with PMU internships.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    seats: "100 Teams Selected",
    organizer: "Kerala Police Cyberdome & ICTAK",
    speakers: ["Anand Mohan (Red Team Specialist)", "Divya Nambiar (Threat Intel Lead)"],
    badge: "₹2.5 Lakh Prize Pool",
    rating: 4.9,
    reviewCount: "180+ teams",
    comment: "Toughest CTF challenges with real-world vulnerability scenarios. The PMU internship offer was huge!",
    commentAuthor: "Arjun Krishna, Team Lead, NITC"
  },
  {
    id: 5,
    title: "Women Digital Safety & Redressal Bootcamp",
    category: "WOMEN & PROFESSIONALS",
    date: "Bi-Weekly Virtual Series",
    venue: "SafeTech Interactive Portal",
    description: "Specialized workshops focused on combating non-consensual image sharing, deepfake harassment, impersonation accounts, and blackmail. Practical sessions on IT Act Sec 66E/67 protections and immediate portal filing.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    seats: "Unlimited Virtual Attendance",
    organizer: "Kerala State Women's Commission & KSITM",
    speakers: ["Adv. Lakshmi Pillai (Cyber Law Specialist)", "Dr. Ananya Roy (Psychologist)"],
    badge: "Confidential Redressal",
    rating: 4.9,
    reviewCount: "430+ reviews",
    comment: "Learned legal remedies under Sec 66E and confidential grievance escalation. Empowering session!",
    commentAuthor: "Adv. Meera S., Kochi"
  },
  {
    id: 6,
    title: "MSME & Merchant Cyber Resilience Workshop",
    category: "TRADERS & SMALL BUSINESS",
    date: "Monthly District Roundtables",
    venue: "District Industrial Centers (DIC)",
    description: "Safeguarding local retail businesses and online traders against QR code swapping, POS skimming, GST invoice phishing, and ransomware extortion. Free basic security audit checklists provided for every merchant.",
    image: msmeImage,
    seats: "50 Businesses Per District",
    organizer: "Kerala State IT Mission & Industry Bodies",
    speakers: ["Rajesh Varma (FinTech Auditor)", "K. P. Soman (Banking Security Officer)"],
    badge: "MSME Compliance Certificate",
    rating: 4.8,
    reviewCount: "195+ merchants",
    comment: "Stopped two QR-swap scam attempts in our market after applying their merchant audit checklist.",
    commentAuthor: "Muhammed Shafi, Retailers Association"
  },
  {
    id: 7,
    title: "School Master Trainers (ToT) Summit",
    category: "TEACHERS & EDUCATORS",
    date: "Quarterly State Training",
    venue: "State Institute of Educational Technology",
    description: "Training over 1,500 school teachers as certified SafeTech Mentors. Equip classroom guides with interactive cyber safety lesson plans, quiz modules, and crisis escalation protocols for student digital wellbeing.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    seats: "Nominated School Coordinators",
    organizer: "KITE & ICT Academy of Kerala",
    speakers: ["Prof. C. Radhakrishnan (Curriculum Expert)", "Sunil George (EdTech Director)"],
    badge: "Govt Certified Trainer",
    rating: 4.9,
    reviewCount: "650+ educators",
    comment: "The gamified quizzes and class activities made it effortless to train our 8th & 9th graders.",
    commentAuthor: "Sujatha K., Teacher Coordinator, Thrissur"
  },
  {
    id: 8,
    title: "AI Deepfake & Misinformation Verification Clinic",
    category: "CITIZEN JOURNALISM",
    date: "Weekly Live Online Labs",
    venue: "Kerala Fact-Check Sub-Desk",
    description: "Learn hands-on techniques to identify AI voice clones, manipulated video deepfakes, forwarded WhatsApp disinformation, and coordinated social media bots using open-source verification tools.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    seats: "Open Public Registration",
    organizer: "Kerala Media Academy & Cyberdome",
    speakers: ["Prasanth Nair (Media Forensics Analyst)", "Maya Joseph (Investigative Journalist)"],
    badge: "Fact-Check Toolkit",
    rating: 4.9,
    reviewCount: "280+ attendees",
    comment: "Testing reverse video lookups and audio forensic tools live was mind-blowing. Essential training!",
    commentAuthor: "Gokul Das, Digital Media Journalist"
  }
];

// Interactive Card Component with Expanded Size & Participant Comment Box
function CampaignCard({ campaign, onClick }: { campaign: CampaignDetail; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    
    const factor = 6;
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
      className="w-full max-w-[390px] sm:max-w-[420px] mx-auto min-h-[470px] sm:min-h-[490px] rounded-3xl overflow-hidden safetech-card bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 group cursor-pointer relative shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Glow highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-ictak-blue/10 to-ictak-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

      {/* Campaign Image Section */}
      <div className="w-full h-48 sm:h-52 overflow-hidden relative border-b border-slate-100 dark:border-slate-800 shrink-0">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category tag */}
        <span className="absolute top-3.5 left-3.5 bg-gradient-to-r from-ictak-blue to-cyan-700 px-3 py-1 rounded-full font-space text-[9.5px] uppercase font-bold tracking-wider text-white shadow-md z-10">
          {campaign.category}
        </span>

        {/* Rating & Review badge */}
        <div className="absolute top-3.5 right-3.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 text-white font-space text-[10px] font-bold border border-white/20 z-10">
          <IoStar className="text-yellow-400 text-xs" />
          <span>{campaign.rating.toFixed(1)}</span>
          <span className="text-[8.5px] text-slate-300 font-normal">({campaign.reviewCount})</span>
        </div>

        {/* Key Badge */}
        {campaign.badge && (
          <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full font-space text-[9.5px] font-bold text-ictak-cyan border border-ictak-cyan/40 z-10 shadow-sm">
            {campaign.badge}
          </span>
        )}
      </div>

      {/* Campaign Details Body */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow text-left gap-3.5">
        <div className="flex flex-col gap-2">
          <h3 className="h3-scale font-space text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-ictak-cyan transition-colors duration-300 line-clamp-2 leading-snug">
            {campaign.title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-space">
            <div className="flex items-center gap-1.5">
              <IoCalendarOutline className="text-ictak-cyan shrink-0" />
              <span>{campaign.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IoLocationOutline className="text-ictak-blue dark:text-ictak-cyan shrink-0" />
              <span className="line-clamp-1">{campaign.venue}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-350 line-clamp-2 leading-relaxed font-light mt-0.5">
            {campaign.description}
          </p>
        </div>

        {/* Community Feedback Comment Box */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 relative flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[10px] font-space font-bold uppercase tracking-wider text-ictak-blue dark:text-ictak-cyan">
            <span className="flex items-center gap-1">
              <IoChatboxEllipsesOutline className="text-xs" />
              <span>Participant Voice</span>
            </span>
            <FaQuoteLeft className="text-[9px] text-slate-300 dark:text-slate-600" />
          </div>
          <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 font-light italic leading-snug line-clamp-2">
            "{campaign.comment}"
          </p>
          <span className="text-[9.5px] font-space font-semibold text-slate-400 dark:text-slate-400 truncate">
            — {campaign.commentAuthor}
          </span>
        </div>

        {/* Action Button */}
        <button className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 group-hover:border-ictak-cyan bg-white dark:bg-slate-800 group-hover:bg-ictak-cyan/10 font-space text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 group-hover:text-ictak-blue dark:group-hover:text-ictak-cyan transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs">
          <span>View Program Details</span>
          <FiArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default function FeaturedEvents() {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignDetail | null>(null);
  const swiperRef = useRef<any>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section id="campaigns" className="py-20 lg:py-24 relative bg-white dark:bg-[#06060c] border-b border-slate-200/60 dark:border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Carousel Navigation Controls */}
        <div className="text-center md:text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ictak-blue/10 dark:bg-ictak-cyan/10 border border-ictak-blue/20 dark:border-ictak-cyan/20 text-ictak-blue dark:text-ictak-cyan text-[11px] font-space font-bold uppercase tracking-wider mb-3">
              <FiAward />
              <span>Curated Statewide Initiatives</span>
            </div>
            <h2 className="h2-scale font-space text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Flagship <span className="text-ictak-cyan">Campaigns & Events</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mt-2 font-light leading-relaxed">
              Discover our active campaign tracks and specialized workshops co-created with Kerala Police Cyberdome, KSITM, and academic partners.
            </p>
          </div>

          {/* Left / Right Navigation Buttons */}
          <div className="flex items-center gap-3 self-center md:self-end">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-ictak-cyan hover:text-white dark:hover:bg-ictak-cyan dark:hover:text-slate-950 transition cursor-pointer shadow-sm active:scale-95"
              aria-label="Previous Campaign"
            >
              <IoChevronBack className="text-lg" />
            </button>
            <button
              onClick={handleNext}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-ictak-cyan hover:text-white dark:hover:bg-ictak-cyan dark:hover:text-slate-950 transition cursor-pointer shadow-sm active:scale-95"
              aria-label="Next Campaign"
            >
              <IoChevronForward className="text-lg" />
            </button>
          </div>
        </div>

        {/* Swiper Slider Wrapper with spacious card sizing and continuous right-to-left auto animation */}
        <div className="py-2">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            speed={1200}
            autoplay={{
              delay: 2400,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 60,
              modifier: 1.1,
              slideShadows: false,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            breakpoints={{
              320: { slidesPerView: 1.08, spaceBetween: 20 },
              640: { slidesPerView: 1.5, spaceBetween: 25 },
              768: { slidesPerView: 2.0, spaceBetween: 30 },
              1024: { slidesPerView: 2.7, spaceBetween: 35 },
              1280: { slidesPerView: 3.1, spaceBetween: 40 }
            }}
            className="featured-swiper !pb-14"
          >
            {featuredCampaigns.map((campaign) => (
              <SwiperSlide key={campaign.id} className="!w-full max-w-[390px] sm:max-w-[420px]">
                <CampaignCard campaign={campaign} onClick={() => setSelectedCampaign(campaign)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {selectedCampaign && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
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
              className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCampaign(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer shadow-sm"
              >
                <IoClose className="text-xl" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Column 1: Image & Basic details */}
                <div className="h-64 md:h-full relative min-h-[320px]">
                  <img
                    src={selectedCampaign.image}
                    alt={selectedCampaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-white dark:md:to-slate-900" />
                  
                  <div className="absolute bottom-6 left-6 z-10 text-left pr-4">
                    <span className="bg-gradient-to-r from-ictak-blue to-cyan-600 px-3 py-1 rounded-full font-space text-[9px] uppercase font-bold tracking-wider text-white">
                      {selectedCampaign.category}
                    </span>
                    <h3 className="font-space text-xl sm:text-2xl font-bold text-white mt-2 leading-tight drop-shadow-md">
                      {selectedCampaign.title}
                    </h3>
                  </div>
                </div>

                {/* Column 2: Full description, feedback & schedule */}
                <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 bg-white dark:bg-slate-900 text-left">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-space text-[10px] text-ictak-blue dark:text-ictak-cyan tracking-widest uppercase font-bold">
                        PROGRAM OVERVIEW
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-light">
                        {selectedCampaign.description}
                      </p>
                    </div>

                    {/* Community review quote inside modal */}
                    <div className="p-3.5 rounded-2xl bg-cyan-50/50 dark:bg-slate-800 border border-cyan-100 dark:border-slate-700">
                      <span className="text-[9.5px] font-space font-bold uppercase tracking-wider text-ictak-blue dark:text-ictak-cyan">
                        Featured Participant Feedback
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-200 italic mt-1 leading-snug">
                        "{selectedCampaign.comment}"
                      </p>
                      <span className="text-[10px] text-slate-500 font-semibold block mt-1">
                        — {selectedCampaign.commentAuthor}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 border-y border-slate-100 dark:border-slate-800 py-3.5 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-space uppercase">Schedule / Timeline</span>
                        <p className="text-slate-800 dark:text-slate-200 mt-0.5 font-semibold font-space">{selectedCampaign.date}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-space uppercase">Venue / Mode</span>
                        <p className="text-slate-800 dark:text-slate-200 mt-0.5 font-semibold">{selectedCampaign.venue}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-space uppercase">Availability</span>
                        <p className="text-ictak-cyan mt-0.5 font-bold">{selectedCampaign.seats}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-space uppercase">Lead Agency</span>
                        <p className="text-slate-800 dark:text-slate-200 mt-0.5 font-semibold">{selectedCampaign.organizer}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] text-ictak-cyan tracking-widest font-space uppercase font-bold">
                        KEY SPEAKERS & PANELISTS
                      </span>
                      <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 list-disc list-inside">
                        {selectedCampaign.speakers.map((spk, idx) => (
                          <li key={idx} className="font-light">{spk}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCampaign(null);
                      const targetEl = selectedCampaign.id === 4 ? '#clubs' : '#contact';
                      document.querySelector(targetEl)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-ictak-blue to-ictak-cyan hover:opacity-95 text-white font-space font-bold uppercase tracking-wider text-xs rounded-xl shadow-md transition cursor-pointer"
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
