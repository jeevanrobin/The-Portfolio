import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const posts = [
  { title:"Setting Up GKE Clusters for Production", date:"Mar 2024", read:"5 min", emoji:"🐳", color:"rgba(78,133,191,0.2)" },
  { title:"Terraform Best Practices on GCP", date:"Jan 2024", read:"7 min", emoji:"🏗️", color:"rgba(137,170,204,0.15)" },
  { title:"Jenkins Pipeline Optimization Tips", date:"Nov 2023", read:"4 min", emoji:"⚙️", color:"rgba(191,150,78,0.15)" },
  { title:"SRE Incident Management Playbook", date:"Sep 2023", read:"6 min", emoji:"🚨", color:"rgba(100,180,100,0.12)" },
];

export default function JournalSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="journal" style={{ background:"#0a0a0a", padding:"6rem 1.5rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth:"56rem", margin:"0 auto" }} ref={ref}>
        {/* Header */}
        <motion.div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"3rem", flexWrap:"wrap", gap:"1rem" }}
          initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
              <div style={{ width:"2rem", height:"1px", background:"rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize:"0.7rem", color:"#878787", textTransform:"uppercase", letterSpacing:"0.3em" }}>Journal</span>
            </div>
            <h2 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontFamily:"serif", fontStyle:"italic", color:"#f5f5f5" }}>
              Recent <em>thoughts</em>
            </h2>
            <p style={{ color:"#878787", fontSize:"0.9rem", marginTop:"0.75rem" }}>Writings on cloud, DevOps, and site reliability.</p>
          </div>
          <a href="#" style={{ fontSize:"0.8rem", color:"#878787", textDecoration:"none", borderRadius:"9999px", border:"1px solid rgba(255,255,255,0.1)", padding:"0.6rem 1.2rem", whiteSpace:"nowrap" }}>View all →</a>
        </motion.div>

        {/* Journal pills */}
        <div style={{ display:"flex", flexDirection:"column", gap:"0.875rem" }}>
          {posts.map((p, i) => (
            <motion.div key={p.title}
              style={{ display:"flex", alignItems:"center", gap:"1.5rem", padding:"1.25rem 1.5rem", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"9999px", cursor:"pointer", transition:"border-color 0.3s, background 0.3s", overflow:"hidden", position:"relative" }}
              initial={{ opacity:0, x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.5, delay:i*0.1 }}
              whileHover={{ borderColor:"rgba(137,170,204,0.4)", background:"rgba(255,255,255,0.04)" }}>
              {/* Emoji bubble */}
              <div style={{ width:"3rem", height:"3rem", borderRadius:"9999px", background:p.color, border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.25rem", flexShrink:0 }}>
                {p.emoji}
              </div>
              {/* Title */}
              <p style={{ color:"#f5f5f5", fontSize:"0.95rem", fontWeight:500, flex:1 }}>{p.title}</p>
              {/* Meta */}
              <div style={{ display:"flex", alignItems:"center", gap:"1rem", flexShrink:0 }}>
                <span style={{ fontSize:"0.75rem", color:"#878787" }}>{p.read}</span>
                <span style={{ fontSize:"0.75rem", color:"rgba(135,135,135,0.5)" }}>{p.date}</span>
                <span style={{ fontSize:"0.875rem", color:"#878787" }}>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
