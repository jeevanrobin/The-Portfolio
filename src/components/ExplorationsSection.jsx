import SectionDivider from "./SectionDivider";
import useReveal from "../hooks/useReveal";

const col1 = [
  { emoji:"☁️", label:"GCP Cloud", rotate:"-4deg" },
  { emoji:"🐳", label:"Docker",    rotate:"3deg"  },
  { emoji:"⚙️", label:"Jenkins",   rotate:"-2deg" },
];
const col2 = [
  { emoji:"🏗️", label:"Terraform",   rotate:"5deg"  },
  { emoji:"📊", label:"Grafana",      rotate:"-3deg" },
  { emoji:"🔐", label:"IAM Security", rotate:"2deg"  },
];

function Card({ item, delay }) {
  return (
    <div style={{
      background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)",
      borderRadius:"1.25rem", aspectRatio:"1",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.5rem",
      transform:`rotate(${item.rotate})`, transition:"transform 0.4s ease, border-color 0.3s",
      cursor:"default", userSelect:"none",
    }}
    onMouseEnter={e=>{e.currentTarget.style.transform="rotate(0deg) scale(1.06)";e.currentTarget.style.borderColor="rgba(137,170,204,0.4)"}}
    onMouseLeave={e=>{e.currentTarget.style.transform=`rotate(${item.rotate})`;e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"}}>
      <span style={{ fontSize:"2.5rem" }}>{item.emoji}</span>
      <span style={{ color:"#878787", fontSize:"0.7rem", textTransform:"uppercase", letterSpacing:"0.1em" }}>{item.label}</span>
    </div>
  );
}

export default function ExplorationsSection() {
  const [headRef, headIn] = useReveal();
  const [gridRef, gridIn] = useReveal();
  return (
    <section style={{ background:"#0a0a0a", padding:"8rem 1.5rem", borderTop:"1px solid rgba(255,255,255,0.05)", overflow:"hidden" }}>
      <div style={{ maxWidth:"56rem", margin:"0 auto" }}>
        <div ref={headRef} className={`reveal ${headIn?"is-revealed":""}`} style={{ textAlign:"center", marginBottom:"4rem" }}>
          <SectionDivider label="Explorations" />
          <h2 style={{ fontSize:"clamp(2.5rem,7vw,5rem)", fontFamily:"serif", fontStyle:"italic", color:"#f5f5f5", marginBottom:"1rem" }}>Visual <em>playground</em></h2>
          <p style={{ color:"#878787", fontSize:"0.9rem", maxWidth:"24rem", margin:"0 auto 2rem", lineHeight:1.7 }}>Tools and technologies I work with daily in cloud engineering.</p>
          <a href="https://github.com/jeevanrobin" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", fontSize:"0.8rem", color:"#878787", textDecoration:"none", borderRadius:"9999px", border:"1px solid rgba(255,255,255,0.1)", padding:"0.6rem 1.2rem" }}>
            GitHub ↗
          </a>
        </div>
        <div ref={gridRef} className={`reveal-stagger ${gridIn?"is-revealed":""}`}
          style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem", maxWidth:"420px", margin:"0 auto" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
            {col1.map(item => <Card key={item.label} item={item} />)}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem", marginTop:"3rem" }}>
            {col2.map(item => <Card key={item.label} item={item} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
