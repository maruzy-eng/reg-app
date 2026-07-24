-- Checkmate REG — isolated forms, submissions, and settings tables
-- These tables are independent from the shared Checkmate Property schema
-- (public.forms, public.form_submissions, public.site_settings, etc.).

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Settings
-- ---------------------------------------------------------------------------

create table if not exists public.reg_site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_reg_site_settings_updated_at on public.reg_site_settings;
create trigger set_reg_site_settings_updated_at
before update on public.reg_site_settings
for each row execute function public.set_updated_at();

insert into public.reg_site_settings (key, value)
values (
  'global',
  '{
    "site_name": "Checkmate REG",
    "site_tagline": "Building lasting value through real estate.",
    "site_description": "Checkmate REG connects real estate strategy, development, construction, and professional execution to create sustainable long-term value.",
    "logo_url": "",
    "favicon_url": "",
    "primary_phone": "+1 (978) 239-5226",
    "primary_email": "contact@property.com",
    "whatsapp_number": "+19782395226",
    "address_line": "",
    "default_cta_title": "Interested in this property?",
    "default_cta_description": "Connect with the Checkmate REG team to learn more about availability, pricing, project details, and next steps.",
    "default_cta_button": "Contact Us",
    "facebook_url": "",
    "instagram_url": "",
    "linkedin_url": "",
    "youtube_url": "",
    "meta_pixel_id": "",
    "google_tag_id": ""
  }'::jsonb
)
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- Forms
-- ---------------------------------------------------------------------------

create table if not exists public.reg_forms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  title text not null,
  description text,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  submit_button_label text not null default 'Submit',
  acceptance_message text,
  thank_you_page_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists reg_forms_status_idx
  on public.reg_forms (status);

create index if not exists reg_forms_created_at_idx
  on public.reg_forms (created_at desc);

drop trigger if exists set_reg_forms_updated_at on public.reg_forms;
create trigger set_reg_forms_updated_at
before update on public.reg_forms
for each row execute function public.set_updated_at();

create table if not exists public.reg_form_fields (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.reg_forms (id) on delete cascade,
  label text not null,
  name text not null,
  type text not null
    check (
      type in (
        'text',
        'email',
        'phone',
        'number',
        'textarea',
        'select',
        'checkbox',
        'radio',
        'hidden',
        'state',
        'password'
      )
    ),
  placeholder text,
  help_text text,
  required boolean not null default false,
  options jsonb not null default '[]'::jsonb,
  default_value text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (form_id, name)
);

create index if not exists reg_form_fields_form_id_sort_order_idx
  on public.reg_form_fields (form_id, sort_order);

drop trigger if exists set_reg_form_fields_updated_at on public.reg_form_fields;
create trigger set_reg_form_fields_updated_at
before update on public.reg_form_fields
for each row execute function public.set_updated_at();

create table if not exists public.reg_form_webhooks (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.reg_forms (id) on delete cascade,
  name text not null,
  url text not null,
  method text not null default 'POST'
    check (method in ('POST', 'PUT', 'PATCH')),
  enabled boolean not null default true,
  headers jsonb not null default '{}'::jsonb,
  payload_template jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists reg_form_webhooks_form_id_idx
  on public.reg_form_webhooks (form_id, enabled, sort_order);

drop trigger if exists set_reg_form_webhooks_updated_at on public.reg_form_webhooks;
create trigger set_reg_form_webhooks_updated_at
before update on public.reg_form_webhooks
for each row execute function public.set_updated_at();

create table if not exists public.reg_form_emails (
  id uuid primary key default gen_random_uuid(),
  form_id uuid not null references public.reg_forms (id) on delete cascade,
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

create index if not exists reg_form_emails_form_id_idx
  on public.reg_form_emails (form_id, enabled, sort_order);

drop trigger if exists set_reg_form_emails_updated_at on public.reg_form_emails;
create trigger set_reg_form_emails_updated_at
before update on public.reg_form_emails
for each row execute function public.set_updated_at();

create table if not exists public.reg_form_page_connections (
  id uuid primary key default gen_random_uuid(),
  page_key text not null unique,
  form_id uuid not null references public.reg_forms (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists reg_form_page_connections_form_id_idx
  on public.reg_form_page_connections (form_id);

drop trigger if exists set_reg_form_page_connections_updated_at
  on public.reg_form_page_connections;
create trigger set_reg_form_page_connections_updated_at
before update on public.reg_form_page_connections
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Submissions + logs
-- ---------------------------------------------------------------------------

create table if not exists public.reg_form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_id uuid references public.reg_forms (id) on delete set null,
  form_slug text,
  form_name text,
  name text,
  email text,
  phone text,
  subject text,
  message text,
  payload jsonb,
  data jsonb not null default '{}'::jsonb,
  source_url text,
  user_agent text,
  ip_address text,
  webhook_status text not null default 'not_configured'
    check (
      webhook_status in (
        'pending',
        'success',
        'partial_error',
        'error',
        'not_configured'
      )
    ),
  webhook_success_count integer not null default 0,
  webhook_error_count integer not null default 0,
  property_id uuid,
  lead_id uuid,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists reg_form_submissions_form_id_idx
  on public.reg_form_submissions (form_id);

create index if not exists reg_form_submissions_created_at_idx
  on public.reg_form_submissions (created_at desc);

create index if not exists reg_form_submissions_email_idx
  on public.reg_form_submissions (email);

create table if not exists public.reg_form_webhook_logs (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references public.reg_form_submissions (id) on delete cascade,
  webhook_id uuid references public.reg_form_webhooks (id) on delete set null,
  webhook_name text,
  status text not null check (status in ('success', 'error')),
  request_url text,
  request_method text,
  request_headers jsonb,
  request_payload jsonb,
  response_status integer,
  response_body text,
  error_message text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists reg_form_webhook_logs_submission_id_idx
  on public.reg_form_webhook_logs (submission_id);

create index if not exists reg_form_webhook_logs_created_at_idx
  on public.reg_form_webhook_logs (created_at desc);

create table if not exists public.reg_form_email_logs (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.reg_form_submissions (id) on delete cascade,
  form_email_id uuid references public.reg_form_emails (id) on delete set null,
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

create index if not exists reg_form_email_logs_submission_id_idx
  on public.reg_form_email_logs (submission_id);

create index if not exists reg_form_email_logs_created_at_idx
  on public.reg_form_email_logs (created_at desc);

-- ---------------------------------------------------------------------------
-- Admin overview view
-- ---------------------------------------------------------------------------

create or replace view public.reg_admin_submission_overview
with (security_invoker = true)
as
select
  fs.id,
  fs.form_id,
  fs.form_slug,
  f.name as form_name,
  f.title as form_title,
  fs.data,
  fs.source_url,
  fs.webhook_status,
  fs.webhook_success_count,
  fs.webhook_error_count,
  coalesce(count(fel.id) filter (where fel.status = 'success'), 0)::int as email_success_count,
  coalesce(count(fel.id) filter (where fel.status = 'error'), 0)::int as email_error_count,
  coalesce(count(fel.id), 0)::int as email_total_count,
  fs.created_at
from public.reg_form_submissions fs
left join public.reg_forms f on f.id = fs.form_id
left join public.reg_form_email_logs fel on fel.submission_id = fs.id
group by
  fs.id,
  fs.form_id,
  fs.form_slug,
  f.name,
  f.title,
  fs.data,
  fs.source_url,
  fs.webhook_status,
  fs.webhook_success_count,
  fs.webhook_error_count,
  fs.created_at;

-- ---------------------------------------------------------------------------
-- RLS
-- Admin app uses the service role (bypasses RLS).
-- Public policies only allow reading published form metadata when needed.
-- ---------------------------------------------------------------------------

alter table public.reg_site_settings enable row level security;
alter table public.reg_forms enable row level security;
alter table public.reg_form_fields enable row level security;
alter table public.reg_form_webhooks enable row level security;
alter table public.reg_form_emails enable row level security;
alter table public.reg_form_page_connections enable row level security;
alter table public.reg_form_submissions enable row level security;
alter table public.reg_form_webhook_logs enable row level security;
alter table public.reg_form_email_logs enable row level security;

drop policy if exists "Public can read published REG forms"
  on public.reg_forms;
create policy "Public can read published REG forms"
  on public.reg_forms
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Public can read fields of published REG forms"
  on public.reg_form_fields;
create policy "Public can read fields of published REG forms"
  on public.reg_form_fields
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.reg_forms
      where reg_forms.id = reg_form_fields.form_id
        and reg_forms.status = 'published'
    )
  );

drop policy if exists "Public can read REG form page connections for published forms"
  on public.reg_form_page_connections;
create policy "Public can read REG form page connections for published forms"
  on public.reg_form_page_connections
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.reg_forms
      where reg_forms.id = reg_form_page_connections.form_id
        and reg_forms.status = 'published'
    )
  );

-- No public policies for settings, submissions, webhooks, emails, or logs.
-- Access is via service role from the Next.js admin/API layer.
