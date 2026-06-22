/**
 * Supabase Edge Function: send-enquiry-email
 *
 * Triggered by a database trigger on public.enquiries (INSERT).
 * Sends two emails via Resend:
 *   1. Internal notification to the SolarPlan Ireland team
 *   2. Auto-confirmation to the enquirer
 *
 * Environment secrets required (set in Supabase Dashboard → Edge Functions → Secrets):
 *   RESEND_API_KEY   — from resend.com
 *   FROM_EMAIL       — e.g. no-reply@solarplanireland.ie (must be verified in Resend)
 *   TEAM_EMAIL       — e.g. info@solarplanireland.ie
 */

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_URL = 'https://api.resend.com/emails';

interface Enquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  county?: string;
  scale?: string;
  details: string;
  source_page?: string;
}

const serviceLabels: Record<string, string> = {
  'glint-glare':       'Glint & Glare Analysis',
  'planning-drawings': 'PV Planning Drawings',
  'ground-mounted':    'Ground-Mounted Solar Design',
  'roof-mounted':      'Roof-Mounted Solar Design',
  'lvia':              'Landscape & LVIA Reports',
  'multiple':          'Multiple Services',
  'unsure':            'Not Sure — Need Advice',
};

async function sendEmail(payload: {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  reply_to?: string;
}): Promise<void> {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) {
    console.error('[send-enquiry-email] RESEND_API_KEY not set');
    return;
  }

  const res = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('[send-enquiry-email] Resend error:', err);
    throw new Error(`Resend API error: ${res.status}`);
  }
}

function teamEmailHtml(enquiry: Enquiry): string {
  const service = serviceLabels[enquiry.service ?? ''] ?? enquiry.service ?? '—';
  const receivedAt = new Date(enquiry.created_at).toLocaleString('en-IE', {
    timeZone: 'Europe/Dublin',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f9fafb; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 32px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #052e16 0%, #166534 60%, #b45309 100%); padding: 32px 40px; }
    .header h1 { color: #fff; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: #fde68a; margin: 6px 0 0; font-size: 14px; }
    .body { padding: 36px 40px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .value { font-size: 15px; color: #111827; }
    .details-box { background: #f3f4f6; border-radius: 10px; padding: 16px; font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap; }
    .badge { display: inline-block; background: #fef3c7; color: #92400e; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .cta { margin-top: 28px; text-align: center; }
    .cta a { display: inline-block; background: #f59e0b; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px; }
    .footer { background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 20px 40px; font-size: 12px; color: #9ca3af; text-align: center; }
    hr { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>☀️ New Enquiry Received</h1>
      <p>${receivedAt}</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${enquiry.name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${enquiry.email}">${enquiry.email}</a></div>
      </div>
      ${enquiry.phone ? `<div class="field"><div class="label">Phone</div><div class="value"><a href="tel:${enquiry.phone}">${enquiry.phone}</a></div></div>` : ''}
      <hr />
      <div class="field">
        <div class="label">Service Requested</div>
        <div class="value"><span class="badge">${service}</span></div>
      </div>
      <div class="field">
        <div class="label">County</div>
        <div class="value">${enquiry.county ?? '—'}</div>
      </div>
      <div class="field">
        <div class="label">Project Scale</div>
        <div class="value">${enquiry.scale ?? '—'}</div>
      </div>
      <hr />
      <div class="field">
        <div class="label">Project Details</div>
        <div class="details-box">${enquiry.details}</div>
      </div>
      <div class="cta">
        <a href="https://supabase.com">View in CRM →</a>
      </div>
    </div>
    <div class="footer">
      Enquiry ID: ${enquiry.id} · Received via ${enquiry.source_page ?? 'website'}
    </div>
  </div>
</body>
</html>
  `.trim();
}

function confirmationEmailHtml(enquiry: Enquiry): string {
  const service = serviceLabels[enquiry.service ?? ''] ?? enquiry.service ?? 'solar planning services';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f9fafb; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 32px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #052e16 0%, #166534 60%, #b45309 100%); padding: 40px; text-align: center; }
    .logo { font-size: 20px; font-weight: 900; color: #fff; letter-spacing: -0.5px; }
    .logo span { color: #fcd34d; }
    .header h1 { color: #fff; margin: 16px 0 8px; font-size: 24px; }
    .header p { color: #d1fae5; margin: 0; font-size: 15px; }
    .body { padding: 40px; }
    .greeting { font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px; }
    .step { display: flex; gap: 14px; margin-bottom: 20px; }
    .step-num { width: 28px; height: 28px; border-radius: 50%; background: #f59e0b; color: #fff; font-weight: 700; font-size: 13px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
    .step-text strong { display: block; color: #111827; font-size: 14px; margin-bottom: 2px; }
    .step-text p { color: #6b7280; font-size: 13px; margin: 0; }
    .cta-section { background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 24px; text-align: center; margin: 28px 0; }
    .cta-section p { font-size: 14px; color: #92400e; margin: 0 0 14px; }
    .cta-btn { display: inline-block; background: #f59e0b; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px; }
    .contact-row { font-size: 13px; color: #6b7280; line-height: 1.8; }
    .footer { background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 24px 40px; font-size: 12px; color: #9ca3af; text-align: center; }
    .footer a { color: #9ca3af; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo">Solar<span>Plan</span> IRELAND</div>
      <h1>We've received your enquiry!</h1>
      <p>Thank you for getting in touch, ${enquiry.name.split(' ')[0]}.</p>
    </div>
    <div class="body">
      <p class="greeting">
        We've received your enquiry about <strong>${service}</strong> and will respond within <strong>one business day</strong> with a tailored proposal and fixed-fee quote.
      </p>

      <strong style="font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">What happens next:</strong>
      <br/><br/>

      <div class="step">
        <div class="step-num">1</div>
        <div class="step-text">
          <strong>We review your project details</strong>
          <p>One of our specialist consultants will assess your requirements and determine the exact documentation needed.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-text">
          <strong>You receive a fixed-fee proposal</strong>
          <p>We'll send a clear, itemised proposal — no hidden charges, no surprise invoices.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-text">
          <strong>We kick off within 48 hours</strong>
          <p>Once you accept, a named consultant is assigned and work begins immediately.</p>
        </div>
      </div>

      <div class="cta-section">
        <p>Want to talk through your project sooner? Book a free 30-minute consultation call.</p>
        <a href="${Deno.env.get('CALENDLY_URL') || 'https://calendly.com/solarplanireland'}" class="cta-btn">
          Book a Consultation Call
        </a>
      </div>

      <div class="contact-row">
        <strong style="color:#111827;">Can't wait?</strong><br/>
        📞 <a href="tel:+35312345678" style="color:#b45309;">01 234 5678</a> (Mon–Fri 8:30–17:30)<br/>
        ✉️ <a href="mailto:info@solarplanireland.ie" style="color:#b45309;">info@solarplanireland.ie</a>
      </div>
    </div>
    <div class="footer">
      SolarPlan Ireland Ltd · Nationwide Solar Planning Consultants<br/>
      <a href="https://solarplanireland.ie/privacy">Privacy Policy</a> ·
      <a href="https://solarplanireland.ie">solarplanireland.ie</a>
    </div>
  </div>
</body>
</html>
  `.trim();
}

serve(async (req: Request) => {
  // Only accept POST
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let enquiry: Enquiry;
  try {
    enquiry = await req.json();
  } catch {
    return new Response('Bad Request — invalid JSON', { status: 400 });
  }

  const fromEmail = Deno.env.get('FROM_EMAIL') ?? 'no-reply@solarplanireland.ie';
  const teamEmail = Deno.env.get('TEAM_EMAIL')  ?? 'info@solarplanireland.ie';

  try {
    // Fire both emails in parallel
    await Promise.all([
      // 1. Internal team notification
      sendEmail({
        from:     `SolarPlan Ireland <${fromEmail}>`,
        to:       teamEmail,
        subject:  `☀️ New Enquiry — ${enquiry.name} (${enquiry.county ?? 'Unknown county'})`,
        html:     teamEmailHtml(enquiry),
        reply_to: enquiry.email,
      }),
      // 2. Client auto-confirmation
      sendEmail({
        from:    `SolarPlan Ireland <${fromEmail}>`,
        to:      enquiry.email,
        subject: 'We received your enquiry — SolarPlan Ireland',
        html:    confirmationEmailHtml(enquiry),
      }),
    ]);

    console.log(`[send-enquiry-email] Emails sent for enquiry ${enquiry.id}`);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[send-enquiry-email] Failed:', err);
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
