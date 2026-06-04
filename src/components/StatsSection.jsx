import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const raf = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(raf);
      else setCount(target);
    };
    requestAnimationFrame(raf);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 8, suffix: "+", label: "Years of IT Experience", desc: "Building and scaling cloud infrastructure" },
  { value: 50, suffix: "+", label: "Projects Delivered", desc: "From CI/CD pipelines to full GCP architecture" },
  { value: 3, suffix: "", label: "Enterprise Clients", desc: "EY LLP, HCL Tech, Smartried Technologies" },
];

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ background:"#0a0a0a", padding:"6rem 1.5rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth:"56rem", margin:"0 auto" }} ref={ref}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1px", background:"rgba(255,255,255,0.06)", borderRadius:"1.5rem", overflow:"hidden", border:"1px solid rgba(255,255,255,0.06)" }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} style={{ background:"#0a0a0a", padding:"3rem 2rem", textAlign:"center" }}
              initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6, delay:i*0.15 }}>
              <p style={{ fontSize:"clamp(3rem,6vw,5rem)", fontFamily:"serif", fontWeight:"bold", background:"linear-gradient(90deg,#89AACC,#4E85BF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1, marginBottom:"0.75rem" }}>
                <CountUp target={s.value} suffix={s.suffix} />
              </p>
              <h3 style={{ color:"#f5f5f5", fontWeight:600, marginBottom:"0.5rem", fontSize:"1rem" }}>{s.label}</h3>
              <p style={{ color:"#878787", fontSize:"0.8rem", lineHeight:1.6 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
