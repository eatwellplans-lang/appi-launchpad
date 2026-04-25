import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import bubbleImg from "@/assets/ai-bubble.png";

const AIBubble = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
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

      // Sphere slow rotation + breathing scale
      gsap.to(imgRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
        transformOrigin: "center",
      });
      gsap.to(imgRef.current, {
        scale: 1.04,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(haloRef.current, {
        opacity: 0.55,
        scale: 1.08,
        duration: 3,
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
      const imgX = gsap.quickTo(imgRef.current, "x", { duration: 0.6, ease: "power3.out" });
      const imgY = gsap.quickTo(imgRef.current, "y", { duration: 0.6, ease: "power3.out" });

      const wrap = wrapRef.current;
      const onMove = (e: MouseEvent) => {
        const r = wrap!.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / r.width;
        const dy = (e.clientY - cy) / r.height;
        rotY(dx * 22);
        rotX(-dy * 22);
        imgX(dx * 24);
        imgY(dy * 24);
      };
      const onLeave = () => {
        rotX(0); rotY(0); imgX(0); imgY(0);
      };
      const onEnter = () => {
        gsap.to(bubbleRef.current, { scale: 1.06, duration: 0.6, ease: "power3.out" });
        gsap.to(haloRef.current, { opacity: 0.85, duration: 0.6, ease: "power3.out" });
        gsap.to([ring1Ref.current, ring2Ref.current, ring3Ref.current], {
          scale: 1.05, duration: 0.6, ease: "power3.out", stagger: 0.05,
        });
      };
      const onOut = () => {
        gsap.to(bubbleRef.current, { scale: 1, duration: 0.7, ease: "power3.out" });
        gsap.to(haloRef.current, { opacity: 0.5, duration: 0.7, ease: "power3.out" });
        gsap.to([ring1Ref.current, ring2Ref.current, ring3Ref.current], {
          scale: 1, duration: 0.7, ease: "power3.out",
        });
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
      <div ref={haloRef} className="absolute inset-[-6%] rounded-full bg-gradient-primary opacity-40 blur-3xl will-change-transform" />

      <div ref={bubbleRef} className="relative h-full w-full will-change-transform">
        {/* Particle sphere image */}
        <div ref={coreRef} className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <img
            ref={imgRef}
            src={bubbleImg}
            alt="Animated AI particle sphere"
            loading="eager"
            className="h-full w-full object-contain will-change-transform select-none pointer-events-none"
            style={{
              filter: "drop-shadow(0 0 60px hsl(var(--primary) / 0.6)) drop-shadow(0 0 120px hsl(var(--primary-glow) / 0.35))",
              mixBlendMode: "screen",
            }}
            draggable={false}
          />
          {/* Inner aurora glow behind sphere */}
          <div className="absolute inset-[20%] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.35), transparent 65%)",
              filter: "blur(20px)",
            }}
          />
        </div>

        {/* Orbital rings */}
        <div ref={ring1Ref} className="absolute inset-[4%] rounded-full border border-primary/30 will-change-transform"
          style={{ borderStyle: "dashed" }}>
          <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary))]" />
        </div>
        <div ref={ring2Ref} className="absolute inset-[1%] rounded-full border border-primary-glow/25 will-change-transform">
          <div className="absolute top-1/2 -right-1.5 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary-glow shadow-[0_0_18px_hsl(var(--primary-glow))]" />
        </div>
        <div ref={ring3Ref} className="absolute -inset-2 rounded-full border border-primary/15 will-change-transform">
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary/80 shadow-[0_0_14px_hsl(var(--primary))]" />
        </div>
      </div>
    </div>
  );
};

export default AIBubble;