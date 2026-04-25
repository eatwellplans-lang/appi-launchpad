import Marquee from "./Marquee";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const partners = [
  "Zenith Bank",
  "Dell Technologies",
  "Dangote Group",
  "MTN",
  "Access Bank",
  "Microsoft",
  "Google Cloud",
  "AWS",
  "Flutterwave",
  "Paystack",
  "GTBank",
  "Oracle",
];

const PartnersMarquee = () => (
  <section className="relative border-y border-border bg-card/30 overflow-hidden">
    <div className="container py-16 md:py-20">
      <Reveal>
        <SectionHeader
          eyebrow="Clients & Partners"
          title="Trusted by leading brands and institutions"
          description="From global enterprises to national champions, we partner with organizations that demand excellence."
        />
      </Reveal>
    </div>
    <div className="pb-16 md:pb-20">
      <Marquee>
        {partners.map((p) => (
          <div
            key={p}
            className="flex items-center justify-center px-8 py-4 mx-2 rounded-xl glass-card min-w-[220px] hover:border-primary/40 transition-colors"
          >
            <span className="font-display text-xl md:text-2xl font-semibold tracking-tight text-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
              {p}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  </section>
);

export default PartnersMarquee;