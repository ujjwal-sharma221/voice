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
        "bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r text-primary-foreground p-4",
        className,
      )}
    >
      {children}
    </header>
  );
}
