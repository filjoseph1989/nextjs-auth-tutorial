import { Card, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";

export const ErrorCard = () => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader className="text-center">
                <Header label="Opps Something Went Wrong" />
            </CardHeader>
            <CardFooter className="text-center">
                <BackButton
                    label="Back to Login"
                    href="/auth/login"
                    className="text-center w-full" />
            </CardFooter>
        </Card>
    );
}