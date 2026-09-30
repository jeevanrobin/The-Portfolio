import { useEffect, useMemo } from "react";
import CaseStudyArchitecture from "../components/CaseStudyArchitecture";
import CaseStudyNavigation from "../components/CaseStudyNavigation";
import CaseStudySection from "../components/CaseStudySection";
import useCaseStudyProgress from "../hooks/useCaseStudyProgress";
import { CASE_STUDIES, CASE_STUDY_ORDER } from "../data/caseStudies";
import { caseStudyHref, withBase } from "../lib/paths";
import "../styles/case-study.css";

const HOME_TITLE = "Jeevan Reddy | DevOps Engineer";

function SectionBody({ section }) {
  switch (section.type) {
    case "text":
      return <p>{section.body}</p>;
    case "architecture":
      return (
        <>
          <div className="case-architecture-sticky">
            <CaseStudyArchitecture
              activeNode={section.activeNode}
              nodes={section.nodes}
              links={section.links}
              title={section.mapTitle}
              description={section.mapDescription}
              headerLabel={section.headerLabel}
              headerMeta={section.headerMeta}
              disclosure={section.disclosure}
            />
          </div>
          <div className="case-architecture-copy">
            {section.copy.map(([term, text]) => <p key={term}><strong>{term}</strong> {text}</p>)}
            {section.copyDisclosure && <p className="case-study-disclosure">{section.copyDisclosure}</p>}
          </div>
        </>
      );
    case "stages":
      return (
        <>
          <ol className="case-study-list case-study-stages">
            {section.items.map(([name, text]) => <li key={name}><strong>{name}</strong><span>{text}</span></li>)}
          </ol>
          {section.stackLine && <p className="case-study-stack-line"><span>{section.stackLine[0]}</span> {section.stackLine[1]}</p>}
        </>
      );
    case "callouts":
      return (
        <div className="case-study-callouts">
          {section.items.map(([label, value, note]) => <div key={label}><strong>{label}</strong><span>{value}</span><small>{note}</small></div>)}
        </div>
      );
    case "outcome":
      return <p className="case-study-outcome"><strong>{section.value}</strong><span>{section.label}</span><em>{section.unit}</em></p>;
    case "chips":
      return <div className="case-study-demonstrates">{section.items.map(item => <span key={item}>{item}</span>)}</div>;
    default:
      return null;
  }
}

function setDescription(content) {
  const meta = document.querySelector('meta[name="description"]');
  if (!meta) return undefined;
  const previous = meta.getAttribute("content");
  meta.setAttribute("content", content);
  return () => meta.setAttribute("content", previous);
}

export default function CaseStudyPage({ slug }) {
  const study = CASE_STUDIES[slug];
  const sectionIds = useMemo(() => study.sections.map(section => `${slug}-${section.key}`), [slug, study]);
  const activeId = useCaseStudyProgress(sectionIds);

  const index = CASE_STUDY_ORDER.indexOf(slug);
  const toLink = other => other && { href: caseStudyHref(other), label: CASE_STUDIES[other].title };

  useEffect(() => {
    document.title = study.docTitle;
    const restoreDescription = setDescription(study.description);
    return () => {
      document.title = HOME_TITLE;
      restoreDescription?.();
    };
  }, [study]);

  return (
    <div className={`case-study-page${study.pageClass ? ` ${study.pageClass}` : ""}`}>
      <a className="skip-link" href="#case-main">Skip to case study</a>
      <header className="case-study-nav">
        <a href={withBase()} className="case-study-back">← Portfolio</a>
        <span className="case-study-nav-label">Case study / {study.number}</span>
      </header>

      <main id="case-main" tabIndex="-1">
        <section className="case-study-hero">
          <div className="case-study-hero-grid" aria-hidden="true" />
          <div className="case-study-hero-content">
            <p className="case-study-eyebrow">{study.eyebrow}</p>
            <h1>{study.heading[0]}<br /><em>{study.heading[1]}</em></h1>
            <p className="case-study-lede">{study.lede}</p>
            <div className="case-study-meta">{study.meta.map(item => <span key={item}>{item}</span>)}</div>
          </div>
        </section>

        <div className="case-study-layout">
          <aside className="case-study-index" aria-label="Case study sections">
            {study.sections.map((section, i) => (
              <a key={section.key} className={activeId === sectionIds[i] ? "is-active" : ""} href={`#${sectionIds[i]}`}>
                <span>{String(i + 1).padStart(2, "0")}</span>{section.key}
              </a>
            ))}
          </aside>
          <div className="case-study-content">
            {study.sections.map((section, i) => (
              <CaseStudySection key={section.key} id={sectionIds[i]} eyebrow={section.eyebrow} title={section.title} active={activeId === sectionIds[i]}>
                <SectionBody section={section} />
              </CaseStudySection>
            ))}
          </div>
        </div>

        <CaseStudyNavigation previous={toLink(CASE_STUDY_ORDER[index - 1])} next={toLink(CASE_STUDY_ORDER[index + 1])} />
      </main>
    </div>
  );
}
