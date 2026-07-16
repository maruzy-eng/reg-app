export type ChatMessageRole = "assistant" | "user";

export type ConversationStage =
  | "welcome"
  | "experience"
  | "objective"
  | "platform"
  | "scheduling"
  | "free_message"
  | "completed";

export type LeadProfile = {
  name: string;
  email: string;
  whatsapp: string;
  stateOfInterest: string;
  cityOfInterest: string;
  profession: string;
  interests: string[];
  currentStage: string;
};

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  text: string;
  time: string;
  read?: boolean;
};

export type QuickReply = {
  id: string;
  label: string;
  stage: ConversationStage;
};

export type MeetingSlot = {
  id: string;
  label: string;
  selectedByDefault?: boolean;
};
