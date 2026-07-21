alter table public.properties
  add column if not exists cond_bedrooms numeric,
  add column if not exists cond_bathrooms numeric;
