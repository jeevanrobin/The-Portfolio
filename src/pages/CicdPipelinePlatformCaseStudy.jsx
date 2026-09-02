import { useEffect } from "react";
import CaseStudyArchitecture from "../components/CaseStudyArchitecture";
import CaseStudyNavigation from "../components/CaseStudyNavigation";
import CaseStudySection from "../components/CaseStudySection";
import useCaseStudyProgress from "../hooks/useCaseStudyProgress";
import "../styles/case-study.css";

const SECTION_IDS = ["cicd-overview", "cicd-context", "cicd-role", "cicd-architecture", "cicd-implementation", "cicd-delivery", "cicd-outcome", "cicd-demonstrates"];
const NODES = [
  { id: "jenkins", label: "Jenkins", x: 12, y: 50 },
  { id: "docker", label: "Docker", x: 42, y: 28 },
  { id: "argocd", label: "ArgoCD", x: 42, y: 72 },
  { id: "gke", label: "GKE", x: 76, y: 50 },
  { id: "delivery", label: "Deploy to production", x: 76, y: 24 },
  { id: "rollback", label: "Full rollback", x: 76, y: 76 },
];
const LINKS = [["jenkins", "docker"], ["jenkins", "argocd"], ["docker", "gke"], ["argocd", "gke"], ["gke", "delivery"], ["gke", "rollback"]];

export default function CicdPipelinePlatformCaseStudy() {
  const activeId = useCaseStudyProgress(SECTION_IDS);

  useEffect(() => {
    document.title = "CI/CD Pipeline Platform | Jeevan Reddy";
    return () => { document.title = "Jeevan Reddy | DevOps Engineer"; };
  }, []);

  return (
    <div className="case-study-page cicd-case-study">
      <a className="skip-link" href="#case-main">Skip to case study</a>
      <header className="case-study-nav">
        <a href="/The-Portfolio/" className="case-study-back">← Portfolio</a>
        <span className="case-study-nav-label">Case study / 02</span>
      </header>
      <main id="case-main" tabIndex="-1">
        <section className="case-study-hero">
          <div className="case-study-hero-grid" aria-hidden="true" />
          <div className="case-study-hero-content">
            <p className="case-study-eyebrow">02 / Jenkins · ArgoCD · GKE · Docker</p>
            <h1>CI/CD<br /><em>Pipeline Platform</em></h1>
            <p className="case-study-lede">An end-to-end delivery platform connecting automation, containerized delivery, production deployment, and rollback capability.</p>
            <div className="case-study-meta"><span>2023</span><span>End-to-end delivery</span><span>Under 8 minutes</span><span>Full rollback</span></div>
          </div>
        </section>

        <div className="case-study-layout">
          <aside className="case-study-index" aria-label="Case study sections">
            {SECTION_IDS.map((id, index) => <a key={id} className={activeId === id ? "is-active" : ""} href={`#${id}`}><span>0{index + 1}</span>{id.replace("cicd-", "")}</a>)}
          </aside>
          <div className="case-study-content">
            <CaseStudySection id="cicd-overview" eyebrow="Overview" title="Delivery engineered as one connected system." active={activeId === "cicd-overview"}>
              <p>The CI/CD Pipeline Platform brings Jenkins, ArgoCD, GKE, and Docker into an end-to-end delivery workflow with deploy-to-production in under eight minutes and full rollback capability.</p>
            </CaseStudySection>
            <CaseStudySection id="cicd-context" eyebrow="Problem / context" title="Move from delivery tooling to a delivery platform." active={activeId === "cicd-context"}>
              <p>The engineering focus is an end-to-end delivery workflow: connect the documented automation and deployment technologies, move changes to production, and retain a full rollback capability.</p>
            </CaseStudySection>
            <CaseStudySection id="cicd-role" eyebrow="My role" title="I work across the delivery system." active={activeId === "cicd-role"}>
              <p>I work across DevOps and SRE delivery systems. In this case study, my focus is the engineering shape represented by the project: Jenkins, ArgoCD, GKE, and Docker connected around production delivery and recovery.</p>
            </CaseStudySection>
            <CaseStudySection id="cicd-architecture" eyebrow="Architecture" title="Four technologies around one delivery objective." active={activeId === "cicd-architecture"}>
              <div className="case-architecture-sticky"><CaseStudyArchitecture activeNode="gke" nodes={NODES} links={LINKS} title="CI/CD Pipeline Platform delivery map" description="A documented relationship between Jenkins, Docker, ArgoCD, GKE, deploy-to-production, and full rollback." headerLabel="Delivery map" headerMeta="Documented scope" disclosure="Detailed pipeline stages and deployment topology have been intentionally omitted where not available for public disclosure." /></div>
              <div className="case-architecture-copy">
                <p><strong>Jenkins</strong> is part of the documented delivery platform.</p>
                <p><strong>Docker</strong> is part of the documented containerized delivery context.</p>
                <p><strong>ArgoCD</strong> is part of the documented deployment technology set.</p>
                <p><strong>GKE</strong> is the documented platform destination.</p>
                <p><strong>Production delivery and full rollback</strong> define the documented operating objective.</p>
              </div>
            </CaseStudySection>
            <CaseStudySection id="cicd-implementation" eyebrow="Implementation" title="The platform is defined by its connected themes." active={activeId === "cicd-implementation"}>
              <ol className="case-study-list case-study-stages"><li><strong>End-to-end delivery.</strong><span>Connect the delivery workflow as a platform.</span></li><li><strong>Automation and deployment.</strong><span>Use Jenkins, ArgoCD, and GKE as the documented platform technologies.</span></li><li><strong>Containerized delivery context.</strong><span>Docker is part of the documented technology stack.</span></li><li><strong>Production delivery and recovery.</strong><span>Deploy to production and retain full rollback capability.</span></li></ol>
            </CaseStudySection>
            <CaseStudySection id="cicd-delivery" eyebrow="Delivery / recovery" title="Speed in delivery. Confidence in recovery." active={activeId === "cicd-delivery"}>
              <div className="case-study-callouts"><div><strong>Delivery</strong><span>Deploy-to-production in under 8 minutes</span><small>Reported project outcome</small></div><div><strong>Recovery</strong><span>Full rollback</span><small>Documented recovery capability</small></div></div>
            </CaseStudySection>
            <CaseStudySection id="cicd-outcome" eyebrow="Outcome" title="A faster path to production." active={activeId === "cicd-outcome"}>
              <p className="case-study-outcome"><strong>&lt; 8</strong><span>Reported project outcome</span><em>minutes to deploy to production</em></p>
            </CaseStudySection>
            <CaseStudySection id="cicd-demonstrates" eyebrow="What this project demonstrates" title="Delivery thinking with recovery built in." active={activeId === "cicd-demonstrates"}>
              <div className="case-study-demonstrates"><span>End-to-end CI/CD thinking</span><span>Delivery-platform design</span><span>Jenkins · ArgoCD · GKE · Docker</span><span>Production delivery</span><span>Rollback capability</span></div>
            </CaseStudySection>
          </div>
        </div>
        <CaseStudyNavigation
          previous={{ href: "/The-Portfolio/case-studies/gcp-cloud-architecture", label: "GCP Cloud Architecture" }}
          next={{ href: "/The-Portfolio/case-studies/kubernetes-orchestration", label: "Kubernetes Orchestration" }}
        />
      </main>
    </div>
  );
}
