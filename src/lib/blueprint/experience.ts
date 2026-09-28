import {
  BLUEPRINT_ASSETS,
  blueprintGallery,
  blueprintTestimonials,
} from "./content";
import type { PropertyCard } from "@/types/property";

export const blueprintExperience = {
  cta: "Quero conhecer o Blueprint",
  conversation: "Quero conversar com a Checkmate",
  logo: "/images/cash-offer/logo-reg.webp",
  hero: {
    eyebrow: "Acompanhamento. Estratégia. Real estate USA.",
    brand: "Checkmate",
    product: "Blueprint.",
    title: "Checkmate Blueprint",
    headline: "Você não precisa construir o próximo nível sozinho.",
    description:
      "Acompanhamento, estratégia e conexões para estruturar projetos de New Construction nos EUA. Ao seu lado, uma equipe que vive essa operação todos os dias.",
    image: BLUEPRINT_ASSETS.heroImage,
    imageAlt:
      "Projeto residencial Checkmate em 3 Weston St, Lexington, Massachusetts",
    pillars: [
      "New Construction",
      "Investimentos",
      "Flip Houses",
      "Financiamento",
      "Networking",
    ],
  },
  sections: {
    problem: {
      eyebrow: "01 / Uma nova perspectiva",
      title: "Você não precisa de mais informação.",
      accent: "Precisa saber o que fazer com ela.",
      description:
        "Na internet existem milhares de vídeos sobre imóveis, financiamento e construção. O desafio começa quando chega a hora de colocar dinheiro em uma operação real.",
    },
    differential: {
      eyebrow: "02 / Não é apenas um curso",
      title: "Mais perto de quem",
      accent: "já está fazendo.",
    },
    professional: {
      eyebrow: "03 / O outro lado da mesa",
      title: "Talvez você já saiba construir.",
      accent: "Agora, enxergue o negócio.",
      description:
        "Muitos brasileiros desenvolvem uma enorme experiência trabalhando na construção nos Estados Unidos. Alguns constroem suas próprias empresas, mas continuam participando dos projetos como prestadores de serviço.",
    },
    journey: {
      eyebrow: "04 / Sua jornada",
      title: "Entrou para o Blueprint.",
      accent: "E agora?",
      description:
        "Uma visão mais clara de onde você está, das decisões à frente e das pessoas que podem caminhar com você.",
    },
    operations: {
      eyebrow: "05 / A operação por dentro",
      title: "Enxergue o projeto inteiro. Não apenas a sua etapa.",
      description:
        "Da aquisição à estratégia de saída, cada decisão se conecta à próxima. Acompanhe como uma empresa de real estate organiza esse processo.",
    },
    projects: {
      eyebrow: "06 / Projetos reais",
      title: "O mercado acontece",
      accent: "fora da sala de aula.",
      description:
        "Uma seleção do portfólio público da Checkmate. New Construction em primeiro plano, junto à experiência em transformação de imóveis.",
    },
    network: {
      eyebrow: "07 / Conexões que importam",
      title: "Real estate não é um jogo",
      accent: "para jogar sozinho.",
      description:
        "Uma operação depende de uma rede. O Blueprint aproxima você de profissionais, instituições e parceiros do ecossistema Checkmate. Relações que levam tempo para construir.",
    },
    financing: {
      eyebrow: "08 / Capital e financiamento",
      title: "Entenda como o capital trabalha dentro de uma operação.",
      description:
        "Conheça o papel do capital próprio, do crédito e do planejamento financeiro. Dentro do ecossistema Checkmate, você pode se aproximar de instituições e lenders utilizados no mercado.",
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
      description:
        "Blueprint também é experiência. Pessoas, projetos e ambientes onde o mercado acontece.",
    },
    testimonials: {
      eyebrow: "11 / Quem já vive essa experiência",
      title: "A perspectiva de quem está perto.",
      description:
        "Experiências reais de parceiros Checkmate, contadas por eles mesmos.",
    },
    offer: {
      eyebrow: "12 / Seu próximo passo",
      title: "O próximo projeto não precisa começar",
      accent: "com uma decisão no escuro.",
      description:
        "Conheça o Checkmate Blueprint. Preencha seus dados e converse com nosso time para entender se o programa faz sentido para o seu momento.",
    },
    faq: {
      eyebrow: "Antes de dar o próximo passo",
      title: "Boas perguntas. Respostas claras.",
    },
  },
  differentialIntro:
    "Um ambiente que aproxima investidores, profissionais da construção e empresários brasileiros da operação da Checkmate nos Estados Unidos.",
  differentialClosing:
    "Conteúdo para entender. Pessoas para pensar junto. Operação para enxergar na prática.",
  professionalClosing:
    "O Blueprint ajuda você a conectar o que já sabe à visão de uma operação completa.",
  careerIntro: "Seu conhecimento pode abrir um novo caminho",
  careerDescription:
    "Você não precisa abandonar sua profissão para entrar no real estate. O próximo passo pode começar com a experiência, a empresa ou o capital que você já construiu, com mais estratégia e acompanhamento.",
  financingSteps: [
    [
      "01",
      "Aquisição",
      "Entenda como avaliar o capital necessário para entrar no projeto.",
    ],
    [
      "02",
      "Construção",
      "Conheça estruturas de financiamento, liberações e etapas da obra.",
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
    "Acompanhamento e estratégia",
    "New Construction e projetos",
    "Comunidade e conexões",
    "Networking e experiências",
  ],
  momentOptions: [
    "Trabalho na construção",
    "Tenho empresa",
    "Já invisto em real estate",
    "Quero começar",
  ],
  final: {
    eyebrow: "Você não precisa construir sozinho",
    title: "Você já trabalha duro nos Estados Unidos.",
    subtitle:
      "Talvez esteja na hora de fazer seu conhecimento trabalhar por você.",
    description:
      "Para brasileiros que querem deixar de apenas observar o mercado imobiliário americano e começar a entendê-lo por dentro.",
    microcopy: "Converse com um especialista da Checkmate.",
  },
  navigation: [
    ["Blueprint", "blueprint"],
    ["Como funciona", "como-funciona"],
    ["Projetos", "projetos"],
    ["Experiências", "experiencias"],
    ["Depoimentos", "depoimentos"],
    ["FAQ", "faq"],
  ],
  questions: [
    "Qual propriedade comprar?",
    "Quanto pagar?",
    "Como financiar?",
    "Quanto custa construir?",
    "Onde está o risco?",
    "Qual estratégia de saída?",
  ],
  pillars: [
    {
      title: "Estratégia",
      text: "Entenda como analisar oportunidades e estruturar operações antes de tomar decisões.",
      detail: "Clareza antes do próximo passo.",
    },
    {
      title: "Acompanhamento",
      text: "Leve situações, dúvidas e projetos para pessoas que vivem essa operação todos os dias.",
      detail: "Experiência para pensar com você.",
    },
    {
      title: "Conexões",
      text: "Aproxime-se de profissionais, bancos, lenders, investidores e parceiros do mercado.",
      detail: "Relações que fazem parte da operação.",
    },
    {
      title: "Execução",
      text: "Entenda como projetos saem do papel e como decisões são tomadas durante a operação.",
      detail: "Do planejamento ao canteiro de obras.",
    },
  ],
  trades: [
    "Framing",
    "Roofing",
    "Painting",
    "Cleaning",
    "Electrical",
    "Plumbing",
    "General Contracting",
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
      title: "Diagnóstico",
      text: "O ponto de partida é você. Entendemos sua experiência, seus objetivos e o momento em que está.",
      tags: ["Experiência", "Objetivos", "Capital", "Mercado"],
    },
    {
      title: "Estruturação",
      text: "Entenda os pilares necessários para operar com uma visão completa do negócio.",
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
      title: "Oportunidades",
      text: "Aprenda a identificar e analisar oportunidades com critérios mais estruturados.",
      tags: ["Viabilidade", "Risco", "Estratégia de saída"],
    },
    {
      title: "Acompanhamento",
      text: "Leve situações, dúvidas e projetos para o ambiente Blueprint. Discuta decisões com quem conhece a operação.",
      tags: ["Proximidade", "Direção", "Troca de experiência"],
    },
    {
      title: "Conexões",
      text: "Aproxime-se de um ecossistema de profissionais que participa do mercado americano.",
      tags: ["Lenders", "Bancos", "Contractors", "Investidores", "Realtors"],
    },
    {
      title: "Execução",
      text: "Conecte o que você aprende às decisões e aos projetos que fazem sentido para o seu momento.",
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
      text: "Você conhece a execução e quer começar a entender aquisição, financiamento e investimento.",
    },
    {
      title: "Empresário",
      text: "Você construiu uma empresa nos EUA e quer direcionar conhecimento, capital ou patrimônio para real estate.",
    },
    {
      title: "Investidor",
      text: "Você possui capital e quer entender como analisar e participar de operações imobiliárias de maneira mais estruturada.",
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
      "Pessoas que constroem juntas.",
      "Conversas que ampliam a visão.",
      "Proximidade com a operação.",
      "Experiência além do conteúdo.",
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
