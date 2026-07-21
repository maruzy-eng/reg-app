alter table public.properties
  add column if not exists cond_active boolean not null default false,
  add column if not exists cond_number_of_houses integer;
