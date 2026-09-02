import { useEffect, useRef, useState } from "react";
import useReveal from "../hooks/useReveal";

const PRINCIPLES = [
  {
    num: "01",
    title: "Design",
    desc: "Infrastructure starts with clear boundaries — multi-region scope, network segmentation, and failure paths decided before anything is deployed.",
    terms: ["GCP", "VPC", "Cloud Armor", "Multi-region"],
  },
  {
    num: "02",
    title: "Automate",
    desc: "Environments are defined as code and delivered through pipelines, keeping changes repeatable across development, staging, and production.",
    terms: ["Terraform", "Ansible", "Jenkins", "ArgoCD"],
  },
  {
    num: "03",
    title: "Operate",
    desc: "Production workloads run on Kubernetes platforms with scaling, disruption control, and extensibility handled at the platform layer.",
    terms: ["Kubernetes", "GKE", "Helm", "Docker"],
  },
  {
    num: "04",
    title: "Observe",
    desc: "Monitoring makes system state visible, so reliability is measured through metrics and dashboards rather than assumed.",
    terms: ["Prometheus", "Grafana", "Cloud Monitoring"],
  },
  {
    num: "05",
    title: "Protect",
    desc: "Access is governed at the identity layer and traffic is filtered at the perimeter as part of the design, not appended afterwards.",
    terms: ["IAM", "Cloud Armor", "Secret Manager"],
  },
  {
    num: "06",
    title: "Improve",
    desc: "SLOs, incident management, root cause analysis, and runbook automation turn every failure into a more reliable system.",
    terms: ["SLO/SLA", "Incident management", "RCA"],
  },
];

export default function HowIWork() {
  const [ref, revealed] = useReveal();
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const items = [...list.querySelectorAll(".how-item")];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveIndex(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0 }
    );
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-i-work" className="how-section" aria-labelledby="how-i-work-title">
      <div className="container">
        <div className="how-grid">
          <div ref={ref} className={`how-intro reveal${revealed ? " is-revealed" : ""}`}>
            <p className="section-label">How I work</p>
            <h2 id="how-i-work-title" className="how-heading display">
              Reliable systems are designed, automated, observed, and improved.
            </h2>
            <p className="how-statement">
              Six operating principles shaped by cloud infrastructure, delivery automation, platform engineering, and production reliability.
            </p>
            <div className="how-progress" aria-hidden="true">
              <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
              <span>/ {String(PRINCIPLES.length).padStart(2, "0")}</span>
              <i><b style={{ height: `${((activeIndex + 1) / PRINCIPLES.length) * 100}%` }} /></i>
            </div>
          </div>

          <ol className="how-list" ref={listRef}>
            {PRINCIPLES.map((principle, index) => (
              <li key={principle.num}>
                <article
                  className={`how-item${index === activeIndex ? " is-active" : ""}`}
                  data-index={index}
                >
                  <span className="how-num" aria-hidden="true">{principle.num}</span>
                  <h3>{principle.title}</h3>
                  <p className="how-desc">{principle.desc}</p>
                  <p className="how-terms">{principle.terms.join(" · ")}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <a className="how-cta" href="#works">
          See the systems <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
