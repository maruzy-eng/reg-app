create table if not exists public.property_complement_blocks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  eyebrow text,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.property_complement_block_properties (
  block_id uuid not null references public.property_complement_blocks(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (block_id, property_id)
);

create index if not exists property_complement_blocks_active_order_idx
  on public.property_complement_blocks (is_active, sort_order, title);

create index if not exists property_complement_block_properties_property_idx
  on public.property_complement_block_properties (property_id);

insert into public.property_complement_blocks (
  slug,
  title,
  eyebrow,
  description,
  sort_order,
  is_active
)
values (
  'appliances',
  'Included Appliances',
  'Appliances',
  'Review the appliances and equipment included in this property.',
  1,
  true
)
on conflict (slug) do nothing;

insert into public.property_complement_block_properties (block_id, property_id)
select block.id, image.property_id
from public.property_complement_blocks block
join (
  select distinct property_id
  from public.property_images
  where media_group = 'appliances'
) image on true
where block.slug = 'appliances'
on conflict (block_id, property_id) do nothing;
