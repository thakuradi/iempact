import { Calendar, MapPin, ArrowRight, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const particleAnimation = `
  @keyframes float {
    0% { transform: translateY(0px) translateX(0px); opacity: 0; }
    50% { opacity: 0.8; }
    100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
  }
`;

// ✅ UPDATED EVENT DATA WITH YOUR IMAGES
const originalEvents = [
  {
    title: "Illusion Jam",
    category: "Battle of Bands",
    date: "Coming Soon",
    location: "Main Stage",
    image: "/events/Battle of Bands.png",
  },
  {
    title: "Stepistan",
    category: "Dance",
    date: "Coming Soon",
    location: "Auditorium",
    image: "/events/Step is tan.png",
  },
  {
    title: "Halla Bol",
    category: "Street Play",
    date: "Coming Soon",
    location: "Open Arena",
    image: "/events/Halla bol.png",
  },
  {
    title: "BGMI Arena",
    category: "E-Sports",
    date: "Coming Soon",
    location: "Gaming Zone",
    image: "/events/bgmi.png",
  },
  {
    title: "Step Up",
    category: "Western Dance",
    date: "Coming Soon",
    location: "Main Stage",
    image: "/events/Step up.png",
  },
  {
    title: "Raagify",
    category: "Eastern Music",
    date: "Coming Soon",
    location: "Auditorium",
    image: "/events/Raagify.png",
  },
];

// Double to avoid Swiper rewind glitch
const carouselEvents = [...originalEvents, ...originalEvents].map(
  (event, index) => ({ ...event, id: index })
);

export function EventCarousel() {
  return (
    <div
      className="w-full pt-24 pb-10 relative overflow-hidden min-h-[560px] flex items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&auto=format&fit=crop&w=2000')",
      }}
    >
      <style>{particleAnimation}</style>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] z-0 opacity-80 pointer-events-none" />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-200 rounded-full opacity-0"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop
        initialSlide={2}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={800}
        spaceBetween={120}
        coverflowEffect={{
          rotate: 35,
          depth: 100,
          modifier: 1,
          slideShadows: false,
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
            {/* ROOF SECTION */}
            <div className="absolute -top-[50px] left-1/2 -translate-x-1/2 w-[115%] z-30">
              <div
                className="h-[60px] w-full rounded-t-lg shadow-2xl"
                style={{
                  transform: "rotateX(10deg)",
                  background:
                    "repeating-linear-gradient(90deg,#dc2626,#dc2626 30px,#f8fafc 30px,#f8fafc 60px)",
                }}
              />
              <div className="w-full h-8 bg-red-800 flex justify-around items-center border-b-4 border-red-900 rounded-sm">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-yellow-200 animate-pulse shadow-[0_0_10px_2px_rgba(253,224,71,0.8)]"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>

            {/* CATEGORY LABEL */}
            <div className="absolute top-[20px] left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
              <div className="flex gap-20 h-8">
                <div className="w-[2px] h-full bg-gray-500" />
                <div className="w-[2px] h-full bg-gray-500" />
              </div>
              <div className="px-6 py-2 bg-[#3f2e22] border-[3px] border-[#855e42] text-[#ffdea6] text-sm font-black uppercase rounded-lg shadow-xl rotate-[-2deg] tracking-widest">
                {event.category}
              </div>
            </div>

            {/* MAIN BOOTH */}
            <div className="w-full h-full pt-4 relative">
              <div className="w-full h-full bg-[#2a1d15] rounded-lg overflow-hidden border-x-6 border-[#3f2e22] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.8)]">
                {/* IMG */}
                <div className="absolute top-3 left-3 right-3 bottom-20 bg-black rounded-t-md overflow-hidden border border-white/5">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-700"
                  />
                </div>

                {/* TITLE */}
                <div className="absolute inset-0 flex flex-col justify-end">
                  <div className="px-5 pb-24 text-center">
                    <h3 className="text-3xl font-bebas text-white tracking-wide">
                      {event.title}
                    </h3>
                    <p className="text-white/60 text-xs uppercase tracking-widest">
                      {event.category}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="h-20 bg-[#3f2e22] flex items-center justify-center border-t-4 border-[#5a4231] shadow-xl">
                    <Link
                      to="/register"
                      className="relative group flex items-center gap-3 bg-[#f59e0b] hover:bg-[#fbbf24] text-amber-950 px-5 py-2.5 font-bold uppercase tracking-wider shadow-[0_5px_0_#b45309] hover:-translate-y-1 transition-all"
                      style={{
                        clipPath:
                          "polygon(10px 0,100% 0,100% 100%,10px 100%,0 50%)",
                      }}
                    >
                      <span className="border-r border-amber-800/20 pr-3">
                        <Ticket size={18} />
                      </span>
                      Get Ticket
                      <ArrowRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
