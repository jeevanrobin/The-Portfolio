import { useRef, useEffect, useState } from "react";

export default function SectionDivider({ label }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"1.25rem" }}>
      {/* Left line */}
      <div style={{
        height:"1px",
        width: visible ? "2rem" : "0px",
        background:"linear-gradient(90deg, transparent, rgba(137,170,204,0.6))",
        transition:"width 0.8s cubic-bezier(0.25,0.1,0.25,1)",
        transitionDelay:"0.1s",
        flexShrink: 0,
      }} />

      {/* Label */}
      <span style={{
        fontSize:"0.68rem",
        color: visible ? "rgba(137,170,204,0.8)" : "transparent",
        textTransform:"uppercase",
        letterSpacing:"0.35em",
        transition:"color 0.6s ease",
        transitionDelay:"0.3s",
        whiteSpace:"nowrap",
      }}>{label}</span>

      {/* Right line — grows full width */}
      <div style={{
        height:"1px",
        flex:1,
        background:"linear-gradient(90deg, rgba(137,170,204,0.4), transparent)",
        transformOrigin:"left",
        transform: visible ? "scaleX(1)" : "scaleX(0)",
        transition:"transform 1s cubic-bezier(0.25,0.1,0.25,1)",
        transitionDelay:"0.2s",
      }} />
    </div>
  );
}
