"use client"

import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonProps {
    children: React.ReactNode,
    mode: "modal" | "redirect",
    isChild?: boolean
}

export const LoginButton = ({ children, mode = "redirect", isChild = false }: LoginButtonProps) => {
    const router = useRouter();

    const onClick = () => {
        router.push('/auth/login');
    }

    if (mode == 'modal') {
        return (
            <span>rendering modal</span>
        );
    }

    return (
        <span onClick={onClick} className="cursor-pointer">{children}</span>
    )
}