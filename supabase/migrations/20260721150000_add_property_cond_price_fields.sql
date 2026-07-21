alter table public.properties
  add column if not exists cond_listed_price text,
  add column if not exists cond_avg_price text,
  add column if not exists cond_sqft integer;
