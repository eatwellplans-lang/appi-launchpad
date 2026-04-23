import { useEffect, useRef } from "react";

interface Props {
  density?: number; // particles per 100k px², scales with area
  interactive?: boolean;
  connect?: boolean;
  className?: string;
}

const ParticleField = ({ density = 1, interactive = true, connect = true, className }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0;
    interface P { x: number; y: number; vx: number; vy: number; r: number; a: number; bright: boolean; }
    let particles: P[] = [];

    const computeCount = () => {
      const area = w * h;
      const base = (area / 100000) * density;
      const factor = isMobile ? 0.35 : isTablet ? 0.6 : 1;
      return Math.max(12, Math.min(110, Math.floor(base * factor)));
    };

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = computeCount();
      particles = Array.from({ length: count }, () => {
        const bright = Math.random() < 0.18;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: bright ? Math.random() * 1.6 + 1.4 : Math.random() * 1.2 + 0.4,
          a: Math.random() * 0.5 + 0.2,
          bright,
        };
      });
    };

    init();

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => { mouseRef.current.active = false; mouseRef.current.x = -9999; mouseRef.current.y = -9999; };
    if (interactive && !isMobile) {
      window.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
    }

    const linkDist = isMobile ? 0 : isTablet ? 90 : 120;
    const mouseRadius = 140;

    let last = performance.now();
    const draw = (now: number) => {
      const dt = Math.min(32, now - last) / 16.67;
      last = now;
      ctx.clearRect(0, 0, w, h);

      // Update + draw points
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Cursor influence (gentle attraction within radius)
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < mouseRadius * mouseRadius) {
            const d = Math.sqrt(d2) || 1;
            const force = (1 - d / mouseRadius) * 0.4;
            p.x += (dx / d) * force;
            p.y += (dy / d) * force;
          }
        }

        // Wrap edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        if (p.bright) {
          grad.addColorStop(0, `hsla(200, 100%, 80%, ${p.a})`);
          grad.addColorStop(1, "hsla(214, 100%, 60%, 0)");
        } else {
          grad.addColorStop(0, `hsla(214, 100%, 75%, ${p.a * 0.8})`);
          grad.addColorStop(1, "hsla(214, 100%, 60%, 0)");
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = p.bright ? "hsla(200, 100%, 90%, 0.95)" : `hsla(210, 100%, 90%, ${Math.min(1, p.a + 0.2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Connections
      if (connect && linkDist > 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i], b = particles[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < linkDist * linkDist) {
              const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.18;
              ctx.strokeStyle = `hsla(214, 100%, 70%, ${alpha})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    if (!reduced) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      // Render a single static frame
      draw(performance.now());
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [density, interactive, connect]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`absolute inset-0 w-full h-full pointer-events-none ${className ?? ""}`}
    />
  );
};

export default ParticleField;
