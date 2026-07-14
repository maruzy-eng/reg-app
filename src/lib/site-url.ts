export const SITE_URL = "https://checkmateproperty.com";

export function getCanonicalSiteUrl(value = process.env.NEXT_PUBLIC_SITE_URL) {
  const rawUrl = value?.trim().replace(/\/$/, "") || SITE_URL;

  try {
    const url = new URL(rawUrl);

    if (
      url.hostname !== "checkmateproperty.com" &&
      url.hostname !== "www.checkmateproperty.com"
    ) {
      return SITE_URL;
    }

    url.hostname = "checkmateproperty.com";
    url.protocol = "https:";

    return url.origin;
  } catch {
    return SITE_URL;
  }
}

export function getAbsoluteSiteUrl(pathOrUrl?: string | null) {
  const siteUrl = getCanonicalSiteUrl();

  if (!pathOrUrl) {
    return siteUrl;
  }

  try {
    const url = new URL(pathOrUrl);

    if (url.hostname === "www.checkmateproperty.com") {
      url.hostname = "checkmateproperty.com";
    }

    if (url.hostname === "checkmateproperty.com") {
      url.protocol = "https:";
    }

    return url.toString();
  } catch {
    try {
      return new URL(pathOrUrl, siteUrl).toString();
    } catch {
      return siteUrl;
    }
  }
}
