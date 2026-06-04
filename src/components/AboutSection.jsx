import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const card = { background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"1rem", padding:"1.5rem", position:"relative", overflow:"hidden", transition:"border-color 0.3s" };
const exps = [
  { company:"EY LLP", client:"Client: HSBC", role:"GCP DevOps Engineer / SRE", period:"June 2024 – Present", current:true },
  { company:"HCL Tech", client:"", role:"DevOps Engineer & SRE", period:"June 2021 – June 2023", current:false },
  { company:"Smartried Technologies", client:"", role:"DevOps Engineer", period:"June 2017 – May 2021", current:false },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" style={{ background:"#0a0a0a", padding:"6rem 1.5rem" }}>
      <div style={{ maxWidth:"56rem", margin:"0 auto" }} ref={ref}>
        <motion.div style={{ marginBottom:"3.5rem" }} initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
            <div style={{ width:"2rem", height:"1px", background:"rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize:"0.7rem", color:"#878787", textTransform:"uppercase", letterSpacing:"0.3em" }}>About Me</span>
          </div>
          <h2 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontFamily:"serif", fontStyle:"italic", color:"#f5f5f5", marginBottom:"1rem" }}>Who I <em>am</em></h2>
          <p style={{ color:"#878787", fontSize:"0.95rem", maxWidth:"40rem", lineHeight:1.8 }}>
            Having <strong style={{color:"#f5f5f5"}}>8+ years of IT experience</strong> and <strong style={{color:"#f5f5f5"}}>6.5+ years as a DevOps/SRE</strong>, with expertise in GCP, Containerization, CI/CD, and Infrastructure Automation. Currently at <strong style={{color:"#89AACC"}}>EY LLP (Client: HSBC)</strong> ensuring production stability and system reliability.
          </p>
        </motion.div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1rem" }}>
          {exps.map((exp, i) => (
            <motion.div key={exp.company} style={card} initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6, delay:i*0.1 }}>
              {exp.current && (
                <span style={{ display:"inline-flex", alignItems:"center", gap:"0.375rem", fontSize:"0.6rem", textTransform:"uppercase", letterSpacing:"0.1em", color:"#89AACC", marginBottom:"0.75rem" }}>
                  <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#89AACC", animation:"pulseDot 2s ease-in-out infinite" }} />
                  Current
                </span>
              )}
              <h3 style={{ color:"#f5f5f5", fontWeight:600, fontSize:"1.1rem" }}>{exp.company}</h3>
              {exp.client && <p style={{ color:"#89AACC", fontSize:"0.75rem", marginTop:"0.2rem" }}>{exp.client}</p>}
              <p style={{ color:"#878787", fontSize:"0.85rem", marginTop:"0.5rem" }}>{exp.role}</p>
              <p style={{ color:"rgba(135,135,135,0.5)", fontSize:"0.75rem", marginTop:"0.75rem", paddingTop:"0.75rem", borderTop:"1px solid rgba(255,255,255,0.06)" }}>{exp.period}</p>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"2px", background:"linear-gradient(90deg,#89AACC,#4E85BF)", opacity:0, transition:"opacity 0.3s" }}
                onMouseEnter={e=>e.target.style.opacity="1"} onMouseLeave={e=>e.target.style.opacity="0"} />
            </motion.div>
          ))}
        </div>

        <motion.div style={{ ...card, marginTop:"1rem", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"0.5rem" }}
          initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6, delay:0.4 }}>
          <div>
            <p style={{ fontSize:"0.65rem", color:"#878787", textTransform:"uppercase", letterSpacing:"0.3em", marginBottom:"0.25rem" }}>Education</p>
            <h3 style={{ color:"#f5f5f5", fontWeight:600 }}>B.Tech — JNTU Hyderabad</h3>
          </div>
          <p style={{ color:"#878787", fontSize:"0.85rem" }}>2017 · 62%</p>
        </motion.div>
      </div>
      <style>{`@keyframes pulseDot{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </section>
  );
}
