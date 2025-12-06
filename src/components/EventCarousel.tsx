import { Calendar, MapPin, ArrowRight, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const carouselEvents = [
  {
    id: 1,
    title: "Battle of Bands",
    category: "Music",
    date: "Mar 15",
    location: "Main Stage",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&auto=format&fit=crop&w=1200",
  },
  {
    id: 2,
    title: "Classical Dance",
    category: "Dance",
    date: "Mar 16",
    location: "Auditorium",
    image:
      "https://images.unsplash.com/photo-1519494080410-f9aa76f1fc1a?q=80&auto=format&fit=crop&w=1200",
  },
  {
    id: 3,
    title: "Tech Showcase",
    category: "Tech",
    date: "Mar 17",
    location: "Tech Hub",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&auto=format&fit=crop&w=1200",
  },
  {
    id: 4,
    title: "Open Mic Night",
    category: "Performance",
    date: "Mar 16",
    location: "Acoustic Lounge",
    image:
      "https://images.unsplash.com/photo-1511379938547-9c258acb5a0c?q=80&auto=format&fit=crop&w=1200",
  },
  {
    id: 5,
    title: "Art Exhibition",
    category: "Arts",
    date: "Mar 15",
    location: "Gallery Wing",
    image:
      "https://images.unsplash.com/photo-1520697222862-4f10cb5a5b0f?q=80&auto=format&fit=crop&w=1200",
  },
  {
    id: 6,
    title: "Food Carnival",
    category: "Dining",
    date: "Mar 18",
    location: "Food Court",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&auto=format&fit=crop&w=1200",
  },
];

export function EventCarousel() {
  return (
    <div className="w-full pt-24 pb-10 bg-[#1a1a1a] relative overflow-visible min-h-[560px] flex items-center">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-black to-black z-0 pointer-events-none" />

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        initialSlide={Math.floor(carouselEvents.length / 2)}
        spaceBetween={24}
        speed={800} // Smoother transition speed
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200, // Increased depth for more 3D feel
          modifier: 1.5,
          slideShadows: false, // Custom shadows used instead
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="swiper_container !overflow-visible !pb-12 z-10 w-full"
      >
        {carouselEvents.map((event) => (
          <SwiperSlide
            key={event.id}
            className="w-[260px] md:w-[320px] h-[420px] relative group transition-all duration-300"
          >
            {/* =======================
                ROOF SECTION
            ======================== */}
            <div className="absolute -top-[50px] left-1/2 -translate-x-1/2 w-[115%] z-30 perspective-1000">
              {/* Main Roof Slope */}
              <div
                className="h-[60px] w-full relative rounded-t-lg shadow-2xl"
                style={{
                  transform: "rotateX(10deg)",
                  background:
                    "repeating-linear-gradient(90deg, #dc2626, #dc2626 30px, #f8fafc 30px, #f8fafc 60px)",
                  boxShadow: "inset 0 -10px 20px rgba(0,0,0,0.3)",
                }}
              >
                {/* Flag on top */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-1 h-8 bg-yellow-600" />
                  <div className="w-0 h-0 border-l-[20px] border-l-yellow-400 border-y-[10px] border-y-transparent border-r-0 absolute top-0 left-1 animate-pulse" />
                </div>
              </div>

              {/* Roof Fascia (The edge with lights) */}
              <div className="w-full h-8 bg-red-800 relative shadow-lg flex justify-around items-center px-2 z-40 rounded-sm border-b-4 border-red-900">
                {/* Glowing Bulbs */}
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-yellow-200 shadow-[0_0_10px_2px_rgba(253,224,71,0.8)] animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>

              {/* Scalloped Fabric Edge */}
              <div
                className="w-full h-4 relative -mt-1 z-30"
                style={{
                  backgroundImage: `radial-gradient(circle at 18px 0, transparent 18px, #991b1b 19px)`,
                  backgroundSize: "36px 20px",
                  backgroundRepeat: "repeat-x",
                  transform: "rotate(180deg)",
                }}
              />
            </div>

            {/* =======================
                HANGING SIGN
            ======================== */}
            <div className="absolute top-[20px] left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none">
              <div className="flex gap-20 h-8">
                {/* Chains */}
                <div className="w-[2px] h-full bg-gradient-to-b from-gray-400 to-gray-600 dashed-border" />
                <div className="w-[2px] h-full bg-gradient-to-b from-gray-400 to-gray-600 dashed-border" />
              </div>
              <div className="px-6 py-2 bg-[#3f2e22] border-[3px] border-[#855e42] text-[#ffdea6] text-sm font-black tracking-widest uppercase rounded-lg shadow-xl shadow-black/60 transform rotate-[-2deg] origin-top">
                {event.category}
              </div>
            </div>

            {/* =======================
                MAIN BOOTH STRUCTURE
            ======================== */}
            <div className="w-full h-full pt-4 relative">
              {/* The Wooden Box Container */}
              <div className="w-full h-full bg-[#2a1d15] rounded-lg relative overflow-hidden shadow-[0_30px_60px_-10px_rgba(0,0,0,0.8)] border-x-6 border-[#3f2e22]">
                {/* Wood Grain Texture Overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />

                {/* Event Image (The Back of the Booth) */}
                <div className="absolute top-3 left-3 right-3 bottom-20 bg-black overflow-hidden rounded-t-md border border-white/5 shadow-inner">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Inner Shadow/Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
                </div>

                {/* =======================
                    CONTENT & COUNTER
                ======================== */}
                <div className="absolute inset-0 flex flex-col justify-end">
                  {/* Text Info floating above counter */}
                  <div className="px-5 pb-24 text-center z-20">
                    <h3 className="text-3xl font-bebas text-white mb-2 drop-shadow-md tracking-wide">
                      {event.title}
                    </h3>
                    <div className="flex justify-center gap-3 text-white/70 text-xs font-mono uppercase">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {event.location}
                      </span>
                    </div>
                  </div>

                  {/* The Wooden Counter (Bottom Ledge) */}
                  <div className="h-20 bg-[#3f2e22] relative z-20 flex items-center justify-center border-t-4 border-[#5a4231] shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
                    {/* Wood Detail Lines */}
                    <div className="absolute top-2 w-full h-[1px] bg-white/10" />
                    <div className="absolute bottom-2 w-full h-[1px] bg-black/30" />

                    {/* Ticket Button sitting on the counter */}
                    <Link
                      to="/register"
                      className="relative group/btn flex items-center gap-3 bg-[#f59e0b] hover:bg-[#fbbf24] text-amber-950 px-5 py-2.5 font-bold uppercase tracking-wider rounded-sm transition-all transform hover:-translate-y-1 shadow-[0_5px_0_#b45309] active:translate-y-0 active:shadow-none"
                      style={{
                        clipPath:
                          "polygon(10px 0, 100% 0, 100% 100%, 10px 100%, 0 50%)", // Ticket shape
                      }}
                    >
                      <span className="border-r border-amber-800/20 pr-3">
                        <Ticket size={18} />
                      </span>
                      <span>Get Ticket</span>
                      <ArrowRight
                        size={16}
                        className="opacity-0 group-hover/btn:opacity-100 -ml-4 group-hover/btn:ml-0 transition-all"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Podium/Legs at bottom */}
              <div className="w-[90%] mx-auto h-4 bg-[#1e150f] rounded-b-xl shadow-2xl translate-y-[-2px]" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
