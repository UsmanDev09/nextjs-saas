import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

export function CustomBadge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
        variant === "default" &&
          "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
        variant === "outline" &&
          "border bg-gradient-to-r from-purple-600 to-pink-600 text-white",
        className
      )}
      {...props}
    />
  );
}
