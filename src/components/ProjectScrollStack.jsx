import { Children, useEffect, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

export default function ProjectScrollStack({ children }) {
  const stackRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const items = Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack || reducedMotion) return undefined;
    const stages = [...stack.querySelectorAll(".project-stack-item")];
    let frame = 0;
    const update = () => {
      const viewport = window.innerHeight;
      const focusLine = viewport * 0.28;
      let nextActive = 0;
      stages.forEach((stage, index) => {
        const rect = stage.getBoundingClientRect();
        if (rect.top <= focusLine && rect.bottom > focusLine) nextActive = index;
        stage.classList.toggle("is-active", rect.top <= focusLine && rect.bottom > focusLine);
        stage.classList.toggle("is-past", rect.bottom <= focusLine);
        stage.classList.toggle("is-upcoming", rect.top > focusLine);
      });
      setActiveIndex(current => current === nextActive ? current : nextActive);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <div ref={stackRef} className={`project-scroll-stack${reducedMotion ? " is-static" : ""}`}>
      <div className="project-progress" aria-label={`Project ${String(activeIndex + 1).padStart(2, "0")} of ${String(items.length).padStart(2, "0")}`}>
        <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
        <span>/ {String(items.length).padStart(2, "0")}</span>
        <i aria-hidden="true"><b style={{ height: `${((activeIndex + 1) / items.length) * 100}%` }} /></i>
      </div>
      {items.map((child, index) => (
        <div className={`project-stack-item${index === 0 && !reducedMotion ? " is-active" : ""}${reducedMotion ? " is-static" : ""}`} key={child.key ?? index}>
          {child}
        </div>
      ))}
    </div>
  );
}
