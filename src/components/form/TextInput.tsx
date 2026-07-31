import { type ReactNode } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";
import FormField from "../FormField";

interface TextInputProps {
    label: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    icon?: ReactNode;
    error?: string;
    registration: UseFormRegisterReturn;
    className?: string;
    additionalElement?: ReactNode;
}

export default function TextInput ( {
    label,
    type = "text",
    placeholder,
    icon,
    error,
    registration,
    className = "",
    additionalElement
}: TextInputProps ) {
    return (
        <FormField label={ label } error={ error }>
            <div className="relative">
                { icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                        { icon }
                    </div>
                ) }

                <input
                    type={ type }
                    placeholder={ placeholder }
                    { ...registration }
                    className={ `
                        w-full
                        bg-slate-950/60
                        border
                        border-slate-700
                        rounded-xl
                        py-3
                        ${ icon ? "pl-11" : "pl-4" }
                        pr-4
                        text-slate-100
                        placeholder:text-slate-600
                        outline-none
                        transition
                        focus:border-rose-400
                        focus:ring-2
                        focus:ring-rose-400/20
                        ${ className }
                    `}
                />
                { additionalElement && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        { additionalElement }
                    </div>
                ) }
            </div>
        </FormField>
    );
}