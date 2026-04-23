import PageHero from "@/components/site/PageHero";
import CTASection from "@/components/site/CTASection";
import caseFintech from "@/assets/case-fintech.jpg";
import caseEcommerce from "@/assets/case-ecommerce.jpg";
import caseAi from "@/assets/case-ai.jpg";

const studies = [
  {
    img: caseFintech, tag: "Fintech", name: "Fintech Mobile App",
    challenge: "Needed a secure and scalable mobile banking solution.",
    solution: "Built a cross-platform app with real-time transaction processing.",
    result: "Improved customer engagement and transaction speed by 3x.",
  },
  {
    img: caseEcommerce, tag: "E-commerce", name: "E-commerce Platform",
    challenge: "Outdated store with poor checkout experience and limited inventory tools.",
    solution: "Redesigned and rebuilt the platform with modern payments and inventory management.",
    result: "Doubled conversion rates and reduced cart abandonment significantly.",
  },
  {
    img: caseAi, tag: "AI / Automation", name: "AI Customer Support System",
    challenge: "Customer support team overwhelmed by repetitive queries.",
    solution: "Created an AI chatbot trained on company knowledge to handle tier-1 support.",
    result: "Cut average response time by 80% and improved CSAT scores.",
  },
  {
    img: caseFintech, tag: "Logistics", name: "Fleet Management Platform",
    challenge: "Manual tracking of delivery vehicles across multiple cities.",
    solution: "Built a real-time fleet management dashboard with route optimization.",
    result: "Reduced fuel costs by 22% and improved on-time delivery rates.",
  },
  {
    img: caseEcommerce, tag: "Health", name: "Telehealth Web Platform",
    challenge: "Connect patients to doctors with seamless virtual consultations.",
    solution: "Developed a secure, HIPAA-grade web platform with video and scheduling.",
    result: "Onboarded 200+ providers and 10k+ patients within 6 months.",
  },
  {
    img: caseAi, tag: "Real Estate", name: "Property Discovery App",
    challenge: "Buyers needed a smarter way to find properties matching their needs.",
    solution: "Built an AI-powered recommendation engine with map-based discovery.",
    result: "Boosted user engagement and listing-to-inquiry conversion 4x.",
  },
];

const Work = () => (
  <>
    <PageHero
      eyebrow="Work"
      title="Our Work"
      description="We've helped businesses build digital products that solve real problems and create impact."
    />

    <section className="container py-20 md:py-28 space-y-10">
      {studies.map((c, i) => (
        <article key={c.name} className={`grid gap-8 lg:grid-cols-5 lg:gap-12 lg:items-center glass-card rounded-2xl p-6 lg:p-10 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div className="lg:col-span-2 aspect-[4/3] rounded-xl overflow-hidden bg-secondary">
            <img src={c.img} alt={c.name} loading="lazy" width={1024} height={768} className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-3 space-y-5">
            <span className="text-xs uppercase tracking-wider text-primary font-medium">{c.tag}</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold">{c.name}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[["Challenge", c.challenge], ["Solution", c.solution], ["Result", c.result]].map(([label, val]) => (
                <div key={label} className="space-y-1">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">{label}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{val}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>

    <CTASection />
  </>
);
export default Work;
