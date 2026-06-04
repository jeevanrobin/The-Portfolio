import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const works = [
  {
    title: "GCP Cloud Architecture",
    subtitle: "EY LLP · HSBC",
    tags: ["Terraform", "GCP", "IAM"],
    span: "md:col-span-7",
    bg: "linear-gradient(135deg, rgba(78,133,191,0.15) 0%, rgba(10,10,10,0) 60%)",
    emoji: "☁️",
  },
  {
    title: "CI/CD Pipeline Design",
    subtitle: "HCL Tech",
    tags: ["Jenkins", "Git", "Maven"],
    span: "md:col-span-5",
    bg: "linear-gradient(135deg, rgba(137,170,204,0.12) 0%, rgba(10,10,10,0) 60%)",
    emoji: "⚙️",
  },
  {
    title: "Kubernetes Orchestration",
    subtitle: "HCL Tech · GKE",
    tags: ["Docker", "K8s", "GKE"],
    span: "md:col-span-5",
    bg: "linear-gradient(135deg, rgba(100,160,100,0.1) 0%, rgba(10,10,10,0) 60%)",
    emoji: "🐳",
  },
  {
    title: "Infrastructure as Code",
    subtitle: "Smartried Technologies",
    tags: ["Terraform", "Ansible", "IaC"],
    span: "md:col-span-7",
    bg: "linear-gradient(135deg, rgba(191,140,78,0.1) 0%, rgba(10,10,10,0) 60%)",
    emoji: "🏗️",
  },
];

export default function SelectedWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="works" style={{ background:"#0a0a0a", padding:"6rem 1.5rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth:"75rem", margin:"0 auto" }} ref={ref}>
        {/* Header */}
        <motion.div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"3rem", flexWrap:"wrap", gap:"1rem" }}
          initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
              <div style={{ width:"2rem", height:"1px", background:"rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize:"0.7rem", color:"#878787", textTransform:"uppercase", letterSpacing:"0.3em" }}>Selected Work</span>
            </div>
            <h2 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontFamily:"serif", fontStyle:"italic", color:"#f5f5f5", lineHeight:1.1 }}>
              Featured <em>projects</em>
            </h2>
            <p style={{ color:"#878787", fontSize:"0.9rem", marginTop:"0.75rem", maxWidth:"28rem" }}>
              A selection of cloud infrastructure and DevOps projects, from design to production.
            </p>
          </div>
          <a href="#experience" onClick={e=>{e.preventDefault();document.getElementById("experience")?.scrollIntoView({behavior:"smooth"})}}
            style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", fontSize:"0.8rem", color:"#878787", textDecoration:"none", borderRadius:"9999px", border:"1px solid rgba(255,255,255,0.1)", padding:"0.6rem 1.2rem", transition:"color 0.2s, border-color 0.2s", whiteSpace:"nowrap" }}
            onMouseEnter={e=>{e.currentTarget.style.color="#f5f5f5";e.currentTarget.style.borderColor="rgba(137,170,204,0.5)"}}
            onMouseLeave={e=>{e.currentTarget.style.color="#878787";e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"}}>
            View all work →
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(12,1fr)", gap:"1.25rem" }}>
          {works.map((w, i) => (
            <motion.div key={w.title}
              style={{ gridColumn: `span 12`, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"1.5rem", overflow:"hidden", position:"relative", cursor:"pointer", aspectRatio: i%2===0?"16/9":"4/3" }}
              className={w.span}
              initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6, delay:i*0.1 }}
              whileHover="hover"
            >
              {/* Background gradient */}
              <div style={{ position:"absolute", inset:0, background:w.bg }} />
              {/* Grid pattern */}
              <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
              {/* Big emoji */}
              <motion.div style={{ position:"absolute", right:"2rem", bottom:"1.5rem", fontSize:"5rem", opacity:0.15, userSelect:"none" }}
                variants={{ hover:{ opacity:0.3, scale:1.1, rotate:5 } }} transition={{ duration:0.4 }}>
                {w.emoji}
              </motion.div>
              {/* Hover overlay */}
              <motion.div style={{ position:"absolute", inset:0, background:"rgba(10,10,10,0.7)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center" }}
                initial={{ opacity:0 }} variants={{ hover:{ opacity:1 } }} transition={{ duration:0.3 }}>
                <div style={{ textAlign:"center" }}>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(255,255,255,0.9)", color:"#0a0a0a", padding:"0.5rem 1.25rem", borderRadius:"9999px", fontSize:"0.875rem", fontWeight:500 }}>
                    View — <em style={{ fontFamily:"serif", fontStyle:"italic" }}>{w.title}</em>
                  </span>
                </div>
              </motion.div>
              {/* Content */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1.75rem" }}>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.375rem", marginBottom:"0.75rem" }}>
                  {w.tags.map(t=>(
                    <span key={t} style={{ fontSize:"0.65rem", color:"#878787", background:"rgba(0,0,0,0.5)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"9999px", padding:"0.15rem 0.6rem" }}>{t}</span>
                  ))}
                </div>
                <h3 style={{ color:"#f5f5f5", fontWeight:600, fontSize:"1.2rem", marginBottom:"0.25rem" }}>{w.title}</h3>
                <p style={{ color:"#878787", fontSize:"0.8rem" }}>{w.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`.md\:col-span-7{grid-column:span 7}.md\:col-span-5{grid-column:span 5}@media(max-width:768px){.md\:col-span-7,.md\:col-span-5{grid-column:span 12}}`}</style>
    </section>
  );
}
