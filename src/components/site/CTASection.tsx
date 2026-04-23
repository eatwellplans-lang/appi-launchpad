import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedMesh from "./AnimatedMesh";
import ParticleField from "./ParticleField";
import AuroraBackground from "./AuroraBackground";

const CTASection = () => (
  <section className="container py-20 md:py-28">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl glass-card glow-border p-10 md:p-20 text-center"
    >
      <AuroraBackground intensity="strong" />
      <AnimatedMesh />
      <ParticleField density={1.1} connect />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6">
          <Sparkles className="h-3 w-3" /> Let's build together
        </div>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold gradient-text leading-tight">Have an idea worth building?</h2>
        <p className="mt-5 text-muted-foreground md:text-lg max-w-xl mx-auto">
          Let's turn your vision into a product people love to use.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="hero" size="xl"><Link to="/contact">Start Your Project <ArrowRight /></Link></Button>
          <Button asChild variant="glass" size="xl"><Link to="/contact">Contact Us</Link></Button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Response within 24 hours · No commitment required</p>
      </div>
    </motion.div>
  </section>
);
export default CTASection;
