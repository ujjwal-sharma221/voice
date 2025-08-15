import { cn } from "@workspace/ui/lib/utils";

export function WidgetHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "bg-gradient-to-r from-[#374151] via-[#f43f5e] to-[#fb923c] text-primary-foreground p-4",
        className
      )}
    >
      {children}
    </header>
  );
}
