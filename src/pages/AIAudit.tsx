import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Brain, Workflow, Bot, Wrench, Lightbulb, Cog, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().min(1, "Company is required").max(100),
  industry: z.string().min(1, "Select an industry"),
  website: z.string().trim().max(255).optional(),
  teamSize: z.string().min(1, "Select a team size"),
  challenge: z.string().trim().min(10, "Tell us your biggest challenge").max(1000),
  tools: z.string().trim().max(500).optional(),
});

const deliverables = [
  { icon: Brain, text: "AI opportunity analysis" },
  { icon: Cog, text: "Automation recommendations" },
  { icon: Workflow, text: "Workflow optimization ideas" },
  { icon: Bot, text: "Customer support automation insights" },
  { icon: Wrench, text: "Suggested AI tools and systems" },
  { icon: Lightbulb, text: "Technical recommendations" },
];

const AIAudit = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", company: "", industry: "", website: "",
    teamSize: "", challenge: "", tools: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      const message = [
        `Industry: ${parsed.data.industry}`,
        `Website: ${parsed.data.website || "—"}`,
        `Team size: ${parsed.data.teamSize}`,
        ``,
        `Biggest operational challenge:`,
        parsed.data.challenge,
        ``,
        `Current tools/software used:`,
        parsed.data.tools || "—",
      ].join("\n");

      const { error } = await supabase.from("contact_submissions").insert({
        id,
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company,
        project_type: "AI Audit",
        budget: null,
        message,
      });
      if (error) throw error;

      void supabase.functions.invoke("send-contact-emails", {
        body: {
          name: parsed.data.name,
          email: parsed.data.email,
          company: parsed.data.company,
          projectType: "AI Audit",
          message,
        },
      }).catch(() => {});

      setSubmitted(true);
      toast.success("Audit request received!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <PageHero
          eyebrow="Received"
          title="Your audit request has been received 🎉"
          description="We'll review your business and email your personalized AI audit within 2–3 business days."
        />
        <section className="container pb-20 md:pb-28">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="glass-card glow-border rounded-2xl p-6 md:p-8 text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20 mb-4">
                <CheckCircle2 className="h-7 w-7 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">Thanks — you're on the list</h2>
              <p className="text-muted-foreground mt-2">
                Check your inbox for a confirmation. Our team will follow up shortly.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6 md:p-8 text-center">
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-3">
                Want to move faster?
              </h3>
              <p className="text-muted-foreground mb-6">
                Jump on a free 30-minute strategy call with our team and we'll walk through your audit live.
              </p>
              <Button variant="hero" size="lg" onClick={() => navigate("/book-a-call")}>
                Book a Free Strategy Call
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Free AI Audit"
        title="Discover how AI can improve your business"
        description="Appi Technologies will analyze your operations and identify opportunities for automation, AI integration, and workflow optimization."
      />

      {/* What you get */}
      <section className="container -mt-8 md:-mt-12 pb-12">
        <div className="max-w-5xl mx-auto glass-card rounded-2xl p-6 md:p-10">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-center">
            Your free audit includes:
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((b) => (
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

      {/* Lead form */}
      <section className="container pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3">
              <span className="h-px w-6 bg-primary" />Tell us about your business<span className="h-px w-6 bg-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Request your free AI audit</h2>
            <p className="text-muted-foreground mt-3">Takes 2 minutes. We'll email your audit within 2–3 business days.</p>
          </div>

          <form onSubmit={onSubmit} className="glass-card glow-border rounded-2xl p-6 md:p-8 space-y-5">
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
                <Label htmlFor="company">Company *</Label>
                <Input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={form.industry} onValueChange={(v) => setForm({ ...form, industry: v })}>
                  <SelectTrigger id="industry"><SelectValue placeholder="Select industry" /></SelectTrigger>
                  <SelectContent>
                    {["E-commerce / Retail", "Fintech / Finance", "Healthcare", "Education", "Logistics", "Real Estate", "SaaS / Tech", "Professional Services", "Manufacturing", "Other"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://yourcompany.com" maxLength={255} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team size *</Label>
                <Select value={form.teamSize} onValueChange={(v) => setForm({ ...form, teamSize: v })}>
                  <SelectTrigger id="teamSize"><SelectValue placeholder="Select team size" /></SelectTrigger>
                  <SelectContent>
                    {["Just me", "2–10", "11–50", "51–200", "200+"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="challenge">Biggest operational challenge *</Label>
              <Textarea id="challenge" rows={4} value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} placeholder="What's slowing your team down? e.g. manual customer support, repetitive data entry, slow onboarding..." maxLength={1000} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tools">Current tools / software used</Label>
              <Textarea id="tools" rows={3} value={form.tools} onChange={(e) => setForm({ ...form, tools: e.target.value })} placeholder="e.g. HubSpot, Notion, Shopify, Zendesk, custom CRM..." maxLength={500} />
            </div>
            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Request Free AI Audit"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              No spam. We respect your data and only use it to prepare your audit.
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default AIAudit;