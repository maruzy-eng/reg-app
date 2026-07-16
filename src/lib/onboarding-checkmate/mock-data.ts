import type { ChatMessage, LeadProfile, MeetingSlot, QuickReply } from "./types";

export const mockLeadProfile: LeadProfile = {
  name: "Carlos Moreira",
  email: "carlos@email.com",
  whatsapp: "(11) 99999-9999",
  stateOfInterest: "Massachusetts",
  cityOfInterest: "Boston",
  profession: "Empreendedor",
  interests: ["Flip House", "COMPS", "ARV", "Financiamento"],
  currentStage: "Estou estudando meu primeiro projeto",
};

export const initialMessages: ChatMessage[] = [
  {
    id: "assistant-welcome-1",
    role: "assistant",
    text: "Olá, Carlos! Vou explicar como funciona seu acesso e ajudar você a definir o melhor próximo passo.",
    time: "09:41",
  },
  {
    id: "assistant-welcome-2",
    role: "assistant",
    text: "Antes disso, quero entender rapidamente em que momento você está no mercado imobiliário americano.",
    time: "09:41",
  },
];

export const experienceQuickReplies: QuickReply[] = [
  {
    id: "experience-starting",
    label: "Estou começando agora",
    stage: "experience",
  },
  {
    id: "experience-studying",
    label: "Já estudo Flip House",
    stage: "experience",
  },
  {
    id: "experience-market",
    label: "Já atuo no mercado imobiliário",
    stage: "experience",
  },
  {
    id: "experience-builder",
    label: "Sou construtor ou prestador de serviço",
    stage: "experience",
  },
];

export const objectiveQuickReplies: QuickReply[] = [
  {
    id: "objective-understand",
    label: "Entender oportunidades nos EUA",
    stage: "objective",
  },
  {
    id: "objective-analyze",
    label: "Aprender a analisar propriedades",
    stage: "objective",
  },
  {
    id: "objective-income",
    label: "Investir e gerar renda",
    stage: "objective",
  },
  {
    id: "objective-flip",
    label: "Comprar e reformar para revender",
    stage: "objective",
  },
  {
    id: "objective-equity",
    label: "Construir patrimônio a longo prazo",
    stage: "objective",
  },
];

export const platformQuickReplies: QuickReply[] = [
  {
    id: "platform-show",
    label: "Sim, quero conhecer",
    stage: "platform",
  },
  {
    id: "platform-question",
    label: "Tenho uma dúvida primeiro",
    stage: "platform",
  },
];

export const meetingSlots: MeetingSlot[] = [
  { id: "slot-1000", label: "10:00 AM" },
  { id: "slot-1130", label: "11:30 AM" },
  { id: "slot-1400", label: "02:00 PM", selectedByDefault: true },
  { id: "slot-1630", label: "04:30 PM" },
  { id: "slot-1800", label: "06:00 PM" },
];
