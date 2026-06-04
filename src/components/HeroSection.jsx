import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import VideoBackground from "./VideoBackground";

const roles = ["DevOps", "Cloud", "SRE", "GCP"];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".name-reveal", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.1 });
      tl.fromTo(".blur-in", { opacity: 0, filter: "blur(10px)", y: 20 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.12 }, "-=0.8");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={heroRef} style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
      <VideoBackground overlay="rgba(0,0,0,0.45)" />

      {/* Grid overlay */}
      <div style={{ position:"absolute", inset:0, opacity:0.03, zIndex:1, backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

      {/* Content */}
      <div style={{ position:"relative", zIndex:10, textAlign:"center", padding:"0 1.5rem", maxWidth:"56rem", margin:"0 auto", paddingTop:"6rem" }}>
        <p className="blur-in" style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"0.3em", marginBottom:"2rem" }}>
          GCP DevOps Engineer · Hyderabad, India
        </p>
        <h1 className="name-reveal" style={{ fontSize:"clamp(3.5rem,11vw,8rem)", fontFamily:"serif", fontStyle:"italic", lineHeight:0.9, letterSpacing:"-0.02em", color:"#f5f5f5", marginBottom:"1.5rem" }}>
          Jeevan Reddy
        </h1>
        <p className="blur-in" style={{ fontSize:"1.1rem", color:"rgba(255,255,255,0.6)", marginBottom:"1rem" }}>
          A{" "}
          <AnimatePresence mode="wait">
            <motion.span key={roleIndex} style={{ fontFamily:"serif", fontStyle:"italic", color:"#f5f5f5", display:"inline-block" }}
              initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.3 }}>
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>{" "}
          engineer with 8+ years of experience.
        </p>
        <p className="blur-in" style={{ fontSize:"0.9rem", color:"rgba(255,255,255,0.45)", maxWidth:"28rem", margin:"0 auto 2.5rem", lineHeight:1.8 }}>
          Transforming businesses with cloud-native solutions, CI/CD automation, and infrastructure reliability on GCP.
        </p>

        {/* Stats */}
        <div className="blur-in" style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"0.75rem", marginBottom:"2.5rem" }}>
          {[["8+","Years Exp"],["3","Companies"],["GCP","Cloud Expert"],["SRE","@ EY LLP"]].map(([val,label]) => (
            <div key={label} style={{ display:"flex", flexDirection:"column", alignItems:"center", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"1rem", padding:"0.75rem 1.25rem", backdropFilter:"blur(8px)" }}>
              <span style={{ fontSize:"1.5rem", fontFamily:"serif", fontWeight:"bold", background:"linear-gradient(90deg,#89AACC,#4E85BF)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{val}</span>
              <span style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.1em", marginTop:"0.2rem" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="blur-in" style={{ display:"inline-flex", gap:"1rem", flexWrap:"wrap", justifyContent:"center" }}>
          <a href="#works" onClick={e=>{e.preventDefault();document.getElementById("works")?.scrollIntoView({behavior:"smooth"})}}
            style={{ borderRadius:"9999px", padding:"0.875rem 1.75rem", background:"#f5f5f5", color:"#0a0a0a", fontSize:"0.875rem", fontWeight:500, textDecoration:"none", transition:"opacity 0.2s, transform 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.opacity="0.85";e.currentTarget.style.transform="scale(1.05)"}} onMouseLeave={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.transform="scale(1)"}}>
            See Works
          </a>
          <a href="mailto:medidajeevanreddy499@gmail.com"
            style={{ borderRadius:"9999px", padding:"0.875rem 1.75rem", border:"1px solid rgba(255,255,255,0.25)", background:"rgba(255,255,255,0.05)", color:"#f5f5f5", fontSize:"0.875rem", textDecoration:"none", backdropFilter:"blur(8px)", transition:"border-color 0.2s, transform 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(137,170,204,0.6)";e.currentTarget.style.transform="scale(1.05)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.25)";e.currentTarget.style.transform="scale(1)"}}>
            Reach out ↗
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:"absolute", bottom:"2.5rem", left:"50%", transform:"translateX(-50%)", zIndex:20, display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem" }}>
        <span style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.2em" }}>Scroll</span>
        <div style={{ width:"1px", height:"2.5rem", background:"rgba(255,255,255,0.15)", overflow:"hidden", position:"relative" }}>
          <div style={{ position:"absolute", top:0, width:"100%", height:"33%", background:"linear-gradient(90deg,#89AACC,#4E85BF)", animation:"scrollDown 1.5s ease-in-out infinite" }} />
        </div>
      </div>
      <style>{`@keyframes scrollDown{0%{transform:translateY(-100%)}100%{transform:translateY(300%)}}`}</style>
    </section>
  );
}
