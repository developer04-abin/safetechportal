import { motion } from 'framer-motion';
import { 
  FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, 
  FaTwitter, FaWhatsapp, FaTelegramPlane 
} from 'react-icons/fa';
import Magnetic from './Magnetic';

interface SocialItem {
  id: number;
  platform: string;
  followers: string;
  latestPost: string;
  icon: any;
  color: string;
  glow: string;
  url: string;
}

const socialsData: SocialItem[] = [
  {
    id: 1,
    platform: "LinkedIn",
    followers: "12.4K Followers",
    latestPost: "🚀 Nexus Hackathon registrations cross 1,000 teams in 72 hours! Check the jury shortlist evaluation guidelines...",
    icon: FaLinkedinIn,
    color: "from-blue-600 to-cyan-500",
    glow: "rgba(10, 102, 194, 0.4)",
    url: "https://linkedin.com"
  },
  {
    id: 2,
    platform: "Instagram",
    followers: "8.9K Followers",
    latestPost: "📸 Behind the scenes at our DevOps Container labs: hackers, pizza, and endless nodes! Check full reel...",
    icon: FaInstagram,
    color: "from-pink-500 to-rose-400",
    glow: "rgba(225, 48, 108, 0.4)",
    url: "https://instagram.com"
  },
  {
    id: 3,
    platform: "YouTube",
    followers: "5.5K Subscribers",
    latestPost: "🎥 Watch: Opening Ceremony Cinematic Highlights - AI and Robotics Humanoids Live Demo recap...",
    icon: FaYoutube,
    color: "from-red-600 to-rose-600",
    glow: "rgba(255, 0, 0, 0.4)",
    url: "https://youtube.com"
  },
  {
    id: 4,
    platform: "Twitter",
    followers: "6.2K Followers",
    latestPost: "🛡️ Reverse engineering CTF challenge is now LIVE! Find the flag hidden in the binary payload: #DefConNexus",
    icon: FaTwitter,
    color: "from-sky-500 to-blue-400",
    glow: "rgba(29, 161, 242, 0.4)",
    url: "https://twitter.com"
  },
  {
    id: 5,
    platform: "Facebook",
    followers: "4.1K Followers",
    latestPost: "🤝 Welcoming Google Developers to our innovation board as core technical infrastructure sponsors...",
    icon: FaFacebookF,
    color: "from-blue-700 to-indigo-600",
    glow: "rgba(24, 119, 242, 0.4)",
    url: "https://facebook.com"
  },
  {
    id: 6,
    platform: "WhatsApp",
    followers: "Community Channel",
    latestPost: "💬 Join: Real-time schedule broadcasts, announcements, and immediate workshop support forums...",
    icon: FaWhatsapp,
    color: "from-emerald-500 to-green-400",
    glow: "rgba(37, 211, 102, 0.4)",
    url: "https://whatsapp.com"
  },
  {
    id: 7,
    platform: "Telegram",
    followers: "2.8K Members",
    latestPost: "📨 File Drop: Download the official CTF reverse engineering workspace scripts and resources...",
    icon: FaTelegramPlane,
    color: "from-sky-600 to-blue-500",
    glow: "rgba(0, 136, 204, 0.4)",
    url: "https://telegram.org"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 20 } }
};

export default function SocialMedia() {
  return (
    <section className="py-24 relative select-none bg-[#020204]/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="font-space text-xs tracking-[0.25em] text-primary-cyan uppercase font-medium">STAY SYNCED</span>
          <h2 className="font-space text-4xl md:text-6xl font-bold text-white mt-3">
            Social <span className="gradient-text">Channels</span>
          </h2>
          <p className="font-sans text-gray-400 max-w-xl mx-auto mt-4 font-light leading-relaxed">
            Follow our digital streams for prompt alerts, developer workshops support, live schedules, and hackathon recaps.
          </p>
        </div>

        {/* Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {socialsData.map((social) => {
            const Icon = social.icon;
            return (
              <motion.div
                key={social.id}
                variants={cardVariants}
                className="relative group p-6 rounded-3xl glass-card flex flex-col justify-between overflow-hidden border border-white/5 hover:border-white/10 hover:shadow-2xl transition-all duration-300 min-h-[240px]"
                style={{
                  boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37)`,
                }}
                whileHover={{
                  boxShadow: `0 10px 40px ${social.glow}`,
                  borderColor: 'rgba(255, 255, 255, 0.15)'
                }}
              >
                {/* Background light streak */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${social.color} opacity-5 group-hover:opacity-15 rounded-full blur-2xl transition-all duration-500`} />

                <div className="flex flex-col gap-4">
                  {/* Header: Animated Icon & Followers */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${social.color} text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg`}>
                      <Icon className="text-xl" />
                    </div>
                    <span className="font-space text-xs text-gray-500 group-hover:text-white transition-colors duration-300">
                      {social.followers}
                    </span>
                  </div>

                  {/* Latest Post */}
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="font-space text-[9px] text-primary-cyan tracking-wider font-semibold uppercase">LATEST STREAM</span>
                    <p className="font-sans text-xs text-gray-300 leading-relaxed font-light line-clamp-3">
                      {social.latestPost}
                    </p>
                  </div>
                </div>

                {/* Visit Platform Button */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <Magnetic range={40} strength={0.3}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl font-space text-[10px] font-semibold uppercase tracking-wider text-white border border-white/5 transition-all duration-300 block text-center cursor-pointer"
                    >
                      Visit Platform
                    </a>
                  </Magnetic>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
