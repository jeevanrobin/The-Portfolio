import Lenis from "lenis";
import { gsap } from "gsap";

let lenis = null;
let contentObserver = null;

// Scroll to an element (or "#id") with eased motion; falls back to native scrolling
// when smooth scrolling is off (reduced motion) so anchors still work.
export function scrollToTarget(target) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return false;
  if (lenis) {
    lenis.resize(); // page height can change after mount (lazy routes, late layout)
    lenis.scrollTo(el, { duration: 1.4 });
  }
  else el.scrollIntoView({ behavior: "auto" });
  return true;
}

function onAnchorClick(event) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest?.('a[href^="#"]');
  // Skip links must keep native behaviour so focus moves with the scroll.
  if (!link || link.classList.contains("skip-link") || link.getAttribute("href") === "#") return;
  const id = decodeURIComponent(link.getAttribute("href").slice(1));
  const el = document.getElementById(id);
  if (!el) return;
  event.preventDefault();
  scrollToTarget(el);
  history.pushState(null, "", `#${id}`);
}

// Inertial wheel scrolling driven by the GSAP ticker. Touch devices keep native
// scrolling; users who prefer reduced motion get none of this.
export function startSmoothScroll() {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  let tick = null;

  const enable = () => {
    if (lenis || media.matches) return;
    lenis = new Lenis({
      autoRaf: false,
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.95,
    });
    contentObserver = new ResizeObserver(() => lenis?.resize());
    contentObserver.observe(document.body);
    tick = time => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
  };

  const disable = () => {
    contentObserver?.disconnect();
    contentObserver = null;
    if (tick) gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
    tick = null;
  };

  const onPreferenceChange = () => (media.matches ? disable() : enable());

  enable();
  media.addEventListener?.("change", onPreferenceChange);
  document.addEventListener("click", onAnchorClick);

  return () => {
    media.removeEventListener?.("change", onPreferenceChange);
    document.removeEventListener("click", onAnchorClick);
    disable();
  };
}
