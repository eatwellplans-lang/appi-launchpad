## Switch email delivery to Resend

You'd rather use Resend instead of setting up a Lovable email domain — got it. Here's the revised plan.

## Steps

1. **Connect Resend** via the built-in connector (you'll be prompted to either pick an existing Resend connection or sign in to create one — no manual API key copy/paste).
2. **Create one edge function** `send-contact-emails` that:
   - Receives the form submission payload.
   - Sends a **notification email** to `appicreativesolutions@gmail.com` with all the form fields, with `reply_to` set to the submitter so you can reply in one click.
   - Sends a **confirmation email** to the submitter ("Thanks, we'll be in touch within 24 hours").
   - Both emails use clean, brand-styled HTML.
3. **Update the contact form** (`src/pages/Contact.tsx`) to:
   - Save the submission to the existing `contact_submissions` table (already created).
   - Invoke `send-contact-emails` with the submission data.
   - Show success toast even if email send fails (the row is still saved as a backup).

## From address — important note

Until you verify your own domain in Resend, the `from` address must be `onboarding@resend.dev` (Resend's testing sender). This works immediately but looks less branded.

Once you verify a domain (e.g. `appitechnologies.com`) inside Resend's dashboard, I can switch the `from` to something like `hello@appitechnologies.com`. You can do that anytime later — no code change needed beyond updating one constant.

## Out of scope

- Domain verification in Resend (you'd do that in your Resend dashboard).
- Admin UI to browse submissions (view them in the Cloud dashboard).
