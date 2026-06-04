import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SelectedWorks from "./components/SelectedWorks";
import JournalSection from "./components/JournalSection";
import ExplorationsSection from "./components/ExplorationsSection";
import StatsSection from "./components/StatsSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import AmbientBackground from "./components/AmbientBackground";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      {!isLoading && (
        <>
          {/* Global ambient layers */}
          <AmbientBackground />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main style={{ position:"relative", zIndex:2 }}>
            <HeroSection />
            <SelectedWorks />
            <JournalSection />
            <ExplorationsSection />
            <StatsSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ContactSection />
          </main>
        </>
      )}
    </>
  );
}
