import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

export default function ComingSoon() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      
      {/* Glow blobs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-yellow-400/20 blur-[140px] rounded-full" />
      <div className="absolute bottom-24 right-1/4 w-72 h-72 bg-red-500/20 blur-[140px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-3xl text-center"
      >
        {/* Title */}
        <h1 className="font-samarkan text-6xl sm:text-7xl md:text-8xl mb-6">
          IEMPACT 2026
        </h1>

        <p className="text-yellow-300 font-['Rye'] font-semibold tracking-widest text-sm mb-4">
          THE GRAND CARNIVAL RETURNS
        </p>

        {/* Tagline */}
        <p className="text-white/80 max-w-xl mx-auto text-lg leading-relaxed mb-10">
          The stage is being set.  
          The lights are warming up.  
          Something unforgettable is coming your way.
        </p>

        {/* Info pills */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <div className="flex items-center gap-3 px-6 py-3 bg-yellow-300 text-black rounded-full font-semibold border-2 border-yellow-500 shadow-[0_5px_0_#a16207]">
            <Calendar size={18} />
            January 17–18, 2026
          </div>

          <div className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-semibold border-2 border-black shadow-[0_5px_0_#000]">
            <MapPin size={18} />
            IEM Kolkata Campus
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="h-px w-16 bg-yellow-400" />
          <span className="text-yellow-300 tracking-widest text-xs">
            COMING SOON
          </span>
          <span className="h-px w-16 bg-yellow-400" />
        </div>

        {/* Footer note */}
        <p className="text-white/60 text-sm">
          Events • Competitions • Performances • Chaos
        </p>
      </motion.div>
    </main>
  );
}
