import { useState } from "react";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Calendar,
    Globe,
    FileText,
    ArrowRight,
} from "lucide-react";
import { useForm } from "react-hook-form";
import FormField from "./FormField";

interface UserProfileFormData {
    name: string;
    email: string;
    password: string;
    age: number;
    country: string;
    gender: string;
    skills: string[];
    biography: string;
    terms: boolean;
}

export default function UserProfileForm () {
    const [ showPassword, setShowPassword ] = useState( false );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserProfileFormData>();

    const onSubmit = ( data: UserProfileFormData ) => {
        console.log( data );
    };

    return (
        <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                {/* Brand */ }
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-radial-to-br from-rose-400 to-amber-300 flex items-center justify-center font-bold text-slate-900">
                        A
                    </div>

                    <div>
                        <h2 className="text-slate-100 font-semibold text-lg">Code Academy</h2>
                        <p className="text-slate-500 text-sm">Complete your profile</p>
                    </div>
                </div>

                {/* Card */ }
                <div className="relative bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/40">
                    <div className="absolute -top-px left-10 right-10 h-px bg-radial-to-r from-transparent via-rose-400/70 to-transparent" />

                    <h1 className="text-3xl font-bold text-slate-50">User Profile</h1>
                    <p className="text-slate-400 mt-2 mb-8">
                        Fill in your information to complete your profile.
                    </p>

                    <form className="space-y-6" onSubmit={ handleSubmit( onSubmit ) }>
                        {/* Full Name */ }
                        <FormField label="Full Name" error={ errors.name?.message }>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    { ...register( "name" ) }
                                    placeholder="John Doe"
                                    className="w-full bg-slate-950/60 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
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

                        {/* Age */ }
                        <FormField label="Age" error={ errors.age?.message }>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="number"
                                    { ...register( "age", { valueAsNumber: true } ) }
                                    placeholder="25"
                                    className="w-full bg-slate-950/60 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
                                />
                            </div>
                        </FormField>

                        {/* Country */ }
                        <FormField label="Country" error={ errors.country?.message }>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                                <select
                                    { ...register( "country", {
                                        required: "Please select a country.",
                                    } ) }
                                    defaultValue=""
                                    className="w-full appearance-none bg-slate-950/60 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-100 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
                                >
                                    <option value="" disabled>Select a country</option>
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Germany</option>
                                    <option>France</option>
                                    <option>United Kingdom</option>
                                    <option>Australia</option>
                                    <option>Japan</option>
                                </select>
                            </div>
                        </FormField>

                        {/* <FormField label="State">
                            <select
                                className="w-full appearance-none bg-slate-950/60 border border-slate-700 rounded-xl py-3 px-4 text-slate-100 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
                            >
                                <option value="">Select a state</option>
                                <option value="california">California</option>
                                <option value="texas">Texas</option>
                                <option value="florida">Florida</option>
                                <option value="new-york">New York</option>
                                <option value="washington">Washington</option>
                            </select>
                        </FormField> */}

                        {/* Gender */ }
                        <FormField label="Gender" error={ errors.gender?.message }>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex items-center gap-3 bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-3 cursor-pointer hover:border-rose-400 transition">
                                    <input
                                        type="radio"
                                        value="male"
                                        { ...register( "gender", {
                                            required: "Please select a gender.",
                                        } ) }
                                        className="accent-rose-400"
                                    />
                                    <span className="text-slate-200">Male</span>
                                </label>

                                <label className="flex items-center gap-3 bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-3 cursor-pointer hover:border-rose-400 transition">
                                    <input type="radio" value="female" { ...register( "gender" ) } className="accent-rose-400" />
                                    <span className="text-slate-200">Female</span>
                                </label>
                            </div>
                        </FormField>

                        {/* Skills */ }
                        <FormField label="Skills" error={ errors.skills?.message }>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="flex items-center gap-3 bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-3 cursor-pointer hover:border-rose-400 transition">
                                    <input
                                        type="checkbox"
                                        value="react"
                                        { ...register( "skills", {
                                            validate: ( value ) =>
                                                ( value && value.length > 0 ) || "Select at least one skill.",
                                        } ) }
                                        className="accent-rose-400"
                                    />
                                    <span className="text-slate-200">React</span>
                                </label>

                                <label className="flex items-center gap-3 bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-3 cursor-pointer hover:border-rose-400 transition">
                                    <input type="checkbox" value="nextjs" { ...register( "skills" ) } className="accent-rose-400" />
                                    <span className="text-slate-200">Next.js</span>
                                </label>

                                <label className="flex items-center gap-3 bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-3 cursor-pointer hover:border-rose-400 transition">
                                    <input type="checkbox" value="typescript" { ...register( "skills" ) } className="accent-rose-400" />
                                    <span className="text-slate-200">TypeScript</span>
                                </label>

                                <label className="flex items-center gap-3 bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-3 cursor-pointer hover:border-rose-400 transition">
                                    <input type="checkbox" value="tailwind" { ...register( "skills" ) } className="accent-rose-400" />
                                    <span className="text-slate-200">Tailwind CSS</span>
                                </label>
                            </div>
                        </FormField>

                        {/* Biography */ }
                        <FormField label="Biography" error={ errors.biography?.message }>
                            <div className="relative">
                                <FileText className="absolute left-3 top-4 w-5 h-5 text-slate-500" />
                                <textarea
                                    rows={ 5 }
                                    { ...register( "biography" ) }
                                    placeholder="Tell us a little about yourself..."
                                    className="w-full resize-none bg-slate-950/60 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
                                />
                            </div>
                        </FormField>

                        {/* Accept Terms */ }
                        <FormField label="" error={ errors.terms?.message }>
                            <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                                <input type="checkbox" { ...register( "terms", { required: "Term is required" } ) } className="mt-1 accent-rose-400" />
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
                            className="w-full mt-2 bg-linear-to-r from-rose-400 to-amber-300 text-slate-900 font-semibold text-sm rounded-xl py-3 flex items-center justify-center gap-2 transition hover:brightness-105 active:scale-[0.98]"
                        >
                            Create Profile
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="mt-8 border-t border-slate-800 pt-6">
                        <p className="text-center text-sm text-slate-500">
                            Already have an account?{ " " }
                            <a href="#" className="text-rose-400 hover:text-rose-300 font-medium transition">
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}