import type { ConversationStage } from "./types";

export const ONBOARDING_BRAND = {
  name: "Checkmate Property",
  agentName: "Agente Checkmate",
  secureLabel: "Conversa segura",
  exitLabel: "Sair da conversa",
};

export const ONBOARDING_COLORS = {
  green: "#53bc76",
  blue: "#39aff2",
  deepBlue: "#0e3541",
};

export const SIMULATED_REPLY_DELAY_MS = 600;

export const MEETING_DATE_LABEL = "Quinta-feira, 18 de julho";
export const MEETING_TIMEZONE_LABEL = "Horário de Boston (EDT)";

export const CONVERSATION_STAGES = {
  welcome: "welcome",
  experience: "experience",
  objective: "objective",
  platform: "platform",
  scheduling: "scheduling",
  freeMessage: "free_message",
  completed: "completed",
} satisfies Record<string, ConversationStage>;

export const CHAT_TEXTS = {
  sideDescription:
    "Atendimento inicial para entender seu momento e indicar os próximos passos dentro da Checkmate Property.",
  composerPlaceholder: "Escreva sua mensagem...",
  attachLabel: "Anexar arquivo",
  sendLabel: "Enviar mensagem",
  menuLabel: "Mais opções",
  quickRepliesLabel: "Respostas rápidas",
  typingLabel: "Agente Checkmate está digitando",
  meetingTitle: "Que tal agendar uma conversa com um especialista?",
  meetingDescription: "Escolha o melhor horário para você:",
  confirmMeetingLabel: "Confirmar horário",
  demoFreeMessageReply:
    "Entendi sua dúvida. Nesta primeira versão, o chat está em modo de demonstração. Na próxima fase, essa resposta será gerada pelo agente de IA com base nos conteúdos oficiais da Checkmate Property.",
  experienceReply:
    "Perfeito. Entender seu nível de experiência ajuda a adaptar a orientação. Qual é seu principal objetivo agora?",
  objectiveReply:
    "Ótimo! Com base nas suas respostas, posso apresentar os conteúdos e as ferramentas que mais combinam com seu objetivo. Posso mostrar como funciona a plataforma e o conteúdo gratuito preparado para você?",
  doubtFirstReply:
    "Claro. Pode escrever sua dúvida abaixo. Vou responder de forma objetiva e, se for necessário, encaminho o assunto para nossa equipe.",
  platformReply:
    "Excelente. Vou mostrar os primeiros passos e também posso ajudar você a agendar uma conversa rápida com nossa equipe.",
  meetingConfirmedPrefix: "Perfeito! O horário de",
  meetingConfirmedSuffix:
    "foi selecionado. Na próxima etapa, conectaremos este agendamento ao calendário da equipe.",
};
