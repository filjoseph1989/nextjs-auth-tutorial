import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400"],
});

interface HeaderProps {
    label: string
};

export const Header = ({ label }: HeaderProps) => {
    return (
        <div className="flex flex-col w-full gap-y-4 items-center">
            <h1 className={cn("text-3xl font-semibold", font.className)}>Auth</h1>
            <p className="text-muted-foreground text-sm">{label}</p>
        </div>
    )
}