"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        })
    };
    return (
        <div className="flex justify-center items-center gap-x-4 w-full">
            <Button className="h-10 w-full" variant="outline" onClick={() => onClick("google")}>
                <FaGoogle />Google
            </Button>
            <Button className="h-10 w-full" variant="outline" onClick={() => onClick("github")}>
                <FaGithub />GitHub
            </Button>
        </div>
    );
}