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
      "Run production reliability for a QlikSense analytics platform on GCP across DEV, UAT, pre-production, production and DR, in a regulated banking environment.",
      "Set up Cloud Armor WAF policies with OWASP rules for every environment, tested in preview mode first, then enforced and tuned from the logs.",
      "Moved applications from TCP to HTTPS load balancers: forwarding rules, proxies, URL maps, backend services, health checks, static IPs, firewall rules and Cloud DNS.",
      "Renewed SSL certificates and fixed IAM, firewall, policy and vulnerability findings so accounts keep only the access they need.",
      "Ran DR tests with failover and failback using Managed Instance Groups, Storage Transfer Service and disk snapshots; built and tested golden VM images.",
      "Handled monthly patching and Windows Server upgrades with snapshots, post-checks and rollback plans; scheduled daily Cloud SQL backups.",
      "Cut cloud cost by rightsizing VMs, removing unused disks and servers, and stopping VMs automatically on weekends.",
    ],
    tags: ["GCP", "Cloud Armor", "Load Balancing", "IAM", "DR", "Jenkins", "Nexus", "Cloud Monitoring", "ServiceNow"],
  },
  {
    period: "June 2021 – June 2023",
    role: "DevOps Engineer & SRE",
    company: "HCL Technologies",
    client: "",
    location: "Hyderabad, India",
    current: false,
    bullets: [
      "Wrote reusable Terraform modules for Compute Engine, VPC, IAM, Cloud Storage and Load Balancer so resources were created the same way in every environment.",
      "Set up Jenkins master and agent nodes for parallel builds, connected to Git webhooks so builds and deployments start automatically.",
      "Wrote Dockerfiles to package applications and deployed them on Kubernetes and GKE.",
      "Set up monitoring and alerts with Cloud Monitoring, Cloud Logging, Grafana and Prometheus.",
      "Investigated production incidents and found root causes as part of the SRE team.",
      "Automated daily tasks with Python and used Ansible to deploy applications and set up servers.",
    ],
    tags: ["Terraform", "Jenkins", "Git", "Maven", "Ansible", "Docker", "Kubernetes", "GKE", "Grafana", "Prometheus"],
  },
  {
    period: "June 2017 – May 2021",
    role: "DevOps Engineer",
    company: "Smartried Technologies",
    client: "",
    location: "Hyderabad, India",
    current: false,
    bullets: [
      "Set up Jenkins and Maven builds that produce JAR and WAR files from source code.",
      "Installed SonarQube and connected it to Jenkins to check code quality during builds.",
      "Managed Git and GitHub branches, merges and releases for the application teams.",
      "Used Ansible playbooks to deploy applications to Apache Tomcat servers.",
      "Managed Linux servers and Compute Engine VMs: packages, networks and subnets, and deployment issues.",
      "Set up basic alerts in Cloud Monitoring and Cloud Logging, and worked with Docker, Kubernetes and Terraform as the team adopted them.",
    ],
    tags: ["Jenkins", "Maven", "SonarQube", "Git", "Ansible", "Tomcat", "Linux", "Compute Engine"],
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
