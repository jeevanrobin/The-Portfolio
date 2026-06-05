import { useEffect, useRef, useState } from "react";

/* Section-aware aurora — changes color/position based on scroll */
const SECTION_AURAS = {
  home:        { c1:"rgba(78,133,191,0.18)",  c2:"rgba(137,170,204,0.12)", p1:"20% 20%", p2:"80% 80%" },
  works:       { c1:"rgba(60,100,180,0.12)",  c2:"rgba(100,140,220,0.08)", p1:"10% 40%", p2:"90% 60%" },
  journal:     { c1:"rgba(100,80,200,0.10)",  c2:"rgba(80,120,200,0.08)",  p1:"50% 20%", p2:"50% 80%" },
  explorations:{ c1:"rgba(60,150,120,0.09)",  c2:"rgba(80,160,140,0.07)",  p1:"30% 60%", p2:"70% 30%" },
  about:       { c1:"rgba(78,133,191,0.10)",  c2:"rgba(100,150,200,0.07)", p1:"15% 50%", p2:"85% 50%" },
  skills:      { c1:"rgba(60,100,160,0.08)",  c2:"rgba(120,160,210,0.06)", p1:"80% 20%", p2:"20% 80%" },
  experience:  { c1:"rgba(78,133,191,0.12)",  c2:"rgba(137,170,204,0.10)", p1:"25% 30%", p2:"75% 70%" },
  contact:     { c1:"rgba(78,133,191,0.20)",  c2:"rgba(137,170,204,0.15)", p1:"20% 20%", p2:"80% 80%" },
};

export default function AmbientBackground() {
  const [aura, setAura] = useState(SECTION_AURAS.home);

  useEffect(() => {
    const sections = Object.keys(SECTION_AURAS);
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setAura(SECTION_AURAS[id]); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    }).filter(Boolean);
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      {/* Section-reactive aurora */}
      <div style={{
        position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        background:`
          radial-gradient(ellipse 70% 60% at ${aura.p1}, ${aura.c1}, transparent 70%),
          radial-gradient(ellipse 60% 50% at ${aura.p2}, ${aura.c2}, transparent 65%)
        `,
        transition:"background 1.8s ease",
        filter:"blur(2px)",
      }} />

      {/* Static drifting orbs */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
        {[
          { w:700, h:700, top:"-15%",  left:"-10%",  color:"rgba(78,133,191,0.08)",   dur:"22s", delay:"0s"  },
          { w:600, h:600, top:"40%",   right:"-15%",  color:"rgba(137,170,204,0.06)",  dur:"26s", delay:"-8s" },
          { w:500, h:500, bottom:"-5%",left:"30%",    color:"rgba(60,100,200,0.05)",   dur:"30s", delay:"-14s"},
        ].map((o, i) => (
          <div key={i} style={{
            position:"absolute", width:o.w, height:o.h,
            top:o.top, left:o.left, right:o.right, bottom:o.bottom,
            borderRadius:"50%",
            background:`radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            filter:"blur(50px)",
            animation:`orbDrift${i+1} ${o.dur} ease-in-out infinite alternate`,
            animationDelay:o.delay,
            willChange:"transform",
          }} />
        ))}
      </div>

      {/* Grain noise */}
      <div style={{
        position:"fixed", inset:0, zIndex:1, pointerEvents:"none", opacity:0.025,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:"180px 180px",
      }} />
    </>
  );
}
