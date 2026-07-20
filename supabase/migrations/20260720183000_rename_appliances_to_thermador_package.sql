update public.property_complement_blocks
set
  title = 'Included Appliances',
  eyebrow = 'Thermador',
  description = 'Review the Thermador appliances and equipment included in this property.',
  updated_at = now()
where slug = 'appliances';
