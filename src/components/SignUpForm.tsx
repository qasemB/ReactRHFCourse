import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUpForm () {
  const [ showPassword, setShowPassword ] = useState( false );

  const { register, handleSubmit } = useForm<SignUpFormData>()

  const onSubmit = ( data: SignUpFormData ) => {
    console.log( data );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-6 font-sans">
      <div className="w-full max-w-md">
        {/* brand header */ }
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-rose-400 to-amber-300 flex items-center justify-center font-bold text-slate-900">
            A
          </div>
          <span className="text-slate-200 font-semibold tracking-wide">Code Academy</span>
        </div>

        <div className="relative bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/40">
          <>
            {/* decorative top line */ }
            <div className="absolute -top-px left-8 right-8 h-px bg-linear-to-r from-transparent via-rose-400/70 to-transparent" />

            <h1 className="text-2xl font-bold text-slate-50 mb-1">Create your account</h1>
            <p className="text-slate-400 text-sm mb-7">
              Fill in your details to get started with the course
            </p>
          </>

          <form className="space-y-5" onSubmit={ handleSubmit(onSubmit) }>
            {/* name */ }
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">Full name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                <input
                  type="text"
                  { ...register( "name" ) }
                  required
                  placeholder="e.g. Sarah Johnson"
                  className="w-full bg-slate-950/60 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-100 placeholder:text-slate-600 text-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
                />
              </div>
            </div>

            {/* email */ }
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                <input
                  type="email"
                  { ...register( "email" ) }
                  required
                  placeholder="you@example.com"
                  className="w-full bg-slate-950/60 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-slate-100 placeholder:text-slate-600 text-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
                />
              </div>
            </div>

            {/* password */ }
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                <input
                  type={ showPassword ? "text" : "password" }
                  required
                  { ...register( "password" ) }
                  placeholder="At least 8 characters"
                  className="w-full bg-slate-950/60 border border-slate-700 rounded-xl py-2.5 pl-10 pr-10 text-slate-100 placeholder:text-slate-600 text-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
                />
                <button
                  type="button"
                  onClick={ () => setShowPassword( ( s ) => !s ) }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  aria-label="Toggle password visibility"
                >
                  { showPassword ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  ) }
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-linear-to-r from-rose-400 to-amber-300 text-slate-900 font-semibold text-sm rounded-xl py-3 flex items-center justify-center gap-2 transition hover:brightness-105 active:scale-[0.98]"
            >
              Create account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            Already have an account?{ " " }
            <a href="#" className="text-rose-400 hover:text-rose-300 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
