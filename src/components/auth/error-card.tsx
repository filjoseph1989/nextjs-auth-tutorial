import { Card, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./back-button";
import { Header } from "./header";

export const ErrorCard = () => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader className="text-center">
                <Header label="Opps, something went wrong" />
            </CardHeader>
            <CardFooter className="text-center">
                <BackButton
                    label="Go back to login"
                    href="/auth/login"
                    className="w-full" />
            </CardFooter>
        </Card>
    );
}