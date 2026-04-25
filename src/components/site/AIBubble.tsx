import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Sparkles } from "lucide-react";

const AIBubble = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // Idle floating
      gsap.to(bubbleRef.current, {
        y: -18,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Core pulse
      gsap.to(coreRef.current, {
        scale: 1.08,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Counter-rotating rings
      gsap.to(ring1Ref.current, { rotation: 360, duration: 22, repeat: -1, ease: "none" });
      gsap.to(ring2Ref.current, { rotation: -360, duration: 30, repeat: -1, ease: "none" });
      gsap.to(ring3Ref.current, { rotation: 360, duration: 45, repeat: -1, ease: "none" });

      if (reduced) return;

      // Hover-tracked tilt + magnetic core
      gsap.set(bubbleRef.current, { transformPerspective: 1000, transformOrigin: "center" });
      const rotX = gsap.quickTo(bubbleRef.current, "rotationX", { duration: 0.7, ease: "power3.out" });
      const rotY = gsap.quickTo(bubbleRef.current, "rotationY", { duration: 0.7, ease: "power3.out" });
      const coreX = gsap.quickTo(coreRef.current, "x", { duration: 0.6, ease: "power3.out" });
      const coreY = gsap.quickTo(coreRef.current, "y", { duration: 0.6, ease: "power3.out" });

      const wrap = wrapRef.current;
      const onMove = (e: MouseEvent) => {
        const r = wrap!.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / r.width;
        const dy = (e.clientY - cy) / r.height;
        rotY(dx * 18);
        rotX(-dy * 18);
        coreX(dx * 30);
        coreY(dy * 30);
      };
      const onLeave = () => {
        rotX(0); rotY(0); coreX(0); coreY(0);
      };
      const onEnter = () => {
        gsap.to(bubbleRef.current, { scale: 1.04, duration: 0.5, ease: "power3.out" });
      };
      const onOut = () => {
        gsap.to(bubbleRef.current, { scale: 1, duration: 0.6, ease: "power3.out" });
      };

      wrap?.addEventListener("mousemove", onMove);
      wrap?.addEventListener("mouseleave", onLeave);
      wrap?.addEventListener("mouseenter", onEnter);
      wrap?.addEventListener("mouseleave", onOut);

      return () => {
        wrap?.removeEventListener("mousemove", onMove);
        wrap?.removeEventListener("mouseleave", onLeave);
        wrap?.removeEventListener("mouseenter", onEnter);
        wrap?.removeEventListener("mouseleave", onOut);
      };
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative aspect-square w-full max-w-[560px] mx-auto" style={{ perspective: "1200px" }}>
      {/* Outer halo */}
      <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-30 blur-3xl animate-glow-pulse" />

      <div ref={bubbleRef} className="relative h-full w-full will-change-transform">
        {/* Glass bubble */}
        <div className="absolute inset-[12%] rounded-full glass-card glow-border overflow-hidden"
          style={{
            background: "radial-gradient(circle at 30% 25%, hsl(var(--primary) / 0.35), hsl(var(--primary) / 0.05) 60%, transparent 70%)",
            boxShadow: "inset 0 0 60px hsl(var(--primary) / 0.3), 0 30px 80px -20px hsl(var(--primary) / 0.5)",
          }}
        >
          {/* Inner shimmer */}
          <div className="absolute inset-0 opacity-60"
            style={{
              background: "conic-gradient(from 0deg at 50% 50%, hsl(214 100% 60% / 0.4), hsl(190 100% 60% / 0.2), hsl(255 80% 65% / 0.4), hsl(214 100% 60% / 0.4))",
              animation: "aurora-spin 18s linear infinite",
            }}
          />
          {/* Highlight */}
          <div className="absolute top-[8%] left-[15%] h-[35%] w-[40%] rounded-full bg-white/30 blur-2xl" />
        </div>

        {/* Core */}
        <div ref={coreRef} className="absolute inset-[36%] rounded-full bg-gradient-to-br from-primary-glow to-primary flex items-center justify-center will-change-transform"
          style={{ boxShadow: "0 0 60px hsl(var(--primary) / 0.8), inset 0 0 30px hsl(var(--primary-glow) / 0.6)" }}>
          <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-primary-foreground" />
        </div>

        {/* Orbital rings */}
        <div ref={ring1Ref} className="absolute inset-[6%] rounded-full border border-primary/30"
          style={{ borderStyle: "dashed" }}>
          <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary))]" />
        </div>
        <div ref={ring2Ref} className="absolute inset-[2%] rounded-full border border-primary-glow/25">
          <div className="absolute top-1/2 -right-1.5 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary-glow shadow-[0_0_18px_hsl(var(--primary-glow))]" />
        </div>
        <div ref={ring3Ref} className="absolute -inset-2 rounded-full border border-primary/15">
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary/80 shadow-[0_0_14px_hsl(var(--primary))]" />
        </div>
      </div>
    </div>
  );
};

export default AIBubble;