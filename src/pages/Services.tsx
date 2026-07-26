import { Link } from "react-router-dom";
import { ArrowRight, Brain, Sparkles, MessageSquare, Code2, Bot, Workflow, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/site/PageHero";
import CTASection from "@/components/site/CTASection";

const services = [
  { icon: Brain, title: "AI Agents & Intelligent Automation", desc: "Build autonomous AI agents that handle complex workflows, make decisions, and operate across your systems.", benefits: ["Autonomous task execution", "Multi-system integrations", "Continuous learning & improvement"] },
  { icon: Sparkles, title: "Generative AI & AI Applications", desc: "Create custom generative AI apps, content engines, and intelligent tools trained on your business data.", benefits: ["LLM-powered features", "Private knowledge bases", "Scalable AI infrastructure"] },
  { icon: MessageSquare, title: "Conversational AI", desc: "Deploy intelligent chatbots and voice assistants that understand context and resolve real customer problems.", benefits: ["Natural language understanding", "Omnichannel deployment", "Human-like interactions"] },
  { icon: Code2, title: "AI-Powered Software Products", desc: "Engineer full-stack software products with AI at the core — from architecture to launch and scale.", benefits: ["AI-native architecture", "Production-ready code", "Scalable cloud platforms"] },
  { icon: Bot, title: "AI Consulting & Strategy", desc: "Identify the highest-impact AI opportunities and build a practical roadmap for your business.", benefits: ["AI readiness assessment", "Use-case prioritization", "ROI-focused roadmaps"] },
  { icon: Workflow, title: "Workflow Automation", desc: "Replace manual processes with intelligent automation that reduces cost, errors, and delays.", benefits: ["End-to-end process mapping", "API & system integrations", "Real-time monitoring"] },
];

const Services = () => (
  <>
    <PageHero
      eyebrow="Services"
      title="AI Product Engineering Services"
      description="End-to-end AI product development — from intelligent agents and automation to full-stack software platforms."
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
            <Button asChild variant="hero"><Link to="/book-a-call">Build With Appi <ArrowRight /></Link></Button>
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
        <h2 className="font-display text-3xl md:text-5xl font-bold gradient-text">Ready to build your next AI product?</h2>
        <p className="mt-4 text-muted-foreground md:text-lg">Start your AI product engineering project with Appi Technologies today.</p>
        <Button asChild variant="hero" size="xl" className="mt-8"><Link to="/book-a-call">Build With Appi <ArrowRight /></Link></Button>
      </div>
    </section>
  </>
);
export default Services;
