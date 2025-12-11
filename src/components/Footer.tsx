import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Mail,
  MapPin,
} from "lucide-react";

const footerLinks = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Schedule", href: "/schedule" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Register", href: "/register" },
    { name: "Sponsorship", href: "/sponsors" },
    { name: "FAQ", href: "/faq" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
];

export function Footer() {
  return (
    <footer className="relative bg-background pt-20 pb-10 overflow-hidden border-t border-border/40">
      {/* Background Gradient Blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column (Left - 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-perandory text-4xl text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary group-hover:opacity-80 transition-opacity">
                IMPACT
              </span>
              <span className="font-perandory text-4xl text-foreground">2026</span>
            </Link>
            <p className="font-perandory text-foreground/60 max-w-sm leading-relaxed tracking-wide">
              Empowering the next generation of innovators. Join us for a
              transformative experience where tradition meets future technology.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ y: -5 }}
                  className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-accent hover:text-white flex items-center justify-center transition-colors border border-border/50"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns (Middle - 2 cols each) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-perandoryCondensed text-xl text-foreground tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.main.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-perandory text-sm text-foreground/60 hover:text-accent transition-colors flex items-center gap-2 group tracking-wide"
                  >
                    <span className="w-0 h-px bg-accent transition-all group-hover:w-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-perandoryCondensed text-xl text-foreground tracking-wide">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-perandory text-sm text-foreground/60 hover:text-accent transition-colors flex items-center gap-2 group tracking-wide"
                  >
                    <span className="w-0 h-px bg-accent transition-all group-hover:w-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column (Right - 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-perandoryCondensed text-xl text-foreground tracking-wide">
              Stay Updated
            </h4>
            <p className="font-perandory text-sm text-foreground/60 tracking-wide">
              Subscribe to our newsletter for the latest announcements and
              schedule updates.
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-foreground/5 border border-border/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors text-foreground placeholder:text-foreground/30 font-perandory"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-accent text-white rounded-md hover:bg-accent/80 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>

            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-3 text-sm text-foreground/60 font-perandory">
                <Mail size={16} className="text-accent" />
                <span>hello@impact2026.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/60 font-perandory">
                <MapPin size={16} className="text-accent" />
                <span>Kolkata, West Bengal, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-perandory text-foreground/40 tracking-wider">
          <p>© 2026 IMPACT Conference. All rights reserved.</p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Giant Decorative Text */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="whitespace-nowrap"
          >
            <span className="font-perandory text-[15vw] leading-[0.8]">
              WHERE TRADITION MEETS INNOVATION — WHERE TRADITION MEETS
              INNOVATION —
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
