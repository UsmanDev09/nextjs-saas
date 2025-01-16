import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

export function CustomCard({
  className,
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6",
        variant === "default" && "bg-white/50 backdrop-blur-sm",
        variant === "outline" && "border border-gray-200",
        className
      )}
      {...props}
    />
  );
}
