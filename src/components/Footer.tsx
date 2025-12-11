import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#3a0000] pt-20 pb-10 overflow-hidden border-t border-white/10">
      {/* Soft Gold Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[380px] bg-gradient-to-b from-yellow-500/10 to-transparent blur-[90px]"></div>

      <div className="container mx-auto px-6 relative z-20">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* LEFT SECTION */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h1 className="font-bebas text-5xl text-yellow-400 tracking-wide">
                IMPACT <span className="text-white">2026</span>
              </h1>
            </div>


            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/iempact_2k26?igsh=eXZtZHJ4cHV5Ym1l"
              whileHover={{ y: -4 }}
              className="inline-flex items-center justify-center w-12 h-12 
                         rounded-full border border-yellow-400/40 
                         hover:border-yellow-300 hover:bg-yellow-300/10 
                         text-yellow-300 transition-all"
            >
              <Instagram size={22} />
            </motion.a>
          </div>

          {/* NAVIGATION */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-bebas text-xl text-yellow-400 tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-3 text-white/70">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/schedule">Schedule</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-bebas text-xl text-yellow-400 tracking-wide">
              Support
            </h4>
            <ul className="space-y-3 text-white/70">
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/sponsors">Sponsorship</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* CONTACT + LOCATION */}
          <div className="lg:col-span-4 space-y-6">

            <h4 className="font-bebas text-xl text-yellow-400 tracking-wide">
              Contact & Location
            </h4>

            {/* Email */}
            <div className="flex items-center gap-3 text-white/80">
              <Mail className="text-yellow-300" size={18} />
              <span>iempact@iem.edu.in</span>
            </div>

            {/* Address */}
            <div className="flex items-center gap-3 text-white/80 leading-relaxed max-w-xs">
              <MapPin className="text-yellow-300" size={18} />
              <span>
                IEM Management Building, D-1, Street No. 13, EP Block, Sector V,  
                Bidhannagar, Kolkata, West Bengal 700091
              </span>
            </div>

            {/* Map with hover zoom + soft gold border */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-xl overflow-hidden border border-white/10 hover:border-yellow-400/40 transition-all shadow-lg shadow-black/40"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3688.757907629798!2d88.42893!3d22.57566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275d524f26e31%3A0xf3aaee47cebb6a2!2sIEM%20Management%20House!5e0!3m2!1sen!2sin!4v1702399383921"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-10"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/50">
          <p>© 2026 IMPACT. All rights reserved.</p>

          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
