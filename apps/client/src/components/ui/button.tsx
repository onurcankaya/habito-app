import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "light";
  size?: "xs" | "sm" | "md" | "lg";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className = "", children, ...props },
    ref,
  ) => {
    const baseStyles =
      "rounded-full font-bold transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-primary-dark hover:bg-primary-dark/90 text-foreground",
      secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
      destructive: "bg-destructive hover:bg-destructive/90 text-white",
      outline: "border border-border text-foreground hover:bg-muted",
      ghost: "text-foreground hover:bg-muted",
      light: "text-foreground bg-muted hover:bg-muted/80",
    };

    const sizes = {
      xs: "px-2 py-1 text-xs",
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-2.5 text-sm",
      lg: "px-8 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
