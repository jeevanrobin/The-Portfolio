import { useEffect, useRef } from "react";
import useReveal from "../hooks/useReveal";

const EXPERIENCE = [
  {
    period: "June 2024 – Present",
    role: "GCP DevOps Engineer / SRE",
    company: "EY LLP",
    client: "Client: HSBC",
    location: "Hyderabad, India",
    current: true,
    bullets: [
      "Lead GCP infrastructure engineering — Compute Engine, Cloud Storage, IAM, VPC, Cloud DNS, Load Balancer, Cloud Armor, and Cloud Billing.",
      "Implemented IAM policies, service accounts, roles, and identity access management at enterprise scale.",
      "Built Terraform reusable modules for provisioning GCP resources across dev/staging/prod.",
      "Established SRE practices: SLO/SLA frameworks, incident management, and root cause analysis workflows.",
      "Reduced P1 incidents by 60% through proactive alerting, runbook automation, and on-call tooling.",
    ],
    tags: ["GCP", "Terraform", "IAM", "VPC", "Cloud Armor", "Kubernetes", "SRE"],
  },
  {
    period: "June 2021 – June 2023",
    role: "DevOps Engineer & SRE",
    company: "HCL Technologies",
    client: "",
    location: "Hyderabad, India",
    current: false,
    bullets: [
      "Configured end-to-end CI/CD pipelines using Git, Maven, Jenkins with webhook integration.",
      "Set up Jenkins master-agent nodes for distributed build execution across 30+ services.",
      "Created custom Docker images and orchestrated workloads with Kubernetes/GKE.",
      "Supported monitoring with Cloud Monitoring, Cloud Logging, Grafana, and Prometheus.",
      "Migrated on-premise workloads to GCP, reducing infrastructure costs by 35%.",
    ],
    tags: ["Jenkins", "Git", "Maven", "Ansible", "Docker", "Kubernetes", "GKE", "Terraform", "Grafana"],
  },
  {
    period: "June 2017 – May 2021",
    role: "DevOps Engineer",
    company: "Smartried Technologies",
    client: "",
    location: "Hyderabad, India",
    current: false,
    bullets: [
      "Managed GCP Compute Engine VMs and Linux-based environments for application hosting.",
      "Implemented CI/CD using Jenkins and integrated SonarQube for code quality analysis.",
      "Managed Ansible playbooks for automation, configuration management, and continuous delivery.",
      "Worked with Shell scripting and Python for operational automation tasks.",
    ],
    tags: ["GCP", "Jenkins", "SonarQube", "Ansible", "Docker", "Linux", "Kubernetes"],
  },
];

function ExpCard({ exp, delay = 0 }) {
  const [ref, revealed] = useReveal();
  return (
    <article
      ref={ref}
      className={`exp-row reveal${revealed ? " is-revealed" : ""}`}
      style={{
        display: "grid", gridTemplateColumns: "200px 1fr",
        gap: "3rem", paddingTop: "3rem", paddingBottom: "3rem",
        borderBottom: "1px solid var(--border)",
        transitionDelay: `${delay}s`,
      }}
    >
      <div className="exp-year">
        <span style={{ display: "block", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "var(--ink-dim)", lineHeight: 1.7, marginBottom: "0.5rem" }}>
          {exp.period}
        </span>
        <span style={{ display: "block", fontSize: "0.75rem", color: "var(--ink-dim)", marginBottom: "0.25rem" }}>{exp.location}</span>
        {exp.current && (
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginTop: "0.75rem", fontSize: "0.62rem", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80", animation: "pulseDot 2s ease-in-out infinite", flexShrink: 0 }} />
            Current
          </span>
        )}
      </div>

      <div>
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.2rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--ink)", fontWeight: 500 }}>{exp.role}</h3>
            <span style={{ fontSize: "0.85rem", color: "var(--ink-muted)" }}>— {exp.company}</span>
            {exp.client && <span style={{ fontSize: "0.75rem", color: "var(--accent-light)" }}>{exp.client}</span>}
          </div>
        </div>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem", marginBottom: "1.5rem" }}>
          {exp.bullets.map((b, i) => (
             <li key={i} className="exp-bullet" style={{ fontSize: "0.9rem", color: "var(--ink-muted)", lineHeight: 1.75, paddingLeft: "1rem", position: "relative" }}>
              <span style={{ position: "absolute", left: 0, top: "0.6em", width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent-light)", display: "block" }} />
              {b}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {exp.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </article>
  );
}

export default function ExperienceSection() {
  const [headRef, headRevealed] = useReveal();
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return undefined;
    const rows = [...timeline.querySelectorAll(".exp-row")];
    const update = () => {
      const midpoint = window.innerHeight * 0.48;
      rows.forEach(row => {
        const rect = row.getBoundingClientRect();
        row.classList.toggle("is-active", rect.top < midpoint && rect.bottom > midpoint);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section id="experience" style={{ padding: "7rem 0" }}>
      <div className="container">
        <div ref={headRef} className={`reveal${headRevealed ? " is-revealed" : ""}`} style={{ marginBottom: "4rem" }}>
          <p className="section-label" style={{ marginBottom: "0.6rem" }}>Experience</p>
          <h2 className="display" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--ink)" }}>
            8+ years in IT
          </h2>
        </div>

        <div ref={timelineRef} className="experience-timeline" style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {EXPERIENCE.map((exp, i) => (
            <ExpCard key={exp.company} exp={exp} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
