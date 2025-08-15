import { HomeIcon, InboxIcon } from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";

export function WidgetFooter() {
  const screen = "selections";

  return (
    <footer className="flex items-center justify-between border-t bg-background">
      <Button className="h-14 flex-1 rounded-none" size="icon" variant="ghost">
        <HomeIcon
          className={cn("size-5", screen === "selections" && "text-primary")}
        />
      </Button>

      <Button className="h-14 flex-1 rounded-none" size="icon" variant="ghost">
        <InboxIcon
          className={cn("size-5", screen === "selections" && "text-primary")}
        />
      </Button>
    </footer>
  );
}
