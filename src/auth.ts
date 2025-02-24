import NextAuth from "next-auth"
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./data/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        async jwt({token}) {
            if (!token.sub) return token;
            const user = await getUserById(token.sub);
            if (!user) return token;
            token.role = user.role;
            return token;
        },
        async session({session, token}) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            if (token.role) {
                session.user.role = token.role;
            }
            return session;
        }

    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});