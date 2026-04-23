import { Target, Eye, Sparkles, Shield, Minimize2, Award, TrendingUp } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import SectionHeader from "@/components/site/SectionHeader";
import CTASection from "@/components/site/CTASection";

const values = [
  { icon: Sparkles, title: "Innovation", desc: "We push boundaries with bold ideas and forward-thinking technology." },
  { icon: Shield, title: "Reliability", desc: "We deliver on our promises with consistency and accountability." },
  { icon: Minimize2, title: "Simplicity", desc: "We make complex systems feel effortless to use." },
  { icon: Award, title: "Excellence", desc: "We hold our work to the highest standards of craft and quality." },
  { icon: TrendingUp, title: "Growth mindset", desc: "We learn, iterate, and improve with every project." },
];

const About = () => (
  <>
    <PageHero
      eyebrow="About Us"
      title="Building technology that drives real growth"
      description="Appi Technologies is a digital product and software development company focused on helping businesses build, launch, and scale innovative solutions."
    />

    <section className="container py-20 md:py-28">
      <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
        <p>We work with startups, founders, and enterprises to create mobile apps, web platforms, AI-powered systems, and custom software tailored to their needs.</p>
        <p>Our approach combines strategy, design, and engineering to deliver products that are not just functional — but impactful.</p>
      </div>
    </section>

    <section className="bg-card/30 border-y border-border">
      <div className="container py-20 md:py-28 grid gap-8 md:grid-cols-2">
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <Target className="h-9 w-9 text-primary mb-5" />
          <h3 className="font-display text-2xl font-bold mb-3">Mission</h3>
          <p className="text-muted-foreground leading-relaxed">To help businesses leverage technology to grow faster, operate smarter, and compete globally.</p>
        </div>
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <Eye className="h-9 w-9 text-primary mb-5" />
          <h3 className="font-display text-2xl font-bold mb-3">Vision</h3>
          <p className="text-muted-foreground leading-relaxed">To become a leading technology partner for digital product innovation across Africa and beyond.</p>
        </div>
      </div>
    </section>

    <section className="container py-20 md:py-28">
      <SectionHeader eyebrow="Values" title="What we stand for" />
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="glass-card rounded-2xl p-6">
            <div className="h-11 w-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              <v.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <CTASection />
  </>
);
export default About;
