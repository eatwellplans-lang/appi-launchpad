import { Link } from "react-router-dom";
import { CheckCircle2, Mail, MessageCircle, ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/site/PageHero";

const WHATSAPP = "2347069611939";

const ThankYou = () => (
  <>
    <PageHero
      eyebrow="Confirmed"
      title="Your strategy call is booked 🎉"
      description="We're excited to talk. Here's what happens next."
    />

    <section className="container pb-20 md:pb-28">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="glass-card glow-border rounded-2xl p-6 md:p-8 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20 mb-4">
            <CheckCircle2 className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold">You're all set</h2>
          <p className="text-muted-foreground mt-2">
            A calendar invite and confirmation email are on the way.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-display font-semibold">Check your inbox</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              We just sent a confirmation with the call details. If you don't see it, check spam or promotions.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-display font-semibold">Want to share more?</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Send us extra context, screenshots, or questions on WhatsApp before the call.
            </p>
            <Button
              variant="hero"
              size="sm"
              onClick={() =>
                window.open(
                  `https://wa.me/${WHATSAPP}`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Message us on WhatsApp <ArrowRight />
            </Button>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8">
          <h3 className="font-display text-xl font-semibold mb-4">While you wait</h3>
          <ul className="space-y-3 text-sm text-muted-foreground mb-6">
            <li className="flex gap-3"><span className="text-primary">→</span> Think about your top 2–3 goals for this call.</li>
            <li className="flex gap-3"><span className="text-primary">→</span> Note any constraints (budget, timeline, existing tech).</li>
            <li className="flex gap-3"><span className="text-primary">→</span> Bring examples of products you admire.</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="hero">
              <Link to="/work"><Briefcase className="mr-1" /> See our work</Link>
            </Button>
            <Button asChild variant="glass">
              <Link to="/services">Explore services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default ThankYou;