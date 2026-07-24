-- Checkmate REG — products

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

create table if not exists public.reg_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  price numeric(12, 2) not null default 0,
  discount_price numeric(12, 2),
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint reg_products_discount_lte_price
    check (
      discount_price is null
      or discount_price <= price
    )
);

create index if not exists reg_products_status_sort_idx
  on public.reg_products (status, sort_order asc, created_at desc);

create index if not exists reg_products_slug_idx
  on public.reg_products (slug);

drop trigger if exists set_reg_products_updated_at on public.reg_products;
create trigger set_reg_products_updated_at
before update on public.reg_products
for each row execute function public.set_updated_at();

alter table public.reg_products enable row level security;

drop policy if exists "Public can read published reg products" on public.reg_products;
create policy "Public can read published reg products"
  on public.reg_products
  for select
  to anon, authenticated
  using (status = 'published');
