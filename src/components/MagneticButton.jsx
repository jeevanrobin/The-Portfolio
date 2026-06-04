import { useRef } from "react";

/* Magnetic hover — element follows cursor slightly */
export default function MagneticButton({ children, style = {}, className = "", ...props }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el   = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) * 0.25;
    const dy   = (e.clientY - cy) * 0.25;
    el.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
    el.style.transition = "transform 0.2s ease";
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0) scale(1)";
    el.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ display:"inline-block", ...style }} className={className} {...props}>
      {children}
    </div>
  );
}
