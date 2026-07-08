create or replace view public.admin_submission_overview as
select
  fs.id,
  fs.form_id,
  fs.form_slug,
  f.name as form_name,
  f.title as form_title,
  fs.data,
  fs.source_url,
  fs.webhook_status,
  fs.webhook_success_count,
  fs.webhook_error_count,
  coalesce(count(fel.id) filter (where fel.status = 'success'), 0)::int as email_success_count,
  coalesce(count(fel.id) filter (where fel.status = 'error'), 0)::int as email_error_count,
  coalesce(count(fel.id), 0)::int as email_total_count,
  fs.created_at
from public.form_submissions fs
left join public.forms f on f.id = fs.form_id
left join public.form_email_logs fel on fel.submission_id = fs.id
group by
  fs.id,
  fs.form_id,
  fs.form_slug,
  f.name,
  f.title,
  fs.data,
  fs.source_url,
  fs.webhook_status,
  fs.webhook_success_count,
  fs.webhook_error_count,
  fs.created_at;
