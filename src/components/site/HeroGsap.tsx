import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedMesh from "./AnimatedMesh";
import AuroraBackground from "./AuroraBackground";
import ParticleField from "./ParticleField";
import BinaryPortal from "./BinaryPortal";

const HeroGsap = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const checksRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const visualWrapRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const float1 = useRef<HTMLDivElement>(null);
  const float2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(badgeRef.current, { y: 14, opacity: 0, duration: 0.9, ease: "power2.out" })
        .from(headlineRef.current, { y: 22, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=0.55")
        .from(subRef.current, { y: 16, opacity: 0, duration: 1.0 }, "-=0.85")
        .from(ctaRef.current?.children || [], { y: 14, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.7")
        .from(checksRef.current?.children || [], { y: 8, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.55")
        .from(visualRef.current, { scale: 0.9, opacity: 0, duration: 1.6, ease: "expo.out" }, "-=1.4")
        .from([float1.current, float2.current], { y: 24, opacity: 0, duration: 0.9, stagger: 0.18, ease: "power2.out" }, "-=0.9");

      if (reduced) return;

      // Gentle floating idle motion on visual
      gsap.to(visualRef.current, {
        y: -14,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      // Subtle idle rotation for organic feel
      gsap.to(visualRef.current, {
        rotate: 1.2,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Cursor-tracking orb (elastic follow) + 3D tilt on visual
      const orbX = gsap.quickTo(orbRef.current, "x", { duration: 1.4, ease: "power3.out" });
      const orbY = gsap.quickTo(orbRef.current, "y", { duration: 1.4, ease: "power3.out" });
      const tiltX = gsap.quickTo(visualRef.current, "rotationY", { duration: 1.1, ease: "power3.out" });
      const tiltY = gsap.quickTo(visualRef.current, "rotationX", { duration: 1.1, ease: "power3.out" });

      gsap.set(visualRef.current, { transformPerspective: 1000, transformOrigin: "center" });

      // rAF-throttled pointer tracking for smoother updates
      let pendingX = 0, pendingY = 0, queued = false;
      const onMove = (e: MouseEvent) => {
        pendingX = e.clientX;
        pendingY = e.clientY;
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          const rect = sectionRef.current?.getBoundingClientRect();
          if (!rect) return;
          orbX(pendingX - rect.left);
          orbY(pendingY - rect.top);

          const vRect = visualWrapRef.current?.getBoundingClientRect();
          if (vRect) {
            const cx = vRect.left + vRect.width / 2;
            const cy = vRect.top + vRect.height / 2;
            const dx = (pendingX - cx) / vRect.width;
            const dy = (pendingY - cy) / vRect.height;
            tiltX(dx * 7);
            tiltY(-dy * 7);
          }
        });
      };

      // Magnetic CTA buttons
      const magneticEls = ctaRef.current?.querySelectorAll<HTMLElement>("a") || [];
      const magCleanups: Array<() => void> = [];
      magneticEls.forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
        const enter = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.22);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("mousemove", enter);
        el.addEventListener("mouseleave", leave);
        magCleanups.push(() => {
          el.removeEventListener("mousemove", enter);
          el.removeEventListener("mouseleave", leave);
        });
      });

      const sec = sectionRef.current;
      sec?.addEventListener("mousemove", onMove);
      const reset = () => {
        tiltX(0);
        tiltY(0);
      };
      sec?.addEventListener("mouseleave", reset);

      return () => {
        sec?.removeEventListener("mousemove", onMove);
        sec?.removeEventListener("mouseleave", reset);
        magCleanups.forEach((fn) => fn());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-hero">
      <AuroraBackground intensity="strong" />
      <AnimatedMesh />
      <ParticleField density={1.2} connect />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Cursor-tracking glow orb */}
      <div
        ref={orbRef}
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/30 blur-3xl mix-blend-screen hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      <div className="container relative py-20 md:py-32 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6 lg:space-y-8">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inset-0 rounded-full bg-primary opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-primary" />
            </span>
            Now accepting new projects for 2026
          </div>

          <h1
            ref={headlineRef}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            We build AI-powered apps, software, and automation systems for innovative businesses.
          </h1>

          <p ref={subRef} className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Appi Technologies designs and develops custom AI systems, business software, mobile apps, and automation platforms for startups, enterprises, and modern organizations.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Book a Free Strategy Call <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/services">Explore Our Solutions</Link>
            </Button>
          </div>

          <div
            ref={checksRef}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-sm text-muted-foreground"
          >
            {["100% on-time delivery", "Senior engineers", "Global standards"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                {t}
              </div>
            ))}
          </div>
        </div>

        <div ref={visualWrapRef} className="relative" style={{ perspective: "1200px" }}>
          <div className="absolute -inset-8 bg-gradient-primary opacity-20 blur-3xl rounded-full animate-glow-pulse" />
          <div
            ref={visualRef}
            className="relative will-change-transform"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
              <BinaryPortal className="opacity-90 md:opacity-100" />
            </div>
          </div>
          <div
            ref={float1}
            className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4 hidden md:flex items-center gap-3 shadow-elegant"
          >
            <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-semibold text-sm">Built to scale</div>
              <div className="text-xs text-muted-foreground">Production-ready code</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroGsap;