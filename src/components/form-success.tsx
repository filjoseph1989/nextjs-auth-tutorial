import { CiCircleCheck } from "react-icons/ci";

interface FormSuccessProps {
    message ?: string
};

export const FormSuccess = ({ message }: FormSuccessProps) => {
    if (!message) return null;

    return (
        <div className="bg-emerald-500/15 flex gap-x-4 items-center p-3 rounded-md text-emerald-500 text-sm">
            <CiCircleCheck />{message}
        </div>
    );
}