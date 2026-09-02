import useReveal from "../hooks/useReveal";

export default function AboutSection() {
  const [headRef, headRevealed] = useReveal();
  const [bioRef,  bioRevealed]  = useReveal();

  return (
    <section id="about" style={{ padding: "var(--section-gap) 0", borderTop: "1px solid var(--border)" }}>
      <div className="container">

        {/* Two-col header */}
        <div
          className="about-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", marginBottom: "5rem", alignItems: "start" }}
        >
          <div ref={headRef} className={`reveal${headRevealed ? " is-revealed" : ""}`}>
            <p className="section-label" style={{ marginBottom: "0.75rem" }}>About</p>
            <h2 className="display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)", color: "var(--ink)" }}>
              Systems that don't break at 3am
            </h2>
          </div>

          <div ref={bioRef} className={`reveal${bioRevealed ? " is-revealed" : ""}`} style={{ paddingTop: "0.25rem" }}>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-muted)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              I'm a GCP-certified DevOps and SRE engineer with <strong style={{ color: "var(--ink)", fontWeight: 500 }}>8+ years in IT</strong>, designing infrastructure that scales quietly and fails gracefully.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-muted)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              Currently at <strong style={{ color: "var(--ink)", fontWeight: 500 }}>EY LLP</strong>, I lead cloud platform engineering for enterprise clients — building the reliability layer that makes everything else possible.
            </p>
            <p style={{ fontSize: "0.82rem", color: "var(--ink-dim)", lineHeight: 1.8 }}>
              B.Tech Computer Science · JNTU Hyderabad · 2017
            </p>
          </div>
        </div>

        <div className="about-signal" aria-hidden="true">
          <span>GCP</span><i /><span>K8S</span><i /><span>SRE</span><i /><span>CI/CD</span>
        </div>
      </div>
    </section>
  );
}
