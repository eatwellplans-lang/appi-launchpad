import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().max(100).optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().max(50).optional(),
  message: z.string().trim().min(10, "Tell us a bit more (min 10 chars)").max(2000),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", projectType: "", budget: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      const id = crypto.randomUUID();
      const { error } = await supabase.from("contact_submissions").insert({
        id,
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || null,
        project_type: parsed.data.projectType,
        budget: parsed.data.budget || null,
        message: parsed.data.message,
      });
      if (error) throw error;

      // Fire-and-forget email notifications (won't block success if not yet configured)
      void supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-form-notification",
          recipientEmail: "appicreativesolutions@gmail.com",
          idempotencyKey: `contact-notify-${id}`,
          templateData: {
            name: parsed.data.name,
            email: parsed.data.email,
            company: parsed.data.company || "",
            projectType: parsed.data.projectType,
            budget: parsed.data.budget || "",
            message: parsed.data.message,
          },
        },
      }).catch(() => {});
      void supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-form-confirmation",
          recipientEmail: parsed.data.email,
          idempotencyKey: `contact-confirm-${id}`,
          templateData: { name: parsed.data.name },
        },
      }).catch(() => {});

      toast.success("Thanks! We'll be in touch within 24 hours.");
      setForm({ name: "", email: "", company: "", projectType: "", budget: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something great"
        description="Tell us about your idea or project — we'd love to help you bring it to life."
      />

      <section className="container pb-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-5 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6 space-y-5">
              {[
                { icon: Mail, label: "Email", value: "jon@appitechnologies.com", href: "mailto:jon@appitechnologies.com" },
                { icon: Phone, label: "Phone", value: "+234 (0) 706 961 1939", href: "tel:+2347069611939" },
                { icon: MapPin, label: "Location", value: "Lagos, Nigeria" },
              ].map((c) => (
                <div key={c.label} className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <c.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    {c.href ? <a href={c.href} className="font-medium hover:text-primary transition-colors">{c.value}</a> : <div className="font-medium">{c.value}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-2">Why work with us?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Senior product engineers and designers</li>
                <li>• Transparent process and pricing</li>
                <li>• Built to scale from day one</li>
                <li>• Response within 24 hours</li>
              </ul>
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 glass-card glow-border rounded-2xl p-6 md:p-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" maxLength={255} />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type *</Label>
                <Select value={form.projectType} onValueChange={(v) => setForm({ ...form, projectType: v })}>
                  <SelectTrigger id="projectType"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {["Mobile App", "Web Platform", "Custom Software", "AI / Automation", "MVP", "UI/UX Design", "Other"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (optional)</Label>
              <Select value={form.budget} onValueChange={(v) => setForm({ ...form, budget: v })}>
                <SelectTrigger id="budget"><SelectValue placeholder="Select budget range" /></SelectTrigger>
                <SelectContent>
                  {["< $5k", "$5k – $15k", "$15k – $50k", "$50k – $100k", "$100k+"].map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project..." maxLength={2000} />
            </div>
            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={submitting}>
              {submitting ? "Sending..." : "Start Your Project"} <ArrowRight />
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};
export default Contact;
