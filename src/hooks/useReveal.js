import { useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion";

export default function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(reducedMotion);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion) {
      setRevealed(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, reducedMotion]);

  return [ref, revealed];
}
