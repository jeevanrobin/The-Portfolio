import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const col1 = [
  { emoji:"☁️", label:"GCP Cloud", rotate:"-4deg" },
  { emoji:"🐳", label:"Docker",    rotate:"3deg"  },
  { emoji:"⚙️", label:"Jenkins",   rotate:"-2deg" },
];
const col2 = [
  { emoji:"🏗️", label:"Terraform",    rotate:"5deg"  },
  { emoji:"📊", label:"Grafana",       rotate:"-3deg" },
  { emoji:"🔐", label:"IAM Security",  rotate:"2deg"  },
];

function Card({ item, delay, inView }) {
  return (
    <motion.div
      style={{
        background:"rgba(255,255,255,0.03)",
        border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:"1.25rem",
        aspectRatio:"1",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", gap:"0.5rem",
        cursor:"default", userSelect:"none",
        willChange:"transform",
      }}
      initial={{ opacity:0, y:20 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.5, delay }}
      whileHover={{ scale:1.05, rotate:"0deg", borderColor:"rgba(137,170,204,0.4)", transition:{ duration:0.2 } }}
    >
      <span style={{ fontSize:"2.5rem" }}>{item.emoji}</span>
      <span style={{ color:"#878787", fontSize:"0.7rem", textTransform:"uppercase", letterSpacing:"0.1em" }}>{item.label}</span>
    </motion.div>
  );
}

export default function ExplorationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{ background:"#0a0a0a", padding:"8rem 1.5rem", borderTop:"1px solid rgba(255,255,255,0.05)", overflow:"hidden" }}>
      <div style={{ maxWidth:"56rem", margin:"0 auto" }}>
        <motion.div style={{ textAlign:"center", marginBottom:"5rem" }}
          initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.75rem", marginBottom:"1rem" }}>
            <div style={{ width:"2rem", height:"1px", background:"rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize:"0.7rem", color:"#878787", textTransform:"uppercase", letterSpacing:"0.3em" }}>Explorations</span>
            <div style={{ width:"2rem", height:"1px", background:"rgba(255,255,255,0.1)" }} />
          </div>
          <h2 style={{ fontSize:"clamp(2.5rem,7vw,5rem)", fontFamily:"serif", fontStyle:"italic", color:"#f5f5f5", marginBottom:"1rem" }}>
            Visual <em>playground</em>
          </h2>
          <p style={{ color:"#878787", fontSize:"0.9rem", maxWidth:"24rem", margin:"0 auto 2rem", lineHeight:1.7 }}>
            Tools and technologies I work with daily in cloud engineering.
          </p>
          <a href="https://github.com/jeevanrobin" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", fontSize:"0.8rem", color:"#878787", textDecoration:"none", borderRadius:"9999px", border:"1px solid rgba(255,255,255,0.1)", padding:"0.6rem 1.2rem" }}>
            GitHub ↗
          </a>
        </motion.div>

        {/* CSS-only offset columns — no scroll listeners */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem", maxWidth:"480px", margin:"0 auto" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
            {col1.map((item, i) => <Card key={item.label} item={item} delay={i*0.1} inView={inView} />)}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem", marginTop:"3rem" }}>
            {col2.map((item, i) => <Card key={item.label} item={item} delay={0.3+i*0.1} inView={inView} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
