"use client";

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  CHAT_TEXTS,
  CONVERSATION_STAGES,
  MEETING_DATE_LABEL,
  MEETING_TIMEZONE_LABEL,
  ONBOARDING_BRAND,
  SIMULATED_REPLY_DELAY_MS,
} from "@/lib/onboarding-checkmate/constants";
import {
  experienceQuickReplies,
  initialMessages,
  meetingSlots,
  mockLeadProfile,
  objectiveQuickReplies,
  platformQuickReplies,
} from "@/lib/onboarding-checkmate/mock-data";
import type {
  ChatMessage,
  ConversationStage,
  MeetingSlot,
  QuickReply,
} from "@/lib/onboarding-checkmate/types";
import styles from "./onboarding-checkmate-chat.module.css";

type OnboardingCheckmateChatProps = {
  token: string;
};

const formatTime = () =>
  new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

const createMessage = (role: ChatMessage["role"], text: string): ChatMessage => ({
  id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role,
  text,
  time: formatTime(),
  read: role === "user",
});

function BrandMark() {
  return (
    <div className={styles.brandMark} aria-hidden="true">
      <svg viewBox="0 0 42 42" role="img">
        <path d="M21 4 35 11.5V23c0 7.6-5.8 12.6-14 15-8.2-2.4-14-7.4-14-15V11.5L21 4Z" />
        <path d="m14 21 4.3 4.4L28.8 15" />
      </svg>
    </div>
  );
}

function Avatar() {
  return (
    <div className={styles.avatar} aria-hidden="true">
      <svg viewBox="0 0 32 32">
        <path d="M16 4a7 7 0 0 1 7 7v1.2a7 7 0 0 1-14 0V11a7 7 0 0 1 7-7Z" />
        <path d="M5.6 28c1.5-5.3 5.2-8 10.4-8s8.9 2.7 10.4 8" />
      </svg>
    </div>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 12 16-8-4.5 16-3.2-6.1L4 12Z" />
      <path d="m12.3 13.9 3.2-3.9" />
    </svg>
  );
}

function AttachmentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8.5 12.5 5.8-5.8a3.6 3.6 0 0 1 5.1 5.1l-7.6 7.6a5 5 0 0 1-7.1-7.1l7.2-7.2" />
    </svg>
  );
}

function DotsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </svg>
  );
}

export function OnboardingCheckmateChat({ token }: OnboardingCheckmateChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [stage, setStage] = useState<ConversationStage>(CONVERSATION_STAGES.experience);
  const [draft, setDraft] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(
    meetingSlots.find((slot) => slot.selectedByDefault)?.label ?? meetingSlots[0].label,
  );
  const [showScheduling, setShowScheduling] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickReplies = useMemo<QuickReply[]>(() => {
    if (stage === CONVERSATION_STAGES.experience) return experienceQuickReplies;
    if (stage === CONVERSATION_STAGES.objective) return objectiveQuickReplies;
    if (stage === CONVERSATION_STAGES.platform) return platformQuickReplies;
    return [];
  }, [stage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping, showScheduling]);

  const addAssistantMessage = (text: string) => {
    setMessages((current) => [...current, createMessage("assistant", text)]);
  };

  const respondAfterDelay = (text: string, afterResponse?: () => void) => {
    setIsTyping(true);
    window.setTimeout(() => {
      setIsTyping(false);
      addAssistantMessage(text);
      afterResponse?.();
    }, SIMULATED_REPLY_DELAY_MS);
  };

  const handleQuickReply = (reply: QuickReply) => {
    setMessages((current) => [...current, createMessage("user", reply.label)]);

    if (stage === CONVERSATION_STAGES.experience) {
      setStage(CONVERSATION_STAGES.objective);
      respondAfterDelay(CHAT_TEXTS.experienceReply);
      return;
    }

    if (stage === CONVERSATION_STAGES.objective) {
      setStage(CONVERSATION_STAGES.platform);
      respondAfterDelay(CHAT_TEXTS.objectiveReply);
      return;
    }

    if (reply.id === "platform-question") {
      setStage(CONVERSATION_STAGES.freeMessage);
      respondAfterDelay(CHAT_TEXTS.doubtFirstReply);
      return;
    }

    setStage(CONVERSATION_STAGES.scheduling);
    respondAfterDelay(CHAT_TEXTS.platformReply, () => setShowScheduling(true));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedDraft = draft.trim();
    if (!trimmedDraft) return;

    setMessages((current) => [...current, createMessage("user", trimmedDraft)]);
    setDraft("");
    setStage(CONVERSATION_STAGES.freeMessage);
    respondAfterDelay(CHAT_TEXTS.demoFreeMessageReply);
  };

  const handleComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  const confirmMeeting = () => {
    setMessages((current) => [
      ...current,
      createMessage("user", `Confirmar horário: ${selectedSlot}`),
      createMessage(
        "assistant",
        `${CHAT_TEXTS.meetingConfirmedPrefix} ${selectedSlot} ${CHAT_TEXTS.meetingConfirmedSuffix}`,
      ),
    ]);
    setStage(CONVERSATION_STAGES.completed);
  };

  const leadRows = [
    ["Nome", mockLeadProfile.name],
    ["E-mail", mockLeadProfile.email],
    ["WhatsApp", mockLeadProfile.whatsapp],
    ["Estado de interesse", mockLeadProfile.stateOfInterest],
    ["Cidade de interesse", mockLeadProfile.cityOfInterest],
    ["Profissão", mockLeadProfile.profession],
    ["Temas de interesse", mockLeadProfile.interests.join(", ")],
    ["Estágio atual", mockLeadProfile.currentStage],
  ];

  return (
    <main className={styles.pageShell}>
      <header className={styles.topBar}>
        <div className={styles.brandCluster}>
          <BrandMark />
          <div>
            <p className={styles.brandName}>{ONBOARDING_BRAND.name}</p>
            <div className={styles.agentStatusLine}>
              <span className={styles.onlineDot} />
              <span>{ONBOARDING_BRAND.agentName}</span>
              <span>Online</span>
            </div>
          </div>
        </div>

        <div className={styles.topActions}>
          <span className={styles.secureBadge}>
            <span className={styles.lockIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 10V8a5 5 0 0 1 10 0v2" />
                <path d="M6 10h12v10H6z" />
              </svg>
            </span>
            {ONBOARDING_BRAND.secureLabel}
          </span>
          <button className={styles.exitButton} type="button">
            {ONBOARDING_BRAND.exitLabel}
          </button>
        </div>
      </header>

      <section className={styles.appFrame}>
        <aside className={styles.sidebar} aria-label="Dados do lead">
          <div className={styles.agentCard}>
            <Avatar />
            <div>
              <h1>{ONBOARDING_BRAND.agentName}</h1>
              <p>
                <span className={styles.onlineDot} />
                Online agora
              </p>
            </div>
          </div>
          <p className={styles.sideDescription}>{CHAT_TEXTS.sideDescription}</p>
          <div className={styles.tokenBox}>
            <span>Token da sessão</span>
            <strong>{token}</strong>
          </div>
          <dl className={styles.leadList}>
            {leadRows.map(([label, value]) => (
              <div className={styles.leadRow} key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <section className={styles.chatPanel} aria-label="Conversa de onboarding">
          <div className={styles.chatHeader}>
            <div className={styles.brandCluster}>
              <Avatar />
              <div>
                <h2>{ONBOARDING_BRAND.agentName}</h2>
                <p>
                  <span className={styles.onlineDot} />
                  Online
                </p>
              </div>
            </div>
            <button className={styles.iconButton} type="button" aria-label={CHAT_TEXTS.menuLabel}>
              <DotsIcon />
            </button>
          </div>

          <div className={styles.messages} role="log" aria-live="polite">
            {messages.map((message) => (
              <article
                className={`${styles.messageRow} ${
                  message.role === "user" ? styles.messageRowUser : styles.messageRowAssistant
                }`}
                key={message.id}
              >
                <div className={styles.messageBubble}>
                  <p>{message.text}</p>
                  <span className={styles.messageMeta}>
                    {message.time}
                    {message.role === "user" && (
                      <span className={styles.readMark} aria-label="Mensagem lida">
                        ✓✓
                      </span>
                    )}
                  </span>
                </div>
              </article>
            ))}

            {isTyping && (
              <div className={`${styles.messageRow} ${styles.messageRowAssistant}`}>
                <div className={`${styles.messageBubble} ${styles.typingBubble}`} aria-label={CHAT_TEXTS.typingLabel}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {showScheduling && (
              <MeetingPanel
                selectedSlot={selectedSlot}
                slots={meetingSlots}
                onSelectSlot={setSelectedSlot}
                onConfirm={confirmMeeting}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {quickReplies.length > 0 && (
            <div className={styles.quickReplies} aria-label={CHAT_TEXTS.quickRepliesLabel}>
              {quickReplies.map((reply) => (
                <button key={reply.id} type="button" onClick={() => handleQuickReply(reply)}>
                  {reply.label}
                </button>
              ))}
            </div>
          )}

          <form className={styles.composer} onSubmit={handleSubmit}>
            <button className={styles.iconButton} type="button" aria-label={CHAT_TEXTS.attachLabel}>
              <AttachmentIcon />
            </button>
            <textarea
              aria-label={CHAT_TEXTS.composerPlaceholder}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleComposerKeyDown}
              placeholder={CHAT_TEXTS.composerPlaceholder}
              rows={1}
              value={draft}
            />
            <button className={styles.sendButton} type="submit" aria-label={CHAT_TEXTS.sendLabel}>
              <SendIcon />
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}

type MeetingPanelProps = {
  selectedSlot: string;
  slots: MeetingSlot[];
  onSelectSlot: (slot: string) => void;
  onConfirm: () => void;
};

function MeetingPanel({ selectedSlot, slots, onSelectSlot, onConfirm }: MeetingPanelProps) {
  return (
    <section className={styles.meetingPanel} aria-label="Agendamento simulado">
      <div>
        <span className={styles.meetingKicker}>{MEETING_DATE_LABEL}</span>
        <h3>{CHAT_TEXTS.meetingTitle}</h3>
        <p>{CHAT_TEXTS.meetingDescription}</p>
      </div>
      <div className={styles.slotGrid}>
        {slots.map((slot) => (
          <button
            className={slot.label === selectedSlot ? styles.slotSelected : undefined}
            key={slot.id}
            type="button"
            onClick={() => onSelectSlot(slot.label)}
          >
            {slot.label}
          </button>
        ))}
      </div>
      <div className={styles.meetingFooter}>
        <span>{MEETING_TIMEZONE_LABEL}</span>
        <button type="button" onClick={onConfirm}>
          {CHAT_TEXTS.confirmMeetingLabel}
        </button>
      </div>
    </section>
  );
}
