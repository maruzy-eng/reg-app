import "server-only";

import crypto from "crypto";

const PASSWORD_ALGORITHM = "pbkdf2";
const PASSWORD_ITERATIONS = 100000;
const PASSWORD_KEY_LENGTH = 64;
const PASSWORD_DIGEST = "sha512";

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");

  const hash = crypto
    .pbkdf2Sync(
      password,
      salt,
      PASSWORD_ITERATIONS,
      PASSWORD_KEY_LENGTH,
      PASSWORD_DIGEST,
    )
    .toString("hex");

  return `${PASSWORD_ALGORITHM}$${PASSWORD_ITERATIONS}$${salt}$${hash}`;
}

export function verifyPassword(password: string, storedHash: string | null) {
  if (!storedHash) {
    return false;
  }

  const [algorithm, iterationsValue, salt, originalHash] = storedHash.split("$");

  if (
    algorithm !== PASSWORD_ALGORITHM ||
    !iterationsValue ||
    !salt ||
    !originalHash
  ) {
    return false;
  }

  const iterations = Number(iterationsValue);

  if (!iterations || Number.isNaN(iterations)) {
    return false;
  }

  const candidateHash = crypto
    .pbkdf2Sync(
      password,
      salt,
      iterations,
      PASSWORD_KEY_LENGTH,
      PASSWORD_DIGEST,
    )
    .toString("hex");

  const originalBuffer = Buffer.from(originalHash, "hex");
  const candidateBuffer = Buffer.from(candidateHash, "hex");

  if (originalBuffer.length !== candidateBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(originalBuffer, candidateBuffer);
}