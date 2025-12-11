import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Ticket } from "lucide-react";

const LOGOS = ["/logoverse.png", "/Pact_main.png"];

const logoSwap = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } },
};

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % LOGOS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-start justify-center">
      
      <div
        className="
          flex flex-col items-center justify-center w-full text-center
          pt-24 sm:pt-40 lg:pt-48
          pb-2 sm:pb-0        /* ⬅ less bottom gap on phone */
        "
      >

        {/* LOGO */}
        <AnimatePresence mode="wait">
          <motion.div
            key={LOGOS[index]}
            variants={logoSwap}
            initial="initial"
            animate="animate"
            exit="exit"
            className="
              flex justify-center 
              mt-16 sm:mt-10 lg:mt-0   /* ⬅ logo slightly lower only on phone */
            "
          >
            <motion.img
              src={LOGOS[index]}
              alt="Fest Logo"
              className="
                w-[290px]
                sm:w-[430px]
                md:w-[600px]
                lg:w-[720px]
                xl:w-[820px]
                h-auto select-none
              "
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* SUBHEADING — closer to logo on phone */}
        <p
          className="
            mt-2 sm:mt-4      /* ⬅ reduced gap on phone */
            text-[1rem] 
            sm:text-[1.25rem] md:text-[1.45rem]
            font-['Rye'] text-white/90 whitespace-nowrap
          "
        >
          An escape from the clockwork of days into the living rhythm of the Mela.
        </p>

        {/* DATE + LOCATION — reduced spacing */}
        <div
          className="
            flex flex-row justify-center gap-2 
            mt-3 sm:mt-4         /* ⬅ tighter spacing on phone */
            mb-4 sm:mb-10        /* ⬅ less gap below on phone */
            font-['Rye']
          "
        >
          <div className="px-4 py-2 rounded-full bg-yellow-300 text-black text-xs sm:text-sm flex items-center gap-2 shadow-md border-2 border-yellow-600/60">
            <Calendar className="w-4 h-4" /> January 17–18, 2026
          </div>

          <div className="px-4 py-2 rounded-full bg-white text-black text-xs sm:text-sm flex items-center gap-2 shadow-md border-2 border-red-500/50">
            <MapPin className="w-4 h-4" /> IEM MANAGEMENT HOUSE
          </div>
        </div>

        {/* CTA BUTTONS — reduced margins on phone */}
        <div
          className="
            flex flex-row justify-center gap-2 sm:gap-6 font-['Rye']
            mt-1 sm:mt-2       /* ⬅ tighter on phone */
          "
        >
          <Link
            to="/register"
            className="
              relative group flex items-center justify-center gap-3
              w-[145px] sm:w-[230px]
              bg-[#f59e0b] hover:bg-[#fbbf24]
              text-amber-950 px-4 py-3 sm:px-8 sm:py-4
              font-black uppercase tracking-wider
              border-2 border-amber-700
              shadow-[0_6px_0_#b45309]
              transition-all hover:-translate-y-1
            "
            style={{ clipPath: 'polygon(18px 0, 100% 0, 100% 100%, 18px 100%, 0 50%)' }}
          >
            <Ticket size={18} /> Register
          </Link>

          <Link
            to="/events"
            className="
              relative group flex items-center justify-center gap-3
              w-[145px] sm:w-[230px]
              bg-white hover:bg-yellow-100
              text-red-600 px-4 py-3 sm:px-8 sm:py-[14px]
              font-black uppercase tracking-wider
              border-4 border-red-600
              shadow-[0_6px_0_#991b1b]
              transition-all hover:-translate-y-1
            "
            style={{ clipPath: 'polygon(18px 0, 100% 0, 100% 100%, 18px 100%, 0 50%)' }}
          >
            Events
          </Link>
        </div>

      </div>
    </section>
  );
}
