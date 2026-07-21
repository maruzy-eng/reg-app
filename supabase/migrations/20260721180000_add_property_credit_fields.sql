alter table public.properties
  add column if not exists credit_active boolean not null default false,
  add column if not exists credit_old_price numeric,
  add column if not exists credit_new_price numeric;
