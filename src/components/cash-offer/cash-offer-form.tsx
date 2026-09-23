"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { formatUSPhone } from "@/lib/phone";

type CashOfferFormProps = {
  formSlug?: string;
};

type BaseQuestion = {
  key: string;
  label: string;
  required?: boolean;
};

type RadioQuestion = BaseQuestion & {
  type: "radio";
  options: string[];
};

type TextQuestion = BaseQuestion & {
  type: "text" | "email" | "tel" | "number";
  placeholder: string;
  autoComplete?: string;
};

type Question = RadioQuestion | TextQuestion;

const questions: Question[] = [
  {
    key: "property_type",
    type: "radio",
    label: "What Type Of Property Is It?",
    required: true,
    options: [
      "Single family",
      "Multi family",
      "Apartment",
      "Commercial",
      "Land/Lot",
      "Mobile Trailer/Home",
    ],
  },
  {
    key: "occupancy",
    type: "radio",
    label: "Is The Property Currently Occupied?",
    required: true,
    options: ["Owner Occupied", "Tenant Occupied", "Not Occupied"],
  },
  {
    key: "property_condition",
    type: "radio",
    label: "What Is The Condition Of The Property?",
    required: true,
    options: ["Poor", "Fair", "Good", "Excellent"],
  },
  {
    key: "ownership_length",
    type: "radio",
    label: "How Long Have You Owned The Property?",
    required: true,
    options: [
      "0-5 Years",
      "5-15 Years",
      "15-30 Years",
      "30+ Years",
      "I Do Not Own The Property",
    ],
  },
  {
    key: "listed_with_realtor",
    type: "radio",
    label: "Is The Property Listed With A Realtor?",
    required: true,
    options: ["Yes", "No"],
  },
  {
    key: "sell_timeline",
    type: "radio",
    label: "How Soon Are You Looking To Sell?",
    required: true,
    options: ["ASAP", "1-2 months", "3-5 months", "6+ months"],
  },
  {
    key: "asking_price",
    type: "number",
    label: "Do You Have An Asking Price In Mind?",
    placeholder: "Your price",
  },
  {
    key: "selling_reason",
    type: "radio",
    label: "Why Are You Looking To Sell Your Property?",
    required: true,
    options: [
      "Foreclosure",
      "Inheritance",
      "Divorce",
      "Structural/Fire/Water damage",
      "Tired landlord or Non-performing tenants",
      "Emergency reasons",
      "Looking for a quick sale",
      "Financial difficulties",
      "Sell without real estate agent",
      "Distressed Property",
    ],
  },
  {
    key: "property_address",
    type: "text",
    label: "What Is The Address Of The Property?",
    placeholder: "Address",
    autoComplete: "street-address",
  },
  {
    key: "first_name",
    type: "text",
    label: "Name",
    required: true,
    placeholder: "Name",
    autoComplete: "given-name",
  },
  {
    key: "last_name",
    type: "text",
    label: "Last name",
    required: true,
    placeholder: "Last name",
    autoComplete: "family-name",
  },
  {
    key: "email",
    type: "email",
    label: "Email",
    required: true,
    placeholder: "Email",
    autoComplete: "email",
  },
  {
    key: "phone",
    type: "tel",
    label: "Phone Number",
    required: true,
    placeholder: "Phone Number",
    autoComplete: "tel",
  },
];

function getInitialAnswers() {
  return Object.fromEntries(questions.map((question) => [question.key, ""]));
}

function isAnswered(question: Question, value: string) {
  return !question.required || value.trim().length > 0;
}

export function CashOfferForm({ formSlug = "cash-offer" }: CashOfferFormProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(
    getInitialAnswers,
  );
  const [error, setError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const currentQuestion = questions[currentIndex];
  const currentValue = answers[currentQuestion.key] || "";
  const isContactStep = currentIndex === 9;
  const answeredCount = useMemo(() => {
    return questions.filter((question) => {
      return isAnswered(question, answers[question.key] || "");
    }).length;
  }, [answers]);
  const progress = Math.round((answeredCount / questions.length) * 100);
  const isLastQuestion = isContactStep;

  const contactQuestions = questions.slice(9) as TextQuestion[];

  function updateAnswer(value: string) {
    setAnswers((current) => ({
      ...current,
      [currentQuestion.key]: value,
    }));
    setError(null);
  }

  function updateRadioAnswer(value: string) {
    updateAnswer(value);

    if (!isLastQuestion) {
      window.setTimeout(() => {
        setCurrentIndex((index) => Math.min(index + 1, questions.length - 1));
        setError(null);
      }, 180);
    }
  }

  function updateTextAnswer(value: string) {
    updateTextQuestionAnswer(currentQuestion.key, value);
  }

  function updateTextQuestionAnswer(key: string, value: string) {
    const nextValue = key === "phone" ? formatUSPhone(value) : value;

    setAnswers((current) => ({
      ...current,
      [key]: nextValue,
    }));

    setError(null);
  }

  function isContactStepComplete(nextAnswers = answers) {
    return contactQuestions.every((question) => {
      return isAnswered(question, nextAnswers[question.key] || "");
    });
  }

  function validateCurrentStep() {
    if (isContactStep) {
      if (!isContactStepComplete()) {
        setError("Please complete your contact information to continue.");
        return false;
      }

      return true;
    }

    if (!isAnswered(currentQuestion, currentValue)) {
      setError("Please answer this question to continue.");
      return false;
    }

    return true;
  }

  function goNext() {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentIndex === 8) {
      setCurrentIndex(9);
      setError(null);
      return;
    }

    setCurrentIndex((index) => Math.min(index + 1, 9));
    setError(null);
  }

  function goBack() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateCurrentStep()) {
      return;
    }

    const missingQuestion = questions.find((question) => {
      return !isAnswered(question, answers[question.key] || "");
    });

    if (missingQuestion) {
      setCurrentIndex(questions.indexOf(missingQuestion));
      setError("Please answer this question to continue.");
      return;
    }

    setSubmitState("submitting");
    setError(null);

    try {
      const response = await fetch(`/api/forms/${formSlug}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            ...answers,
            form_name: "Cash Offer",
          },
          source_url:
            typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setSubmitState("error");
        setError(result.error || "Unable to submit this form.");
        return;
      }

      setSubmitState("success");
      router.push(
        typeof result.thankYouPageUrl === "string"
          ? result.thankYouPageUrl
          : "/thank-you/default",
      );
    } catch {
      setSubmitState("error");
      setError("Unable to submit this form. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.13em] text-[#8f672b] sm:text-[0.72rem] sm:tracking-[0.16em]">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <p className="text-sm font-extrabold text-[#171614]">{progress}%</p>
        </div>

        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-[#ece6da]"
          aria-label="Form completion progress"
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progress}
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-[linear-gradient(135deg,#ebca84_0%,#c79a4b_100%)] transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="min-h-[260px] sm:min-h-[310px]">
        <p className="text-[1.32rem] font-semibold leading-tight tracking-[-0.035em] text-[#171614] sm:text-[1.55rem]">
          {isContactStep ? "Where Should We Send Your Offer?" : currentQuestion.label}
        </p>

        {isContactStep ? (
          <p className="mt-3 text-[0.98rem] font-semibold text-[#8f672b] sm:text-[1.05rem]">
            Name, Last name, Email and Phone Number*
          </p>
        ) : (
          <p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#8f672b] sm:text-[0.68rem]">
            {currentQuestion.required ? "Required" : "Optional"}
          </p>
        )}

        <div className="mt-6 sm:mt-7">
          {isContactStep ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {contactQuestions.map((question) => (
                <input
                  key={question.key}
                  name={question.key}
                  type={question.type}
                  inputMode={
                    question.type === "number"
                      ? "numeric"
                      : question.type === "tel"
                        ? "tel"
                        : undefined
                  }
                  required={question.required}
                  placeholder={
                    question.key === "phone"
                      ? "(555) 000-0000"
                      : question.placeholder
                  }
                  autoComplete={question.autoComplete}
                  value={answers[question.key] || ""}
                  onChange={(event) =>
                    updateTextQuestionAnswer(question.key, event.target.value)
                  }
                  className="min-h-[56px] w-full rounded-[8px] border border-black/[0.1] bg-white px-4 text-[1rem] font-semibold text-[#171614] outline-none transition placeholder:text-[#9b9488] focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15 sm:min-h-[58px] sm:px-5"
                />
              ))}
            </div>
          ) : currentQuestion.type === "radio" ? (
            <div className="grid gap-3 md:grid-cols-2">
              {currentQuestion.options.map((option) => {
                const isSelected = currentValue === option;

                return (
                  <label
                    key={option}
                    className={`flex min-h-[56px] cursor-pointer items-center gap-3 rounded-[8px] border px-4 py-3 text-[0.88rem] font-extrabold leading-5 transition sm:text-sm ${
                      isSelected
                        ? "border-[#c79a4b] bg-[#f7efd9] text-[#171614] ring-4 ring-[#c79a4b]/15"
                        : "border-black/[0.08] bg-white text-[#171614] hover:border-[#c79a4b]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQuestion.key}
                      value={option}
                      checked={isSelected}
                      required={currentQuestion.required}
                      onChange={(event) => updateRadioAnswer(event.target.value)}
                      className="h-4 w-4 accent-[#c79a4b]"
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          ) : (
            <input
              name={currentQuestion.key}
              type={currentQuestion.type}
              inputMode={currentQuestion.type === "number" ? "numeric" : undefined}
              required={currentQuestion.required}
              placeholder={
                currentQuestion.key === "phone"
                  ? "(555) 000-0000"
                  : currentQuestion.placeholder
              }
              autoComplete={currentQuestion.autoComplete}
              value={currentValue}
              onChange={(event) => updateTextAnswer(event.target.value)}
              className="min-h-[56px] w-full rounded-[8px] border border-black/[0.1] bg-white px-4 text-[1rem] font-semibold text-[#171614] outline-none transition placeholder:text-[#9b9488] focus:border-[#c79a4b] focus:ring-4 focus:ring-[#c79a4b]/15 sm:min-h-[58px] sm:px-5"
            />
          )}
        </div>

        {error ? (
          <div className="mt-5 flex items-start gap-3 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        ) : null}

        {submitState === "success" ? (
          <div className="mt-5 flex items-start gap-3 rounded-[8px] border border-[#c79a4b]/25 bg-[#f7efd9] px-4 py-3 text-sm font-semibold text-[#171614]">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#8f672b]" />
            <p>Form submitted successfully. Redirecting...</p>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={currentIndex === 0 || submitState === "submitting"}
          className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[8px] border border-black/[0.1] bg-white px-5 text-sm font-extrabold text-[#171614] transition hover:border-[#c79a4b]/50 disabled:pointer-events-none disabled:opacity-45 sm:w-auto"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {isLastQuestion ? (
          <button
            type="submit"
            disabled={submitState === "submitting" || submitState === "success"}
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#171614] px-6 text-sm font-extrabold text-white transition hover:bg-black disabled:pointer-events-none disabled:opacity-70 sm:w-auto"
          >
            {submitState === "submitting" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Get My Instant Offer
                <ArrowRight size={18} />
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#171614] px-6 text-sm font-extrabold text-white transition hover:bg-black sm:w-auto"
          >
            Continue
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </form>
  );
}
