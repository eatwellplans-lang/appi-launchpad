import { Link } from "react-router-dom";
import logoImg from "@/assets/appi-logo.png";

const Logo = () => (
  <Link to="/" className="flex items-center gap-3 group">
    <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-xl flex items-center justify-center">
      <div className="absolute inset-0 rounded-xl bg-primary/40 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
      <img
        src={logoImg}
        alt="Appi Technologies logo"
        className="relative h-full w-full object-contain drop-shadow-[0_0_18px_hsl(var(--primary)/0.55)] group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <div className="flex flex-col leading-none">
      <span className="font-display font-extrabold text-foreground tracking-tight text-2xl md:text-3xl">
        Appi
      </span>
      <span className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">
        Technologies
      </span>
    </div>
  </Link>
);
export default Logo;
