import { useEffect, useState } from "react";

export default function Loader({ onSkip }: { onSkip?: () => void }) {
  const [isMobile, setIsMobile] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    // Show skip button after 2 seconds
    const timer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "black",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999999,
      }}
    >
      {/* FULLSCREEN VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src={isMobile ? "/loader_phone.mp4" : "/loader_main.mp4"}
      />

      {/* SKIP BUTTON */}
      {showSkip && (
        <button
          onClick={onSkip}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "12px 30px",
            fontFamily: "'Rye', serif",
            fontSize: "1.1rem",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "12px",
            cursor: "pointer",
            backdropFilter: "blur(12px)",
            background: "rgba(255, 255, 255, 0.12)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            transition: "0.3s ease",
          }}
        >
          Skip Now →
        </button>
      )}
    </div>
  );
}
