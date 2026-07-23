export const CAMPAIGN_ENTRY_URL =
  "https://app.checkmateproperty.com/#/campaign-entry";

export const CAMPAIGN_ENTRY_STORAGE_KEY = "checkmate_campaign_entry_tokens";

export type CampaignAuthTokens = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresIn: number | string;
};

export function buildCampaignEntryUrl(tokens: CampaignAuthTokens) {
  const query = new URLSearchParams({
    at: tokens.accessToken || "",
    rt: tokens.refreshToken || "",
    it: tokens.idToken || "",
    exp: String(tokens.expiresIn || ""),
    lang: "en",
  });

  return `${CAMPAIGN_ENTRY_URL}?${query.toString()}`;
}

export function storeCampaignEntryTokens(tokens: CampaignAuthTokens) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    CAMPAIGN_ENTRY_STORAGE_KEY,
    JSON.stringify(tokens),
  );
}

export function readCampaignEntryTokens(): CampaignAuthTokens | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(CAMPAIGN_ENTRY_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<CampaignAuthTokens>;

    if (
      !parsed.accessToken ||
      !parsed.refreshToken ||
      !parsed.idToken ||
      parsed.expiresIn === undefined ||
      parsed.expiresIn === null ||
      parsed.expiresIn === ""
    ) {
      return null;
    }

    return {
      accessToken: String(parsed.accessToken),
      refreshToken: String(parsed.refreshToken),
      idToken: String(parsed.idToken),
      expiresIn: parsed.expiresIn,
    };
  } catch {
    return null;
  }
}

export function clearCampaignEntryTokens() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(CAMPAIGN_ENTRY_STORAGE_KEY);
}
