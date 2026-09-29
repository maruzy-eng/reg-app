import {
  BLUEPRINT_ASSETS,
  blueprintGallery,
  blueprintTestimonials,
} from "./content";
import type { PropertyCard } from "@/types/property";

export const blueprintExperience = {
  cta: "Conversar com um analista",
  conversation: "Quero conversar com um analista",
  logo: "/images/cash-offer/logo-reg.webp",
  hero: {
    eyebrow: "Acompanhamento. Estratégia. Real estate USA.",
    brand: "Você já sabe trabalhar duro nos Estados Unidos.",
    product: "Amplie sua visão do negócio por trás da obra.",
    title: "Checkmate Blueprint",
    headline:
      "Programa premium de acompanhamento em New Construction, conectado a projetos reais e ao ecossistema Checkmate.",
    description:
      "New Construction · Investimentos · Flip Houses · Financiamento · Networking",
    image: BLUEPRINT_ASSETS.heroImage,
    imageAlt:
      "Projeto residencial Checkmate em 3 Weston St, Lexington, Massachusetts",
    pillars: [
      "New Construction",
      "Capital e financiamento",
      "Networking",
    ],
  },
  sections: {
    problem: {
      eyebrow: "01 / Uma nova perspectiva",
      title: "Você não precisa de mais informação.",
      accent: "Precisa saber o que fazer com ela.",
      description: "",
    },
    differential: {
      eyebrow: "O que é o Blueprint",
      title: "Acompanhamento para decidir.",
      accent: "Proximidade para executar.",
    },
    professional: {
      eyebrow: "03 / O outro lado da mesa",
      title: "Talvez você já saiba construir.",
      accent: "Amplie sua visão da operação.",
      description:
        "Executar uma obra e estruturar uma operação imobiliária exigem olhares diferentes. Aquisição, capital, prazos e estratégia de saída também precisam fazer parte da decisão.",
    },
    journey: {
      eyebrow: "Como funciona o acompanhamento",
      title: "Seu cenário na mesa.",
      accent: "Decisões em discussão.",
      description:
        "O acompanhamento conecta seu momento às oportunidades que você está analisando e às decisões que precisa tomar. Com proximidade de quem participa da operação.",
    },
    operations: {
      eyebrow: "05 / A operação por dentro",
      title: "Da aquisição à execução.",
      description:
        "New Construction no centro da operação. Terreno, viabilidade, capital e gestão da obra conectados à estratégia de saída.",
    },
    projects: {
      eyebrow: "06 / Projetos reais",
      title: "A operação, em perspectiva.",
      accent: "",
      description:
        "New Construction e transformação de imóveis. Projetos do portfólio público da Checkmate.",
    },
    network: {
      eyebrow: "Acesso ao ecossistema Checkmate",
      title: "Proximidade com quem",
      accent: "faz a operação acontecer.",
      description:
        "Acesse um ambiente de troca com profissionais, investidores e parceiros que fazem parte do mercado americano.",
    },
    financing: {
      eyebrow: "Capital e financiamento",
      title: "Analise o capital antes de comprometer o projeto.",
      description:
        "Discuta capital próprio, crédito e planejamento financeiro no contexto da operação. A proximidade com o ecossistema Checkmate inclui instituições e lenders que atuam nesse mercado.",
    },
    audience: {
      eyebrow: "09 / Seu ponto de partida",
      title: "Onde você está hoje?",
      description:
        "Você pode estar em fases diferentes. O objetivo é ajudar você a construir o próximo nível.",
    },
    deliverables: {
      eyebrow: "Muito além do conteúdo",
      title: "Uma visão completa.",
      accent: "Pessoas ao seu lado.",
      description:
        "New Construction é um pilar central. Ao redor dele, conhecimento, análise, acompanhamento e conexões para entender a operação como um todo.",
    },
    experiences: {
      eyebrow: "10 / Experiências",
      title: "Existem coisas que você precisa ver acontecendo.",
      description: "",
    },
    testimonials: {
      eyebrow: "11 / Quem já vive essa experiência",
      title: "A perspectiva de quem está perto.",
      description:
        "Experiências reais de parceiros Checkmate, contadas por eles mesmos.",
    },
    offer: {
      eyebrow: "Qualificação para o Blueprint",
      title: "Seu próximo capítulo",
      accent: "começa com uma conversa.",
      description:
        "Converse com um analista da Checkmate e entenda se o Blueprint faz sentido para o seu momento.",
    },
    faq: {
      eyebrow: "Antes de dar o próximo passo",
      title: "Boas perguntas. Respostas claras.",
    },
  },
  differentialIntro:
    "Um programa premium de acompanhamento em real estate nos EUA. Analise oportunidades, discuta decisões e aproxime-se de quem já executa.",
  differentialClosing:
    "Você não entra apenas para consumir conteúdo. Você entra para se aproximar de uma operação real.",
  professionalClosing:
    "A proposta é conectar sua experiência às decisões do negócio, com acompanhamento e referências de projetos reais.",
  careerIntro: "Seu conhecimento pode abrir um novo caminho",
  careerDescription:
    "Seu ponto de partida pode ser a experiência na obra, a empresa que você construiu ou o capital que pretende direcionar. O acompanhamento considera esse contexto.",
  financingSteps: [
    [
      "01",
      "Aquisição",
      "Analise o capital necessário para a aquisição e os custos que precisam entrar na conta.",
    ],
    [
      "02",
      "Construção",
      "Discuta estruturas de financiamento, liberações e sua relação com as etapas da obra.",
    ],
    [
      "03",
      "Estratégia de saída",
      "Considere prazos, custos e alternativas antes de comprometer seu capital.",
    ],
  ],
  financingDisclaimer:
    "Financiamentos estão sujeitos à análise, aprovação, experiência do investidor, características do projeto, critérios da instituição financeira e demais condições aplicáveis. A participação no Blueprint não garante crédito ou retorno financeiro.",
  offerItems: [
    "Sua experiência e seu momento no mercado",
    "Projetos e oportunidades que você está analisando",
    "Objetivos e dúvidas sobre o acompanhamento",
  ],
  momentOptions: [
    "Trabalho na construção",
    "Tenho empresa",
    "Já invisto em real estate",
    "Quero começar",
  ],
  final: {
    eyebrow: "Seu próximo passo, acompanhado",
    title: "Aproxime-se da operação. Discuta seu próximo passo.",
    subtitle:
      "Projetos reais. Decisões com contexto.",
    description:
      "Leve seu cenário a um analista da Checkmate e avalie a proposta de acompanhamento antes de decidir participar.",
    microcopy: "Conheça o formato, o escopo e as condições do programa.",
  },
  navigation: [
    ["Projetos", "projetos"],
    ["Blueprint", "diferencial"],
    ["Como funciona", "como-funciona"],
    ["Operação", "operacao"],
    ["Ecossistema", "networking"],
    ["Depoimentos", "depoimentos"],
    ["FAQ", "faq"],
  ],
  questions: [
    "Qual imóvel comprar?",
    "Quanto pagar?",
    "Como financiar?",
    "Quanto custa construir?",
    "Onde está o risco?",
    "Qual é a saída?",
  ],
  pillars: [
    {
      title: "Acompanhamento",
      text: "Leve seu cenário, suas dúvidas e seus projetos para discutir com quem vive a operação.",
      detail: "Proximidade para avaliar o próximo passo.",
    },
    {
      title: "Análise de oportunidades",
      text: "Avalie premissas, custos, riscos e alternativas antes de avançar em uma oportunidade.",
      detail: "Critérios para sustentar suas decisões.",
    },
    {
      title: "Operação real",
      text: "Acompanhe a lógica de projetos de New Construction, da aquisição à execução e à estratégia de saída.",
      detail: "Projetos reais como referência de análise.",
    },
    {
      title: "Ecossistema Checkmate",
      text: "Acesse um ambiente de troca com profissionais, investidores e parceiros envolvidos no mercado americano.",
      detail: "Networking próximo de quem executa.",
    },
  ],
  trades: [
    "Aquisição",
    "Financiamento",
    "Projeto",
    "Construção",
    "Gestão",
    "Venda",
    "Resultado",
  ],
  projectJourney: [
    "Aquisição",
    "Financiamento",
    "Projeto",
    "Construção",
    "Gestão",
    "Venda",
    "Resultado",
  ],
  careerJourney: ["Worker", "Contractor", "Business owner", "Investor"],
  steps: [
    {
      title: "Situar seu momento",
      text: "Discuta sua experiência, seus objetivos e as decisões à frente. Seu contexto orienta a conversa.",
      tags: ["Experiência", "Objetivos", "Capital", "Mercado"],
    },
    {
      title: "Analisar a oportunidade",
      text: "Examine aquisição, viabilidade, custos e financiamento. Coloque premissas e riscos em discussão antes de avançar.",
      tags: [
        "Empresa",
        "Aquisição",
        "Análise",
        "Financiamento",
        "Construção",
        "Gestão",
      ],
    },
    {
      title: "Discutir decisões",
      text: "Leve dúvidas e cenários ao acompanhamento. Compare alternativas com referências de quem já estrutura e executa projetos.",
      tags: ["Viabilidade", "Risco", "Estratégia de saída"],
    },
    {
      title: "Aplicar ao próximo passo",
      text: "Conecte a análise ao planejamento e à execução. Reavalie seu cenário à medida que surgem novas decisões.",
      tags: ["Planejamento", "Projetos", "Próximos passos"],
    },
  ],
  operations: [
    "Acquisition",
    "Analysis",
    "Financing",
    "Construction",
    "Project management",
    "Exit",
  ],
  network: [
    "Banks",
    "Lenders",
    "Investors",
    "Contractors",
    "Partners",
    "CPA",
    "Attorneys",
    "Realtors",
  ],
  audiences: [
    {
      title: "Profissional da construção",
      text: "Conecte sua experiência de execução à análise de aquisição, capital e viabilidade do projeto.",
    },
    {
      title: "Empresário",
      text: "Avalie como sua experiência empresarial e seus recursos se relacionam com uma operação imobiliária.",
    },
    {
      title: "Investidor",
      text: "Discuta oportunidades, riscos e estruturas de capital antes de decidir como participar do mercado.",
    },
  ],
  deliverables: [
    "Acompanhamento",
    "Estratégia de projetos",
    "New Construction",
    "Flip Houses",
    "Investimentos",
    "Financiamento",
    "Análise de oportunidades",
    "Networking",
    "Comunidade",
    "Experiências",
  ],
  gallery: blueprintGallery.map((src, index) => ({
    src,
    alt: `Encontro do ecossistema Checkmate, registro ${index + 1}`,
    caption: [
      "Field Class",
      "New Construction",
      "Networking",
      "Event",
      "Project Visit",
      "Blueprint Experience",
    ][index],
  })),
  testimonials: blueprintTestimonials.map((item) => ({
    ...item,
    cover: `/images/blueprint/depoimento-${item.number}.jpg`,
  })),
  faq: [
    [
      "O Blueprint é um curso?",
      "O conteúdo é uma parte do programa. A proposta do Blueprint reúne acompanhamento, estratégia, experiências e proximidade com o ecossistema Checkmate. Converse com o time para conhecer o escopo e o formato da participação.",
    ],
    [
      "Preciso ter experiência com real estate?",
      "Você pode estar começando ou já conhecer o mercado. A conversa inicial ajuda a entender sua experiência e avaliar se a proposta faz sentido para seu momento.",
    ],
    [
      "Preciso trabalhar com construção?",
      "Não. A proposta também é voltada a empresários e investidores brasileiros interessados em entender operações imobiliárias nos Estados Unidos.",
    ],
    [
      "Preciso ter muito capital para começar?",
      "Não existe um valor único que se aplique a todas as estratégias. Capital, crédito, experiência e características do projeto precisam ser avaliados. O time pode explicar o programa e discutir seu cenário, sem garantir a viabilidade de um investimento.",
    ],
    [
      "O Blueprint ensina New Construction?",
      "Sim. New Construction é um dos principais pilares: aquisição, análise, financiamento, planejamento, construção, gestão e estratégia de saída.",
    ],
    [
      "O Blueprint aborda Flip Houses?",
      "Sim. Compra, reforma e análise de oportunidades em Flip Houses também fazem parte dos temas abordados.",
    ],
    [
      "Existe acompanhamento?",
      "Acompanhamento e proximidade com a operação são centrais na proposta. Consulte o time sobre os encontros, canais de suporte e condições incluídas na modalidade disponível.",
    ],
    [
      "O Blueprint oferece financiamento?",
      "O programa ajuda a entender estruturas de capital e aproxima você do ecossistema de instituições e lenders. O financiamento é contratado com a instituição responsável, conforme suas condições.",
    ],
    [
      "A Checkmate garante aprovação de financiamento?",
      "Não. Financiamentos estão sujeitos à análise e aprovação da instituição financeira, experiência do investidor, características do projeto e demais condições aplicáveis.",
    ],
    [
      "Como funciona o networking?",
      "Por meio da aproximação com profissionais e participantes do ecossistema Checkmate. O formato dos encontros e experiências deve ser confirmado com o time; a participação não garante parcerias ou negócios.",
    ],
    [
      "Posso participar morando em qualquer estado dos EUA?",
      "Converse com o time sobre seu estado e disponibilidade. Formatos de acompanhamento e atividades presenciais podem variar conforme a localização e a programação.",
    ],
    [
      "Como faço para entrar?",
      "Preencha o formulário nesta página. Nosso time vai conversar com você, explicar o programa e apresentar as condições para participar.",
    ],
  ],
} as const;

export type BlueprintCase = {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string | null;
  status: string;
  href?: string;
  context: string;
  acquisition: string | null;
  planning: string | null;
  construction: string | null;
  result: string | null;
};

// Live records remain the source of truth. Missing case details are never inferred from asking prices.
export function selectBlueprintCases(
  properties: PropertyCard[],
): BlueprintCase[] {
  const construction = properties
    .filter((item) => item.propertyType === "new_construction")
    .slice(0, 2);
  const flip = properties.find((item) => item.propertyType === "flip");
  const selected = [...construction, ...(flip ? [flip] : [])];
  const status: Record<string, string> = {
    available: "Disponível",
    in_progress: "Em desenvolvimento",
    sold: "Vendido",
    rented: "Alugado",
    under_contract: "Sob contrato",
  };
  return selected.map((item) => ({
    id: item.id,
    title: item.title,
    location: `${item.city}, ${item.state}`,
    category:
      item.propertyType === "new_construction"
        ? "New Construction"
        : "Flip House",
    image: item.imageUrl,
    status: status[item.status] || item.status,
    href: `/properties/${item.slug}`,
    context: item.description || "Projeto do portfólio público da Checkmate.",
    acquisition: null,
    planning: null,
    construction: null,
    result: null,
  }));
}

// Populate only after confirming dates and sources. Historic marketing totals are intentionally not reused.
export const verifiedBlueprintMetrics: {
  value: number;
  suffix: string;
  label: string;
  source: string;
}[] = [];
export const blueprintAssetNotes = {
  constructionProfessional: null, // Add an approved photograph of a professional on site.
  dashboard: null, // Add a real, sanitized platform screenshot. Never render a fictitious dashboard.
  institutionalVideo: null, // Existing real testimonial videos are used until an institutional video is approved.
  testimonialIdentity: null, // Names, cities and professions must be verified before publication.
};
