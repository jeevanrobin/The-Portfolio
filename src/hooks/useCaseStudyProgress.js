import { useEffect, useState } from "react";

export default function useCaseStudyProgress(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      }),
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.6] }
    );
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
