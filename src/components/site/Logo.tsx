import { Link } from "react-router-dom";
import logoImg from "@/assets/appi-logo.png";

const Logo = () => (
  <Link to="/" className="flex items-center gap-3 group">
    <div className="relative h-14 md:h-16 flex items-center justify-center">
      <div className="absolute inset-0 rounded-xl bg-primary/30 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
      <img
        src={logoImg}
        alt="Appi Technologies logo"
        className="relative h-full w-auto object-contain drop-shadow-[0_0_18px_hsl(var(--primary)/0.55)] group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  </Link>
);
export default Logo;
