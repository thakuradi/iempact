import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, Ticket } from "lucide-react";

/* 🎨 Carnival colors */
const festColors = [
  "#FFD34E",
  "#4DA8FF",
  "#67D66F",
  "#FF914D",
  "#B983FF",
  "#FF6F91",
];

/* 🔁 Title loop */
const TITLES = ["IEMPACT 2026", "MELAVERSE"];

const titleSwap = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % TITLES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pb-8">
      <div className="container mx-auto px-4 text-center">

        {/* ================= MAIN TITLE (SAMARKAN ONLY) ================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={TITLES[index]}
            variants={titleSwap}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mb-3"
          >
            <div
              className="
                flex flex-wrap justify-center gap-2
                font-perandory
                tracking-normal
                text-[5.5rem]
                sm:text-[8rem]
                md:text-[9rem]
                lg:text-[11rem]
                leading-none
                select-none
              "
            >
              {TITLES[index].split("").map((char, i) =>
                char === " " ? (
                  <span key={i} className="w-6" />
                ) : (
                  <motion.span
                    key={i}
                    animate={{
                      y: i % 2 === 0 ? [0, -8, 0] : [0, 8, 0],
                    }}
                    transition={{
                      duration: 3.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      color: festColors[i % festColors.length],
                      textShadow: `
                        -2px -2px 0 rgba(0,0,0,0.55),
                        2px -2px 0 rgba(0,0,0,0.55),
                        -2px 2px 0 rgba(0,0,0,0.55),
                        2px 2px 0 rgba(0,0,0,0.55),
                        8px 12px 22px rgba(0,0,0,0.6)
                      `,
                    }}
                  >
                    {char}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ================= SUBHEADING (RYE) ================= */}
        <p
          className="
            mx-auto mt-1
            text-[1.25rem] sm:text-[1.35rem] md:text-[1.45rem]
            font-perandoryCondensed
            tracking-wide
            leading-none
            text-white/90
            whitespace-nowrap
          "
        >
          An escape from the clockwork of days into the living rhythm of the Mela.
        </p>

        {/* ================= DATE + VENUE (RYE) ================= */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 mb-12 md:mb-16 font-perandoryCondensed">
          <div className="px-6 py-2.5 rounded-full bg-yellow-300 text-black text-sm flex items-center gap-2 shadow-md border-2 border-yellow-600/60">
            <Calendar className="w-4 h-4" />
            January 17–18, 2026
          </div>

          <div className="px-6 py-2.5 rounded-full bg-white text-black text-sm flex items-center gap-2 shadow-md border-2 border-red-500/50">
            <MapPin className="w-4 h-4" />
            Main Campus Ground
          </div>
        </div>

        {/* ================= CTA BUTTONS (RYE) ================= */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 font-perandoryCondensed">
          <Link
            to="/register"
            className="
              relative group flex items-center gap-3
              bg-[#f59e0b] hover:bg-[#fbbf24]
              text-amber-950 px-8 py-4
              font-black uppercase tracking-wider
              border-2 border-amber-700
              transition-all transform
              hover:-translate-y-1
              shadow-[0_6px_0_#b45309]
              active:translate-y-0 active:shadow-none
            "
            style={{
              clipPath:
                "polygon(18px 0, 100% 0, 100% 100%, 18px 100%, 0 50%)",
            }}
          >
            <span className="border-r border-amber-800/30 pr-4">
              <Ticket size={22} />
            </span>
            Register Now
            <ArrowRight
              size={20}
              className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"
            />
          </Link>

          <Link
            to="/events"
            className="
              relative group flex items-center gap-3
              bg-white hover:bg-yellow-100
              text-red-600 px-8 py-4
              font-black uppercase tracking-wider
              border-4 border-red-600
              transition-all transform
              hover:-translate-y-1
              shadow-[0_6px_0_#991b1b]
              active:translate-y-0 active:shadow-none
            "
            style={{
              clipPath:
                "polygon(18px 0, 100% 0, 100% 100%, 18px 100%, 0 50%)",
            }}
          >
            Explore Events
          </Link>
        </div>

      </div>
    </section>
  );
}
