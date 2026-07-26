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
import { Controller, useFieldArray, useForm } from "react-hook-form";
import FormField from "./FormField";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userProfileSchema = z.object( {
    name: z.string()
        .min( 5, "Name must be at least 5 characters." )
        .max( 20, "Name must be less than 20 characters." ),

    email: z.email( "Please enter a valid email address." ),

    password: z
    .string()
    .min( 8, "Password must be at least 8 characters." )
    .refine(
        (value) => !value.includes(" "),
        {message: "Password must not contain spaces.",}
    ),

    age: z.number()
        .min( 18, "You must be at least 18 years old." )
        .max( 100, "Age is not valid." ),

    country: z.string().min( 1, "Please select a country." ),

    gender: z.string().min( 1, "Please select a gender." ),

    skills: z.array( z.string() ).min( 1, "Select at least one skill." ),

    biography: z.string().min( 20, "Biography must be at least 20 characters." ),

    terms: z.literal( true, { error: "You must accept the terms." } ),

    phoneNumbers: z.array(
        z.object( {
            number: z.string()
                .min( 1, "Phone number is required." ),
        } )
    ).min( 1, "At least one phone number is required." ),
} );

// interface UserProfileFormData {
//     name: string;
//     email: string;
//     password: string;
//     age: number;
//     country: string;
//     gender: string;
//     skills: string[];
//     biography: string;
//     terms: boolean;
//     phoneNumbers: {
//         number: string;
//     }[];
// }

type UserProfileFormData = z.infer<typeof userProfileSchema>;

export default function UserProfileForm () {
    const [ showPassword, setShowPassword ] = useState( false );

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        control
    } = useForm<UserProfileFormData>( {
        defaultValues: { phoneNumbers: [ { number: "" } ] },
        resolver: zodResolver(userProfileSchema)
    } );

    const {
        fields,
        append,
        remove,
    } = useFieldArray( {
        control,
        name: "phoneNumbers",
    } );

    const onSubmit = ( data: UserProfileFormData ) => {
        console.log( data );
    };

    const terms = watch( "terms" )

    console.log( errors );



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
                                    { ...register( "country") }
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
                                        { ...register( "gender") }
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
                                        { ...register( "skills") }
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

                        {/* Phone Numbers */ }
                        <FormField label="Phone Numbers" error={ errors.phoneNumbers?.root?.message }>
                            <div className="space-y-3">
                                { fields.map( ( field, index ) => (
                                    <FormField key={ field.id } label="" error={ errors.phoneNumbers?.[ index ]?.number?.message }>
                                        <div className="flex items-center gap-2">
                                            <input
                                                { ...register( `phoneNumbers.${ index }.number`) }
                                                placeholder="Phone Number"
                                                className="flex-1 bg-slate-950/60 border border-slate-700 rounded-xl py-3 px-4 text-slate-100 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
                                            />

                                            <button
                                                type="button"
                                                onClick={ () => remove( index ) }
                                                className="px-4 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </FormField>
                                ) ) }

                                <button
                                    type="button"
                                    onClick={ () =>
                                        append( {
                                            number: "",
                                        } )
                                    }
                                    className="w-full rounded-xl border border-dashed border-rose-400 text-rose-400 py-3 hover:bg-rose-400/10 transition"
                                >
                                    + Add Phone Number
                                </button>
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
                            className={ `w-full mt-2 bg-linear-to-r from-rose-400 to-amber-300 text-slate-900 font-semibold text-sm rounded-xl py-3 flex items-center justify-center gap-2 transition hover:brightness-105 active:scale-[0.98] ${ !terms && "opacity-50 pointer-events-none" }` }
                            disabled={ !terms }
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