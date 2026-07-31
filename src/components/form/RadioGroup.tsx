import FormField from "../FormField";
import { type UseFormRegisterReturn } from "react-hook-form";

interface RadioOption {
    label: string;
    value: string;
}

interface RadioGroupProps {
    label: string;
    error?: string;
    registration: UseFormRegisterReturn;
    options: RadioOption[];
}

export default function RadioGroup ( {
    label,
    error,
    registration,
    options,
}: RadioGroupProps ) {
    return (
        <FormField label={ label } error={ error }>
            <div className="grid grid-cols-2 gap-4">
                { options.map( ( option ) => (
                    <label
                        key={ option.value }
                        className="flex items-center gap-3 bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-3 cursor-pointer hover:border-rose-400 transition"
                    >
                        <input
                            type="radio"
                            value={ option.value }
                            { ...registration }
                            className="accent-rose-400"
                        />

                        <span className="text-slate-200">
                            { option.label }
                        </span>
                    </label>
                ) ) }
            </div>
        </FormField>
    );
}