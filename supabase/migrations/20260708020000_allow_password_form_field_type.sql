alter table if exists public.form_fields
  drop constraint if exists form_fields_type_check;

alter table if exists public.form_fields
  add constraint form_fields_type_check
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
  );
