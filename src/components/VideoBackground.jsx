import { useEffect, useRef } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

const HLS_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function VideoBackground({ flip = false, overlay = "rgba(0,0,0,0.3)" }) {
  const videoRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return undefined;
    let hls;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_URL;
      video.play().catch(() => {});
    } else {
      import("hls.js").then(({ default: Hls }) => {
        if (!video.isConnected || !Hls.isSupported()) return;
        hls = new Hls({ startLevel: -1, autoStartLoad: true });
        hls.loadSource(HLS_URL);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
      });
    }
    return () => hls?.destroy();
  }, [reducedMotion]);

  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      <video
        ref={videoRef}
        aria-hidden="true"
        autoPlay muted loop playsInline
        style={{
          position:"absolute", top:"50%", left:"50%",
          minWidth:"100%", minHeight:"100%",
          objectFit:"cover",
          transform: flip ? "translate(-50%,-50%) scaleY(-1)" : "translate(-50%,-50%)",
          opacity: 0.6,
        }}
      />
      {/* Dark overlay */}
      <div style={{ position:"absolute", inset:0, background: overlay }} />
      {/* Bottom fade (only if not flipped) */}
      {!flip && (
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"14rem", background:"linear-gradient(to top, #0a0a0a, transparent)" }} />
      )}
      {/* Fallback animated gradient (shows while video loads) */}
      <div style={{
        position:"absolute", inset:0, zIndex:-1,
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(78,133,191,0.25) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(137,170,204,0.15) 0%, transparent 60%)",
      }} />
    </div>
  );
}
