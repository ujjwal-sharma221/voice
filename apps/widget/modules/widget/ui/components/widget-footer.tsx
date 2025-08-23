import { useAtom, useSetAtom } from "jotai";
import { HomeIcon, InboxIcon } from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import { screenAtom } from "../../atoms/widget-atoms";
import { Button } from "@workspace/ui/components/button";

export function WidgetFooter() {
  const [screen] = useAtom(screenAtom);
  const setScreen = useSetAtom(screenAtom);

  return (
    <footer className="flex items-center justify-between border-t bg-background">
      <Button
        className="h-14 flex-1 rounded-none"
        size="icon"
        variant="ghost"
        onClick={() => setScreen("selection")}
      >
        <HomeIcon
          className={cn("size-5", screen === "selection" && "text-primary")}
        />
      </Button>

      <Button
        className="h-14 flex-1 rounded-none"
        size="icon"
        variant="ghost"
        onClick={() => setScreen("inbox")}
      >
        <InboxIcon
          className={cn("size-5", screen === "inbox" && "text-primary")}
        />
      </Button>
    </footer>
  );
}
