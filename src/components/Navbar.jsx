import { useEffect, useState } from "react";

const links = ["Home", "About", "Skills", "Experience", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["home", "works", "journal", "about", "skills", "experience", "contact"];
    const navMap = {
      home: "Home",
      works: "Home",       // Selected Works is still under Hero scroll
      journal: "About",    // Journal groups under About
      about: "About",
      skills: "Skills",
      experience: "Experience",
      contact: "Contact",
    };

    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(navMap[id] || "Home");
          }
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    const sectionId = id.toLowerCase();
    const el = document.getElementById(sectionId);
    if (el) { el.scrollIntoView({ behavior: "smooth" }); setActive(id); }
  };

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, display:"flex", justifyContent:"center", paddingTop:"1.25rem", paddingLeft:"1rem", paddingRight:"1rem" }}>
      <div style={{
        display:"inline-flex", alignItems:"center", borderRadius:"9999px",
        backdropFilter:"blur(16px)", border:"1px solid rgba(255,255,255,0.1)",
        background:"rgba(12,12,12,0.85)", padding:"0.35rem", gap:"0.15rem",
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.5)" : "none",
        transition:"box-shadow 0.3s ease",
      }}>
        {/* Logo */}
        <button onClick={() => scrollTo("Home")} style={{ position:"relative", width:"2.25rem", height:"2.25rem", borderRadius:"9999px", display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer", flexShrink:0 }}>
          <span style={{ position:"absolute", inset:0, borderRadius:"9999px", background:"linear-gradient(135deg,#89AACC,#4E85BF)" }} />
          <span style={{ position:"relative", width:"1.75rem", height:"1.75rem", borderRadius:"9999px", background:"#0a0a0a", display:"flex", alignItems:"center", justifyContent:"center", fontStyle:"italic", fontSize:"11px", color:"#f5f5f5", fontFamily:"serif", letterSpacing:"-0.5px" }}>JR</span>
        </button>

        <div style={{ width:"1px", height:"1.1rem", background:"rgba(255,255,255,0.08)", margin:"0 0.2rem" }} />

        {/* Nav links */}
        {links.map((link) => {
          const isActive = active === link;
          return (
            <button key={link} onClick={() => scrollTo(link)} style={{
              fontSize:"0.78rem", borderRadius:"9999px", padding:"0.4rem 0.875rem",
              border:"none", cursor:"pointer", fontFamily:"inherit",
              background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
              color: isActive ? "#f5f5f5" : "#6b6b6b",
              transition:"color 0.2s, background 0.2s",
              fontWeight: isActive ? 500 : 400,
            }}
            onMouseEnter={e => { if (!isActive) { e.target.style.color="#c0c0c0"; e.target.style.background="rgba(255,255,255,0.05)"; }}}
            onMouseLeave={e => { if (!isActive) { e.target.style.color="#6b6b6b"; e.target.style.background="transparent"; }}}>
              {link}
            </button>
          );
        })}

        <div style={{ width:"1px", height:"1.1rem", background:"rgba(255,255,255,0.08)", margin:"0 0.2rem" }} />

        {/* Hire me */}
        <a href="mailto:medidajeevanreddy499@gmail.com?subject=Let's Work Together"
          style={{ fontSize:"0.78rem", borderRadius:"9999px", padding:"0.4rem 0.875rem", color:"#6b6b6b", textDecoration:"none", transition:"color 0.2s, background 0.2s", fontFamily:"inherit" }}
          onMouseEnter={e => { e.currentTarget.style.color="#f5f5f5"; e.currentTarget.style.background="rgba(255,255,255,0.05)"; }}
          onMouseLeave={e => { e.currentTarget.style.color="#6b6b6b"; e.currentTarget.style.background="transparent"; }}>
          Hire me ↗
        </a>
      </div>
    </nav>
  );
}
