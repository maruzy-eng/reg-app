"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

type Step = "name" | "email" | "phone" | "done";

const INTRO =
  "Hi! I'm Chat. I can connect you with our team — just a few quick details.";

function createMessage(role: ChatRole, text: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    text,
  };
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function HomeAssistant() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("name");
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage("assistant", INTRO),
    createMessage("assistant", "What's your name?"),
  ]);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const placeholder = useMemo(() => {
    if (step === "name") return "Your full name";
    if (step === "email") return "you@email.com";
    if (step === "phone") return "+1 (000) 000-0000";
    return "";
  }, [step]);

  const inputType = step === "email" ? "email" : step === "phone" ? "tel" : "text";

  useEffect(() => {
    if (!open) return;

    const frame = window.requestAnimationFrame(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
      inputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [messages, open, step]);

  async function submitLead(nextAnswers: typeof answers) {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/assistant/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...nextAnswers,
          source: "site-assistant",
          message: "Lead captured through the site assistant chat.",
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        success?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || "Unable to send your details.");
      }

      setStep("done");
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          `Thanks, ${nextAnswers.name.split(" ")[0]}! Our team received your details and will be in touch soon.`,
        ),
        createMessage(
          "assistant",
          "If you'd like to explore next steps now, you can also visit our Contact page.",
        ),
      ]);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to send your details.",
      );
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "Something went wrong saving your details. Please try again.",
        ),
      ]);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step === "done" || submitting) {
      return;
    }

    const value = input.trim();

    if (!value) {
      setError("Please fill in this field to continue.");
      return;
    }

    if (step === "name" && value.length < 2) {
      setError("Please enter your name.");
      return;
    }

    if (step === "email" && !isValidEmail(value)) {
      setError("Please enter a valid email.");
      return;
    }

    if (step === "phone" && value.replace(/\D/g, "").length < 8) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError(null);
    setInput("");
    setMessages((current) => [...current, createMessage("user", value)]);

    if (step === "name") {
      const nextAnswers = { ...answers, name: value };
      setAnswers(nextAnswers);
      setStep("email");
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          `Nice to meet you, ${value.split(" ")[0]}! What's the best email to reach you?`,
        ),
      ]);
      return;
    }

    if (step === "email") {
      const nextAnswers = { ...answers, email: value };
      setAnswers(nextAnswers);
      setStep("phone");
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "Got it. And what's your phone number (WhatsApp works too)?",
        ),
      ]);
      return;
    }

    const nextAnswers = { ...answers, phone: value };
    setAnswers(nextAnswers);
    await submitLead(nextAnswers);
  }

  function resetChat() {
    setStep("name");
    setInput("");
    setError(null);
    setSubmitting(false);
    setAnswers({ name: "", email: "", phone: "" });
    setMessages([
      createMessage("assistant", INTRO),
      createMessage("assistant", "What's your name?"),
    ]);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[900] flex flex-col items-end gap-3">
      {open ? (
        <div className="flex w-[min(100vw-1.5rem,380px)] flex-col overflow-hidden rounded-[28px] border border-[#C79A4B]/28 bg-[#111111] shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
          <div className="flex items-start justify-between gap-3 border-b border-white/10 bg-[linear-gradient(135deg,rgba(199,154,75,0.18),rgba(255,255,255,0.03))] px-4 py-4">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#EBCA84]">
                Chat
              </p>
              <p className="mt-1 text-[0.92rem] font-semibold text-white">
                Talk to our team
              </p>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <div
            ref={listRef}
            className="flex max-h-[360px] min-h-[280px] flex-col gap-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={[
                  "max-w-[88%] rounded-[18px] px-3.5 py-2.5 text-[0.86rem] leading-[1.55]",
                  message.role === "assistant"
                    ? "self-start border border-white/10 bg-white/[0.06] text-white/88"
                    : "self-end bg-[linear-gradient(135deg,#d8b55e_0%,#c9a24d_52%,#9f7625_100%)] text-[#17110a]",
                ].join(" ")}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 px-4 py-3">
            {step === "done" ? (
              <div className="flex flex-col gap-2">
                <a
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-4 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-[#171614] no-underline transition hover:bg-[#EBCA84]"
                >
                  Go to Contact
                </a>
                <button
                  type="button"
                  onClick={resetChat}
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/15 px-4 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white/70 transition hover:border-[#C79A4B]/45 hover:text-white"
                >
                  Start again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type={inputType}
                    value={input}
                    onChange={(event) => {
                      setInput(event.target.value);
                      if (error) setError(null);
                    }}
                    placeholder={placeholder}
                    disabled={submitting}
                    autoComplete={
                      step === "name"
                        ? "name"
                        : step === "email"
                          ? "email"
                          : "tel"
                    }
                    className="h-11 flex-1 rounded-full border border-white/12 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#C79A4B] focus:ring-4 focus:ring-[#C79A4B]/15 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    aria-label="Send answer"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#d8b55e_0%,#c9a24d_52%,#9f7625_100%)] text-[#17110a] transition hover:brightness-105 disabled:opacity-60"
                  >
                    <Send size={16} />
                  </button>
                </div>
                {error ? (
                  <p className="px-1 text-[0.72rem] font-medium text-[#f0b4b4]">
                    {error}
                  </p>
                ) : (
                  <p className="px-1 text-[0.68rem] text-white/35">
                    Step {step === "name" ? "1" : step === "email" ? "2" : "3"} of
                    3 · name, email, phone
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={[
          "group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full sm:gap-2",
          "border border-[#e4c26e]/40 bg-[#12100e] px-3 py-2 sm:px-3.5 sm:py-2.5",
          "text-[0.48rem] font-semibold uppercase tracking-[0.12em] text-[#f0d9a0] sm:text-[0.58rem] sm:tracking-[0.16em]",
          "shadow-[0_12px_32px_rgba(0,0,0,0.35),0_0_0_1px_rgba(231,194,110,0.08),inset_0_1px_0_rgba(255,255,255,0.08)]",
          "transition duration-300 ease-out",
          "hover:-translate-y-0.5 hover:border-[#ebca84]/70 hover:text-white",
          "hover:shadow-[0_16px_40px_rgba(0,0,0,0.4),0_0_24px_rgba(201,162,77,0.18),inset_0_1px_0_rgba(255,255,255,0.12)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a24d]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]",
          "active:translate-y-0",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(232,194,110,0.16)_0%,rgba(255,255,255,0.03)_42%,transparent_70%)]"
        />
        <span className="relative grid h-5 w-5 place-items-center rounded-full bg-[linear-gradient(145deg,#e8c56e_0%,#c9a24d_48%,#8f6a1f_100%)] text-[#17110a] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_10px_rgba(159,118,37,0.35)] sm:h-6 sm:w-6">
          {open ? <X size={12} strokeWidth={2.25} /> : <MessageCircle size={12} strokeWidth={2.25} />}
        </span>
        <span className="relative">{open ? "Close" : "Chat"}</span>
        {!open ? (
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ebca84]/55 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ebca84]" />
          </span>
        ) : null}
      </button>
    </div>
  );
}
