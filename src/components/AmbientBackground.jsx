/* Pure CSS ambient orbs — no canvas, no RAF loop, zero JS overhead */
export default function AmbientBackground() {
  const orbs = [
    { w:700, h:700, top:"-15%",  left:"-10%",   color:"rgba(78,133,191,0.12)",   dur:"18s", delay:"0s"   },
    { w:600, h:600, top:"40%",   right:"-15%",   color:"rgba(137,170,204,0.09)",  dur:"22s", delay:"-7s"  },
    { w:500, h:500, bottom:"-5%",left:"30%",     color:"rgba(60,100,200,0.08)",   dur:"26s", delay:"-13s" },
    { w:400, h:400, top:"20%",   left:"55%",     color:"rgba(100,150,220,0.06)",  dur:"20s", delay:"-5s"  },
  ];

  return (
    <>
      {/* Drifting gradient orbs (CSS-only) */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
        {orbs.map((o, i) => (
          <div key={i} style={{
            position:"absolute",
            width: o.w, height: o.h,
            top: o.top, left: o.left, right: o.right, bottom: o.bottom,
            borderRadius:"50%",
            background:`radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            filter:"blur(40px)",
            animation:`orbDrift${i+1} ${o.dur} ease-in-out infinite alternate`,
            animationDelay: o.delay,
            willChange:"transform",
          }} />
        ))}
      </div>

      {/* Noise grain texture */}
      <div style={{
        position:"fixed", inset:0, zIndex:1, pointerEvents:"none",
        opacity:0.028,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:"180px 180px",
      }} />

      <style>{`
        @keyframes orbDrift1 { from{transform:translate(0,0) scale(1)}   to{transform:translate(60px,40px) scale(1.1)}  }
        @keyframes orbDrift2 { from{transform:translate(0,0) scale(1)}   to{transform:translate(-50px,60px) scale(0.9)} }
        @keyframes orbDrift3 { from{transform:translate(0,0) scale(1)}   to{transform:translate(40px,-50px) scale(1.05)} }
        @keyframes orbDrift4 { from{transform:translate(0,0) scale(1)}   to{transform:translate(-30px,40px) scale(0.95)} }
      `}</style>
    </>
  );
}
