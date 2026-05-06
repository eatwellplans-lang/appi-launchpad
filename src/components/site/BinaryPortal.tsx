import { useEffect, useRef } from "react";

interface Props {
  className?: string;
}

/**
 * Animated binary AI portal — concentric rings of glowing 0s and 1s
 * rotating slowly with flicker, pulse, particles and depth.
 */
const BinaryPortal = ({ className = "" }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 640;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0, H = 0, CX = 0, CY = 0, R = 0;

    interface Digit {
      ring: number;       // ring index
      angle: number;      // radians
      char: string;
      baseAlpha: number;
      flickerPhase: number;
      flickerSpeed: number;
      bright: boolean;
      size: number;
    }
    interface Particle {
      x: number; y: number; vx: number; vy: number; life: number; max: number; size: number;
    }

    let digits: Digit[] = [];
    let particles: Particle[] = [];
    let rotation = 0;

    const RING_COUNT = isMobile ? 10 : 16;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      CX = W / 2;
      CY = H / 2;
      R = Math.min(W, H) * 0.46;
      build();
    };

    const build = () => {
      digits = [];
      const innerR = R * 0.42;
      const outerR = R;
      for (let r = 0; r < RING_COUNT; r++) {
        const t = r / (RING_COUNT - 1);
        const radius = innerR + (outerR - innerR) * t;
        // density grows with radius
        const circumference = 2 * Math.PI * radius;
        const spacing = isMobile ? 11 : 9;
        const count = Math.max(20, Math.floor(circumference / spacing));
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2 + Math.random() * 0.04;
          const bright = Math.random() < 0.12;
          digits.push({
            ring: r,
            angle,
            char: Math.random() < 0.5 ? "0" : "1",
            baseAlpha: 0.35 + Math.random() * 0.5,
            flickerPhase: Math.random() * Math.PI * 2,
            flickerSpeed: 0.5 + Math.random() * 2.5,
            bright,
            size: (isMobile ? 7 : 9) + (bright ? 2 : 0) + Math.random() * 1.5,
          });
        }
      }
    };

    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    let last = performance.now();

    const spawnParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = R * (0.95 + Math.random() * 0.05);
      const speed = 0.15 + Math.random() * 0.4;
      particles.push({
        x: CX + Math.cos(angle) * radius,
        y: CY + Math.sin(angle) * radius,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        max: 120 + Math.random() * 120,
        size: 0.6 + Math.random() * 1.2,
      });
    };

    const draw = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      const dts = dt / 16.67;

      ctx.clearRect(0, 0, W, H);

      // Background subtle radial vignette to add depth
      const bg = ctx.createRadialGradient(CX, CY, R * 0.2, CX, CY, R * 1.3);
      bg.addColorStop(0, "hsla(180, 100%, 40%, 0.05)");
      bg.addColorStop(0.6, "hsla(190, 100%, 40%, 0.02)");
      bg.addColorStop(1, "hsla(214, 100%, 50%, 0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Breathing scale
      const breath = 1 + Math.sin(now * 0.0008) * 0.015;
      // Global pulse
      const pulse = 0.85 + Math.sin(now * 0.0015) * 0.15;

      rotation += 0.0007 * dts; // slow clockwise

      ctx.save();
      ctx.translate(CX, CY);
      ctx.scale(breath, breath);
      ctx.font = `${isMobile ? 9 : 11}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const innerR = R * 0.42;
      const outerR = R;

      for (let i = 0; i < digits.length; i++) {
        const d = digits[i];
        const t = d.ring / (RING_COUNT - 1);
        const radius = innerR + (outerR - innerR) * t;

        // outer rings rotate slightly faster (depth illusion)
        const ringRot = rotation * (0.6 + t * 0.8);
        const a = d.angle + ringRot;
        const x = Math.cos(a) * radius;
        const y = Math.sin(a) * radius;

        // Flicker
        const flick = 0.6 + 0.4 * Math.sin(now * 0.001 * d.flickerSpeed + d.flickerPhase);
        // Random sparkle for some digits
        let sparkle = 1;
        if (Math.random() < 0.0008) sparkle = 2.2;

        // Depth fade — middle rings dimmer to enhance void; outer ring fades
        const depth = Math.sin(t * Math.PI); // peaks mid-ring
        const alpha = Math.min(1, d.baseAlpha * flick * pulse * (0.5 + depth * 0.7) * sparkle);

        if (d.bright || sparkle > 1) {
          ctx.shadowColor = "hsl(170, 100%, 70%)";
          ctx.shadowBlur = 10;
          ctx.fillStyle = `hsla(165, 100%, 80%, ${Math.min(1, alpha + 0.2)})`;
        } else {
          ctx.shadowColor = "hsl(175, 90%, 55%)";
          ctx.shadowBlur = 4;
          ctx.fillStyle = `hsla(172, 90%, 60%, ${alpha})`;
        }

        // Occasionally swap char
        if (Math.random() < 0.0015) d.char = d.char === "0" ? "1" : "0";

        ctx.font = `${d.size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        ctx.fillText(d.char, x, y);
      }

      ctx.shadowBlur = 0;
      ctx.restore();

      // Particles
      if (!reduced && particles.length < (isMobile ? 30 : 60) && Math.random() < 0.4) {
        spawnParticle();
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dts;
        p.y += p.vy * dts;
        p.life += dt;
        const lifeT = p.life / p.max;
        if (lifeT >= 1) { particles.splice(i, 1); continue; }
        const a = (1 - lifeT) * 0.7;
        ctx.fillStyle = `hsla(170, 100%, 75%, ${a})`;
        ctx.shadowColor = "hsl(170, 100%, 70%)";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(draw);
    };

    if (reduced) {
      draw(performance.now());
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={`relative aspect-square w-full ${className}`}>
      {/* Outer glow halo */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle at center, hsl(172 90% 50% / 0.35), hsl(190 100% 50% / 0.15) 45%, transparent 70%)",
        }}
      />
      {/* Inner void */}
      <div
        aria-hidden
        className="absolute inset-[28%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, hsl(220 60% 4% / 1) 0%, hsl(220 60% 4% / 0.85) 55%, transparent 80%)",
        }}
      />
      <canvas ref={canvasRef} className="relative h-full w-full" />
    </div>
  );
};

export default BinaryPortal;