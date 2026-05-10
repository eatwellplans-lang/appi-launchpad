import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Check, Calendar, Sparkles, Clock, Target, Layers } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CALENDLY_URL = "https://calendly.com/appitechnologies/30min";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(5, "Phone/WhatsApp is required").max(40),
  company: z.string().trim().max(100).optional(),
  build: z.string().trim().min(5, "Tell us what you want to build").max(1000),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
});

const benefits = [
  { icon: Target, text: "Understand the best technical approach for your idea" },
  { icon: Sparkles, text: "Identify AI opportunities for your business" },
  { icon: Clock, text: "Estimate realistic timelines and costs" },
  { icon: Layers, text: "Get product strategy from senior engineers" },
  { icon: Check, text: "Recommend the right stack and architecture" },
];

const BookCall = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", build: "", budget: "", timeline: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [qualified, setQualified] = useState(false);

  const onQualify = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      const id = crypto.randomUUID();
      const message = [
        `Phone/WhatsApp: ${parsed.data.phone}`,
        `Timeline: ${parsed.data.timeline}`,
        ``,
        `What they want to build:`,
        parsed.data.build,
      ].join("\n");

      const { error } = await supabase.from("contact_submissions").insert({
        id,
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || null,
        project_type: "Strategy Call",
        budget: parsed.data.budget,
        message,
      });
      if (error) throw error;

      void supabase.functions.invoke("send-contact-emails", {
        body: {
          name: parsed.data.name,
          email: parsed.data.email,
          company: parsed.data.company || null,
          projectType: "Strategy Call",
          budget: parsed.data.budget,
          message,
        },
      }).catch(() => {});

      setQualified(true);
      toast.success("Great — now pick a time below.");
      setTimeout(() => {
        document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Free 30-min Call"
        title="Book a Free Strategy Call"
        description="Speak with Appi Technologies about your AI solution, software idea, mobile app, automation system, or startup MVP."
      />

      {/* Benefits */}
      <section className="container -mt-8 md:-mt-12 pb-12">
        <div className="max-w-4xl mx-auto glass-card rounded-2xl p-6 md:p-10">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-center">
            In this free call, we'll help you:
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {benefits.map((b) => (
              <li key={b.text} className="flex gap-3 items-start">
                <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <b.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm md:text-base text-muted-foreground pt-1.5">{b.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Qualification form */}
      <section className="container pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3">
              <span className="h-px w-6 bg-primary" />Step 1<span className="h-px w-6 bg-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Tell us about your project</h2>
            <p className="text-muted-foreground mt-3">Takes 60 seconds. Then pick a time that works for you.</p>
          </div>

          <form onSubmit={onQualify} className="glass-card glow-border rounded-2xl p-6 md:p-8 space-y-5">
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
                <Label htmlFor="phone">Phone / WhatsApp *</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+234 ..." maxLength={40} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name (optional)" maxLength={100} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="build">What do you want to build? *</Label>
              <Textarea id="build" rows={4} value={form.build} onChange={(e) => setForm({ ...form, build: e.target.value })} placeholder="Briefly describe the AI system, app, software or automation you have in mind..." maxLength={1000} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget range *</Label>
                <Select value={form.budget} onValueChange={(v) => setForm({ ...form, budget: v })}>
                  <SelectTrigger id="budget"><SelectValue placeholder="Select budget" /></SelectTrigger>
                  <SelectContent>
                    {["< $5k", "$5k – $15k", "$15k – $50k", "$50k – $100k", "$100k+"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline *</Label>
                <Select value={form.timeline} onValueChange={(v) => setForm({ ...form, timeline: v })}>
                  <SelectTrigger id="timeline"><SelectValue placeholder="Select timeline" /></SelectTrigger>
                  <SelectContent>
                    {["ASAP", "1 month", "1–3 months", "3–6 months", "Just exploring"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={submitting || qualified}>
              {qualified ? "Submitted — pick a time below" : submitting ? "Submitting..." : "Continue to calendar"}
              {!qualified && <Calendar />}
            </Button>
          </form>
        </div>
      </section>

      {/* Calendar */}
      <section id="calendar" className="container pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3">
              <span className="h-px w-6 bg-primary" />Step 2<span className="h-px w-6 bg-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Pick a day & time</h2>
            <p className="text-muted-foreground mt-3">30 minutes. Free. No commitment.</p>
          </div>
          <div className={`glass-card rounded-2xl overflow-hidden ${qualified ? "" : "opacity-60 pointer-events-none"}`}>
            <iframe
              src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=6366f1`}
              title="Schedule a call with Appi Technologies"
              className="w-full"
              style={{ height: "720px", border: 0 }}
              loading="lazy"
            />
          </div>
          {!qualified && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Complete the form above to unlock the calendar.
            </p>
          )}
          <div className="text-center mt-6">
            <Button variant="ghost" onClick={() => navigate("/thank-you")} className="text-muted-foreground">
              Already booked? Go to confirmation →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookCall;