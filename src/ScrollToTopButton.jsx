import { useEffect, useRef, useState, useCallback } from 'react';

export default function ScrollToTopButton({ showAfter = 300, delta = 5 }) {
  const [visible, setVisible] = useState(false);
  const lastY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      
      // Always show after scrolling past threshold
      if (y > showAfter) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      lastY.current = y;
    };

    onScroll(); // set initial state
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter, delta]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button
      className={`scroll-to-top ${visible ? 'show' : 'hide'}`}
      aria-label="Scroll to top"
      title="Scroll to top"
      onClick={scrollToTop}
    >
      ↑
    </button>
  );
}