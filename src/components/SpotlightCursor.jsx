import { useEffect, useRef } from "react";

export default function SpotlightCursor() {
  const spotRef = useRef(null);
  const pos     = useRef({ x: -500, y: -500 });
  const current = useRef({ x: -500, y: -500 });
  const raf     = useRef(null);

  useEffect(() => {
    const spot = spotRef.current;
    if (!spot) return;

    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    document.addEventListener("mousemove", onMove, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.06);
      current.current.y = lerp(current.current.y, pos.current.y, 0.06);
      spot.style.background =
        `radial-gradient(600px circle at ${current.current.x}px ${current.current.y}px,
          rgba(78,133,191,0.07) 0%,
          rgba(137,170,204,0.04) 30%,
          transparent 70%)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={spotRef} style={{
      position:"fixed", inset:0, zIndex:1,
      pointerEvents:"none",
      transition:"opacity 0.3s",
    }} />
  );
}
