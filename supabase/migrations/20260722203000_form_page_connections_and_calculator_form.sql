-- Page-to-form connections for public landing pages
create table if not exists public.form_page_connections (
  id uuid primary key default gen_random_uuid(),
  page_key text not null unique,
  form_id uuid not null references public.forms (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists form_page_connections_form_id_idx
  on public.form_page_connections (form_id);

alter table public.form_page_connections enable row level security;

drop policy if exists "Public can read form page connections for published forms"
  on public.form_page_connections;

create policy "Public can read form page connections for published forms"
  on public.form_page_connections
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.forms
      where forms.id = form_page_connections.form_id
        and forms.status = 'published'
    )
  );

-- Unique calculator signup form
insert into public.forms (
  name,
  slug,
  title,
  description,
  status,
  submit_button_label,
  acceptance_message,
  thank_you_page_url
)
values (
  'Flip Calculator Signup',
  'calculator',
  'Register for the FREE Flip Calculator',
  'Create your free account to access the Checkmate Property Flip Calculator.',
  'published',
  'I want to try the FREE Calculator!',
  'By submitting this form, you agree to receive phone calls and SMS messages from Checkmate. Your consent is not a condition of purchasing any product or service.',
  null
)
on conflict (slug) do update
set
  name = excluded.name,
  title = excluded.title,
  description = excluded.description,
  status = excluded.status,
  submit_button_label = excluded.submit_button_label,
  acceptance_message = excluded.acceptance_message,
  updated_at = now();

delete from public.form_fields
where form_id = (select id from public.forms where slug = 'calculator');

insert into public.form_fields (
  form_id,
  label,
  name,
  type,
  placeholder,
  help_text,
  required,
  options,
  default_value,
  sort_order
)
select
  forms.id,
  fields.label,
  fields.name,
  fields.type,
  fields.placeholder,
  fields.help_text,
  fields.required,
  fields.options::jsonb,
  fields.default_value,
  fields.sort_order
from public.forms
cross join (
  values
    (
      'Your name',
      'name',
      'text',
      'Insert your name',
      null::text,
      true,
      '[]',
      null::text,
      1
    ),
    (
      'Your email',
      'email',
      'email',
      'Insert your email',
      null::text,
      true,
      '[]',
      null::text,
      2
    ),
    (
      'Your phone',
      'phone',
      'phone',
      '(555) 555-5555',
      'US phone format.',
      true,
      '{"mask":"(999) 999-9999"}',
      null::text,
      3
    ),
    (
      'Password',
      'password',
      'password',
      'Insert your password',
      null::text,
      true,
      '[]',
      null::text,
      4
    )
) as fields (
  label,
  name,
  type,
  placeholder,
  help_text,
  required,
  options,
  default_value,
  sort_order
)
where forms.slug = 'calculator';

insert into public.form_page_connections (page_key, form_id)
select 'calculator', forms.id
from public.forms
where forms.slug = 'calculator'
on conflict (page_key) do update
set
  form_id = excluded.form_id,
  updated_at = now();
