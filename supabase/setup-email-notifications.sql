-- ─────────────────────────────────────────────────────────────────────────────
-- SolarPlan Ireland — email alert on every new enquiry
--
-- Sends a notification via Resend (https://resend.com) whenever a row is
-- inserted into public.enquiries. Runs inside Postgres via pg_net, so there
-- is no Edge Function to deploy.
--
-- BEFORE running this script:
--   1. Create a free Resend account and an API key (starts with "re_").
--   2. In the Supabase SQL Editor, store the key in Vault (run once,
--      with your real key):
--
--        select vault.create_secret('re_YOUR_API_KEY_HERE', 'resend_api_key');
--
--   3. Then run this whole script.
--
-- Until you verify the solarplanningireland.com domain in Resend, emails are
-- sent from onboarding@resend.dev and can ONLY be delivered to the email
-- address you signed up to Resend with — so sign up with the address below,
-- or change NOTIFY_EMAIL after verifying your domain.
-- ─────────────────────────────────────────────────────────────────────────────

create extension if not exists pg_net;

create or replace function public.notify_new_enquiry()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  api_key text;
  notify_email constant text := 'govindtupsoundare@gmail.com';
  from_addr    constant text := 'SolarPlan Ireland <onboarding@resend.dev>';
begin
  select decrypted_secret into api_key
  from vault.decrypted_secrets
  where name = 'resend_api_key'
  limit 1;

  -- No key configured — skip silently rather than blocking the enquiry
  if api_key is null then
    return new;
  end if;

  perform net.http_post(
    url     := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || api_key,
      'Content-Type',  'application/json'
    ),
    body := jsonb_build_object(
      'from',    from_addr,
      'to',      jsonb_build_array(notify_email),
      'subject', '🔔 New enquiry from ' || new.name
                 || coalesce(' (' || new.county || ')', ''),
      'html',
        '<h2>New enquiry on solarplanningireland.com</h2>'
        || '<table cellpadding="6" style="border-collapse:collapse">'
        || '<tr><td><b>Name</b></td><td>'    || new.name  || '</td></tr>'
        || '<tr><td><b>Email</b></td><td>'   || new.email || '</td></tr>'
        || '<tr><td><b>Phone</b></td><td>'   || coalesce(new.phone,   '—') || '</td></tr>'
        || '<tr><td><b>Service</b></td><td>' || coalesce(new.service, '—') || '</td></tr>'
        || '<tr><td><b>County</b></td><td>'  || coalesce(new.county,  '—') || '</td></tr>'
        || '<tr><td><b>Scale</b></td><td>'   || coalesce(new.scale,   '—') || '</td></tr>'
        || '<tr><td><b>Details</b></td><td>' || new.details || '</td></tr>'
        || '<tr><td><b>Page</b></td><td>'    || coalesce(new.source_page, '—') || '</td></tr>'
        || '<tr><td><b>UTM</b></td><td>'
        || coalesce(new.utm_source, '—') || ' / '
        || coalesce(new.utm_medium, '—') || ' / '
        || coalesce(new.utm_campaign, '—') || '</td></tr>'
        || '</table>'
        || '<p>Reply directly to the enquirer at: ' || new.email || '</p>'
    )
  );

  return new;
exception when others then
  -- Never let a notification failure block the enquiry itself
  return new;
end;
$$;

drop trigger if exists trg_notify_new_enquiry on public.enquiries;
create trigger trg_notify_new_enquiry
  after insert on public.enquiries
  for each row execute function public.notify_new_enquiry();
