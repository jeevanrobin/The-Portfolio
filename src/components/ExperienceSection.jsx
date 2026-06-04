import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const exps = [
  { company:"EY LLP", client:"Client: HSBC", role:"GCP DevOps Engineer / SRE", period:"June 2024 – Present", current:true,
    tags:["GCP","Terraform","IAM","VPC","Cloud Armor","Kubernetes"],
    points:["Provisioned and managed GCP infrastructure using Terraform with reusable modules.","Worked on Compute Engine, Cloud Storage, IAM, VPC, Cloud DNS, Load Balancer, Cloud Armor, and Cloud Billing.","Implemented IAM policies, service accounts, roles, and identity access management.","Ensured system reliability through SRE practices, incident management, and root cause analysis."] },
  { company:"HCL Tech", client:"", role:"DevOps Engineer & SRE", period:"June 2021 – June 2023", current:false,
    tags:["Jenkins","Git","Maven","Ansible","Docker","Kubernetes","GKE","Terraform","Grafana"],
    points:["Configured end-to-end CI/CD pipelines using Git, Maven, Jenkins with webhook integration.","Set up Jenkins master-agent nodes for distributed build execution at scale.","Created custom Docker images and orchestrated workloads with Kubernetes/GKE.","Supported monitoring with Cloud Monitoring, Cloud Logging, Grafana, and Prometheus."] },
  { company:"Smartried Technologies", client:"", role:"DevOps Engineer", period:"June 2017 – May 2021", current:false,
    tags:["GCP","Jenkins","SonarQube","Ansible","Docker","Linux","Kubernetes"],
    points:["Managed GCP Compute Engine VMs and Linux-based environments for application hosting.","Implemented CI/CD using Jenkins and integrated SonarQube for code quality analysis.","Managed Ansible playbooks for automation, configuration management, and CD.","Worked with Shell scripting and Python for automation and operational tasks."] },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="experience" style={{ background:"#0a0a0a", padding:"6rem 1.5rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth:"56rem", margin:"0 auto" }} ref={ref}>
        <motion.div style={{ marginBottom:"3.5rem" }} initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem" }}>
            <div style={{ width:"2rem", height:"1px", background:"rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize:"0.7rem", color:"#878787", textTransform:"uppercase", letterSpacing:"0.3em" }}>Work History</span>
          </div>
          <h2 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontFamily:"serif", fontStyle:"italic", color:"#f5f5f5" }}>Work <em>Experience</em></h2>
        </motion.div>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          {exps.map((exp, i) => (
            <motion.div key={exp.company} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"1rem", padding:"2rem" }}
              initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6, delay:i*0.1 }}>
              <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", gap:"0.75rem", marginBottom:"1.25rem" }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.25rem" }}>
                    <h3 style={{ color:"#f5f5f5", fontWeight:600, fontSize:"1.2rem" }}>{exp.company}</h3>
                    {exp.current && (
                      <span style={{ display:"inline-flex", alignItems:"center", gap:"0.3rem", fontSize:"0.6rem", textTransform:"uppercase", color:"#89AACC", background:"rgba(137,170,204,0.1)", borderRadius:"9999px", padding:"0.2rem 0.5rem" }}>
                        <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#89AACC", animation:"pulseDot 2s ease-in-out infinite" }} />Now
                      </span>
                    )}
                  </div>
                  {exp.client && <p style={{ color:"#89AACC", fontSize:"0.8rem" }}>{exp.client}</p>}
                  <p style={{ color:"#878787", fontSize:"0.85rem", marginTop:"0.25rem" }}>{exp.role}</p>
                </div>
                <span style={{ color:"rgba(135,135,135,0.6)", fontSize:"0.8rem", whiteSpace:"nowrap" }}>{exp.period}</span>
              </div>
              <ul style={{ listStyle:"none", padding:0, margin:"0 0 1.25rem", display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                {exp.points.map(pt => (
                  <li key={pt} style={{ display:"flex", gap:"0.5rem", fontSize:"0.85rem", color:"#878787" }}>
                    <span style={{ marginTop:"0.4rem", width:"5px", height:"5px", borderRadius:"50%", background:"#89AACC", flexShrink:0 }} />{pt}
                  </li>
                ))}
              </ul>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.375rem" }}>
                {exp.tags.map(tag => (
                  <span key={tag} style={{ fontSize:"0.7rem", color:"#878787", background:"rgba(0,0,0,0.4)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"9999px", padding:"0.2rem 0.6rem" }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@keyframes pulseDot{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </section>
  );
}
