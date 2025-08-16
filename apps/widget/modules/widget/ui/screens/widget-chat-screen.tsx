"use client";

import { useQuery } from "convex/react";
import { useAtomValue, useSetAtom } from "jotai";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";

import {
  screenAtom,
  conversationIdAtom,
  organizationIdAtom,
  contactSessionIdAtomFamily,
} from "../../atoms/widget-atoms";
import { Button } from "@workspace/ui/components/button";
import { api } from "@workspace/backend/_generated/api";
import { WidgetHeader } from "../components/widget-header";

export function WidgetChatScreen() {
  const setScreen = useSetAtom(screenAtom);
  const setConversationId = useSetAtom(conversationIdAtom);

  const conversationId = useAtomValue(conversationIdAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId ?? "")
  );

  const conversation = useQuery(
    api.public.conversations.getOne,
    contactSessionId && conversationId
      ? {
          contactSessionId,
          conversationId,
        }
      : "skip"
  );

  const handleNavigateBack = () => {
    setConversationId(null);
    setScreen("selection");
  };

  return (
    <>
      <WidgetHeader className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button variant="ghost" size="icon" onClick={handleNavigateBack}>
            <ArrowLeftIcon />
          </Button>

          <p>Chat</p>
        </div>

        <Button variant="secondary" size="icon">
          <MenuIcon />
        </Button>
      </WidgetHeader>

      <div className="flex flex-1 flex-col  gap-y-4 p-4 text-muted-foreground">
        {JSON.stringify(conversation, null, 2)}
      </div>
    </>
  );
}
