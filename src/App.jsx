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

const GcpCloudArchitectureCaseStudy = lazy(() => import("./pages/GcpCloudArchitectureCaseStudy"));
const CicdPipelinePlatformCaseStudy = lazy(() => import("./pages/CicdPipelinePlatformCaseStudy"));
const KubernetesOrchestrationCaseStudy = lazy(() => import("./pages/KubernetesOrchestrationCaseStudy"));
const GCP_CASE_STUDY = "case-studies/gcp-cloud-architecture";
const CICD_CASE_STUDY = "case-studies/cicd-pipeline-platform";
const KUBERNETES_CASE_STUDY = "case-studies/kubernetes-orchestration";

export default function App() {
  const [path] = useState(() => {
    const query = window.location.search;
    if (query && query.startsWith("?/")) {
      const redirectedPath = query.slice(1).replace(/~and~/g, "&");
      window.history.replaceState(null, null, redirectedPath + window.location.hash);
      return redirectedPath.replace(/\/$/, "");
    }
    return window.location.pathname.replace(/\/$/, "") || "/";
  });
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;
    gsap.defaults({ ease: "power3.out" });
    return () => gsap.killTweensOf(".motion-target");
  }, []);

  if (path.includes(GCP_CASE_STUDY)) {
    return (
      <Suspense fallback={<div className="case-study-loading" role="status">Loading case study…</div>}>
        <GcpCloudArchitectureCaseStudy />
      </Suspense>
    );
  }

  if (path.includes(CICD_CASE_STUDY)) {
    return (
      <Suspense fallback={<div className="case-study-loading" role="status">Loading case study…</div>}>
        <CicdPipelinePlatformCaseStudy />
      </Suspense>
    );
  }

  if (path.includes(KUBERNETES_CASE_STUDY)) {
    return (
      <Suspense fallback={<div className="case-study-loading" role="status">Loading case study…</div>}>
        <KubernetesOrchestrationCaseStudy />
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
