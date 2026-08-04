import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

// Swiper CSS imports
import 'swiper/css';
import 'swiper/css/pagination';

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  affiliation: string;
  quote: string;
  rating: number;
  image: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Arya Dev",
    role: "Jagratha Ambassador",
    affiliation: "University College, Trivandrum",
    quote: "The 15-credit ambassador curriculum gave us hands-on cybersecurity skills. It is rewarding to guide local high school pupils on how to prevent online harassment and configure account privacy rules.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Dr. Thomas George",
    role: "School Club Coordinator",
    affiliation: "Model HS, Ernakulam",
    quote: "Establishing the SafeTech club in our school was frictionless. The charter document onboarding was fast, and our student cabinet is actively conducting peer cyber literacy quizzes.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Parent Representative",
    affiliation: "Kochi Resident Association",
    quote: "The digital parenting toolkit helped me easily configure device parental locks on my children's tablets, giving our family peace of mind and helping us manage screen times effectively.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    name: "Devon Chen",
    role: "Master ToT Trainer",
    affiliation: "Police Cyberdome PMU Advisor",
    quote: "Validating the school workshop logs and managing the district active club telemetry is very intuitive. The campaign dashboard builds massive public trust through real-time feedback.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#f8fafc] dark:bg-[#08080f] select-none border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <span className="font-space text-xs tracking-wider text-ictak-blue font-bold uppercase">CITIZEN FEEDBACK</span>
          <h2 className="h2-scale font-space text-3xl font-bold text-slate-900 mt-2">
            What the Community <span className="gradient-text-safetech">Says</span>
          </h2>
        </div>

        {/* Carousel Slider */}
        <div className="py-4">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="testimonials-swiper !pb-12"
          >
            {testimonials.map((test) => (
              <SwiperSlide key={test.id} className="h-auto">
                <div className="h-full flex flex-col justify-between p-8 rounded-3xl bg-white border border-slate-200/60 safetech-card relative group text-left">
                  {/* Quote decoration */}
                  <FaQuoteLeft className="absolute top-6 right-6 text-2xl text-slate-100 group-hover:text-ictak-cyan/10 transition-colors" />

                  <div className="flex flex-col gap-4">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(test.rating)].map((_, i) => (
                        <FaStar key={i} className="text-amber-400 text-sm" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light italic">
                      "{test.quote}"
                    </p>
                  </div>

                  {/* Profile info footer */}
                  <div className="flex items-center gap-4 mt-8 border-t border-slate-100 pt-4">
                    <img 
                      src={test.image} 
                      alt={test.name} 
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                      loading="lazy"
                    />
                    <div className="flex flex-col">
                      <h4 className="font-space text-sm font-bold text-slate-800 group-hover:text-ictak-cyan transition-colors">
                        {test.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-sans mt-0.5 font-medium">
                        {test.role}, <span className="text-ictak-blue">{test.affiliation}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
