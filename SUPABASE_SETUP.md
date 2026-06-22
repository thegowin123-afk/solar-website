# Supabase Setup Guide — SolarPlan Ireland

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) → **New project**
2. Note your **Project URL** and **anon public key** (Project Settings → API)

---

## 2. Configure Environment Variables

Copy `.env.example` → `.env` and fill in:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 3. Run the Database Migration

In the Supabase Dashboard → **SQL Editor**, paste and run the contents of:

```
supabase/migrations/001_initial_schema.sql
```

This creates:
- `enquiries` table + RLS policies + email trigger
- `newsletter_subscribers` table + RLS policies + email trigger

---

## 4. Set Up Resend (Email Provider)

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Add and verify your sending domain (`solarplanireland.ie`)
3. Create an API key

---

## 5. Deploy Edge Functions

Install the Supabase CLI:
```bash
npm install -g supabase
supabase login
```

Link to your project:
```bash
supabase link --project-ref your-project-ref
```

Set Edge Function secrets:
```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
supabase secrets set FROM_EMAIL=no-reply@solarplanireland.ie
supabase secrets set TEAM_EMAIL=info@solarplanireland.ie
supabase secrets set CALENDLY_URL=https://calendly.com/solarplanireland
```

Deploy both functions:
```bash
supabase functions deploy send-enquiry-email
supabase functions deploy send-newsletter-welcome
```

---

## 6. Configure the Database Trigger to Call Edge Functions

After deploying, set the `app.edge_function_url` and `app.service_role_key` database settings
so the PostgreSQL trigger can call the Edge Functions.

In Supabase SQL Editor:
```sql
-- Replace with your actual values
alter database postgres
  set app.edge_function_url = 'https://your-project-ref.functions.supabase.co';

alter database postgres
  set app.service_role_key = 'your-service-role-key-here';
```

> ⚠️ **Security note**: The service role key is stored server-side in the database config,
> never exposed to the browser. The trigger function is `security definer` and only runs
> on the server.

---

## 7. Test the Integration

1. Start the dev server: `npm run dev`
2. Go to `/contact` and submit a test enquiry
3. Check the Supabase Dashboard → Table Editor → `enquiries` — your row should appear
4. Check your team email inbox for the notification
5. Check the enquirer's email for the confirmation

---

## 8. View Enquiries (CRM)

All enquiries are stored in `public.enquiries`. You can:

- **View in Supabase Dashboard** → Table Editor → `enquiries`
- **Filter by status**: `new`, `contacted`, `quoted`, `won`, `lost`
- **Export to CSV**: Table Editor → Download CSV
- **Connect a BI tool** (e.g. Metabase, Retool, or even Google Sheets via the Supabase REST API)

---

## Data Flow Summary

```
User fills form
     ↓
ContactForm.jsx  →  submitEnquiry()  →  supabase.from('enquiries').insert()
     ↓
Supabase DB trigger  →  pg_net HTTP call  →  Edge Function: send-enquiry-email
     ↓
Resend API  →  Team notification email  +  Client confirmation email
```
