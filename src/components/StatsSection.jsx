import { useRef, useEffect, useState } from "react";
import useReveal from "../hooks/useReveal";

function CountUp({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }
    let frameId;
    const start = performance.now();
    const raf = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) frameId = requestAnimationFrame(raf);
      else setCount(target);
    };
    frameId = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(frameId);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  { value: 8,  suffix: "+", label: "Years experience",  sub: "Cloud & DevOps engineering" },
  { value: 50, suffix: "+", label: "Projects shipped",   sub: "From pipelines to full GCP architecture" },
  { value: 3,  suffix: "",  label: "Enterprise clients", sub: "EY LLP · HCL Technologies · Smartried" },
  { value: 99, suffix: ".9%", label: "Uptime target",   sub: "SRE-grade reliability SLOs" },
];

export default function StatsSection() {
  const [ref, revealed] = useReveal();

  return (
    <section id="stats" className="telemetry-strip" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div
        ref={ref}
        className={`reveal-stagger${revealed ? " is-revealed" : ""}`}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "3.5rem clamp(1.5rem, 3vw, 2.5rem)",
              borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            <p style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
              color: "var(--ink)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}>
              <CountUp target={s.value} suffix={s.suffix} />
            </p>
            <p style={{ fontSize: "0.82rem", color: "var(--ink)", fontWeight: 500, marginTop: "0.5rem" }}>{s.label}</p>
            <p style={{ fontSize: "0.72rem", color: "var(--ink-dim)", lineHeight: 1.6 }}>{s.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
