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
          <label
            htmlFor={id}
            className="text-sm font-medium text-foreground text-left block"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`w-full bg-background border ${
            error ? "border-destructive" : "border-input"
          } rounded px-4 py-3 text-base text-foreground font-bold focus:border-ring outline-none transition-colors ${className}`}
          {...props}
        />
        {error && <p className="text-destructive text-xs">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
