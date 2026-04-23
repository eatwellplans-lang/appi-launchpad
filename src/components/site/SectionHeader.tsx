import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}
const SectionHeader = ({ eyebrow, title, description, align = "center", className }: Props) => (
  <div className={cn("max-w-3xl space-y-4", align === "center" && "mx-auto text-center", className)}>
    {eyebrow && (
      <div className={cn("inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-medium", align === "center" && "justify-center")}>
        <span className="h-px w-6 bg-primary" />{eyebrow}
      </div>
    )}
    <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight gradient-text">{title}</h2>
    {description && <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{description}</p>}
  </div>
);
export default SectionHeader;
