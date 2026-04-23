import { Banknote, HeartPulse, ShoppingBag, Building2, Truck, GraduationCap, Briefcase, Landmark } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import CTASection from "@/components/site/CTASection";

const industries = [
  { icon: Banknote, name: "Fintech", desc: "Secure payment platforms, mobile banking, and financial automation built for trust and scale." },
  { icon: HeartPulse, name: "Health & Wellness", desc: "Telehealth, patient management, and wellness apps that put people first." },
  { icon: ShoppingBag, name: "E-commerce", desc: "Modern online stores, marketplaces, and retail platforms that convert and scale." },
  { icon: Building2, name: "Real Estate", desc: "Property platforms, listing apps, and CRM tools tailored for the real estate industry." },
  { icon: Truck, name: "Logistics", desc: "Fleet management, delivery tracking, and operations dashboards optimized for efficiency." },
  { icon: GraduationCap, name: "Education", desc: "Learning platforms, school management, and EdTech apps designed for engagement." },
  { icon: Briefcase, name: "Enterprise", desc: "Custom internal tools, automation systems, and enterprise platforms for scale." },
  { icon: Landmark, name: "Government", desc: "Secure digital services, citizen-facing platforms, and internal systems built for public sector scale and compliance." },
];

const Industries = () => (
  <>
    <PageHero
      eyebrow="Industries"
      title="Industries We Serve"
      description="We build tailored solutions for ambitious businesses across multiple sectors."
    />

    <section className="container py-20 md:py-28">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((i) => (
          <div key={i.name} className="group glass-card rounded-2xl p-7 hover:border-primary/40 transition-all hover:-translate-y-1">
            <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-gradient-primary transition-all">
              <i.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{i.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{i.desc}</p>
          </div>
        ))}
      </div>
    </section>

    <CTASection />
  </>
);
export default Industries;
