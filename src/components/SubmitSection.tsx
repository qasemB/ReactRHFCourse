import { useFormContext, useWatch } from "react-hook-form";
import FormField from "./FormField";
import type { UserProfileFormData } from "./UserProfileForm";
import { ArrowRight } from "lucide-react";

function SubmitSection () {

    const {
        register,
        formState: { errors, isSubmitting },
        // watch,
        control
    } = useFormContext<UserProfileFormData>()

    // const terms = watch( "terms" )
    const terms = useWatch( {
        control,
        name: "terms"
    } )



    return (

        <>
            {/* Accept Terms */ }
            <FormField label="" error={ errors.terms?.message }>
                <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                    <input type="checkbox" { ...register( "terms" ) } className="mt-1 accent-rose-400" />
                    <p className="text-sm text-slate-300 leading-6">
                        I agree to the{ " " }
                        <span className="text-rose-400 cursor-pointer hover:text-rose-300">Terms of Service</span>{ " " }
                        and{ " " }
                        <span className="text-rose-400 cursor-pointer hover:text-rose-300">Privacy Policy</span>.
                    </p>
                </div>
            </FormField>

            {/* Submit */ }
            <button
                type="submit"
                className={ `w-full mt-2 bg-linear-to-r from-rose-400 to-amber-300 text-slate-900 font-semibold text-sm rounded-xl py-3 flex items-center justify-center gap-2 transition hover:brightness-105 active:scale-[0.98] ${ ( !terms || isSubmitting ) && "opacity-50 pointer-events-none" }` }
                disabled={ !terms || isSubmitting }
            >
                Create Profile
                <ArrowRight className="w-4 h-4" />
            </button>
        </>

    );
}

export default SubmitSection;