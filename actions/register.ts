"use server";

import { RegistrationSchema } from "../schemas";
import { z } from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export const register = async (values: z.infer<typeof RegistrationSchema>) => {
    const validated = RegistrationSchema.safeParse(values);

    if (!validated.success) {
        return { error: "Something went wrong!"};
    }

    const { name, email, password } = validated.data;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await db.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return { error: "User is already being used!"};
    }

    const user = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    return { success: "User created!"};
}