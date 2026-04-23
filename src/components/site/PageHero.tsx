import { ReactNode } from "react";
import { motion } from "framer-motion";
import AnimatedMesh from "./AnimatedMesh";

interface Props { eyebrow?: string; title: string; description?: string; children?: ReactNode; }
const PageHero = ({ eyebrow, title, description, children }: Props) => (
  <section className="relative overflow-hidden bg-gradient-hero">
    <AnimatedMesh />
    <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
    <div className="container relative py-20 md:py-32 text-center max-w-4xl">
      {eyebrow && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-medium mb-6">
          <span className="h-px w-6 bg-primary" />{eyebrow}<span className="h-px w-6 bg-primary" />
        </motion.div>
      )}
      <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text">
        {title}
      </motion.h1>
      {description && (
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {description}
        </motion.p>
      )}
      {children && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="mt-8">
          {children}
        </motion.div>
      )}
    </div>
  </section>
);
export default PageHero;
