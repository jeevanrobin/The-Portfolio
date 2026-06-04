import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const lagged  = useRef({ x: 0, y: 0 });  // renamed — no clash with ringRef
  const rafId   = useRef(null);
  const isHover = useRef(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onOver = (e) => { if (e.target.closest("a,button")) isHover.current = true; };
    const onOut  = (e) => { if (e.target.closest("a,button")) isHover.current = false; };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover",  onOver, { passive: true });
    document.addEventListener("mouseout",   onOut,  { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      const { x, y } = mouse.current;

      // Dot: instant
      dot.style.transform = `translate(${x - 4}px,${y - 4}px)`;

      // Ring: lerped
      lagged.current.x = lerp(lagged.current.x, x, 0.1);
      lagged.current.y = lerp(lagged.current.y, y, 0.1);
      const s = isHover.current ? 2 : 1;
      ring.style.transform = `translate(${lagged.current.x - 16}px,${lagged.current.y - 16}px) scale(${s})`;
      ring.style.opacity   = isHover.current ? "0.7" : "0.3";

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position:"fixed", top:0, left:0, width:8, height:8, borderRadius:"50%",
        background:"#f5f5f5", pointerEvents:"none", zIndex:99999,
        mixBlendMode:"difference",
      }} />
      <div ref={ringRef} style={{
        position:"fixed", top:0, left:0, width:32, height:32, borderRadius:"50%",
        border:"1.5px solid rgba(137,170,204,0.7)", pointerEvents:"none", zIndex:99998,
        transition:"opacity 0.3s, transform 0.08s linear",
      }} />
    </>
  );
}
