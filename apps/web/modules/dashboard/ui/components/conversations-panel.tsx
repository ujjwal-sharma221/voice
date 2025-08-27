"use client";

import {
  ListIcon,
  CheckCheckIcon,
  TrafficConeIcon,
  CircleArrowUpIcon,
  CornerUpLeftIcon,
  LoaderPinwheelIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { usePaginatedQuery } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { cn } from "@workspace/ui/lib/utils";
import { statusAtomFilter } from "../../atoms";
import { api } from "@workspace/backend/_generated/api";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { getCountryFlagUrl, getCountryFromTimezone } from "@/lib/country-utils";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon";

export function ConversationsPanel() {
  const pathname = usePathname();
  const statusFilter = useAtomValue(statusAtomFilter);
  const setStatusFilter = useSetAtom(statusAtomFilter);
  type statusFilterValues = "unresolved" | "resolved" | "all" | "escalated";

  const conversations = usePaginatedQuery(
    api.private.conversations.getMany,
    { status: statusFilter === "all" ? undefined : statusFilter },
    { initialNumItems: 10 },
  );

  const {
    topRefElement,
    handleLoadMore,
    canLoadMore,
    isLoadingMore,
    isLoadingFirstPage,
  } = useInfiniteScroll({
    status: conversations.status,
    loadMore: conversations.loadMore,
    loadSize: 10,
  });

  return (
    <div className="flex h-full w-full flex-col  text-sidebar-foreground">
      <div className="flex flex-col gap-3.5 border-b p-2">
        <Select
          defaultValue="all"
          onValueChange={(value) =>
            setStatusFilter(value as statusFilterValues)
          }
          value={statusFilter}
        >
          <SelectTrigger className="h-8 border-none px-1.5 shadow-none ring-0 hover:bg-muted hover:text-accent-foreground focus-visible:ring-0">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <ListIcon className="size-4" />
                <span>All</span>
              </div>
            </SelectItem>

            <SelectItem value="unresolved">
              <div className="flex items-center gap-2">
                <TrafficConeIcon className="size-4" />
                <span>Unresolved</span>
              </div>
            </SelectItem>

            <SelectItem value="escalated">
              <div className="flex items-center gap-2">
                <CircleArrowUpIcon className="size-4" />
                <span>Escalated</span>
              </div>
            </SelectItem>

            <SelectItem value="resolved">
              <div className="flex items-center gap-2">
                <CheckCheckIcon className="size-4" />
                <span>Resolved</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoadingFirstPage ? (
        <div className="flex items-center justify-center w-full h-screen">
          <LoaderPinwheelIcon
            className="text-muted-foreground animate-spin"
            size={24}
          />
        </div>
      ) : (
        <ScrollArea className="max-h-[calc(100vh-53px)]">
          <div className="flex w-full flex-1 flex-col text-sm">
            {conversations.results.map((conversation) => {
              const isLastMessageFromOperator =
                conversation.lastMessage?.message?.role !== "user";

              const country = getCountryFromTimezone(
                conversation.contactSession.metadata?.timezone,
              );
              const countryFlagUrl = country?.countryCode
                ? getCountryFlagUrl(country.countryCode)
                : undefined;

              return (
                <Link
                  key={conversation._id}
                  href={`/conversations/${conversation._id}`}
                  className={cn(
                    "relative flex cursor-pointer items-start gap-3 border-b p-4 py-5 text-sm leading-tight hover:bg-accent hover:text-accent-foreground",
                    pathname === `/conversations/${conversation._id}` &&
                      "bg-accent text-accent-foreground",
                  )}
                >
                  <div
                    className={cn(
                      "-translate-y-1/2 absolute top-1/2 left-0 h-[64%] w-1 rounded-r-full bg-neutral-300 opacity-0 transition-opacity",
                      pathname === `/conversations/${conversation._id}` &&
                        "opacity-100",
                    )}
                  />
                  <DicebearAvatar
                    seed={conversation.contactSession._id}
                    size={40}
                    className="shrink-0"
                    badgeImageUrl={countryFlagUrl}
                  />

                  <div className="flex-1">
                    <div className="flex w-full items-center gap-2">
                      <span className="truncate font-bold">
                        {conversation.contactSession.name}
                      </span>
                      <span className="ml-auto shrink-0 text-muted-foreground text-xs">
                        {formatDistanceToNow(conversation._creationTime)}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <div className="w-0 flex grow items-center gap-1">
                        {isLastMessageFromOperator && (
                          <CornerUpLeftIcon className="size-3 shrink-0 text-muted-foreground" />
                        )}
                        <span
                          className={cn(
                            "line-clamp-1 text-muted-foreground text-xs",
                            !isLastMessageFromOperator &&
                              "font-bold text-black",
                          )}
                        >
                          {conversation.lastMessage?.text}
                        </span>
                      </div>
                      <ConversationStatusIcon status={conversation.status} />
                    </div>
                  </div>
                </Link>
              );
            })}

            <InfiniteScrollTrigger
              canLoadMore={canLoadMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={handleLoadMore}
              ref={topRefElement}
            />
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
