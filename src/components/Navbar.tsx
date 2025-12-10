import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Ticket, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import fairyLights from "/Fairy-lights-small.svg";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Schedule", href: "/schedule" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute top-4 left-0 right-0 z-50"
    >
      <div className="flex flex-col items-center justify-center px-4">
        {/* ================= NAV PILL ================= */}
        <div
          className={`
            w-full max-w-7xl
            rounded-full
            px-6 md:px-10
            py-3
            flex items-center justify-between
            border border-white/10
            backdrop-blur-xl
            transition-all duration-300
            ${isScrolled ? "bg-black/75 shadow-2xl" : "bg-black/55"}
          `}
        >
          {/* ================= LOGO ================= */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/pactlogo.png"
              alt="PACT logo"
              className="h-14 md:h-15 w-auto object-contain brightness-110 contrast-125"
            />
          </Link>

          {/* ================= DESKTOP ROUTES ================= */}
          <div className="hidden lg:flex items-center gap-20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`
                  relative
                  font-['Playfair_Display']
                  text-[1.1rem]
                  tracking-tight
                  transition-colors
                  ${
                    location.pathname === link.href
                      ? "text-yellow-400"
                      : "text-white/85 hover:text-yellow-300"
                  }
                `}
              >
                {link.name}

                <span
                  className={`
                    absolute -bottom-1 left-0 h-[2px] bg-yellow-400
                    transition-all duration-300
                    ${
                      location.pathname === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }
                  `}
                />
              </Link>
            ))}
          </div>

          {/* ================= CTA ================= */}
          <div className="hidden lg:block">
            <Link
              to="/auth"
              className="
                relative group
                flex items-center gap-3
                bg-[#f59e0b] hover:bg-[#fbbf24]
                text-amber-950
                px-6 py-3
                font-black text-sm
                uppercase tracking-wider
                border-2 border-amber-700
                transition-all transform
                hover:-translate-y-0.5
                shadow-[0_5px_0_#b45309]
                active:translate-y-0 active:shadow-none
              "
              style={{
                clipPath:
                  "polygon(16px 0, 100% 0, 100% 100%, 16px 100%, 0 50%)",
              }}
            >
              <span className="border-r border-amber-800/30 pr-3">
                <Ticket size={18} />
              </span>
              Register Now
              <ArrowRight
                size={16}
                className="opacity-0 group-hover:opacity-100 -ml-3 group-hover:ml-0 transition-all"
              />
            </Link>
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className="w-[95%] px-6 max-w-7xl h-[8vh] pointer-events-none">
          <img
            src={fairyLights}
            alt="Fairy Lights"
            className="object-contain"
          />
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              lg:hidden
              mt-4 mx-4
              rounded-3xl
              bg-black/85
              backdrop-blur-xl
              border border-white/10
              shadow-2xl
            "
          >
            <div className="px-6 py-6 flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="
                    font-['Playfair_Display']
                    text-[1.15rem]
                    text-white/85 hover:text-yellow-400
                  "
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/auth"
                className="
                  mt-2
                  inline-flex justify-center items-center gap-3
                  bg-[#f59e0b]
                  text-amber-950
                  px-6 py-3
                  font-black text-sm
                  uppercase tracking-wider
                  border-2 border-amber-700
                  shadow-[0_5px_0_#b45309]
                "
                style={{
                  clipPath:
                    "polygon(16px 0, 100% 0, 100% 100%, 16px 100%, 0 50%)",
                }}
              >
                <Ticket size={18} />
                Register Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
