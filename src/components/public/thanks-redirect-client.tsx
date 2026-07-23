"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, CheckCircle2, Loader2 } from "lucide-react";
import {
  buildCampaignEntryUrl,
  clearCampaignEntryTokens,
  readCampaignEntryTokens,
} from "@/lib/campaign-auth";
import type { SiteSettingsValue } from "@/lib/site-settings";

const REDIRECT_SECONDS = 5;

type ThanksRedirectClientProps = {
  settings: Required<SiteSettingsValue>;
};

export function ThanksRedirectClient({ settings }: ThanksRedirectClientProps) {
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [missingTokens, setMissingTokens] = useState(false);

  const siteName = settings.site_name || "Checkmate Property";
  const logoUrl = settings.logo_url;

  const progress = useMemo(() => {
    return ((REDIRECT_SECONDS - secondsLeft) / REDIRECT_SECONDS) * 100;
  }, [secondsLeft]);

  useEffect(() => {
    const tokens = readCampaignEntryTokens();

    if (!tokens) {
      setMissingTokens(true);
      return;
    }

    const nextUrl = buildCampaignEntryUrl(tokens);
    setRedirectUrl(nextUrl);

    const countdown = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(countdown);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    const redirectTimer = window.setTimeout(() => {
      clearCampaignEntryTokens();
      window.location.assign(nextUrl);
    }, REDIRECT_SECONDS * 1000);

    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <main className="thanks-page">
      <header className="thanks-header">
        <Link href="/" className="thanks-logo" aria-label={siteName}>
          {logoUrl ? (
            <span className="thanks-logo-frame">
              <Image
                src={logoUrl}
                alt={siteName}
                width={200}
                height={42}
                sizes="200px"
                className="thanks-logo-image"
                priority
              />
            </span>
          ) : (
            <span className="thanks-logo-fallback">
              <span className="thanks-logo-mark">
                <Building2 size={20} />
              </span>
              <span>{siteName}</span>
            </span>
          )}
        </Link>
      </header>

      <section className="thanks-card">
        <div className="thanks-icon" aria-hidden="true">
          <CheckCircle2 size={28} />
        </div>

        <p className="thanks-eyebrow">Registration complete</p>
        <h1>Thanks for signing up</h1>
        <p className="thanks-copy">
          Your free Flip Calculator account is ready. We are opening your
          logged-in access now.
        </p>

        {missingTokens ? (
          <div className="thanks-warning">
            <p>
              We could not recover your session tokens. Please sign in to
              continue.
            </p>
            <a
              href="https://app.checkmateproperty.com/#/login"
              className="thanks-button"
            >
              Go to login
            </a>
          </div>
        ) : (
          <>
            <div className="thanks-countdown" aria-live="polite">
              <Loader2 size={18} className="thanks-spinner" aria-hidden="true" />
              <span>
                Redirecting in <strong>{secondsLeft}s</strong>
              </span>
            </div>

            <div className="thanks-progress" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>

            {redirectUrl ? (
              <a href={redirectUrl} className="thanks-link">
                Continue now
              </a>
            ) : null}
          </>
        )}
      </section>
    </main>
  );
}
