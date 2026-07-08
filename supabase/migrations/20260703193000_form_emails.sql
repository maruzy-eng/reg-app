create extension if not exists pgcrypto;

create table if not exists public.form_emails (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.forms(id) on delete cascade,
  name text not null,
  type text not null check (type in ('user', 'admin')),
  enabled boolean not null default true,
  recipient_field text,
  recipients jsonb not null default '[]'::jsonb,
  subject_template text not null,
  body_html_template text not null,
  from_name text,
  reply_to_field text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists form_emails_form_id_idx
  on public.form_emails (form_id);

create index if not exists form_emails_form_id_enabled_sort_order_idx
  on public.form_emails (form_id, enabled, sort_order);

drop trigger if exists set_form_emails_updated_at on public.form_emails;

create trigger set_form_emails_updated_at
before update on public.form_emails
for each row execute function public.set_updated_at();

create table if not exists public.form_email_logs (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.form_submissions(id) on delete cascade,
  form_email_id uuid references public.form_emails(id) on delete set null,
  form_email_name text,
  status text not null check (status in ('success', 'error')),
  email_type text check (email_type in ('user', 'admin')),
  recipients jsonb not null default '[]'::jsonb,
  subject text,
  body_html text,
  provider_message_id text,
  error_message text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists form_email_logs_submission_id_idx
  on public.form_email_logs (submission_id);

create index if not exists form_email_logs_form_email_id_idx
  on public.form_email_logs (form_email_id);

create index if not exists form_email_logs_created_at_idx
  on public.form_email_logs (created_at desc);
