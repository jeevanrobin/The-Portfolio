import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import VideoBackground from "./VideoBackground";

const socials = [
  { label:"LinkedIn", href:"https://www.linkedin.com/in/medida-jeevan-reddy-2673aa176/", icon:"fab fa-linkedin" },
  { label:"GitHub", href:"https://github.com/jeevanrobin", icon:"fab fa-github" },
  { label:"Email", href:"mailto:medidajeevanreddy499@gmail.com", icon:"fas fa-envelope" },
  { label:"Phone", href:"tel:+918309823797", icon:"fas fa-phone" },
];

export default function ContactSection() {
  const ref = useRef(null);
  const marqueeRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".marquee-track", { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" style={{ position:"relative", overflow:"hidden", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
      {/* Flipped footer video */}
      <div style={{ position:"absolute", inset:0, zIndex:0 }}>
        <VideoBackground flip={true} overlay="rgba(0,0,0,0.7)" />
      </div>

      <div style={{ position:"relative", zIndex:10, paddingTop:"6rem", paddingBottom:"3rem" }}>
        {/* Marquee */}
        <div ref={marqueeRef} style={{ overflow:"hidden", padding:"1.5rem 0", borderTop:"1px solid rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.06)", marginBottom:"5rem" }}>
          <div className="marquee-track" style={{ display:"flex", whiteSpace:"nowrap" }}>
            {Array(20).fill("CLOUD NATIVE · DEVOPS · SRE · GCP · ").map((t,i)=>(
              <span key={i} style={{ fontSize:"clamp(1.5rem,3vw,2.5rem)", fontFamily:"serif", fontStyle:"italic", color:"rgba(255,255,255,0.12)", marginRight:"2rem", flexShrink:0 }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ maxWidth:"56rem", margin:"0 auto", padding:"0 1.5rem" }} ref={ref}>
          <motion.div style={{ textAlign:"center", marginBottom:"4rem" }}
            initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.75rem", marginBottom:"1rem" }}>
              <div style={{ width:"2rem", height:"1px", background:"rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.3em" }}>Contact</span>
              <div style={{ width:"2rem", height:"1px", background:"rgba(255,255,255,0.1)" }} />
            </div>
            <h2 style={{ fontSize:"clamp(3rem,9vw,6rem)", fontFamily:"serif", fontStyle:"italic", color:"#f5f5f5", marginBottom:"1rem", lineHeight:1 }}>
              Let's <em>connect</em>
            </h2>
            <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.9rem", maxWidth:"28rem", margin:"0 auto 2rem", lineHeight:1.7 }}>
              Available for new opportunities. Let's talk about your next cloud project or DevOps challenge.
            </p>
            <motion.a href="mailto:medidajeevanreddy499@gmail.com?subject=Let's Work Together"
              style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", borderRadius:"9999px", border:"1px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.06)", padding:"1rem 2.5rem", color:"#f5f5f5", fontSize:"0.9rem", textDecoration:"none", backdropFilter:"blur(12px)" }}
              whileHover={{ scale:1.04, borderColor:"rgba(137,170,204,0.6)" }}>
              medidajeevanreddy499@gmail.com ↗
            </motion.a>
          </motion.div>

          <motion.div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"1rem", paddingTop:"2rem", borderTop:"1px solid rgba(255,255,255,0.07)" }}
            initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6, delay:0.3 }}>
            <div style={{ display:"flex", gap:"0.75rem" }}>
              {socials.map(s => (
                <motion.a key={s.label} href={s.href} target={s.href.startsWith("http")?"_blank":"_self"} rel="noopener noreferrer" title={s.label}
                  style={{ width:"2.5rem", height:"2.5rem", borderRadius:"9999px", border:"1px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.5)", textDecoration:"none", backdropFilter:"blur(8px)" }}
                  whileHover={{ color:"#f5f5f5", borderColor:"rgba(137,170,204,0.5)", scale:1.1 }}>
                  <i className={s.icon} style={{ fontSize:"0.875rem" }} />
                </motion.a>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.85rem", color:"rgba(255,255,255,0.5)" }}>
              <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#4ade80", animation:"pulseDot 2s ease-in-out infinite" }} />
              Available for projects
            </div>
            <p style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.75rem" }}>Hyderabad, India · {new Date().getFullYear()}</p>
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes pulseDot{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </section>
  );
}
