import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import footerLogo from "@/assets/appi-footer-logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-background relative overflow-hidden">
    <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
    <div className="container relative py-16 grid gap-12 md:grid-cols-4">
      <div className="md:col-span-2 space-y-4">
        <Link to="/" className="inline-block">
          <img
            src={footerLogo}
            alt="Appi Technologies"
            className="h-20 md:h-24 w-auto object-contain"
          />
        </Link>
        <p className="text-muted-foreground text-sm max-w-sm">
          Appi Technologies builds powerful apps, software, and AI solutions for growing businesses.
        </p>
        <div className="flex gap-3 pt-2">
          {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
            <a key={i} href="#" aria-label="Social link" className="h-9 w-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-4 text-sm">Company</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/about" className="hover:text-foreground">About</Link></li>
          <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
          <li><Link to="/work" className="hover:text-foreground">Work</Link></li>
          <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-4 text-sm">Get in touch</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href="mailto:jon@appitechnologies.com" className="hover:text-foreground break-all">jon@appitechnologies.com</a></li>
          <li><a href="tel:+2347069611939" className="hover:text-foreground">+234 (0) 706 961 1939</a></li>
          <li>Lagos, Nigeria</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="container py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Appi Technologies. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms of Use</a>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
