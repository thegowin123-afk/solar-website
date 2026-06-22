/**
 * Supabase Edge Function: send-newsletter-welcome
 *
 * Triggered by a database trigger on public.newsletter_subscribers (INSERT).
 * Sends a welcome email to the new subscriber via Resend.
 *
 * Secrets: RESEND_API_KEY, FROM_EMAIL
 */

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_URL = 'https://api.resend.com/emails';

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

async function sendEmail(payload: {
  from: string;
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) throw new Error('RESEND_API_KEY not set');

  const res = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Resend error ${res.status}: ${await res.text()}`);
  }
}

function welcomeHtml(subscriber: Subscriber): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f9fafb; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 32px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #052e16 0%, #166534 60%, #b45309 100%); padding: 40px; text-align: center; }
    .logo { font-size: 20px; font-weight: 900; color: #fff; }
    .logo span { color: #fcd34d; }
    .header h1 { color: #fff; margin: 16px 0 8px; font-size: 24px; }
    .header p { color: #d1fae5; margin: 0; }
    .body { padding: 40px; }
    .body p { font-size: 15px; color: #374151; line-height: 1.7; margin: 0 0 16px; }
    .articles { margin: 24px 0; }
    .article { padding: 14px; border-left: 3px solid #f59e0b; margin-bottom: 10px; background: #fffbeb; border-radius: 0 8px 8px 0; }
    .article a { font-weight: 600; color: #92400e; text-decoration: none; font-size: 14px; }
    .article span { display: block; font-size: 12px; color: #6b7280; margin-top: 2px; }
    .cta { text-align: center; margin: 28px 0; }
    .cta a { display: inline-block; background: #f59e0b; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px; }
    .footer { background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 20px 40px; font-size: 12px; color: #9ca3af; text-align: center; }
    .footer a { color: #9ca3af; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo">Solar<span>Plan</span> IRELAND</div>
      <h1>Welcome to our newsletter!</h1>
      <p>Irish solar planning insights, straight to your inbox.</p>
    </div>
    <div class="body">
      <p>Thanks for subscribing to the SolarPlan Ireland newsletter. Each month we send practical planning insights, policy updates, and technical guidance to help you navigate the Irish solar planning system.</p>
      <p>To get you started, here are our most popular resources:</p>

      <div class="articles">
        <div class="article">
          <a href="https://solarplanireland.ie/blog/solar-planning-ireland-guide">
            The Complete Guide to Solar Planning Permission in Ireland
          </a>
          <span>Everything you need to know about planning permission for solar in Ireland.</span>
        </div>
        <div class="article">
          <a href="https://solarplanireland.ie/blog/glint-glare-common-questions">
            Glint & Glare: 10 Questions Planners Always Ask
          </a>
          <span>How a professional assessment addresses every common planning concern.</span>
        </div>
        <div class="article">
          <a href="https://solarplanireland.ie/blog/agri-voltaic-ireland-opportunity">
            Agri-voltaic Solar in Ireland: A Growing Opportunity for Farmers
          </a>
          <span>Everything farmers need to know about dual land-use solar installations.</span>
        </div>
      </div>

      <div class="cta">
        <a href="https://solarplanireland.ie/contact">Get a Free Planning Consultation</a>
      </div>

      <p style="font-size:13px;color:#6b7280;">Have a solar project you'd like to discuss? Reply to this email or call us on <a href="tel:+35312345678" style="color:#b45309;">01 234 5678</a>.</p>
    </div>
    <div class="footer">
      SolarPlan Ireland Ltd · Nationwide Solar Planning Consultants<br/>
      You're receiving this because you subscribed at solarplanireland.ie<br/>
      <a href="https://solarplanireland.ie/unsubscribe?email=${encodeURIComponent(subscriber.email)}">Unsubscribe</a> ·
      <a href="https://solarplanireland.ie/privacy">Privacy Policy</a>
    </div>
  </div>
</body>
</html>
  `.trim();
}

serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let subscriber: Subscriber;
  try {
    subscriber = await req.json();
  } catch {
    return new Response('Bad Request', { status: 400 });
  }

  const fromEmail = Deno.env.get('FROM_EMAIL') ?? 'no-reply@solarplanireland.ie';

  try {
    await sendEmail({
      from:    `SolarPlan Ireland <${fromEmail}>`,
      to:      subscriber.email,
      subject: 'Welcome to SolarPlan Ireland — your solar planning newsletter',
      html:    welcomeHtml(subscriber),
    });

    console.log(`[send-newsletter-welcome] Welcome email sent to ${subscriber.email}`);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[send-newsletter-welcome] Failed:', err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
