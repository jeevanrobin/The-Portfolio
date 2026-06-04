import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const groups = [
  { title:"☁️ Cloud Platform", items:["Compute Engine","Cloud Storage","IAM","VPC","Cloud DNS","Load Balancer","Cloud Armor","Cloud Billing"] },
  { title:"🛠️ DevOps Tools", items:["Git","Jenkins","Ansible","Docker","Maven","SonarQube"] },
  { title:"🏗️ Infrastructure", items:["Terraform","IaC","Reusable Modules","GCP Provisioning"] },
  { title:"🐳 Containers", items:["Docker","Kubernetes","GKE","Dockerfiles"] },
  { title:"⚙️ CI/CD", items:["Jenkins Pipelines","Git Webhooks","Deploy Automation","Release Mgmt"] },
  { title:"📊 Monitoring", items:["Cloud Monitoring","Cloud Logging","Grafana","Prometheus"] },
  { title:"🔐 Security", items:["IAM Roles","Service Accounts","Cloud Armor","SSL Certs"] },
  { title:"🖥️ Scripting", items:["Shell Scripting","Python","Linux Admin","Windows"] },
  { title:"🚨 SRE", items:["Incident Mgmt","Root Cause Analysis","High Availability"] },
  { title:"📁 Source Control", items:["Git","GitHub","GitLab","Branching"] },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="skills" style={{ background:"#0a0a0a", padding:"6rem 1.5rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth:"56rem", margin:"0 auto" }} ref={ref}>
        <motion.div style={{ marginBottom:"3.5rem" }} initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
            <div style={{ width:"2rem", height:"1px", background:"rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize:"0.7rem", color:"#878787", textTransform:"uppercase", letterSpacing:"0.3em" }}>Technical Stack</span>
          </div>
          <h2 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontFamily:"serif", fontStyle:"italic", color:"#f5f5f5" }}>Skills & <em>Expertise</em></h2>
        </motion.div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"1rem" }}>
          {groups.map((g, i) => (
            <motion.div key={g.title} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"1rem", padding:"1.25rem" }}
              initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.5, delay:i*0.03 }}>
              <h3 style={{ color:"#f5f5f5", fontSize:"0.85rem", fontWeight:500, marginBottom:"0.75rem" }}>{g.title}</h3>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.375rem" }}>
                {g.items.map(item => (
                  <span key={item} style={{ fontSize:"0.7rem", color:"#878787", background:"rgba(0,0,0,0.4)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"9999px", padding:"0.2rem 0.6rem" }}>{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
