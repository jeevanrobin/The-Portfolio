import useReveal from "../hooks/useReveal";
import RecruiterActions from "./RecruiterActions";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/medida-jeevan-reddy-2673aa176/", letter: "in" },
  { label: "GitHub",   href: "https://github.com/jeevanrobin",                              letter: "gh" },
  { label: "Email",    href: "mailto:medidajeevanreddy499@gmail.com",                       letter: "@" },
];

const TICKER = "GCP Architect · Kubernetes Platform · CI/CD Pipelines · SRE Practice · Terraform IaC · Cloud Security · ";

export default function ContactSection() {
  const [headRef, headRevealed] = useReveal();
  const [emailRef, emailRevealed] = useReveal();

  return (
    <section id="contact" style={{ borderTop: "1px solid var(--border)" }}>

      {/* Ticker strip */}
      <div style={{
        overflow: "hidden",
        borderBottom: "1px solid var(--border)",
        padding: "0.85rem 0",
      }}>
        <div
          aria-hidden="true"
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "var(--ink-dim)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >{TICKER}</div>
      </div>

      {/* Main */}
      <div className="container" style={{ padding: "var(--section-gap) var(--gutter)" }}>

        <div className="contact-system-line" aria-hidden="true"><span /> <i /> <span /> <i /> <span /></div>
        <div ref={headRef} className={`reveal${headRevealed ? " is-revealed" : ""}`} style={{ maxWidth: "840px", marginBottom: "5rem" }}>
          <p className="section-label" style={{ marginBottom: "1.25rem" }}>Get in touch</p>
          <h2 className="display" style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", color: "var(--ink)", marginBottom: "2rem", lineHeight: 0.88 }}>
            Have a project<br />in mind?
          </h2>
          <p style={{ fontSize: "0.92rem", color: "var(--ink-muted)", lineHeight: 1.85, maxWidth: "48ch" }}>
             Open to the GCP, DevOps, SRE, and platform engineering work represented by this portfolio. Let's talk about what you're building.
          </p>
        </div>

        {/* Email */}
        <div ref={emailRef} className={`reveal${emailRevealed ? " is-revealed" : ""}`} style={{ marginBottom: "6rem" }}>
          <p className="section-label" style={{ marginBottom: "1rem" }}>Write to me</p>
           <a className="contact-email"
            href="mailto:medidajeevanreddy499@gmail.com"
            style={{
              display: "inline-block",
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
              color: "var(--ink)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(137,170,204,0.3)",
              paddingBottom: "0.3rem",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              transition: "color 0.25s, border-color 0.25s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "var(--accent-light)";
              e.currentTarget.style.borderColor = "var(--accent-light)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "var(--ink)";
              e.currentTarget.style.borderColor = "rgba(137,170,204,0.3)";
            }}
          >
            medidajeevanreddy499@gmail.com
          </a>
        </div>

        <div className="contact-recruiter-panel">
          <div>
            <p className="section-label">Professional profile</p>
            <strong>GCP · DevOps · SRE · Platform Engineering</strong>
            <span>Hyderabad, India</span>
          </div>
          <RecruiterActions />
        </div>

        {/* Footer */}
        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.25rem",
        }}>
          {/* Available dot */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80", animation: "pulseDot 2s ease-in-out infinite", flexShrink: 0 }} />
            <span style={{ fontSize: "0.75rem", color: "var(--ink-muted)" }}>Available for projects</span>
          </div>

          {/* Socials */}
          <div style={{ display: "flex", gap: "0.6rem" }}>
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: "36px", height: "36px",
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--ink-dim)",
                  fontSize: "0.62rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "color 0.2s, border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "var(--ink)";
                  e.currentTarget.style.borderColor = "rgba(137,170,204,0.3)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "var(--ink-dim)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {s.letter}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p style={{ fontSize: "0.68rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--ink-dim)", letterSpacing: "0.05em" }}>
            © 2025 Jeevan Reddy · Hyderabad
          </p>
        </div>
      </div>
    </section>
  );
}
