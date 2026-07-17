export const US_PHONE_MASK = "(999) 999-9999";

export function onlyPhoneDigits(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") {
    return "";
  }

  return String(value).replace(/\D/g, "");
}

export function normalizeUSPhoneDigits(value: unknown) {
  const digits = onlyPhoneDigits(value);

  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1);
  }

  return digits;
}

export function formatUSPhone(value: unknown) {
  const digits = normalizeUSPhoneDigits(value).slice(0, 10);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function applyDigitMask(value: unknown, mask: string) {
  const digits = onlyPhoneDigits(value);
  let digitIndex = 0;
  let formatted = "";

  for (const char of mask) {
    if (char === "9") {
      const digit = digits[digitIndex];

      if (!digit) {
        break;
      }

      formatted += digit;
      digitIndex += 1;
      continue;
    }

    if (digitIndex < digits.length) {
      formatted += char;
    }
  }

  return formatted;
}

export function countPhoneMaskDigits(mask: string) {
  return [...mask].filter((char) => char === "9").length;
}
