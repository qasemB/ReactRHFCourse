import { Controller, useFormContext } from "react-hook-form";
import FormField from "./FormField";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import type { UserProfileFormData } from "./UserProfileForm";
import { useState } from "react";

function PersonalFields () {

    const [ showPassword, setShowPassword ] = useState( false );


    const {
        register,
        formState: { errors },
        control,
    } = useFormContext<UserProfileFormData>()

    return (
        <>
            {/* Full Name */ }
            <FormField label="Full Name" error={ errors.name?.message }>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                    <Controller
                        name="name"
                        control={ control }
                        render={ ( { field } ) => (
                            <input
                                type="text"
                                { ...field }
                                onChange={ ( e ) => {
                                    field.onChange( e.target.value.toUpperCase() );
                                } }
                                placeholder="John Doe"
                                className="w-full bg-slate-950/60 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
                            />
                        ) }
                    />
                </div>
            </FormField>

            {/* Email */ }
            <FormField label="Email" error={ errors.email?.message }>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="email"
                        { ...register( "email" ) }
                        placeholder="john@example.com"
                        className="w-full bg-slate-950/60 border border-slate-700 rounded-xl py-3 pl-11 text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
                    />
                </div>
            </FormField>

            {/* Password */ }
            <FormField label="Password" error={ errors.password?.message }>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type={ showPassword ? "text" : "password" }
                        { ...register( "password" ) }
                        placeholder="Enter your password"
                        className="w-full bg-slate-950/60 border border-slate-700 rounded-xl py-3 pl-11 text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 pr-11"
                    />
                    <button
                        type="button"
                        onClick={ () => setShowPassword( ( s ) => !s ) }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                    >
                        { showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" /> }
                    </button>
                </div>
            </FormField>

        </>
    );
}

export default PersonalFields;