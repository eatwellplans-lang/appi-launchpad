import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingActions = () => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const onContact = pathname === "/contact";

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Floating WhatsApp / chat */}
      <button
        onClick={() =>
          window.open(
            "https://wa.me/2347069611939",
            "_blank",
            "noopener,noreferrer"
          )
        }
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-primary shadow-elegant hover:shadow-glow flex items-center justify-center text-primary-foreground hover:scale-110 transition-all duration-300 animate-fade-in"
      >
        <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-60" />
        <MessageCircle className="relative h-6 w-6" />
      </button>

      {/* Mobile sticky CTA */}
      {!onContact && show && (
        <div className="md:hidden fixed bottom-4 left-4 right-24 z-40 animate-fade-in">
          <Button asChild variant="hero" className="w-full shadow-elegant">
            <Link to="/contact">Start Your Project <ArrowRight /></Link>
          </Button>
        </div>
      )}
    </>
  );
};
export default FloatingActions;
