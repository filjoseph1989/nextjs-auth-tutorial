"use server";

import { z } from "zod";
import { LoginSchema } from "../schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validated = LoginSchema.safeParse(values);

    if (!validated.success) {
        return { error: "Something went wrong!"};
    }

    const { email, password } = validated.data;

    try {
        console.log("signing in...");
        const response = await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        });

        if (response.error) {
            console.error("error 1", response.error);
            return { error: "Invalid credentials!" };
        }

        return { success: "Logged in!" };
    } catch (error) {
        console.error("error 2", error);
        if (error instanceof AuthError) {
            console.error("error 3", error);
            if (error.type === "CredentialsSignin") {
                return { error: "Invalid credentials!" };
            }
            return { error: "Something went wrong!" };
        }
        throw error;
    }
}