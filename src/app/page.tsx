import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 bg-white p-4 rounded-md text-center">
        <h1 className={cn("text-6xl font-semibold drop-shadow-md", font.className)}>Auth</h1>
        <p className="text-lg capitalize">A simple authentication service</p>
        <Button variant="secondary" size="lg">Sign In</Button>
      </div>
    </main>
  );
}
