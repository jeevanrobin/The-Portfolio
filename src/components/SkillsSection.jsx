import { useState } from "react";
import useReveal from "../hooks/useReveal";

const SKILL_GROUPS = [
  { label: "Cloud Platform",   skills: ["GCP", "Compute Engine", "Cloud Run", "GKE", "BigQuery", "Cloud SQL", "Pub/Sub", "Cloud Armor"] },
  { label: "Infrastructure",   skills: ["Terraform", "Ansible", "Pulumi", "Packer", "CloudFormation"] },
  { label: "Containers",       skills: ["Docker", "Kubernetes", "Helm", "Istio", "Containerd"] },
  { label: "CI/CD",            skills: ["Jenkins", "ArgoCD", "GitLab CI", "GitHub Actions", "Spinnaker"] },
  { label: "Observability",    skills: ["Prometheus", "Grafana", "Cloud Monitoring", "PagerDuty", "Jaeger", "Loki"] },
  { label: "Networking",       skills: ["VPC", "Load Balancing", "Cloud DNS", "IAP", "Firewall Rules"] },
  { label: "Security",         skills: ["IAM", "Secret Manager", "Vault", "Trivy", "OPA", "SAST"] },
  { label: "Scripting",        skills: ["Bash", "Python", "Go", "YAML", "HCL"] },
];

function SkillCard({ group, index }) {
  const [ref, revealed] = useReveal();
  return (
    <div
      ref={ref}
      className={`skill-card reveal${revealed ? " is-revealed" : ""}`}
      style={{
        padding: "1.75rem",
        background: "var(--bg-raised)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        transitionDelay: `${index * 0.045}s`,
        transition: "border-color 0.25s var(--ease-out), background 0.25s var(--ease-out), opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out)",
      }}
      tabIndex="0"
    >
      <p style={{
        fontSize: "0.65rem",
        fontFamily: "'JetBrains Mono', monospace",
        color: "var(--ink-dim)",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        marginBottom: "1.1rem",
      }}>
        {group.label}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {group.skills.map(s => (
          <span key={s} className="tag">{s}</span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [headRef, headRevealed] = useReveal();
  const [activeGroup, setActiveGroup] = useState(null);

  return (
    <section id="skills" style={{ padding: "var(--section-gap) 0", borderTop: "1px solid var(--border)" }}>
      <div className="container">

        <div
          ref={headRef}
          className={`reveal${headRevealed ? " is-revealed" : ""}`}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1.5rem" }}
        >
          <div>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>Technical skills</p>
            <h2 className="display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)", color: "var(--ink)" }}>
              The full stack, ops side
            </h2>
          </div>
          <p style={{ fontSize: "0.83rem", color: "var(--ink-muted)", maxWidth: "32ch", lineHeight: 1.75 }}>
            8 categories across cloud, infrastructure, delivery, and reliability.
          </p>
        </div>

        <div
          className="skills-grid"
          data-active-group={activeGroup ?? ""}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {SKILL_GROUPS.map((g, i) => (
           <div key={g.label} onPointerEnter={() => setActiveGroup(g.label)} onFocus={() => setActiveGroup(g.label)} onPointerLeave={() => setActiveGroup(null)} onBlur={() => setActiveGroup(null)}>
             <SkillCard group={g} index={i} />
           </div>
          ))}
        </div>
      </div>
    </section>
  );
}
