"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useSetAtom, useAtomValue } from "jotai";
import { ChevronRightIcon, MessageSquareIcon } from "lucide-react";

import {
  screenAtom,
  errorMessageAtom,
  conversationIdAtom,
  organizationIdAtom,
  contactSessionIdAtomFamily,
} from "../../atoms/widget-atoms";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { WidgetHeader } from "../components/widget-header";
import VerticalCutReveal from "@workspace/ui/components/vertical-cut-reveal";

export function WidgetSelectionScreen() {
  const setScreen = useSetAtom(screenAtom);
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(
    contactSessionIdAtomFamily(organizationId ?? ""),
  );

  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setConversationId = useSetAtom(conversationIdAtom);

  const [isCreatingConversation, setIsCreatingConversation] = useState(false);

  const createConversation = useMutation(api.public.conversations.create);

  const handleNewConversation = async () => {
    if (!contactSessionId) {
      setScreen("auth");
      return;
    }

    if (!organizationId) {
      setScreen("error");
      setErrorMessage("missing organization id");
      return;
    }

    try {
      setIsCreatingConversation(true);

      const conversationId = await createConversation({
        organizationId,
        contactSessionId,
      });

      setConversationId(conversationId);
      setScreen("chat");
    } catch (error) {
      console.error(error);
      setScreen("auth");
    } finally {
      setIsCreatingConversation(false);
    }
  };

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col font-semibold justify-between gap-y-2 px-2 py-6">
          <p className=" text-3xl ">
            <VerticalCutReveal
              splitBy="lines"
              staggerDuration={0.025}
              staggerFrom="first"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 21,
              }}
            >
              Hi There! 👋
            </VerticalCutReveal>
          </p>

          <p className=" text-lg">
            <VerticalCutReveal
              splitBy="line"
              staggerDuration={0.025}
              staggerFrom="first"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 21,
              }}
            >
              Let&apos;s get started
            </VerticalCutReveal>
          </p>
        </div>
      </WidgetHeader>

      <div className="flex flex-1 flex-col overflow-y-auto gap-y-4 p-4 ">
        <Button
          disabled={isCreatingConversation}
          className="h-16 w-full justify-between"
          variant="outline"
          onClick={handleNewConversation}
        >
          <div className="flex items-center gap-x-2">
            <MessageSquareIcon className="size-4" />
            <span>Start a chat</span>
          </div>
          <ChevronRightIcon />
        </Button>
      </div>
    </>
  );
}
