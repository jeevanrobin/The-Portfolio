import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion";
import useResumeAvailability from "../hooks/useResumeAvailability";

const LINKS = [
  { label: "Home",       id: "home" },
  { label: "Work",       id: "works" },
  { label: "About",      id: "about" },
  { label: "Skills",     id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Contact",    id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const wasMenuOpen = useRef(false);
  const reducedMotion = useReducedMotion();
  const resumeReady = useResumeAvailability();
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (wasMenuOpen.current && !menuOpen) menuButtonRef.current?.focus();
    wasMenuOpen.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    const obs = LINKS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 var(--gutter)",
        height: "62px",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background 0.4s var(--ease-out), border-color 0.4s var(--ease-out)",
      }}>
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.6rem" }}
        >
          <span style={{
            width: "30px", height: "30px", borderRadius: "50%",
            border: "1px solid var(--accent-light)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Instrument Serif', serif", fontStyle: "italic",
            fontSize: "13px", color: "var(--ink)", letterSpacing: "-0.5px", flexShrink: 0,
          }}>JR</span>
          <span style={{ fontSize: "0.82rem", color: "var(--ink-muted)", fontWeight: 400, letterSpacing: "0.01em" }}>
            Jeevan Reddy
          </span>
        </button>

        {/* Desktop links */}
        <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "0.1rem" }}>
          {LINKS.map(({ label, id }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-current={isActive ? "location" : undefined}
                style={{
                  background: isActive ? "var(--surface)" : "transparent",
                  border: isActive ? "1px solid var(--border)" : "1px solid transparent",
                  borderRadius: "6px",
                  padding: "0.35rem 0.7rem",
                  fontSize: "0.78rem",
                  color: isActive ? "var(--ink)" : "var(--ink-muted)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: isActive ? 500 : 400,
                  transition: "color 0.2s, background 0.2s, border-color 0.2s",
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.background = "var(--surface)"; }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = "var(--ink-muted)"; e.currentTarget.style.background = "transparent"; }}}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {resumeReady && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume-btn"
            >
              Resume ↗
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          <a
            href="mailto:medidajeevanreddy499@gmail.com?subject=Let's Work Together"
            className="nav-hire-btn"
            style={{
              fontSize: "0.78rem",
              padding: "0.4rem 1rem",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              color: "var(--ink-muted)",
              textDecoration: "none",
              background: "var(--surface)",
              transition: "color 0.2s, border-color 0.2s",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--accent-light)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--ink-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            Hire me ↗
          </a>

          {/* Hamburger — mobile only */}
          <button
            ref={menuButtonRef}
            className="nav-hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{
              display: "none",
              background: "none", border: "1px solid var(--border)",
              borderRadius: "6px", padding: "0.35rem 0.5rem",
              cursor: "pointer", flexDirection: "column", gap: "4px",
              alignItems: "center", justifyContent: "center",
            }}
          >
            <span style={{ display: "block", width: "16px", height: "1.5px", background: "var(--ink-muted)", transition: "transform 0.25s, opacity 0.25s", transform: menuOpen ? "translateY(5.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: "16px", height: "1.5px", background: "var(--ink-muted)", transition: "opacity 0.25s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "16px", height: "1.5px", background: "var(--ink-muted)", transition: "transform 0.25s, opacity 0.25s", transform: menuOpen ? "translateY(-5.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className="nav-mobile-drawer"
        aria-hidden={!menuOpen}
        style={{
          position: "fixed", top: "62px", left: 0, right: 0, zIndex: 49,
          background: "rgba(8,8,8,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          display: "flex", flexDirection: "column", gap: "0",
          maxHeight: menuOpen ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s var(--ease-drawer)",
        }}
      >
        {LINKS.map(({ label, id }) => (
           <button
            key={id}
             onClick={() => scrollTo(id)}
             tabIndex={menuOpen ? 0 : -1}
            style={{
              background: "none", border: "none",
              borderBottom: "1px solid var(--border)",
              padding: "1rem var(--gutter)",
              textAlign: "left",
              fontSize: "0.9rem",
              color: active === id ? "var(--ink)" : "var(--ink-muted)",
              cursor: "pointer", fontFamily: "inherit",
              fontWeight: active === id ? 500 : 400,
            }}
          >
            {label}
          </button>
        ))}
        <a
          href="mailto:medidajeevanreddy499@gmail.com?subject=Let's Work Together"
          tabIndex={menuOpen ? 0 : -1}
          style={{ padding: "1rem var(--gutter)", fontSize: "0.9rem", color: "var(--accent-light)", textDecoration: "none" }}
        >
          Hire me ↗
        </a>
        {resumeReady && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            style={{ padding: "1rem var(--gutter)", fontSize: "0.9rem", color: "var(--ink-muted)", textDecoration: "none", borderTop: "1px solid var(--border)" }}
          >
            View Resume ↗
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hire-btn      { display: none !important; }
          .nav-resume-btn    { display: none !important; }
          .nav-hamburger     { display: flex !important; }
        }
      `}</style>
    </>
  );
}
