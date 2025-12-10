import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Schedule from "./pages/Schedule";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/auth";
import Loader from "./components/loader";

const queryClient = new QueryClient();

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Auto-hide loader after 6 seconds
    const timer = setTimeout(() => setShowLoader(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          {showLoader ? (
            <Loader onSkip={() => setShowLoader(false)} />
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
