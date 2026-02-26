// components/ui/avatar.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string | null;
  username?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeMap: Record<AvatarSize, { px: number; cls: string }> = {
  sm: { px: 28, cls: "size-7 text-xs" },
  md: { px: 36, cls: "size-9 text-sm" },
  lg: { px: 48, cls: "size-12 text-base" },
  xl: { px: 64, cls: "size-16 text-xl" },
};

function getInitials(username?: string): string {
  if (!username) return "?";
  return username.slice(0, 2).toUpperCase();
}

function getColor(username?: string): string {
  const colors = [
    "bg-lime/20 text-lime",
    "bg-green/20 text-green",
    "bg-yellow/20 text-yellow",
    "bg-blue/20 text-blue",
    "bg-red/20 text-red",
  ];
  if (!username) return colors[0];
  const idx = username.charCodeAt(0) % colors.length;
  return colors[idx];
}

export function Avatar({ src, username, size = "md", className }: AvatarProps) {
  const { px, cls } = sizeMap[size];

  if (src) {
    return (
      <div
        className={cn(
          "relative rounded-full overflow-hidden ring-2 ring-border shrink-0",
          cls,
          className
        )}
      >
        <Image src={src} alt={username ?? "avatar"} fill className="object-cover" sizes={`${px}px`} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-full ring-2 ring-border shrink-0 flex items-center justify-center font-semibold font-heading",
        cls,
        getColor(username),
        className
      )}
    >
      {getInitials(username)}
    </div>
  );
}

/** Stacked group of avatars */
export function AvatarGroup({
  users,
  max = 4,
  size = "sm",
}: {
  users: { username?: string; avatar_url?: string | null }[];
  max?: number;
  size?: AvatarSize;
}) {
  const shown = users.slice(0, max);
  const extra = users.length - max;

  return (
    <div className="flex -space-x-2">
      {shown.map((u, i) => (
        <Avatar key={i} src={u.avatar_url} username={u.username} size={size} />
      ))}
      {extra > 0 && (
        <div
          className={cn(
            "rounded-full ring-2 ring-border bg-surface-2 text-muted flex items-center justify-center font-medium text-xs shrink-0",
            sizeMap[size].cls
          )}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}
