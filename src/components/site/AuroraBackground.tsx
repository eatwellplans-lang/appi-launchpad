const AuroraBackground = ({ intensity = "default" }: { intensity?: "default" | "strong" }) => (
  <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className={`absolute -top-1/3 left-1/2 -translate-x-1/2 h-[900px] w-[1200px] rounded-full blur-[140px] opacity-60 ${intensity === "strong" ? "" : "opacity-40"}`}
      style={{ background: "conic-gradient(from 90deg at 50% 50%, hsl(214 100% 60% / 0.5), hsl(190 100% 60% / 0.35), hsl(255 80% 65% / 0.35), hsl(214 100% 60% / 0.5))", animation: "aurora-spin 28s linear infinite" }} />
    <div className="absolute bottom-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px] animate-blob" />
    <div className="absolute top-[20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary-glow/20 blur-[120px] animate-blob" style={{ animationDelay: "5s" }} />
  </div>
);
export default AuroraBackground;
