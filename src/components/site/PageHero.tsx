import { ReactNode } from "react";

interface Props { eyebrow?: string; title: string; description?: string; children?: ReactNode; }
const PageHero = ({ eyebrow, title, description, children }: Props) => (
  <section className="relative overflow-hidden bg-gradient-hero">
    <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
    <div className="container relative py-20 md:py-32 text-center max-w-4xl">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-medium mb-6 animate-fade-in">
          <span className="h-px w-6 bg-primary" />{eyebrow}<span className="h-px w-6 bg-primary" />
        </div>
      )}
      <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text animate-fade-up">
        {title}
      </h1>
      {description && (
        <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {description}
        </p>
      )}
      {children && <div className="mt-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>{children}</div>}
    </div>
  </section>
);
export default PageHero;
