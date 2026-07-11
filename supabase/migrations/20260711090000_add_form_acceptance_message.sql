alter table if exists public.forms
  add column if not exists acceptance_message text;

notify pgrst, 'reload schema';
