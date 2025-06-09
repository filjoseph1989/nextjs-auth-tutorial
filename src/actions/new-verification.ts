"use server"

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: "Verification token not found" };
    }

    const hasExpired = existingToken.expired < new Date();

    if (hasExpired) {
        return { error: "Verification token has expired" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "User not found" };
    }

    try {
        await db.$transaction(async (tx) => {
            await db.user.update({
                where: { id: existingUser.id },
                data: {
                    emailVerified: new Date(),
                    email: existingToken.email,
                },
            });

            await db.verificationToken.delete({
                where: { id: existingToken.id }
            });
        });

        return { success: "Verification successful" };
    } catch (error) {
        console.error("Error during verification:", error);
        return { error: "An error occurred during verification" };
    }
}