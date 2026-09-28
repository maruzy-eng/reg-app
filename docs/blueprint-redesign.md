# Checkmate Blueprint

Redesign da rota existente `/blueprint`. A rota `/blueprint-pay`, os links Stripe e as paginas de agradecimento nao foram alterados.

## Arquivos

Criados:

- `src/lib/blueprint/experience.ts`: copy, pilares, jornada, FAQ, selecao de cases, referencias de assets e metricas.
- `src/components/blueprint/experience/ui.tsx`: section, heading e CTA.
- `src/components/blueprint/experience/header.tsx`: header, navegacao mobile e CTA fixo.
- `src/components/blueprint/experience/story.tsx`: hero, problema, diferencial, profissional da construcao, jornadas e operacao.
- `src/components/blueprint/experience/ecosystem.tsx`: numeros, rede, financiamento, publico e entregaveis.
- `src/components/blueprint/experience/proof.tsx`: cases com modal, count-up, galeria manual e depoimentos com video sob demanda.
- `src/components/blueprint/experience/conversion.tsx`: formulario, oferta, FAQ, CTA final e footer.
- `src/components/blueprint/experience/motion.tsx`: reveal, parallax e progresso de scroll.
- `src/components/blueprint/experience/blueprint.css`: estilos isolados, breakpoints e reduced motion.
- Este documento.

Modificados:

- `src/app/blueprint/page.tsx`: metadata, FAQ JSON-LD e carregamento das redes sociais configuradas.
- `src/components/blueprint/blueprint-page.tsx`: composicao da nova experiencia.
- `src/components/home/home-header.tsx`: reset do menu por chave da rota, eliminando o erro de lint de setState em effect.

Nenhuma dependencia adicionada. Radix Dialog, Lucide e next/image ja faziam parte do projeto. Motion usa IntersectionObserver, requestAnimationFrame e CSS, sem bibliotecas adicionais. Prettier foi executado pontualmente, sem alterar package.json ou lockfile.

## Onde editar

### Textos

Em `src/lib/blueprint/experience.ts`, editar `blueprintExperience`: `hero`, `sections`, `pillars`, `steps`, `audiences`, `deliverables`, `faq`, `final` e demais blocos de copy. Rotulos locais de interface e microcopy do formulario ficam nos respectivos componentes.

### Projetos

Os cases usam os registros publicos retornados por `getPublicProperties()` e editados no admin de propriedades. `selectBlueprintCases()` seleciona os dois primeiros classificados como `new_construction` e o primeiro `flip`, preservando a ordem do cadastro.

Nunca converter `price` (preco de anuncio), ARV projetado ou estimativa de reforma em custo de aquisicao ou lucro. Os campos `acquisition`, `planning`, `construction` e `result` no tipo `BlueprintCase` estao explicitamente nulos enquanto nao houver dados confirmados. O modal informa que esses detalhes nao foram publicados e oferece acesso a propriedade original.

### Depoimentos

`blueprintExperience.testimonials` reutiliza os dois videos reais de `src/lib/blueprint/content.ts` e suas capas locais. Para editar os videos sem afetar outras paginas, definir os registros diretamente em `experience.ts`. Nao ha autoplay de carrossel. O iframe so e montado quando o modal abre e e desmontado ao fechar.

Nomes, cidades e profissoes nao foram inventados. Preencher esses dados somente depois de verificar a identidade e a autorizacao dos participantes.

### Numeros

Por padrao, a pagina calcula quantidades de projetos publicos, New Construction e estados a partir do cadastro. Esses numeros nao sao totais historicos da empresa.

`verifiedBlueprintMetrics` permite substituir esses indicadores por metricas comerciais com fonte confirmada. Os antigos totais de marketing sem data de referencia nao foram reutilizados.

## Integracoes preservadas

- `getPublishedFormByPageKey("blueprint")`, formulario publicado e campos originais.
- `DynamicFormComponent`, POST `/api/forms/{slug}/submit`, `source_url`, mascara US, mensagens de erro e redirecionamento configurado no formulario.
- Persistencia de leads, templates de email e webhooks existentes no servidor, sem alterar destinatarios ou endpoints.
- `SitePixels` no layout global, suporte a Google Tag e Meta Pixel, loader RD Station e paginas de conversao existentes.
- Links de propriedades e politicas reais; redes sociais vindas das configuracoes do site.

O campo `blueprint_moment` e acrescentado ao formulario quando nao existe um campo equivalente. E enviado junto aos demais dados e preservado pelo backend atual. Para administra-lo diretamente e exigir validacao dele no servidor, cadastrar o mesmo nome no formulario publicado no admin. Templates customizados de CRM/email que selecionem campos explicitamente devem incluir `{{blueprint_moment}}` conforme a sintaxe usada pela integracao; nao houve modificacao silenciosa desses templates.

## Assets pendentes e fontes

Todas as imagens exibidas sao assets existentes da Checkmate: logo local, projetos cadastrados, fotos de encontros/visitas e capas reais dos depoimentos.

`blueprintAssetNotes` registra materiais opcionais ainda nao encontrados ou confirmados: foto dedicada de profissional trabalhando, screenshot aprovado do dashboard, video institucional e identificacao completa dos depoentes. A pagina usa uma visita de campo real no lugar de uma foto generica, e nao apresenta dashboard, identidade, video ou dado financeiro ficticio.

## Verificacao

- Build completo de producao: aprovado, incluindo `/blueprint`. Permanece o aviso global do Next sobre a convencao `middleware`.
- TypeScript: aprovado.
- Lint global: zero erros, 27 avisos preexistentes. Os arquivos da nova experiencia nao geram avisos.

- Navegador: larguras 375, 390, 430, 768, 1024, 1440 e 1920 px, sem overflow horizontal ou texto extravasando nos controles verificados.
- Cases: abertura, Escape, focus trap/restauracao de foco pelo Radix e link para propriedade.
- Galeria: navegacao manual e trilho horizontal com scroll-snap.
- Depoimentos: troca manual, modal e iframe sob demanda.
- Formulario: obrigatorios, mascara US, campo de momento e ocultacao do CTA fixo na secao.
- API: payload vazio rejeitado com erros de validacao, sem gerar lead ou email.
- FAQ: accordion nativo, teclado e schema com as mesmas perguntas/respostas.
- Todas as ancoras internas resolvem para secoes existentes.
- Meta Pixel e RD Station observados no navegador; suporte a Google Tag mantido, dependente da configuracao do site.
- Motion: progresso de scroll observado; CSS e JavaScript respeitam prefers-reduced-motion.

Nao foi feito envio real de lead nem teste de entrega de email/CRM nesta revisao, para nao acionar contatos externos. Nao foi atribuida nota Lighthouse sem medicao.
