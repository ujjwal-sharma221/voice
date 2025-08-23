import {
  CheckCheckIcon,
  CircleArrowUpIcon,
  TrafficConeIcon,
} from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";

interface conversationStatusIconProps {
  status: "resolved" | "escalated" | "unresolved";
  className?: string;
}

const statusConfig = {
  resolved: {
    icon: CheckCheckIcon,
    bgColor: "bg-[#78C841]",
  },

  unresolved: {
    icon: TrafficConeIcon,
    bgColor: "bg-destructive",
  },

  escalated: {
    icon: CircleArrowUpIcon,
    bgColor: "bg-[#FFDE63]",
  },
} as const;

export function ConversationStatusIcon({
  status,
  className,
}: conversationStatusIconProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full size-5",
        config.bgColor,
        className
      )}
    >
      <Icon className="size-3 stroke-3 text-white" />
    </div>
  );
}
