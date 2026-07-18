interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export default function FormField({
  label,
  error,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm text-slate-300 mb-1.5">
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-1 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}