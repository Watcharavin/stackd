// components/ui/button.tsx
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-lime text-bg font-semibold hover:bg-lime-dim active:scale-[0.97] shadow-[0_2px_12px_rgba(217,119,87,0.18)] hover:shadow-[0_4px_20px_rgba(217,119,87,0.28)]",
  secondary:
    "bg-surface-2 text-text border border-border-strong hover:bg-muted-2 hover:border-border active:scale-[0.97]",
  ghost:
    "text-muted hover:text-text hover:bg-surface-2 active:scale-[0.97]",
  danger:
    "bg-red/10 text-red border border-red/20 hover:bg-red/20 active:scale-[0.97]",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-3 text-xs rounded-[--radius-chip]",
  md: "h-10 px-4 text-sm rounded-[--radius-btn]",
  lg: "h-12 px-6 text-base rounded-[--radius-input]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", loading, className, children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
