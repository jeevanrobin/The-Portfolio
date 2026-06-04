import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const items = [
  { emoji:"☁️", label:"GCP Cloud", rotate:"-4deg" },
  { emoji:"🐳", label:"Docker", rotate:"3deg" },
  { emoji:"⚙️", label:"Jenkins", rotate:"-2deg" },
  { emoji:"🏗️", label:"Terraform", rotate:"5deg" },
  { emoji:"📊", label:"Grafana", rotate:"-3deg" },
  { emoji:"🔐", label:"IAM Security", rotate:"2deg" },
];

export default function ExplorationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const col1Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section ref={ref} style={{ background:"#0a0a0a", padding:"8rem 1.5rem", borderTop:"1px solid rgba(255,255,255,0.05)", overflow:"hidden" }}>
      <div style={{ maxWidth:"56rem", margin:"0 auto" }}>
        <motion.div style={{ textAlign:"center", marginBottom:"5rem" }}
          initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }}>
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

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem", maxWidth:"480px", margin:"0 auto" }}>
          <motion.div style={{ display:"flex", flexDirection:"column", gap:"1.5rem", y: col1Y }}>
            {items.slice(0,3).map((item, i) => (
              <motion.div key={item.label}
                style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"1.25rem", aspectRatio:"1", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.5rem", rotate:item.rotate, userSelect:"none", cursor:"default" }}
                initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:i*0.1 }}
                whileHover={{ scale:1.05, rotate:"0deg", borderColor:"rgba(137,170,204,0.4)" }}>
                <span style={{ fontSize:"2.5rem" }}>{item.emoji}</span>
                <span style={{ color:"#878787", fontSize:"0.7rem", textTransform:"uppercase", letterSpacing:"0.1em" }}>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div style={{ display:"flex", flexDirection:"column", gap:"1.5rem", marginTop:"3rem", y: col2Y }}>
            {items.slice(3,6).map((item, i) => (
              <motion.div key={item.label}
                style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"1.25rem", aspectRatio:"1", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.5rem", rotate:item.rotate, userSelect:"none", cursor:"default" }}
                initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:0.3+i*0.1 }}
                whileHover={{ scale:1.05, rotate:"0deg", borderColor:"rgba(137,170,204,0.4)" }}>
                <span style={{ fontSize:"2.5rem" }}>{item.emoji}</span>
                <span style={{ color:"#878787", fontSize:"0.7rem", textTransform:"uppercase", letterSpacing:"0.1em" }}>{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
