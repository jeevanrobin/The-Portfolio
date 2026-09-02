export default function CaseStudyNavigation({ previous, next }) {
  return (
    <nav className="case-study-navigation" aria-label="Case study navigation">
      <a className="case-study-nav-back" href="/The-Portfolio/#works">Back to Work</a>
      <div className="case-study-nav-projects">
        {previous ? <a href={previous.href}><span>Previous project</span>{previous.label} <b>←</b></a> : <span />}
        {next ? <a href={next.href}><span>Next project</span>{next.label} <b>→</b></a> : <span />}
      </div>
    </nav>
  );
}
