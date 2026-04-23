import { ReactNode } from "react";

const Marquee = ({ children }: { children: ReactNode }) => (
  <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
    <div className="flex gap-12 animate-marquee whitespace-nowrap">
      {children}
      {children}
    </div>
  </div>
);
export default Marquee;
