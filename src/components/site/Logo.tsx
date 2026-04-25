import { Link } from "react-router-dom";
import logoImg from "@/assets/appi-logo.png";

const Logo = () => (
  <Link to="/" className="flex items-center gap-3 group">
    <div className="relative h-14 w-14 md:h-16 md:w-16 rounded-xl flex items-center justify-center">
      <div className="absolute inset-0 rounded-xl bg-primary/40 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
      <img
        src={logoImg}
        alt="Appi Creative Technologies logo"
        className="relative h-full w-full object-contain drop-shadow-[0_0_12px_hsl(var(--primary)/0.5)] group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="flex flex-col leading-none">
      <span className="font-display font-extrabold text-foreground tracking-tight text-xl md:text-2xl">
        Appi
      </span>
      <span className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">
        Technologies
      </span>
    </div>
  </Link>
);
export default Logo;
