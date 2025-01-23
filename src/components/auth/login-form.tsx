"use client";

import { JSX } from "react";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoginSchema } from "../../../schemas";

// const FormSchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(1, {
//         message: "Password is required"
//     }),
// });

export const LoginForm: () => JSX.Element = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    return (
        <CardWrapper
            headerLabel="Welcome Back!"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial>
            <Form { ...form }>
                <form onSubmit={form.handleSubmit(() => {})} className="space-y-6">
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
                                        type="email" />
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
                                        type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <Button type="submit">Login</Button>
                </form>
            </Form>
        </CardWrapper>
    );
}