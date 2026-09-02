import { useEffect } from "react";
import CaseStudyArchitecture from "../components/CaseStudyArchitecture";
import CaseStudySection from "../components/CaseStudySection";
import CaseStudyNavigation from "../components/CaseStudyNavigation";
import useCaseStudyProgress from "../hooks/useCaseStudyProgress";
import "../styles/case-study.css";

const SECTION_IDS = ["case-overview", "case-context", "case-role", "case-architecture", "case-implementation", "case-reliability", "case-outcome", "case-lessons"];

export default function GcpCloudArchitectureCaseStudy() {
  const activeId = useCaseStudyProgress(SECTION_IDS);

  useEffect(() => {
    document.title = "GCP Cloud Architecture | Jeevan Reddy";
    return () => { document.title = "Jeevan Reddy | DevOps Engineer"; };
  }, []);

  return (
    <div className="case-study-page">
      <a className="skip-link" href="#case-main">Skip to case study</a>
      <header className="case-study-nav">
        <a href="/The-Portfolio/" className="case-study-back">← Portfolio</a>
        <span className="case-study-nav-label">Case study / 01</span>
      </header>

      <main id="case-main" tabIndex="-1">
        <section className="case-study-hero">
          <div className="case-study-hero-grid" aria-hidden="true" />
          <div className="case-study-hero-content">
            <p className="case-study-eyebrow">01 / GCP · Terraform · VPC · Cloud Armor</p>
            <h1>GCP Cloud<br /><em>Architecture</em></h1>
            <p className="case-study-lede">Multi-region infrastructure shaped around network connectivity, perimeter protection, and resilience.</p>
            <div className="case-study-meta"><span>2024</span><span>Multi-region</span><span>Network-aware</span><span>Resilient by design</span></div>
          </div>
        </section>

        <div className="case-study-layout">
          <aside className="case-study-index" aria-label="Case study sections">
            {SECTION_IDS.map((id, index) => <a key={id} className={activeId === id ? "is-active" : ""} href={`#${id}`}><span>0{index + 1}</span>{id.replace("case-", "")}</a>)}
          </aside>
          <div className="case-study-content">
            <CaseStudySection id="case-overview" eyebrow="Overview" title="Infrastructure designed around continuity." active={activeId === "case-overview"}>
              <p>GCP Cloud Architecture brings together multi-region infrastructure, VPC peering, Cloud Armor WAF, and automated failover in one infrastructure narrative.</p>
            </CaseStudySection>

            <CaseStudySection id="case-context" eyebrow="Problem / context" title="A connected, protected infrastructure foundation." active={activeId === "case-context"}>
              <p>The engineering focus is clear: design across multiple regions, connect the infrastructure through VPC peering, place Cloud Armor WAF at the perimeter, and support continuity through automated failover.</p>
            </CaseStudySection>

            <CaseStudySection id="case-role" eyebrow="My role" title="I work at the infrastructure layer." active={activeId === "case-role"}>
              <p>I work as a GCP DevOps Engineer / SRE, with infrastructure design and Terraform as part of my practice. In this case study, my focus is the engineering shape represented by the project: multi-region design, network connectivity, perimeter protection, and automated failover.</p>
            </CaseStudySection>

            <CaseStudySection id="case-architecture" eyebrow="Architecture" title="Five ideas, one resilient system shape." active={activeId === "case-architecture"}>
              <div className="case-architecture-sticky"><CaseStudyArchitecture activeNode="regions" /></div>
              <div className="case-architecture-copy">
                <p><strong>Terraform</strong> establishes the infrastructure-as-code foundation.</p>
                <p><strong>Multi-region infrastructure</strong> gives the design geographic breadth.</p>
                <p><strong>VPC peering</strong> provides the documented network connection.</p>
                <p><strong>Cloud Armor WAF</strong> defines the perimeter protection layer.</p>
                <p><strong>Automated failover</strong> carries the resilience story through the system.</p>
                <p className="case-study-disclosure">Detailed implementation topology has been intentionally omitted where not available for public disclosure.</p>
              </div>
            </CaseStudySection>

            <CaseStudySection id="case-implementation" eyebrow="Implementation" title="The build moves from shape to continuity." active={activeId === "case-implementation"}>
              <ol className="case-study-list case-study-stages"><li><strong>Multi-region design.</strong><span>Structure the infrastructure across multiple regions.</span></li><li><strong>VPC peering.</strong><span>Connect the documented network domains.</span></li><li><strong>Cloud Armor WAF.</strong><span>Protect the perimeter with the documented WAF layer.</span></li><li><strong>Automated failover.</strong><span>Support resilience through an automated continuity path.</span></li></ol>
              <p className="case-study-stack-line"><span>Infrastructure as Code</span> Terraform</p>
            </CaseStudySection>

            <CaseStudySection id="case-reliability" eyebrow="Security / reliability" title="Protection at the edge. Continuity across regions." active={activeId === "case-reliability"}>
              <div className="case-study-callouts"><div><strong>Security</strong><span>Cloud Armor WAF</span><small>Perimeter protection</small></div><div><strong>Reliability</strong><span>Multi-region infrastructure + automated failover</span><small>Continuity by design</small></div></div>
            </CaseStudySection>

            <CaseStudySection id="case-outcome" eyebrow="Outcome" title="Measured movement in the right direction." active={activeId === "case-outcome"}>
              <p className="case-study-outcome"><strong>40%</strong><span>Reported project outcome</span><em>latency reduction</em></p>
            </CaseStudySection>

            <CaseStudySection id="case-lessons" eyebrow="What this project demonstrates" title="Engineering value that travels." active={activeId === "case-lessons"}>
              <div className="case-study-demonstrates"><span>Multi-region infrastructure</span><span>Network-aware design</span><span>Perimeter protection</span><span>Automated resilience</span><span>Infrastructure as Code</span></div>
            </CaseStudySection>
          </div>
        </div>
        <CaseStudyNavigation
          next={{ href: "/The-Portfolio/case-studies/cicd-pipeline-platform", label: "CI/CD Pipeline Platform" }}
        />
      </main>
    </div>
  );
}
