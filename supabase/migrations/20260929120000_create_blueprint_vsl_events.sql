create extension if not exists pgcrypto;

create table if not exists public.reg_blueprint_vsl_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (
    event_type in (
      'page_view',
      'video_complete',
      'sound_enabled',
      'form_click'
    )
  ),
  session_id text not null,
  visitor_id text,
  page_path text not null default '/blueprint-vsl',
  video_id text,
  metadata jsonb not null default '{}'::jsonb,
  referrer text,
  user_agent text,
  ip_address text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists reg_blueprint_vsl_events_created_at_idx
  on public.reg_blueprint_vsl_events (created_at desc);

create index if not exists reg_blueprint_vsl_events_event_type_created_at_idx
  on public.reg_blueprint_vsl_events (event_type, created_at desc);

create index if not exists reg_blueprint_vsl_events_session_id_idx
  on public.reg_blueprint_vsl_events (session_id);

alter table public.reg_blueprint_vsl_events enable row level security;
