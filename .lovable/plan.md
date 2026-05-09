## Goal

Make the Contact form on `/contact` actually deliver submissions to **appicreativesolutions@gmail.com** AND store them so nothing gets lost.

## Approach

1. **Enable Lovable Cloud** (required for database + email sending).
2. **Store every submission** in a `contact_submissions` table so you can review them later in the Cloud dashboard, even if email ever fails.
3. **Send a notification email** to `appicreativesolutions@gmail.com` for each new submission, containing the name, email, company, project type, budget, and message — with a reply-to set to the submitter so you can respond in one click.
4. **Send a confirmation email** to the person who filled out the form ("Thanks, we'll be in touch within 24 hours") so they get instant acknowledgement.
5. **Wire the form** in `src/pages/Contact.tsx` to insert into the table and trigger the email function on submit. Keep existing Zod validation, button states, and toasts.

## Email setup

Uses Lovable's built-in email system (no third-party API keys needed). This requires setting up a sender domain — I'll prompt you for that after Cloud is enabled. While DNS propagates, submissions are still saved to the database so nothing is lost.

## Technical details

- New table `contact_submissions` (name, email, company, project_type, budget, message, created_at) with RLS: public INSERT allowed, SELECT restricted.
- Two React Email templates: `contact-form-notification` (to you) and `contact-form-confirmation` (to submitter).
- Edge function calls: `send-transactional-email` invoked twice per submission with idempotency keys derived from the submission ID.
- Frontend: insert row → invoke both emails in parallel → show success toast.

## Out of scope

- Admin UI to browse submissions in-app (you can view them in the Cloud dashboard).
- SMS/Slack notifications.
