import { Link } from "react-router-dom";

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 group">
    <div className="relative h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
      <span className="font-display font-bold text-primary-foreground text-lg">A</span>
      <div className="absolute inset-0 rounded-lg bg-gradient-primary blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
    </div>
    <div className="flex flex-col leading-none">
      <span className="font-display font-bold text-foreground tracking-tight">Appi</span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Technologies</span>
    </div>
  </Link>
);
export default Logo;
