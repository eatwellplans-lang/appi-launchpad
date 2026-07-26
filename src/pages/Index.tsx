import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Code2, Brain, Star, Zap, Layers, Users, TrendingUp, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import SectionHeader from "@/components/site/SectionHeader";
import CTASection from "@/components/site/CTASection";
import Marquee from "@/components/site/Marquee";
import PartnersMarquee from "@/components/site/PartnersMarquee";
import Reveal, { StaggerGrid, StaggerItem } from "@/components/site/Reveal";
import HeroGsap from "@/components/site/HeroGsap";
import caseFintech from "@/assets/case-fintech.jpg";
import caseEcommerce from "@/assets/case-ecommerce.jpg";
import caseAi from "@/assets/case-ai.jpg";

const services = [
  { icon: Brain, title: "AI Agents & Intelligent Automation", desc: "Autonomous agents that handle workflows, decisions, and repetitive tasks so your team can focus on high-value work." },
  { icon: Sparkles, title: "Generative AI & AI Applications", desc: "Custom AI apps, content engines, and generative tools built around your business data and goals." },
  { icon: MessageSquare, title: "Conversational AI", desc: "Intelligent chatbots and voice assistants that understand context and deliver real customer value." },
  { icon: Code2, title: "AI-Powered Software Products", desc: "End-to-end product engineering that embeds AI into scalable software platforms from day one." },
];
const reasons = [
  { icon: Layers, title: "End-to-end development", desc: "From idea to launch and scale, we deliver every layer of the stack." },
  { icon: Zap, title: "Fast execution, no compromise", desc: "Speed paired with engineering quality you can rely on." },
  { icon: Users, title: "Built for startups & growth", desc: "Optimized for ambitious teams moving quickly through change." },
  { icon: TrendingUp, title: "Scalable architecture", desc: "Systems engineered to grow with your business for the long-term." },
  { icon: Star, title: "User experience first", desc: "Products that feel intuitive, look beautiful, and perform flawlessly." },
];
const cases = [
  { img: caseFintech, tag: "Fintech", title: "Fintech Mobile App", desc: "Built a secure mobile banking app with seamless transactions and real-time notifications." },
  { img: caseEcommerce, tag: "E-commerce", title: "E-commerce Platform", desc: "Developed a scalable online store with payment integration and inventory management." },
  { img: caseAi, tag: "AI / Automation", title: "AI Customer Support System", desc: "Created an AI chatbot that reduced response time and improved customer satisfaction." },
];
const industries = ["Fintech", "Health & Wellness", "E-commerce", "Real Estate", "Logistics", "Education", "Corporate & Enterprise", "Government", "Oil & Gas", "Tourism", "Aviation"];
const process = [
  { n: "01", title: "Discovery", desc: "We understand your goals, users, and product vision." },
  { n: "02", title: "Strategy & Design", desc: "We plan the product and design intuitive user experiences." },
  { n: "03", title: "Development", desc: "We build reliable, scalable, and high-performing systems." },
  { n: "04", title: "Launch & Scale", desc: "We help you deploy, improve, and grow your product." },
];
const testimonials = [
  { quote: "Appi Technologies helped us turn our idea into a fully functional product faster than we expected.", name: "Sarah Okonkwo", role: "Founder, FinLink" },
  { quote: "Their team understands both business and technology — that made all the difference.", name: "David Adebayo", role: "CEO, RetailPro" },
  { quote: "The polish, speed, and product thinking exceeded every expectation. A true partner.", name: "Amaka Udo", role: "Product Lead, Healthly" },
  { quote: "From day one, they treated our product like their own. The results speak for themselves.", name: "Tunde Bello", role: "Co-founder, MoveLogix" },
];
const trustBadges = ["AI Product Engineering", "AI Agents", "Intelligent Automation", "Generative AI", "Conversational AI", "AI-Powered Software", "End-to-End Delivery"];

const Index = () => {
  return (
    <>
      {/* HERO */}
      <HeroGsap />

      {/* TRUST MARQUEE */}
      <section className="border-y border-border bg-card/40">
        <div className="py-10">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Trusted by startups, founders, and growing businesses</p>
          <Marquee>
            {trustBadges.map((b) => (
              <div key={b} className="flex items-center gap-3 text-sm font-medium text-foreground/60">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />{b}
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* CLIENTS & PARTNERS */}
      <PartnersMarquee />

      {/* SERVICES */}
      <section className="container py-20 md:py-28">
        <Reveal><SectionHeader eyebrow="Services" title="AI Solutions Built for Real Business Problems"
          description="At Appi Technologies, we don't just build software — we engineer intelligent products, AI agents and automation systems that solve real problems and unlock new opportunities." /></Reveal>
        <StaggerGrid className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <div className="group relative glass-card rounded-2xl p-6 lg:p-8 h-full hover:border-primary/40 transition-all hover:-translate-y-1 duration-300 hover:shadow-elegant">
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-gradient-primary group-hover:border-transparent group-hover:scale-110 transition-all duration-300">
                  <s.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* FREE AI AUDIT */}
      <Reveal>
        <section className="container">
          <div className="relative overflow-hidden rounded-2xl glass-card glow-border p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            <div className="relative text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-4">
                <Sparkles className="h-3 w-3" /> Limited time offer
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold">Get a free AI transformation audit for your business.</h3>
              <p className="mt-3 text-sm text-muted-foreground max-w-lg">Discover how AI can improve your operations, reduce costs, and unlock new revenue streams — no commitment required.</p>
            </div>
            <Button asChild variant="hero" size="xl" className="relative shrink-0">
              <Link to="/contact">Request Free Audit <ArrowRight /></Link>
            </Button>
          </div>
        </section>
      </Reveal>

      {/* MID CTA — STRATEGY CALL */}
      <Reveal>
        <section className="container mt-16">
          <div className="relative overflow-hidden rounded-2xl glass-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 glow-border">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-semibold">Book a 15-minute strategy call.</h3>
              <p className="text-sm text-muted-foreground mt-1">Get expert guidance on scoping, design, and tech choices — no commitment.</p>
            </div>
            <Button asChild variant="hero" size="lg" className="shrink-0"><Link to="/contact">Book a call <ArrowRight /></Link></Button>
          </div>
        </section>
      </Reveal>

      {/* WHY APPI */}
      <section className="bg-card/30 border-y border-border mt-20 md:mt-28">
        <div className="container py-20 md:py-28">
          <Reveal><SectionHeader eyebrow="Why Appi" title="Why businesses choose Appi Technologies"
            description="We combine product thinking, design, and engineering to deliver solutions that actually move your business forward." /></Reveal>
          <StaggerGrid className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <StaggerItem key={r.title}>
                <div className={`glass-card rounded-2xl p-6 h-full hover:border-primary/40 hover:-translate-y-1 transition-all ${i === 0 ? "lg:row-span-2 lg:bg-gradient-to-br lg:from-primary/10 lg:to-transparent" : ""}`}>
                  <r.icon className="h-7 w-7 text-primary mb-4" />
                  <h3 className="font-display text-lg font-semibold mb-2">{r.title}</h3>
                  <p className="text-sm text-muted-foreground">{r.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="container py-20 md:py-28">
        <Reveal><SectionHeader eyebrow="Featured Work" title="Products we've helped build" /></Reveal>
        <StaggerGrid className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <StaggerItem key={c.title}>
              <article className="group glass-card rounded-2xl overflow-hidden hover:border-primary/40 transition-all hover:-translate-y-2 hover:shadow-elegant h-full">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img src={c.img} alt={c.title} loading="lazy" width={1024} height={768} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary"><ArrowRight className="h-3 w-3" /> View case study</span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs uppercase tracking-wider text-primary font-medium">{c.tag}</span>
                  <h3 className="font-display text-xl font-semibold mt-2 mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-card/30 border-y border-border">
        <div className="container py-20 md:py-28">
          <Reveal><SectionHeader eyebrow="Industries" title="Industries we serve" /></Reveal>
          <StaggerGrid className="mt-12 flex flex-wrap justify-center gap-3">
            {industries.map((i) => (
              <StaggerItem key={i}>
                <Link to="/industries" className="px-5 py-3 rounded-full glass-card text-sm font-medium hover:border-primary/50 hover:text-primary hover:-translate-y-0.5 transition-all inline-block">
                  {i}
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* PROCESS */}
      <section className="container py-20 md:py-28">
        <Reveal><SectionHeader eyebrow="Process" title="How we work" /></Reveal>
        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <StaggerGrid className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative">
            {process.map((p) => (
              <StaggerItem key={p.n}>
                <div className="glass-card rounded-2xl p-6 h-full hover:border-primary/40 hover:-translate-y-1 transition-all relative">
                  <div className="font-display text-4xl font-bold gradient-text mb-3">{p.n}</div>
                  <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="bg-card/30 border-y border-border">
        <div className="container py-20 md:py-28">
          <Reveal><SectionHeader eyebrow="Testimonials" title="What clients say" /></Reveal>
          <Reveal delay={0.1}>
            <div className="mt-16 max-w-5xl mx-auto">
              <Carousel opts={{ loop: true, align: "start" }} plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}>
                <CarouselContent>
                  {testimonials.map((t) => (
                    <CarouselItem key={t.name} className="md:basis-1/2">
                      <figure className="glass-card rounded-2xl p-8 h-full">
                        <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}</div>
                        <blockquote className="text-lg leading-relaxed text-foreground/90 mb-6">"{t.quote}"</blockquote>
                        <figcaption className="flex items-center gap-3">
                          <div className="h-11 w-11 rounded-full bg-gradient-primary flex items-center justify-center font-semibold text-primary-foreground">
                            {t.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{t.name}</div>
                            <div className="text-xs text-muted-foreground">{t.role}</div>
                          </div>
                        </figcaption>
                      </figure>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Index;
