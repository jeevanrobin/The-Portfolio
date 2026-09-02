import { useEffect } from "react";
import CaseStudyArchitecture from "../components/CaseStudyArchitecture";
import CaseStudyNavigation from "../components/CaseStudyNavigation";
import CaseStudySection from "../components/CaseStudySection";
import useCaseStudyProgress from "../hooks/useCaseStudyProgress";
import "../styles/case-study.css";

const SECTION_IDS = ["kubernetes-overview", "kubernetes-context", "kubernetes-role", "kubernetes-architecture", "kubernetes-platform", "kubernetes-reliability", "kubernetes-stack", "kubernetes-outcome", "kubernetes-demonstrates"];

const NODES = [
  { id: "kubernetes", label: "Kubernetes", x: 50, y: 46 },
  { id: "clusters", label: "3 production clusters", x: 18, y: 22 },
  { id: "services", label: "200+ microservices", x: 18, y: 72 },
  { id: "hpa", label: "HPA", x: 50, y: 18 },
  { id: "pdb", label: "PDB", x: 50, y: 78 },
  { id: "helm", label: "Helm", x: 82, y: 22 },
  { id: "operators", label: "Custom operators", x: 82, y: 72 },
  { id: "prometheus", label: "Prometheus", x: 50, y: 94 },
];

const LINKS = [
  ["clusters", "kubernetes"],
  ["services", "kubernetes"],
  ["hpa", "kubernetes"],
  ["pdb", "kubernetes"],
  ["kubernetes", "helm"],
  ["kubernetes", "operators"],
  ["kubernetes", "prometheus"],
];

export default function KubernetesOrchestrationCaseStudy() {
  const activeId = useCaseStudyProgress(SECTION_IDS);

  useEffect(() => {
    document.title = "Kubernetes Orchestration | Jeevan Reddy";
    return () => { document.title = "Jeevan Reddy | DevOps Engineer"; };
  }, []);

  return (
    <div className="case-study-page kubernetes-case-study">
      <a className="skip-link" href="#case-main">Skip to case study</a>
      <header className="case-study-nav">
        <a href="/The-Portfolio/" className="case-study-back">← Portfolio</a>
        <span className="case-study-nav-label">Case study / 03</span>
      </header>

      <main id="case-main" tabIndex="-1">
        <section className="case-study-hero">
          <div className="case-study-hero-grid" aria-hidden="true" />
          <div className="case-study-hero-content">
            <p className="case-study-eyebrow">03 / KUBERNETES · HELM · PROMETHEUS</p>
            <h1>Kubernetes<br /><em>Orchestration</em></h1>
            <p className="case-study-lede">Platform engineering for 200+ microservices across 3 production clusters, with scaling, disruption control, extensibility, and observability as the documented themes.</p>
            <div className="case-study-meta"><span>2023</span><span>200+ microservices</span><span>3 production clusters</span><span>99.97% uptime SLA</span></div>
          </div>
        </section>

        <div className="case-study-layout">
          <aside className="case-study-index" aria-label="Case study sections">
            {SECTION_IDS.map((id, index) => <a key={id} className={activeId === id ? "is-active" : ""} href={`#${id}`}><span>{String(index + 1).padStart(2, "0")}</span>{id.replace("kubernetes-", "")}</a>)}
          </aside>
          <div className="case-study-content">
            <CaseStudySection id="kubernetes-overview" eyebrow="Overview" title="Platform engineering for a distributed service estate." active={activeId === "kubernetes-overview"}>
              <p>Kubernetes Orchestration covers 200+ microservices on GKE, supported by HPA, PDB, custom operators, Helm, and Prometheus across 3 production clusters.</p>
            </CaseStudySection>

            <CaseStudySection id="kubernetes-context" eyebrow="Problem / context" title="Scale services without losing operational control." active={activeId === "kubernetes-context"}>
              <p>The engineering focus combines service scale with Kubernetes operating patterns for scaling, disruption control, extensibility, and observability across production clusters.</p>
            </CaseStudySection>

            <CaseStudySection id="kubernetes-role" eyebrow="My role" title="I work across Kubernetes and SRE systems." active={activeId === "kubernetes-role"}>
              <p>In this project, my focus is the platform shape represented by the record: orchestrating 200+ microservices across 3 production clusters, with HPA, PDB, custom operators, Helm, and Prometheus as the documented engineering themes.</p>
            </CaseStudySection>

            <CaseStudySection id="kubernetes-architecture" eyebrow="Architecture" title="A platform map, not a fabricated topology." active={activeId === "kubernetes-architecture"}>
              <div className="case-architecture-sticky"><CaseStudyArchitecture activeNode="kubernetes" nodes={NODES} links={LINKS} title="Kubernetes Orchestration conceptual platform map" description="A conceptual relationship between Kubernetes, 3 production clusters, 200+ microservices, HPA, PDB, custom operators, Helm, and Prometheus." headerLabel="Platform map" headerMeta="Documented scope" disclosure="Detailed cluster topology and implementation configuration have been intentionally omitted where not available for public disclosure." /></div>
              <div className="case-architecture-copy">
                <p><strong>Kubernetes</strong> is the central orchestration platform in the project record.</p>
                <p><strong>3 production clusters</strong> define the documented production footprint.</p>
                <p><strong>200+ microservices</strong> define the documented service scale.</p>
                <p><strong>HPA and PDB</strong> represent the documented scaling and disruption-control concepts.</p>
                <p><strong>Custom operators, Helm, and Prometheus</strong> complete the documented platform vocabulary.</p>
              </div>
            </CaseStudySection>

            <CaseStudySection id="kubernetes-platform" eyebrow="Platform engineering" title="Operating patterns around the Kubernetes core." active={activeId === "kubernetes-platform"}>
              <ol className="case-study-list case-study-stages"><li><strong>HPA.</strong><span>Horizontal scaling is part of the documented platform scope.</span></li><li><strong>PDB.</strong><span>Pod disruption control is part of the documented platform scope.</span></li><li><strong>Custom operators.</strong><span>Extensibility through custom operators is part of the documented platform scope.</span></li><li><strong>Helm.</strong><span>Helm is part of the documented technology stack.</span></li></ol>
            </CaseStudySection>

            <CaseStudySection id="kubernetes-reliability" eyebrow="Reliability / scaling" title="Scale and continuity as visible platform signals." active={activeId === "kubernetes-reliability"}>
              <div className="case-study-callouts"><div><strong>Scale</strong><span>200+ microservices</span><small>Documented service scope</small></div><div><strong>Production footprint</strong><span>3 production clusters</span><small>Documented cluster count</small></div><div><strong>Scaling</strong><span>HPA</span><small>Documented platform concept</small></div><div><strong>Disruption control</strong><span>PDB</span><small>Documented platform concept</small></div></div>
            </CaseStudySection>

            <CaseStudySection id="kubernetes-stack" eyebrow="Technology stack" title="The documented platform vocabulary." active={activeId === "kubernetes-stack"}>
              <div className="case-study-demonstrates"><span>Kubernetes</span><span>Helm</span><span>Prometheus</span><span>GKE</span></div>
            </CaseStudySection>

            <CaseStudySection id="kubernetes-outcome" eyebrow="Outcome" title="Reliability made measurable." active={activeId === "kubernetes-outcome"}>
              <p className="case-study-outcome"><strong>99.97%</strong><span>Reported uptime SLA</span><em>Across 3 production clusters</em></p>
            </CaseStudySection>

            <CaseStudySection id="kubernetes-demonstrates" eyebrow="What this project demonstrates" title="A Kubernetes platform built for scale." active={activeId === "kubernetes-demonstrates"}>
              <div className="case-study-demonstrates"><span>Kubernetes platform engineering</span><span>200+ microservices</span><span>HPA scaling concepts</span><span>PDB disruption control</span><span>Custom operator extensibility</span><span>Helm · Prometheus</span></div>
            </CaseStudySection>
          </div>
        </div>

        <CaseStudyNavigation previous={{ href: "/The-Portfolio/case-studies/cicd-pipeline-platform", label: "CI/CD Pipeline Platform" }} />
      </main>
    </div>
  );
}
