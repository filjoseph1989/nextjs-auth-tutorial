import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {
        message: "Password is required"
    })
});

export const RegistrationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: "Password is required"
    }),
    name: z.string({
        message: "Name is required",
    })
});
