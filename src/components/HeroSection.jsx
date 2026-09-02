import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import VideoBackground from "./VideoBackground";
import useReducedMotion from "../hooks/useReducedMotion";
import useResumeAvailability from "../hooks/useResumeAvailability";

const MAP_NODES = [
  { id: "gcp", label: "GCP", x: 110, y: 22 },
  { id: "k8s", label: "Kubernetes · GKE", x: 110, y: 78, core: true },
  { id: "vpc", label: "VPC", x: 52, y: 132 },
  { id: "cicd", label: "CI/CD", x: 168, y: 132 },
  { id: "armor", label: "Cloud Armor", x: 52, y: 186 },
  { id: "sre", label: "SRE · Reliability", x: 110, y: 232 },
];

const MAP_LINES = [
  ["gcp", "k8s"],
  ["k8s", "vpc"],
  ["k8s", "cicd"],
  ["vpc", "armor"],
  ["armor", "sre"],
  ["cicd", "sre"],
];

const STATS = [
  { val: "8+", label: "Years in IT" },
  { val: "50+", label: "Projects" },
  { val: "GCP", label: "Certified" },
  { val: "SRE", label: "@ EY LLP" },
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const resumeReady = useResumeAvailability();
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  useEffect(() => {
    if (reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .fromTo(".hero-status", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45 })
        .fromTo(".name-reveal", { opacity: 0, y: 44, clipPath: "inset(0 0 100% 0)" }, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.9 }, "-=0.15")
        .fromTo(".hero-intro", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.35")
        .fromTo(".hero-actions", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45 }, "-=0.25")
        .fromTo(".hero-recruiter", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.2")
        .fromTo(".hero-map-line", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, stagger: 0.08, ease: "power2.out" }, "-=0.6")
        .fromTo(".hero-map-node", { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, "-=0.75")
        .fromTo(".hero-certification", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45 }, "-=0.4")
        .fromTo(".hero-stat", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, "-=0.5")
        .fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.3");
    }, heroRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="home" ref={heroRef} style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    }}>
      <VideoBackground overlay="rgba(0,0,0,0.62)" />

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        opacity: 0.018,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Accent glow */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse 55% 55% at 8% 85%, rgba(78,133,191,0.18) 0%, transparent 65%)",
      }} />

      {/* Content */}
      <div className="hero-content" style={{ position: "relative", zIndex: 10, width: "100%", padding: "8.5rem var(--gutter) 7rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div className="hero-inner">

            {/* Left: identity + positioning + CTA */}
            <div className="hero-main">
              <div className="hero-status" style={{ marginBottom: "2rem" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace",
                  color: "var(--ink-muted)", letterSpacing: "0.12em", textTransform: "uppercase",
                  border: "1px solid var(--border)", borderRadius: "99px",
                  padding: "0.35rem 0.9rem",
                  background: "rgba(255,255,255,0.025)",
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", animation: "pulseDot 2s ease-in-out infinite", flexShrink: 0 }} />
                  Available · Hyderabad, India
                </span>
              </div>

              <h1 className="name-reveal display" style={{
                fontSize: "clamp(3.5rem, 10vw, 8.25rem)",
                color: "var(--ink)",
                marginBottom: "1.75rem",
                maxWidth: "12ch",
                lineHeight: 0.9,
              }}>
                Jeevan<br />Reddy
              </h1>

              <div className="hero-intro">
                <p className="hero-role">GCP DevOps &amp; SRE Engineer</p>
                <p className="hero-lede">
                  Building cloud-native infrastructure on GCP — Kubernetes platforms, CI/CD delivery, and SRE practices that keep production systems reliable at scale.
                </p>
              </div>

              <div className="hero-actions">
                <a
                  href="#works"
                  className="hero-cta-primary"
                >
                  View work
                  <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>↓</span>
                </a>
                {resumeReady && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta-secondary"
                  >
                    View Resume ↗
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                <a
                  href="mailto:medidajeevanreddy499@gmail.com"
                  className="hero-cta-secondary"
                >
                  Get in touch ↗
                </a>
              </div>

              <nav className="hero-recruiter" aria-label="Professional links">
                <a href="https://www.linkedin.com/in/medida-jeevan-reddy-2673aa176/" target="_blank" rel="noopener noreferrer">
                  LinkedIn<span aria-hidden="true"> ↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a href="https://github.com/jeevanrobin" target="_blank" rel="noopener noreferrer">
                  GitHub<span aria-hidden="true"> ↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a href="mailto:medidajeevanreddy499@gmail.com">Email</a>
              </nav>
            </div>

            {/* Right: platform map + certification */}
            <aside className="hero-side">
              <div className="hero-map" aria-hidden="true">
                <div className="hero-map-header">
                  <span>Platform map</span>
                  <span>Documented stack</span>
                </div>
                <svg viewBox="0 0 220 250" role="presentation">
                  {MAP_LINES.map(([from, to]) => {
                    const start = MAP_NODES.find(n => n.id === from);
                    const end = MAP_NODES.find(n => n.id === to);
                    return (
                      <line
                        key={`${from}-${to}`}
                        className="hero-map-line"
                        pathLength="1"
                        x1={start.x}
                        y1={start.y}
                        x2={end.x}
                        y2={end.y}
                      />
                    );
                  })}
                  {MAP_NODES.map(node => (
                    <g key={node.id} className={`hero-map-node${node.core ? " is-core" : ""}`}>
                      <circle cx={node.x} cy={node.y} r="3.5" />
                      <text x={node.x} y={node.y - 8}>{node.label}</text>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="hero-certification">
                <span className="certification-mark" aria-hidden="true">G</span>
                <strong>GCP Professional Cloud Architect</strong>
                <span className="certification-meta">GCP certification</span>
              </div>
            </aside>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {STATS.map(({ val, label }) => (
              <div key={label} className="hero-stat">
                <strong>{val}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" style={{ position: "absolute", bottom: "2.5rem", right: "var(--gutter)", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.6rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--ink-dim)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: "1px", height: "3rem", background: "var(--border)", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, width: "100%", height: "40%", background: "var(--accent-light)", animation: "scrollDown 1.8s ease-in-out infinite" }} />
        </div>
      </div>
    </section>
  );
}
