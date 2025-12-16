import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownSection() {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = +new Date("2026-01-17") - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <section className="flex px-6 items-center justify-center 
    text-wrap py-20 
    overflow-hidden">
      <div className="flex flex-col bg-black/40 md:p-16 p-12 
      rounded-2xl items-center justify-center">
        
        {/* Small Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/70 font-perandory 
          text-sm text-center tracking-[0.2em] mb-4 uppercase"
        >
          Starting from 17th Jan 2026
        </motion.p>

        {/* Large Title */}
        <motion.h2
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-4xl md:text-6xl lg:text-7xl 
          text-[#d4f5d6] font-['Rye'] 
           mb-12 text-center"
        >
          SHOW BEGINS IN
        </motion.h2>

        {/* Timer Display matched to the "EVENT STARTED" style in image but functional */}
        <div className="flex flex-wrap justify-center 
        gap-8 md:gap-16 mb-16">
           {[
             { label: "Days", value: timeLeft.days },
             { label: "Hours", value: timeLeft.hours },
             { label: "Minutes", value: timeLeft.minutes },
             { label: "Seconds", value: timeLeft.seconds }
           ].map((item, i) => (
             <motion.div
               key={item.label}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 * i }}
               className="text-center"
             >
                <div className="font-['Rye'] text-4xl md:text-6xl text-[#d4f5d6] mb-2 font-light">
                   {item.value < 10 ? `0${item.value}` : item.value}
                </div>
                <div className="text-white/50 
                font-perandoryCondensed tracking-widest 
                text-sm text-center uppercase">
                   {item.label}
                </div>
             </motion.div>
           ))}
        </div>

        {/* Register Button */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="rounded-2xl"
        >
           <Link 
             to="/register"
             className="inline-flex items-center gap-2 
             px-8 py-3 bg-[#d4f5d6] text-[#1a0b2e] 
             font-perandory font-semibold text-lg uppercase tracking-wide 
             hover:bg-white transition-colors 
             duration-300 relative group rounded-3xl"
           >
             <span className="absolute left-0 top-1/2 
             -translate-y-1/2 
             -translate-x-full opacity-0 
             group-hover:opacity-100 
             group-hover:-translate-x-2 transition-all duration-300">
               <ArrowRight className="w-4 h-4" />
             </span>
             Register Now
             <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
               <ArrowRight className="w-4 h-4 rotate-180" />
             </span>
           </Link>
        </motion.div>

      </div>
    </section>
  );
}
