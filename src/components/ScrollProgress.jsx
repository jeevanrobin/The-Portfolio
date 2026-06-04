import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const update = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${total > 0 ? scrolled / total : 0})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, height:"2px", zIndex:9999, pointerEvents:"none" }}>
      <div ref={barRef} style={{
        height:"100%",
        background:"linear-gradient(90deg,#89AACC,#4E85BF,#89AACC)",
        backgroundSize:"200%",
        transformOrigin:"left",
        transform:"scaleX(0)",
        boxShadow:"0 0 8px rgba(137,170,204,0.6)",
        animation:"gradientShift 3s ease infinite",
      }} />
      <style>{`@keyframes gradientShift{0%{background-position:0%}100%{background-position:200%}}`}</style>
    </div>
  );
}
