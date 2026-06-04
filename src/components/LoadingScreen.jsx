import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["Design", "Deploy", "Automate"];

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2700;
    const raf = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) requestAnimationFrame(raf);
      else setTimeout(onComplete, 400);
    };
    requestAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <motion.div className="absolute top-6 left-6 text-xs text-[#878787] uppercase tracking-[0.3em]" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        Portfolio
      </motion.div>
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p key={wordIndex} className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-white/80" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.3 }}>
            {words[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-10 right-6 text-7xl md:text-9xl font-serif text-white tabular-nums leading-none">
        {String(count).padStart(3, "0")}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
        <motion.div className="h-full" style={{ background: "linear-gradient(90deg,#89AACC,#4E85BF)", scaleX: count / 100, transformOrigin: "left", boxShadow: "0 0 8px rgba(137,170,204,0.35)" }} />
      </div>
    </motion.div>
  );
}
