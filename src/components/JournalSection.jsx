import useReveal from "../hooks/useReveal";

const posts = [
  { title:"Setting Up GKE Clusters for Production", date:"Mar 2024", read:"5 min", emoji:"🐳", color:"rgba(78,133,191,0.2)" },
  { title:"Terraform Best Practices on GCP",         date:"Jan 2024", read:"7 min", emoji:"🏗️", color:"rgba(137,170,204,0.15)" },
  { title:"Jenkins Pipeline Optimization Tips",      date:"Nov 2023", read:"4 min", emoji:"⚙️", color:"rgba(191,150,78,0.15)" },
  { title:"SRE Incident Management Playbook",        date:"Sep 2023", read:"6 min", emoji:"🚨", color:"rgba(100,180,100,0.12)" },
];

export default function JournalSection() {
  const [headRef, headIn] = useReveal();
  const [listRef, listIn] = useReveal();

  return (
    <section id="journal" style={{ background:"#0a0a0a", padding:"6rem 1.5rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth:"56rem", margin:"0 auto" }}>
        <div ref={headRef} className={`reveal ${headIn?"is-revealed":""}`} style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"2.5rem", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.75rem" }}>
              <div style={{ width:"2rem", height:"1px", background:"rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize:"0.7rem", color:"#878787", textTransform:"uppercase", letterSpacing:"0.3em" }}>Journal</span>
            </div>
            <h2 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontFamily:"serif", fontStyle:"italic", color:"#f5f5f5", margin:0 }}>Recent <em>thoughts</em></h2>
          </div>
          <a href="#" style={{ fontSize:"0.8rem", color:"#878787", textDecoration:"none", borderRadius:"9999px", border:"1px solid rgba(255,255,255,0.1)", padding:"0.5rem 1rem" }}>View all →</a>
        </div>

        <div ref={listRef} className={`reveal-stagger ${listIn?"is-revealed":""}`}
          style={{ display:"flex", flexDirection:"column", gap:"0.875rem" }}>
          {posts.map(p => (
            <div key={p.title} style={{ display:"flex", alignItems:"center", gap:"1.25rem", padding:"1.1rem 1.25rem", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"9999px", transition:"border-color 0.3s, background 0.3s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(137,170,204,0.35)";e.currentTarget.style.background="rgba(255,255,255,0.04)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.background="rgba(255,255,255,0.02)"}}>
              <div style={{ width:"2.75rem", height:"2.75rem", borderRadius:"9999px", background:p.color, border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.15rem", flexShrink:0 }}>{p.emoji}</div>
              <p style={{ color:"#f5f5f5", fontSize:"0.9rem", fontWeight:500, flex:1 }}>{p.title}</p>
              <div style={{ display:"flex", alignItems:"center", gap:"1rem", flexShrink:0 }}>
                <span style={{ fontSize:"0.75rem", color:"#878787" }}>{p.read}</span>
                <span style={{ fontSize:"0.75rem", color:"rgba(135,135,135,0.5)" }}>{p.date}</span>
                <span style={{ color:"#878787" }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
