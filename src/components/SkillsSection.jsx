import useReveal from "../hooks/useReveal";

const groups = [
  { title:"☁️ Cloud Platform", items:["Compute Engine","Cloud Storage","IAM","VPC","Cloud DNS","Load Balancer","Cloud Armor","Cloud Billing"] },
  { title:"🛠️ DevOps Tools",   items:["Git","Jenkins","Ansible","Docker","Maven","SonarQube"] },
  { title:"🏗️ Infrastructure", items:["Terraform","IaC","Reusable Modules","GCP Provisioning"] },
  { title:"🐳 Containers",     items:["Docker","Kubernetes","GKE","Dockerfiles"] },
  { title:"⚙️ CI/CD",          items:["Jenkins Pipelines","Git Webhooks","Deploy Automation","Release Mgmt"] },
  { title:"📊 Monitoring",     items:["Cloud Monitoring","Cloud Logging","Grafana","Prometheus"] },
  { title:"🔐 Security",       items:["IAM Roles","Service Accounts","Cloud Armor","SSL Certs"] },
  { title:"🖥️ Scripting",      items:["Shell Scripting","Python","Linux Admin","Windows"] },
  { title:"🚨 SRE",            items:["Incident Mgmt","Root Cause Analysis","High Availability"] },
  { title:"📁 Source Control", items:["Git","GitHub","GitLab","Branching"] },
];

export default function SkillsSection() {
  const [headRef, headIn] = useReveal();
  const [gridRef, gridIn] = useReveal();

  return (
    <section id="skills" style={{ background:"#0a0a0a", padding:"6rem 1.5rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth:"56rem", margin:"0 auto" }}>
        <div ref={headRef} className={`reveal ${headIn?"is-revealed":""}`} style={{ marginBottom:"3rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
            <div style={{ width:"2rem", height:"1px", background:"rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize:"0.7rem", color:"#878787", textTransform:"uppercase", letterSpacing:"0.3em" }}>Technical Stack</span>
          </div>
          <h2 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontFamily:"serif", fontStyle:"italic", color:"#f5f5f5" }}>Skills & <em>Expertise</em></h2>
        </div>

        <div ref={gridRef} className={`reveal-stagger ${gridIn?"is-revealed":""}`}
          style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1rem" }}>
          {groups.map((g) => (
            <div key={g.title} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"1rem", padding:"1.25rem", transition:"border-color 0.3s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(137,170,204,0.35)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"}>
              <h3 style={{ color:"#f5f5f5", fontSize:"0.85rem", fontWeight:500, marginBottom:"0.75rem" }}>{g.title}</h3>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.375rem" }}>
                {g.items.map(item => (
                  <span key={item} style={{ fontSize:"0.7rem", color:"#878787", background:"rgba(0,0,0,0.4)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"9999px", padding:"0.2rem 0.6rem", transition:"color 0.2s, border-color 0.2s" }}
                    onMouseEnter={e=>{e.target.style.color="#f5f5f5";e.target.style.borderColor="rgba(137,170,204,0.4)"}}
                    onMouseLeave={e=>{e.target.style.color="#878787";e.target.style.borderColor="rgba(255,255,255,0.07)"}}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
