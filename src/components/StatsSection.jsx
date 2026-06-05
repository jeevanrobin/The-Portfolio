import SectionDivider from "./SectionDivider";
import { useRef, useEffect, useState } from "react";
import useReveal from "../hooks/useReveal";

function CountUp({ target, suffix="", duration=2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){setStarted(true);obs.disconnect();} }, { threshold:0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const raf = (now) => {
      const p = Math.min((now-start)/duration,1);
      setCount(Math.floor((1-Math.pow(1-p,3))*target));
      if(p<1) requestAnimationFrame(raf); else setCount(target);
    };
    requestAnimationFrame(raf);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value:8,  suffix:"+", label:"Years of IT Experience",  desc:"Building and scaling cloud infrastructure" },
  { value:50, suffix:"+", label:"Projects Delivered",       desc:"From CI/CD pipelines to full GCP architecture" },
  { value:3,  suffix:"",  label:"Enterprise Clients",       desc:"EY LLP, HCL Tech, Smartried Technologies" },
];

export default function StatsSection() {
  const [ref, revealed] = useReveal();
  return (
    <section style={{ background:"#0a0a0a", padding:"6rem 1.5rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth:"56rem", margin:"0 auto" }}>
        <div ref={ref} className={`reveal-stagger ${revealed?"is-revealed":""}`}
          style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1px", background:"rgba(255,255,255,0.06)", borderRadius:"1.5rem", overflow:"hidden", border:"1px solid rgba(255,255,255,0.06)" }}>
          {stats.map(s => (
            <div key={s.label} style={{ background:"#0a0a0a", padding:"3rem 2rem", textAlign:"center" }}>
              <p style={{ fontSize:"clamp(3rem,6vw,5rem)", fontFamily:"serif", fontWeight:"bold", background:"linear-gradient(90deg,#89AACC,#4E85BF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1, marginBottom:"0.75rem" }}>
                <CountUp target={s.value} suffix={s.suffix} />
              </p>
              <h3 style={{ color:"#f5f5f5", fontWeight:600, marginBottom:"0.5rem", fontSize:"1rem" }}>{s.label}</h3>
              <p style={{ color:"#878787", fontSize:"0.8rem", lineHeight:1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
