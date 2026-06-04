import { useEffect, useState } from "react";

const links = ["Home", "About", "Skills", "Experience", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) { el.scrollIntoView({ behavior: "smooth" }); setActive(id); }
  };

  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:50,display:"flex",justifyContent:"center",paddingTop:"1.5rem",paddingLeft:"1rem",paddingRight:"1rem" }}>
      <div style={{
        display:"inline-flex", alignItems:"center", borderRadius:"9999px",
        backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.1)",
        background:"rgba(20,20,20,0.9)", padding:"0.375rem", gap:"0.25rem",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.4)" : "none",
        transition:"box-shadow 0.3s"
      }}>
        {/* Logo */}
        <button onClick={() => scrollTo("Home")} style={{ position:"relative", width:"2.25rem", height:"2.25rem", borderRadius:"9999px", display:"flex", alignItems:"center", justifyContent:"center", background:"none", border:"none", cursor:"pointer" }}>
          <span style={{ position:"absolute", inset:0, borderRadius:"9999px", background:"linear-gradient(90deg,#89AACC,#4E85BF)" }} />
          <span style={{ position:"relative", width:"1.75rem", height:"1.75rem", borderRadius:"9999px", background:"#0a0a0a", display:"flex", alignItems:"center", justifyContent:"center", fontStyle:"italic", fontSize:"12px", color:"#f5f5f5", fontFamily:"serif" }}>JR</span>
        </button>
        <div style={{ width:"1px", height:"1.25rem", background:"rgba(255,255,255,0.1)", margin:"0 0.25rem" }} />
        {links.map((link) => (
          <button key={link} onClick={() => scrollTo(link)} style={{
            fontSize:"0.8rem", borderRadius:"9999px", padding:"0.4rem 1rem", border:"none", cursor:"pointer",
            background: active === link ? "rgba(255,255,255,0.1)" : "transparent",
            color: active === link ? "#f5f5f5" : "#878787",
            transition:"color 0.2s, background 0.2s"
          }}
          onMouseEnter={e => { if(active!==link){e.target.style.color="#f5f5f5"; e.target.style.background="rgba(255,255,255,0.07)";}}}
          onMouseLeave={e => { if(active!==link){e.target.style.color="#878787"; e.target.style.background="transparent";}}}
          >
            {link}
          </button>
        ))}
        <div style={{ width:"1px", height:"1.25rem", background:"rgba(255,255,255,0.1)", margin:"0 0.25rem" }} />
        <a href="mailto:medidajeevanreddy499@gmail.com?subject=Let's Work Together" style={{
          fontSize:"0.8rem", borderRadius:"9999px", padding:"0.4rem 1rem", color:"#878787",
          textDecoration:"none", transition:"color 0.2s"
        }}
        onMouseEnter={e=>e.target.style.color="#f5f5f5"}
        onMouseLeave={e=>e.target.style.color="#878787"}
        >Hire me ↗</a>
      </div>
    </nav>
  );
}
