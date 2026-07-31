import { useEffect } from "react";
import {
    Calendar,
    Globe,
    FileText,
} from "lucide-react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import FormField from "./FormField";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonalFields from "./PersonalFields";
import SubmitSection from "./SubmitSection";

const userProfileSchema = z.object( {
    name: z.string()
        .min( 5, "Name must be at least 5 characters." )
        .max( 20, "Name must be less than 20 characters." ),

    email: z.email( "Please enter a valid email address." ),

    password: z
        .string()
        .min( 8, "Password must be at least 8 characters." )
        .refine(
            ( value ) => !value.includes( " " ),
            { message: "Password must not contain spaces.", }
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

export type UserProfileFormData = z.infer<typeof userProfileSchema>;

export default function UserProfileForm () {

    const methods = useForm<UserProfileFormData>( {
        defaultValues: { phoneNumbers: [ { number: "" } ], name: "" },
        resolver: zodResolver( userProfileSchema )
    } );

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = methods

    const {
        fields,
        append,
        remove,
    } = useFieldArray( {
        control,
        name: "phoneNumbers",
    } );

    const saveUser = ( data: UserProfileFormData ) => {
        return new Promise( ( resolve ) => {
            setTimeout( () => {
                console.log( data );
                resolve( data );
                // reject( new Error( "Something went wrong." ) );
            }, 2000 );
        } );
    };

    const onSubmit = async ( data: UserProfileFormData ) => {
        await saveUser( data )
    };

    const loadUser = async () => {
        const response = await fetch( "/user.json" );
        const data = await response.json();
        reset( data )
    };

    useEffect( () => {
        loadUser();
    }, [] );



    return (
        <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                {/* Brand */ }
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-radial-to-br from-rose-400 to-amber-300 flex items-center justify-center font-bold text-white">
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

                    <FormProvider { ...methods }>
                        <form className="space-y-6" onSubmit={ handleSubmit( onSubmit ) }>

                            <PersonalFields />

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
                                        { ...register( "country" ) }
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

                            {/* Gender */ }
                            <FormField label="Gender" error={ errors.gender?.message }>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="flex items-center gap-3 bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-3 cursor-pointer hover:border-rose-400 transition">
                                        <input
                                            type="radio"
                                            value="male"
                                            { ...register( "gender" ) }
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
                                            { ...register( "skills" ) }
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
                                                    { ...register( `phoneNumbers.${ index }.number` ) }
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

                            <SubmitSection />
                        </form>
                    </FormProvider>


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