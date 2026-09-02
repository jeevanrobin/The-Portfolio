export default function CaseStudySection({ id, eyebrow, title, children, active = false }) {
  return (
    <section id={id} className={`case-study-section${active ? " is-active" : ""}`}>
      <div className="case-study-section-marker" aria-hidden="true" />
      <p className="case-study-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <div className="case-study-section-body">{children}</div>
    </section>
  );
}
