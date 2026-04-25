import { Link } from "react-router-dom";
import logoImg from "@/assets/appi-logo.png";

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 group">
    <div className="relative h-10 w-10 rounded-lg overflow-hidden flex items-center justify-center">
      <img src={logoImg} alt="Appi Creative Technologies logo" className="h-full w-full object-contain" />
      <div className="absolute inset-0 rounded-lg bg-primary/30 blur-xl opacity-0 group-hover:opacity-60 transition-opacity -z-10" />
    </div>
    <div className="flex flex-col leading-none">
      <span className="font-display font-bold text-foreground tracking-tight">Appi</span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Technologies</span>
    </div>
  </Link>
);
export default Logo;
