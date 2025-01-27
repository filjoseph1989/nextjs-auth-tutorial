import { FaExclamationTriangle } from "react-icons/fa";

interface FormErrorProps {
    message ?: string
};

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;

    return (
        <div className="bg-destructive/15 flex gap-x-4 items-center p-3 rounded-md text-destructive text-sm">
            <FaExclamationTriangle />{message}
        </div>
    );
}