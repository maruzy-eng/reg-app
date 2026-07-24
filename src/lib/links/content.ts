export type LinksCard = {
  id: string;
  href: string;
  ariaLabel: string;
  image: string;
  imageAlt: string;
  kicker: string;
  title: string;
  description: string;
  cta: string;
  icon: "layers" | "eye" | "site" | "home" | "phone" | "house";
  external?: boolean;
};

export const LINKS_LOGO =
  "https://checkmaterealestategroup.com/wp-content/uploads/2025/09/logock.webp";

export const linksCards: LinksCard[] = [
  {
    id: "blueprint",
    href: "/blueprint",
    ariaLabel: "Acessar Programa BluePrint",
    image:
      "https://checkmaterealestategroup.com/wp-content/uploads/2026/06/ChatGPT-Image-26-de-jun.-de-2026-10_51_45-1.png",
    imageAlt: "Programa BluePrint Checkmate",
    kicker: "Educação e Operação",
    title: "Programa BluePrint",
    description:
      "Aprenda a estruturar projetos de Flip Houses e New Construction nos EUA utilizando financiamento de até 85% da aquisição e 100% da construção.",
    cta: "Conhecer o BluePrint",
    icon: "layers",
    external: false,
  },
  {
    id: "projects",
    href: "https://checkmaterealestategroup.com/project/",
    ariaLabel: "Acessar Portal da Transparência",
    image:
      "https://checkmaterealestategroup.com/wp-content/uploads/2026/06/ChatGPT-Image-26-de-jun.-de-2026-10_54_26-1.png",
    imageAlt: "Portal da Transparência Checkmate",
    kicker: "Projetos",
    title: "Portal da Transparência",
    description:
      "Acompanhe tudo sobre nossos projetos, obras, imóveis em andamento e atualizações publicadas pela Checkmate Real Estate Group.",
    cta: "Ver projetos",
    icon: "eye",
    external: true,
  },
  {
    id: "site",
    href: "/reg",
    ariaLabel: "Acessar o site da Checkmate",
    image:
      "https://checkmaterealestategroup.com/wp-content/uploads/2026/06/ChatGPT-Image-26-de-jun.-de-2026-10_28_52-1.png",
    imageAlt: "Nosso site Checkmate",
    kicker: "Institucional",
    title: "Nosso site",
    description:
      "Visite nosso site e conheça detalhes sobre serviços, treinamentos e contato.",
    cta: "Acesse o site",
    icon: "site",
    external: false,
  },
  {
    id: "property",
    href: "https://checkmateproperty.com/",
    ariaLabel: "Acessar Checkmate Property",
    image:
      "https://checkmaterealestategroup.com/wp-content/uploads/2026/06/ChatGPT-Image-26-de-jun.-de-2026-10_33_33-1.png",
    imageAlt: "Checkmate Property",
    kicker: "Plataforma",
    title: "Checkmate Property",
    description:
      "Tudo o que você precisa para operar com Flip Houses e New Construction em uma única plataforma.",
    cta: "Acesso imediato",
    icon: "home",
    external: true,
  },
  {
    id: "contact",
    href: "https://wa.me/19782395226",
    ariaLabel: "Falar com a Checkmate",
    image:
      "https://checkmaterealestategroup.com/wp-content/uploads/2026/06/ChatGPT-Image-26-de-jun.-de-2026-10_20_29-1.png",
    imageAlt: "Fale conosco Checkmate",
    kicker: "Atendimento",
    title: "Fale conosco",
    description:
      "Entre em contato com nossa equipe para esclarecer suas dúvidas.",
    cta: "Entre em contato",
    icon: "phone",
    external: true,
  },
  {
    id: "financing",
    href: "https://thainunes.com/",
    ariaLabel: "Aplicação para financiamento",
    image:
      "https://checkmaterealestategroup.com/wp-content/uploads/2026/06/ChatGPT-Image-26-de-jun.-de-2026-10_40_05-1.png",
    imageAlt: "Conquiste sua casa própria nos EUA",
    kicker: "Financiamento",
    title: "Conquiste sua casa própria nos EUA",
    description:
      "Acesse o link para fazer sua aplicação para financiamento.",
    cta: "Sua casa própria",
    icon: "house",
    external: true,
  },
];
