// components/ui/badge.tsx
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "lime" | "green" | "yellow" | "red" | "muted";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-2 text-text border border-border",
  lime:    "bg-lime/10 text-lime border border-lime/20",
  green:   "bg-green/10 text-green border border-green/20",
  yellow:  "bg-yellow/10 text-yellow border border-yellow/20",
  red:     "bg-red/10 text-red border border-red/20",
  muted:   "bg-muted-2 text-muted border border-border",
};

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium",
        "rounded-full whitespace-nowrap",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
