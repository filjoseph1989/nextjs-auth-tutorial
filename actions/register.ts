"use server";

import { RegistrationSchema } from "../schemas";
import { z } from "zod";

export const register = async (values: z.infer<typeof RegistrationSchema>) => {
    const validated = RegistrationSchema.safeParse(values);
    if (!validated.success) {
        return { error: "Something went wrong!"};
    }
    return { success: "Email sent!"};
}