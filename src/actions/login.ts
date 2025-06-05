"use server";

import { z } from "zod";
import { LoginSchema } from "../schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validated = LoginSchema.safeParse(values);

    if (!validated.success) {
        return { error: "Something went wrong!"};
    }

    const { email, password } = validated.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.password) {
        return { error: "Invalid credentials!" };
    }

    if (!existingUser.emailVerified) {
        try {
            const token = await generateVerificationToken(email);
            await sendVerificationEmail(
                token.email,
                token.token
            );
            return { success: "Confirmation email sent!" };
        } catch (error) {
            console.error("Error generating verification token:", error);
            return { error: "Something went wrong while trying to send a confirmation email!" };
        }
    }

    try {
        const response = await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });

        return { success: "Logged in!" };
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === "CredentialsSignin") {
                return { error: "Invalid credentials!" };
            }
            return { error: "Something went wrong!" };
        }
        throw error;
    }
}