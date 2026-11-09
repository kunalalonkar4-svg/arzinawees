-- Supabase > SQL Editor mein ye poora chalayein

create extension if not exists pgcrypto;

create table if not exists public.web_cases (
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

create index if not exists web_cases_created_idx on public.web_cases (created_at desc);
create index if not exists web_cases_lookup_idx on public.web_cases (code, mobile);

-- Row Level Security ON: browser se koi seedha table nahi padh sakta.
-- Website sirf server par service role key se padhti/likhti hai.
alter table public.web_cases enable row level security;

-- Contact / feedback sandesh
create table if not exists public.web_messages (
  id text primary key,
  created_at timestamptz not null default now(),
  name text not null,
  contact text not null,
  message text not null,
  type text not null default 'other',
  done boolean not null default false
);
create index if not exists web_messages_created_idx on public.web_messages (created_at desc);
alter table public.web_messages enable row level security;
