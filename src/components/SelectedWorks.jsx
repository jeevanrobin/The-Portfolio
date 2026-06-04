import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const works = [
  { title:"GCP Cloud Architecture", subtitle:"EY LLP · HSBC", tags:["Terraform","GCP","IAM"], span:7, bg:"linear-gradient(135deg, rgba(78,133,191,0.12) 0%, transparent 60%)", emoji:"☁️" },
  { title:"CI/CD Pipeline Design", subtitle:"HCL Tech", tags:["Jenkins","Git","Maven"], span:5, bg:"linear-gradient(135deg, rgba(137,170,204,0.1) 0%, transparent 60%)", emoji:"⚙️" },
  { title:"Kubernetes Orchestration", subtitle:"HCL Tech · GKE", tags:["Docker","K8s","GKE"], span:5, bg:"linear-gradient(135deg, rgba(60,160,80,0.1) 0%, transparent 60%)", emoji:"🐳" },
  { title:"Infrastructure as Code", subtitle:"Smartried Technologies", tags:["Terraform","Ansible","IaC"], span:7, bg:"linear-gradient(135deg, rgba(191,140,78,0.1) 0%, transparent 60%)", emoji:"🏗️" },
];

export default function SelectedWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="works" style={{ background:"#0a0a0a", padding:"6rem 1.5rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth:"72rem", margin:"0 auto" }} ref={ref}>
        {/* Header */}
        <motion.div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"2.5rem", flexWrap:"wrap", gap:"1rem" }}
          initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.75rem" }}>
              <div style={{ width:"2rem", height:"1px", background:"rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize:"0.7rem", color:"#878787", textTransform:"uppercase", letterSpacing:"0.3em" }}>Selected Work</span>
            </div>
            <h2 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontFamily:"serif", fontStyle:"italic", color:"#f5f5f5", lineHeight:1.1, margin:0 }}>
              Featured <em>projects</em>
            </h2>
            <p style={{ color:"#878787", fontSize:"0.85rem", marginTop:"0.5rem" }}>Cloud infrastructure & DevOps projects, from design to production.</p>
          </div>
          <a href="#experience" onClick={e=>{e.preventDefault();document.getElementById("experience")?.scrollIntoView({behavior:"smooth"})}}
            style={{ fontSize:"0.8rem", color:"#878787", textDecoration:"none", borderRadius:"9999px", border:"1px solid rgba(255,255,255,0.1)", padding:"0.5rem 1rem", whiteSpace:"nowrap" }}>
            View all work →
          </a>
        </motion.div>

        {/* Bento Grid — fixed height cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(12, 1fr)", gap:"1rem" }}>
          {works.map((w, i) => (
            <motion.div key={w.title}
              style={{
                gridColumn: `span ${w.span}`,
                height: "220px",   // ← fixed height, not aspect ratio
                background:"rgba(255,255,255,0.03)",
                border:"1px solid rgba(255,255,255,0.08)",
                borderRadius:"1.25rem",
                overflow:"hidden",
                position:"relative",
                cursor:"pointer",
              }}
              initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6, delay:i*0.1 }}
              whileHover="hover"
            >
              {/* Gradient bg */}
              <div style={{ position:"absolute", inset:0, background:w.bg }} />
              {/* Grid dots */}
              <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize:"24px 24px" }} />
              {/* Big emoji */}
              <motion.div style={{ position:"absolute", right:"1.5rem", top:"50%", transform:"translateY(-50%)", fontSize:"4rem", opacity:0.12, userSelect:"none" }}
                variants={{ hover:{ opacity:0.25, scale:1.1, rotate:8 } }} transition={{ duration:0.4 }}>
                {w.emoji}
              </motion.div>
              {/* Hover blur overlay */}
              <motion.div style={{ position:"absolute", inset:0, background:"rgba(8,8,8,0.75)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center" }}
                initial={{ opacity:0 }} variants={{ hover:{ opacity:1 } }} transition={{ duration:0.25 }}>
                <span style={{ background:"rgba(245,245,245,0.92)", color:"#0a0a0a", padding:"0.45rem 1.1rem", borderRadius:"9999px", fontSize:"0.825rem", fontWeight:500 }}>
                  View — <em style={{ fontFamily:"serif", fontStyle:"italic" }}>{w.title}</em>
                </span>
              </motion.div>
              {/* Content */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1.25rem 1.5rem" }}>
                <div style={{ display:"flex", gap:"0.35rem", marginBottom:"0.6rem", flexWrap:"wrap" }}>
                  {w.tags.map(t=>(
                    <span key={t} style={{ fontSize:"0.65rem", color:"#878787", background:"rgba(0,0,0,0.5)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:"9999px", padding:"0.15rem 0.55rem" }}>{t}</span>
                  ))}
                </div>
                <h3 style={{ color:"#f5f5f5", fontWeight:600, fontSize:"1.05rem", margin:"0 0 0.2rem" }}>{w.title}</h3>
                <p style={{ color:"#878787", fontSize:"0.75rem", margin:0 }}>{w.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Responsive: on mobile all cards full width */}
      <style>{`
        @media(max-width:768px){
          [style*="grid-column: span 7"], [style*="grid-column: span 5"]{grid-column: span 12 !important;}
        }
      `}</style>
    </section>
  );
}
