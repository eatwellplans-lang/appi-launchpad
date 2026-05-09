import { z } from "npm:zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const NOTIFY_TO = "appicreativesolutions@gmail.com";
const FROM_ADDRESS = "Appi Technologies <onboarding@resend.dev>";

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(100).optional().nullable(),
  projectType: z.string().trim().min(1).max(100),
  budget: z.string().trim().max(50).optional().nullable(),
  message: z.string().trim().min(1).max(2000),
});

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const notificationHtml = (d: z.infer<typeof BodySchema>) => `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111">
    <h2 style="margin:0 0 16px">New contact form submission</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:8px 0;color:#666;width:120px">Name</td><td style="padding:8px 0">${escapeHtml(d.name)}</td></tr>
      <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a></td></tr>
      ${d.company ? `<tr><td style="padding:8px 0;color:#666">Company</td><td style="padding:8px 0">${escapeHtml(d.company)}</td></tr>` : ""}
      <tr><td style="padding:8px 0;color:#666">Project type</td><td style="padding:8px 0">${escapeHtml(d.projectType)}</td></tr>
      ${d.budget ? `<tr><td style="padding:8px 0;color:#666">Budget</td><td style="padding:8px 0">${escapeHtml(d.budget)}</td></tr>` : ""}
    </table>
    <h3 style="margin:24px 0 8px;font-size:14px;color:#666">Message</h3>
    <div style="background:#f6f6f7;padding:16px;border-radius:8px;white-space:pre-wrap;font-size:14px;line-height:1.6">${escapeHtml(d.message)}</div>
    <p style="margin-top:24px;font-size:12px;color:#999">Reply directly to this email to respond to ${escapeHtml(d.name)}.</p>
  </div>
`;

const confirmationHtml = (name: string) => `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111">
    <h2 style="margin:0 0 16px">Thanks for reaching out, ${escapeHtml(name)}!</h2>
    <p style="font-size:14px;line-height:1.6;color:#333">
      We've received your message and a member of the Appi Technologies team will get back to you within 24 hours.
    </p>
    <p style="font-size:14px;line-height:1.6;color:#333">
      In the meantime, feel free to reply to this email if you'd like to add any details about your project.
    </p>
    <p style="margin-top:32px;font-size:14px;color:#333">— The Appi Technologies team</p>
  </div>
`;

async function sendEmail(payload: Record<string, unknown>) {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

  const res = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": RESEND_API_KEY,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Resend [${res.status}]: ${JSON.stringify(data)}`);
  return data;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const d = parsed.data;

    const [notify, confirm] = await Promise.allSettled([
      sendEmail({
        from: FROM_ADDRESS,
        to: [NOTIFY_TO],
        reply_to: d.email,
        subject: `New contact: ${d.name}${d.company ? ` (${d.company})` : ""} — ${d.projectType}`,
        html: notificationHtml(d),
      }),
      sendEmail({
        from: FROM_ADDRESS,
        to: [d.email],
        subject: "We received your message — Appi Technologies",
        html: confirmationHtml(d.name),
      }),
    ]);

    if (notify.status === "rejected") console.error("notify failed:", notify.reason);
    if (confirm.status === "rejected") console.error("confirm failed:", confirm.reason);

    return new Response(
      JSON.stringify({
        notify: notify.status,
        confirm: confirm.status,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("send-contact-emails error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});