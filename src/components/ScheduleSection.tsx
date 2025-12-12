"use client";

import { motion } from "framer-motion";

export function ScheduleSection() {
  return (
    <section
      id="schedule"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* === BACKGROUND IMAGE (bg.png) === */}
      <div
        className="absolute inset-0 -z-30"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "cover",        // full responsive fill
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(1.2) saturate(1.05)",
        }}
      />

      {/* Warm wash */}
      <div className="absolute inset-0 -z-20 bg-yellow-100/35" />

      {/* Glow accents */}
      <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] bg-yellow-300/50 blur-[220px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-orange-400/45 blur-[220px] rounded-full" />

      {/* === CONTENT === */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        {/* Heading */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            font-bebas
            text-[3rem]
            font-['Rye']
            sm:text-[4.5rem]
            md:text-[6rem]
            tracking-[0.15em]
            text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-yellow-500
            via-orange-500
            to-red-600
            drop-shadow-[0_0_18px_rgba(251,191,36,0.6)]
            mb-4
          "
        >
          REVEALING&nbsp;SOON
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="
            font-poppins
            text-[#7c2d12]
            text-base md:text-lg
            font-medium
            max-w-md mx-auto
            opacity-90
          "
        >
          The festival schedule is taking shape. <br />
          The reveal is closer than you think.
        </motion.p>
      </motion.div>
    </section>
  );
}
