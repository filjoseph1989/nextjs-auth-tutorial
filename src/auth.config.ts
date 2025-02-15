import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validated = LoginSchema.safeParse(credentials);
                if (validated.success) {
                    const { email, password } = validated.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;
                    const isValid = await bcrypt.compare(password, user.password);
                    if (!isValid) return null;
                    return user;
                }
                return null;
            }
        })
    ]
} satisfies NextAuthConfig