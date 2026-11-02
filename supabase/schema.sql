-- Supabase > SQL Editor mein ye poora chalayein

create extension if not exists pgcrypto;

create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  created_at timestamptz not null default now(),
  name text not null,
  mobile text not null,
  city text default '',
  lender text not null,
  loan_id text default '',
  threats text[] default '{}',
  numbers text default '',
  severe boolean default false,
  gmail_message_id text default '',
  status text not null default 'sent',
  follow_up_on date,
  notes text default ''
);

create index if not exists cases_created_idx on public.cases (created_at desc);
create index if not exists cases_lookup_idx on public.cases (code, mobile);

-- Row Level Security ON: browser se koi seedha table nahi padh sakta.
-- Website sirf server par service role key se padhti/likhti hai.
alter table public.cases enable row level security;
