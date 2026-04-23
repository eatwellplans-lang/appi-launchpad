import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section className="container py-20 md:py-28">
    <div className="relative overflow-hidden rounded-2xl glass-card glow-border p-10 md:p-16 text-center">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[80%] bg-gradient-primary opacity-20 blur-3xl rounded-full" />
      <div className="relative">
        <h2 className="font-display text-3xl md:text-5xl font-bold gradient-text">Have an idea worth building?</h2>
        <p className="mt-4 text-muted-foreground md:text-lg max-w-xl mx-auto">
          Let's turn your vision into a product people love to use.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="hero" size="xl"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button>
          <Button asChild variant="glass" size="xl"><Link to="/contact">Contact Us</Link></Button>
        </div>
      </div>
    </div>
  </section>
);
export default CTASection;
