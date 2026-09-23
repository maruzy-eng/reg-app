do $$
declare
  cash_offer_form_id uuid;
begin
  insert into public.reg_forms (
    name,
    slug,
    title,
    description,
    status,
    submit_button_label,
    acceptance_message,
    thank_you_page_url,
    updated_at
  )
  values (
    'Cash Offer',
    'cash-offer',
    'Answer A Few Simple Questions To Get An Instant Offer',
    'Lead form used on the public /cash-offer landing page.',
    'published',
    'Get My Instant Offer',
    null,
    '/cash-offer-thank-you',
    timezone('utc', now())
  )
  on conflict (slug) do update
  set
    name = excluded.name,
    title = excluded.title,
    description = excluded.description,
    status = excluded.status,
    submit_button_label = excluded.submit_button_label,
    acceptance_message = excluded.acceptance_message,
    thank_you_page_url = excluded.thank_you_page_url,
    updated_at = timezone('utc', now())
  returning id into cash_offer_form_id;

  delete from public.reg_form_fields
  where form_id = cash_offer_form_id;

  insert into public.reg_form_fields (
    form_id,
    label,
    name,
    type,
    placeholder,
    help_text,
    required,
    options,
    default_value,
    sort_order
  )
  values
    (
      cash_offer_form_id,
      'What Type Of Property Is It?',
      'property_type',
      'radio',
      null,
      null,
      true,
      '["Single family","Multi family","Apartment","Commercial","Land/Lot","Mobile Trailer/Home"]'::jsonb,
      null,
      10
    ),
    (
      cash_offer_form_id,
      'Is The Property Currently Occupied?',
      'occupancy',
      'radio',
      null,
      null,
      true,
      '["Owner Occupied","Tenant Occupied","Not Occupied"]'::jsonb,
      null,
      20
    ),
    (
      cash_offer_form_id,
      'What Is The Condition Of The Property?',
      'property_condition',
      'radio',
      null,
      null,
      true,
      '["Poor","Fair","Good","Excellent"]'::jsonb,
      null,
      30
    ),
    (
      cash_offer_form_id,
      'How Long Have You Owned The Property?',
      'ownership_length',
      'radio',
      null,
      null,
      true,
      '["0-5 Years","5-15 Years","15-30 Years","30+ Years","I Do Not Own The Property"]'::jsonb,
      null,
      40
    ),
    (
      cash_offer_form_id,
      'Is The Property Listed With A Realtor?',
      'listed_with_realtor',
      'radio',
      null,
      null,
      true,
      '["Yes","No"]'::jsonb,
      null,
      50
    ),
    (
      cash_offer_form_id,
      'How Soon Are You Looking To Sell?',
      'sell_timeline',
      'radio',
      null,
      null,
      true,
      '["ASAP","1-2 months","3-5 months","6+ months"]'::jsonb,
      null,
      60
    ),
    (
      cash_offer_form_id,
      'Do You Have An Asking Price In Mind?',
      'asking_price',
      'number',
      'Your price',
      null,
      false,
      '[]'::jsonb,
      null,
      70
    ),
    (
      cash_offer_form_id,
      'Why Are You Looking To Sell Your Property?',
      'selling_reason',
      'radio',
      null,
      null,
      true,
      '["Foreclosure","Inheritance","Divorce","Structural/Fire/Water damage","Tired landlord or Non-performing tenants","Emergency reasons","Looking for a quick sale","Financial difficulties","Sell without real estate agent","Distressed Property"]'::jsonb,
      null,
      80
    ),
    (
      cash_offer_form_id,
      'What Is The Address Of The Property?',
      'property_address',
      'text',
      'Address',
      null,
      false,
      '[]'::jsonb,
      null,
      90
    ),
    (
      cash_offer_form_id,
      'Name',
      'first_name',
      'text',
      'Name',
      null,
      true,
      '[]'::jsonb,
      null,
      100
    ),
    (
      cash_offer_form_id,
      'Last name',
      'last_name',
      'text',
      'Last name',
      null,
      true,
      '[]'::jsonb,
      null,
      110
    ),
    (
      cash_offer_form_id,
      'Email',
      'email',
      'email',
      'Email',
      null,
      true,
      '[]'::jsonb,
      null,
      120
    ),
    (
      cash_offer_form_id,
      'Phone Number',
      'phone',
      'phone',
      'Phone Number',
      null,
      true,
      '[]'::jsonb,
      null,
      130
    );

  insert into public.reg_form_page_connections (
    page_key,
    form_id,
    updated_at
  )
  values (
    'cash-offer',
    cash_offer_form_id,
    timezone('utc', now())
  )
  on conflict (page_key) do update
  set
    form_id = excluded.form_id,
    updated_at = timezone('utc', now());

  delete from public.reg_form_emails
  where form_id = cash_offer_form_id
    and name in ('Cash Offer', 'Cash Offer Lead Notification');

  insert into public.reg_form_emails (
    form_id,
    name,
    type,
    enabled,
    recipient_field,
    recipients,
    subject_template,
    body_html_template,
    from_name,
    reply_to_field,
    sort_order
  )
  values (
    cash_offer_form_id,
    'Cash Offer Lead Notification',
    'admin',
    true,
    null,
    '["diego.maruzy@gmail.com"]'::jsonb,
    'New Cash Offer Lead - {{first_name}} {{last_name}}',
    '<html>
  <body style="margin:0; padding:0; background:#f8f6f1; font-family:Arial, sans-serif; color:#171614;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8f6f1; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px; background:#ffffff; border:1px solid rgba(23,22,20,0.10); border-radius:8px; overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 18px; background:#050505; color:#ffffff;">
                <p style="margin:0 0 10px; color:#ebca84; font-size:12px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase;">Cash Offer Lead</p>
                <h1 style="margin:0; font-size:28px; line-height:1.15; font-weight:700;">New submission from {{form_name}}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <h2 style="margin:0 0 16px; font-size:18px; line-height:1.3;">Property Details</h2>
                <p><strong>What Type Of Property Is It?</strong><br>{{property_type}}</p>
                <p><strong>Is The Property Currently Occupied?</strong><br>{{occupancy}}</p>
                <p><strong>What Is The Condition Of The Property?</strong><br>{{property_condition}}</p>
                <p><strong>How Long Have You Owned The Property?</strong><br>{{ownership_length}}</p>
                <p><strong>Is The Property Listed With A Realtor?</strong><br>{{listed_with_realtor}}</p>
                <p><strong>How Soon Are You Looking To Sell?</strong><br>{{sell_timeline}}</p>
                <p><strong>Do You Have An Asking Price In Mind?</strong><br>{{asking_price}}</p>
                <p><strong>Why Are You Looking To Sell Your Property?</strong><br>{{selling_reason}}</p>
                <p><strong>What Is The Address Of The Property?</strong><br>{{property_address}}</p>

                <h2 style="margin:28px 0 16px; font-size:18px; line-height:1.3;">Contact Details</h2>
                <p><strong>Name</strong><br>{{first_name}}</p>
                <p><strong>Last name</strong><br>{{last_name}}</p>
                <p><strong>Email</strong><br>{{email}}</p>
                <p><strong>Phone Number</strong><br>{{phone}}</p>

                <h2 style="margin:28px 0 16px; font-size:18px; line-height:1.3;">Tracking</h2>
                <p><strong>Source URL</strong><br>{{source_url}}</p>
                <p><strong>Submission ID</strong><br>{{submission_id}}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>',
    'Checkmate Real Estate Group',
    'email',
    10
  );
end $$;
