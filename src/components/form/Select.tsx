import FormField from "../FormField";
import { type ReactNode } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

interface SelectOption {
    label: string;
    value: string;
}

interface SelectProps {
    label: string;
    icon?: ReactNode;
    error?: string;
    registration: UseFormRegisterReturn;
    options: SelectOption[];
    placeholder?: string;
}

export default function Select ( {
    label,
    icon,
    error,
    registration,
    options,
    placeholder = "Select an option",
}: SelectProps ) {
    return (
        <FormField label={ label } error={ error }>
            <div className="relative">
                { icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                        { icon }
                    </div>
                ) }

                <select
                    { ...registration }
                    defaultValue=""
                    className={ `w-full appearance-none bg-slate-950/60 border border-slate-700 rounded-xl py-3 ${ icon ? "pl-11" : "pl-4"
                        } pr-4 text-slate-100 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20` }
                >
                    <option value="" disabled>
                        { placeholder }
                    </option>

                    { options.map( ( option ) => (
                        <option
                            key={ option.value }
                            value={ option.value }
                        >
                            { option.label }
                        </option>
                    ) ) }
                </select>
            </div>
        </FormField>
    );
}