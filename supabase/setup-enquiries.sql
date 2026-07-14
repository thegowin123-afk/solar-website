-- ─────────────────────────────────────────────────────────────────────────────
-- SolarPlan Ireland — enquiries + newsletter tables
-- Run this in Supabase Dashboard → SQL Editor → New query → Run
-- Matches the payloads in src/lib/enquiries.js
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.enquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  email         text not null,
  phone         text,
  service       text,
  county        text,
  scale         text,
  details       text not null,
  consent       boolean not null default false,
  source_page   text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text
);

create table if not exists public.newsletter_subscribers (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  email           text not null unique,
  status          text not null default 'active',
  source_page     text,
  unsubscribed_at timestamptz
);

-- Row Level Security: the public site uses the anon key, which should be able
-- to INSERT (submit) but never read other people's enquiries.
alter table public.enquiries enable row level security;
alter table public.newsletter_subscribers enable row level security;

drop policy if exists "anon can submit enquiries" on public.enquiries;
create policy "anon can submit enquiries"
  on public.enquiries for insert
  to anon
  with check (true);

drop policy if exists "anon can subscribe" on public.newsletter_subscribers;
create policy "anon can subscribe"
  on public.newsletter_subscribers for insert
  to anon
  with check (true);
