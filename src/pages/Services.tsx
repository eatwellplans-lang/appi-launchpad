import { Link } from "react-router-dom";
import { ArrowRight, Code2, Smartphone, Globe, Brain, Palette, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/site/PageHero";
import CTASection from "@/components/site/CTASection";

const services = [
  { icon: Code2, title: "Custom Software Development", desc: "Tailored systems designed specifically for your business operations and goals.", benefits: ["Built for your unique workflows", "Scales with your team and data", "Integrates with your existing stack"] },
  { icon: Smartphone, title: "Mobile App Development", desc: "High-performance iOS and Android apps built for usability, speed, and scale.", benefits: ["Native and cross-platform options", "Optimized for performance", "App Store launch support"] },
  { icon: Globe, title: "Web Development", desc: "Modern websites and web platforms that combine functionality with great user experience.", benefits: ["Responsive on every device", "SEO and performance ready", "Modern stack and tooling"] },
  { icon: Brain, title: "AI & Automation", desc: "Smart systems that automate workflows, enhance decision-making, and improve efficiency.", benefits: ["AI-powered features", "Workflow automation", "Custom model integrations"] },
  { icon: Palette, title: "UI/UX Design", desc: "Clean, intuitive interfaces that improve how users interact with your product.", benefits: ["User research and testing", "Design systems and components", "Conversion-focused flows"] },
  { icon: Rocket, title: "MVP Development", desc: "Launch faster with a focused version of your product designed to validate your idea.", benefits: ["Ship in weeks, not months", "Validate with real users", "Built to evolve into v2"] },
];

const Services = () => (
  <>
    <PageHero
      eyebrow="Services"
      title="Our Services"
      description="We offer end-to-end product development services to help you build, launch, and scale digital solutions."
    />

    <section className="container py-20 md:py-28 space-y-16">
      {services.map((s, i) => (
        <div key={s.title} className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div className="space-y-5">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-primary shadow-glow">
              <s.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">{s.title}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{s.desc}</p>
            <ul className="space-y-2">
              {s.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />{b}
                </li>
              ))}
            </ul>
            <Button asChild variant="hero"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-primary opacity-10 blur-3xl rounded-full" />
            <div className="relative aspect-square max-w-md mx-auto glass-card glow-border rounded-3xl flex items-center justify-center">
              <s.icon className="h-32 w-32 text-primary/30" strokeWidth={1} />
            </div>
          </div>
        </div>
      ))}
    </section>

    <section className="container pb-20 md:pb-28">
      <div className="relative overflow-hidden rounded-2xl glass-card glow-border p-10 md:p-16 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold gradient-text">Ready to build your product?</h2>
        <p className="mt-4 text-muted-foreground md:text-lg">Start your project with Appi Technologies today.</p>
        <Button asChild variant="hero" size="xl" className="mt-8"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button>
      </div>
    </section>
  </>
);
export default Services;
