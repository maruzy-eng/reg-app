-- Checkmate REG — news / blog posts

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

create table if not exists public.reg_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content_html text not null default '',
  cover_image_url text,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  author_name text not null default 'Checkmate REG',
  category text,
  tags jsonb not null default '[]'::jsonb,
  meta_title text,
  meta_description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists reg_posts_status_published_at_idx
  on public.reg_posts (status, published_at desc);

create index if not exists reg_posts_slug_idx
  on public.reg_posts (slug);

drop trigger if exists set_reg_posts_updated_at on public.reg_posts;
create trigger set_reg_posts_updated_at
before update on public.reg_posts
for each row execute function public.set_updated_at();

alter table public.reg_posts enable row level security;

drop policy if exists "Public can read published reg posts" on public.reg_posts;
create policy "Public can read published reg posts"
  on public.reg_posts
  for select
  to anon, authenticated
  using (
    status = 'published'
    and published_at is not null
    and published_at <= timezone('utc', now())
  );

insert into public.reg_posts (
  title,
  slug,
  excerpt,
  content_html,
  cover_image_url,
  status,
  published_at,
  author_name,
  category,
  tags,
  meta_title,
  meta_description,
  sort_order
)
values
(
  'Como estruturar um Flip House nos EUA com método',
  'como-estruturar-flip-house-eua',
  'Um overview prático sobre compra, reforma, financiamento e execução de Flip Houses no mercado americano.',
  '<p>Operar Flip Houses nos Estados Unidos exige mais do que encontrar um bom imóvel. É preciso estrutura societária, análise de números, acesso a crédito e um plano claro de execução.</p><p>No modelo Checkmate, a operação começa com a leitura correta do ativo: localização, potencial de valorização, custo de reforma e estratégia de saída. Em seguida, vem a montagem financeira — incluindo financiamento de aquisição e construção — e o acompanhamento da obra com disciplina de prazo e orçamento.</p><h2>O que muda com método</h2><p>Quando há método, o investidor deixa de depender de improviso. Cada etapa — due diligence, underwriting, reforma e venda ou locação — passa a ter critérios objetivos e suporte operacional.</p><p>Se você quer entender se esse caminho faz sentido para o seu momento, o Checkmate Blueprint foi criado exatamente para conectar educação, estrutura e operação real.</p>',
  'https://ylgweoncigybdpoqhwyk.supabase.co/storage/v1/object/public/posts/000-3-weston2.avif',
  'published',
  timezone('utc', now()) - interval '3 days',
  'Checkmate REG',
  'Educação',
  '["flip house","investimento","eua"]'::jsonb,
  'Como estruturar um Flip House nos EUA com método | Checkmate News',
  'Entenda os pilares de uma operação de Flip House nos EUA: análise, financiamento, reforma e execução com método.',
  1
),
(
  'New Construction: por que estrutura importa antes da obra',
  'new-construction-estrutura-antes-da-obra',
  'Antes de construir, é preciso organizar empresa, capital, crédito e governança do projeto.',
  '<p>New Construction é uma das estratégias mais potentes do mercado imobiliário americano — e também uma das que mais exige preparação.</p><p>Sem estrutura, o projeto vira uma sequência de decisões reativas. Com estrutura, cada fase ganha previsibilidade: aquisição do terreno ou imóvel base, aprovação, financiamento da construção, gestão de obra e estratégia de saída.</p><h2>O papel da governança</h2><p>Empresa corretamente aberta, contratos claros, acompanhamento de custos e uma equipe que fala a mesma língua reduzem risco e aumentam a chance de resultado consistente.</p><p>No ecossistema Checkmate, educação e operação caminham juntas para que o empreendedor avance com mais clareza e menos improvisação.</p>',
  'https://checkmaterealestategroup.com/wp-content/uploads/2026/06/ChatGPT-Image-26-de-jun.-de-2026-10_51_45-1.png',
  'published',
  timezone('utc', now()) - interval '1 day',
  'Checkmate REG',
  'Mercado',
  '["new construction","construção","estratégia"]'::jsonb,
  'New Construction: por que estrutura importa antes da obra | Checkmate News',
  'Veja por que estrutura societária, crédito e governança são essenciais antes de iniciar um projeto de New Construction.',
  2
),
(
  'Checkmate Blueprint: educação e operação no mesmo ecossistema',
  'checkmate-blueprint-educacao-e-operacao',
  'Como o Blueprint conecta aprendizado, suporte e oportunidades reais no mercado imobiliário americano.',
  '<p>O Checkmate Blueprint não é apenas um conteúdo teórico. Ele foi pensado para aproximar educação e operação dentro de um mesmo ecossistema.</p><p>Participantes aprendem a estruturar Flip Houses e New Construction, entendem financiamento na prática e entram em contato com a forma como a Checkmate analisa, executa e acompanha projetos reais.</p><h2>Para quem faz sentido</h2><p>O Blueprint é indicado para quem deseja começar com método ou acelerar uma jornada já iniciada no mercado imobiliário americano — com direção, suporte e visão profissional.</p><p><a href="/blueprint">Conheça o Checkmate Blueprint</a> e veja se esse é o próximo passo certo para você.</p>',
  'https://checkmaterealestategroup.com/wp-content/uploads/2026/06/1.jpg',
  'published',
  timezone('utc', now()),
  'Checkmate REG',
  'Blueprint',
  '["blueprint","educação","checkmate"]'::jsonb,
  'Checkmate Blueprint: educação e operação no mesmo ecossistema | Checkmate News',
  'Descubra como o Checkmate Blueprint une educação, suporte e operação real no mercado imobiliário dos EUA.',
  3
)
on conflict (slug) do nothing;
