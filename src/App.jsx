import { lazy, Suspense, useEffect, useState } from "react";
import { gsap } from "gsap";
import Navbar from "./components/Navbar";
import AmbientBackground from "./components/AmbientBackground";
import NetworkOverlay from "./components/NetworkOverlay";
import ScrollProgress from "./components/ScrollProgress";
import HeroSection from "./components/HeroSection";
import SelectedWorks from "./components/SelectedWorks";
import StatsSection from "./components/StatsSection";
import AboutSection from "./components/AboutSection";
import HowIWork from "./components/HowIWork";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import { matchCaseStudy, stripBase, withBase } from "./lib/paths";

const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));

// Resolve the current route. public/404.html bounces deep links on GitHub Pages
// to "<base>?/case-studies/<slug>"; restore the real URL before rendering.
function getInitialRoute() {
  const { search, pathname, hash } = window.location;
  if (search.startsWith("?/")) {
    const redirected = search.slice(1).replace(/~and~/g, "&");
    window.history.replaceState(null, "", withBase(redirected) + hash);
    return stripBase(withBase(redirected));
  }
  return stripBase(pathname);
}

export default function App() {
  const [route] = useState(getInitialRoute);
  const caseStudySlug = matchCaseStudy(route);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;
    gsap.defaults({ ease: "power3.out" });
    return () => gsap.killTweensOf(".motion-target");
  }, []);

  if (caseStudySlug) {
    return (
      <Suspense fallback={<div className="case-study-loading" role="status">Loading case study…</div>}>
        <CaseStudyPage slug={caseStudySlug} />
      </Suspense>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <AmbientBackground />
      <NetworkOverlay />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" tabIndex="-1" style={{ position:"relative", zIndex:2 }}>
        <HeroSection />
        <SelectedWorks />
        <StatsSection />
        <AboutSection />
        <HowIWork />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
}
