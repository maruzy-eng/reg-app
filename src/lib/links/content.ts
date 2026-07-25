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
    id: "property",
    href: "https://checkmateproperty.com/",
    ariaLabel: "Acessar Checkmate Property",
    image:
      "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/reg/ChatGPT%20Image%2025%20de%20jul.%20de%202026,%2012_15_00.png",
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
    id: "blueprint",
    href: "/blueprint",
    ariaLabel: "Acessar Programa BluePrint",
    image:
      "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/reg/91f316eb-a497-470f-83f4-21e3489afe08.png",
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
    href: "https://checkmateproperty.com/projects",
    ariaLabel: "Acessar Portal da Transparência",
    image:
      "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/reg/ChatGPT%20Image%2025%20de%20jul.%20de%202026,%2012_08_52.png",
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
    href: "/",
    ariaLabel: "Acessar o site da Checkmate",
    image:
      "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/reg/laptop-reg.png",
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
    id: "contact",
    href: "https://wa.me/19782395226",
    ariaLabel: "Falar com a Checkmate",
    image:
      "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/reg/legacy1.webp",
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
      "https://xnkpqvfyafbcrmxmefsc.supabase.co/storage/v1/object/public/reg/legacy2.webp",
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
