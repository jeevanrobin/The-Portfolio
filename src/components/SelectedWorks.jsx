import { useState } from "react";
import useReveal from "../hooks/useReveal";

const works = [
  { title:"GCP Cloud Architecture",  subtitle:"EY LLP · HSBC",           tags:["Terraform","GCP","IAM"],            span:7, bg:"rgba(78,133,191,0.1)",   emoji:"☁️" },
  { title:"CI/CD Pipeline Design",   subtitle:"HCL Tech",                 tags:["Jenkins","Git","Maven"],             span:5, bg:"rgba(137,170,204,0.08)", emoji:"⚙️" },
  { title:"Kubernetes Orchestration",subtitle:"HCL Tech · GKE",           tags:["Docker","K8s","GKE"],                span:5, bg:"rgba(60,160,80,0.08)",   emoji:"🐳" },
  { title:"Infrastructure as Code",  subtitle:"Smartried Technologies",   tags:["Terraform","Ansible","IaC"],         span:7, bg:"rgba(191,140,78,0.08)",  emoji:"🏗️" },
];

function BentoCard({ w }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      gridColumn:`span ${w.span}`, height:"220px",
      background:`rgba(255,255,255,0.03)`,
      border:`1px solid ${hovered?"rgba(137,170,204,0.4)":"rgba(255,255,255,0.08)"}`,
      borderRadius:"1.25rem", overflow:"hidden", position:"relative", transition:"border-color 0.3s",
    }}
    onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      {/* Gradient bg */}
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse at 30% 50%, ${w.bg}, transparent 70%)`, transition:"opacity 0.4s", opacity:hovered?1.5:1 }} />
      {/* Dot grid */}
      <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize:"20px 20px" }} />
      {/* Emoji */}
      <div style={{ position:"absolute", right:"1.5rem", top:"50%", transform:`translateY(-50%) scale(${hovered?1.15:1}) rotate(${hovered?"8deg":"0deg"})`, fontSize:"4rem", opacity:hovered?0.3:0.1, transition:"all 0.4s ease", userSelect:"none" }}>
        {w.emoji}
      </div>
      {/* Hover blur overlay */}
      <div style={{ position:"absolute", inset:0, background:"rgba(8,8,8,0.8)", backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center", opacity:hovered?1:0, transition:"opacity 0.3s" }}>
        <span style={{ background:"rgba(245,245,245,0.9)", color:"#0a0a0a", padding:"0.45rem 1.1rem", borderRadius:"9999px", fontSize:"0.825rem", fontWeight:500 }}>
          View — <em style={{ fontFamily:"serif" }}>{w.title}</em>
        </span>
      </div>
      {/* Content */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1.25rem 1.5rem" }}>
        <div style={{ display:"flex", gap:"0.35rem", marginBottom:"0.6rem", flexWrap:"wrap" }}>
          {w.tags.map(t=><span key={t} style={{ fontSize:"0.65rem", color:"#878787", background:"rgba(0,0,0,0.5)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"9999px", padding:"0.15rem 0.55rem" }}>{t}</span>)}
        </div>
        <h3 style={{ color:"#f5f5f5", fontWeight:600, fontSize:"1.05rem", margin:"0 0 0.2rem" }}>{w.title}</h3>
        <p style={{ color:"#878787", fontSize:"0.75rem", margin:0 }}>{w.subtitle}</p>
      </div>
    </div>
  );
}

export default function SelectedWorks() {
  const [headRef, headIn] = useReveal();
  const [gridRef, gridIn] = useReveal();

  return (
    <section id="works" style={{ background:"#0a0a0a", padding:"6rem 1.5rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth:"72rem", margin:"0 auto" }}>
        <div ref={headRef} className={`reveal ${headIn?"is-revealed":""}`} style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"2.5rem", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.75rem" }}>
              <div style={{ width:"2rem", height:"1px", background:"rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize:"0.7rem", color:"#878787", textTransform:"uppercase", letterSpacing:"0.3em" }}>Selected Work</span>
            </div>
            <h2 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontFamily:"serif", fontStyle:"italic", color:"#f5f5f5", margin:0 }}>Featured <em>projects</em></h2>
            <p style={{ color:"#878787", fontSize:"0.85rem", marginTop:"0.5rem" }}>Cloud infrastructure & DevOps projects, from design to production.</p>
          </div>
          <a href="#experience" onClick={e=>{e.preventDefault();document.getElementById("experience")?.scrollIntoView({behavior:"smooth"})}}
            style={{ fontSize:"0.8rem", color:"#878787", textDecoration:"none", borderRadius:"9999px", border:"1px solid rgba(255,255,255,0.1)", padding:"0.5rem 1rem", whiteSpace:"nowrap" }}>
            View all work →
          </a>
        </div>

        <div ref={gridRef} className={`reveal-stagger ${gridIn?"is-revealed":""}`}
          style={{ display:"grid", gridTemplateColumns:"repeat(12,1fr)", gap:"1rem" }}>
          {works.map(w => <BentoCard key={w.title} w={w} />)}
        </div>
      </div>
      <style>{`@media(max-width:768px){[style*="grid-column: span 7"],[style*="grid-column: span 5"]{grid-column:span 12!important}}`}</style>
    </section>
  );
}
