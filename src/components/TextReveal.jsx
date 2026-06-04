import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* Splits text into words, animates each up from a clip mask */
export default function TextReveal({ text, as = "h2", delay = 0, style = {} }) {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");
  const Tag   = as;

  return (
    <Tag ref={ref} style={{ overflow:"hidden", display:"flex", flexWrap:"wrap", gap:"0.25em", ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow:"hidden", display:"inline-block" }}>
          <motion.span
            style={{ display:"inline-block" }}
            initial={{ y:"110%", opacity:0 }}
            animate={inView ? { y:0, opacity:1 } : {}}
            transition={{ duration:0.7, ease:[0.25,0.1,0.25,1], delay: delay + i * 0.06 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
