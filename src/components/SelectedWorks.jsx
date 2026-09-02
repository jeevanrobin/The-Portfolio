import useReveal from "../hooks/useReveal";
import ProjectScrollStack from "./ProjectScrollStack";
import SpotlightProjectCard from "./SpotlightProjectCard";

const WORKS = [
  {
    id: "01",
    title: "GCP Cloud Architecture",
    desc: "Designed multi-region infrastructure with VPC peering, Cloud Armor WAF, and automated failover. 40% latency reduction.",
    tags: ["GCP", "Terraform", "VPC", "Cloud Armor"],
    span: 7,
    year: "2024",
    caseStudy: "/The-Portfolio/case-studies/gcp-cloud-architecture",
  },
  {
    id: "02",
    title: "CI/CD Pipeline Platform",
    desc: "End-to-end delivery pipeline using Jenkins, ArgoCD, and GKE. Deploy-to-prod in under 8 minutes with full rollback.",
    tags: ["Jenkins", "ArgoCD", "GKE", "Docker"],
    span: 5,
    year: "2023",
    caseStudy: "/The-Portfolio/case-studies/cicd-pipeline-platform",
  },
  {
    id: "03",
    title: "Kubernetes Orchestration",
    desc: "200+ microservices on GKE with HPA, PDB, and custom operators. 99.97% uptime SLA across 3 production clusters.",
    tags: ["Kubernetes", "Helm", "Prometheus"],
    span: 5,
    year: "2023",
    caseStudy: "/The-Portfolio/case-studies/kubernetes-orchestration",
  },
  {
    id: "04",
    title: "Infrastructure as Code",
    desc: "Full-stack IaC with Terraform modules, Ansible playbooks, and GitOps. 100% reproducible across dev/staging/prod.",
    tags: ["Terraform", "Ansible", "GitOps"],
    span: 7,
    year: "2022",
  },
];

const SYSTEMS = {
  "01": {
    labels: ["Terraform", "Multi-region", "VPC peering", "Cloud Armor", "Failover"],
    lines: [[18, 50, 42, 28], [18, 50, 42, 72], [42, 28, 74, 28], [42, 72, 74, 72]],
    nodes: [[18, 50], [42, 28], [42, 72], [74, 28], [74, 72]],
  },
  "02": {
    labels: ["Jenkins", "Docker", "ArgoCD", "GKE", "Production", "Rollback"],
    lines: [[14, 50, 38, 28], [14, 50, 38, 72], [38, 28, 68, 50], [38, 72, 68, 50], [68, 50, 88, 28], [68, 50, 88, 72]],
    nodes: [[14, 50], [38, 28], [38, 72], [68, 50], [88, 28], [88, 72]],
  },
  "03": {
    labels: ["GKE", "Services", "HPA", "PDB", "Helm", "Prometheus"],
    lines: [[18, 50, 42, 28], [18, 50, 42, 72], [42, 28, 72, 28], [42, 72, 72, 72], [72, 28, 88, 50], [72, 72, 88, 50]],
    nodes: [[18, 50], [42, 28], [42, 72], [72, 28], [72, 72], [88, 50]],
  },
  "04": {
    labels: ["Terraform", "Ansible", "GitOps", "Dev", "Staging", "Prod"],
    lines: [[16, 50, 40, 28], [16, 50, 40, 72], [40, 28, 72, 28], [40, 72, 72, 72], [72, 28, 88, 50], [72, 72, 88, 50]],
    nodes: [[16, 50], [40, 28], [40, 72], [72, 28], [72, 72], [88, 50]],
  },
};

function SystemVisual({ id }) {
  const system = SYSTEMS[id];
  return (
    <div className="project-system-visual" aria-hidden="true">
      <svg viewBox="0 0 100 100" role="presentation">
        {system.lines.map((line, index) => <line key={index} x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} />)}
        {system.nodes.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="2.2" />)}
      </svg>
      <div className="project-system-labels">
        {system.labels.map(label => <span key={label}>{label}</span>)}
      </div>
    </div>
  );
}

function WorkCard({ work }) {
  const [ref, revealed] = useReveal();
  return (
    <SpotlightProjectCard
      className={`project-stack-card reveal-scale${revealed ? " is-revealed" : ""}`}
      ref={ref}
      href={work.caseStudy}
    >
      <div className="project-card-grid" aria-hidden="true" />
      <div className="project-card-index" aria-hidden="true">{work.id}</div>
      <div className="project-card-topline">
        <span>SYS / PROJECT {work.id}</span>
        <span>{work.year}</span>
      </div>

      <div className="project-card-content">
        <p className="project-card-kicker">Infrastructure narrative</p>
        <h3>{work.title}</h3>
        <p className="project-card-description">{work.desc}</p>
      </div>

      <SystemVisual id={work.id} />

      <div className="project-card-footer">
        <span className="project-card-status"><i /> Operational scope</span>
        {work.caseStudy && <span className="project-card-link-label">View case study ↗</span>}
        <div className="project-card-tags">
        {work.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </SpotlightProjectCard>
  );
}

export default function SelectedWorks() {
  const [headRef, headRevealed] = useReveal();

  return (
    <section id="works" className="works-section">
      <div className="works-heading container">

        {/* Header */}
         <div
          ref={headRef}
          className={`reveal${headRevealed ? " is-revealed" : ""}`}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3.5rem", flexWrap: "wrap", gap: "1.5rem" }}
         >
          <div>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>Selected work</p>
            <h2 className="section-title">
              Projects that matter
            </h2>
          </div>
          <p style={{ fontSize: "0.83rem", color: "var(--ink-muted)", maxWidth: "34ch", lineHeight: 1.75 }}>
            Infrastructure and automation work across enterprise SaaS and cloud-native platforms.
          </p>
        </div>

        </div>
        <div className="works-stage">
          <ProjectScrollStack>
            {WORKS.map(w => <WorkCard key={w.id} work={w} />)}
          </ProjectScrollStack>
        </div>
    </section>
  );
}
