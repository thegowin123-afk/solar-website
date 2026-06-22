-- ============================================================
-- SolarPlan Ireland — Initial Supabase Schema
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor)
-- or via: supabase db push
-- ============================================================

-- ─────────────────────────────────────────
-- 1. ENQUIRIES TABLE
-- ─────────────────────────────────────────
create table if not exists public.enquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- Contact details
  name          text not null,
  email         text not null,
  phone         text,

  -- Project details
  service       text,          -- service id from services.js
  county        text,
  scale         text,          -- project capacity / scale
  details       text not null, -- free-text project description

  -- Source tracking
  source_page   text,          -- which page the form was on
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,

  -- CRM status
  status        text not null default 'new'
                check (status in ('new', 'contacted', 'quoted', 'won', 'lost', 'spam')),
  assigned_to   text,
  notes         text,

  -- Consent
  consent       boolean not null default false
);

-- RLS: only authenticated users (your team) can read all rows
alter table public.enquiries enable row level security;

-- Allow the form (anon key) to INSERT only
create policy "Anon can insert enquiries"
  on public.enquiries
  for insert
  to anon
  with check (true);

-- Authenticated team can read, update
create policy "Authenticated can manage enquiries"
  on public.enquiries
  for all
  to authenticated
  using (true)
  with check (true);

-- Index for common CRM queries
create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx     on public.enquiries (status);
create index if not exists enquiries_county_idx     on public.enquiries (county);


-- ─────────────────────────────────────────
-- 2. NEWSLETTER SUBSCRIBERS TABLE
-- ─────────────────────────────────────────
create table if not exists public.newsletter_subscribers (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  email        text not null unique,
  source_page  text,
  status       text not null default 'active'
               check (status in ('active', 'unsubscribed', 'bounced')),
  unsubscribed_at timestamptz
);

alter table public.newsletter_subscribers enable row level security;

create policy "Anon can subscribe"
  on public.newsletter_subscribers
  for insert
  to anon
  with check (true);

create policy "Authenticated can manage subscribers"
  on public.newsletter_subscribers
  for all
  to authenticated
  using (true)
  with check (true);

create index if not exists subscribers_email_idx  on public.newsletter_subscribers (email);
create index if not exists subscribers_status_idx on public.newsletter_subscribers (status);


-- ─────────────────────────────────────────
-- 3. NOTIFY EDGE FUNCTION ON NEW ENQUIRY
--    Uses pg_net (available on Supabase) to call the Edge Function
--    which sends the notification email via Resend.
-- ─────────────────────────────────────────
create or replace function public.notify_new_enquiry()
returns trigger
language plpgsql
security definer
as $$
declare
  edge_function_url text;
  service_role_key  text;
begin
  -- These values are set as Supabase Secrets (Project Settings → Edge Functions → Secrets)
  edge_function_url := current_setting('app.edge_function_url', true);
  service_role_key  := current_setting('app.service_role_key',  true);

  -- Call the Edge Function asynchronously via pg_net
  perform net.http_post(
    url     := edge_function_url || '/send-enquiry-email',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || service_role_key
    ),
    body    := to_jsonb(NEW)
  );

  return NEW;
end;
$$;

-- Trigger fires after each INSERT on enquiries
drop trigger if exists on_new_enquiry on public.enquiries;
create trigger on_new_enquiry
  after insert on public.enquiries
  for each row
  execute function public.notify_new_enquiry();


-- ─────────────────────────────────────────
-- 4. SAME TRIGGER FOR NEWSLETTER
-- ─────────────────────────────────────────
create or replace function public.notify_new_subscriber()
returns trigger
language plpgsql
security definer
as $$
declare
  edge_function_url text;
  service_role_key  text;
begin
  edge_function_url := current_setting('app.edge_function_url', true);
  service_role_key  := current_setting('app.service_role_key',  true);

  perform net.http_post(
    url     := edge_function_url || '/send-newsletter-welcome',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || service_role_key
    ),
    body    := to_jsonb(NEW)
  );

  return NEW;
end;
$$;

drop trigger if exists on_new_subscriber on public.newsletter_subscribers;
create trigger on_new_subscriber
  after insert on public.newsletter_subscribers
  for each row
  execute function public.notify_new_subscriber();
