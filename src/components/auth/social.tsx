"use client";

import { Button } from "../ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";

export const Social = () => {
    return (
        <div className="flex justify-center items-center gap-x-4 w-full">
            <Button className="h-10 w-full" variant="outline"><FaGoogle />Google</Button>
            <Button className="h-10 w-full" variant="outline"><FaGithub />GitHub</Button>
        </div>
    );
}