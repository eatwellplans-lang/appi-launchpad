import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedMesh from "./AnimatedMesh";
import AuroraBackground from "./AuroraBackground";
import ParticleField from "./ParticleField";
import AIBubble from "./AIBubble";

const FIRST_WORDS = ["solutions", "apps", "chatbots", "tools"];
const SECOND_WORDS = ["companies", "businesses", "startups", "enterprises", "institutions", "governments"];

type TyperProps = { words: string[]; startDelay?: number; className?: string };

const Typer = ({ words, startDelay = 0, className = "" }: TyperProps) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 75);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 1800);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 600);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 40);
      } else {
        setIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, index, words]);

  useEffect(() => {
    if (startDelay <= 0) return;
    setPhase("pausing");
    const t = setTimeout(() => setPhase("typing"), startDelay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span className="gradient-text">{text}</span>
      <span
        aria-hidden
        className="inline-block w-[2px] md:w-[3px] h-[0.85em] ml-1 bg-primary animate-pulse self-center"
      />
    </span>
  );
};

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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.6 })
        .from(headlineRef.current, { y: 20, opacity: 0, duration: 0.9 }, "-=0.3")
        .from(subRef.current, { y: 20, opacity: 0, duration: 0.7 }, "-=0.6")
        .from(ctaRef.current?.children || [], { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .from(checksRef.current?.children || [], { y: 10, opacity: 0, duration: 0.4, stagger: 0.08 }, "-=0.3")
        .from(visualRef.current, { scale: 0.92, opacity: 0, duration: 1.1, ease: "expo.out" }, "-=1")
        .from([float1.current, float2.current], { y: 30, opacity: 0, duration: 0.6, stagger: 0.15 }, "-=0.5");

      if (reduced) return;

      // Floating idle motion on visual
      gsap.to(visualRef.current, {
        y: -16,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Cursor-tracking orb (elastic follow) + 3D tilt on visual
      const orbX = gsap.quickTo(orbRef.current, "x", { duration: 0.8, ease: "power3.out" });
      const orbY = gsap.quickTo(orbRef.current, "y", { duration: 0.8, ease: "power3.out" });
      const tiltX = gsap.quickTo(visualRef.current, "rotationY", { duration: 0.7, ease: "power3.out" });
      const tiltY = gsap.quickTo(visualRef.current, "rotationX", { duration: 0.7, ease: "power3.out" });

      gsap.set(visualRef.current, { transformPerspective: 1000, transformOrigin: "center" });

      const onMove = (e: MouseEvent) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        orbX(x);
        orbY(y);

        const vRect = visualWrapRef.current?.getBoundingClientRect();
        if (vRect) {
          const cx = vRect.left + vRect.width / 2;
          const cy = vRect.top + vRect.height / 2;
          const dx = (e.clientX - cx) / vRect.width;
          const dy = (e.clientY - cy) / vRect.height;
          tiltX(dx * 12);
          tiltY(-dy * 12);
        }
      };

      // Magnetic CTA buttons
      const magneticEls = ctaRef.current?.querySelectorAll<HTMLElement>("a") || [];
      const magCleanups: Array<() => void> = [];
      magneticEls.forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
        const enter = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
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
            We're Appi. We develop custom AI <Typer words={FIRST_WORDS} /> for innovative <Typer words={SECOND_WORDS} startDelay={1200} />.
          </h1>

          <p ref={subRef} className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Appi Technologies helps ambitious organizations build AI-powered products, software,
            and automation systems that improve operations, increase efficiency, and increase revenue.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Start Your AI Project <ArrowRight />
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
            <AIBubble />
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