import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { EventCarousel } from "@/components/EventCarousel";
import { AboutSection } from "@/components/AboutSection";
import { CountdownSection } from "@/components/CountdownSection";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";

import pactBg from "/pact.png";

const Home = () => {
  useEffect(() => {
    console.log("Home component mounted");
  }, []);

  return (
    <>
      <Helmet>
        <title>
          IEMPACT 2026 - College Cultural Fest | Where Tradition Meets
          Innovation
        </title>
        <meta
          name="description"
          content="Experience IEMPACT 2026, the largest college cultural fest featuring live performances, competitions, workshops, and more. March 15-17, 2026."
        />
      </Helmet>

      {/* ✅ ROOT WRAPPER — LIGHT, NO OVERLAY */}
      <div className="relative w-full overflow-x-hidden">
        {/* ✅ BACKGROUND IMAGE — AS IS (NO DARKENING) */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            backgroundImage: `url(${pactBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "brightness(0.5)",
          }}
        />

        {/* ✅ CONTENT */}
        <div className="relative z-10 min-h-screen">
          <Navbar />

          <main className="relative space-y-24">
            <HeroSection />
            <CountdownSection />
            <EventCarousel />
            <AboutSection />
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
