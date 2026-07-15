/**
 * Pinged daily by Vercel Cron (see vercel.json) so the Supabase free-tier
 * project never hits the 7-days-without-activity auto-pause. The site only
 * talks to Supabase on form submissions, so quiet weeks would otherwise
 * pause the database and make the next real enquiry fail.
 */
export default async function handler(req, res) {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return res.status(500).json({ ok: false, error: 'Supabase env vars missing' });
  }

  const r = await fetch(`${url}/rest/v1/enquiries?select=id&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });

  return res.status(r.ok ? 200 : 502).json({ ok: r.ok, supabaseStatus: r.status });
}
