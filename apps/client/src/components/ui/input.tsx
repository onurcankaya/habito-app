import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="body-3 font-bold text-left block">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`w-full bg-background border ${
            error ? "border-destructive" : "border-input"
          } rounded-md px-3 py-2.5 text-sm text-foreground font-semibold placeholder:font-normal focus:border-ring outline-none transition-colors ${className}`}
          {...props}
        />
        {error && <p className="text-destructive text-left text-xs">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
