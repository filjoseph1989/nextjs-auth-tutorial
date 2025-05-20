"use client";

import { JSX, useEffect, useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/login";
import { useRouter, useSearchParams } from "next/navigation";

export const LoginForm: () => JSX.Element = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const errorParam = searchParams.get("error")
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "The email was already used by another providers"
        : "";

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (errorParam ==="OAuthAccountNotLinked") {
            router.replace("/auth/error?error=OAuthAccountNotLinked");
        }
    }, [errorParam, router]);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values).then((res) => {
                setSuccess(res.success);
                setError(res.error);
            });
        });
    }

    return (
        <CardWrapper
            headerLabel="Welcome Back!"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial>
            <Form { ...form }>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="yourname@example.com"
                                        type="email"
                                        disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="****"
                                        type="password"
                                        disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}