import { db } from "@/lib/db";

/**
 * Retrieves a verification token by its email.
 * @param email
 * @returns
 */
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email }
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
}

/**
 * Retrieves a verification token by its token value.
 * @param token
 * @returns
 */
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token }
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
}