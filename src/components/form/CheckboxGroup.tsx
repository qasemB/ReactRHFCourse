import FormField from "../FormField";
import { type UseFormRegisterReturn } from "react-hook-form";

interface CheckboxOption {
    label: string;
    value: string;
}

interface CheckboxGroupProps {
    label: string;
    error?: string;
    registration: UseFormRegisterReturn;
    options: CheckboxOption[];
}

export default function CheckboxGroup ( {
    label,
    error,
    registration,
    options,
}: CheckboxGroupProps ) {
    return (
        <FormField label={ label } error={ error }>
            <div className="grid grid-cols-2 gap-3">
                { options.map( ( option ) => (
                    <label
                        key={ option.value }
                        className="flex items-center gap-3 bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-3 cursor-pointer hover:border-rose-400 transition"
                    >
                        <input
                            type="checkbox"
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