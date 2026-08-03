import { forwardRef, type SelectHTMLAttributes } from "react";
import iconArrowDown from "@/assets/icon-arrow-down.svg";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, className = "", children, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="body-3 font-bold text-left block">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={id}
            ref={ref}
            className={`w-full appearance-none bg-background border ${
              error ? "border-destructive" : "border-input"
            } rounded-md px-3 py-2.5 text-sm font-bold text-foreground font-semibold focus:border-ring outline-none cursor-pointer ${className}`}
            {...props}
          >
            {children}
          </select>
          <img
            src={iconArrowDown}
            alt=""
            className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>
        {error && <p className="text-red text-xs">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";
