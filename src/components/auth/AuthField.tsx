import { cn } from "@/lib/utils";

export const authInputClass =
  "w-full rounded-xl glass px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus-visible:outline-2 focus-visible:outline-emerald";

export const authLabelClass =
  "mb-1 block eyebrow";

export function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="mt-1 text-xs text-emerald">{errors[0]}</p>;
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  errors?: string[];
}

export function Field({ label, name, errors, className, ...rest }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className={authLabelClass}>
        {label}
      </label>
      <input id={name} name={name} className={cn(authInputClass, className)} {...rest} />
      <FieldError errors={errors} />
    </div>
  );
}
