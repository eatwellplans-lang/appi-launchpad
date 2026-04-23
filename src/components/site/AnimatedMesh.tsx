const AnimatedMesh = () => (
  <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-primary/30 blur-[120px] animate-blob" />
    <div className="absolute top-20 -right-32 h-[480px] w-[480px] rounded-full bg-primary-glow/25 blur-[120px] animate-blob" style={{ animationDelay: "3s" }} />
    <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px] animate-blob" style={{ animationDelay: "6s" }} />
  </div>
);
export default AnimatedMesh;
