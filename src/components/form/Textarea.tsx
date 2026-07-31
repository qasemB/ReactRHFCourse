import { type ReactNode } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";
import FormField from "../FormField";

interface TextareaProps {
    label: string;
    icon?: ReactNode;
    placeholder?: string;
    rows?: number;
    error?: string;
    registration: UseFormRegisterReturn;
}

export default function Textarea ( {
    label,
    icon,
    placeholder,
    rows = 5,
    error,
    registration,
}: TextareaProps ) {
    return (
        <FormField label={ label } error={ error }>
            <div className="relative">
                { icon && (
                    <div className="absolute left-3 top-4 text-slate-500">
                        { icon }
                    </div>
                ) }

                <textarea
                    rows={ rows }
                    placeholder={ placeholder }
                    { ...registration }
                    className={ `w-full resize-none bg-slate-950/60 border border-slate-700 rounded-xl py-3 ${ icon ? "pl-11" : "pl-4"
                        } pr-4 text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20` }
                />
            </div>
        </FormField>
    );
}