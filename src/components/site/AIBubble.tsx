import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import bubbleImg from "@/assets/ai-bubble.png";

/**
 * Immersive AI Bubble
 * - GSAP idle: breathing, slow rotation, halo pulse
 * - Mouse-tracked 3D tilt + magnetic parallax
 * - Canvas particle aura that follows the cursor (ripple wave)
 * - Scroll-driven ripple pulse
 * - Reduced-motion fallback: static frame
 */
const AIBubble = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const innerGlowRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // ---- Idle animations ----
      gsap.to(tiltRef.current, {
        y: -14,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(imgRef.current, {
        rotation: 360,
        duration: 80,
        repeat: -1,
        ease: "none",
        transformOrigin: "center",
      });

      // Breathing scale on the sphere
      gsap.to(imgRef.current, {
        scale: 1.05,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Halo pulse
      gsap.to(haloRef.current, {
        opacity: 0.85,
        scale: 1.08,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Inner core flicker
      gsap.to(innerGlowRef.current, {
        opacity: 0.9,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ---- Particle aura on canvas ----
      const canvas = canvasRef.current!;
      const c = canvas.getContext("2d")!;
      let w = 0, h = 0, cx = 0, cy = 0, R = 0;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      type Particle = { a: number; r: number; sp: number; size: number; alpha: number; depth: number };
      let particles: Particle[] = [];

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        w = rect.width; h = rect.height;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        c.setTransform(dpr, 0, 0, dpr, 0, 0);
        cx = w / 2; cy = h / 2;
        R = Math.min(w, h) * 0.46;
        const count = Math.max(40, Math.min(140, Math.floor((w * h) / 9000)));
        particles = Array.from({ length: count }, () => ({
          a: Math.random() * Math.PI * 2,
          r: R * (0.92 + Math.random() * 0.18),
          sp: (Math.random() * 0.4 + 0.1) * (Math.random() < 0.5 ? -1 : 1) * 0.003,
          size: Math.random() * 1.6 + 0.6,
          alpha: Math.random() * 0.5 + 0.3,
          depth: Math.random(),
        }));
      };
      resize();
      const onResize = () => resize();
      window.addEventListener("resize", onResize);

      // Mouse + ripple state
      const mouse = { x: -9999, y: -9999, active: false, vx: 0, vy: 0, lastX: 0, lastY: 0 };
      const ripples: { x: number; y: number; t: number; max: number }[] = [];

      const onMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const nx = e.clientX - rect.left;
        const ny = e.clientY - rect.top;
        mouse.vx = nx - mouse.lastX;
        mouse.vy = ny - mouse.lastY;
        mouse.lastX = nx; mouse.lastY = ny;
        mouse.x = nx; mouse.y = ny;
        mouse.active = true;
      };
      const onLeave = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999; };
      const onScroll = () => {
        ripples.push({ x: cx, y: cy, t: 0, max: R * 1.6 });
        if (ripples.length > 4) ripples.shift();
      };
      wrapRef.current?.addEventListener("mousemove", onMove);
      wrapRef.current?.addEventListener("mouseleave", onLeave);
      window.addEventListener("scroll", onScroll, { passive: true });

      let raf = 0;
      let last = performance.now();
      const tick = (now: number) => {
        const dt = Math.min(40, now - last) / 16.67;
        last = now;
        c.clearRect(0, 0, w, h);

        // Update + draw particles around the sphere edge
        for (const p of particles) {
          p.a += p.sp * dt;
          let px = cx + Math.cos(p.a) * p.r;
          let py = cy + Math.sin(p.a) * p.r;

          // Mouse attraction (gentle pull toward cursor)
          if (mouse.active) {
            const dx = mouse.x - px;
            const dy = mouse.y - py;
            const d = Math.hypot(dx, dy);
            const radius = 160;
            if (d < radius) {
              const f = (1 - d / radius) * 0.35;
              px += dx * f * 0.15;
              py += dy * f * 0.15;
            }
          }

          // Ripple displacement
          for (const rp of ripples) {
            const dx = px - rp.x;
            const dy = py - rp.y;
            const d = Math.hypot(dx, dy);
            const ring = rp.t;
            const band = 26;
            if (Math.abs(d - ring) < band) {
              const force = (1 - Math.abs(d - ring) / band) * 8;
              const ang = Math.atan2(dy, dx);
              px += Math.cos(ang) * force * 0.5;
              py += Math.sin(ang) * force * 0.5;
            }
          }

          const glow = c.createRadialGradient(px, py, 0, px, py, p.size * 6);
          glow.addColorStop(0, `hsla(265, 90%, 75%, ${p.alpha})`);
          glow.addColorStop(1, "hsla(265, 90%, 60%, 0)");
          c.fillStyle = glow;
          c.beginPath();
          c.arc(px, py, p.size * 6, 0, Math.PI * 2);
          c.fill();

          c.fillStyle = `hsla(275, 100%, 88%, ${Math.min(1, p.alpha + 0.25)})`;
          c.beginPath();
          c.arc(px, py, p.size, 0, Math.PI * 2);
          c.fill();
        }

        // Draw + advance ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rp = ripples[i];
          rp.t += dt * 6;
          const alpha = Math.max(0, 1 - rp.t / rp.max) * 0.35;
          c.strokeStyle = `hsla(270, 100%, 75%, ${alpha})`;
          c.lineWidth = 1.5;
          c.beginPath();
          c.arc(rp.x, rp.y, rp.t, 0, Math.PI * 2);
          c.stroke();
          if (rp.t > rp.max) ripples.splice(i, 1);
        }

        raf = requestAnimationFrame(tick);
      };

      if (!reduced) raf = requestAnimationFrame(tick);
      else tick(performance.now());

      // ---- 3D tilt + magnetic image parallax ----
      gsap.set(tiltRef.current, { transformPerspective: 1100, transformOrigin: "center" });
      const rotX = gsap.quickTo(tiltRef.current, "rotationX", { duration: 0.8, ease: "power3.out" });
      const rotY = gsap.quickTo(tiltRef.current, "rotationY", { duration: 0.8, ease: "power3.out" });
      const imgX = gsap.quickTo(imgRef.current, "x", { duration: 0.7, ease: "power3.out" });
      const imgY = gsap.quickTo(imgRef.current, "y", { duration: 0.7, ease: "power3.out" });

      const onTilt = (e: MouseEvent) => {
        if (reduced) return;
        const r = wrapRef.current!.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        rotY(dx * 18);
        rotX(-dy * 18);
        imgX(dx * 22);
        imgY(dy * 22);
      };
      const onTiltLeave = () => {
        rotX(0); rotY(0); imgX(0); imgY(0);
      };
      wrapRef.current?.addEventListener("mousemove", onTilt);
      wrapRef.current?.addEventListener("mouseleave", onTiltLeave);

      // Hover intensification
      const onEnter = () => {
        gsap.to(haloRef.current, { opacity: 1, scale: 1.15, duration: 0.7, ease: "power3.out" });
        gsap.to(imgRef.current, { scale: 1.08, duration: 0.7, ease: "power3.out", overwrite: "auto" });
        gsap.to(rippleRef.current, { opacity: 1, scale: 1.1, duration: 0.8, ease: "power3.out" });
      };
      const onExit = () => {
        gsap.to(haloRef.current, { opacity: 0.7, scale: 1, duration: 0.9, ease: "power3.out" });
        gsap.to(imgRef.current, { scale: 1, duration: 0.9, ease: "power3.out", overwrite: "auto" });
        gsap.to(rippleRef.current, { opacity: 0.6, scale: 1, duration: 0.9, ease: "power3.out" });
      };
      wrapRef.current?.addEventListener("mouseenter", onEnter);
      wrapRef.current?.addEventListener("mouseleave", onExit);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", onScroll);
        wrapRef.current?.removeEventListener("mousemove", onMove);
        wrapRef.current?.removeEventListener("mouseleave", onLeave);
        wrapRef.current?.removeEventListener("mousemove", onTilt);
        wrapRef.current?.removeEventListener("mouseleave", onTiltLeave);
        wrapRef.current?.removeEventListener("mouseenter", onEnter);
        wrapRef.current?.removeEventListener("mouseleave", onExit);
      };
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-square w-full max-w-[580px] mx-auto"
      style={{ perspective: "1200px" }}
    >
      {/* Outer purple halo */}
      <div
        ref={haloRef}
        aria-hidden
        className="absolute inset-[-8%] rounded-full opacity-70 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(265 90% 60% / 0.55), hsl(275 90% 50% / 0.25) 45%, transparent 70%)",
        }}
      />

      {/* Soft ripple ring (hover intensifies) */}
      <div
        ref={rippleRef}
        aria-hidden
        className="absolute inset-[2%] rounded-full opacity-60 will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 58%, hsl(270 100% 70% / 0.18) 62%, transparent 68%)",
          filter: "blur(2px)",
        }}
      />

      {/* Tilted layer */}
      <div ref={tiltRef} className="relative h-full w-full will-change-transform">
        {/* Inner aurora glow behind the sphere */}
        <div
          ref={innerGlowRef}
          aria-hidden
          className="absolute inset-[18%] rounded-full pointer-events-none opacity-70"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, hsl(265 100% 70% / 0.55), hsl(275 100% 55% / 0.25) 40%, transparent 70%)",
            filter: "blur(24px)",
          }}
        />

        {/* The particle sphere image */}
        <img
          ref={imgRef}
          src={bubbleImg}
          alt="Animated AI particle sphere"
          loading="eager"
          width={1024}
          height={1024}
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain will-change-transform select-none pointer-events-none"
          style={{
            filter:
              "drop-shadow(0 0 60px hsl(265 100% 65% / 0.6)) drop-shadow(0 0 120px hsl(275 100% 55% / 0.35))",
            mixBlendMode: "screen",
          }}
        />

        {/* Particle aura canvas (cursor + scroll reactive) */}
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{ mixBlendMode: "screen" }}
        />
      </div>
    </div>
  );
};

export default AIBubble;
