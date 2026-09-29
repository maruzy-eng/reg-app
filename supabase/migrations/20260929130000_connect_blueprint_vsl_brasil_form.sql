do $$
declare
  vsl_br_form_id uuid;
begin
  select id
  into vsl_br_form_id
  from public.reg_forms
  where slug = 'vsl-br'
  limit 1;

  if vsl_br_form_id is null then
    return;
  end if;

  update public.reg_forms
  set
    thank_you_page_url = '/obrigado-vsl-br',
    updated_at = timezone('utc', now())
  where id = vsl_br_form_id;

  insert into public.reg_form_page_connections (
    page_key,
    form_id,
    updated_at
  )
  values (
    'blueprint-vsl-brasil',
    vsl_br_form_id,
    timezone('utc', now())
  )
  on conflict (page_key) do update
  set
    form_id = excluded.form_id,
    updated_at = timezone('utc', now());
end $$;
