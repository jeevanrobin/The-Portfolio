import { useEffect, useState } from 'react';

export default function ScrollToTopButton({ showAfter = 250 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > showAfter);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-to-top ${visible ? 'show' : ''}`}
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
        color: 'white',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(79, 172, 254, 0.3)'
      }}
    >
      ↑
    </button>
  );
}