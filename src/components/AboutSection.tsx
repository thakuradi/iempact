"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";

export function AboutSection() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const [showControls, setShowControls] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.9, staggerChildren: 0.2, ease: "easeOut" },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const handlePlay = () => {
    setShowControls(true);

    if (videoRef.current) {
      const v = videoRef.current;

      v.muted = false;
      v.setAttribute("playsinline", "true");

      const tryPlay = () => {
        v.play().catch(() => {
          setTimeout(() => v.play().catch(() => {}), 120);
        });
      };

      tryPlay();
    }
  };

  return (
    <section id="about" className="pt-16 pb-28">
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="container mx-auto px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          <motion.div
            variants={item}
            className="
              relative 
              max-w-2xl        /* ⬅⬅ INC SIZE */
              w-full           /* responsive full width */
              mx-auto
              rounded-2xl
              border border-white/20
              bg-black/70
              backdrop-blur-xl
              shadow-[0_25px_80px_rgba(0,0,0,0.7)]
              overflow-hidden
              transition-all duration-500
              hover:scale-[1.02]             /* increase hover scale slightly */
              hover:shadow-[0_40px_120px_rgba(255,220,120,0.25)]
              hover:border-yellow-300/40
            "
          >
            {/* REC INDICATOR */}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-white tracking-wider z-20">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              REC
            </div>

            {/* VIDEO */}
            <div className="aspect-video w-full bg-black relative">

              {!showControls && (
                <button
                  onClick={handlePlay}
                  className="
                    absolute inset-0 flex items-center justify-center 
                    bg-black/30 hover:bg-black/20 transition z-20
                  "
                >
                  <div className="w-20 h-20 rounded-full border border-white/70 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[22px] border-l-white border-y-[12px] border-y-transparent ml-1" />
                  </div>
                </button>
              )}

              <video
                ref={videoRef}
                src="/teaser.mp4"
                controls={showControls}
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
            </div>

          </motion.div>

      
          <div className="text-white">
            <motion.h2
              variants={item}
              className="font-samarkan text-5xl sm:text-6xl md:text-7xl mb-10 tracking-wide"
            >
              About IEMPACT
            </motion.h2>

            <div className="space-y-5 text-[1.05rem] sm:text-[1.1rem] md:text-[1.15rem] leading-[1.6] font-semibold text-white/95 font-['Georgia']">
              <motion.p variants={item}>
                IEMPACT, the flagship cultural festival of IEM Kolkata,
                marks its grand 35th edition with a vibrant legacy of talent,
                creativity, and unforgettable energy.
              </motion.p>

              <motion.p variants={item}>
                Attracting over{" "}
                <span className="text-yellow-300 font-semibold">15,000+</span>{" "}
                attendees, the festival presents thrilling competitions,
                spectacular performances, and a dynamic platform for
                young voices to shine.
              </motion.p>

              <motion.p variants={item}>
                With strong media presence and prestigious brand collaborations,
                IEMPACT continues to stand tall as one of Eastern India’s
                most anticipated cultural celebrations.
              </motion.p>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
